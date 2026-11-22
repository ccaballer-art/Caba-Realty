"""Edición clásica para fotos de real estate (sin IA generativa).

Solo ajustes tonales/color globales + claridad suave con filtro guiado (edge-aware)
y rotación mínima opcional. Nunca modifica los originales.
"""
import io, sys, json, math
import numpy as np
from PIL import Image, ImageOps, ImageCms

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    pass
import cv2

# ---------------- parámetros comunes del set (consistencia) ----------------
P = dict(
    wb_strength=0.85,        # cuánto neutralizar el tinte (0-1)
    wb_target=(1.010, 1.0, 0.985),  # leve calidez común a todo el set (R,G,B)
    white_pct=96, white_target=0.86,  # percentil de blancos -> nivel objetivo (lineal)
    key_target=0.20,         # si el promedio log queda por debajo, se levantan medios
    gamma_min=0.82,
    gain_min=0.95, gain_max=2.4,
    shoulder=0.80,           # inicio del roll-off de luces (lineal)
    black_pct=0.4, black_target=0.012,  # anclaje del punto negro (lineal)
    shadow_lift=0.04,        # levantar sombras (espacio perceptual)
    contrast=0.10,           # curva S suave
    clarity=0.12,            # contraste local edge-aware
    vibrance=0.14,
    decrunch=0.25,           # suaviza sobre-nitidez del iPhone (0 = off)
    max_rotate=3.0, min_rotate=0.75,
)

M_P3_TO_SRGB = np.array([[1.2249, -0.2247, 0.0000],
                         [-0.0420, 1.0419, 0.0000],
                         [-0.0197, -0.0786, 1.0979]], np.float32)
M_2020_TO_SRGB = np.array([[1.6605, -0.5876, -0.0728],
                           [-0.1246, 1.1329, -0.0083],
                           [-0.0182, -0.1006, 1.1187]], np.float32)
LUM = np.array([0.2126, 0.7152, 0.0722], np.float32)


def srgb_to_lin(x):
    return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4).astype(np.float32)


def lin_to_srgb(x):
    x = np.clip(x, 0, 1)
    return np.where(x <= 0.0031308, 12.92 * x, 1.055 * np.power(x, 1 / 2.4) - 0.055).astype(np.float32)


def load_linear_srgb(path):
    """Devuelve (lineal sRGB float32, nombre del perfil, exif)."""
    im = Image.open(path)
    icc = im.info.get('icc_profile')
    exif = im.getexif()
    im = ImageOps.exif_transpose(im)  # respeta orientación EXIF
    if im.mode not in ('RGB', 'RGBA', 'I;16', 'RGB;16'):
        im = im.convert('RGB')
    a = np.asarray(im.convert('RGB') if im.mode == 'RGBA' else im)
    a = a.astype(np.float32) / (65535.0 if a.dtype == np.uint16 else 255.0)
    desc = 'sRGB (asumido)'
    if icc:
        desc = ImageCms.getProfileDescription(ImageCms.ImageCmsProfile(io.BytesIO(icc))).strip()
    d = desc.lower()
    if 'hlg' in d or '2100' in d:
        # Frame HLG (video HDR): decodificación compatible SDR (BT.2020 + gamma de display)
        lin = np.clip((a ** 2.4) @ M_2020_TO_SRGB.T, 0, None)
    elif 'p3' in d:
        lin = np.clip(srgb_to_lin(a) @ M_P3_TO_SRGB.T, 0, None)
    elif 'srgb' in d or not icc:
        lin = srgb_to_lin(a)
    else:  # cualquier otro perfil: LittleCMS a sRGB
        im8 = ImageCms.profileToProfile(Image.fromarray((a * 255 + .5).astype(np.uint8)),
                                        ImageCms.ImageCmsProfile(io.BytesIO(icc)),
                                        ImageCms.createProfile('sRGB'), renderingIntent=1, outputMode='RGB')
        lin = srgb_to_lin(np.asarray(im8, np.float32) / 255)
    return lin.astype(np.float32), desc, exif


def box(x, r):
    return cv2.boxFilter(x, -1, (2 * r + 1, 2 * r + 1), borderType=cv2.BORDER_REFLECT)


def guided(I, p, r, eps):
    mI, mp = box(I, r), box(p, r)
    a = (box(I * p, r) - mI * mp) / (box(I * I, r) - mI * mI + eps)
    b = mp - a * mI
    return box(a, r) * I + box(b, r)


# ---------------- geometría ----------------
def measure_tilt(lin):
    """Inclinación global (grados) a partir de líneas casi verticales y casi horizontales.
    También estima convergencia (keystone) comparando verticales izquierda vs derecha."""
    g = (lin_to_srgb(lin @ LUM) * 255).astype(np.uint8)
    h, w = g.shape
    lsd = cv2.createLineSegmentDetector(0)
    lines = lsd.detect(g)[0]
    if lines is None:
        return None
    vert, horz = [], []
    for x1, y1, x2, y2 in lines.reshape(-1, 4):
        L = math.hypot(x2 - x1, y2 - y1)
        if L < 0.06 * max(h, w):
            continue
        ang = math.degrees(math.atan2(x2 - x1, y2 - y1))  # 0 = vertical
        ang = (ang + 90) % 180 - 90
        if abs(ang) < 12:
            vert.append((ang, L, (x1 + x2) / 2 / w))
        hang = math.degrees(math.atan2(y2 - y1, x2 - x1))
        hang = (hang + 90) % 180 - 90
        if abs(hang) < 8:
            horz.append((hang, L, (y1 + y2) / 2 / h))

    def wmed(v):
        if not v:
            return None
        v = sorted(v, key=lambda t: t[0])
        ws = np.cumsum([t[1] for t in v])
        return float(v[int(np.searchsorted(ws, ws[-1] / 2))][0])

    centre = [t for t in vert if 0.3 < t[2] < 0.7]
    left = [t for t in vert if t[2] < 0.3]
    right = [t for t in vert if t[2] > 0.7]
    return dict(
        vert_centre=wmed(centre), vert_all=wmed(vert), n_vert=len(vert),
        keystone=(None if not left or not right else wmed(left) - wmed(right)),
        horiz=wmed([t for t in horz if 0.25 < t[2] < 0.75]), n_horz=len(horz))


def rotate_crop(lin, deg):
    h, w = lin.shape[:2]
    M = cv2.getRotationMatrix2D((w / 2, h / 2), deg, 1.0)
    out = cv2.warpAffine(lin, M, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REFLECT)
    # rectángulo interior máximo con la misma proporción
    a = math.radians(abs(deg))
    s = 1 / (math.cos(a) + max(w / h, h / w) * math.sin(a))
    cw, ch = int(w * s) & ~1, int(h * s) & ~1
    x0, y0 = (w - cw) // 2, (h - ch) // 2
    return np.clip(out[y0:y0 + ch, x0:x0 + cw], 0, None), (x0, y0, cw, ch)


# ---------------- tono y color ----------------
def white_balance(lin, p):
    Y = lin @ LUM
    mx = lin.max(2)
    mn = lin.min(2)
    chroma = (mx - mn) / (mx + 1e-6)
    lo, hi = np.percentile(Y, [15, 99])
    mask = (Y > lo) & (Y < hi) & (mx < 0.92) & (chroma < 0.22)
    if mask.sum() < 500:
        return lin, (1, 1, 1), 0.0
    m = lin[mask].mean(0)
    gains = m.mean() / m
    gains = 1 + p['wb_strength'] * (gains - 1)
    gains = gains * np.array(p['wb_target'], np.float32)
    gains = np.clip(gains / (gains @ LUM), 0.80, 1.25)  # conserva luminancia
    cast = float(np.max(np.abs(m / m.mean() - 1)))
    return lin * gains.astype(np.float32), tuple(np.round(gains, 4)), cast


def tone(lin, p):
    Y = lin @ LUM
    key = float(np.exp(np.mean(np.log(Y + 1e-4))))
    # exposición anclada en blancos (paredes/techos), no en el promedio: no oscurece cuartos claros
    wref = float(np.percentile(Y, p['white_pct']))
    gain = float(np.clip(p['white_target'] / max(wref, 1e-4), p['gain_min'], p['gain_max']))
    x = lin * gain
    # punto negro (lineal)
    bp = float(np.percentile(x @ LUM, p['black_pct']))
    if bp > p['black_target']:
        x = (x - (bp - p['black_target'])) / (1 - (bp - p['black_target']))
    x = np.clip(x, 0, None)
    # roll-off de luces: sin recortar
    k = p['shoulder']
    over = x > k
    x = np.where(over, k + (1 - k) * (1 - np.exp(-(x - k) / (1 - k))), x)
    # espacio perceptual
    s = lin_to_srgb(x)
    key_s = float(lin_to_srgb(np.array(key * gain, np.float32)))
    tgt_s = float(lin_to_srgb(np.array(p['key_target'], np.float32)))
    gamma = float(np.clip(np.log(tgt_s) / np.log(max(key_s, 1e-3)), p['gamma_min'], 1.0))
    s = s ** gamma
    s = s + p['shadow_lift'] * s * (1 - s) ** 4 * 4
    c = p['contrast']
    s = s + c * np.sin(2 * np.pi * s) * -1 / (2 * np.pi) * 2  # S-curve, extremos fijos
    return np.clip(s, 0, 1), dict(key_in=round(key, 4), gain=round(gain, 3), mid_gamma=round(gamma, 3), black_shift=round(max(0, bp - p['black_target']), 4))


def clarity_and_decrunch(s, p):
    L = s @ LUM
    h, w = L.shape
    r = max(8, int(0.012 * max(h, w)))
    base = guided(L, L, r, 0.012)
    detail = L - base
    out_L = base + detail * (1 + p['clarity'] * 4 * L * (1 - L))  # sin tocar extremos
    if p['decrunch'] > 0:
        fine = guided(out_L, out_L, 2, 0.0004)
        out_L = out_L + p['decrunch'] * (fine - out_L)
    ratio = (out_L + 1e-4) / (L + 1e-4)
    return np.clip(s * ratio[..., None], 0, 1)


def vibrance(s, p):
    L = (s @ LUM)[..., None]
    mx, mn = s.max(2, keepdims=True), s.min(2, keepdims=True)
    sat = (mx - mn) / (mx + 1e-6)
    f = 1 + p['vibrance'] * (1 - sat) ** 2
    out = L + (s - L) * f
    return np.clip(out, 0, 1)


def encode8(s, seed=0):
    rng = np.random.default_rng(seed)
    d = (rng.random(s.shape, dtype=np.float32) - rng.random(s.shape, dtype=np.float32))  # TPDF ±1 LSB
    return np.clip(np.round(s * 255 + d * 0.5), 0, 255).astype(np.uint8)


def process(path, p=P, straighten=True):
    lin, prof, exif = load_linear_srgb(path)
    info = dict(profile=prof, size_in=lin.shape[1::-1])
    before_lin = lin.copy()
    tilt = measure_tilt(lin)
    info['tilt'] = tilt
    rot = 0.0
    if straighten and tilt and tilt['vert_centre'] is not None:
        vc, hz = tilt['vert_centre'], tilt['horiz']
        agree = hz is None or (np.sign(hz) == np.sign(-vc) and abs(hz + vc) < 1.0)
        if agree and p['min_rotate'] <= abs(vc) <= p['max_rotate']:
            rot = -vc  # solo si verticales y horizontales coinciden (inclinación real, no perspectiva)
    crop = None
    if rot:
        lin, crop = rotate_crop(lin, rot)
    info['rotate_deg'] = round(rot, 2)
    lin, gains, cast = white_balance(lin, p)
    info['wb_gains'], info['cast_in'] = gains, round(cast, 4)
    s, tinfo = tone(lin, p)
    info.update(tinfo)
    global_only = s.copy()
    s = clarity_and_decrunch(s, p)
    s = vibrance(s, p)
    info['local_max_dev'] = float(np.percentile(np.abs(s - vibrance(global_only, p)), 99.9))
    return s, lin_to_srgb(before_lin), info, exif


def save(s8, path, quality, exif=None):
    im = Image.fromarray(s8)
    kw = dict(quality=quality, subsampling=0, optimize=True,
              icc_profile=ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes())
    if exif is not None:
        e = exif
        for k in (274, 0x8825):  # sin orientación (ya aplicada) ni GPS
            if k in e:
                del e[k]
        kw['exif'] = e.tobytes()
    im.save(path, **kw)

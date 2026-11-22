import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
import numpy as np
from PIL import Image, ImageDraw
from skimage.metrics import structural_similarity as ssim
from skimage.exposure import match_histograms
from skimage.color import rgb2lab
import re_edit as R, run

OUT = sys.argv[1]
os.makedirs(f'{OUT}/full', exist_ok=True); os.makedirs(f'{OUT}/web', exist_ok=True)

def gaps(a):
    g = 0
    for c in range(3):
        h = np.bincount(a[..., c].ravel(), minlength=256); nz = np.nonzero(h)[0]
        g += int((h[nz[0]:nz[-1] + 1] == 0).sum())
    return g

rep, pairs = {}, []
for i, (n, f) in enumerate(run.FILES.items()):
    s, before, info, exif = R.process(run.U + f)
    a8 = R.encode8(s, seed=i)
    R.save(a8, f'{OUT}/full/{n}.jpg', 100, exif)
    im = Image.fromarray(a8)
    L = max(im.size)
    if L > 2048:
        im = im.resize((round(im.width * 2048 / L), round(im.height * 2048 / L)), Image.LANCZOS)
    R.save(np.asarray(im), f'{OUT}/web/{n}.jpg', 90, exif)
    lin, _, _ = R.load_linear_srgb(run.U + f)
    b_geo = R.lin_to_srgb(R.rotate_crop(lin, info['rotate_deg'])[0]) if info['rotate_deg'] else R.lin_to_srgb(lin)
    b8 = R.encode8(b_geo, seed=99)
    # verificación de contenido: SSIM de luminancia tras igualar histogramas (aísla cambios de estructura)
    gb, ga = b8 @ R.LUM, a8 @ R.LUM
    v = dict(
        ssim_struct=round(float(ssim(match_histograms(ga, gb), gb, data_range=255)), 4),
        same_geometry=b8.shape == a8.shape,
        hist_gaps_before=gaps(b8), hist_gaps_after=gaps(a8),
        clip_hi_before=round(float((b8.max(2) >= 254).mean() * 100), 2),
        clip_hi_after=round(float((a8.max(2) >= 254).mean() * 100), 2),
        chroma_ratio=round(float(np.hypot(*rgb2lab(a8[::4, ::4])[..., 1:].transpose(2, 0, 1)).mean() /
                                 np.hypot(*rgb2lab(b8[::4, ::4])[..., 1:].transpose(2, 0, 1)).mean()), 3),
        luma_mean_before=round(float(gb.mean()), 1), luma_mean_after=round(float(ga.mean()), 1),
        windows_blown_pct=round(float((lin.max(2) > 0.97).mean() * 100), 2),
        full_px=a8.shape[1::-1], web_px=im.size)
    info['verify'] = v
    rep[n] = info
    pairs.append((n, R.encode8(before, seed=7), a8))
    print(n, json.dumps({k: info[k] for k in ('rotate_deg', 'gain', 'mid_gamma', 'wb_gains', 'local_max_dev')}, default=str), json.dumps(v))

json.dump(rep, open(f'{OUT}/verificacion.json', 'w'), indent=1, default=str)
# hoja comparativa: 2 pares por fila
tiles = [run.pair(b, a, n, w=700) for n, b, a in pairs]
H = max(t.height for t in tiles); W = tiles[0].width
rows = (len(tiles) + 1) // 2
sheet = Image.new('RGB', (W * 2 + 10, rows * (H + 10) + 70), (24, 24, 24))
d = ImageDraw.Draw(sheet)
d.text((14, 18), 'Hoja comparativa - set completo (10 fotos)   |   izquierda: ANTES   derecha: DESPUÉS', fill=(240, 240, 240), font=run.font(30))
for k, t in enumerate(tiles):
    sheet.paste(t, ((k % 2) * (W + 10), 70 + (k // 2) * (H + 10)))
sheet.save(f'{OUT}/hoja_comparativa.jpg', quality=90)

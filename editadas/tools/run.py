import sys, json, os
sys.path.insert(0, os.path.dirname(__file__))
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import re_edit as R

U = '/root/.claude/uploads/8edb64cd-f6cc-5f69-ad25-f285e48c43c9/'
FILES = {
 'IMG_7451_still': '240b6085-image.jpg', 'IMG_7469': '873bf25a-image.jpg', 'IMG_7468': '248e4aa0-image.jpg',
 'IMG_7477': 'ccf5c23f-image.jpg', 'IMG_7476': '473210da-image.jpg', 'IMG_7475': '14427eec-image.jpg',
 'IMG_7479': 'c3dd6380-image.jpg', 'IMG_7461': 'd57cd7a7-image.jpg', 'IMG_7460': '06b24c80-image.jpg',
 'IMG_7464': 'b96e3f70-image.jpg'}

def font(sz):
    for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']:
        if os.path.exists(f): return ImageFont.truetype(f, sz)
    return ImageFont.load_default()

def pair(before8, after8, name, w=1100):
    b, a = Image.fromarray(before8), Image.fromarray(after8)
    h = int(w * b.height / b.width)
    b, a = b.resize((w, h), Image.LANCZOS), a.resize((w, h), Image.LANCZOS)
    pad, top = 12, 46
    c = Image.new('RGB', (2 * w + 3 * pad, h + top + pad), (24, 24, 24))
    c.paste(b, (pad, top)); c.paste(a, (2 * pad + w, top))
    d = ImageDraw.Draw(c); f = font(24)
    d.text((pad, 12), f'{name} - ANTES', fill=(230, 230, 230), font=f)
    d.text((2 * pad + w, 12), f'{name} - DESPUÉS', fill=(230, 230, 230), font=f)
    return c

if __name__ == '__main__':
    names, outdir = sys.argv[1].split(','), sys.argv[2]
    os.makedirs(outdir, exist_ok=True)
    sheets, report = [], {}
    for n in names:
        s, before, info, exif = R.process(U + FILES[n])
        a8 = R.encode8(s); b8 = R.encode8(before)
        R.save(a8, f'{outdir}/{n}.jpg', 100, exif)
        sheets.append(pair(b8, a8, n))
        report[n] = info
        print(n, json.dumps(info, default=str))
    W = max(s.width for s in sheets); H = sum(s.height for s in sheets)
    sheet = Image.new('RGB', (W, H), (24, 24, 24)); y = 0
    for s in sheets: sheet.paste(s, (0, y)); y += s.height
    sheet.save(f'{outdir}/comparacion.jpg', quality=90)
    json.dump(report, open(f'{outdir}/report.json', 'w'), indent=1, default=str)

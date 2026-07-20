"""
生成求职助手 AI 图标 (.ico) 并在桌面创建带图标的快捷方式
运行一次即可：python make_icon.py
"""
import os, struct, io, math
from PIL import Image, ImageDraw

DESKTOP = os.path.join(os.environ["USERPROFILE"], "Desktop")
PROJECT = os.path.dirname(os.path.abspath(__file__))
ICO_PATH = os.path.join(PROJECT, "assets", "icon.ico")
LNK_PATH = os.path.join(DESKTOP, "求职助手AI.lnk")
BAT_PATH = os.path.join(DESKTOP, "求职助手Agent.bat")

os.makedirs(os.path.join(PROJECT, "assets"), exist_ok=True)

# ── 绘制图标 ────────────────────────────────────────────────
def make_frame(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    m = max(1, size // 16)          # 边距
    r = size // 5                   # 圆角半径

    # 渐变背景（用多层 alpha 模拟）
    for i in range(size):
        t = i / size
        # 从 indigo(79,70,229) 到 violet(124,58,237)
        ir = int(79 + t * (124 - 79))
        ig = int(70 + t * (58  - 70))
        ib = int(229 + t * (237 - 229))
        d.line([(m, m + i), (size - m, m + i)], fill=(ir, ig, ib, 255))

    # 圆角蒙版（先画一个圆角矩形裁剪）
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([m, m, size - m, size - m], radius=r, fill=255)
    img.putalpha(mask)

    # ── 绘制简历/搜索图案 ────────────────────────────────
    cx, cy = size / 2, size / 2
    s = size / 2.8

    # 纸张主体（白色圆角矩形）
    pw, ph = s * 0.65, s * 0.82
    px1, py1 = cx - pw / 2, cy - ph / 2 + size * 0.02
    px2, py2 = cx + pw / 2, cy + ph / 2 + size * 0.02
    pr = max(1, size // 28)
    d.rounded_rectangle([px1, py1, px2, py2], radius=pr,
                        fill=(255, 255, 255, 240))

    # 折角
    fc = max(1, size // 10)
    poly = [(px2 - fc, py1), (px2, py1 + fc),
            (px2, py1), (px2 - fc, py1)]
    d.polygon([(px2 - fc, py1), (px2, py1 + fc),
               (px2, py1)], fill=(200, 200, 230, 200))
    d.line([(px2 - fc, py1), (px2 - fc, py1 + fc),
            (px2, py1 + fc)], fill=(180, 180, 220, 180),
           width=max(1, size // 64))

    # 文字横线（模拟简历行）
    lw = max(1, size // 48)
    lc = (99, 102, 241, 200)
    gap = ph / 6.5
    for i in range(1, 5):
        lx1 = px1 + pw * 0.12
        lx2 = px2 - pw * (0.12 + (0.18 if i == 4 else 0))
        ly  = py1 + gap * (i + 0.5)
        d.line([(lx1, ly), (lx2, ly)], fill=lc, width=lw)

    # 放大镜（右下角）
    gc = size * 0.31
    gr = size * 0.105
    ga = size * 0.072
    gx, gy = cx + gc * 0.30, cy + gc * 0.32
    gcolor = (255, 221, 51, 235)
    # 镜框
    d.ellipse([gx - gr, gy - gr, gx + gr, gy + gr],
              fill=None, outline=gcolor, width=max(2, size // 30))
    # 把手
    angle = math.radians(135)
    hx1 = gx + math.cos(angle) * gr
    hy1 = gy + math.sin(angle) * gr
    hx2 = gx + math.cos(angle) * (gr + ga)
    hy2 = gy + math.sin(angle) * (gr + ga)
    d.line([(hx1, hy1), (hx2, hy2)], fill=gcolor,
           width=max(2, size // 24))

    return img


# ── 合成多分辨率 ICO ─────────────────────────────────────
sizes = [256, 64, 48, 32, 16]
frames = [make_frame(s) for s in sizes]
frames[0].save(
    ICO_PATH, format="ICO",
    sizes=[(s, s) for s in sizes],
    append_images=frames[1:],
)
print(f"[OK] 图标已生成：{ICO_PATH}")

# ── 创建桌面快捷方式（.lnk）────────────────────────────
import win32com.client  # pywin32
ws = win32com.client.Dispatch("WScript.Shell")
lnk = ws.CreateShortcut(LNK_PATH)
lnk.TargetPath      = BAT_PATH
lnk.WorkingDirectory = PROJECT
lnk.IconLocation    = ICO_PATH
lnk.WindowStyle     = 1
lnk.Description     = "求职助手 AI - 智能求职辅助工具"
lnk.Save()
print(f"[OK] 快捷方式已创建：{LNK_PATH}")
print("\n完成！桌面上已出现「求职助手AI」图标，双击即可启动。")

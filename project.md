# Project Rules

## 1. Project Structure
```
root/
├── [page].html
├── [page].md                ← created by Claude per page before coding
├── project.md
├── figma-link.md
├── CLAUDE.md
├── assets/
│   ├── css/
│   │   ├── common.css
│   │   └── [page].css
│   ├── js/
│   ├── images/              ← PNG / JPG only
│   ├── videos/              ← MP4 / WebM only
│   └── plugins/             ← Swiper.js etc.
├── fonts/
└── .claude/
    ├── rules/
│   │   ├── design-fixed.css
│   │   └── figma-to-code.md
```

---

## 2. Base Template
- Read `basic-template.html` first — use as base structure for every new HTML file
- All new content goes inside `.main-container` only

---

## 3. Global Elements — Never Touch
| Element          | Class / Attribute |
|------------------|-------------------|
| Background Image | `[bg-img]`        |
| Back Button      | `[left-corner]`   |
| Language Switch  | `[language]`      |

---

## 4. Text Format — Every Visible Text Node
```html
<span class="english">Text</span>
<span class="hindi">Text</span>
<span class="gujrati">Text</span>
```

---

## 5. Images
- Path format: `/assets/images/[layer-name].png`
- Always in document flow — never `position: absolute`
- PNG or JPG only
- If missing — add placeholder, note it, do not break layout

---

## 6. CSS Units
| Property | Unit |
|---|---|
| `font-size` | `clamp(min, vw, max)` |
| `padding`, `margin`, `gap`, `border`, `border-radius` | `vw` |
| `width` | `%` |
| `height` | `auto` or `%` |
| `top`, `bottom`, `left`, `right` | `%` |

- No `px`, `rem`, `em`, `pt`, `vh` anywhere — write `0` not `0px`
- All colors and repeated values → CSS variables in `:root`
- Never modify existing CSS — write new styles in a new block only
- Shared styles → `assets/css/common.css`
- Page styles → `assets/css/[page].css`

---

## 7. Layout
- Default: `position: relative` + Flexbox
- `position: absolute` only when truly needed — parent must have `position: relative`
- Never position relative to `body`

---

## 8. Swiper Slider
- Swiper.js only from `assets/plugins/`
- Custom prev/next buttons only — no default arrows, no pagination unless asked
```html
<div class="slider-wrapper">
  <div class="swiper my-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">...</div>
    </div>
  </div>
  <button class="btn-prev">‹</button>
  <button class="btn-next">›</button>
</div>
```

---

## 9. Typography
- `@font-face` using files from `/fonts/`
- Match font weight, letter spacing, line height exactly from Figma

---

## 10. Page .md File Format
> Claude must create each page .md in this exact numbered format before writing any HTML.

```
# [page].html — Build Instructions

## Navigation
← from: [previous page or frame]
→ to: [next page or frame]

## Frame [N] Guidelines
  [N]- read frame [N] from figma mcp local server [figma link] and follow below guidelines
       for image reference use @assets/images/[folder if any]

    [N].1- [layer name or area] — instruction
      [N].1.1- [sub instruction if needed]
        [N].1.1.1- [deeper detail if needed]

    [N].2- on click of [Layer Name] → [what happens]

    [N].3- slider instructions (if any)
      [N].3.1- first slide → layer [X] from [figma link]
      [N].3.2- second slide → layer [Y] from [figma link]
      [N].3.3- on click of [Component X] → connect to slide N
      [N].3.4- [Component next] → next slide
      [N].3.5- [Component prev] → previous slide, icon from [figma link] layer [layer name]

    [N].4- synced slider instructions (if any)
      [N].4.1- place synced slider on [layer name] position
      [N].4.2- use swiper fade effect
      [N].4.3- this slider stays in sync with slider in [N].3
        [N].4.3.1- first slide → node-id=[id]
        [N].4.3.2- second slide → node-id=[id]
        [N].4.3.3- third slide → node-id=[id]

## Frame [N+1] Guidelines
  [N+1]- read frame [N+1] from figma mcp local server [figma link]
    ...same numbered format continues...
```
# Handoff: Suytex Academy — Sistema de Identidad Visual

## Overview
This package documents the complete visual identity system for **Suytex Academy**, a high-end tech/education academy. The aesthetic direction is **minimalist luxury** — sophisticated, sober, authoritative, with extreme negative space. The deliverable is a single vertical brand-guidelines canvas covering logo system, color, typography, graphic elements, applications, and do's & don'ts.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look, layout, and rules of the brand system. They are **not production code to ship directly**. The task is to **recreate / integrate this identity into the target environment** (e.g. the `suytex-design` or `suytex-web` repo) using that codebase's established patterns, framework, and component conventions. If the repo has no design-token system yet, use the tokens below to seed one (CSS variables, Tailwind config, theme file, etc.).

## Fidelity
**High-fidelity (hifi).** All colors, typography, spacing, and layout values are final and exact. Recreate pixel-faithfully. The HTML is a single fixed-width canvas (max content width **1200px**, full-bleed dark sections) meant to be read top-to-bottom.

## Brand Foundations

### Aesthetic rules (non-negotiable)
- Extreme negative space; editorial composition; impeccable alignment.
- Black-blue (#0A0E27) and white dominate. **Blue is an accent, never a fill.**
- The official gradient is used minimally — **one deliberate gesture per piece**.
- Zero visual saturation. Every element must earn its place. Timeless, expensive, production-ready.

### Color tokens
| Token | Hex | Role |
|---|---|---|
| Brand background (Deep Space) | `#0A0E27` | Primary dark surface, protagonist |
| Near-black | `#060B1A` | Alternate dark section background |
| Blue primary | `#2563EB` | Accent, links, hairlines |
| Electric blue | `#1D4ED8` | Secondary accent |
| Royal blue (deep) | `#1E3A8A` | Deep accent / backgrounds for knockouts |
| Highlight | `#93C5FD` | Captions, fine icons, light accent |
| White | `#FFFFFF` | Text on dark, light surfaces |
| Cool gray | `#94A3B8` | Body text on dark, secondary |
| Muted gray | `#475569` | Tertiary text, footnotes |
| Border | `rgba(148,163,184,0.12)` | Subtle 1px card/section dividers |
| Official gradient | `linear-gradient(135deg, #93C5FD, #2563EB)` | Reserve for a single gesture per piece |

### Typography
- **Display:** Space Grotesk. UPPERCASE, wide tracking. Weights 300/400/500. `letter-spacing` ranges 0.04em (headlines) up to 0.40em (the "Academy" wordmark, captions).
- **Body:** Inter. Weights 200/300/400/500. Generous line-height (1.6–1.75).
- **Captions/eyebrows:** 12px, uppercase, `letter-spacing` ~0.28–0.32em, color `#93C5FD`.
- Google Fonts import: `Space+Grotesk:wght@400;500;600;700` + `Inter:wght@200;300;400;500;600`.

### Type scale (px)
| Level | Size | Font / weight | Tracking |
|---|---|---|---|
| H1 | 86 | Space Grotesk 500 | 0.08–0.14em, uppercase |
| H2 | 50 | Space Grotesk 500 | 0.04–0.05em, uppercase |
| H3 | 30 | Space Grotesk 400 | 0.04em |
| Body | 17 | Inter 300 | normal, line-height 1.7 |
| Caption | 12 | Inter | 0.28em, uppercase |

### Spacing & shape
- Section vertical padding: **140px** (top/bottom), 64px horizontal.
- Content max-width: **1200px**, centered.
- Card padding: 32–96px depending on prominence.
- Border radius: **4px** (cards/swatches), 6px (application mockups), 50% (isotype disc).
- Hairline detail: 1px line, often `linear-gradient(90deg, transparent, #2563EB, #93C5FD, transparent)` or a solid 120px `#2563EB` segment.

## Sections (in order)
1. **Cover** — centered isotype on radial dark glow, "SUYTEX / ACADEMY" lockup, eyebrow "Sistema de Identidad Visual".
2. **Index** — two-column numbered contents list.
3. **01 Logotipo** — principal horizontal lockup; variants grid (isotype, monochrome, on-light, negative wordmark); area of protection (clear space x = ¼ of disc diameter); minimum size (24px floor).
4. **02 Paleta** — Deep Space hero swatch + official gradient swatch; primary/secondary swatch grids with HEX; contrast rule cards (AA/AAA).
5. **03 Tipografía** — Display vs Body specimen cards; full type scale H1→caption.
6. **04 Elementos gráficos** — the hairline; "S"-derived low-opacity pattern; fine-stroke (1.5px) geometric iconography.
7. **05 Aplicaciones** — business card (front/back), slide (cover + interior), social (1:1 avatar + 16:9 banner), certificate/diploma, email signature, web header.
8. **06 Do's & Don'ts** — two columns of rules; footer.

## Logo rules
- The isotype is the fluid blue "S" in the official gradient, contained in a deep disc — **always used inside its disc** as the symbol (the standalone disc-less S was tested and dropped).
- Clear space = **x = ¼ of the disc diameter** on all sides; nothing intrudes.
- Minimum size: **24px / 8mm**. Below that, do not reproduce.
- Never deform, rotate, or recolor the isotype.

## Assets
- `assets/suytex-logo.png` — primary isotype (gradient "S" in dark disc). Used throughout.
- `assets/suytex-s-gradiente.svg`, `assets/suytex-s-blanco.svg`, `assets/suytex-s-negro.svg` — standalone "S" vectors (gradient / white knockout / black knockout). Currently NOT used in the canvas (the isolated-symbol section was removed), but included for production use (engraving, stamps, single-ink reproduction).

## Files
- `Suytex Academy - Identidad Visual.dc.html` — the source design (Design Component HTML; inline-styled, streams top to bottom). This is the canonical reference.
- `assets/` — all imagery and SVG logos.

## Implementation notes
- Styling in the source is **100% inline** (no stylesheets/classes). When porting, convert to the target's idioms (CSS variables, Tailwind, styled-components, etc.) using the tokens above — do not copy inline styles verbatim into production.
- Fonts load from Google Fonts; self-host in production if required.
- The design is dark-first. Ensure `print-color-adjust: exact` equivalents if ever rendered to PDF.

## Tema light (landings)

`suytex.css` es dark-only y sus tokens `--su-*` son literales de marca
(`--su-white` = blanco, `--su-brand` = navy), no roles semánticos. Para
landings vanilla (`promo-*`, `suytex-web`) existe `theme-light.css`: una capa
**aditiva** que no toca `suytex.css` ni redefine ninguno de sus tokens. Declara
su propia capa semántica (`--su-bg`, `--su-fg`, `--su-accent`, etc.) y
sobrescribe las 9 clases `.su-*` — todo bajo el scope `[data-theme="light"]`.

**Activación** — cargar ambos archivos, en este orden, y marcar el `<html>`:

```html
<html data-theme="light">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Suytex/suytex-design@v1.1.0/suytex.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Suytex/suytex-design@v1.1.0/theme-light.css">
```

Vía npm (Tailwind v4 o bundler):

```css
@import "suytex-design/suytex.css";
@import "suytex-design/theme-light.css";
```

Sin `data-theme="light"` en el `<html>`, `theme-light.css` no altera nada —
todas sus reglas están calificadas por ese atributo.

**Advertencia** — Yobel, Halving y Talvo son dark-only. Estas apps **no deben**
poner `data-theme="light"` en ningún elemento; hacerlo activaría el tema claro
sobre una interfaz que no fue diseñada para eso. `theme-light.css` es
exclusivo de landings/marketing, no se referencia desde las apps.

Ver `preview/light.html` para una página de QA visual con hero, sección
alterna, cards, botones y escala tipográfica completa.

## Iconografía

`icons.js` es un sprite SVG vanilla, sin dependencias ni build, para
reemplazar el uso de emoji como iconografía en las landings
(`promo-portafolios`, `promo-ai`, etc.). Es **aditivo**: no toca `suytex.css`
ni `theme-light.css`, y no cambia el comportamiento de nada existente.

24 íconos de [Lucide](https://lucide.dev) (licencia ISC — ver
`LICENSE-lucide.txt`, que incluye también la atribución a Feather Icons de
la que algunos íconos derivan): `alert-circle`, `dice-5`, `help-circle`,
`brain`, `layers`, `map`, `search`, `check-circle`, `bar-chart-3`,
`trending-up`, `wallet`, `video`, `users`, `play-circle`, `message-circle`,
`award`, `clipboard-list`, `shield`, `zap`, `x-circle`, `smartphone`,
`calendar`, `clock`, `target`.

Al cargarse, `icons.js` inyecta un `<svg>` oculto (`aria-hidden="true"`,
`display:none`) al inicio del `<body>` con un `<symbol id="su-{nombre}">`
por ícono. No hace ningún `fetch()` — el sprite viaja embebido dentro del
propio script — así que funciona igual por CDN jsDelivr o por ruta local,
sin problemas de CORS.

**Activación:**

```html
<script src="https://cdn.jsdelivr.net/gh/Suytex/suytex-design@v1.2.0/icons.js"></script>
```

o localmente / vía npm:

```html
<script src="node_modules/suytex-design/icons.js"></script>
```

**Tres formas de uso:**

1. Auto-render declarativo — el script rellena cualquier elemento con
   `data-su-icon` al cargar:
   ```html
   <span data-su-icon="search"></span>
   <span data-su-icon="search" data-su-icon-size="32"></span>
   ```
2. Helper JS — para insertar un ícono desde código:
   ```js
   el.innerHTML = suIcon("search");      // 24px
   el.innerHTML = suIcon("search", 32);  // tamaño custom
   ```
3. `<use>` directo — si el sprite ya está inyectado en la página:
   ```html
   <svg width="24" height="24"><use href="#su-search"></use></svg>
   ```

**Tamaño y color, desde el consumidor** (el sprite nunca hardcodea ninguno
de los dos):

- Para el tamaño/color de marca por defecto (24px, `var(--su-blue)` en dark
  o `var(--su-accent)` en light), agregá la clase `.su-icon` que **ya existe
  en `suytex.css`** — no se redefine acá — al `<svg>` o al contenedor:
  ```html
  <span class="su-icon" data-su-icon="search"></span>
  ```
  Ojo: `.su-icon` fija `width:24px;height:24px` por CSS, así que si vas a
  pedir un `size` distinto de 24 vía `suIcon(name, size)` o
  `data-su-icon-size`, no le pongas esa clase — te va a ganar el 24px fijo.
- Para un tamaño custom con color propio, no uses `.su-icon` (te fijaría
  `width:24px;height:24px`). **Ojo**: no alcanza con fijar solo `color`. El
  `stroke="currentColor"` vive en el `<svg>` raíz del sprite, no en cada
  símbolo — y no se hereda al `<use>` en otro punto del documento (ver
  `ARCHITECTURE.md`, sección "Sistema de íconos", para el porqué exacto,
  verificado con evidencia real). Sin `fill`/`stroke` explícitos en el
  propio elemento o un ancestro, el ícono sale como silueta **negra
  sólida**, no como el trazo esperado. Hay que declarar los tres:
  ```html
  <span id="cta-icon" style="color: var(--su-accent-hover);
    fill: none; stroke: currentColor; stroke-width: 1.5;"></span>
  <script>
    document.getElementById("cta-icon").innerHTML = suIcon("zap", 40);
  </script>
  ```

Ver `preview/light.html`, sección "Iconografía", para el catálogo visual
completo de los 24 íconos.

# Arquitectura — Suytex Design System

Referencia técnica canónica del sistema de temas (dark + light) y de íconos.
Objetivo: que cualquiera (humano o Claude) pueda retomar este repo sin
contexto previo y no repetir bugs ya resueltos.

## 1. Resumen del sistema

Tres archivos, tres roles, cero acoplamiento entre ellos:

| Archivo | Qué es | Quién lo consume |
|---|---|---|
| `suytex.css` | Tokens **dark literales** (`--su-white` = blanco, `--su-brand` = navy, etc.) + 9 clases `.su-*`. Fuente única de verdad, dark-only. | Yobel, Halving, Talvo (vía npm, `@import`) y landings por CDN, sin `data-theme` |
| `theme-light.css` | Capa **semántica** paralela (`--su-bg`, `--su-fg`, `--su-accent`, etc.), aditiva, activada solo bajo `[data-theme="light"]`. Sobrescribe las mismas 9 clases `.su-*`, nunca los tokens de `suytex.css`. | Landings (`promo-*`, `suytex-web`) — nunca las apps |
| `icons.js` | Sprite SVG de 24 íconos Lucide + helper `window.suIcon()`. Vanilla, sin build, sin `fetch()` (sprite embebido en el script). | Landings, para reemplazar emoji como iconografía |

Los tres son **aditivos e independientes**: se puede usar `suytex.css` solo
(apps dark), `suytex.css` + `theme-light.css` (landing light), o sumarle
`icons.js` a cualquiera de los dos. Ninguno reescribe a otro.

## 2. Tabla completa de tokens — `theme-light.css`

Todos bajo el scope `[data-theme="light"]`:

| Token | Valor | Propósito |
|---|---|---|
| `--su-bg` | `#FFFFFF` | Fondo base de página |
| `--su-bg-alt` | `#F5F5F7` | Fondo de secciones alternas (bandas) |
| `--su-surface` | `#FAFAFA` | Fondo de cards / superficies elevadas |
| `--su-fg` | `#1D1D1F` | Texto principal (headings, `.su-title`, body fuerte) |
| `--su-fg-muted` | `#6E6E73` | Texto secundario que **debe** cumplir AA a tamaño pequeño (`.su-body`, `.su-caption`) |
| `--su-fg-subtle` | `#86868B` | Solo elementos no textuales o texto grande — **ver sección 4, no usar libremente** |
| `--su-accent` | `#2563EB` | Acento (mismo azul que dark), CTAs, links, `.su-icon` en light |
| `--su-accent-hover` | `#1D4ED8` | Hover de acento |
| `--su-accent-soft` | `#EFF6FF` | Fondo suave (hover de botón secundario, superficies de acento) |
| `--su-on-accent` | `#FFFFFF` | Texto/ícono sobre fondo de acento sólido (botón primario) |
| `--su-line` | `#D2D2D7` | Bordes de UI con más presencia (ej. borde de botón secundario) |
| `--su-line-subtle` | `#E8E8ED` | Bordes y divisores sutiles (cards, `<hr>`) |
| `--su-radius-sm` | `8px` | Radio chico (barras, elementos menores) |
| `--su-radius-md` | `12px` | Radio de cards |
| `--su-radius-lg` | `20px` | Radio grande |
| `--su-radius-pill` | `980px` | Radio para botones pill |
| `--su-shadow` | `0 1px 2px rgba(0,0,0,.04)` | Sombra sutil (no usada por defecto en `.su-card`, disponible para composición) |
| `--su-maxw` | `980px` | Ancho máximo de contenido (`.wrap`) |
| `--su-section-y` | `96px` (`64px` en `≤768px`) | Padding vertical de `<section>` |

## 3. Por qué `[data-theme="light"]` y no redefinir tokens base

Los tokens de `suytex.css` (`--su-white`, `--su-brand`, `--su-mist`, etc.)
son **literales de marca**, no roles semánticos: `--su-white` siempre es
`#FFFFFF`, `--su-brand` siempre es el navy `#0A0E27`. Código de Yobel,
Halving o Talvo puede consumir esos tokens **directamente, fuera de las
clases `.su-*`** (ej. `color: var(--su-white)` esperando blanco fijo, sin
pasar por `.su-body`/`.su-title`).

Si `theme-light.css` redefiniera esos mismos nombres en un scope que
alcanzara a esas apps, cualquier uso directo del token se rompería en
silencio (un `--su-white` que deja de ser blanco es un bug invisible hasta
que se ve en pantalla). Por eso:

1. `theme-light.css` declara una capa de **nombres nuevos** (`--su-bg`,
   `--su-fg`, `--su-accent`...) que no colisionan con los literales de
   `suytex.css`.
2. Todo vive bajo `[data-theme="light"]`, atributo que Yobel/Halving/Talvo
   **nunca** ponen (son dark-only por diseño).
3. Dentro de ese scope solo se sobrescriben las **9 clases `.su-*`**, nunca
   los tokens — así que cualquier consumidor que dependa de `var(--su-white)`
   como literal sigue viendo blanco, esté donde esté.

Consecuencia práctica: **nunca** agregues una declaración `--su-white: ...`
o similar dentro de `[data-theme="light"]`. Si una landing necesita un rol
nuevo, se declara con nombre nuevo (`--su-algo`), no reutilizando un
literal existente.

## 4. Guía de contraste AA — CRÍTICO

`--su-fg-subtle` (`#86868B`) **no cumple WCAG AA como color de texto**.
Contraste real medido contra los tres fondos del tema:

| Contra fondo | Ratio | AA texto pequeño (4.5:1) |
|---|---|---|
| `--su-bg` (`#FFFFFF`) | 3.62:1 | ❌ |
| `--su-surface` (`#FAFAFA`) | 3.47:1 | ❌ |
| `--su-bg-alt` (`#F5F5F7`) | 3.33:1 | ❌ |

`--su-fg-muted` (`#6E6E73`) sí cumple, contra los mismos tres fondos:

| Contra fondo | Ratio | AA texto pequeño (4.5:1) |
|---|---|---|
| `--su-bg` | 5.07:1 | ✅ |
| `--su-surface` | 4.86:1 | ✅ |
| `--su-bg-alt` | 4.66:1 | ✅ |

**Regla de uso:**

- `--su-fg-subtle` → solo elementos **no textuales** (bordes, iconos,
  dividers, placeholders de UI) o **texto grande**: ≥18px/1.125rem regular,
  o ≥24px/1.5rem (14pt) bold — ahí el mínimo AA baja a 3:1 y sí cumple.
- Texto pequeño (footer, labels, estados de carga, captions, badges,
  metadata) → siempre `--su-fg-muted`.

**Por qué esto importa tanto:** este bug ya se coló en producción. Se
detectó en `promo-ai` (footer y estados de carga con `--su-fg-subtle` a
tamaño pequeño, 3.33:1) y `promo-portafolios` lo había heredado del mismo
patrón copiado. Se corrigió documentando la guía de uso (no cambiando el
valor del token, que rompería sus usos válidos) en `ae85c16` — ver el
comentario extendido junto a la declaración de `--su-fg-subtle` en
`theme-light.css`. **No repetir**: antes de poner `--su-fg-subtle` en un
`color:`, preguntate si el texto es grande o si en realidad debería ser
`--su-fg-muted`.

## 5. Sistema de íconos — gotchas con evidencia real

### 5.1 El auto-render corre una sola vez — contenido tardío no se resuelve solo

`icons.js` inyecta el sprite y corre `renderAutoIcons()` **una vez**, en
`DOMContentLoaded` (o de inmediato si el script carga con el documento ya
listo). Esa función es interna del IIFE — **no hay `MutationObserver` ni
re-scan**, y no se expone ningún `enhanceIcons()` de fábrica. Lo único
público es `window.suIcon(name, size)`.

Consecuencia: si un bloque de contenido se pinta **después** de ese primer
render — típicamente vía `fetch('content.txt')` que inyecta HTML con
`data-su-icon` estático — esos nodos quedan vacíos para siempre. El
`querySelectorAll("[data-su-icon]")` de `icons.js` ya corrió antes de que
existieran.

**Patrón correcto**: escribir tu propio `enhanceIcons()` en la landing,
reutilizando `window.suIcon()`, y llamarlo explícitamente después de
inyectar el contenido nuevo:

```html
<script src=".../icons.js"></script>
<script>
  function enhanceIcons(root) {
    (root || document).querySelectorAll('[data-su-icon]').forEach(function (el) {
      var sizeAttr = el.getAttribute('data-su-icon-size');
      var size = sizeAttr ? parseInt(sizeAttr, 10) : undefined;
      el.innerHTML = window.suIcon(el.getAttribute('data-su-icon'), size);
    });
  }

  fetch('content.txt')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      var container = document.getElementById('dynamic-content');
      container.innerHTML = html;      // trae data-su-icon="..." estático
      enhanceIcons(container);         // icons.js ya no va a tocarlos solo
    });
</script>
```

### 5.2 BUG de la clase `.su-icon`: load-bearing, no cosmética

Un `<svg><use href="#su-nombre"></use></svg>` **sin** el wrapper `.su-icon`
(ni un reemplazo equivalente) renderiza como **silueta negra sólida**, no
como el ícono de trazo esperado. No es un detalle de estilo: es la única
razón por la que el ícono se ve bien.

**Por qué pasa**: `fill="none" stroke="currentColor" stroke-width="1.5"`
están declarados en el `<svg id="su-icon-sprite">` — el contenedor raíz del
sprite, oculto (`display:none`) al inicio del `<body>`. Cuando un `<use>`
en **otro punto del documento** referencia un `<symbol>` de ese sprite, el
navegador genera un árbol de instancia (shadow tree) cuya cadena de
herencia CSS sigue al **`<use>` real en el DOM**, no al `<svg>` de origen
del símbolo. Como los `<path>`/`<circle>` de cada símbolo no traen
`fill`/`stroke` propios, y el `<use>` tampoco los recibe de su padre real
en el documento, el user-agent aplica los valores iniciales de SVG:
`fill: black`, `stroke: none` → relleno negro sólido, sin contorno.

`.su-icon` (definida una sola vez en `suytex.css`, reutilizada en light)
existe exactamente para cortar esa herencia donde sí importa —
`fill: none; stroke: var(--su-blue)` (o `--su-accent` en light) puesto en
el propio elemento contenedor, que sí es ancestro real del `<use>` en el
documento.

**Evidencia** (test reproducido en Chromium headless con el sprite y un
`<use>` reales, midiendo `getComputedStyle` del `<use>` instanciado):

| Caso | `fill` computado | `stroke` computado | Resultado visual |
|---|---|---|---|
| `<use>` sin wrapper, sin `color` | `rgb(0,0,0)` | `none` | ⬤ negro sólido |
| Wrapper con **solo** `color` fijado (patrón que el README sugería) | `rgb(0,0,0)` | `none` | ⬤ negro sólido — **sigue fallando** |
| Wrapper con `.su-icon` | `none` | `rgb(37,99,235)` | ✅ ícono correcto |
| Wrapper con `color` + `fill:none` + `stroke:currentColor` explícitos | `none` | `rgb(29,78,216)` | ✅ ícono correcto, color custom |

**El README tenía un ejemplo incorrecto** (sección "Iconografía", tamaño
custom con color propio): sugería que bastaba con fijar `color` en un
ancestro porque "cada símbolo tiene `stroke=currentColor`" — falso, ese
atributo vive en el sprite raíz y no llega al `<use>`. Ya corregido en el
README: para tamaño distinto de 24px con color propio (sin `.su-icon`, que
fijaría `width/height:24px`), hay que declarar `fill: none` y
`stroke: currentColor` explícitamente junto con `color`, no alcanza con
`color` solo.

### 5.3 Los 24 íconos disponibles (nombres exactos para `data-su-icon`)

```
alert-circle   dice-5         help-circle    brain
layers         map            search         check-circle
bar-chart-3    trending-up    wallet         video
users          play-circle    message-circle award
clipboard-list shield         zap            x-circle
smartphone     calendar       clock          target
```

Catálogo visual completo: `preview/light.html`, sección "Iconografía".

### 5.4 Gaps conocidos — sin ícono en el set actual

`mail`, `pen-line`, `flame`, `lightbulb`, `wrench`, `lock`.

Encontrados durante la migración de `promo-ai` (necesitaba "contacto",
"editar/redactar", "destacado/hot", "idea", "configuración avanzada",
"privado/seguro"); se resolvieron con sustitutos semánticos del set
existente (ej. `shield` en vez de `lock` para "seguro", `zap` en vez de
`flame` para "destacado"), no ideal pero funcional.

**Recomendación**: antes de migrar trading/crypto/apex — dominios con
vocabulario más específico (alertas de precio, señales, "candado" de
posición cerrada, etc.) — evaluar un **v1.3.0** que sume estos 6 al sprite.
Es aditivo (no rompe nada existente) y evita seguir acumulando sustitutos
semánticos poco precisos landing tras landing.

## 6. Componentes que el DS NO provee

El sistema de diseño cubre tokens, tipografía y 9 clases `.su-*` — no es un
framework de componentes. Lo siguiente se escribe a mano en cada landing
(hay receta de referencia, pero no vive en `theme-light.css`/`suytex.css`):

- **Botones pill** — receta completa en `preview/light.html` (`.btn`,
  `.btn-primary`, `.btn-secondary`: `border-radius: var(--su-radius-pill)`,
  altura 48px, `--su-accent`/`--su-on-accent` para el primario,
  transparente + `--su-line` de borde para el secundario). No está en el
  DS porque el estado hover/variantes varía demasiado por landing.
- **Grids** — cada landing arma su propio `display:grid` (ver
  `.grid`/`.icon-grid` en `preview/light.html` como referencia de spacing).
- **Acordeones** — sin patrón de referencia todavía; a definir si aparece
  una segunda landing que los necesite.
- **Blockquotes / callouts** — sin patrón de referencia todavía.
- **Card de precio con jerarquía** (plan destacado vs. planes secundarios)
  — sin patrón de referencia todavía; usar `.su-card` como base y resolver
  la jerarquía visual (borde de acento, badge, tamaño) ad-hoc.

Cuando un patrón de esta lista se repita en una tercera landing, vale la
pena promoverlo a `theme-light.css` como clase `.su-*` nueva.

## 7. Versionado y publicación

**Bump de `package.json`** en cada cambio: `patch` para documentación o
fixes que no cambian comportamiento visual, `minor` para features aditivas
(un tema nuevo, un set de íconos nuevo). No hay bumps `major` todavía —
todo lo publicado hasta ahora es aditivo, sin breaking changes.

**Changelog:**

| Versión | Contenido |
|---|---|
| `1.0.0` | Tokens dark + 9 clases `.su-*` (`suytex.css`) |
| `1.1.0` | Tema light aditivo (`theme-light.css`) |
| `1.2.0` | Sprite de íconos (`icons.js`) |
| `1.2.1` | Doc: guía de uso AA `--su-fg-subtle` vs `--su-fg-muted` |
| `1.2.2` | Doc: este archivo (`ARCHITECTURE.md`) + fix del ejemplo de color custom en el README de íconos |

**Tags — nunca se pushean desde una sesión cloud.** El token de sesión
cloud tiene permiso para pushear commits a `main` pero **no** para crear
tags (`403` consistente al intentarlo, confirmado — no es un error de red
transitorio). Los tags **siempre** se crean desde la UI de GitHub:

> Releases → Draft a new release → completar el campo tag (crea uno nuevo
> al publicar) → Target: `main` → Publish release

**Estado real de los tags en el remoto** (verificar con
`git ls-remote --tags origin` antes de asumir cuál es el último): a la
fecha de este documento existen `v1.2.0` y `1.2.1` — **sin tags para
`1.0.0`/`1.1.0`** (nunca se crearon) y con una **inconsistencia de naming**:
`1.2.1` no lleva el prefijo `v` que sí lleva `v1.2.0`. Para el tag de esta
misma versión (`1.2.2`) y en adelante, usar siempre el prefijo `v` (`v1.2.2`)
para converger a una sola convención.

**jsDelivr cachea `@main` ~12h.** Nunca apuntar una landing en producción a
`.../suytex-design@main/...` — un fix o revert en `main` puede tardar hasta
12h en reflejarse (o peor, quedar mezclado a mitad de camino). Las landings
**siempre** consumen un tag fijo (`@v1.2.0`, `@1.2.1`, etc.), nunca `@main`.
Para forzar refresco inmediato de un tag ya cacheado, existe el purge de
jsDelivr, pero el patrón correcto es simplemente no re-usar un tag ya
publicado — cada cambio es un tag nuevo.

## 8. Snippet de consumo — landing nueva

Vanilla, CDN, tag fijo (usar siempre el tag más reciente verificado con
`git ls-remote --tags origin`; a la fecha de este documento es `1.2.1` —
actualizar a `v1.2.2` en cuanto se cree ese tag desde la UI):

```html
<html data-theme="light">
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Suytex/suytex-design@1.2.1/suytex.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Suytex/suytex-design@1.2.1/theme-light.css">
</head>
<body class="su-surface">
  ...
  <script src="https://cdn.jsdelivr.net/gh/Suytex/suytex-design@1.2.1/icons.js"></script>
</body>
</html>
```

Notas:

- El orden de los dos `<link>` importa: `suytex.css` primero, `theme-light.css`
  después (sobrescribe las clases `.su-*` dentro de `[data-theme="light"]`).
- `data-su-icon="..."` puede ir en cualquier parte del `<body>` antes del
  `<script>` de `icons.js` — se auto-resuelve en `DOMContentLoaded`. Para
  contenido pintado después (fetch de parciales), ver sección 5.1.
- Vía npm (Yobel/Halving/Talvo, dark-only, sin `theme-light.css`):
  `@import "suytex-design/suytex.css";` — nunca agregar `data-theme="light"`
  en estas apps.

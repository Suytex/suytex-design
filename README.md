# Suytex · Sistema de diseño

Fuente única de verdad de la identidad visual de Suytex. Un archivo CSS sin build.
© Suytex. Uso no autorizado prohibido.

## Tailwind v4 (Yobel · Halving · Talvo)

```
npm i github:Suytex/suytex-design
```

En tu CSS de entrada (el orden importa):

```css
@import "tailwindcss";
@import "suytex-design/suytex.css";
```

Genera utilidades: `bg-brand` `bg-ink` `text-blue` `text-highlight` `text-mist` `border-mist` `font-display` `font-body` `tracking-title…tracking-max` `rounded-suytex`.

## Landing vanilla (GitHub Pages)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Suytex/suytex-design@main/suytex.css">
```

Usa `var(--su-*)` y las clases de firma: `.su-caption` `.su-title` `.su-body` `.su-gradient-text` `.su-hairline` `.su-rule` `.su-card` `.su-icon` `.su-surface`.

## Regla de oro

El gradiente oficial (135°, `--su-gradient`) es **un solo gesto por pieza**. Vive aislado en `.su-gradient-text` a propósito. El azul es acento, nunca relleno.

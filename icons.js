/* ============================================================================
   SUYTEX · ICONOS — sprite SVG aditivo para landings (promo-*, suytex-web)
   ----------------------------------------------------------------------------
   Vanilla, sin dependencias, sin build. NO toca suytex.css ni theme-light.css.

   Iconos extraidos de Lucide (https://lucide.dev, licencia ISC — ver
   LICENSE-lucide.txt en este repo para el texto completo, incluida la
   atribucion a Feather Icons de la que algunos derivan). Cada simbolo
   conserva el path original de Lucide; solo se normalizo el stroke-width
   de 2 a 1.5 (el valor de --su-icon-stroke en suytex.css) y se movieron los
   atributos de presentacion (fill, stroke, stroke-width, linecap, linejoin)
   al <symbol> para que los herede cualquier <use> sin repetirlos por icono.

   Uso (landings vanilla, sin build):
     <script src=".../icons.js"></script>
     <span data-su-icon="search"></span>
     <span data-su-icon="search" data-su-icon-size="32"></span>
     document.getElementById('x').innerHTML = suIcon('search', 32);

   Ver README.md, seccion "Iconografia", para las tres formas de uso y
   como aplicar tamano/color desde el consumidor via la clase .su-icon
   (ya definida en suytex.css) o via currentColor.
   ============================================================================ */

(function () {
  "use strict";

  try {
    var SPRITE_ID = "su-icon-sprite";

    var SPRITE_SYMBOLS =
      '<symbol id="su-alert-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></symbol><symbol id="su-dice-5" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M16 8h.01" /><path d="M8 8h.01" /><path d="M8 16h.01" /><path d="M16 16h.01" /><path d="M12 12h.01" /></symbol><symbol id="su-help-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></symbol><symbol id="su-brain" viewBox="0 0 24 24"><path d="M12 18V5" /><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" /><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" /><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" /><path d="M18 18a4 4 0 0 0 2-7.464" /><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" /><path d="M6 18a4 4 0 0 1-2-7.464" /><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></symbol><symbol id="su-layers" viewBox="0 0 24 24"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" /></symbol><symbol id="su-map" viewBox="0 0 24 24"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></symbol><symbol id="su-search" viewBox="0 0 24 24"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></symbol><symbol id="su-check-circle" viewBox="0 0 24 24"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></symbol><symbol id="su-bar-chart-3" viewBox="0 0 24 24"><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></symbol><symbol id="su-trending-up" viewBox="0 0 24 24"><path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" /></symbol><symbol id="su-wallet" viewBox="0 0 24 24"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" /></symbol><symbol id="su-video" viewBox="0 0 24 24"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></symbol><symbol id="su-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></symbol><symbol id="su-play-circle" viewBox="0 0 24 24"><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" /><circle cx="12" cy="12" r="10" /></symbol><symbol id="su-message-circle" viewBox="0 0 24 24"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></symbol><symbol id="su-award" viewBox="0 0 24 24"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /><circle cx="12" cy="8" r="6" /></symbol><symbol id="su-clipboard-list" viewBox="0 0 24 24"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></symbol><symbol id="su-shield" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></symbol><symbol id="su-zap" viewBox="0 0 24 24"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" /></symbol><symbol id="su-x-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></symbol><symbol id="su-smartphone" viewBox="0 0 24 24"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></symbol><symbol id="su-calendar" viewBox="0 0 24 24"><path d="M8 2v3" /><path d="M16 2v3" /><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></symbol><symbol id="su-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></symbol><symbol id="su-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></symbol>';

    var SPRITE_HTML =
      '<svg xmlns="http://www.w3.org/2000/svg" id="' + SPRITE_ID + '" ' +
      'aria-hidden="true" style="display:none" ' +
      'fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round">' +
      SPRITE_SYMBOLS + "</svg>";

    function injectSprite() {
      if (document.getElementById(SPRITE_ID)) return;
      if (!document.body) return;
      var wrap = document.createElement("div");
      wrap.innerHTML = SPRITE_HTML;
      var svg = wrap.firstChild;
      document.body.insertBefore(svg, document.body.firstChild);
    }

    /**
     * window.suIcon(name, size = 24)
     * Devuelve el string HTML de un <svg><use> que referencia el simbolo
     * "su-{name}" del sprite. No fuerza clase ni color: el consumidor
     * decide (ver README, seccion Iconografia).
     */
    function suIcon(name, size) {
      var s = size || 24;
      return (
        '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" ' +
        'aria-hidden="true" focusable="false"><use href="#su-' + name +
        '"></use></svg>'
      );
    }
    window.suIcon = suIcon;

    function renderAutoIcons() {
      var nodes = document.querySelectorAll("[data-su-icon]");
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var name = el.getAttribute("data-su-icon");
        if (!name) continue;
        var sizeAttr = el.getAttribute("data-su-icon-size");
        var size = sizeAttr ? parseInt(sizeAttr, 10) : undefined;
        el.innerHTML = suIcon(name, size);
      }
    }

    function init() {
      try {
        injectSprite();
        renderAutoIcons();
      } catch (e) {
        /* nunca romper la pagina consumidora por un fallo del sprite */
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  } catch (e) {
    /* fallo total (entorno sin document, etc.): no-op, no propagar */
  }
})();

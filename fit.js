(function () {
  var root = document.documentElement;
  var portrait = window.matchMedia("(orientation: portrait)");
  var wide = window.matchMedia("(min-width: 901px)");
  var DESIGN_W = 1440;
  var DESIGN_H = 900;

  function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
  }

  function fit() {
    var vw = root.clientWidth;
    var vh = window.innerHeight;

    // scale off the tighter of width and height so short landscape
    // screens (laptops, phones held sideways) don't blow up vertically
    var byWidth = vw / DESIGN_W;
    var byHeight = vh / DESIGN_H;
    var s = wide.matches && !portrait.matches
      ? clamp(Math.min(byWidth, byHeight * 1.15), 0.78, 1.35)
      : clamp(byWidth, 0.9, 1.15);

    root.style.setProperty("--scale", s.toFixed(3));
    root.style.setProperty("--vh", vh + "px");

    // let the rail breathe on really wide displays
    root.style.setProperty("--rail", clamp(vw * 0.155, 15, 24).toFixed(2) + "rem");

    // two work columns minimum on desktop, however wide the screen is
    root.style.setProperty("--cols", vw > 1600 ? "3" : vw > 1100 ? "2" : "1");
  }

  if (window.ResizeObserver) {
    new ResizeObserver(fit).observe(root);
  }
  window.addEventListener("resize", fit, { passive: true });
  window.addEventListener("orientationchange", fit);
  if (portrait.addEventListener) portrait.addEventListener("change", fit);
  if (wide.addEventListener) wide.addEventListener("change", fit);

  fit();
})();

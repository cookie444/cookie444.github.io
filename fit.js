(function () {
  var root = document.documentElement;
  var portrait = window.matchMedia("(orientation: portrait)");
  var DESIGN_W = 1440;
  var DESIGN_H = 900;

  function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
  }

  function fit() {
    var vw = root.clientWidth;
    var vh = window.innerHeight;

    // fluid scale: derive from width, but cap by height so short
    // landscape screens don't overflow vertically
    var byWidth = vw / DESIGN_W;
    var byHeight = vh / DESIGN_H;
    var s = portrait.matches
      ? clamp(byWidth, 0.9, 1.12)
      : clamp(Math.min(byWidth, byHeight * 1.15), 0.8, 1.3);
    root.style.setProperty("--scale", s.toFixed(3));

    // work-grid columns follow the viewport, not a fixed breakpoint
    root.style.setProperty("--cols", vw > 1400 ? "3" : vw > 920 ? "2" : "1");
  }

  if (window.ResizeObserver) {
    new ResizeObserver(fit).observe(root);
  }
  window.addEventListener("resize", fit, { passive: true });
  window.addEventListener("orientationchange", fit);
  if (portrait.addEventListener) portrait.addEventListener("change", fit);

  fit();
})();

const { seg, eo, eio, lerp, TextFx } = kit;
kit.scene('real', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="real-cam" style="position:absolute;inset:0">' + W.photo(kit, 'real-photo') +
      '<div class="real-tail" style="position:absolute;left:1300px;top:270px;width:360px;height:80px;border-radius:50%;background:radial-gradient(closest-side, color-mix(in srgb, var(--accent) 80%, transparent), transparent);mix-blend-mode:screen"></div>' +
      '<div class="real-sun" style="position:absolute;left:1500px;top:-200px;width:900px;height:700px;background:radial-gradient(closest-side, color-mix(in srgb, var(--second) 70%, transparent), transparent);mix-blend-mode:screen"></div></div>' +
      '<div class="words" style="left:110px;top:110px;width:1000px"><h2 class="line real-l" style="color:var(--ink)">Real life.</h2><p class="sub real-s" style="color:var(--ink)">Tesla Roadster. Revealed October 15, 2026.</p></div></div>'));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { cam: q('.real-cam'), tail: q('.real-tail'), sun: q('.real-sun'), line: q('.real-l'), sub: q('.real-s') });
  },
  render(t) {
    const push = eio(seg(t, 0, 5));
    this.cam.style.transformOrigin = '1180px 420px';
    this.cam.style.transform = 'scale(' + lerp(1.025, 1.09, push) + ')';
    // the tail lights wake up
    const wake = eo(seg(t, 1.4, 2.0));
    this.tail.style.opacity = (wake * (0.75 + 0.15 * Math.sin(t * 2.2))).toFixed(3);
    this.sun.style.opacity = (0.45 + 0.1 * Math.sin(t * 0.8)).toFixed(3);
    TextFx.fadeFromRight(this.line, t, 0.5);
    this.sub.style.opacity = eo(seg(t, 1.6, 2.2));
  },
});

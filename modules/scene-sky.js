const { seg, eo, eio, lerp, rng, TextFx } = kit;
Object.assign(W, {
  // Towers rising out of a cloud sea, each crowned with a landing pad.
  towers(kit, seed) {
    const r = kit.rng(seed); let s = '<g class="sky-towers">';
    for (let x = 60; x < 1900; x += 150 + r() * 140) {
      const w = 60 + r() * 70, top = 330 + r() * 260, far = r() < 0.5;
      const body = far ? 'color-mix(in srgb, var(--skytop) 70%, var(--ink))' : 'color-mix(in srgb, var(--skytop) 45%, var(--ink))';
      s += '<g><rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + (760 - top) + '" style="fill:' + body + '"/>' +
        '<rect x="' + (x + w * 0.62) + '" y="' + top + '" width="' + (w * 0.38) + '" height="' + (760 - top) + '" style="fill:color-mix(in srgb, var(--main) 35%, transparent)"/>' +
        '<ellipse cx="' + (x + w / 2) + '" cy="' + top + '" rx="' + (w * 0.95) + '" ry="' + (w * 0.16) + '" style="fill:' + body + '"/>' +
        '<ellipse cx="' + (x + w / 2) + '" cy="' + (top - 3) + '" rx="' + (w * 0.7) + '" ry="' + (w * 0.1) + '" style="fill:none;stroke:var(--second);stroke-width:2;opacity:.7"/></g>';
    }
    return s + '</g>';
  },
});
kit.scene('sky', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground" style="background:linear-gradient(color-mix(in srgb, var(--skytop) 80%, var(--ink)), var(--skytop) 40%, color-mix(in srgb, var(--main) 70%, var(--second)) 75%)">' +
      '<div class="sky-sun" style="position:absolute;left:1250px;top:380px;width:900px;height:600px;background:radial-gradient(closest-side, color-mix(in srgb, var(--second) 85%, transparent), transparent)"></div>' +
      '<svg class="art sky-far" viewBox="0 0 1920 1080">' + W.towers(kit, 11) + W.clouds(kit, 7, 12, 700, 120, 'color-mix(in srgb, var(--second) 92%, var(--main))') + '</svg>' +
      '<svg class="art sky-trail" viewBox="0 0 1920 1080"><path class="sky-line" style="fill:none;stroke:var(--second);stroke-width:6;stroke-linecap:round;opacity:.7"/></svg>' +
      '<div class="sky-car" style="position:absolute;inset:0">' + W.car(kit, 'sky-cut') + '</div>' +
      '<svg class="art sky-near" viewBox="0 0 1920 1080">' + W.clouds(kit, 19, 6, 930, 120, 'var(--second)') + '</svg>' +
      '<p class="tag" style="right:60px;top:50px;color:var(--ink)">Concept visualization</p>' +
      '<div class="words" style="left:110px;top:110px;width:1000px"><h2 class="line sky-l" style="color:var(--ink)">Where will you go?</h2><p class="sub sky-s" style="color:var(--ink)">Imagine the commute above it all.</p></div></div>'));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { far: q('.sky-far'), near: q('.sky-near'), car: q('.sky-car'), line: q('.sky-line'), l: q('.sky-l'), s: q('.sky-s'), sun: q('.sky-sun') });
  },
  render(t) {
    const p = eio(seg(t, -0.3, 6));
    this.far.style.transform = 'translateX(' + lerp(0, -60, p).toFixed(1) + 'px)';
    this.near.style.transform = 'translateX(' + lerp(200, -300, p).toFixed(1) + 'px) scale(1.15)';
    // the car glides right to left, nose first, with a gentle bank and bob
    const cx = lerp(1700, 760, eio(seg(t, -0.2, 5.6))), cy = 560 + 14 * Math.sin(t * 1.4);
    const sc = lerp(0.36, 0.5, p);
    this.car.style.transformOrigin = '1181px 420px';
    this.car.style.transform = 'translate(' + (cx - 1181).toFixed(1) + 'px,' + (cy - 420).toFixed(1) + 'px) scale(' + sc.toFixed(3) + ') rotate(' + (-2 + 1.5 * Math.sin(t * 0.9)).toFixed(2) + 'deg)';
    const tail = cx + 200 * sc;
    this.line.setAttribute('d', 'M' + tail.toFixed(1) + ' ' + (cy - 20).toFixed(1) + ' Q' + (tail + 400).toFixed(1) + ' ' + (cy - 30).toFixed(1) + ' 2000 ' + (cy - 90).toFixed(1));
    this.sun.style.opacity = (0.8 + 0.1 * Math.sin(t * 0.7)).toFixed(3);
    TextFx.fadeFromRight(this.l, t, 0.6);
    this.s.style.opacity = eo(seg(t, 2.0, 2.6));
  },
});

const { seg, eo, eio, eob, lerp, TextFx } = kit;
kit.scene('end', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="end-glow" style="position:absolute;left:360px;top:120px;width:1200px;height:600px;background:radial-gradient(closest-side, color-mix(in srgb, var(--main) 22%, transparent), transparent)"></div>' +
      '<div class="end-car" style="position:absolute;inset:0">' + W.car(kit, 'end-cut') + '</div>' +
      '<div class="words" style="left:0;right:0;top:620px;align-items:center;text-align:center"><h2 class="line end-l" style="font-size:170px">Roadster</h2><p class="sub end-s" style="color:var(--main)">Production planned for 2028.</p></div>' +
      '<div class="words" style="left:0;right:0;bottom:40px;align-items:center;text-align:center"><p class="small end-f">Sky scenes are a concept visualization. Not approved for public road use.</p></div></div>'));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { car: q('.end-car'), l: q('.end-l'), s: q('.end-s'), f: q('.end-f'), glow: q('.end-glow') });
  },
  render(t) {
    const land = eob(seg(t, -0.4, 0.7), 1.4);
    this.car.style.transformOrigin = '1181px 420px';
    this.car.style.transform = 'translate(' + (960 - 1181) + 'px,' + (lerp(-120, 0, land) + (380 - 420) - 6 * Math.sin(t * 1.5)).toFixed(1) + 'px) scale(' + lerp(0.5, 0.62, eio(seg(t, 0, 4))).toFixed(3) + ')';
    this.car.style.opacity = eo(seg(t, -0.4, 0.3));
    this.glow.style.opacity = eo(seg(t, 0.2, 1.2));
    TextFx.fadeFromRight(this.l, t, 0.4);
    this.s.style.opacity = eo(seg(t, 1.2, 1.7));
    this.f.style.opacity = eo(seg(t, 1.0, 1.5));
  },
});

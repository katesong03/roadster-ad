const { seg, eo, ei, eio, eob, lerp, TextFx } = kit;
kit.scene('lift', {
  init(kit) {
    this.dust = W.dust(kit, 28, 1181, 470, 760);
    this.jet = W.dust(kit, 10, 1181, 560, 380);
    kit.stage.append(kit.h('<div class="ground" style="background:linear-gradient(var(--skytop), var(--skylow) 90%)">' +
      '<svg class="art lift-sky" viewBox="0 0 1920 1080">' + W.clouds(kit, 3, 8, -700, 500, 'color-mix(in srgb, var(--second) 85%, transparent)') + '</svg>' +
      '<div class="lift-world" style="position:absolute;inset:0">' + W.photo(kit, 'lift-photo') +
      '<svg class="art" viewBox="0 0 1920 1080"><ellipse class="lift-cover" cx="1181" cy="420" rx="430" ry="190" style="fill:var(--sand)"/>' + this.dust.markup + '</svg></div>' +
      '<div class="lift-car" style="position:absolute;inset:0"><div class="lift-glow" style="position:absolute;left:880px;top:500px;width:600px;height:140px;border-radius:50%;background:radial-gradient(closest-side, color-mix(in srgb, var(--second) 90%, transparent), transparent)"></div>' + W.car(kit, 'lift-cut') +
      '<svg class="art" viewBox="0 0 1920 1080">' + this.jet.markup + '</svg></div>' +
      '<div class="words" style="left:100px;top:90px;width:640px"><h2 class="line lift-l" style="font-size:120px;color:var(--ink)">Then it left the ground.</h2></div></div>'));
    const q = (s) => kit.stage.querySelector(s);
    const gs = kit.stage.querySelectorAll('.dust');
    this.dust.bind(gs[0]); this.jet.bind(gs[1]);
    Object.assign(this, { world: q('.lift-world'), sky: q('.lift-sky'), car: q('.lift-car'), glow: q('.lift-glow'), cover: q('.lift-cover'), line: q('.lift-l') });
  },
  render(t) {
    const kick = eo(seg(t, 0.4, 1.8));
    this.dust.render(kick, 1);
    this.cover.style.opacity = (eo(seg(t, 0.7, 1.3)) * 0.95).toFixed(3);
    const D = eio(seg(t, 1.5, 4.6)) * 820;
    const rise = eob(seg(t, 1.1, 2.6), 1.4) * 170 + 10 * Math.sin(t * 2.4) * seg(t, 2.4, 3);
    const shake = t > 0.4 && t < 1.3 ? Math.sin(t * 70) * 4 * (1.3 - t) : 0;
    this.world.style.transform = 'translate(' + shake.toFixed(1) + 'px,' + D.toFixed(1) + 'px)';
    this.sky.style.transform = 'translateY(' + (D * 0.45).toFixed(1) + 'px)';
    this.car.style.transformOrigin = '1181px 420px';
    this.car.style.transform = 'translate(' + (shake + 170 * eio(seg(t, 1.1, 3.4))).toFixed(1) + 'px,' + (-rise).toFixed(1) + 'px) rotate(' + (-3 * eo(seg(t, 1.1, 2.2)) + 2 * eo(seg(t, 2.6, 3.8))).toFixed(2) + 'deg)';
    const burn = seg(t, 0.5, 1.0) * (1 - 0.6 * seg(t, 2.8, 3.6));
    this.glow.style.opacity = (burn * (0.9 + 0.1 * Math.sin(t * 9))).toFixed(3);
    this.jet.render(eo(seg(t, 0.6, 2.4)), 1 - seg(t, 2.2, 3.2));
    TextFx.fadeFromRight(this.line, t, 2.9);
  },
});

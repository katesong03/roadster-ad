const { seg, eo, eio, eob, lerp, TextFx } = kit;
kit.scene('feed', {
  init(kit) {
    const post = (i) => '<div style="position:absolute;left:0;right:0;top:' + (i * 420) + 'px;height:410px"><div style="position:absolute;left:22px;top:20px;width:40px;height:40px;border-radius:50%;background:var(--card)"></div><div style="position:absolute;left:74px;top:28px;width:150px;height:12px;border-radius:6px;background:var(--card)"></div>' +
      '<div style="position:absolute;left:22px;top:70px;width:364px;height:243px;border-radius:18px;background:linear-gradient(135deg,var(--card),color-mix(in srgb, var(--card) 60%, var(--ground)))"></div><div style="position:absolute;left:22px;top:330px;width:250px;height:12px;border-radius:6px;background:var(--card)"></div><div style="position:absolute;left:22px;top:352px;width:180px;height:12px;border-radius:6px;background:var(--card)"></div></div>';
    const hero = '<div style="position:absolute;left:0;right:0;top:1260px;height:410px"><div style="position:absolute;left:22px;top:20px;width:40px;height:40px;border-radius:50%;background:var(--second)"></div><p style="position:absolute;left:74px;top:22px;margin:0;font-size:22px;font-weight:700">Roadster</p>' +
      '<div class="feed-shot" style="position:absolute;left:22px;top:70px;width:364px;height:243px;border-radius:18px;overflow:hidden"><img src="' + kit.assets.url('roadster.webp') + '" style="width:100%;height:100%;display:block" alt=""></div><p style="position:absolute;left:22px;top:326px;margin:0;font-size:22px;color:var(--mute)">Just revealed</p></div>';
    const inner = '<div class="feed-scroll" style="position:absolute;left:0;right:0;top:0;height:2600px">' + [0, 1, 2].map(post).join('') + hero + [4, 5].map(post).join('') + '</div>' +
      '<div style="position:absolute;left:0;right:0;top:0;height:70px;background:linear-gradient(var(--glass) 60%,transparent)"></div>';
    kit.stage.append(kit.h('<div class="ground"><div class="feed-glow" style="position:absolute;left:900px;top:-100px;width:1120px;height:1280px;background:radial-gradient(closest-side, color-mix(in srgb, var(--second) 12%, transparent), transparent)"></div>' +
      '<div class="feed-cam" style="position:absolute;inset:0">' + W.phone('feed-phone', inner) + '</div><div class="edge"></div>' +
      '<div class="words" style="left:150px;top:380px;width:900px"><h1 class="line feed-l">Still scrolling?</h1><p class="sub feed-s" style="color:var(--mute)">Wait. Stop right there.</p></div></div>'));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { scroll: q('.feed-scroll'), cam: q('.feed-cam'), line: q('.feed-l'), sub: q('.feed-s'), glow: q('.feed-glow') });
  },
  render(t) {
    // flick, flick, then the hero post lands where the next scene picks it up (screen y 284)
    const a = eo(seg(t, 0.2, 1.1)) * 380, b = eob(seg(t, 1.5, 3.0), 1.5) * (1046 - 380);
    this.scroll.style.transform = 'translateY(' + (-(a + b)).toFixed(1) + 'px)';
    this.cam.style.transform = 'scale(' + lerp(1, 1.03, eio(seg(t, 0, 5))) + ')';
    this.cam.style.transformOrigin = '1460px 540px';
    this.glow.style.opacity = 0.5 + 0.5 * eo(seg(t, 2.6, 3.4));
    TextFx.fadeFromRight(this.line, t, -0.3);
    this.sub.style.opacity = eo(seg(t, 3.1, 3.6));
  },
});

const { seg, eo, ei, eio, eob, lerp, clamp01, TextFx } = kit;
kit.scene('breakout', {
  init(kit) {
    const inner = '<div style="position:absolute;left:22px;top:284px;width:364px;height:243px;border-radius:18px;background:var(--card)"></div>';
    kit.stage.append(kit.h('<div class="ground"><div class="breakout-ph" style="position:absolute;inset:0">' + W.phone('breakout-phone', inner) + '</div>' +
      '<div class="breakout-frame" style="position:absolute;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6)"><img class="breakout-img" src="' + kit.assets.url('roadster.webp') + '" style="position:absolute;display:block" alt=""></div>' +
      '<div class="breakout-flash" style="position:absolute;inset:0;background:var(--second);opacity:0"></div>' +
      '<div class="words" style="left:110px;top:120px;width:1100px"><h2 class="line breakout-l" style="font-size:110px;color:var(--ink)">Not on your screen anymore.</h2></div></div>'));
    const q = (s) => kit.stage.querySelector(s);
    Object.assign(this, { ph: q('.breakout-ph'), frame: q('.breakout-frame'), img: q('.breakout-img'), flash: q('.breakout-flash'), line: q('.breakout-l') });
  },
  render(t) {
    // anticipation: the card leans back, then bursts to full frame
    const pre = Math.sin(Math.PI * seg(t, 0.3, 0.75)) * 0.04;
    const p = eio(seg(t, 0.7, 2.1)), ov = eob(seg(t, 0.7, 2.1), 1.5);
    const x = lerp(1278, 0, p), y = lerp(390, 0, p), w = lerp(364, 1920, ov), h = lerp(243, 1080, ov);
    const s = 1 - pre;
    this.frame.style.left = (x + (1 - s) * w / 2).toFixed(1) + 'px';
    this.frame.style.top = (y + (1 - s) * h / 2).toFixed(1) + 'px';
    this.frame.style.width = (w * s).toFixed(1) + 'px';
    this.frame.style.height = (h * s).toFixed(1) + 'px';
    this.frame.style.borderRadius = lerp(18, 0, p).toFixed(1) + 'px';
    // the photo inside keeps the full-bleed crop: 1920x1279 at -100, scaled to the frame
    const k = (w * s) / 1920;
    this.img.style.width = (1920 * k).toFixed(1) + 'px';
    this.img.style.height = (1279 * k).toFixed(1) + 'px';
    this.img.style.left = '0px';
    this.img.style.top = (lerp(0, -100, p) * k + lerp(0, 0, p)).toFixed(1) + 'px';
    if (p < 0.02) { this.img.style.width = (364 * s) + 'px'; this.img.style.height = (243 * s) + 'px'; this.img.style.top = '0px'; }
    this.ph.style.transform = 'translateY(' + (ei(seg(t, 0.9, 2.0)) * 300).toFixed(1) + 'px) scale(' + lerp(1, 1.3, eo(seg(t, 0.8, 2.0))) + ')';
    this.ph.style.opacity = 1 - seg(t, 1.2, 1.9);
    this.flash.style.opacity = (Math.sin(Math.PI * seg(t, 1.9, 2.4)) * 0.25).toFixed(3);
    this.frame.style.transform = 'scale(' + lerp(1, 1.025, eio(seg(t, 2.1, 5))) + ')';
    TextFx.fadeFromRight(this.line, t, 2.7);
  },
});

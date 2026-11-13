// The world: their photo, a phone, and a sky above it.
window.W = {
  // The real photo, full-bleed (1920 wide, cropped top and bottom).
  photo(kit, cls) { return '<img class="photo ' + cls + '" src="' + kit.assets.url('roadster.webp') + '" alt="">'; },
  // The car alone, cut from the same photo; same box as photo(), so it lines up exactly.
  car(kit, cls) { return '<img class="photo carcut ' + cls + '" src="' + kit.assets.url('roadster.webp') + '" alt="">'; },
  // A phone, 440x900, its screen content passed in.
  phone(cls, inner) {
    return '<div class="' + cls + '" style="position:absolute;left:1240px;top:90px;width:440px;height:900px;border-radius:64px;background:#000;box-shadow:0 0 0 3px var(--card),0 40px 90px rgba(0,0,0,.6)">' +
      '<div class="' + cls + '-screen" style="position:absolute;left:16px;top:16px;right:16px;bottom:16px;border-radius:50px;overflow:hidden;background:var(--glass)">' + inner + '</div>' +
      '<div style="position:absolute;left:170px;top:30px;width:100px;height:28px;border-radius:14px;background:#000"></div></div>';
  },
  // Puffy clouds from a seed.
  clouds(kit, seed, n, y0, spread, tone) {
    const r = kit.rng(seed); let s = '<g class="clouds">';
    for (let i = 0; i < n; i++) { const cx = r() * 2200 - 140, cy = y0 + r() * spread, w = 180 + r() * 260;
      s += '<g style="fill:' + tone + '"><ellipse cx="' + cx + '" cy="' + cy + '" rx="' + w + '" ry="' + (w * 0.22) + '"/><ellipse cx="' + (cx - w * 0.3) + '" cy="' + (cy - w * 0.12) + '" rx="' + (w * 0.42) + '" ry="' + (w * 0.24) + '"/><ellipse cx="' + (cx + w * 0.25) + '" cy="' + (cy - w * 0.18) + '" rx="' + (w * 0.5) + '" ry="' + (w * 0.3) + '"/></g>'; }
    return s + '</g>';
  },
  // Dust puffs, seeded; render(t, k) grows them with k 0..1.
  dust(kit, n, x, y, w) {
    const r = kit.rng(n + 5), list = Array.from({ length: n }, () => ({ x: x + (r() - 0.5) * w, y: y + (r() - 0.5) * 60, s: 60 + r() * 120, dx: (r() - 0.5) * 300, up: 40 + r() * 140 }));
    return {
      markup: '<g class="dust">' + list.map(() => '<circle style="fill:var(--sand)"/>').join('') + '</g>',
      bind(g) { list.forEach((p, i) => { p.el = g.children[i]; }); },
      render(k, fade) { for (const p of list) { p.el.setAttribute('cx', (p.x + p.dx * k).toFixed(1)); p.el.setAttribute('cy', (p.y - p.up * k).toFixed(1)); p.el.setAttribute('r', (p.s * (0.3 + k)).toFixed(1)); p.el.style.opacity = (Math.min(1, k * 3) * (fade == null ? 1 : fade) * 0.92).toFixed(3); } },
    };
  },
};

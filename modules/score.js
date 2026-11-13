kit.score(function (S, T) {
  S.tempo(120, { t0: 0 });
  S.program('pad', 'pad', { rev: 0.7 }); S.program('bass', 'bass'); S.program('keys', 'ep', { rev: 0.35 }); S.program('gl', 'glock', { rev: 0.6 }); S.program('pl', 'pluck', { rev: 0.4, pan: -0.2 });
  // The feed: a quiet room, thumb flicks, a ping.
  S.chord('pad', ['D3', 'A3'], { t: 0, dur: 5, vel: 26 });
  S.fx('tick', 0.25, { vel: 45 }); S.fx('tick', 1.55, { vel: 45 }); S.fx('click', 2.95, { vel: 55 });
  S.fx('ding', T.feed + 3.0, { vel: 50 });
  // Breakout: swell, burst.
  S.fx('revswell', T.breakout + 0.7, { dur: 0.7, vel: 60 });
  S.fx('whoosh', T.breakout + 0.7, { dur: 1.2, vel: 80 });
  S.fx('thud', T.breakout + 2.0, { vel: 85 }); S.drum('crash', { t: T.breakout + 2.0, vel: 75 });
  S.chord('pad', ['D3', 'A3', 'E4', 'F#4'], { t: T.breakout + 2.0, dur: 3, vel: 48 });
  // Real life: the groove arrives; low motor hum as the lights wake.
  const ch = [['D3', 'F#3', 'A3', 'E4'], ['B2', 'D3', 'F#3', 'A3'], ['G2', 'B2', 'D3', 'F#3'], ['A2', 'C#3', 'E3', 'B3']], rt = ['D2', 'B1', 'G1', 'A1'];
  for (let bar = 0; bar < 5; bar++) { const b = 20 + bar * 4, c = bar % 4;
    S.chord('keys', ch[c], { beat: b, beats: 3.5, vel: 50 });
    S.pattern('bass', 'X...x.x.', { from: b, repeat: 1, pitch: [rt[c]], vel: 80 });
    S.pattern('pl', '..x..x.x', { from: b, repeat: 1, pitch: [ch[c][3].replace(/\d/, '5'), ch[c][2].replace(/\d/, '5')], vel: 40 }); }
  S.drums({ kick: 'x...x...', hat: 'oxoxoxox', snare: '..x...x.' }, { from: 20, repeat: 4 });
  S.fx('roll', T.real + 1.4, { dur: 1.6, vel: 45, pitch: 0.5 });
  // Lift: thrusters, dust, the climb.
  S.fx('thud', T.lift + 0.45, { vel: 90 }); S.fx('roll', T.lift + 0.5, { dur: 2.2, vel: 70, pitch: 0.4 });
  S.fx('whoosh', T.lift + 0.6, { dur: 2.0, vel: 85 }); S.fx('revswell', T.lift + 1.6, { dur: 1.0, vel: 70 });
  S.drum('crash', { t: T.lift + 1.6, vel: 85 }); S.drum('kick', { t: T.lift + 1.6, vel: 100 });
  S.drums({ kick: 'x..x..x.', hat: 'xxxxxxxx', clap: '....x...' }, { from: 34, repeat: 1 });
  // Sky: open air, a glock line, the car passes.
  S.chord('pad', ['G3', 'D4', 'A4', 'B4'], { t: T.sky, dur: 6, vel: 52 });
  S.run('gl', ['A5', 'B5', 'D6', 'E6', 'F#6', 'A6'], { t: T.sky + 0.6, step: 0.5, vel: 45 });
  S.fx('whoosh', T.sky + 2.4, { dur: 1.4, vel: 60, pan: -0.5 });
  S.drums({ kick: 'x.......', shaker: 'xxxxxxxx' }, { from: 40, repeat: 3 });
  // End card: the hit, then let it ring.
  S.fx('revswell', T.end + 0.4, { dur: 1.0, vel: 65 });
  S.drum('crash', { t: T.end + 0.4, vel: 95 }); S.drum('kick', { t: T.end + 0.4, vel: 100 }); S.fx('thud', T.end + 0.4, { vel: 70 });
  S.chord('pad', ['D3', 'A3', 'E4', 'F#4', 'A4'], { t: T.end + 0.4, dur: 3.6, vel: 70 });
  S.note('bass', 'D1', { t: T.end + 0.4, dur: 3, vel: 90 });
  S.fx('chime', T.end + 1.3, { vel: 60 });
  S.master({ gain: -5, fadeOut: 1.4 });
});

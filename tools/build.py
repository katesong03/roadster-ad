import base64, json, pathlib
R = pathlib.Path('/home/claude/roadster-ad')
tpl = (R/'tools/player.html').read_text()
css = (R/'modules/base.css').read_text()
scenes = json.loads((R/'modules/scenes.json').read_text())
img = 'data:image/webp;base64,' + base64.b64encode((R/'assets/roadster.webp').read_bytes()).decode()
order = ['shared.js'] + ['scene-%s.js' % s['id'] for s in scenes['scenes']] + ['score.js']
mods = '\n'.join('(function (kit) {\n%s\n})(base);' % (R/'modules'/m).read_text() for m in order)
out = tpl.replace('/*__CSS__*/', css).replace('__SCENES__', json.dumps(scenes)).replace("'__IMG__'", json.dumps(img)).replace('/*__MODULES__*/', mods)
(R/'index.html').write_text(out)

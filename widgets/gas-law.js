/**
 * Ideal Gas Law (PV = nRT) interactive simulation.
 * Starts with a static equation; reveals full widget on button click.
 */
(function () {
  var root = document.getElementById('edu-widget-container');
  var intro = document.getElementById('gas-law-intro');
  var revealBtn = document.getElementById('gas-law-reveal-btn');
  var staticEq = document.getElementById('gas-law-static-eq');
  if (!root || !intro || !revealBtn) return;

  if (staticEq && window.katex) {
    katex.render('PV = nRT', staticEq, { displayMode: true, throwOnError: false });
  } else if (staticEq) {
    staticEq.style.cssText = 'font-family:"Times New Roman",Georgia,serif;font-style:italic;color:var(--text-primary);padding:8px 0;font-size:var(--text-2xl);';
    staticEq.textContent = 'PV = nRT';
  }

  var built = false;

  revealBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!built) {
      buildWidget();
      built = true;
    }
    intro.classList.add('collapsed');
    setTimeout(function () {
      intro.style.display = 'none';
      root.classList.add('revealed');
    }, 200);
  });

  var PARTICLES_PER_MOL = 40;
  var R = 0.0821;
  var n = 1;
  var T = 350;
  var V = 5;
  var particles = [];
  var animId = null;

  function buildWidget() {
    root.textContent = '';
    root.style.padding = 'var(--space-md)';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.gap = '10px';

    var eqnDiv = document.createElement('div');
    eqnDiv.style.cssText = 'text-align:center;font-size:1.5em;';
    root.appendChild(eqnDiv);
    if (window.katex) {
      katex.render('PV = nRT', eqnDiv, { displayMode: true, throwOnError: false });
    } else {
      eqnDiv.style.cssText += 'font-family:"Times New Roman",Georgia,serif;font-style:italic;color:var(--text-primary);padding:8px 0;font-size:var(--text-2xl);';
      eqnDiv.textContent = 'PV = nRT';
    }

    var eqnLabel = document.createElement('p');
    eqnLabel.style.cssText = 'font-family:var(--font-display);font-size:var(--text-xs);color:var(--text-tertiary);text-align:center;margin-top:-8px;';
    eqnLabel.textContent = 'Ideal Gas Law';
    root.appendChild(eqnLabel);

    var liveEqn = document.createElement('div');
    liveEqn.style.cssText = 'text-align:center;font-family:var(--font-display);font-size:var(--text-xs);color:var(--text-tertiary);letter-spacing:0.01em;margin-top:-2px;';
    root.appendChild(liveEqn);

    var lePval = document.createElement('span');
    lePval.style.fontWeight = '600';
    var leMiddle = document.createTextNode('');
    var leResult = document.createElement('span');
    leResult.style.cssText = 'color:var(--text-primary);font-weight:600;';
    liveEqn.appendChild(lePval);
    liveEqn.appendChild(leMiddle);
    liveEqn.appendChild(leResult);

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;border-radius:8px;background:var(--bg-base);';
    root.appendChild(canvas);

    var controls = document.createElement('div');
    controls.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
    root.appendChild(controls);

    function makeSlider(label, min, max, step, value, unit, onChange) {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:10px;';

      var lbl = document.createElement('span');
      lbl.style.cssText = 'font-family:var(--font-display);font-size:var(--text-xs);color:var(--text-secondary);width:100px;text-align:right;';
      lbl.textContent = label;
      row.appendChild(lbl);

      var input = document.createElement('input');
      input.type = 'range';
      input.min = min;
      input.max = max;
      input.step = step;
      input.value = value;
      input.style.cssText = 'flex:1;accent-color:#00c4cc;cursor:pointer;';
      row.appendChild(input);

      var val = document.createElement('span');
      val.style.cssText = 'font-family:var(--font-display);font-size:var(--text-xs);color:var(--text-primary);width:80px;';
      val.textContent = (step < 1 ? parseFloat(value).toFixed(1) : value) + ' ' + unit;
      row.appendChild(val);

      input.addEventListener('input', function () {
        var v = parseFloat(input.value);
        val.textContent = (step < 1 ? v.toFixed(1) : v) + ' ' + unit;
        onChange(v);
      });

      controls.appendChild(row);
      return input;
    }

    makeSlider('Temperature', 200, 600, 1, T, 'K', function (v) { T = v; resetSpeeds(); });
    makeSlider('Volume', 1, 10, 0.1, V, 'L', function (v) { V = v; });
    makeSlider('Moles (n)', 0.5, 5, 0.1, n, 'mol', function (v) { n = v; syncParticles(); });

    var pressureRow = document.createElement('div');
    pressureRow.style.cssText = 'display:flex;align-items:center;gap:10px;justify-content:center;margin-top:4px;';

    var pressureLabel = document.createElement('span');
    pressureLabel.style.cssText = 'font-family:var(--font-display);font-size:var(--text-sm);color:var(--text-secondary);';
    pressureLabel.textContent = 'Pressure:';
    pressureRow.appendChild(pressureLabel);

    var pressureVal = document.createElement('span');
    pressureVal.style.cssText = 'font-family:var(--font-display);font-size:var(--text-lg);font-weight:600;color:var(--color-teal);min-width:100px;';
    pressureRow.appendChild(pressureVal);

    controls.appendChild(pressureRow);

    var hint = document.createElement('p');
    hint.style.cssText = 'font-family:var(--font-display);font-size:var(--text-xs);color:var(--text-tertiary);text-align:center;opacity:0.45;margin-top:2px;font-style:italic;';
    hint.textContent = 'Try: halve the volume \u2014 what happens to pressure?';
    root.appendChild(hint);

    /* ---- Particles ---- */

    function tempHue() {
      return 220 - ((T - 200) / 400) * 200;
    }

    function baseSpeed() {
      return 1.2 * Math.pow(T / 300, 1.5);
    }

    function makeParticle() {
      var p = {
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
      };
      var spd = baseSpeed() * (0.6 + Math.random() * 0.8);
      var mag = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1;
      p.vx = (p.vx / mag) * spd;
      p.vy = (p.vy / mag) * spd;
      return p;
    }

    function initParticles() {
      particles = [];
      var count = Math.round(PARTICLES_PER_MOL * n);
      for (var i = 0; i < count; i++) particles.push(makeParticle());
    }

    function syncParticles() {
      var target = Math.round(PARTICLES_PER_MOL * n);
      while (particles.length < target) particles.push(makeParticle());
      while (particles.length > target) particles.pop();
    }

    function normalizeSpeeds() {
      var spd = baseSpeed();
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var mag = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1;
        var s = spd * (0.6 + Math.random() * 0.8);
        p.vx = (p.vx / mag) * s;
        p.vy = (p.vy / mag) * s;
      }
    }

    function resetSpeeds() { normalizeSpeeds(); }

    initParticles();

    function pressureColor(P) {
      var t = Math.max(0, Math.min(1, (P - 2) / 28));
      t = Math.sqrt(t);
      var hue = 180 * (1 - t);
      return 'hsl(' + hue + ', 85%, 55%)';
    }

    var _lastEqKey = '';

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.width * 0.45 * dpr;
      canvas.style.height = (rect.width * 0.45) + 'px';
    }

    function draw() {
      resize();
      var dpr = window.devicePixelRatio || 1;
      var ctx = canvas.getContext('2d');
      var w = canvas.width / dpr;
      var h = canvas.height / dpr;
      if (w === 0 || h === 0) { animId = requestAnimationFrame(draw); return; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.clearRect(0, 0, w, h);

      var cPad = 20;
      var maxCW = w - cPad * 2;
      var cW = maxCW * (V / 10);
      var cH = h - cPad * 2 - 16;
      var cX = (w - cW) / 2;
      var cY = cPad;

      var P = (n * R * T) / V;
      var pColor = pressureColor(P);

      ctx.save();
      ctx.strokeStyle = pColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = pColor;
      ctx.shadowBlur = 8;
      ctx.strokeRect(cX, cY, cW, cH);
      ctx.restore();

      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillStyle = isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)';
      ctx.textAlign = 'center';
      ctx.fillText('V = ' + V.toFixed(1) + ' L', w / 2, cY + cH + 14);

      var hue = tempHue();
      var dt = 0.012;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < 0) { p.x = -p.x; p.vx = Math.abs(p.vx); }
        if (p.x > 1) { p.x = 2 - p.x; p.vx = -Math.abs(p.vx); }
        if (p.y < 0) { p.y = -p.y; p.vy = Math.abs(p.vy); }
        if (p.y > 1) { p.y = 2 - p.y; p.vy = -Math.abs(p.vy); }

        var px = cX + p.x * cW;
        var py = cY + p.y * cH;
        var radius = 3;

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + hue + ', 80%, 60%, 0.9)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + hue + ', 80%, 60%, 0.15)';
        ctx.fill();
      }

      var eqKey = n.toFixed(1) + '|' + T + '|' + V.toFixed(1);
      if (eqKey !== _lastEqKey) {
        _lastEqKey = eqKey;
        pressureVal.textContent = P.toFixed(1) + ' atm';
        pressureVal.style.color = pColor;

        var nrt = (n * R * T).toFixed(1);
        lePval.textContent = P.toFixed(1);
        lePval.style.color = pColor;
        leMiddle.textContent =
          ' \u00d7 ' + V.toFixed(1) +
          '\u2002=\u2002' + n.toFixed(1) + ' \u00d7 0.0821 \u00d7 ' + T +
          '\u2002=\u2002';
        leResult.textContent = nrt;
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!animId) draw();
      } else {
        cancelAnimationFrame(animId);
        animId = null;
      }
    });
    observer.observe(root);
  }
})();

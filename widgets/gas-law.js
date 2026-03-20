/**
 * Ideal Gas Law (PV = nRT) interactive simulation.
 * Renders into #edu-widget-container.
 */
(function () {
  var root = document.getElementById('edu-widget-container');
  if (!root) return;

  var N_PARTICLES = 50;
  var R = 0.0821; // L·atm / (mol·K)
  var n = 1;      // mol (constant)
  var T = 350;    // K
  var V = 5;      // L
  var particles = [];
  var animId = null;

  /* ---- Build DOM ---- */

  root.textContent = '';
  root.style.padding = 'var(--space-md)';
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = '12px';

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

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;border-radius:8px;background:var(--bg-base);';
  root.appendChild(canvas);

  var controls = document.createElement('div');
  controls.style.cssText = 'display:flex;flex-direction:column;gap:10px;';
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
    val.textContent = value + ' ' + unit;
    row.appendChild(val);

    input.addEventListener('input', function () {
      val.textContent = input.value + ' ' + unit;
      onChange(parseFloat(input.value));
    });

    controls.appendChild(row);
    return input;
  }

  makeSlider('Temperature', 200, 600, 1, T, 'K', function (v) { T = v; resetSpeeds(); });
  makeSlider('Volume', 1, 10, 0.1, V, 'L', function (v) { V = v; });

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

  /* ---- Particles ---- */

  function tempHue() {
    // 200K → hue 220 (blue), 400K → 180 (teal), 600K → 20 (orange)
    return 220 - ((T - 200) / 400) * 200;
  }

  function baseSpeed() {
    return 1.2 * Math.pow(T / 300, 1.5);
  }

  function initParticles() {
    particles = [];
    for (var i = 0; i < N_PARTICLES; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }
    normalizeSpeeds();
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

  function resetSpeeds() {
    normalizeSpeeds();
  }

  initParticles();

  function pressureColor(P) {
    var Pmin = (n * R * 200) / 10;
    var Pmax = (n * R * 600) / 1;
    var t = Math.max(0, Math.min(1, (P - Pmin) / (Pmax - Pmin)));
    var hue = 180 * (1 - t);
    return 'hsl(' + hue + ', 85%, 55%)';
  }

  /* ---- Render loop ---- */

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
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
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.clearRect(0, 0, w, h);

    var cPad = 20;
    var maxCW = w - cPad * 2;
    var cW = maxCW * (V / 10);
    var cH = h - cPad * 2;
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

    // Update & draw particles
    var hue = tempHue();
    var spd = baseSpeed();
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

      // glow
      ctx.beginPath();
      ctx.arc(px, py, radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + hue + ', 80%, 60%, 0.15)';
      ctx.fill();
    }

    pressureVal.textContent = P.toFixed(1) + ' atm';
    pressureVal.style.color = pColor;

    animId = requestAnimationFrame(draw);
  }

  draw();

  // Pause when not visible to save resources
  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!animId) draw();
    } else {
      cancelAnimationFrame(animId);
      animId = null;
    }
  });
  observer.observe(root);
})();

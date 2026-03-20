/**
 * Aurora gradient background with faint grid and traveling highlights.
 * Supports dark/light themes and dynamic intensity per slide.
 */

class AuroraBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.pulses = [];
    this.gridSize = 55;
    this.maxPulses = 10;

    this.intensity = 0.6;
    this.targetIntensity = 0.6;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate(0);
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  isLightTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  getTargetIntensity() {
    var slide = parseInt(document.body.dataset.slide, 10) || 0;
    if (slide <= 1) return 1.0;
    if (slide === 14) return 0.8;
    if (document.body.getAttribute('data-bg-intensity') === 'high') return 1.0;
    return 0.6;
  }

  animate(time) {
    var ctx = this.ctx;
    var w = this.width;
    var h = this.height;

    this.targetIntensity = this.getTargetIntensity();
    this.intensity += (this.targetIntensity - this.intensity) * 0.02;

    var light = this.isLightTheme();
    ctx.fillStyle = light ? '#f5f6fa' : '#16171d';
    ctx.fillRect(0, 0, w, h);

    this.drawAurora(ctx, w, h, time, light);
    this.drawGrid(ctx, w, h, light);
    this.updateAndDrawPulses(ctx, w, h, time, light);

    requestAnimationFrame(t => this.animate(t));
  }

  drawAurora(ctx, w, h, time, light) {
    var t = time * 0.0001;
    var baseAlpha = light ? 0.28 : 0.16;
    var alpha = baseAlpha * this.intensity;
    var fadeAlpha = alpha * 0.45;

    var blobs = [
      { cx: 0.30 + Math.sin(t * 0.7) * 0.12,
        cy: 0.70 + Math.cos(t * 0.5) * 0.08,
        r: 0.50, color: [0, 196, 204], lightColor: [160, 230, 235] },
      { cx: 0.72 + Math.sin(t * 0.5 + 2) * 0.10,
        cy: 0.45 + Math.cos(t * 0.6 + 1) * 0.10,
        r: 0.45, color: [111, 0, 255], lightColor: [195, 160, 255] },
      { cx: 0.50 + Math.sin(t * 0.4 + 4) * 0.14,
        cy: 0.25 + Math.cos(t * 0.3 + 3) * 0.08,
        r: 0.40, color: [60, 90, 255], lightColor: [165, 185, 255] },
    ];

    ctx.globalCompositeOperation = light ? 'darken' : 'screen';
    for (var i = 0; i < blobs.length; i++) {
      var b = blobs[i];
      var x = b.cx * w;
      var y = b.cy * h;
      var r = b.r * Math.max(w, h);
      var c = light ? b.lightColor : b.color;
      var cr = c[0], cg = c[1], cb = c[2];

      var grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0,   'rgba(' + cr + ',' + cg + ',' + cb + ',' + alpha + ')');
      grad.addColorStop(0.4, 'rgba(' + cr + ',' + cg + ',' + cb + ',' + fadeAlpha + ')');
      grad.addColorStop(1,   'rgba(' + cr + ',' + cg + ',' + cb + ',0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  drawGrid(ctx, w, h, light) {
    var g = this.gridSize;
    var gridAlpha = (light ? 0.07 : 0.055) * this.intensity;
    ctx.strokeStyle = light
      ? 'rgba(0, 0, 0,' + gridAlpha + ')'
      : 'rgba(255, 255, 255,' + gridAlpha + ')';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (var x = g; x < w; x += g) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (var y = g; y < h; y += g) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  }

  updateAndDrawPulses(ctx, w, h, time, light) {
    var spawnRate = 0.008 + 0.012 * this.intensity;
    if (this.pulses.length < this.maxPulses && Math.random() < spawnRate) {
      this.spawnPulse(w, h);
    }

    for (var i = this.pulses.length - 1; i >= 0; i--) {
      var p = this.pulses[i];
      p.t += p.speed;

      if (p.t > 1) {
        this.pulses.splice(i, 1);
        continue;
      }

      var life = Math.sin(p.t * Math.PI);
      var alpha = 0.22 * life * this.intensity;
      var len = 120;
      var colorStr = light
        ? 'rgba(0,0,0,'
        : 'rgba(255,255,255,';

      ctx.lineWidth = 1;

      if (p.horiz) {
        var x = p.t * (w + len * 2) - len;
        var grad = ctx.createLinearGradient(x - len / 2, 0, x + len / 2, 0);
        grad.addColorStop(0, colorStr + '0)');
        grad.addColorStop(0.5, colorStr + alpha + ')');
        grad.addColorStop(1, colorStr + '0)');
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x - len / 2, p.pos);
        ctx.lineTo(x + len / 2, p.pos);
        ctx.stroke();
      } else {
        var y = p.t * (h + len * 2) - len;
        var grad2 = ctx.createLinearGradient(0, y - len / 2, 0, y + len / 2);
        grad2.addColorStop(0, colorStr + '0)');
        grad2.addColorStop(0.5, colorStr + alpha + ')');
        grad2.addColorStop(1, colorStr + '0)');
        ctx.strokeStyle = grad2;
        ctx.beginPath();
        ctx.moveTo(p.pos, y - len / 2);
        ctx.lineTo(p.pos, y + len / 2);
        ctx.stroke();
      }
    }
  }

  spawnPulse(w, h) {
    var horiz = Math.random() > 0.5;
    var gridCount = horiz
      ? Math.floor(h / this.gridSize)
      : Math.floor(w / this.gridSize);

    this.pulses.push({
      horiz: horiz,
      pos: (Math.floor(Math.random() * gridCount) + 1) * this.gridSize,
      t: 0,
      speed: 0.002 + Math.random() * 0.002,
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.getElementById('bg-canvas');
  if (canvas) new AuroraBackground(canvas);
});

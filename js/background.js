/**
 * Aurora gradient background with faint grid and traveling highlights.
 * Renders to a full-viewport canvas behind all slide content.
 */

class AuroraBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.blobs = [];
    this.pulses = [];
    this.gridSize = 55;
    this.maxPulses = 6;

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

  animate(time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.fillStyle = '#16171d';
    ctx.fillRect(0, 0, w, h);

    this.drawAurora(ctx, w, h, time);
    this.drawGrid(ctx, w, h);
    this.updateAndDrawPulses(ctx, w, h, time);

    requestAnimationFrame(t => this.animate(t));
  }

  /* --- Aurora: large soft color blobs that drift slowly --- */
  drawAurora(ctx, w, h, time) {
    const t = time * 0.0001; // very slow

    const blobs = [
      { cx: 0.30 + Math.sin(t * 0.7) * 0.12,
        cy: 0.70 + Math.cos(t * 0.5) * 0.08,
        r: 0.45, color: [0, 196, 204] },
      { cx: 0.72 + Math.sin(t * 0.5 + 2) * 0.10,
        cy: 0.45 + Math.cos(t * 0.6 + 1) * 0.10,
        r: 0.40, color: [111, 0, 255] },
      { cx: 0.50 + Math.sin(t * 0.4 + 4) * 0.14,
        cy: 0.25 + Math.cos(t * 0.3 + 3) * 0.08,
        r: 0.35, color: [60, 90, 255] },
    ];

    ctx.globalCompositeOperation = 'screen';
    for (const b of blobs) {
      const x = b.cx * w;
      const y = b.cy * h;
      const r = b.r * Math.max(w, h);
      const [cr, cg, cb] = b.color;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0,   `rgba(${cr},${cg},${cb}, 0.07)`);
      grad.addColorStop(0.4, `rgba(${cr},${cg},${cb}, 0.03)`);
      grad.addColorStop(1,   `rgba(${cr},${cg},${cb}, 0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /* --- Grid: faint gray-white lines --- */
  drawGrid(ctx, w, h) {
    const g = this.gridSize;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = g; x < w; x += g) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = g; y < h; y += g) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  }

  /* --- Pulses: dim highlights traveling along grid lines --- */
  updateAndDrawPulses(ctx, w, h, time) {
    if (this.pulses.length < this.maxPulses && Math.random() < 0.008) {
      this.spawnPulse(w, h);
    }

    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.t += p.speed;

      if (p.t > 1) {
        this.pulses.splice(i, 1);
        continue;
      }

      const life = Math.sin(p.t * Math.PI);
      const alpha = 0.12 * life;
      const len = 80;

      ctx.lineWidth = 1;

      if (p.horiz) {
        const x = p.t * (w + len * 2) - len;
        const grad = ctx.createLinearGradient(x - len / 2, 0, x + len / 2, 0);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.5, `rgba(255,255,255,${alpha})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x - len / 2, p.pos);
        ctx.lineTo(x + len / 2, p.pos);
        ctx.stroke();
      } else {
        const y = p.t * (h + len * 2) - len;
        const grad = ctx.createLinearGradient(0, y - len / 2, 0, y + len / 2);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.5, `rgba(255,255,255,${alpha})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(p.pos, y - len / 2);
        ctx.lineTo(p.pos, y + len / 2);
        ctx.stroke();
      }
    }
  }

  spawnPulse(w, h) {
    const horiz = Math.random() > 0.5;
    const gridCount = horiz
      ? Math.floor(h / this.gridSize)
      : Math.floor(w / this.gridSize);

    this.pulses.push({
      horiz,
      pos: (Math.floor(Math.random() * gridCount) + 1) * this.gridSize,
      t: 0,
      speed: 0.002 + Math.random() * 0.002, // 4–8 seconds to cross
    });
  }
}

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  if (canvas) new AuroraBackground(canvas);
});

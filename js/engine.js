/**
 * Slide presentation engine.
 * Handles navigation, morph transitions, fullscreen, and UI.
 */

class SlideEngine {
  constructor() {
    this.current = 0;
    this.slides = [];
    this.transitioning = false;
    this.scrollLock = false;
    this.touchStartY = 0;

    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  init() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.total = this.slides.length;
    if (!this.total) return;

    this.progressBar = document.querySelector('.progress-bar');
    this.counterCurrent = document.getElementById('counter-current');
    this.counterTotal = document.getElementById('counter-total');
    this.dotsContainer = document.querySelector('.nav-dots');
    this.fsBtn = document.getElementById('fs-btn');

    this.renderDots();
    this.goTo(0, 'none');
    this.bind();
  }

  /* ---- Navigation ---- */

  bind() {
    document.addEventListener('keydown', e => this.onKey(e));
    document.addEventListener('wheel', e => this.onWheel(e), { passive: false });
    document.addEventListener('click', e => this.onClick(e));
    document.addEventListener('touchstart', e => { this.touchStartY = e.touches[0].clientY; }, { passive: true });
    document.addEventListener('touchend', e => this.onTouchEnd(e));

    if (this.fsBtn) this.fsBtn.addEventListener('click', () => this.toggleFullscreen());
    document.addEventListener('fullscreenchange', () => this.onFullscreenChange());
  }

  isInputFocused() {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  }

  isInteractive(target) {
    return !!target.closest('.interactive, button, a, input, select, textarea, audio, video, [contenteditable]');
  }

  onKey(e) {
    if (this.isInputFocused()) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
        e.preventDefault(); this.next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); this.prev(); break;
      case 'Home': e.preventDefault(); this.goTo(0); break;
      case 'End':  e.preventDefault(); this.goTo(this.total - 1); break;
      case 'f':
        if (!e.metaKey && !e.ctrlKey && !this.isInputFocused()) this.toggleFullscreen();
        break;
    }
  }

  onWheel(e) {
    if (this.isInteractive(e.target)) return;
    e.preventDefault();
    if (this.scrollLock) return;
    this.scrollLock = true;
    setTimeout(() => { this.scrollLock = false; }, 700);
    if (e.deltaY > 0) this.next(); else if (e.deltaY < 0) this.prev();
  }

  onClick(e) {
    if (this.isInteractive(e.target)) return;
    if (e.target.closest('.slide-nav, .fs-btn, .fs-corner-zone')) return;
    this.next();
  }

  onTouchEnd(e) {
    const dy = this.touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) < 40) return;
    if (dy > 0) this.next(); else this.prev();
  }

  next() { if (this.current < this.total - 1) this.goTo(this.current + 1, 'forward'); }
  prev() { if (this.current > 0) this.goTo(this.current - 1, 'backward'); }

  /* ---- Transitions ---- */

  goTo(index, direction = 'forward') {
    if (index < 0 || index >= this.total) return;
    if (this.transitioning && direction !== 'none') return;

    const from = this.slides[this.current];
    const to = this.slides[index];

    if (direction === 'none') {
      this.slides.forEach(s => s.classList.remove('active', 'fade-out'));
      to.classList.add('active');
      this.current = index;
      this.updateUI();
      return;
    }

    this.transitioning = true;

    from.classList.remove('active');
    from.classList.add('fade-out');

    to.classList.add('active');

    const dur = 600;
    setTimeout(() => {
      from.classList.remove('fade-out');
      this.transitioning = false;
    }, dur);

    this.current = index;
    this.updateUI();
  }

  /* ---- Fullscreen ---- */

  toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  onFullscreenChange() {
    document.body.classList.toggle('is-fullscreen', !!document.fullscreenElement);
  }

  /* ---- UI Updates ---- */

  updateUI() {
    if (this.progressBar) {
      const pct = this.total > 1 ? (this.current / (this.total - 1)) * 100 : 0;
      this.progressBar.style.width = pct + '%';
    }

    if (this.counterCurrent) this.counterCurrent.textContent = this.current + 1;
    if (this.counterTotal) this.counterTotal.textContent = this.total;

    if (this.dotsContainer) {
      this.dotsContainer.querySelectorAll('.nav-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === this.current);
      });
    }
  }

  renderDots() {
    if (!this.dotsContainer) return;
    while (this.dotsContainer.firstChild) {
      this.dotsContainer.removeChild(this.dotsContainer.firstChild);
    }
    for (let i = 0; i < this.total; i++) {
      const dot = document.createElement('button');
      dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', e => { e.stopPropagation(); this.goTo(i); });
      this.dotsContainer.appendChild(dot);
    }
  }
}

/* --- Copy-to-clipboard helper --- */
document.addEventListener('click', e => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  const box = btn.closest('.prompt-box');
  const textEl = box ? box.querySelector('.prompt-text') : null;
  const text = btn.dataset.copy || (textEl ? textEl.textContent : '');
  if (!text) return;
  navigator.clipboard.writeText(text.trim()).then(() => {
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1500);
  });
});

/* --- Init --- */
const engine = new SlideEngine();
export default engine;

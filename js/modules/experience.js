import { motionPreference } from './motion.js';

export function initExperience() {
  const header = document.querySelector('header');
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const layers = [
    { element: document.querySelector('.hero-photo'), section: document.querySelector('.hero'), strength: .1, limit: 34, scale: 1.12 },
    { element: document.querySelector('.hero-forest'), section: document.querySelector('.hero'), strength: -.035, limit: 15, scale: 1.06 },
    { element: document.querySelector('.pack-visual > img'), section: document.querySelector('.product'), strength: .07, limit: 26, scale: 1 },
  ].filter(layer => layer.element && layer.section);
  let frame = 0;
  let height = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  function render() {
    frame = 0;
    const y = scrollY;
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, y / height))})`;
    header.classList.toggle('is-scrolled', y > 24);
    layers.forEach(layer => {
      const visible = y + innerHeight > layer.top && y < layer.top + layer.height;
      if (motionPreference.matches || !visible) {
        layer.element.style.transform = '';
        layer.element.style.willChange = 'auto';
        return;
      }
      const strength = innerWidth <= 780 ? layer.strength * .55 : layer.strength;
      const offset = Math.max(-layer.limit, Math.min(layer.limit, (y + innerHeight / 2 - layer.top - layer.height / 2) * strength));
      layer.element.style.willChange = 'transform';
      layer.element.style.transform = `translate3d(0,${offset}px,0) scale(${layer.scale})`;
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(render); }
  function measure() {
    height = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    layers.forEach(layer => {
      layer.height = layer.section.offsetHeight;
      layer.top = layer.section.getBoundingClientRect().top + scrollY;
    });
    schedule();
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure, { passive: true });
  addEventListener('load', measure, { once: true });
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  motionPreference.addEventListener('change', schedule);
  measure();
}

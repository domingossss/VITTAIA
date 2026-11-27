import { isLitePerformance, motionPreference } from './motion.js';

export function initExperience() {
  const header = document.querySelector('header');
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const layers = isLitePerformance ? [] : [
    { element: document.querySelector('.hero-photo'), section: document.querySelector('.hero'), strength: .1, limit: 34, scale: 1.12 },
    { element: document.querySelector('.hero-forest'), section: document.querySelector('.hero'), strength: -.035, limit: 15, scale: 1.06 },
    { element: document.querySelector('.pack-visual > img'), section: document.querySelector('.product'), strength: .07, limit: 26, scale: 1 },
  ].filter(layer => layer.element && layer.section);

  let frame = 0;
  let measureFrame = 0;
  let scrolled = false;
  let height = Math.max(1, document.documentElement.scrollHeight - innerHeight);

  const canParallax = () => layers.length > 0 && !motionPreference.matches && innerWidth > 780;

  function clearParallax() {
    layers.forEach((layer) => {
      if (layer.active) {
        layer.element.style.transform = '';
        layer.active = false;
      }
    });
  }

  function render() {
    frame = 0;
    const y = scrollY;
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, y / height))})`;
    const nextScrolled = y > 24;
    if (nextScrolled !== scrolled) {
      scrolled = nextScrolled;
      header.classList.toggle('is-scrolled', scrolled);
    }
    if (!canParallax()) {
      clearParallax();
      return;
    }
    layers.forEach((layer) => {
      const visible = y + innerHeight > layer.top && y < layer.top + layer.height;
      if (!visible) {
        if (layer.active) {
          layer.element.style.transform = '';
          layer.active = false;
        }
        return;
      }
      const offset = Math.max(-layer.limit, Math.min(layer.limit, (y + innerHeight / 2 - layer.top - layer.height / 2) * layer.strength));
      layer.element.style.transform = `translate3d(0,${offset.toFixed(1)}px,0) scale(${layer.scale})`;
      layer.active = true;
    });
  }

  function schedule() { if (!frame) frame = requestAnimationFrame(render); }

  function measure() {
    measureFrame = 0;
    height = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    if (canParallax()) {
      layers.forEach((layer) => {
        layer.height = layer.section.offsetHeight;
        layer.top = layer.section.getBoundingClientRect().top + scrollY;
      });
    } else {
      clearParallax();
    }
    schedule();
  }

  function scheduleMeasure() { if (!measureFrame) measureFrame = requestAnimationFrame(measure); }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', scheduleMeasure, { passive: true });
  addEventListener('load', scheduleMeasure, { once: true });
  if ('ResizeObserver' in window) new ResizeObserver(scheduleMeasure).observe(document.body);
  motionPreference.addEventListener('change', scheduleMeasure);
  measure();
}

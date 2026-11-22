import { animation } from '../config.js';
import { motionPreference } from './motion.js';

// Itens que aparecem ao rolar. Adicione seletores aqui para animar novos blocos.
const selectors = [
  '.hero-content > *', '.fruit-photo', '.about-copy > h2',
  '.about-copy > h3', '.about-copy > p', '.benefits article',
  '.about-copy > small', '.pack-visual',
  '.product-grid > div:last-child > h2', '.product-grid > div:last-child > p',
  '.features article', '.product .text-link', '.festival > h2', '.festival > p',
  '.festival > button', '.comparison > h2', '.comparison > p',
  '.table-wrap', '.find > h2', '.find > p', '.stores > div', '.find-bottom',
  '.review-title', '.review-cards article', '.buy-heading > *',
  '.order-image', '.order-info', '.order-actions',
];

export function initReveal() {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const targets = [...document.querySelectorAll(selectors.join(','))];
  const animations = new Set();
  const delays = new Map();
  targets.forEach(element => {
    const siblings = targets.filter(target => target.parentElement === element.parentElement);
    delays.set(element, Math.min(siblings.indexOf(element) * animation.stagger, animation.maxDelay));
  });

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    visible.forEach((entry) => {
      observer.unobserve(entry.target);
      entry.target.classList.remove('reveal-pending');
      if (motionPreference.matches) return;
      const effect = entry.target.animate([
        { opacity: 0, transform: `translateY(${animation.distance}px) scale(.98)` },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ], {
        duration: animation.duration,
        delay: delays.get(entry.target),
        easing: 'cubic-bezier(.22,1,.36,1)',
        fill: 'backwards',
      });
      animations.add(effect);
      effect.onfinish = () => animations.delete(effect);
      effect.oncancel = () => animations.delete(effect);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });

  function prepare() {
    observer.disconnect();
    animations.forEach(effect => effect.cancel());
    animations.clear();
    targets.forEach(element => {
      element.classList.remove('reveal-pending');
      if (motionPreference.matches) return;
      element.classList.add('reveal-pending');
      observer.observe(element);
    });
  }
  motionPreference.addEventListener('change', prepare);
  prepare();
}

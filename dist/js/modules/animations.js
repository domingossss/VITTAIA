import { animation } from '../config.js';

// Itens que aparecem ao rolar. Adicione seletores aqui para animar novos blocos.
const selectors = [
  '.hero-content > *', '.fruit-photo', '.about-copy > h2',
  '.about-copy > h3', '.about-copy > p', '.benefits article',
  '.about-copy > small', '.pack-visual',
  '.product-grid > div:last-child > h2', '.product-grid > div:last-child > p',
  '.features article', '.product .text-link', '.club > h2', '.club > p',
  '.steps article', '.club > button', '.comparison > h2', '.comparison > p',
  '.table-wrap', '.find > h2', '.find > p', '.stores > div', '.find-bottom',
  '.review-title', '.review-cards article', '.buy-heading > *',
  '.order-image', '.order-info', '.order-actions',
];

export function initReveal() {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    visible.forEach((entry, index) => {
      observer.unobserve(entry.target);
      if (preference.matches) return;
      const effect = entry.target.animate([
        { opacity: 0, transform: `translateY(${animation.distance}px)` },
        { opacity: 1, transform: 'translateY(0)' },
      ], {
        duration: animation.duration,
        delay: Math.min(index * animation.stagger, animation.maxDelay),
        easing: 'cubic-bezier(.22,1,.36,1)',
        fill: 'backwards',
      });
      animations.add(effect);
      effect.onfinish = () => animations.delete(effect);
      effect.oncancel = () => animations.delete(effect);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });

  document.querySelectorAll(selectors.join(',')).forEach((element) => observer.observe(element));
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    animations.forEach((effect) => effect.finish());
    animations.clear();
  });
}

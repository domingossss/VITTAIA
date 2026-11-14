export function initNavigation() {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a').forEach((link) => {
        link.classList.toggle('active', link.hash === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-10% 0px -65% 0px' });

  document.querySelectorAll('main section[id]').forEach((section) => {
    observer.observe(section);
  });
}

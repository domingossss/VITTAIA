import { testimonials } from '../data/depoimentos.js';

function createCard(review, index, total) {
  const card = document.createElement('article');
  card.setAttribute('aria-label', `Depoimento ${index + 1} de ${total}`);
  const title = document.createElement('h3');
  title.textContent = review.title;
  const text = document.createElement('p');
  text.textContent = `“${review.text}”`;
  const footer = document.createElement('footer');
  const author = document.createElement('b');
  author.textContent = review.author;
  const stars = document.createElement('span');
  stars.className = 'stars';
  stars.setAttribute('aria-label', '5 estrelas');
  stars.textContent = '★★★★★';
  footer.append(author, stars);
  card.append(title, text, footer);
  return card;
}

export function initTestimonials() {
  const track = document.querySelector('#review-cards');
  const indicatorGroup = document.querySelector('.testimonials .dots');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');

  track.replaceChildren(...testimonials.map((review, index) => {
    return createCard(review, index, testimonials.length);
  }));
  const dots = testimonials.map((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.review = index;
    button.setAttribute('aria-label', `Posição ${index + 1} de ${testimonials.length} nos depoimentos`);
    button.setAttribute('aria-controls', 'review-cards');
    return button;
  });
  indicatorGroup.replaceChildren(...dots);

  track.tabIndex = 0;
  track.setAttribute('role', 'region');
  track.setAttribute('aria-roledescription', 'carrossel');
  track.setAttribute('aria-label', 'Depoimentos. Arraste para os lados ou use as setas do teclado.');
  const hint = document.createElement('span');
  hint.className = 'review-hint';
  hint.textContent = 'Arraste para os lados →';
  document.querySelector('.review-title').append(hint);

  let dragging = null;
  const maximum = () => Math.max(0, track.scrollWidth - track.clientWidth);

  function update() {
    const max = maximum();
    const index = max > 0
      ? Math.round(Math.max(0, Math.min(1, track.scrollLeft / max)) * (dots.length - 1))
      : 0;
    dots.forEach((dot, position) => {
      dot.classList.toggle('active', position === index);
      dot.setAttribute('aria-pressed', String(position === index));
      dot.disabled = max <= 1;
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      track.scrollTo({
        left: dots.length > 1 ? maximum() * index / (dots.length - 1) : 0,
        behavior: preference.matches ? 'instant' : 'smooth',
      });
    });
  });

  track.addEventListener('scroll', update, { passive: true });
  track.addEventListener('pointerdown', (event) => {
    if (
      event.pointerType === 'touch' || event.button !== 0 ||
      event.isPrimary === false ||
      event.target.closest('a,button,input,select,textarea')
    ) return;
    dragging = { id: event.pointerId, x: event.clientX, left: track.scrollLeft };
    track.setPointerCapture(event.pointerId);
    track.classList.add('is-dragging');
    event.preventDefault();
  });

  track.addEventListener('pointermove', (event) => {
    if (!dragging || event.pointerId !== dragging.id) return;
    track.scrollLeft = Math.max(0, Math.min(
      maximum(), dragging.left + dragging.x - event.clientX,
    ));
    event.preventDefault();
    update();
  });

  function finish(event) {
    if (!dragging || event.pointerId !== dragging.id) return;
    dragging = null;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    update();
  }
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((eventName) => {
    track.addEventListener(eventName, finish);
  });

  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    const step = Math.max(200, track.clientWidth * 0.8);
    const positions = {
      ArrowRight: Math.min(maximum(), track.scrollLeft + step),
      ArrowLeft: Math.max(0, track.scrollLeft - step),
      Home: 0,
      End: maximum(),
    };
    if (!Object.hasOwn(positions, event.key)) return;
    event.preventDefault();
    track.scrollTo({
      left: positions[event.key],
      behavior: preference.matches ? 'instant' : 'smooth',
    });
  });

  if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
  update();
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { initTestimonials } from '../js/modules/depoimentos.js';
import { testimonials } from '../js/data/depoimentos.js';

function element() {
  const classes = new Set();
  return {
    attrs: {}, dataset: {}, children: [], listeners: {},
    classList: {
      add: (name) => classes.add(name), remove: (name) => classes.delete(name),
      contains: (name) => classes.has(name),
      toggle(name, on) { on ? classes.add(name) : classes.delete(name); },
    },
    setAttribute(key, value) { this.attrs[key] = value; },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; },
    addEventListener(name, listener) { (this.listeners[name] ??= []).push(listener); },
    closest() { return null; },
    fire(name, extra = {}) {
      const event = { target: this, prevented: false, preventDefault() { this.prevented = true; }, ...extra };
      (this.listeners[name] || []).forEach((listener) => listener(event));
      return event;
    },
  };
}

test('depoimentos mantêm toque nativo, arraste cancelável, teclado e indicadores', (t) => {
  const track = Object.assign(element(), {
    scrollWidth: 1000, clientWidth: 320, scrollLeft: 0, capture: null,
    setPointerCapture(id) { this.capture = id; },
    hasPointerCapture(id) { return this.capture === id; },
    releasePointerCapture() { this.capture = null; },
    scrollTo(options) { this.lastScroll = options; this.scrollLeft = options.left; this.fire('scroll'); },
  });
  const dots = element(), title = element(), preference = { matches: false };
  let resize;
  const original = { document: globalThis.document, window: globalThis.window, matchMedia: globalThis.matchMedia, ResizeObserver: globalThis.ResizeObserver };
  Object.assign(globalThis, {
    document: {
      createElement: element,
      querySelector: (selector) => ({ '#review-cards': track, '.testimonials .dots': dots, '.review-title': title })[selector],
    },
    window: { ResizeObserver: true },
    matchMedia: () => preference,
    ResizeObserver: class { constructor(callback) { resize = callback; } observe() {} },
  });
  t.after(() => Object.assign(globalThis, original));
  initTestimonials();
  assert.equal(track.children.length, testimonials.length);
  assert.equal(dots.children.length, testimonials.length);
  assert.equal(track.children[0].children[0].textContent, testimonials[0].title);
  assert.equal(track.fire('pointerdown', { pointerType: 'touch', button: 0 }).prevented, false);
  track.fire('pointerdown', { pointerType: 'mouse', button: 0, pointerId: 7, clientX: 300 });
  track.fire('pointermove', { pointerId: 7, clientX: 0 });
  assert.equal(track.scrollLeft, 300);
  track.fire('pointercancel', { pointerId: 7 });
  assert.equal(track.capture, null);
  assert.equal(track.classList.contains('is-dragging'), false);
  track.fire('pointermove', { pointerId: 7, clientX: -100 });
  assert.equal(track.scrollLeft, 300);
  dots.children.at(-1).fire('click');
  assert.equal(track.scrollLeft, 680);
  assert.equal(dots.children.at(-1).attrs['aria-pressed'], 'true');
  track.fire('keydown', { key: 'Home' });
  assert.equal(track.scrollLeft, 0);
  track.fire('keydown', { key: 'End' });
  assert.equal(track.scrollLeft, 680);
  preference.matches = true;
  dots.children[0].fire('click');
  assert.equal(track.lastScroll.behavior, 'instant');
  track.clientWidth = 700;
  resize();
  dots.children.at(-1).fire('click');
  assert.equal(track.scrollLeft, 300);
});

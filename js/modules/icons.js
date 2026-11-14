// Ícones desenhados em SVG. Os nomes correspondem a data-icon no HTML.
const paths = {
  "leaf": "M4 20C4 8 9 4 21 3c0 13-5 18-13 15M5 20 16 9M12 15C5 17 2 13 3 7c6 0 9 2 10 6",
  "shield": "M12 2 3 6v6c0 5 5 8 9 10 4-2 9-5 9-10V6Z",
  "heart": "M12 21 3 12C-3 5 6-1 12 6c6-7 15-1 9 6Z",
  "fruit": "M11 6c-5-5-12 2-7 11 3 6 13 6 16-1 4-8-2-13-7-10M12 7V2m0 2c3-3 6-2 6-2",
  "can": "M7 3h10l1 3v15H6V6Zm-1 4h12M8 1h8",
  "pack": "M3 8h18v13H3Zm5 0V4h8v4M3 12h18",
  "store": "M3 10V6l2-3h14l2 3v4M3 10c0 3 5 3 5 0 0 3 8 3 8 0 0 3 5 3 5 0M4 13v8h16v-8M9 21v-6h6v6",
  "cart": "M2 3h3l3 13h11l3-10H6M9 20h.01M18 20h.01",
  "cup": "M3 8h14v7c0 8-14 8-14 0Zm14 1h3c4 0 4 6-3 6M6 5c-3-3 3-2 0-5M11 5c-3-3 3-2 0-5"
};

export function initIcons() {
  document.querySelectorAll('[data-icon]').forEach((element) => {
    const path = paths[element.dataset.icon];
    if (!path) return;
    element.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
  });
}

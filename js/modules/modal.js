export function createModal() {
  const dialog = document.querySelector('#modal');
  const content = document.querySelector('#modal-content');

  function show(html) {
    content.innerHTML = html;
    dialog.querySelectorAll('.toast-region').forEach(region => region.remove());
    const heading = content.querySelector('h2');
    if (heading) {
      heading.id = 'modal-title';
      dialog.setAttribute('aria-labelledby', 'modal-title');
    }
    if (!dialog.open) dialog.showModal();
  }

  function close() {
    dialog.close();
  }

  dialog.querySelector('.close').addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    ) close();
  });

  return { show, close, content };
}

import { motionPreference } from './motion.js';

const icons = {
  success: '<path d="m6 12 4 4 8-8"/>',
  error: '<path d="m8 8 8 8m0-8-8 8"/>',
  info: '<path d="M12 11v6m0-10v.01"/>',
};
const titles = { success: 'Tudo certo', error: 'Vamos conferir?', info: 'Só mais um detalhe' };

export function notify(message, type = 'info') {
  const parent = document.querySelector('dialog[open]') || document.body;
  let host = parent.querySelector('.toast-region');
  if (!host) {
    host = document.createElement('div');
    host.className = 'toast-region';
    host.setAttribute('aria-label', 'Notificações');
    parent.append(host);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.innerHTML = `<span class="toast-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/>${icons[type] || icons.info}</svg></span><div><strong></strong><p></p></div><button type="button" aria-label="Fechar notificação">×</button>`;
  toast.querySelector('strong').textContent = titles[type] || titles.info;
  toast.querySelector('p').textContent = message;
  let timer;
  let dismissing = false;
  const dismiss = () => {
    clearTimeout(timer);
    if (dismissing) return;
    dismissing = true;
    if (toast.animate && !motionPreference.matches) {
      const effect = toast.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-6px)' }], { duration: 180, fill: 'forwards' });
      effect.finished.then(() => toast.remove(), () => toast.remove());
    } else toast.remove();
  };
  const schedule = () => { clearTimeout(timer); timer = setTimeout(dismiss, 6500); };
  toast.querySelector('button').addEventListener('click', dismiss);
  toast.addEventListener('pointerenter', () => clearTimeout(timer));
  toast.addEventListener('pointerleave', schedule);
  toast.addEventListener('focusin', () => clearTimeout(timer));
  toast.addEventListener('focusout', schedule);
  host.append(toast);
  if (host.children.length > 3) host.firstElementChild.remove();
  schedule();
}

export function fieldFeedback(field, message = '', shake = false) {
  const id = `${field.id}-feedback`;
  let feedback = document.getElementById(id);
  if (!feedback && message) {
    feedback = document.createElement('span');
    feedback.id = id;
    feedback.className = 'field-error';
    field.insertAdjacentElement('afterend', feedback);
  }
  const describedBy = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
  if (message) {
    describedBy.add(id);
    field.setAttribute('aria-invalid', 'true');
    feedback.textContent = `! ${message}`;
    feedback.hidden = false;
    if (shake && field.animate && !motionPreference.matches) {
      field.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 240, iterations: 1 });
    }
  } else {
    field.removeAttribute('aria-invalid');
    describedBy.delete(id);
    if (feedback) feedback.hidden = true;
  }
  field.setAttribute('aria-describedby', [...describedBy].join(' '));
}

function errorMessage(field) {
  if (field.required && !field.value.trim()) return 'Preencha este campo.';
  if (field.validity.rangeOverflow || field.validity.rangeUnderflow || field.validity.stepMismatch) return `Use um número inteiro entre ${field.min || 1} e ${field.max}.`;
  return field.validity.valid ? '' : 'Confira o valor informado.';
}

export function validateForm(form) {
  let first;
  form.querySelectorAll('input, select, textarea').forEach(field => {
    if (field.disabled || field.readOnly) return;
    const message = errorMessage(field);
    fieldFeedback(field, message, Boolean(message));
    if (message && !first) first = field;
  });
  if (first) {
    first.focus();
    notify('Confira os campos destacados para continuar.', 'error');
  }
  return !first;
}

export function initValidation() {
  document.querySelectorAll('form').forEach(form => { form.noValidate = true; });
  document.addEventListener('focusout', event => {
    const field = event.target;
    if (!field.matches('input, select, textarea') || field.readOnly || field.id === 'cep') return;
    field.dataset.touched = 'true';
    fieldFeedback(field, errorMessage(field));
  });
  document.addEventListener('input', event => {
    const field = event.target;
    if (!field.matches('input, select, textarea') || field.id === 'cep') return;
    if (field.dataset.touched || field.hasAttribute('aria-invalid')) fieldFeedback(field, errorMessage(field));
  });
}

export function setLoading(button, loading) {
  button.classList.toggle('is-loading', loading);
  button.disabled = loading;
  button.setAttribute('aria-busy', String(loading));
}

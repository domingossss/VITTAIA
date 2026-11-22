import { fieldFeedback, validateForm } from './feedback.js';

const purchaseMonths = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function initFestival(modal) {
  document.querySelector('#join').addEventListener('click', () => {
    modal.show(`
      <p class="eyebrow">Festival VITTAIA</p>
      <h2>Cadastre sua nota fiscal</h2>
      <p>Use dados fictícios para simular sua participação no sorteio de um ingresso.</p>
      <form id="festival-registration" novalidate>
        <label for="festival-receipt">Número da nota fiscal</label>
        <input id="festival-receipt" type="text" inputmode="numeric" pattern="[0-9]+" placeholder="Ex. 000123" required>
        <fieldset class="festival-purchase-date">
          <legend>Data da compra</legend>
          <div class="festival-date-fields">
            <div>
              <label for="festival-day">Dia</label>
              <input id="festival-day" inputmode="numeric" maxlength="2" pattern="0?[1-9]|[12][0-9]|3[01]" placeholder="DD" required>
            </div>
            <div>
              <label for="festival-month">Mês</label>
              <select id="festival-month" required>
                <option value="">Selecione</option>
                ${purchaseMonths.map((month, index) => `<option value="${index + 1}">${month}</option>`).join('')}
              </select>
            </div>
            <div>
              <label for="festival-year">Ano</label>
              <input id="festival-year" inputmode="numeric" maxlength="4" pattern="[1-9][0-9]{3}" placeholder="AAAA" required>
            </div>
          </div>
          <button type="button" class="text-link" id="festival-today">Comprado hoje</button>
        </fieldset>
        <button type="submit" class="button green">Simular cadastro da nota fiscal</button>
      </form>
    `);

    const form = modal.content.querySelector('#festival-registration');
    const day = form.querySelector('#festival-day');
    const month = form.querySelector('#festival-month');
    const year = form.querySelector('#festival-year');

    function validateDate() {
      day.setCustomValidity('');
      if (![day, month, year].every((field) => field.validity.valid)) return;

      const lastDay = new Date(Date.UTC(Number(year.value), Number(month.value), 0)).getUTCDate();
      if (Number(day.value) > lastDay) {
        day.setCustomValidity('Confira o dia para o mês e o ano informados.');
      }
    }

    form.querySelector('.festival-purchase-date').addEventListener('input', () => {
      const hadDateError = day.validity.customError;
      validateDate();
      if (hadDateError && day.validity.valid) {
        fieldFeedback(day);
      }
    });
    form.querySelector('#festival-today').addEventListener('click', () => {
      const today = new Date();
      day.value = String(today.getDate());
      month.value = String(today.getMonth() + 1);
      year.value = String(today.getFullYear());
      validateDate();
      [day, month, year].forEach((field) => fieldFeedback(field));
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      validateDate();
      if (!validateForm(form)) return;

      const receipt = form.querySelector('#festival-receipt').value;
      modal.show(`
        <p class="eyebrow">Festival VITTAIA</p>
        <h2 tabindex="-1">Simulação concluída</h2>
        <p>Você simulou o cadastro da nota fiscal nº <strong></strong>.</p>
        <small>Esta demonstração não gera inscrição em um sorteio real.</small>
      `);
      modal.content.querySelector('strong').textContent = receipt;
      modal.content.querySelector('h2').focus();
    });
  });
}

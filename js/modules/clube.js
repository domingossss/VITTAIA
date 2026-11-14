import { product } from '../config.js';
import { money } from '../utils/format.js';

export function initClub(modal) {
  document.querySelector('#join').addEventListener('click', () => {
    modal.show(`
      <p class="eyebrow">Clube VITTAIA</p>
      <h2>Seu sabor favorito,<br>sempre por perto.</h2>
      <p>Escolha como seria sua assinatura.</p>
      <label for="frequency">Frequência de entrega</label>
      <select id="frequency">
        <option>A cada 15 dias</option>
        <option selected>Uma vez por mês</option>
      </select>
      <label for="club-packs">Packs por entrega</label>
      <select id="club-packs">
        ${[1, 2, 3].map((quantity) => `
          <option value="${quantity}">
            ${quantity} ${quantity === 1 ? 'pack' : 'packs'} · ${money(quantity * product.price)}
          </option>
        `).join('')}
      </select>
      <button class="button green" id="club-confirm">Simular minha assinatura</button>
      <small>Proposta acadêmica. Nenhuma assinatura ou cobrança será criada. Frete não incluído.</small>
    `);

    modal.content.querySelector('#club-confirm').addEventListener('click', () => {
      const frequency = modal.content.querySelector('#frequency').value;
      const quantity = Number(modal.content.querySelector('#club-packs').value);
      modal.show(`
        <h2>Uma rotina mais VITTAIA.</h2>
        <p>Sua escolha: <strong>${quantity} pack(s)</strong>, ${frequency.toLowerCase()}.</p>
        <p>Valor por entrega: <strong>${money(quantity * product.price)}</strong> + frete.</p>
        <small>Simulação concluída. Nenhuma assinatura foi criada.</small>
      `);
    });
  });
}

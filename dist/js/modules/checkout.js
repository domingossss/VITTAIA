import { product, shipping } from '../config.js';
import { money } from '../utils/format.js';

export function clampQuantity(value) {
  return Math.min(product.maxPacks, Math.max(1, Math.floor(Number(value) || 1)));
}

export function formatPostalCode(value) {
  return value.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
}

export function estimateShipping(value) {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 8 || /^0{8}$/.test(digits)) return null;
  return Number(digits[0]) <= shipping.regionalPrefixLimit
    ? shipping.regionalPrice
    : shipping.otherRegionsPrice;
}

export function orderTotals(quantity, freight = null) {
  const packs = clampQuantity(quantity);
  const subtotal = packs * product.price;
  return {
    packs,
    cans: packs * product.cansPerPack,
    subtotal,
    total: freight === null ? null : subtotal + freight,
  };
}

export function initCheckout(modal) {
  const quantity = document.querySelector('#quantity');
  const postalCode = document.querySelector('#cep');
  const shippingResult = document.querySelector('#shipping-result');
  let freight = null;

  function update() {
    const order = orderTotals(quantity.value, freight);
    quantity.value = order.packs;
    quantity.max = product.maxPacks;
    document.querySelector('#price').textContent = money(order.subtotal);
    document.querySelector('#total').textContent = order.total === null
      ? '' : `Total simulado: ${money(order.total)}`;
    document.querySelector('#minus').disabled = order.packs <= 1;
    document.querySelector('#plus').disabled = order.packs >= product.maxPacks;
  }

  document.querySelector('.mobile-buy').innerHTML =
    `Seu pack com ${product.cansPerPack} latas · ${money(product.price)} <span>Comprar →</span>`;

  quantity.addEventListener('change', update);
  document.querySelector('#minus').addEventListener('click', () => {
    quantity.value--;
    update();
  });
  document.querySelector('#plus').addEventListener('click', () => {
    quantity.value++;
    update();
  });

  postalCode.addEventListener('input', () => {
    postalCode.value = formatPostalCode(postalCode.value);
    freight = null;
    shippingResult.textContent = 'Informe seu CEP para simular a entrega.';
    update();
  });

  document.querySelector('#shipping').addEventListener('submit', (event) => {
    event.preventDefault();
    freight = estimateShipping(postalCode.value);
    shippingResult.textContent = freight === null
      ? 'Digite um CEP com 8 dígitos.'
      : `Frete simulado: ${money(freight)} · ${shipping.minDays} a ${shipping.maxDays} dias úteis. Valores fictícios para apresentação.`;
    update();
  });

  document.querySelector('#checkout').addEventListener('click', () => {
    const order = orderTotals(quantity.value, freight);
    modal.show(`
      <p class="eyebrow">Pedido demonstrativo</p>
      <h2>Boa escolha.<br>Um sabor diferente espera por você.</h2>
      <p><strong>${order.packs} pack(s) VITTAIA</strong><br>${order.cans} latas de ${product.volumeMl} ml</p>
      <p>Subtotal: ${money(order.subtotal)}<br>
        Frete: ${freight === null ? 'não calculado' : money(freight) + ' (simulado)'}</p>
      ${order.total === null ? '' : `<p><strong>Total simulado: ${money(order.total)}</strong></p>`}
      <small>Esta é uma apresentação acadêmica. Nenhum pedido será enviado, nenhum dado é armazenado e não há cobrança.</small>
      <button class="button green" id="finish-order">Concluir demonstração</button>
    `);
    modal.content.querySelector('#finish-order').addEventListener('click', () => {
      modal.show(`
        <h2>Obrigado por conhecer a VITTAIA!</h2>
        <p>Diferente até no sabor.</p>
        <small>Demonstração concluída. Nenhuma compra foi realizada.</small>
      `);
    });
  });

  update();
}

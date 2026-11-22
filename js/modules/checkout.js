import { product, shipping } from '../config.js';
import { money } from '../utils/format.js';
import { lookupPostalCode } from './endereco.js';
import { fieldFeedback, notify, setLoading, validateForm } from './feedback.js';
import { motionPreference } from './motion.js';

export function clampQuantity(value) {
  return Math.min(product.maxPacks, Math.max(1, Math.floor(Number(value) || 1)));
}

export function formatPostalCode(value) {
  return value.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
}

export function estimateShipping(value) {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 8 || /^0{8}$/.test(digits)) return null;
  return shipping.price;
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
  const shippingButton = document.querySelector('#shipping button');
  const addressForm = document.querySelector('#delivery-address');
  const addressFields = {
    street: document.querySelector('#street'),
    neighborhood: document.querySelector('#neighborhood'),
    city: document.querySelector('#city'),
    state: document.querySelector('#state'),
  };
  const number = document.querySelector('#address-number');
  const complement = document.querySelector('#address-complement');
  let freight = null;
  let request = null;
  let verifiedCep = '';
  let currentCep = '';
  const freightText = () => `Frete fixo: ${money(shipping.price)} · ${shipping.minDays} a ${shipping.maxDays} dias úteis (simulação).`;

  function clearAddress() {
    verifiedCep = '';
    addressForm.hidden = true;
    addressForm.reset();
    addressForm.querySelectorAll('input').forEach(field => {
      fieldFeedback(field);
      delete field.dataset.touched;
    });
  }

  function status(message, type = 'info') {
    shippingResult.textContent = message;
    shippingResult.dataset.state = type;
  }

  async function consultPostalCode() {
    const digits = postalCode.value.replace(/\D/g, '');
    freight = estimateShipping(digits);
    update();
    if (freight === null) {
      status('Digite um CEP válido com 8 dígitos.', 'error');
      fieldFeedback(postalCode, 'Informe os 8 dígitos do CEP.', true);
      notify('Confira o CEP para consultar seu endereço.', 'error');
      return;
    }
    if (verifiedCep === digits) {
      status(`Endereço encontrado. ${freightText()}`, 'success');
      return;
    }
    request?.abort();
    const controller = new AbortController();
    request = controller;
    const timeout = setTimeout(() => controller.abort(), 10000);
    fieldFeedback(postalCode);
    setLoading(shippingButton, true);
    status(`Consultando endereço… ${freightText()}`, 'loading');
    postalCode.setAttribute('aria-busy', 'true');
    try {
      const address = await lookupPostalCode(digits, { signal: controller.signal });
      if (request !== controller || controller.signal.aborted) return;
      Object.entries(addressFields).forEach(([key, field]) => { field.value = address[key]; });
      verifiedCep = digits;
      addressForm.hidden = false;
      document.querySelector('#address-hint').textContent = address.street && address.neighborhood
        ? 'Confira o endereço e complete o número e o complemento, se houver.'
        : 'Este CEP não informa todos os campos. Complete o logradouro, o bairro e o número.';
      if (addressForm.animate && !motionPreference.matches) {
        addressForm.animate([{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
      }
      status(`Endereço encontrado. ${freightText()}`, 'success');
      notify('Endereço encontrado. Complete o número e confira seus dados.', 'success');
    } catch (error) {
      if (request !== controller) return;
      clearAddress();
      const message = error.name === 'AbortError'
        ? 'A consulta demorou demais. Clique em Calcular para tentar novamente.'
        : error instanceof TypeError
          ? 'Não foi possível conectar ao serviço de CEP. Clique em Calcular para tentar novamente.'
          : error.message;
      status(`${message} ${freightText()}`, 'error');
      fieldFeedback(postalCode, message, true);
      notify(message, 'error');
    } finally {
      clearTimeout(timeout);
      if (request === controller) {
        request = null;
        postalCode.setAttribute('aria-busy', 'false');
        setLoading(shippingButton, false);
      }
    }
  }

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
    const digits = postalCode.value.replace(/\D/g, '');
    if (digits === currentCep) return;
    currentCep = digits;
    request?.abort();
    request = null;
    postalCode.setAttribute('aria-busy', 'false');
    setLoading(shippingButton, false);
    fieldFeedback(postalCode);
    clearAddress();
    freight = null;
    status('Digite seu CEP para preencher o endereço.');
    update();
    if (digits.length === 8) void consultPostalCode();
  });

  postalCode.addEventListener('blur', () => {
    if (postalCode.value && estimateShipping(postalCode.value) === null) {
      fieldFeedback(postalCode, 'Informe os 8 dígitos do CEP.');
    }
  });

  document.querySelector('#shipping').addEventListener('submit', (event) => {
    event.preventDefault();
    void consultPostalCode();
  });

  addressForm.addEventListener('submit', (event) => event.preventDefault());

  document.querySelector('#checkout').addEventListener('click', () => {
    if (!addressForm.hidden && !validateForm(addressForm)) return;
    const order = orderTotals(quantity.value, freight);
    modal.show(`
      <p class="eyebrow">Pedido demonstrativo</p>
      <h2>Boa escolha.<br>Um sabor diferente espera por você.</h2>
      <p><strong>${order.packs} pack(s) VITTAIA</strong><br>${order.cans} latas de ${product.volumeMl} ml</p>
      <p>Subtotal: ${money(order.subtotal)}<br>
        Frete: ${freight === null ? 'não calculado' : money(freight) + ' (simulado)'}</p>
      ${order.total === null ? '' : `<p><strong>Total simulado: ${money(order.total)}</strong></p>`}
      <p id="order-address" hidden></p>
      <small>Esta é uma apresentação acadêmica. Nenhum pedido será enviado, nenhum dado é armazenado e não há cobrança.</small>
      <button class="button green" id="finish-order">Concluir demonstração</button>
    `);
    if (verifiedCep) {
      const summary = modal.content.querySelector('#order-address');
      summary.hidden = false;
      summary.textContent = `Entrega: ${addressFields.street.value}, ${number.value}${complement.value ? ` · ${complement.value}` : ''} · ${addressFields.neighborhood.value} · ${addressFields.city.value}/${addressFields.state.value} · CEP ${postalCode.value}`;
    }
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

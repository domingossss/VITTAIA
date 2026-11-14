import test from 'node:test';
import assert from 'node:assert/strict';
import { clampQuantity, formatPostalCode, estimateShipping, orderTotals } from '../js/modules/checkout.js';
import { product, shipping } from '../js/config.js';

test('limita a quantidade e mantém os totais coerentes', () => {
  assert.equal(clampQuantity(-1), 1);
  assert.equal(clampQuantity(1000), product.maxPacks);
  assert.equal(clampQuantity(2.8), 2);
  assert.equal(clampQuantity(''), 1);
  const order = orderTotals(3, shipping.regionalPrice);
  assert.equal(order.subtotal, 3 * product.price);
  assert.equal(order.cans, 3 * product.cansPerPack);
  assert.equal(order.total, order.subtotal + shipping.regionalPrice);
  assert.equal(orderTotals(1).total, null);
});

test('valida e formata o CEP antes de simular o frete', () => {
  assert.equal(formatPostalCode('12a345678999'), '12345-678');
  assert.equal(estimateShipping('00000-000'), null);
  assert.equal(estimateShipping('123'), null);
  assert.equal(estimateShipping('12345-678'), shipping.regionalPrice);
  assert.equal(estimateShipping('87654-321'), shipping.otherRegionsPrice);
});

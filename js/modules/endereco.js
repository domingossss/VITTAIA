// Consulta pública, sem chave. Número e complemento da residência são preenchidos manualmente.
export async function lookupPostalCode(value, { signal } = {}) {
  const digits = value.replace(/\D/g, '');
  if (!/^\d{8}$/.test(digits) || /^0{8}$/.test(digits)) {
    throw new Error('Digite um CEP válido com 8 dígitos.');
  }
  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal });
  if (!response.ok) throw new Error('Não foi possível consultar o CEP. Tente novamente.');
  const data = await response.json();
  if (data.erro) throw new Error('CEP não encontrado. Confira os números e tente novamente.');
  if (typeof data.localidade !== 'string' || !/^[A-Z]{2}$/.test(data.uf)) {
    throw new Error('A consulta não retornou um endereço válido. Tente novamente.');
  }
  return {
    street: typeof data.logradouro === 'string' ? data.logradouro : '',
    neighborhood: typeof data.bairro === 'string' ? data.bairro : '',
    city: data.localidade,
    state: data.uf,
  };
}

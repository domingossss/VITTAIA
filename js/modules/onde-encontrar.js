const cities = [
  'Arujá', 'Barueri', 'Biritiba-Mirim', 'Caieiras', 'Cajamar',
  'Carapicuíba', 'Cotia', 'Diadema', 'Embu das Artes', 'Embu-Guaçu',
  'Ferraz de Vasconcelos', 'Francisco Morato', 'Franco da Rocha',
  'Guararema', 'Guarulhos', 'Itapecerica da Serra', 'Itapevi',
  'Itaquaquecetuba', 'Jandira', 'Juquitiba', 'Mairiporã', 'Mauá',
  'Mogi das Cruzes', 'Osasco', 'Pirapora do Bom Jesus', 'Poá',
  'Ribeirão Pires', 'Rio Grande da Serra', 'Salesópolis', 'Santa Isabel',
  'Santana de Parnaíba', 'Santo André', 'São Bernardo do Campo',
  'São Caetano do Sul', 'São Lourenço da Serra', 'São Paulo', 'Suzano',
  'Taboão da Serra', 'Vargem Grande Paulista',
];

export function initLocations(modal) {
  document.querySelector('#locations').addEventListener('click', () => {
    modal.show(`
      <p class="eyebrow">Onde encontrar</p>
      <h2>Um novo sabor pela Grande São Paulo.</h2>
      <p>A proposta de comercialização da VITTAIA abrange todos os ${cities.length} municípios da Região Metropolitana de São Paulo.</p>
      <ul class="location-cities" aria-label="Cidades previstas para comercialização">
        ${cities.map((city) => `<li>${city}</li>`).join('')}
      </ul>
      <p>Em cada cidade, a proposta é chegar a empórios naturais, lojas de orgânicos, mercados selecionados e cafés.</p>
      <small>Distribuição fictícia para o projeto acadêmico. Não há lojas, endereços ou pontos de venda confirmados.</small>
      <a class="button" href="#comprar" id="go-buy">Conhecer o pack</a>
    `);
    modal.content.querySelector('#go-buy').addEventListener('click', modal.close);
  });
}

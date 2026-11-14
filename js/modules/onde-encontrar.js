export function initLocations(modal) {
  document.querySelector('#locations').addEventListener('click', () => {
    modal.show(`
      <p class="eyebrow">Onde encontrar</p>
      <h2>Novos caminhos para um novo sabor.</h2>
      <p>A VITTAIA é uma marca fictícia criada para o TCC e ainda não possui pontos de venda reais.</p>
      <p>Empórios naturais, lojas de orgânicos, mercados e cafés representam os canais propostos para a marca.</p>
      <a class="button" href="#comprar" id="go-buy">Conhecer o pack</a>
    `);
    modal.content.querySelector('#go-buy').addEventListener('click', modal.close);
  });
}

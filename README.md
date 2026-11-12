# VITTAIA

Landing page responsiva baseada no esboço e nas imagens fornecidas. HTML, CSS e JavaScript sem dependências de instalação.

## Visualizar

Na pasta do projeto, execute `node preview.mjs` e abra http://127.0.0.1:5173.
Também é possível abrir `dist/index.html` diretamente no navegador.

## Conteúdo

- `dist/index.html`: estrutura e textos.
- `dist/style.css`: identidade visual e adaptação para celular.
- `dist/app.js`: menu, clube, depoimentos e compra demonstrativa.
- `dist/assets`: imagens fornecidas e recortes do esboço.

O frete é uma simulação local, sem consulta a transportadoras. Clube, depoimentos e compra são ilustrativos para TCC. Nenhum dado pessoal é armazenado ou enviado. As fontes Google são opcionais e têm fontes de sistema como alternativa.

## Experiência visual

- Galeria do produto com três fotos, setas, toque e teclado.
- Carrossel com os três filmes enviados, reprodução manual, controles nativos e pausa ao trocar de filme ou deixar a seção.
- Animações suaves de entrada, transições nos cartões, barra de progresso e realces nos botões.
- Respeito à preferência de movimento reduzido do aparelho.
- `experience.css` e `experience.js` contêm os aprimoramentos visuais.

Os vídeos originais ficam em `dist/assets/vittaia-filme-01.mp4`, `vittaia-filme-02.mp4` e `vittaia-filme-03.mp4`. A prévia local oferece reprodução com requisições parciais de vídeo.

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

## Depoimentos e movimento

Os depoimentos podem ser arrastados com o mouse ou deslizados por toque. Os indicadores acompanham a rolagem e também permitem navegar. Com a área em foco, as setas, Home e End oferecem navegação por teclado.

Os elementos aparecem suavemente, em sequência, quando entram na tela. A entrada acontece uma única vez e respeita a preferência de movimento reduzido do aparelho. O conteúdo continua acessível se as animações não estiverem disponíveis.

Os comportamentos estão em `dist/motion.js` e a apresentação em `dist/motion.css`.

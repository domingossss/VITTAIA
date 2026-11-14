# VITTAIA

Landing page em HTML, CSS e JavaScript, sem dependências de instalação.

**Para fazer alterações, comece pelo [GUIA-DE-EDICAO.md](GUIA-DE-EDICAO.md).**

## Arquivos que você deve editar

```text
index.html                 Textos, imagens e estrutura das seções
styles/
  theme.css                Cores da marca
  sections/                Um arquivo de estilo por seção
  components/              Botões, componentes compartilhados e modal
js/
  config.js                Preço, frete, limites e velocidade das animações
  data/depoimentos.js      Textos dos depoimentos
  modules/                 Uma interação por arquivo
assets/
  images/                  Fotos e logos, incluindo seus arquivos alterados
  shapes/                  Curvas e máscaras em SVG editável
tools/                     Prévia, verificação e preparação para publicar
tests/                     Testes dos comportamentos principais
dist/                      Cópia gerada para publicação: não editar manualmente
```

## Ver suas alterações

Abra um terminal nesta pasta e execute:

```text
npm run dev
```

Abra [http://127.0.0.1:5173](http://127.0.0.1:5173). Depois de salvar um arquivo, atualize o navegador. Você também pode usar uma extensão de servidor local no editor. Os módulos JavaScript precisam de HTTP: use a prévia em vez de abrir o HTML por duplo clique.

## Conferir e preparar para publicação

```text
npm run check
npm test
npm run build
```

O último comando recria `dist/` a partir dos arquivos editáveis da raiz. A pasta `.openai/` vincula este projeto à publicação existente.

## Sobre a demonstração

Marca fictícia para TCC. Preço, frete, clube, compra e depoimentos são demonstrativos. Não há cobrança, armazenamento de dados pessoais ou consulta real a transportadoras. As fontes Google têm alternativas de sistema.

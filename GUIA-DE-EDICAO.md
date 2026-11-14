# Onde alterar cada parte da VITTAIA

Edite os arquivos **na raiz do projeto**, fora de `dist/`. Essa pasta é recriada quando você prepara a publicação.

## Textos e organização da página

Abra [index.html](index.html). Cada seção tem um comentário com seu número e nome. Os textos estão formatados em linhas separadas, sem código comprimido.

| O que você quer mudar | Procure no HTML | Estilo correspondente |
| --- | --- | --- |
| Logo, links e menu | `CABEÇALHO` | [cabecalho.css](styles/sections/cabecalho.css) |
| Primeira imagem, título e botões | `01 — INÍCIO` | [inicio.css](styles/sections/inicio.css) |
| História e benefícios da fruta | `02 — A UVAIA` | [uvaia.css](styles/sections/uvaia.css) |
| Pack, lata e diferenciais | `03 — PRODUTO` | [produto.css](styles/sections/produto.css) |
| Passos do clube | `04 — CLUBE` | [clube.css](styles/sections/clube.css) |
| Tabela de comparação | `05 — COMPARATIVO` | [comparativo.css](styles/sections/comparativo.css) |
| Canais e mapa de venda | `06 — ONDE ENCONTRAR` | [onde-encontrar.css](styles/sections/onde-encontrar.css) |
| Área dos relatos | `07 — DEPOIMENTOS` | [depoimentos.css](styles/sections/depoimentos.css) |
| Oferta, quantidade, CEP e compra | `08 — COMPRAR` | [comprar.css](styles/sections/comprar.css) |
| Links e informações finais | `RODAPÉ` | [rodape.css](styles/sections/rodape.css) |

Os IDs também são usados pelos links e pelo JavaScript. Para mudar apenas o texto de um título, mantenha o ID da seção.

## Cores, fontes, tamanhos e espaço

- **Cores principais:** [styles/theme.css](styles/theme.css). `--green`, `--yellow`, `--orange` e `--cream` controlam a identidade.
- **Fontes e regras gerais:** [styles/base.css](styles/base.css).
- **Botões e componentes compartilhados:** [styles/components/shared.css](styles/components/shared.css).
- **Janela de simulação:** [styles/components/modal.css](styles/components/modal.css).
- **Tamanho do título, distância entre imagens e espaçamento:** abra o CSS da seção na tabela acima. `padding-top` e `padding-bottom` são o espaço de cima e de baixo; `gap` é a distância entre elementos.

Cada CSS de seção tem blocos identificados para computador, celular e tablet. Para alterar somente o celular, use o bloco `CELULAR — até 780px`. Não precisa procurar ajustes em outros arquivos.

[styles/main.css](styles/main.css) apenas reúne os estilos; normalmente você não precisa editá-lo.

## Imagens e logos

Todas as imagens ficam em [assets/images](assets/images). Seus arquivos `logo.png` e `logo_branca.png` foram mantidos sem modificar os pixels.

| Imagem | Onde ela é usada |
| --- | --- |
| `logo.png` | Cabeçalho, em `index.html` |
| `hero-layout.png` e `forest-layout.png` | Fundo inicial, em `styles/sections/inicio.css` |
| `uvaia-layout.png` | Foto da fruta, em `styles/sections/uvaia.css` |
| `pack-layout.png` | Composição do produto, em `index.html` |
| `clube-pack.png`, `clube-entrega.png`, `clube-drink.png` | Cartões do clube, em `index.html` |
| `order-layout.png` | Imagem da oferta, em `index.html` |
| `map-layout.png` | Mapa ilustrativo, em `index.html` |
| `footer-leaves.png` | Folhas decorativas, em `styles/sections/comprar.css` |

Você pode substituir uma imagem mantendo o nome ou adicionar outra e trocar seu caminho no HTML/CSS. Os caminhos no CSS são relativos ao próprio arquivo CSS.

As ondas e máscaras antes codificadas no CSS agora são arquivos `.svg` em [assets/shapes](assets/shapes). A regra da seção aponta para a forma usada. Por exemplo, procure `.product:before` e `.product:after` em `produto.css` para localizar as ondas superior e inferior.

## Preço, frete e animações

Abra [js/config.js](js/config.js):

```js
export const product = {
  price: 48,          // Valor de um pack, em reais
  cansPerPack: 6,
  volumeMl: 269,
  maxPacks: 12,
};
```

O preço configurado alimenta o total da compra, o botão fixo no celular e as opções do clube. O preço escrito no HTML é uma alternativa inicial; mantenha-o coerente se alterar o valor. Os textos descritivos da embalagem também são editados no HTML.

No mesmo arquivo, `shipping` define os valores fictícios de frete e `animation` controla a duração, a sequência e a distância das entradas suaves.

## Depoimentos e interações

Para mudar os relatos, edite **[js/data/depoimentos.js](js/data/depoimentos.js)**. Cada item tem `title`, `text` e `author`. Basta adicionar outro objeto à lista: os cartões e indicadores são criados automaticamente.

| Comportamento | Arquivo |
| --- | --- |
| Menu e seção ativa | [navigation.js](js/modules/navigation.js) |
| Desenhos dos ícones | [icons.js](js/modules/icons.js) |
| Abrir e fechar a janela | [modal.js](js/modules/modal.js) |
| Simulação de assinatura | [clube.js](js/modules/clube.js) |
| Aviso sobre pontos de venda | [onde-encontrar.js](js/modules/onde-encontrar.js) |
| Quantidade, CEP, frete e compra | [checkout.js](js/modules/checkout.js) |
| Cartões, arraste e indicadores | [depoimentos.js](js/modules/depoimentos.js) |
| Entradas ao rolar a página | [animations.js](js/modules/animations.js) |

[js/main.js](js/main.js) inicia os módulos. Não precisa colocar toda a lógica nele.

## Fluxo de trabalho

1. Execute `npm run dev` nesta pasta.
2. Edite o arquivo indicado acima e salve.
3. Atualize a página em `http://127.0.0.1:5173`.
4. Antes de publicar, execute `npm run check`, `npm test` e `npm run build`.

Alterar os arquivos locais não atualiza sozinho o site online. O build prepara a pasta `dist/`; a publicação é uma etapa separada.

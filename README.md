# VITTAIA — Diferente até no sabor

Landing page responsiva para apresentar a **VITTAIA**, uma marca fictícia de refrigerante orgânico de uvaia, desenvolvida como complemento digital de um plano de negócios acadêmico.

**Desenvolvimento:** Victor Domingos Bastos.

> **Projeto demonstrativo:** a empresa, o produto, a promoção, os depoimentos e a distribuição apresentados fazem parte de uma proposta fictícia. As interações de compra, cadastro na promoção e frete são simulações, sem pedidos reais, inscrições ou cobranças.

## Contexto e autoria

Desenvolvi este site a pedido de uma turma de **Gestão Empresarial**, que está elaborando um plano de negócios para a marca VITTAIA. A landing page foi feita para complementar o trabalho e apoiar a apresentação da proposta de negócio.

**Não faço parte dessa turma.** Minha participação é como desenvolvedor externo, responsável pela implementação do site. O plano de negócios é o trabalho acadêmico da turma; o desenvolvimento desta interface é a minha contribuição profissional para o projeto.

Este repositório também integra meu **portfólio de desenvolvimento**, demonstrando a implementação de uma interface responsiva, a organização de um projeto front-end, cuidados de desempenho e a integração de recursos interativos em uma página estática.

## A proposta

A página apresenta o conceito da marca, a uvaia, os diferenciais do produto e uma proposta de comercialização. O objetivo é transformar parte do plano de negócios em uma experiência navegável, aproximando a apresentação acadêmica de uma aplicação prática de comunicação e divulgação de produto.

A experiência utiliza a identidade visual definida para a VITTAIA, com tons de verde, amarelo e creme, fotografias de produto, elementos botânicos e transições curvas entre as seções.

## Funcionalidades

- **Apresentação do produto:** informações sobre a marca, a fruta e o pack com seis latas de 269 ml.
- **Navegação responsiva:** menu adaptado para dispositivos móveis e links com indicação da seção em exibição.
- **Festival VITTAIA:** apresentação da promoção em três etapas e modal para simulação de cadastro de nota fiscal, com validação de data e preenchimento rápido da data atual.
- **Comparativo:** tabela ilustrativa para apresentar o posicionamento do produto.
- **Distribuição proposta:** canais previstos (produtos naturais, supermercados, conveniências e empórios) e lista dos 39 municípios da Região Metropolitana de São Paulo como cobertura fictícia.
- **Depoimentos:** carrossel com relatos fictícios, navegação por indicadores, arraste e suporte ao teclado.
- **Compra demonstrativa:** seleção de quantidade, cálculo do subtotal e apresentação de um resumo do pedido.
- **Frete fixo:** valor de R$ 10,50 na simulação, independentemente da região do CEP informado.
- **Consulta de CEP:** preenchimento de logradouro, bairro, cidade e UF por meio do [ViaCEP](https://viacep.com.br/), com número e complemento preenchidos manualmente.
- **Feedback de interface:** validação junto aos campos, estados de carregamento e notificações de sucesso, informação e erro.
- **Movimento e desempenho:** entradas em cascata, parallax discreto no desktop, microinterações, header reativo ao scroll, barra de progresso de leitura, imagens otimizadas por faixa de tela e modo leve automático para dispositivos básicos ou com preferência por movimento reduzido (`prefers-reduced-motion`).

## Tecnologias

| Tecnologia | Aplicação no projeto |
| --- | --- |
| HTML5 | Estrutura semântica e conteúdo da landing page. |
| CSS3 | Layout responsivo, identidade visual, curvas, superfícies e estados de interação. |
| Tailwind CSS 4 | Classes utilitárias e compilação dos estilos. |
| JavaScript com módulos ES | Organização dos comportamentos e da lógica de interface. |
| esbuild | Agrupamento e minificação dos módulos JavaScript para uso no navegador. |
| Node.js e npm | Ambiente de desenvolvimento, dependências e geração dos arquivos finais. |
| APIs nativas do navegador | Intersection Observer, Web Animations, Resize Observer e requestAnimationFrame. |
| ViaCEP | Consulta pública de endereço a partir do CEP. |

O resultado é um **site estático**. O Node.js participa apenas da etapa de compilação; a página publicada é servida diretamente como HTML, CSS, JavaScript e arquivos de mídia.

## Estrutura do projeto

```text
vittaia/
├── assets/
│   ├── images/              # Imagens de marca, produto, ícones e conteúdo
│   └── shapes/              # Curvas e elementos decorativos em SVG
├── js/
│   ├── data/                # Conteúdo dos depoimentos
│   ├── modules/             # Comportamentos organizados por funcionalidade
│   ├── utils/               # Funções compartilhadas de formatação
│   ├── config.js            # Preço, produto, frete e parâmetros de animação
│   ├── main.js              # Inicialização dos módulos
│   └── site.js              # JavaScript gerado para o navegador
├── styles/
│   ├── components/          # Componentes compartilhados, feedback visual e acabamento
│   ├── sections/            # Estilos específicos de cada seção
│   ├── base.css             # Regras globais
│   ├── theme.css            # Cores e variáveis da identidade visual
│   ├── main.css             # Entrada da compilação do Tailwind
│   └── site.css             # CSS gerado para o navegador
├── index.html               # Página principal
├── LICENSE                  # Licença MIT
├── package.json             # Dependências de desenvolvimento
├── package-lock.json        # Versões das dependências
├── .gitignore               # Arquivos e dependências ignorados pelo Git
└── README.md
```

### Organização dos comportamentos

Os arquivos em `js/modules/` concentram responsabilidades específicas:

| Módulo | Responsabilidade |
| --- | --- |
| `navigation.js` | Menu mobile e destaque da seção em exibição. |
| `modal.js` | Abertura e fechamento das janelas de interação. |
| `checkout.js` | Quantidade, frete, formulário de entrega e compra demonstrativa. |
| `endereco.js` | Consulta e tratamento da resposta do ViaCEP. |
| `festival.js` | Simulação de cadastro de nota fiscal na promoção do Festival VITTAIA. |
| `onde-encontrar.js` | Apresentação dos municípios previstos na proposta. |
| `depoimentos.js` | Criação dos cards e navegação do carrossel. |
| `feedback.js` | Notificações, validação de campos e estados de carregamento. |
| `animations.js` | Entradas de elementos acionadas pelo scroll. |
| `experience.js` | Progresso de leitura, header reativo e parallax no desktop. |
| `motion.js` | Preferência de movimento reduzido e adaptação para dispositivos básicos. |
| `icons.js` | Ícones vetoriais da interface. |

## Como executar localmente

Para visualizar a página, abra `index.html` diretamente no navegador ou utilize um servidor estático local — os arquivos finais (`styles/site.css` e `js/site.js`) já ficam prontos no repositório.

Caso faça alterações nos estilos ou nos módulos JavaScript, instale as dependências de desenvolvimento com **Node.js e npm**:

```bash
npm ci
```

Em seguida, gere novamente os arquivos finais minificados:

```bash
npx @tailwindcss/cli -i styles/main.css -o styles/site.css --minify
npx esbuild js/main.js --bundle --format=iife --minify --outfile=js/site.js
```

As alterações devem ser feitas sempre nos arquivos-fonte em `styles/` e `js/`; mudanças diretas em `styles/site.css` ou `js/site.js` serão sobrescritas na próxima compilação.

## Como a aplicação funciona

O `index.html` carrega o CSS compilado e um único script JavaScript gerado a partir de `js/main.js`, que inicializa os módulos de navegação, promoção do festival, pontos de venda, compra, depoimentos, consulta de endereço e efeitos visuais.

As interações são executadas no navegador. Preços, limites de quantidade e frete ficam centralizados em `js/config.js`, os depoimentos em `js/data/depoimentos.js` e os estilos divididos entre regras globais, componentes e seções. Em aparelhos mais básicos ou quando o sistema indica preferência por movimento reduzido, efeitos mais custosos (como blur em segundo plano, parallax e animações em cascata) são simplificados automaticamente para manter a rolagem fluida.

Ao completar um CEP de oito dígitos, a página consulta o ViaCEP. Quando o endereço é encontrado, o formulário de entrega se expande e preenche os campos disponíveis, ficando número e complemento para preenchimento manual. CEPs genéricos podem exigir o preenchimento manual de logradouro ou bairro.

A consulta exige conexão com a internet. O CEP é enviado ao ViaCEP; os demais dados de entrega permanecem apenas na página durante a simulação. O projeto não possui backend próprio para armazenar endereços, registrar pedidos ou processar pagamentos.

## Publicação

O site foi publicado na **Vercel** como uma aplicação estática.

A publicação utiliza o `index.html` junto das pastas `assets/`, `styles/` e `js/`, preservando os caminhos relativos. Não é necessário manter um processo Node.js em execução para atender aos visitantes da página.

## Escopo demonstrativo

O projeto foi desenvolvido para complementar uma apresentação acadêmica e compor meu portfólio. A experiência de navegação e as interações de interface são funcionais, enquanto as operações comerciais representam cenários simulados:

- A VITTAIA e o produto apresentado são fictícios.
- Os depoimentos têm finalidade ilustrativa.
- As cidades e canais listados representam uma proposta de distribuição, sem estabelecimentos ou endereços comerciais confirmados.
- Os valores de produto e frete pertencem à demonstração.
- A conclusão de uma compra ou o cadastro de nota fiscal na promoção não gera pedido, inscrição em sorteio, contrato ou cobrança.

**Autoria do desenvolvimento do site: Victor Domingos Bastos, atuando como desenvolvedor externo à turma de Gestão Empresarial.**

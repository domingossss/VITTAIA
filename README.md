# VITTAIA — Diferente até no sabor

Landing page responsiva para apresentar a **VITTAIA**, uma marca fictícia de refrigerante orgânico de uvaia, desenvolvida como complemento digital de um plano de negócios acadêmico.

**Desenvolvimento:** Victor Domingos Bastos.

> **Projeto demonstrativo:** a empresa, o produto, os depoimentos e a distribuição apresentados fazem parte de uma proposta fictícia. As interações de compra, assinatura e frete são simulações, sem pedidos reais ou cobranças.

## Contexto e autoria

Desenvolvi este site a pedido de uma turma de **Gestão Empresarial**, que está elaborando um plano de negócios para a marca VITTAIA. A landing page será entregue à turma para complementar o trabalho e apoiar a apresentação da proposta de negócio.

**Não faço parte dessa turma.** Minha participação é como desenvolvedor externo, responsável pela implementação do site. O plano de negócios é o trabalho acadêmico da turma; o desenvolvimento desta interface é a minha contribuição profissional para o projeto.

Este repositório também integra meu **portfólio de desenvolvimento**, demonstrando a implementação de uma interface responsiva, a organização de um projeto front-end e a integração de recursos interativos em uma página estática.

## A proposta

A página apresenta o conceito da marca, a uvaia, os diferenciais do produto e uma proposta de comercialização. O objetivo é transformar parte do plano de negócios em uma experiência navegável, aproximando a apresentação acadêmica de uma aplicação prática de comunicação e divulgação de produto.

A experiência utiliza a identidade visual definida para a VITTAIA, com tons de verde, amarelo e creme, fotografias de produto, elementos botânicos e transições curvas entre as seções.

## Funcionalidades

- **Apresentação do produto:** informações sobre a marca, a fruta e o pack com seis latas de 269 ml.
- **Navegação responsiva:** menu adaptado para dispositivos móveis e links para as seções da página.
- **Clube VITTAIA:** simulação de assinatura com seleção de frequência e quantidade de packs.
- **Comparativo:** tabela ilustrativa para apresentar o posicionamento do produto.
- **Distribuição proposta:** lista dos 39 municípios da Região Metropolitana de São Paulo, apresentados como cobertura fictícia de comercialização.
- **Depoimentos:** carrossel com relatos fictícios, navegação por indicadores, arraste e suporte ao teclado.
- **Compra demonstrativa:** seleção de quantidade, cálculo do subtotal e apresentação de um resumo do pedido.
- **Frete fixo:** valor de R$ 10,50 na simulação, independentemente da região do CEP informado.
- **Consulta de CEP:** preenchimento de logradouro, bairro, cidade e UF por meio do [ViaCEP](https://viacep.com.br/), com número e complemento preenchidos manualmente.
- **Feedback de interface:** validação junto aos campos, estados de carregamento e notificações de sucesso, informação e erro.
- **Movimento e acabamento:** entradas em cascata, parallax discreto, microinterações, header reativo ao scroll e indicador de progresso de leitura.

## Tecnologias

| Tecnologia | Aplicação no projeto |
| --- | --- |
| HTML5 | Estrutura e conteúdo da landing page. |
| CSS3 | Layout responsivo, identidade visual, curvas, superfícies e estados de interação. |
| Tailwind CSS 4 | Classes utilitárias e compilação dos estilos. |
| JavaScript com módulos ES | Organização dos comportamentos e da lógica de interface. |
| esbuild | Agrupamento dos módulos em um arquivo JavaScript para uso no navegador. |
| Node.js e npm | Ambiente de desenvolvimento, dependências e geração dos arquivos finais. |
| APIs nativas do navegador | Intersection Observer, Web Animations, Resize Observer e requestAnimationFrame. |
| ViaCEP | Consulta pública de endereço a partir do CEP. |

O resultado é um **site estático**. O Node.js participa da etapa de desenvolvimento e compilação; a página publicada é servida como HTML, CSS, JavaScript e arquivos de mídia.

## Estrutura do projeto

```text
vittaia/
├── assets/
│   ├── images/              # Imagens de marca, produto e conteúdo
│   └── shapes/              # Curvas e elementos decorativos em SVG
├── js/
│   ├── data/                # Conteúdo dos depoimentos
│   ├── modules/             # Comportamentos organizados por funcionalidade
│   ├── utils/               # Funções compartilhadas de formatação
│   ├── config.js            # Preço, produto, frete e parâmetros de animação
│   ├── main.js              # Inicialização dos módulos
│   └── site.js              # JavaScript gerado para o navegador
├── styles/
│   ├── components/          # Componentes compartilhados e feedback visual
│   ├── sections/            # Estilos específicos de cada seção
│   ├── base.css             # Regras globais
│   ├── theme.css            # Cores e variáveis da identidade visual
│   ├── main.css             # Entrada da compilação do Tailwind
│   └── site.css             # CSS gerado para o navegador
├── build.mjs                # Compilação e acompanhamento de alterações
├── index.html               # Página principal
├── package.json             # Scripts e dependências de desenvolvimento
├── package-lock.json        # Versões das dependências
├── .gitignore               # Arquivos e dependências ignorados pelo Git
└── README.md
```

### Organização dos comportamentos

Os arquivos em `js/modules/` concentram responsabilidades específicas:

| Módulo | Responsabilidade |
| --- | --- |
| `navigation.js` | Menu e identificação da seção em exibição. |
| `modal.js` | Abertura e fechamento das janelas de interação. |
| `checkout.js` | Quantidade, frete, formulário de entrega e compra demonstrativa. |
| `endereco.js` | Consulta e tratamento da resposta do ViaCEP. |
| `clube.js` | Simulação de assinatura. |
| `onde-encontrar.js` | Apresentação dos municípios previstos na proposta. |
| `depoimentos.js` | Criação dos cards e navegação do carrossel. |
| `feedback.js` | Notificações, validação de campos e carregamento. |
| `animations.js` | Entradas de elementos acionadas pelo scroll. |
| `experience.js` | Progresso de leitura, header reativo e parallax. |
| `motion.js` | Configuração compartilhada de movimento. |
| `icons.js` | Ícones vetoriais da interface. |

## Como executar localmente

Com **Node.js e npm** instalados, abra o terminal na pasta que contém `package.json` e instale as dependências:

```bash
npm ci
```

Para trabalhar no código:

```bash
npm run dev
```

Esse comando gera e acompanha alterações no CSS e no JavaScript. **Ele não inicia um servidor HTTP nem abre o navegador.** Para visualizar a página, abra `index.html` diretamente ou utilize um servidor estático de sua preferência. Atualize a página após salvar as alterações.

Para gerar os arquivos finais minificados:

```bash
npm run build
```

A compilação atualiza `styles/site.css` e `js/site.js`, os arquivos carregados pelo HTML. As alterações devem ser feitas nos arquivos-fonte; mudanças diretamente nos arquivos gerados serão sobrescritas no próximo build.

## Como a aplicação funciona

O `index.html` carrega o CSS compilado e um único script JavaScript. Esse script é gerado a partir de `js/main.js`, que inicializa os módulos de navegação, compra, assinatura, depoimentos, consulta de endereço e efeitos visuais.

As interações são executadas no navegador. Preços, limites de quantidade e frete ficam centralizados em `js/config.js`. Os depoimentos são mantidos em `js/data/depoimentos.js`, e os estilos são separados entre regras globais, componentes e seções.

Ao completar um CEP de oito dígitos, a página consulta o ViaCEP. Quando o endereço é encontrado, o formulário de entrega se expande e preenche os campos disponíveis. O número do imóvel e o complemento são informados pelo usuário. CEPs genéricos podem exigir o preenchimento manual de logradouro ou bairro.

A consulta exige conexão com a internet. O CEP é enviado ao ViaCEP; os demais dados de entrega permanecem na página durante a simulação. O projeto não possui backend próprio para armazenar endereços, registrar pedidos ou processar pagamentos.

## Publicação

O site foi publicado na **Vercel**, que disponibiliza a landing page como uma aplicação estática.

Os arquivos finais são gerados com `npm run build`. A publicação utiliza o `index.html` junto das pastas `assets/`, `styles/` e `js/`, preservando os caminhos relativos.

Não é necessário manter um processo Node.js em execução para atender aos visitantes da página.

## Escopo demonstrativo

O projeto foi desenvolvido para complementar uma apresentação acadêmica e compor meu portfólio. A experiência de navegação e as interações de interface são funcionais, enquanto as operações comerciais representam cenários simulados:

- A VITTAIA e o produto apresentado são fictícios.
- Os depoimentos têm finalidade ilustrativa.
- As cidades listadas representam uma proposta de distribuição, sem estabelecimentos ou endereços comerciais confirmados.
- Os valores de produto e frete pertencem à demonstração.
- A conclusão de uma compra ou assinatura não gera pedido, contrato ou cobrança.

**Autoria do desenvolvimento do site: Victor Domingos Bastos, atuando como desenvolvedor externo à turma de Gestão Empresarial.**

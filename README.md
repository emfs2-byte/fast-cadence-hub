# FAST Workshop Hub

Modelos de Dados (Mocks)

Gere os dados mockados considerando as seguintes estruturas:

Colaborador: { id: int, nome: string }

Workshop: { id: int, nome: string, dataRealizacao: datetime, descricao: string, participantes: array[int] (IDs dos colaboradores) }

Crie pelo menos 5 colaboradores e 3 workshops para popular a interface.

Camada de dados desacoplada: isole o acesso aos mocks em um módulo de "serviço" separado dos componentes (ex: services/colaboradoresService.js, services/workshopsService.js), com funções assíncronas (async/await simulando uma chamada de API, mesmo que hoje apenas retornem o mock). Isso deve permitir trocar facilmente a origem dos dados por uma API REST real no futuro, sem alterar os componentes de tela.

Tela 1: Colaboradores

Uma tela exibindo uma tabela ou grid de cartões com a lista de todos os colaboradores registrados (ID e Nome).

Tela 2: Workshops

Apresente uma lista ou tabela elegante com todos os workshops (exibindo Nome e Data).

Regra de interação: ao clicar em um workshop específico da lista, a tela deve exibir um painel lateral (ou um Modal/Card de detalhes na mesma tela) contendo:

Nome completo do workshop

Data e hora formatadas

Descrição detalhada

Uma lista com os nomes de todos os colaboradores que participaram deste workshop (cruzando os IDs de participantes com o mock de Colaboradores)

Tela 3: Dashboard (Métricas de Participação)

Utilize a biblioteca recharts para exibir dois gráficos:

Um "BarChart" mostrando a quantidade de workshops que cada colaborador participou (Eixo X: Nome do Colaborador, Eixo Y: Quantidade de Workshops)

Um "PieChart" mostrando a quantidade de colaboradores presentes por workshop

Adicione legendas e tooltips nos gráficos.

Estados da Interface

Loading state: como os dados vêm de funções assíncronas (mesmo que mockadas), exiba um indicador de carregamento (spinner ou skeleton) enquanto os dados são "buscados", simulando um pequeno delay de rede.

Empty state: trate o caso de não haver colaboradores, workshops ou participantes, com uma mensagem visual amigável.

Error state (opcional, mas recomendado): estruture o service layer para permitir tratar erros de requisição (try/catch), preparando o terreno para uma futura integração real com backend.

Estilo e Layout (Clean Code & UI)

Use a identidade visual da FAST Soluções como base: azul (cor primária, para elementos de destaque, botões, cabeçalhos, gráficos) e branco (cor de fundo predominante), complementados por tons de cinza claro apenas como cor de apoio (bordas, textos secundários, backgrounds de cards, estados hover) para garantir contraste e legibilidade.

Evite usar o azul em excesso em áreas de texto corrido; reserve-o para elementos de UI (navbar/sidebar, botões, ícones, indicadores ativos) e para as cores principais dos gráficos.

O código deve ser modular, separando telas, componentes reutilizáveis (cards, tabelas, modais) e a camada de serviços em pastas distintas.

A interface deve ser responsiva, adaptando-se bem a telas de celulares e desktops.

Siga boas práticas de Clean Code: componentes pequenos e coesos, nomes descritivos, sem lógica de negócio misturada com JSX.

Crie uma aplicação web moderna e responsiva em React para gerenciar os workshops trimestrais da "FAST Soluções", uma empresa de desenvolvimento de software. A interface deve ter uma identidade visual distintiva e memorável — não pode parecer um dashboard genérico de template. Use Tailwind CSS, Lucide React para ícones e Recharts para os gráficos.

Direção de design (diferencial visual):

Inspire-se sutilmente no universo de ferramentas de desenvolvedor, já que é uma empresa de software: sidebar de navegação lateral com estética de "activity bar" de editor de código (fundo azul-marinho escuro, ícones), e use fonte monoespaçada (JetBrains Mono) para dados técnicos como IDs, datas e labels — combinada com Space Grotesk para títulos/display e Inter para o corpo do texto.

Paleta: azul-marinho escuro (#0A2540 aprox., para sidebar e textos de destaque) + branco predominante no conteúdo (fiel à identidade visual azul/branco da FAST) + azul-royal vibrante como cor de ação/destaque/gráficos + cinza-ardósia apenas como cor de apoio (bordas, textos secundários).

Elemento assinatura obrigatório: no Dashboard, crie uma "linha do tempo de cadência trimestral" no estilo de um grafo de commits (git graph) — cada workshop é um nó posicionado horizontalmente conforme sua data real, com o tamanho do nó proporcional ao número de colaboradores presentes, conectados por uma linha fina. Isso deve ser o elemento visual mais marcante da tela.

Menu de navegação (lateral, colapsando para ícones no mobile) com três telas, nesta ordem: "Colaboradores", "Workshops", "Dashboard".

1. Modelos de dados (mocks):

Colaborador: { id: int, nome: string }

Workshop: { id: int, nome: string, dataRealizacao: datetime, descricao: string, participantes: array[int] }

Crie pelo menos 7 colaboradores e 4 workshops (temas de desenvolvimento de software, datas trimestrais, sempre quinta-feira 16h–17h).

2. Camada de serviço: isole o acesso aos dados em funções assíncronas separadas dos componentes (simulando uma API real com delay), preparando o terreno para integração futura com backend.

3. Tela Colaboradores: grid de cards com ID (estilo tag monoespaçada), nome, iniciais em avatar circular, e quantidade de workshops que já participou.

4. Tela Workshops: lista/tabela com nome e data. Ao clicar em um workshop, abre um painel lateral (slide-over) com nome completo, data e hora formatadas, descrição e lista de colaboradores presentes (cruzando os IDs).

5. Tela Dashboard: cards de métricas resumidas no topo, a linha do tempo de cadência (elemento assinatura), um BarChart (workshops por colaborador) e um PieChart (colaboradores por workshop), ambos com tooltips e legendas customizados no mesmo estilo visual.

6. Estados: loading state (skeleton ou spinner discreto, com labels em fonte monoespaçada), empty states com mensagens específicas por tela, e tratamento de erro na camada de serviço.

7. Código: modular, componentes pequenos e coesos, sem lógica de negócio misturada com JSX, totalmente responsivo (mobile a desktop).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2ae77683-048f-4543-a5d4-98e198746073).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

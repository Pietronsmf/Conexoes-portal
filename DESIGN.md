# Conexões para Inovação · design system do protótipo

Releitura do portal [Petrobras Conexões para Inovação](https://conexoes-inovacao.petrobras.com.br/s/?language=pt_BR), feita como protótipo navegável em HTML, CSS e JavaScript sem dependências.

> Protótipo conceitual. Não é o site oficial da Petrobras. Os desafios, prazos e cadastros são simulados.

## 1. Leitura do briefing

**Lendo como:** redesign completo (overhaul) do portal de inovação aberta da Petrobras, para startups, ICTs e empresas fornecedoras. Segue a **linguagem visual do site institucional petrobras.com.br** (segmento branco do logo, cards com diagonal verde, barras amarelas), **tema claro no site todo**, com um primeiro impacto cinematográfico: o vídeo da plataforma escurecido, com texto branco, como nos destaques do petrobras.com.br. Base técnica: CSS próprio com tokens, sem framework.

| Dial | Valor | Por quê |
| --- | --- | --- |
| `DESIGN_VARIANCE` | 6 | Empresa de capital aberto e público técnico pedem confiança (3 a 4). O overhaul soma +2. |
| `MOTION_INTENSITY` | 5 | Movimento só onde comunica: entrada do hero, vídeos do hero e do mar, ondas, revelação no scroll, filtros e jornada. |
| `VISUAL_DENSITY` | 4 | Página de marketing que também é ferramenta (lista de desafios). |

### Limitação da auditoria

O portal Conexões não pôde ser aberto neste ambiente: o servidor envia uma cadeia de certificado TLS incompleta e o proxy recusa a conexão. A arquitetura de informação foi reconstruída com dados públicos:

- **Módulos:** Startups (com o Sebrae), Parcerias Tecnológicas, Encomendas Tecnológicas, Aquisição de Soluções e Transferência de Tecnologias.
- **Temas buscados:** tecnologias digitais, robótica, inspeção, armazenamento e geração de energia, redução de carbono, modelagem geológica e corrosão.
- **Números do Módulo Startups:** cerca de R$ 54 milhões, 53 startups em 10 estados ([Secom, set/2024](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2024/09/startups-edital-de-r-16-milhoes-da-petrobras-esta-aberto-para-envio-de-propostas)).
- **Contato:** canal.startups@petrobras.com.br.

**Antes de implementar,** vale conferir rótulos, slugs e textos com o portal real. Na implementação em Salesforce Experience Cloud, mantenha os slugs atuais (`/s/startups`, `/s/encomendas-tecnologicas`, `/s/aquisicao-de-solucoes`, etc.) para não perder SEO nem links já divulgados.

## 2. Análise do site petrobras.com.br

Analisado em novembro de 2026, renderizado em 1440 px e em celular.

### Header

- **Duas camadas.** No topo, uma barra de serviços de 48 px, em caixa alta, com:
  - "Você está em: SITE PETROBRAS";
  - "Acesse também": Acesso à Informação, Investidores, Imprensa, Fornecedores e Clientes;
  - controle de tamanho do texto (A- 100% A+), alto contraste e idioma.
- **Aba branca do logo.** Um SVG de 344×104 px: borda direita diagonal, canto inferior arredondado e base levemente inclinada. Fica sobreposta à foto do destaque. O logo dentro dela tem 134×26 px.
- **Menu.** Itens em branco sobre a foto, com um degradê escuro só no topo para dar leitura. Tem setas de submenu e ícone de busca.
- **Página rolada.** Vira uma barra branca compacta, com logo, menu em verde e busca.
- **Celular.** A navegação vai para uma barra inferior: Idioma, Acessibilidade, Menu (botão central), Canais e Busca.

### Títulos

Títulos de seção em negrito (32 px, cinza `#373737`), seguidos de uma barra amarela `#FDC82F` de 32×3,5 px. A mesma barra aparece sob o título do destaque e sob o título dos cards de notícia.

### Cards

| Uso | Anatomia |
| --- | --- |
| Destaques | Card branco, foto em cima, título em negrito e barra amarela curta |
| Notícias e curiosidades | Foto inteira, degradê escuro embaixo, título branco e barra amarela |
| Acesse também | Foto com filtro de cor da marca (verde e amarelo) e escurecimento de 48%. Embaixo, um SVG com painel verde `#008542` de topo diagonal e um fio amarelo de inclinação diferente, que cruza a borda e faz uma curva para baixo na direita. Título branco de 22 px em negrito. Cantos de 16 px e sombra discreta. |

### Outros pontos

- **Fonte:** Petrobras Sans, proprietária (300, 400, 700 e 800).
- **Cores:** texto `#272833` sobre branco, CTA em pílula verde com seta.
- **Carrosséis:** setas e indicadores.
- **Rodapé:** logo, redes sociais, busca, colunas de links e linha legal.

### O que foi trazido para o protótipo

| Padrão Petrobras | No protótipo |
| --- | --- |
| Barra de serviços | "Você está em: Conexões para Inovação", "Acesse também" com links reais dos sites da Petrobras e controle A- / A+ funcional. Escondida abaixo de 1024 px. |
| Header sobre o destaque | No topo da home, como no site: barra de serviços translúcida com texto branco, aba branca do logo presa à esquerda (diagonal de 76 px em 104 px de altura, canto arredondado, base inclinada) e menu branco sobre o vídeo. |
| Header compacto ao rolar | A barra de serviços sai de cena e o header vira a ilha flutuante da versão anterior, com o logo num segmento branco de borda diagonal. As páginas internas usam sempre a ilha. |
| Menu | Branco sobre o vídeo, verde Petrobras na ilha; o item atual e o hover ganham a barra amarela. |
| Destaque com vídeo | Vídeo escurecido, título grande em peso leve, barra amarela de 64×6 px, subtítulo em negrito e texto branco, alinhados à esquerda. |
| Linhas da marca | Dois fios finos à direita do destaque: um branco, que desce em diagonal e faz uma curva, e um amarelo que o cruza. |
| Barra amarela sob títulos | Em todos os títulos de seção e de página, no título do hero e nos títulos dos cards de desafio. |
| Card "Acesse também" | Cards dos módulos: foto com filtro verde leve (a foto continua legível), painel verde diagonal e fio amarelo (SVG próprio, escalável), texto branco. |
| Petrobras Sans | Não usada: é proprietária. O protótipo segue com Geist; na implementação, usar a fonte licenciada. |
| Barra de navegação inferior no celular | Não adotada nesta versão, porque o detalhe do desafio já usa uma barra fixa embaixo. Fica como próximo passo. |

## 3. Skills de design aplicadas

| Skill | O que entrou no protótipo |
| --- | --- |
| `redesign-existing-projects` | Auditoria antes de mexer (inclusive do site institucional), ordem de prioridade, estados de carregamento, vazio e erro, link para pular ao conteúdo, 404 próprio, links legais visivelmente desativados. |
| `design-taste-frontend` | Leitura do briefing e dials, fidelidade à marca existente, trava de raio, regras do hero, no máximo 1 sobretítulo a cada 3 seções, um único marquee, nenhum travessão, rótulos de CTA únicos por intenção, logo real, pre-flight completo. |
| `high-end-visual-design` | Moldura dupla (shell + core) em painéis e cards de desafio, botão com ícone aninhado, curvas `cubic-bezier` próprias, grão fixo sem custo de scroll. |
| `emil-design-eng` | Movimento motivado, `scale(0.97)` no clique, filtro segmentado com `clip-path`, só `transform` e `opacity` nas animações, pausa fora da tela e `prefers-reduced-motion`. |

## 4. Marca

- **Assinatura:** logo oficial Petrobras horizontal (símbolo BR + PETROBRAS), fio vertical e o nome do programa em duas linhas, dentro do segmento branco da ilha do header. Tamanhos: 26 px de altura no header, 22 px no celular e 30 px no rodapé.
- **Favicon:** o símbolo BR ocupando o ícone inteiro, sem moldura branca.
- **Uso:** o logo aparece sempre sobre branco, nas cores originais. Não recolorir, não aplicar sombra, não colocar sobre foto.
- **Origem e regras:** ver [`assets/brand/README.md`](assets/brand/README.md). Na versão final, usar os arquivos do manual de marca oficial.

## 5. Tokens

### Tema

**Um único tema, claro.** O site não segue o modo escuro do sistema (`color-scheme: light`).

### Cor

Neutros levemente esverdeados, **um acento interativo** (verde Petrobras) e o **amarelo da marca só em linhas e barras finas**, nunca em texto, botão ou fundo. A exceção segue o site da Petrobras: em fundo escuro, links e o botão de contorno podem ser amarelos.

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#f2f5f3` | Fundo da página, ondas de saída do mar |
| `--surface` | `#fbfcfb` | Barra de serviços, ilha do header, cards |
| `--ink` / `--ink-2` / `--muted` | `#0e1c17` / `#33433d` / `#5a6a64` | Texto principal, apoio, metadados |
| `--accent` | `#008542` | CTA, painel verde dos cards de módulo |
| `--accent-ink` | `#006b35` | Links e menu |
| `--brand-yellow` | `#fdc82f` | Barras sob títulos, fio dos cards, sublinhado do menu |
| `--sea-scrim` | `4 24 26` | Escurecimento do vídeo do mar (de 0 a 62%) |
| `--sea-blend` | `180px` | Faixa em que o mar entra em fusão com o mar do hero |
| `--warn-*` / `--danger-*` | | Somente estados |

Contraste medido (WCAG):

- **Fundo da página:** texto 16:1, apoio 9,5:1, metadados 5,2:1, links e menu 6,1:1. O texto branco sobre o verde dos botões e dos cards fica em 4,7:1.
- **Texto sobre vídeo:** medido em 5 quadros de cada vídeo, nos 5% de pixels mais desfavoráveis sob o texto, de 390 a 1920 px.
  - Hero: título acima de 8:1, subtítulo acima de 7,7:1, parágrafo acima de 5,6:1.
  - Header sobre o vídeo: menu acima de 7,8:1, barra de serviços acima de 13:1.
  - Mar: frase acima de 7,3:1, fonte e "Buscas frequentes" acima de 8,5:1.
  - Cards de foto dos desafios (todas as fotos, de 390 a 1440 px, com os filtros): módulo acima de 5,3:1, dias e data acima de 6,4:1, título acima de 6,9:1.
  - Textos da vitrine sobre a foto de fundo (10 posições de rolagem, de 390 a 1440 px): abertura acima de 5,6:1, descrição dos grupos acima de 6,2:1, rótulos acima de 8:1, nota final acima de 5,2:1.
  - Topo da página do desafio (as 12 fotos, a 1440 px e no celular): trilha acima de 5,5:1, resumo e rótulos dos dados acima de 5,8:1, módulo, título e dados acima de 6,9:1.

### Tipografia

Geist (texto e títulos) e Geist Mono (contadores), auto-hospedadas, licença OFL.

| Classe | Tamanho | Uso |
| --- | --- | --- |
| `.display` | 48 a 80 px | Título do hero e 404 |
| `.title-xl` | 32 a 52 px | Título de seção e de página, com barra amarela |
| `.title-lg` | 24 a 32 px | Subtítulos, respostas |
| `.lead` | 17 a 20 px | Texto de abertura |
| `.eyebrow` | 12 px, caixa alta | No máximo 2 na home |

### Raio

- **Interativos:** pílula.
- **Moldura dupla:** shell `28px` e core `22px`.
- **Cards de módulo (padrão Petrobras):** `16px`.
- **Mídia:** `20` a `28px`.
- **Cartões internos:** `16` a `18px`.

### Header

- **Barra de serviços:** `--topbar-h` 40 px (0 abaixo de 1024 px).
- **Barra sobre o vídeo (topo da home):** `--bar-h` 80 px, aba `--tab-h` 104 px e diagonal `--tab-dx` 76 px. No celular: 64, 80 e 58 px.
- **Ilha:** `--island-h` 64 px e `--island-gap` 12 px. Deles saem `--mainbar-h` (76 px, para âncoras e barras fixas) e `--header-offset` (116 px no desktop, 76 px no celular), que posiciona o conteúdo das páginas internas.
- **Aparência:** o atributo `data-look` (`bar` ou `island`) é definido pelo JS a partir do estado de rolagem e do menu.

## 6. Movimento: o que anima e por quê

| Elemento | Animação | Propósito |
| --- | --- | --- |
| Header | A barra de serviços sai com `transform`; a troca entre barra e ilha é um fade com leve descida (420 ms) | Ganhar espaço ao rolar, sem pulo de layout |
| Menu | Barra amarela cresce no hover e marca a página atual | Localização |
| Hero | Fade + subida + desfoque, escalonado | Hierarquia na primeira dobra |
| Linhas da marca | Entram uma vez, de cima para baixo (recorte com `clip-path`), depois do texto | Assinatura da marca sem disputar com o título |
| Fundo da vitrine | Foto presa à tela (sticky) e leve aproximação ligada à rolagem (`animation-timeline`, onde o navegador suporta) | Profundidade: os cards passam por cima do mar |
| Cards da vitrine | Sobem e aparecem quando entram na tela, em sequência por coluna (90 ms) | Ritmo de leitura, também ao trocar o filtro |
| Vídeos | Hero e mar em loop vai-e-volta de 11 s a 0,8x; só tocam visíveis; os dois botões de pausa controlam ambos | Atmosfera e continuidade (WCAG 2.2.2) |
| Ondas | Na saída do mar, espuma e borda na cor da página deslizam em sentidos opostos (19 s e 13 s); em retrato, uma onda também abre o mar | Passagem do mar para a página |
| Seções e cards | Revelação no scroll, entrada escalonada após filtrar | Ritmo de leitura e mudança de estado |
| Barra de prazo | Preenche até a fração do período que já passou, ao aparecer (1,1 s) | Mostrar o tempo restante sem precisar ler a data |
| Estado "Últimos dias" | O ponto do selo pulsa devagar | Urgência, sem piscar o card inteiro |
| Prévia do aviso | Troca com fade e leve subida ao mudar os temas | Ligar a escolha ao resultado |
| Filtro segmentado | Recorte `clip-path` desliza até o ativo | Continuidade |

As ondas e os vídeos só animam quando estão visíveis (`IntersectionObserver`). Com `prefers-reduced-motion` ou economia de dados, os vídeos não iniciam (o botão passa a "reproduzir"), as ondas ficam paradas e o marquee vira lista.

## 7. Componentes

- **Header:**
  - No topo da home, o header do site Petrobras sobre o vídeo: barra de serviços translúcida, aba branca do logo, menu branco, busca e "Entrar".
  - Ao rolar, com o menu aberto e nas páginas internas, a ilha flutuante da versão anterior (pílula de vidro claro, até 1200 px), com o logo num segmento branco diagonal e o menu verde.
  - Até 1023 px, menu de tela cheia.
- **Hero:**
  - No desktop, como os destaques do petrobras.com.br: vídeo escurecido (mais forte atrás do texto e no topo), texto branco à esquerda e as linhas da marca à direita.
  - O vídeo é exibido espelhado, para a plataforma ficar à direita e o texto ficar sobre o mar calmo.
  - O pé do hero não tem fade: o mar segue para a seção de baixo.
  - Em retrato, o vídeo vira um bloco no topo que escurece até a cor do mar; o texto fica abaixo, sobre o fundo escuro, e as linhas ficam no canto do vídeo.
- **Mar contínuo (busca e números):** a seção sobe 180 px por baixo do hero e o vídeo do mar entra em fusão com o mar do próprio hero, sem emenda. O mar escurece aos poucos até a frase, que fica na frente em branco, com os números sublinhados em amarelo. A busca continua sobre a linha d'água. Ondas na cor da página fecham a seção. Em retrato, o mar começa com uma onda.
- **Cards de módulo:** padrão "Acesse também" da Petrobras, em grade assimétrica, com Startups em destaque. Cada módulo tem uma foto que mostra o seu público: equipe de startup com braço robótico, laboratório (universidades e ICTs), torre de refinaria (problemas da operação), técnico em campo (soluções prontas) e peças impressas em 3D (tecnologia que sai para o mercado). Cada foto tem enquadramento próprio para o desktop e para cards estreitos (`--pos` e `--pos-sm`).
- **Card de desafio (lista, detalhe):** moldura dupla; módulo com ícone em bloco verde claro e selo de estado com ponto; título com barra amarela; resumo em 2 linhas; tags; rodapé em faixa cinza com a contagem regressiva em Geist Mono, a data e a barra de prazo (verde, ou âmbar nos últimos dias).
- **Desafios na home (vitrine):** inspirada nos cards de tecnologia do petrobras.com.br.
  - Fundo: vista aérea de uma plataforma no mar, nas cores do primeiro bloco da página. Um mapa de gradiente feito com a paleta do vídeo de abertura deixa o mar verde-acinzentado e as estruturas com a luz quente do pôr do sol. A foto é levemente desfocada e leva o mesmo véu do mar contínuo. Ela fica presa à tela (sticky) enquanto o conteúdo rola por cima e para no fim da seção.
  - Entrada e saída suaves: degradês longos e com curva (cerca de 300 px no desktop) fazem a página clara se dissolver na foto e voltar ao claro no fim.
  - Título à esquerda e texto à direita, com o resumo do momento ("9 chamadas abertas, e 2 encerram nos próximos 10 dias") e o link amarelo para a lista completa.
  - Os desafios ficam em grupos com rótulo em caixa alta e uma frase: "Encerram primeiro" (os 3 prazos mais próximos) e "Publicadas recentemente" (os 3 mais novos entre os demais).
  - Card de foto: cada desafio tem a sua foto, inteira no alto e coberta por um degradê verde embaixo. Por cima vêm o módulo em caixa alta, o título em negrito, os dias e a data, e o botão branco "Ver desafio". Nos últimos dias, aparece um selo âmbar no canto. O verde atrás do texto é preso ao bloco de texto, então a leitura não depende da foto nem da altura do card.
  - O filtro por módulo vale para os grupos. Com menos de 3 desafios num grupo, o espaço vira um atalho para a lista do módulo. Sem nenhum, aparece o estado vazio.
  - No fim, o botão de contorno amarelo acompanha o filtro ("Ver os 4 desafios de Startups").
  - O carregamento usa skeletons no formato dos cards.
- **Avisos por e-mail:**
  - Painel verde profundo com as linhas da marca do hero.
  - Formulário num cartão branco: e-mail, botão e os temas em chips, com marcação múltipla.
  - Ao lado, uma prévia do aviso: um e-mail com um desafio real do tema escolhido, que muda junto com os chips.
  - O sucesso confirma o e-mail e os temas ("sobre Robótica e Corrosão").
- **Página do desafio:** segue a home, sem numeração.
  - Topo em tela cheia com a foto do próprio desafio (a mesma do card), escurecida como o hero da home: mais forte à esquerda, atrás do texto, e no alto, atrás do header. As linhas da marca ficam à direita.
  - O header Petrobras fica sobre a foto e vira a ilha ao rolar, como na home.
  - Por cima, a trilha, o módulo e o estado, o título leve com a barra amarela larga do hero, o resumo e os dados principais (valor, duração, maturidade e área). Um degradê longo leva a foto ao fundo claro do conteúdo.
  - O cartão de prazo sobe 300 px sobre o topo, para a contagem, a barra do prazo e "Enviar proposta" aparecerem sem rolar. Ao rolar, ele fica fixo.
  - Em notebooks (até 900 px de altura, como 1536×864, 1440×900 e 1366×768), o topo fica mais compacto e o cartão sobe 340 px. Assim o botão aparece na primeira tela em todos os desafios, de 1024×768 a 1920×1080.
  - Junto do cartão, o índice "Nesta página" marca a seção atual (`IntersectionObserver`). Em telas baixas ou com texto em 125%, o cartão rola por dentro.
  - Os dados principais do topo respondem primeiro o que o participante pergunta: valor (ou pagamento, na transferência), duração, maturidade pedida (TRL, com o nome do nível ao passar o mouse) e área. Abaixo do prazo, o cartão mostra quando sai o resultado; nas chamadas encerradas, em que etapa a chamada está.
  - As seções seguem a estrutura do benchmark de portais de desafios (Enel Open Innovability, HeroX, EIC Accelerator, SBIR e outros), na ordem das dúvidas de quem vai participar:
    1. **O desafio:** contexto, "O que buscamos" em grade com check, a maturidade esperada em palavras ("de validação em laboratório (TRL 4) a demonstração em ambiente relevante (TRL 6)") e o aviso de que soluções de outros setores são bem-vindas.
    2. **O que você recebe:** 4 cartões por módulo (recursos, apoio técnico, teste em ambiente real, apoio do Sebrae...).
    3. **Quem pode participar:** o público em destaque verde e a checagem rápida: perguntas de sim ou não do módulo (Marco Legal das Startups, credenciamento na ANP, cadastro de fornecedor...) e uma de maturidade, gerada do TRL do desafio. O resultado aparece na hora; quando a resposta é não, a dica aponta o módulo que combina melhor.
    4. **Como participar:** 3 passos (cadastro, proposta, envio e acompanhamento), o que a proposta precisa ter (com limites, por módulo), os documentos e o histórico do edital.
    5. **Como avaliamos:** critérios com peso e barra, quem avalia, nota mínima e devolutiva para todos.
    6. **Depois do envio:** a linha do tempo com o selo "Hoje", o caminho depois da seleção (contrato, projeto, teste, o que pode vir depois) com prazos, um número real do programa com fonte e o que acontece se a proposta não for selecionada.
    7. **Propriedade intelectual:** resumo em linguagem simples, por módulo (o que você já tinha, o que for criado, depois do projeto).
    8. **Perguntas e respostas:** públicas, iguais para todos, com o prazo para perguntar e o botão que abre o assistente.
    9. **Resultados anteriores:** projetos parecidos e o que quem participou conseguiu depois.
  - Valores, pesos e notas são ilustrativos e levam um aviso âmbar. Os textos do Módulo Startups seguem o edital de 2024 divulgado pela Agência Sebrae.
  - O cronograma é uma linha com os 4 marcos: o trecho já percorrido fica em verde, o próximo marco em destaque e o selo "Hoje" fica na posição real entre os marcos. No celular, a linha fica na vertical.
  - "Outros desafios abertos" usa a vitrine da home: a mesma foto de fundo fixa, com degradês na entrada e na saída, e 3 cards de foto. Os desafios do mesmo módulo vêm primeiro; depois, os prazos mais próximos.
  - Celular: o texto ocupa a largura toda, com escurecimento por igual e sem as linhas da marca. O cartão de prazo vem logo após o topo e a barra fixa embaixo mostra os dias que faltam.
  - Desafio não encontrado: a página volta ao header em ilha, sem a foto.
- **Dúvidas frequentes:**
  - Perguntas com ícone do tema, sem numeração. A pergunta aberta ganha o fio amarelo, o ícone em verde e a seta.
  - Painel com botões de anterior e próxima, a resposta com barra amarela, um link útil por pergunta (módulos, cadastro, jornada, desafios, Aquisição de Soluções) e um ícone grande e discreto do tema no canto.
  - Abaixo, um contato para quem não achou a resposta. No celular e sem JS, as mesmas perguntas em lista que abre e fecha.
- **Projetos de chamadas anteriores:** na lista de desafios e no fim de cada desafio, cartões com a etapa alcançada (virou contrato, em operação...), duas métricas e o caminho até o resultado. O cartão abre um painel (`dialog`) com desafio, solução, retorno para a empresa e para a Petrobras e um depoimento. Os casos são ilustrativos; o número do programa vem da Secom.
- **Assistente de dúvidas:** botão "Tire suas dúvidas" nas páginas de desafios, com respostas automáticas por palavras-chave (sem inteligência artificial), sugestões em chips e links que levam à seção certa da página. No celular, abre em tela cheia.
- **Outros:** filtro segmentado, estados (skeleton, vazio, erro), formulários com validação (CNPJ numérico e alfanumérico), toast.

## 8. Acessibilidade

- **Navegação:** link "Pular para o conteúdo", landmarks semânticos e `aria-current` no menu.
- **Tamanho do texto:** controle A- / A+ de 87,5% a 125%, lembrado no navegador. A barra de serviços tem tamanho fixo, para o controle não mudar de lugar nem sair da tela. A página não vaza para os lados em nenhum nível.
- **Foco e hover:** foco visível em todos os interativos. Hover só com `(hover: hover) and (pointer: fine)`.
- **Mídia e animação:** vídeos decorativos com botão de pausa (um no hero e um no mar, sincronizados). Elementos decorativos com `aria-hidden` e sem captura de clique.
- **Contraste:** AA verificado (seção 5).

## 9. Pre-flight

- [x] Leitura do briefing, dials e análise do site institucional
- [x] Zero travessões no conteúdo
- [x] Um tema (claro), um acento interativo, amarelo só em linhas finas
- [x] Logo oficial sobre fundo branco, nas cores originais
- [x] Hero escurecido no padrão Petrobras, sem fade no pé; título em 2 linhas de 1024 a 1920 px; CTA visível sem rolar
- [x] 2 sobretítulos em 8 seções; um marquee
- [x] Imagens reais: vídeo enviado (hero, mar e páginas internas) e fotos do Pexels com crédito nos módulos
- [x] Estados de carregamento, vazio, erro e sucesso
- [x] Sem `scroll` listeners; só `IntersectionObserver`
- [x] Sem rolagem horizontal de 390 a 1920 px, inclusive com texto em 125%
- [x] Nenhum erro de console nas 5 páginas, no desktop e no celular

## 10. Próximos passos sugeridos

1. Validar textos, slugs e módulos com o portal atual e com a equipe do programa.
2. Aplicar a fonte Petrobras Sans e os arquivos do manual de marca.
3. Avaliar a barra de navegação inferior no celular, como no site institucional.
4. Levar os tokens e componentes para uma biblioteca no Figma.
5. Implementar como componentes LWC no Experience Cloud, com os dados vindos da API.
6. Versão em inglês (o portal atual tem `language=en_US`).

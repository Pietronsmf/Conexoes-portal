# Conexões para Inovação · design system do protótipo

Releitura do portal [Petrobras Conexões para Inovação](https://conexoes-inovacao.petrobras.com.br/s/?language=pt_BR), feita como protótipo navegável em HTML, CSS e JavaScript sem dependências.

> Protótipo conceitual. Não é o site oficial da Petrobras. Os desafios, prazos e cadastros são simulados.

## 1. Leitura do briefing

**Lendo como:** redesign completo (overhaul) do portal de inovação aberta da Petrobras, para startups, ICTs e empresas fornecedoras. Segue a **linguagem visual do site institucional petrobras.com.br** (aba branca do logo, cards com diagonal verde, barras amarelas), **sempre no tema claro**, com um primeiro impacto cinematográfico (o vídeo da plataforma). Base técnica: CSS próprio com tokens, sem framework.

| Dial | Valor | Por quê |
| --- | --- | --- |
| `DESIGN_VARIANCE` | 6 | Empresa de capital aberto e público técnico pedem confiança (3 a 4). O overhaul soma +2. |
| `MOTION_INTENSITY` | 5 | Movimento só onde comunica: entrada do hero, revelação no scroll, filtros, jornada e a seção debaixo das ondas. |
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
| Aba branca do logo | Mesma geometria (diagonal de 76 px em 104 px de altura, canto arredondado, base inclinada), com o logo oficial e o nome do programa. Uma aba espelhada atrás do menu garante contraste quando o vídeo passa por baixo. |
| Header compacto ao rolar | Barra branca de 80 px com sombra; a barra de serviços sai de cena com `transform`. |
| Menu verde | Links em verde Petrobras; o item atual e o hover ganham a barra amarela. |
| Barra amarela sob títulos | Em todos os títulos de seção e de página, no título do hero e nos títulos dos cards de desafio. |
| Card "Acesse também" | Cards dos módulos: foto dessaturada com filtro verde, painel verde diagonal e fio amarelo (SVG próprio, escalável), texto branco. |
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

- **Assinatura:** logo oficial Petrobras horizontal (símbolo BR + PETROBRAS), fio vertical e o nome do programa em duas linhas, dentro da aba branca do header. Tamanhos: 26 px de altura no header, 22 px no celular e 30 px no rodapé.
- **Favicon:** símbolo BR sobre quadrado branco.
- **Uso:** o logo aparece sempre sobre branco, nas cores originais. Não recolorir, não aplicar sombra, não colocar sobre foto.
- **Origem e regras:** ver [`assets/brand/README.md`](assets/brand/README.md). Na versão final, usar os arquivos do manual de marca oficial.

## 5. Tokens

### Tema

**Um único tema, claro.** O site não segue o modo escuro do sistema (`color-scheme: light`).

### Cor

Neutros levemente esverdeados, **um acento interativo** (verde Petrobras) e o **amarelo da marca só em linhas e barras finas**, nunca em texto, botão ou fundo.

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#f2f5f3` | Fundo da página, painel do hero |
| `--surface` | `#fbfcfb` | Barra de serviços, header rolado, cards |
| `--ink` / `--ink-2` / `--muted` | `#0e1c17` / `#33433d` / `#5a6a64` | Texto principal, apoio, metadados |
| `--accent` | `#008542` | CTA, painel verde dos cards de módulo |
| `--accent-ink` | `#006b35` | Links e menu |
| `--brand-yellow` | `#fdc82f` | Barras sob títulos, fio dos cards, sublinhado do menu |
| `--sea-1` / `--sea-2` / `--sea-3` | `#d3ebe6` / `#c0e2dc` / `#b0dad3` | Água da seção dos números |
| `--warn-*` / `--danger-*` | | Somente estados |

Contraste medido (WCAG):

- **Fundo da página:** texto 16:1, apoio 9,5:1, metadados 5,2:1, links e menu 6,1:1. O texto branco sobre o verde dos botões e dos cards fica em 4,7:1.
- **Água da seção dos números:** o texto de apoio fica acima de 6,5:1 no ponto mais escuro.

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

`--topbar-h` 40 px, `--mainbar-h` 80 px, `--tab-h` 104 px e `--tab-dx` 76 px. No celular: 0, 64, 80 e 58 px. `--header-offset` posiciona o conteúdo das páginas internas.

## 6. Movimento: o que anima e por quê

| Elemento | Animação | Propósito |
| --- | --- | --- |
| Header | A barra de serviços sai com `transform`; o fundo branco entra com fade | Ganhar espaço ao rolar |
| Menu | Barra amarela cresce no hover e marca a página atual | Localização |
| Hero | Fade + subida + desfoque, escalonado | Hierarquia na primeira dobra |
| Vídeo | Loop vai-e-volta de 11 s a 0,8x, pausa fora da tela, botão de pausa | Atmosfera (WCAG 2.2.2) |
| Ondas | Duas ondas periódicas deslizam em sentidos opostos (13 s e 19 s) | Superfície do mar |
| Reflexos de luz | Duas texturas de caustics se cruzam (30 s e 44 s) | Luz debaixo d'água |
| Feixes de luz | Balanço lento de opacidade e posição | Profundidade |
| Bolhas | 12 bolhas sobem com leve oscilação (8 no celular) | Sensação de estar debaixo das ondas |
| Seções e cards | Revelação no scroll, entrada escalonada após filtrar | Ritmo de leitura e mudança de estado |
| Filtro segmentado | Recorte `clip-path` desliza até o ativo | Continuidade |

A seção debaixo das ondas só anima quando está visível (`IntersectionObserver`). Com `prefers-reduced-motion`, o vídeo não inicia, ondas, reflexos e feixes ficam parados, as bolhas somem e o marquee vira lista.

## 7. Componentes

- **Header Petrobras:** barra de serviços, aba branca com logo, aba espelhada atrás do menu, busca, "Entrar". Ao rolar, barra branca compacta. Até 1023 px, menu de tela cheia.
- **Hero:**
  - No desktop, o vídeo aparece numa janela com corte diagonal, sem degradê. O texto fica sobre o fundo claro à direita, com a barra amarela sob o título.
  - Em telas 4:3 e 3:2, o corte vai para a esquerda.
  - Em retrato, o vídeo vira um bloco no topo, com o texto abaixo.
- **Números debaixo das ondas:** água clara em degradê, superfície ondulada, reflexos de luz gerados por código, feixes e bolhas.
- **Cards de módulo:** padrão "Acesse também" da Petrobras, em grade assimétrica, com Startups em destaque.
- **Card de desafio:** moldura dupla, status, título com barra amarela, prazo e contagem regressiva.
- **Outros:** filtro segmentado, estados (skeleton, vazio, erro), dúvidas em abas, avisos por e-mail em duas colunas, formulários com validação (CNPJ numérico e alfanumérico), painel do desafio com barra fixa no celular, toast.

## 8. Acessibilidade

- **Navegação:** link "Pular para o conteúdo", landmarks semânticos e `aria-current` no menu.
- **Tamanho do texto:** controle A- / A+ de 87,5% a 125%, lembrado no navegador. A página não vaza para os lados em nenhum nível.
- **Foco e hover:** foco visível em todos os interativos. Hover só com `(hover: hover) and (pointer: fine)`.
- **Mídia e animação:** vídeo decorativo com botão de pausa. Elementos decorativos com `aria-hidden` e sem captura de clique.
- **Contraste:** AA verificado (seção 5).

## 9. Pre-flight

- [x] Leitura do briefing, dials e análise do site institucional
- [x] Zero travessões no conteúdo
- [x] Um tema (claro), um acento interativo, amarelo só em linhas finas
- [x] Logo oficial sobre fundo branco, nas cores originais
- [x] Hero sem degradê, título em 2 linhas de 1024 a 1920 px, CTA visível sem rolar
- [x] 2 sobretítulos em 8 seções; um marquee
- [x] Imagens reais (quadros do vídeo enviado); texturas de luz geradas por código
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

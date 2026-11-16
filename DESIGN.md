# Conexões para Inovação · design system do protótipo

Releitura do portal [Petrobras Conexões para Inovação](https://conexoes-inovacao.petrobras.com.br/s/?language=pt_BR), feita como protótipo navegável em HTML, CSS e JavaScript sem dependências.

> Protótipo conceitual. Não é o site oficial da Petrobras. Os desafios, prazos e cadastros são simulados.

## 1. Leitura do briefing

**Lendo como:** redesign completo (overhaul) do portal de inovação aberta de uma empresa de energia, para startups, ICTs e empresas fornecedoras. A linguagem é de confiança institucional com um primeiro impacto cinematográfico (o vídeo da plataforma). Base técnica: CSS próprio com tokens, sem framework.

| Dial | Valor | Por quê |
| --- | --- | --- |
| `DESIGN_VARIANCE` | 6 | Empresa de capital aberto e público técnico pedem confiança (3 a 4). O overhaul soma +2. |
| `MOTION_INTENSITY` | 5 | Movimento só onde comunica: entrada do hero, revelação no scroll, filtros e jornada. |
| `VISUAL_DENSITY` | 4 | Página de marketing que também é ferramenta (lista de desafios). |

### Limitação da auditoria

O site original não pôde ser aberto neste ambiente: o servidor envia uma cadeia de certificado TLS incompleta e o proxy recusa a conexão. A arquitetura de informação foi reconstruída com dados públicos:

- **Módulos:** Startups (com o Sebrae), Parcerias Tecnológicas, Encomendas Tecnológicas, Aquisição de Soluções e Transferência de Tecnologias.
- **Temas buscados:** tecnologias digitais, robótica, inspeção, armazenamento e geração de energia, redução de carbono, modelagem geológica e corrosão.
- **Números do Módulo Startups:** cerca de R$ 54 milhões, 53 startups em 10 estados ([Secom, set/2024](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2024/09/startups-edital-de-r-16-milhoes-da-petrobras-esta-aberto-para-envio-de-propostas)).
- **Contato:** canal.startups@petrobras.com.br.

**Antes de implementar,** vale conferir rótulos, slugs e textos com o portal real. Na implementação em Salesforce Experience Cloud, mantenha os slugs atuais (`/s/startups`, `/s/encomendas-tecnologicas`, `/s/aquisicao-de-solucoes`, etc.) para não perder SEO nem links já divulgados.

## 2. Skills de design aplicadas

| Skill | O que entrou no protótipo |
| --- | --- |
| `redesign-existing-projects` | Ordem de prioridade (tipografia, cor, estados, layout, componentes), estados de carregamento, vazio e erro, link para pular ao conteúdo, 404 próprio, links legais visivelmente desativados em vez de `#`. |
| `design-taste-frontend` | Leitura do briefing e dials, um único acento, trava de raio, regras do hero (até 4 elementos de texto, título em 2 linhas), no máximo 1 sobretítulo a cada 3 seções, um único marquee, nenhum travessão, rótulos de CTA únicos por intenção, pre-flight completo. |
| `high-end-visual-design` | Moldura dupla (shell + core) em cards e painéis, navegação em ilha flutuante com menu de tela cheia e hambúrguer que vira X, botão com ícone aninhado, curvas `cubic-bezier` próprias, grão fixo sem custo de scroll. |
| `emil-design-eng` | Decisão de movimento por frequência de uso, `scale(0.97)` no clique, filtro segmentado com recorte em `clip-path`, hover só em dispositivos com ponteiro, durações abaixo de 300 ms em UI e `prefers-reduced-motion` com fade no lugar de deslocamento. |

As skills de estilos que se excluem (brutalista, minimalista editorial, etc.) não foram usadas, porque a página tem uma só linguagem. As de geração de imagem não foram usadas porque o material visual veio do vídeo enviado.

## 3. Tokens

### Cor

Uma família de neutros levemente esverdeada e **um único acento**: o verde Petrobras. Amarelo e vermelho aparecem só como estado semântico (prazo curto e erro).

| Token | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `--bg` | `#f2f5f3` | `#08110e` | Fundo da página |
| `--surface` | `#fbfcfb` | `#0f1c18` | Núcleo de cards e painéis |
| `--surface-sunken` | `#edf1ef` | `#0b1612` | Campos, tags |
| `--ink` | `#0e1c17` | `#e7efeb` | Texto principal |
| `--ink-2` | `#33433d` | `#bac8c2` | Texto de apoio |
| `--muted` | `#5a6a64` | `#8c9c96` | Metadados, rótulos |
| `--accent` | `#008542` | `#22a866` | CTA primário, estado ativo |
| `--accent-ink` | `#006b35` | `#5cd39a` | Links e ícones de destaque |
| `--deep` | `#07291c` | `#0b2a1d` | Superfície profunda (1 tile do bento) |
| `--warn-*` / `--danger-*` | | | Somente estados |

Contraste medido (WCAG): texto principal 16:1, texto de apoio 9,5:1, metadados 5,2:1 (claro) e 6,7:1 (escuro), links 6,1:1 e 10,3:1, texto do botão primário 4,7:1 e 6,2:1. Todos passam no AA.

O tema segue `prefers-color-scheme` e pode ser fixado no seletor "Tema" do rodapé (`data-theme` no `<html>`, lembrado em `localStorage`).

### Tipografia

Geist (texto e títulos) e Geist Mono (contadores), auto-hospedadas, licença OFL.

| Classe | Tamanho | Uso |
| --- | --- | --- |
| `.display` | 48 a 84 px, `-0.042em` | Título do hero e 404 |
| `.title-xl` | 32 a 52 px, `-0.034em` | Título de seção e de página |
| `.title-lg` | 24 a 32 px | Subtítulos, respostas |
| `.title-md` | 20 px | Títulos de estado |
| `.lead` | 17 a 20 px, `max-width: 60ch` | Texto de abertura |
| `.eyebrow` | 12 px, caixa alta, `0.14em` | No máximo 2 na home |

Números de prazo usam algarismos tabulares. Títulos usam `text-wrap: balance` e parágrafos usam `pretty`.

### Raio (regra única)

- **Interativos** (botões, campos, chips, tags, filtros): pílula (`999px`).
- **Moldura dupla**: shell `28px`, padding `6px`, core `22px` (concêntricos).
- **Cartões internos** (critérios, documentos, perguntas): `16` a `18px`.
- **Ícones em bloco**: `14` a `16px`.

### Movimento

| Token | Valor | Uso |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entradas e respostas de UI |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Sublinhado dos números |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Menu e barra fixa do mobile |
| `--dur-press` | `140ms` | Clique |
| `--dur-ui` | `220ms` | Estados de UI |
| `--dur-reveal` | `900ms` | Revelação no scroll (marketing) |

Camadas (`z-index`) são tokens: `--z-raised`, `--z-sticky`, `--z-menu`, `--z-nav`, `--z-toast`, `--z-grain`, `--z-skip`.

## 4. Movimento: o que anima e por quê

| Elemento | Animação | Propósito |
| --- | --- | --- |
| Hero | Fade + subida + desfoque, escalonado em 100 ms | Hierarquia de leitura na primeira dobra |
| Vídeo | Loop vai-e-volta de 11 s a 0,8x, pausa fora da tela, botão de pausa | Atmosfera, sem distrair (WCAG 2.2.2) |
| Seções | Revelação no scroll com `IntersectionObserver` | Ritmo de leitura |
| Números | Sublinhado que se desenha em sequência | Chamar atenção para os dados reais |
| Filtro segmentado | Recorte `clip-path` desliza até o ativo | Continuidade de estado |
| Cards | Entrada escalonada de 45 ms após filtrar | Mostrar que a lista mudou |
| Jornada | Linha preenche e etapas acendem em ordem | Narrar a sequência do processo |
| Temas | Marquee contínuo, pausa no hover e no foco | Amplitude de temas sem lista longa |
| Botões | `scale(0.97)` no clique, ícone aninhado se move no hover | Resposta tátil |

Com `prefers-reduced-motion`, o vídeo não inicia, o marquee vira lista estática e as entradas viram fade curto.

## 5. Componentes

- **Navegação em ilha**: vidro escuro sobre o vídeo, sólida após o hero; em telas até 960 px, menu de tela cheia com links escalonados, `inert` no conteúdo de fundo e Esc para fechar.
- **Busca sobreposta ao hero**: termo e módulo, com atalhos para buscas frequentes.
- **Bento de módulos**: 5 células para 5 módulos, com fundos variados (foto, verde profundo, textura do mar).
- **Card de desafio**: módulo, status (aberto, últimos dias, encerrado), título, resumo, área, tema, prazo e contagem regressiva.
- **Filtro segmentado** com contagem por módulo.
- **Estados**: skeleton com brilho deslizante, vazio com próxima ação, erro com "Tentar novamente".
- **Dúvidas**: abas verticais com setas do teclado no desktop, `<details>` no mobile e sem JavaScript.
- **Formulários**: rótulo acima, ajuda e erro abaixo, validação no blur e no envio, foco no primeiro erro. O CNPJ aceita o formato numérico e o alfanumérico (em vigor desde julho de 2026), com dígitos verificadores.
- **Painel do desafio**: prazo, CTA, salvar no navegador, copiar link e fatos; no mobile, barra fixa quando o painel sai da tela.
- **Toast** para confirmações curtas.

## 6. Acessibilidade

- Link "Pular para o conteúdo", landmarks semânticos, `aria-current` na navegação.
- Foco visível em todos os interativos (branco sobre mídia, verde no restante).
- Vídeo decorativo com botão de pausa; nada essencial depende dele.
- `aria-live` para contagens e resultados; `role="alert"` no erro de carregamento.
- Hover só com `(hover: hover) and (pointer: fine)`.
- Contraste AA verificado nos dois temas (seção 3).

## 7. Pre-flight

- [x] Leitura do briefing e dials declarados
- [x] Zero travessões no conteúdo
- [x] Um tema por página, um acento, uma regra de raio
- [x] Hero com 4 elementos, título em 2 linhas, CTA visível sem rolar (390 a 1920 px)
- [x] 2 sobretítulos em 8 seções
- [x] Um rótulo por intenção ("Ver desafios abertos", "Receber avisos", "Entrar")
- [x] Um marquee, nenhum pontinho decorativo, nenhuma dica de rolagem
- [x] Imagens reais (quadros do vídeo enviado), nenhuma tela falsa feita com divs
- [x] Estados de carregamento, vazio, erro e sucesso
- [x] Sem `scroll` listeners; só `IntersectionObserver`
- [x] Sem rolagem horizontal em 390, 768, 820, 1024, 1180, 1280, 1440, 1536 e 1920 px
- [x] Nenhum erro de console nas 5 páginas, nos temas claro e escuro, no desktop e no mobile

## 8. Próximos passos sugeridos

1. Validar textos, slugs e módulos com o portal atual e com a equipe do programa.
2. Trocar a assinatura em texto pela assinatura oficial da marca (marcado no HTML).
3. Levar os tokens e componentes para uma biblioteca no Figma.
4. Implementar como componentes LWC no Experience Cloud, com os dados vindos da API.
5. Versão em inglês (o portal atual tem `language=en_US`).

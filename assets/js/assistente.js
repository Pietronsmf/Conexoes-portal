/* =====================================================================
   Assistente de dúvidas — páginas Desafios e de cada desafio (protótipo)
   Responde no próprio navegador, a partir das dúvidas frequentes, dos
   módulos, dos dados do desafio aberto e dos projetos de chamadas
   anteriores. Não usa inteligência artificial e não envia o que a pessoa
   escreve a nenhum servidor. Na versão final, responder() pode chamar o
   serviço de atendimento do portal sem mudar a interface.
   ===================================================================== */
(function () {
  "use strict";

  var CI = window.CI || {};
  var doc = document;
  var root = doc.documentElement;
  var EMAIL = "canal.startups@petrobras.com.br";

  /* ---------- Entendimento da pergunta ---------- */

  /* Padrões: palavras separadas por espaço; "*" no fim aceita continuação (inscri* → inscrição, inscrever) */
  function compile(p, norm) {
    var parts = p.split(/\s+/).map(function (w) {
      var star = /\*$/.test(w);
      return norm(w.replace(/\*$/, "")).replace(/[^a-z0-9]/g, "") + (star ? "[a-z0-9]*" : "");
    });
    return { re: new RegExp(" " + parts.join(" ") + " "), w: parts.length };
  }

  /* Ordem importa no empate: as intenções mais específicas vêm primeiro */
  var INTENTS = [
    ["produto", ["produto pronto", "solucao pronta", "tecnologia pronta", "ja tenho", "vender", "oferecer", "oferta*", "fornecedor*", "comprar"]],
    ["pi", ["propriedade intelectual", "patente*", "pi", "royalt*", "quem fica com", "direito*", "dono", "titularidade"]],
    ["cnpj", ["cnpj", "cpf", "pessoa fisica", "pessoa juridica", "mei", "sem empresa", "abrir empresa", "empresa aberta"]],
    ["documentos", ["edital", "editais", "document*", "anexo*", "modelo de proposta", "pdf", "docx", "regulamento", "arquivo*", "baixar"]],
    ["criterios", ["criterio*", "avalia*", "nota", "notas", "pontua*", "selecao", "selecion*", "julga*", "como escolhem"]],
    ["resultado", ["resultado", "quando sai", "cronograma", "etapa*", "inicio do projeto", "inicio dos projetos", "comeca*", "proximos passos", "depois de enviar", "e depois", "quanto tempo", "demora*"]],
    ["retorno", ["retorno*", "projetos anteriores", "projeto anterior", "chamadas anteriores", "projetos parecidos", "case*", "casos", "caso de sucesso", "exemplo*", "vale a pena", "o que ganh*", "ganho*", "beneficio*", "quem ja participou", "ja participaram", "deu certo", "resultados", "historico", "sairam do papel"]],
    ["recursos", ["recurso*", "dinheiro", "financ*", "valor", "valores", "quanto paga*", "quanto recebe*", "verba*", "investimento*", "orcamento*", "bolsa*", "aporte*", "pagamento*", "remunera*", "custo*", "fomento"]],
    ["prazo", ["prazo*", "ate quando", "data limite", "quando termina*", "quando encerra*", "quando fecha*", "quando acaba*", "ultimo dia", "quantos dias", "encerr*", "venc*", "dias restantes", "fim das inscricoes"]],
    ["participar", ["quem pode", "posso participar", "pode participar", "podem participar", "eleg*", "requisito*", "publico*", "perfil", "sou uma", "sou um", "somos uma", "somos um"]],
    ["enviar", ["como envi*", "enviar a proposta", "enviar proposta", "envio a proposta", "inscrev*", "inscricao", "submet*", "submissao", "candidat*", "como participar", "como faco", "passo a passo", "cadastr*", "como funciona", "proposta"]],
    ["modulos", ["modulo*", "diferenca*", "qual escolher", "para mim", "tipos de chamada"]],
    ["contato", ["contato", "falar com", "atendente", "humano", "pessoa real", "email", "e mail", "telefone", "suporte", "whatsapp"]],
    ["salvar", ["salvar", "salvo*", "favorit*", "lembr*", "avis*", "notifica*", "novos desafios", "receb*"]],
    ["buscar", ["tem desafio*", "algum desafio", "quais desafios", "desafios abertos", "desafios sobre", "desafio sobre", "desafio de", "desafios de", "procuro", "busco", "procurando", "buscando", "existe algum", "encerram primeiro", "mais urgente*"]],
    ["sobre", ["voce e", "quem e voce", "robo", "inteligencia artificial", "ia", "chatgpt", "bot"]],
    ["obrigado", ["obrigad*", "valeu", "agradec*", "brigad*"]],
    ["saudacao", ["oi", "ola", "bom dia", "boa tarde", "boa noite", "e ai", "hello"]],
  ];

  /* Menções a um público ou módulo, usadas para ajustar a resposta */
  var MODS = {
    startups: ["startup*", "pequena* empresa*", "sebrae"],
    parcerias: ["universidade*", "ict", "icts", "pesquisador*", "laboratorio*", "parceria*", "academi*", "grupo de pesquisa"],
    encomendas: ["encomenda*"],
    aquisicao: ["aquisic*", "solucao pronta", "produto pronto", "tecnologia pronta"],
    transferencia: ["transferencia*", "licenciar", "licenciamento", "licenca*"],
  };

  var STOP = (
    "a o e de da do das dos em no na nos nas um uma uns umas para pra por com sem que qual quais quem como onde quando tem ter ha " +
    "existe existem algum alguma alguns algumas sobre desafio desafios chamada chamadas aberto abertos aberta abertas procuro busco " +
    "procurando buscando quero queria gostaria saber voce voces me meu minha isso esse essa este esta tambem mais muito ja ou se nao " +
    "sim eu nos ele ela eles elas seu sua seus suas lista ver mostrar mostre encerram primeiro primeiros urgente urgentes area tema temas"
  ).split(" ");

  function boot() {
    var U = CI.util;
    if (!U || !doc.querySelector("[data-listing], [data-detail]") || doc.querySelector("[data-assist]")) return;
    var esc = U.esc;
    var c = CI.current || null;
    var onListing = !!doc.querySelector("[data-listing]");

    var intents = INTENTS.map(function (it) {
      return {
        id: it[0],
        pats: it[1].map(function (p) {
          return compile(p, U.norm);
        }),
      };
    });
    var mods = Object.keys(MODS).map(function (k) {
      return {
        id: k,
        pats: MODS[k].map(function (p) {
          return compile(p, U.norm);
        }),
      };
    });

    function clean(s) {
      return " " + U.norm(s).replace(/[^a-z0-9]+/g, " ").trim() + " ";
    }
    function hits(text, pats) {
      return pats.reduce(function (sum, p) {
        return sum + (p.re.test(text) ? p.w : 0);
      }, 0);
    }
    function intentOf(text) {
      var best = null;
      var top = 0;
      intents.forEach(function (it) {
        var s = hits(text, it.pats);
        if (s > top) {
          top = s;
          best = it.id;
        }
      });
      return best;
    }
    function moduleOf(text) {
      var best = null;
      var top = 0;
      mods.forEach(function (m) {
        var s = hits(text, m.pats);
        if (s > top) {
          top = s;
          best = m.id;
        }
      });
      return best;
    }
    function topicWords(text) {
      var modWords = mods.reduce(function (all, m) {
        return all.concat(m.pats);
      }, []);
      return text
        .trim()
        .split(" ")
        .filter(function (w) {
          if (w.length < 3 || STOP.indexOf(w) !== -1) return false;
          return !modWords.some(function (p) {
            return p.re.test(" " + w + " ");
          });
        });
    }
    function search(words, mod) {
      return CI.desafios
        .filter(function (x) {
          return !mod || x.modulo === mod;
        })
        .map(function (x) {
          var hay = U.norm([x.titulo, x.resumo, x.area, x.tema, CI.modulos[x.modulo].nome].join(" "));
          var score = words.reduce(function (s, w) {
            var stem = w.length > 4 ? w.replace(/s$/, "") : w;
            return s + (hay.indexOf(stem) !== -1 ? 1 : 0);
          }, 0);
          return { x: x, s: score };
        })
        .filter(function (r) {
          return r.s > 0;
        })
        .sort(function (a, b) {
          return b.s - a.s || U.byDeadline(a.x, b.x);
        })
        .map(function (r) {
          return r.x;
        });
    }

    /* ---------- Peças das respostas ---------- */
    function link(href, label) {
      return '<a class="text-link" href="' + href + '">' + label + "</a>";
    }
    function jump(id, label) {
      return '<a class="text-link" href="#' + id + '" data-assist-jump>' + label + "</a>";
    }
    function mail() {
      return '<a class="text-link" href="mailto:' + EMAIL + '">' + EMAIL + "</a>";
    }
    function cta(href, label) {
      return '<p class="assist__actions"><a class="btn btn--primary btn--sm" href="' + href + '">' + label + "</a></p>";
    }
    function lc(s) {
      return esc(s.charAt(0).toLowerCase() + s.slice(1));
    }
    function chalLine(x) {
      var s = U.status(x);
      var when = s.key === "encerrado" ? "encerrado" : "até " + U.fmtShort(U.addDays(x.prazoDias)) + ", " + s.left.toLowerCase();
      return (
        '<li><a class="text-link" href="desafio.html?id=' + encodeURIComponent(x.id) + '">' + esc(x.titulo) + "</a>" +
        '<span class="assist__muted">' + esc(CI.modulos[x.modulo].nome) + " · " + when + "</span></li>"
      );
    }
    function caseLine(p) {
      return (
        '<li><button class="assist__case" type="button" data-case="' + esc(p.id) + '" aria-haspopup="dialog">' +
        '<span class="assist__case-num">' + esc(p.impacto.empresa[0][0]) + "</span>" +
        '<span class="assist__case-text"><strong>' + esc(p.impacto.empresa[0][1]) + "</strong>" + esc(p.titulo) + " · " + esc(p.empresa) +
        '<span class="assist__case-petro">Para a Petrobras: ' + esc(p.impacto.petrobras[0][0]) + " " + esc(p.impacto.petrobras[0][1]) + "</span></span>" +
        '<i class="ph-light ph-arrow-right" aria-hidden="true"></i></button></li>'
      );
    }
    function modsList() {
      return (
        '<ul class="assist__list">' +
        CI.ordemModulos
          .map(function (k) {
            var M = CI.modulos[k];
            return "<li>" + link("desafios.html?modulo=" + k, "<strong>" + esc(M.nome) + "</strong>") + ": " + lc(M.publico) + ".</li>";
          })
          .join("") +
        "</ul>"
      );
    }
    function openList(mod) {
      return CI.desafios
        .filter(function (x) {
          return x.prazoDias >= 0 && (!mod || x.modulo === mod);
        })
        .sort(U.byDeadline);
    }
    var retornoChip = c ? "Que retorno tiveram projetos parecidos?" : "Que retorno tiveram projetos anteriores?";
    function defaultChips() {
      if (c && c.prazoDias >= 0) return ["Até quando posso enviar?", "Quem pode participar?", "Como envio a proposta?", retornoChip];
      if (c) return ["Quais desafios encerram primeiro?", "Quem pode participar?", "Como recebo avisos de novos desafios?", retornoChip];
      return ["Quais desafios encerram primeiro?", "Qual módulo é para mim?", "Preciso ter CNPJ?", retornoChip];
    }

    function deadlines(mod) {
      var l = openList(mod).slice(0, 3);
      var nome = mod ? " de " + esc(CI.modulos[mod].nome) : "";
      if (!l.length) {
        return {
          html: "<p>Não há desafios abertos" + nome + " agora. Cadastre-se nos avisos da página inicial para saber quando abrir um novo.</p><p>" + link("index.html#avisos", "Receber avisos por e-mail") + "</p>",
          chips: defaultChips(),
        };
      }
      return {
        html:
          "<p>Estes desafios" + nome + " encerram primeiro:</p>" +
          '<ul class="assist__list">' + l.map(chalLine).join("") + "</ul>" +
          "<p>" + link("desafios.html" + (mod ? "?modulo=" + mod : ""), "Ver todos os desafios abertos") + "</p>",
        chips: ["Como envio a proposta?", "Qual módulo é para mim?", retornoChip],
      };
    }

    /* ---------- Respostas ---------- */
    var A = {
      saudacao: function () {
        return { html: "<p>Olá! Em que posso ajudar?</p>", chips: defaultChips() };
      },
      obrigado: function () {
        return { html: "<p>Por nada! Se surgir outra dúvida, é só escrever.</p>", chips: defaultChips() };
      },
      sobre: function () {
        return {
          html:
            "<p>Sou um assistente automático deste protótipo. Respondo com base nas dúvidas frequentes, nos módulos e nos dados de cada desafio, sem inteligência artificial e sem enviar o que você escreve a nenhum servidor.</p>" +
            "<p>Para casos específicos, escreva para " + mail() + ".</p>",
          chips: defaultChips(),
        };
      },
      prazo: function (t, mod) {
        if (!c) return deadlines(mod);
        var s = U.status(c);
        var d = U.addDays(c.prazoDias);
        if (s.key === "encerrado") {
          return {
            html:
              "<p>As inscrições deste desafio encerraram em <strong>" + U.fmtLong(d) + "</strong>.</p>" +
              "<p>" + link("desafios.html?modulo=" + c.modulo, "Ver desafios abertos de " + esc(CI.modulos[c.modulo].nome)) + "</p>",
            chips: ["Quais desafios encerram primeiro?", "Como recebo avisos de novos desafios?"],
          };
        }
        return {
          html:
            "<p>Você pode enviar a proposta até <strong>" + U.fmtLong(d) + "</strong>. " + s.left + ".</p>" +
            "<p>Depois dessa data, o envio fica fechado no portal.</p>" +
            cta(U.proposalHref(c), "Enviar proposta"),
          chips: ["Como envio a proposta?", "Quais documentos preciso?", "Quando sai o resultado?"],
        };
      },
      participar: function (t, mod) {
        if (c && mod && mod !== c.modulo) {
          var Mc = CI.modulos[c.modulo];
          var Mm = CI.modulos[mod];
          return {
            html:
              "<p>Este desafio é do módulo <strong>" + esc(Mc.nome) + "</strong>, voltado a " + lc(Mc.publico) + ".</p>" +
              "<p>Para " + lc(Mm.publico) + ", o módulo indicado é <strong>" + esc(Mm.nome) + "</strong>.</p>" +
              "<p>" + link("desafios.html?modulo=" + mod, "Ver desafios de " + esc(Mm.nome)) + "</p>",
            chips: ["Preciso ter CNPJ?", "Qual a diferença entre os módulos?", retornoChip],
          };
        }
        if (mod || c) {
          var M = CI.modulos[mod || c.modulo];
          var here = c && (!mod || mod === c.modulo);
          return {
            html:
              (here
                ? "<p>Este desafio é do módulo <strong>" + esc(M.nome) + "</strong>, voltado a " + lc(M.publico) + ".</p>"
                : "<p>Sim, há um módulo para isso: <strong>" + esc(M.nome) + "</strong>, voltado a " + lc(M.publico) + ". " + esc(M.descricao) + "</p>") +
              "<p>Na maioria das chamadas, a proposta é enviada por uma pessoa jurídica, e pesquisadores participam pela sua instituição. Os requisitos completos estão no edital.</p>" +
              (here
                ? "<p>Na seção Quem pode participar, a checagem rápida diz em um minuto se a chamada combina com você. " + jump("participar", "Fazer a checagem") + "</p>"
                : "<p>" + link("desafios.html?modulo=" + mod, "Ver desafios de " + esc(M.nome)) + "</p>"),
            chips: ["Preciso ter CNPJ?", "Quais documentos preciso?", "Qual a diferença entre os módulos?"],
          };
        }
        return {
          html:
            "<p>Depende do módulo. Há chamadas para startups e pequenas empresas, para universidades e ICTs e para empresas com tecnologia ou solução pronta. O público de cada chamada está no edital.</p>" +
            modsList(),
          chips: ["Preciso ter CNPJ?", "Quais desafios encerram primeiro?"],
        };
      },
      cnpj: function () {
        return {
          html: "<p>Na maioria das chamadas, sim: a proposta é enviada por uma pessoa jurídica. Pesquisadores participam por meio da sua instituição. Os requisitos exatos estão em cada edital.</p>" + cta("entrar.html?aba=cadastro", "Criar cadastro"),
          chips: ["Como envio a proposta?", "Quem pode participar?"],
        };
      },
      enviar: function () {
        var steps = [
          "Crie o cadastro da sua empresa ou instituição. Ele vale para todos os módulos.",
          "Escolha o desafio e leia o edital, os requisitos técnicos e os critérios.",
          "Envie a proposta com a solução, a equipe e o plano de trabalho, dentro do prazo.",
          "Especialistas da Petrobras avaliam as propostas. O resultado sai no portal.",
          "As propostas selecionadas seguem para contrato, com acompanhamento técnico.",
        ];
        var open = c && c.prazoDias >= 0;
        return {
          html:
            "<p>O caminho é parecido em todos os módulos:</p>" +
            '<ol class="assist__steps">' + steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" +
            (open ? cta(U.proposalHref(c), "Enviar proposta para este desafio") : cta("entrar.html?aba=cadastro", "Criar cadastro")),
          chips: ["Quais documentos preciso?", "Como as propostas são avaliadas?", "Quando sai o resultado?"],
        };
      },
      documentos: function () {
        if (c) {
          return {
            html:
              "<p>Este desafio tem três documentos: o <strong>edital completo</strong> (PDF), o <strong>anexo técnico</strong> (PDF) e o <strong>modelo de proposta</strong> (DOCX).</p>" +
              "<p>Neste protótipo, os arquivos ficam disponíveis só na versão final.</p><p>" + jump("documentos", "Ir para Documentos") + "</p>",
            chips: ["Como as propostas são avaliadas?", "Como envio a proposta?"],
          };
        }
        return {
          html: "<p>Cada desafio tem o edital completo, um anexo técnico e o modelo de proposta. Você encontra os arquivos na página do desafio, na seção Documentos.</p>",
          chips: ["Quais desafios encerram primeiro?", "Como envio a proposta?"],
        };
      },
      criterios: function () {
        return {
          html:
            "<p>Cada proposta recebe uma nota de 0 a 10 em quatro critérios, com pesos diferentes:</p>" +
            '<ul class="assist__list">' +
            CI.criterios.map(function (cr) { return "<li><strong>" + esc(cr.titulo) + " (" + cr.peso + "%).</strong> " + esc(cr.texto) + "</li>"; }).join("") +
            "</ul>" +
            "<p>Para seguir, a média precisa ser " + CI.notas.minima + " de 10. Toda proposta recebe a nota por critério, selecionada ou não. Pesos e notas são ilustrativos neste protótipo.</p>" +
            (c ? "<p>" + jump("avaliacao", "Ver na página") + "</p>" : ""),
          chips: ["Quando sai o resultado?", retornoChip],
        };
      },
      resultado: function () {
        if (c && c.prazoDias >= 0) {
          return {
            html:
              "<p>Pelo cronograma deste desafio, o resultado preliminar está previsto para <strong>" + U.fmtLong(U.addDays(c.prazoDias + 30)) +
              "</strong>, e o início dos projetos, para <strong>" + U.fmtLong(U.addDays(c.prazoDias + 75)) + "</strong>. As datas oficiais estão no edital.</p>" +
              "<p>Na seção Depois do envio, você vê cada etapa até o contrato e o que acontece se a proposta não for selecionada.</p>" +
              "<p>" + jump("depois", "Ver o que acontece depois") + "</p>",
            chips: [retornoChip, "Como as propostas são avaliadas?"],
          };
        }
        return {
          html:
            "<p>Em geral, o resultado preliminar sai cerca de um mês depois do fim das inscrições, e os projetos começam de dois a três meses depois. Cada edital traz o cronograma completo.</p>" +
            "<p>Nos casos de chamadas anteriores mostrados no portal (ilustrativos), o caminho do aceite ao resultado levou de 8 a 36 meses, conforme o módulo.</p>",
          chips: [retornoChip, "Como envio a proposta?"],
        };
      },
      recursos: function (t, mod) {
        var k = mod || (c && c.modulo);
        var extra = {
          startups: "No Módulo Startups, feito com o Sebrae, os editais trazem recursos para desenvolver a solução, mentoria técnica da Petrobras e consultoria de negócios. Desde 2019, o módulo já investiu cerca de <strong>R$ 54 milhões em 53 startups</strong> de 10 estados (Secom, setembro de 2024).",
          parcerias: "Em Parcerias Tecnológicas, o projeto de pesquisa é feito em cooperação com o CENPES, com os recursos definidos no edital.",
          encomendas: "Em Encomendas Tecnológicas, a Petrobras contrata o desenvolvimento de uma solução que ainda não existe no mercado.",
          aquisicao: "Em Aquisição de Soluções, a Petrobras contrata uma solução que já existe.",
          transferencia: "Em Transferência de Tecnologias, é a empresa que licencia a tecnologia da Petrobras. As condições estão no edital.",
        };
        return {
          html:
            "<p>Boa parte dos projetos é financiada com recursos da cláusula de PD&amp;I dos contratos de exploração e produção, regulada pela ANP. Valores e formas de repasse variam por edital.</p>" +
            (k ? "<p>" + extra[k] + "</p>" : "") +
            (c && c.valor && k === c.modulo
              ? "<p>Neste desafio, " + lc(CI.modulos[k].rotuloValor || "Valor") + ": " + lc(c.valor) + ". Duração: " + lc(c.duracao) + ". Valores ilustrativos do protótipo. " + jump("recebe", "Ver o que você recebe") + "</p>"
              : ""),
          chips: [retornoChip, "Quem fica com a propriedade intelectual?"],
        };
      },
      pi: function (t, mod) {
        var k = mod || (c && c.modulo);
        var P = k && CI.modulos[k].pi;
        if (P) {
          return {
            html:
              "<p>Em " + esc(CI.modulos[k].nome) + ", em linguagem simples:</p>" +
              '<ul class="assist__list">' +
              P.map(function (r) { return "<li><strong>" + esc(r[1]) + ".</strong> " + esc(r[2]) + "</li>"; }).join("") +
              "</ul><p>Em caso de dúvida, vale o que está no edital e no contrato.</p>" +
              (c && k === c.modulo ? "<p>" + jump("pi", "Ver na página") + "</p>" : ""),
            chips: ["Quais documentos preciso?", retornoChip],
          };
        }
        return {
          html: "<p>As regras de propriedade intelectual variam por módulo e estão descritas em cada edital. Na página de cada desafio, há um resumo em linguagem simples.</p>",
          chips: ["Quais documentos preciso?", retornoChip],
        };
      },
      modulos: function (t, mod) {
        if (mod) {
          var M = CI.modulos[mod];
          return {
            html:
              "<p><strong>" + esc(M.nome) + "</strong> é para " + lc(M.publico) + ". " + esc(M.descricao) + "</p>" +
              "<p>Formato: " + lc(M.formato) + ".</p><p>" + link("desafios.html?modulo=" + mod, "Ver desafios de " + esc(M.nome)) + "</p>",
            chips: ["Preciso ter CNPJ?", "Quais desafios encerram primeiro?", retornoChip],
          };
        }
        return {
          html: "<p>São cinco módulos. Comece pelo que descreve melhor o estágio da sua tecnologia:</p>" + modsList(),
          chips: ["Preciso ter CNPJ?", "Quais desafios encerram primeiro?"],
        };
      },
      produto: function () {
        return {
          html:
            "<p>Ofertas espontâneas de produtos, sem relação com uma chamada e sem desenvolvimento tecnológico, não entram no programa. Se a sua solução já existe, acompanhe as chamadas de Aquisição de Soluções.</p>" +
            "<p>" + link("desafios.html?modulo=aquisicao", "Ver chamadas de Aquisição de Soluções") + "</p><p>Para outros casos, escreva para " + mail() + ".</p>",
          chips: ["Qual módulo é para mim?", retornoChip],
        };
      },
      retorno: function (t, mod) {
        var list = c && !mod ? U.relatedCases(c, 2) : U.sortedCases(mod || "").slice(0, 2);
        return {
          html:
            "<p>Em chamadas anteriores, os projetos terminaram em contrato com a Petrobras, piloto em operação, patente ou tecnologia licenciada, com ganhos dos dois lados: para quem executou e para a Petrobras. " +
            (c && !mod ? "Dois casos parecidos com este desafio" : "Dois exemplos") + " (ilustrativos):</p>" +
            '<ul class="assist__cases">' + list.map(caseLine).join("") + "</ul>" +
            "<p>" + (onListing ? jump("projetos", "Ver todos os projetos") : link("desafios.html#projetos", "Ver todos os projetos")) + "</p>",
          chips: ["De onde vêm os recursos?", "Como envio a proposta?"],
        };
      },
      contato: function () {
        return {
          html: "<p>Para casos específicos, escreva para " + mail() + ". A equipe do programa responde por esse canal.</p>",
          chips: defaultChips(),
        };
      },
      salvar: function () {
        return {
          html:
            "<p>Para receber novos desafios por e-mail, cadastre-se nos avisos da página inicial e escolha os temas que interessam.</p>" +
            "<p>" + link("index.html#avisos", "Receber avisos por e-mail") + "</p>" +
            "<p>Na página de cada desafio, o botão <strong>Salvar</strong> guarda a chamada neste navegador.</p>",
          chips: defaultChips(),
        };
      },
      buscar: function (t, mod) {
        var words = topicWords(t);
        if (!words.length) return deadlines(mod);
        var found = search(words, mod);
        if (!found.length) return null;
        var q = words.join(" ");
        return {
          html:
            "<p>Encontrei " + (found.length === 1 ? "este desafio" : "estes desafios") + ":</p>" +
            '<ul class="assist__list">' + found.slice(0, 3).map(chalLine).join("") + "</ul>" +
            (found.length > 3 ? "<p>" + link("desafios.html?q=" + encodeURIComponent(q) + "&status=todos", "Ver os " + found.length + " resultados") + "</p>" : ""),
          chips: ["Como envio a proposta?", retornoChip],
        };
      },
    };

    /* Resposta para um texto: intenção mais provável; sem intenção, tenta uma busca nos desafios */
    function respond(raw) {
      var text = clean(raw);
      var mod = moduleOf(text);
      var id = intentOf(text);
      var r = id ? A[id](text, mod) : null;
      var words = topicWords(text);
      /* sem intenção reconhecida: procura o assunto nos desafios */
      if (!r && !id && words.length) r = A.buscar(text, mod);
      if (!r) {
        r = {
          html:
            (id === "buscar" && words.length
              ? "<p>Não encontrei desafios sobre “" + esc(words.join(" ")) + "”. Tente outra palavra ou veja a lista completa.</p><p>" + link("desafios.html?status=todos", "Ver todos os desafios") + "</p>"
              : "<p>Não encontrei uma resposta para isso. Tente com outras palavras ou escolha um dos temas abaixo.</p>") +
            "<p>Se preferir, escreva para " + mail() + ".</p>",
          chips: defaultChips(),
        };
      }
      return r;
    }
    CI.responder = respond;

    /* ---------- Interface ---------- */
    var wrap = doc.createElement("div");
    wrap.className = "assist";
    wrap.setAttribute("data-assist", "");
    wrap.innerHTML =
      '<section class="assist__panel" id="assist-panel" role="dialog" aria-labelledby="assist-title" aria-describedby="assist-sub" hidden>' +
      '<header class="assist__head">' +
      '<span class="assist__avatar" aria-hidden="true"><i class="ph-light ph-chat-circle-text"></i></span>' +
      '<div class="assist__heading"><h2 class="assist__title" id="assist-title" tabindex="-1">Assistente do programa</h2>' +
      '<p class="assist__sub" id="assist-sub">' + (c ? "Dúvidas sobre este desafio e o programa" : "Dúvidas sobre os desafios e o programa") + "</p></div>" +
      '<button class="assist__close" type="button" data-assist-close aria-label="Fechar o assistente"><i class="ph-light ph-x" aria-hidden="true"></i></button>' +
      "</header>" +
      '<div class="assist__log" role="log" aria-live="polite" aria-label="Conversa com o assistente" tabindex="0" data-assist-log></div>' +
      '<div class="assist__chips" role="group" aria-label="Sugestões de perguntas" data-assist-chips></div>' +
      '<form class="assist__form" data-assist-form>' +
      '<label class="visually-hidden" for="assist-input">Escreva sua dúvida</label>' +
      '<input class="assist__input" id="assist-input" type="text" autocomplete="off" maxlength="300" placeholder="Escreva sua dúvida" enterkeyhint="send">' +
      '<button class="assist__send" type="submit" aria-label="Enviar pergunta"><i class="ph-light ph-paper-plane-right" aria-hidden="true"></i></button>' +
      "</form>" +
      '<p class="assist__note">Respostas automáticas do protótipo, sem inteligência artificial.</p>' +
      "</section>" +
      '<button class="assist__launch" type="button" aria-expanded="false" aria-controls="assist-panel" data-assist-toggle>' +
      '<span class="assist__launch-icon" aria-hidden="true"><i class="ph-light ph-chat-circle-dots"></i></span>' +
      '<span class="assist__launch-label">Tire suas dúvidas</span>' +
      "</button>";
    doc.body.appendChild(wrap);
    doc.body.classList.add("has-assist");

    var panel = wrap.querySelector(".assist__panel");
    var launch = wrap.querySelector("[data-assist-toggle]");
    var log = wrap.querySelector("[data-assist-log]");
    var chips = wrap.querySelector("[data-assist-chips]");
    var form = wrap.querySelector("[data-assist-form]");
    var input = wrap.querySelector("#assist-input");
    var title = wrap.querySelector("#assist-title");
    var small = window.matchMedia("(max-width: 639px)");
    var started = false;
    var busy = false;
    var hideTimer = null;
    var inertNodes = [];

    function scrollEnd() {
      log.scrollTo({ top: log.scrollHeight, behavior: U.reduceMotion.matches ? "auto" : "smooth" });
    }
    function addMsg(who, html) {
      var row = doc.createElement("div");
      row.className = "assist__msg assist__msg--" + who;
      row.innerHTML = '<div class="assist__bubble">' + html + "</div>";
      log.appendChild(row);
      scrollEnd();
      return row;
    }
    function setChips(list) {
      chips.innerHTML = (list || [])
        .map(function (t) {
          return '<button class="chip" type="button" data-assist-chip>' + esc(t) + "</button>";
        })
        .join("");
      chips.hidden = !chips.innerHTML;
    }
    function greet() {
      var html;
      if (c && c.prazoDias < 0) html = "<p>Olá! As inscrições deste desafio já encerraram, mas posso indicar desafios abertos, explicar os módulos e mostrar o retorno de projetos de chamadas anteriores.</p>";
      else if (c) html = "<p>Olá! Posso tirar dúvidas sobre este desafio: prazo, quem pode participar, documentos e como enviar a proposta.</p><p>Também mostro o que aconteceu com projetos parecidos de chamadas anteriores.</p>";
      else html = "<p>Olá! Posso ajudar você a escolher um desafio, entender os módulos e ver o retorno de projetos de chamadas anteriores.</p>";
      addMsg("bot", html);
      setChips(defaultChips());
    }
    function ask(text) {
      text = String(text || "").trim();
      if (!text || busy) return;
      busy = true;
      addMsg("user", esc(text));
      setChips([]);
      input.value = "";
      var r = respond(text);
      var dots = doc.createElement("div");
      dots.className = "assist__msg assist__msg--bot assist__typing";
      dots.setAttribute("aria-hidden", "true");
      dots.innerHTML = '<div class="assist__bubble"><span></span><span></span><span></span></div>';
      log.appendChild(dots);
      scrollEnd();
      var plain = r.html.replace(/<[^>]+>/g, "");
      var wait = U.reduceMotion.matches ? 120 : Math.min(1100, 420 + plain.length * 2);
      setTimeout(function () {
        dots.remove();
        addMsg("bot", r.html);
        setChips(r.chips);
        busy = false;
      }, wait);
    }

    function setModal(on) {
      if (on) {
        panel.setAttribute("aria-modal", "true");
        inertNodes = [doc.querySelector("main"), doc.querySelector("[data-nav]"), doc.querySelector(".footer")]
          .filter(Boolean)
          .map(function (n) {
            var prev = n.inert;
            n.inert = true;
            return [n, prev];
          });
        root.classList.add("is-locked");
      } else if (panel.hasAttribute("aria-modal")) {
        panel.removeAttribute("aria-modal");
        inertNodes.forEach(function (p) {
          p[0].inert = p[1];
        });
        inertNodes = [];
        root.classList.remove("is-locked");
      }
    }
    function isOpen() {
      return launch.getAttribute("aria-expanded") === "true";
    }
    function open() {
      clearTimeout(hideTimer);
      panel.hidden = false;
      wrap.classList.add("is-open");
      launch.setAttribute("aria-expanded", "true");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          wrap.classList.add("is-shown");
        });
      });
      if (!started) {
        started = true;
        greet();
      }
      if (small.matches) {
        setModal(true);
        title.focus();
      } else input.focus();
    }
    function close(restore) {
      if (!isOpen()) return;
      wrap.classList.remove("is-shown");
      launch.setAttribute("aria-expanded", "false");
      setModal(false);
      hideTimer = setTimeout(
        function () {
          panel.hidden = true;
          wrap.classList.remove("is-open");
        },
        U.reduceMotion.matches ? 0 : 200
      );
      if (restore !== false) launch.focus();
    }

    /* A página do desafio abre o assistente pelo botão "Perguntar ao assistente" */
    CI.perguntar = function (text) {
      if (!isOpen()) open();
      if (text) ask(text);
    };

    launch.addEventListener("click", function () {
      if (isOpen()) close();
      else open();
    });
    wrap.querySelector("[data-assist-close]").addEventListener("click", function () {
      close();
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      ask(input.value);
    });
    chips.addEventListener("click", function (e) {
      var b = e.target.closest("[data-assist-chip]");
      if (b) ask(b.textContent);
    });
    log.addEventListener("click", function (e) {
      /* No celular o painel cobre a tela: fecha antes de ir para a seção */
      if (e.target.closest("[data-assist-jump]") && small.matches) close(false);
    });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) {
        e.preventDefault();
        close();
      }
    });
    /* Girar a tela ou redimensionar com o painel aberto ajusta o modo modal */
    small.addEventListener("change", function () {
      if (!isOpen()) return;
      setModal(false);
      if (small.matches) setModal(true);
    });
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

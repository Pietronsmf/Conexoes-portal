/* =====================================================================
   Petrobras Conexões para Inovação · protótipo
   JavaScript sem dependências. Cada página declara data-page no <body>.
   ===================================================================== */
(function () {
  "use strict";

  var CI = (window.CI = window.CI || {});
  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Utilidades ---------- */
  var $ = function (sel, ctx) {
    return (ctx || doc).querySelector(sel);
  };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel));
  };

  var store = {
    get: function (k) {
      try {
        return window.localStorage.getItem(k);
      } catch (e) {
        return null;
      }
    },
    set: function (k, v) {
      try {
        window.localStorage.setItem(k, v);
      } catch (e) {
        /* armazenamento indisponível: segue sem lembrar */
      }
    },
    remove: function (k) {
      try {
        window.localStorage.removeItem(k);
      } catch (e) {
        /* idem */
      }
    },
  };

  var ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return ESC[ch];
    });
  }

  function norm(s) {
    return String(s || "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  }

  /* ---------- Datas (prazos relativos a hoje) ---------- */
  var DAY = 86400000;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  var fmtLongIntl = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" });

  function addDays(n) {
    return new Date(today.getTime() + n * DAY);
  }
  function fmtShort(d) {
    return d.getDate() + " " + MESES[d.getMonth()] + " " + d.getFullYear();
  }
  function fmtLong(d) {
    return fmtLongIntl.format(d);
  }
  function isoDate(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + dd;
  }

  function status(c) {
    var d = c.prazoDias;
    if (d < 0) return { key: "encerrado", label: "Encerrado", left: "" };
    var left = d === 0 ? "Último dia" : d === 1 ? "Falta 1 dia" : "Faltam " + d + " dias";
    if (d <= 10) return { key: "prazo", label: "Últimos dias", left: left };
    return { key: "aberto", label: "Inscrições abertas", left: left };
  }
  CI.status = status;

  /* Fração do período de inscrição que já passou (barra de prazo) */
  function progress(c) {
    if (c.prazoDias < 0) return 1;
    var pub = c.publicadoDias || 0;
    var total = pub + c.prazoDias;
    var p = total > 0 ? pub / total : 1;
    return Math.max(0.04, Math.min(1, p)).toFixed(3);
  }

  /* Contagem regressiva: número grande + unidade */
  function countdown(c) {
    var d = c.prazoDias;
    if (d < 0) return null;
    if (d === 0) return { num: "Hoje", unit: "último<br>dia", long: "último dia para<br>enviar a proposta", short: "último dia" };
    if (d === 1) return { num: "1", unit: "dia<br>restante", long: "dia para enviar<br>a proposta", short: "dia" };
    return { num: String(d), unit: "dias<br>restantes", long: "dias para enviar<br>a proposta", short: "dias" };
  }

  function meterHTML(extra) {
    return '<span class="meter' + (extra || "") + '" aria-hidden="true"><span class="meter__bar"></span></span>';
  }

  function proposalHref(c) {
    return "entrar.html?next=" + encodeURIComponent("desafio.html?id=" + c.id) + "&acao=proposta";
  }

  /* ---------- Componentes renderizados ---------- */
  function cardHTML(c, i) {
    var m = CI.modulos[c.modulo];
    var s = status(c);
    var prazo = addDays(c.prazoDias);
    var cd = countdown(c);
    var when =
      s.key === "encerrado"
        ? '<div class="card__when"><span class="deadline__label">Encerrado em <time datetime="' + isoDate(prazo) + '">' + fmtShort(prazo) + "</time></span>" + meterHTML() + "</div>"
        : '<p class="countdown"><span class="countdown__num">' + cd.num + '</span><span class="countdown__unit">' + cd.unit + "</span></p>" +
          '<div class="card__when"><span class="deadline__label">Propostas até <time datetime="' + isoDate(prazo) + '">' + fmtShort(prazo) + "</time></span>" + meterHTML() + "</div>";
    return (
      '<article class="card card--' + s.key + ' is-new" style="--i:' + (i || 0) + ";--p:" + progress(c) + '">' +
      '<div class="shell"><div class="core">' +
      '<div class="card__top">' +
      '<span class="card__module"><span class="card__icon"><i class="ph-light ph-' + m.icone + '" aria-hidden="true"></i></span>' + esc(m.nome) + "</span>" +
      '<span class="status status--' + s.key + '">' + s.label + "</span>" +
      "</div>" +
      '<h3 class="card__title"><a href="desafio.html?id=' + encodeURIComponent(c.id) + '">' + esc(c.titulo) + "</a></h3>" +
      '<p class="card__summary">' + esc(c.resumo) + "</p>" +
      '<div class="card__tags"><span class="tag">' + esc(c.area) + '</span><span class="tag">' + esc(c.tema) + "</span></div>" +
      '<div class="card__foot">' + when +
      '<span class="card__go" aria-hidden="true"><i class="ph-light ph-arrow-right"></i></span></div>' +
      "</div></div></article>"
    );
  }

  /* Home: card de foto com degradê verde, como os cards de tecnologia do site Petrobras */
  function photoCardHTML(c, i) {
    var m = CI.modulos[c.modulo];
    var s = status(c);
    var prazo = addDays(c.prazoDias);
    return (
      '<li class="pcard pcard--' + s.key + '" style="--col:' + ((i || 0) % 3) + '" data-item>' +
      '<a class="pcard__link" href="desafio.html?id=' + encodeURIComponent(c.id) + '" aria-label="' +
      esc(c.titulo + ". " + m.nome + ", " + s.label.toLowerCase() + ". Propostas até " + fmtShort(prazo) + ", " + s.left.toLowerCase() + ".") + '">' +
      '<img class="pcard__img" src="assets/media/desafios/' + c.id + '.webp" alt="" width="1200" height="800" loading="lazy" style="object-position:' + (c.foco == null ? 50 : c.foco) + '% 50%">' +
      (s.key === "prazo" ? '<span class="pcard__flag"><span class="status status--prazo status--sm">Últimos dias</span></span>' : "") +
      '<span class="pcard__body">' +
      '<span class="pcard__module">' + esc(m.nome) + "</span>" +
      '<span class="pcard__title">' + esc(c.titulo) + "</span>" +
      '<span class="pcard__meta">' + s.left + " · até " + fmtShort(prazo) + "</span>" +
      '<span class="pcard__btn">Ver desafio <i class="ph-light ph-arrow-right"></i></span>' +
      "</span></a></li>"
    );
  }

  /* Quando um grupo tem menos de 3 desafios, o espaço vira um atalho para a lista */
  function moreCardHTML(href, label) {
    return (
      '<li class="pcard pcard--more" style="--col:2"><a class="pcard__link" href="' + href + '">' +
      '<span class="pcard__more-icon" aria-hidden="true"><i class="ph-light ph-squares-four"></i></span>' +
      '<span class="pcard__body"><span class="pcard__title">' + label + "</span>" +
      '<span class="pcard__btn">Abrir a lista <i class="ph-light ph-arrow-right" aria-hidden="true"></i></span></span></a></li>'
    );
  }

  function groupHTML(label, text, cards) {
    return (
      '<div class="sgroup"><h3 class="sgroup__label">' + label + "</h3>" +
      '<p class="sgroup__text">' + text + "</p>" +
      '<ul class="sgrid">' + cards + "</ul></div>"
    );
  }

  function showcaseSkeletonHTML() {
    var one = '<li class="pcard pcard--skeleton"><span class="skel skel--dark"></span></li>';
    return (
      '<div class="sgroup" aria-hidden="true"><span class="skel skel--dark skel--label"></span>' +
      '<span class="skel skel--dark skel--text-2"></span>' +
      '<ul class="sgrid">' + one + one + one + "</ul></div>"
    );
  }

  function skeletonHTML(n) {
    var one =
      '<div class="card card--skeleton" aria-hidden="true"><div class="shell"><div class="core">' +
      '<div class="skel skel--row"><span class="skel skel--pill"></span><span class="skel skel--pill-sm"></span></div>' +
      '<div class="skel skel--title"></div><div class="skel skel--title-2"></div>' +
      '<div class="skel skel--text"></div><div class="skel skel--text-2"></div>' +
      '<div class="skel-foot"><span class="skel skel--num"></span><span class="skel skel--text"></span></div>' +
      "</div></div></div>";
    var out = "";
    for (var i = 0; i < n; i++) out += one;
    return out;
  }

  function stateHTML(o) {
    var kind = o.kind || "vazio";
    return (
      '<div class="state state--' + kind + '" role="' + (kind === "erro" ? "alert" : "status") + '"><div class="shell"><div class="core">' +
      '<span class="state__icon"><i class="ph-light ph-' + o.icon + '" aria-hidden="true"></i></span>' +
      '<h3 class="title-md">' + o.title + "</h3>" +
      "<p>" + o.text + "</p>" +
      (o.actions ? '<div class="state__actions">' + o.actions + "</div>" : "") +
      "</div></div></div>"
    );
  }

  /* ---------- Toast ---------- */
  function toast(msg, icon) {
    var region = $("[data-toasts]");
    if (!region) return;
    var t = doc.createElement("div");
    t.className = "toast";
    t.innerHTML = '<i class="ph-light ph-' + (icon || "check-circle") + '" aria-hidden="true"></i><span>' + esc(msg) + "</span>";
    region.appendChild(t);
    setTimeout(function () {
      t.classList.add("is-leaving");
      setTimeout(function () {
        t.remove();
      }, 220);
    }, 2600);
  }
  CI.toast = toast;

  /* ---------- Botão ocupado ---------- */
  function setBusy(btn, label) {
    var l = $(".btn__label", btn) || btn;
    if (label) {
      btn.dataset.label = l.textContent;
      l.textContent = label;
      btn.classList.add("is-busy");
      btn.setAttribute("aria-busy", "true");
    } else {
      l.textContent = btn.dataset.label || l.textContent;
      btn.classList.remove("is-busy");
      btn.removeAttribute("aria-busy");
    }
  }

  /* ---------- Erros de campo ---------- */
  function setFieldError(input, msg) {
    var wrap = input.closest(".field") || input.closest(".check-wrap");
    if (!wrap) return;
    var err = $(".field__error", wrap);
    wrap.classList.toggle("is-invalid", !!msg);
    var label = input.closest(".check");
    if (label) label.classList.toggle("is-invalid", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) {
      err.hidden = !msg;
      err.innerHTML = msg ? '<i class="ph-light ph-warning-circle" aria-hidden="true"></i>' + esc(msg) : "";
    }
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function emailError(v) {
    v = v.trim();
    if (!v) return "Informe seu e-mail.";
    if (!EMAIL_RE.test(v)) return "Confira o formato do e-mail, por exemplo nome@empresa.com.br.";
    return "";
  }

  /* ---------- Navegação ---------- */
  function initNav() {
    var header = $("[data-nav]");
    if (!header) return;

    /* Home, no topo: header Petrobras sobre o vídeo ("bar"). Ao rolar, ou com o menu aberto,
       e nas páginas internas: ilha flutuante ("island"). */
    var onHero = header.classList.contains("site-header--hero");
    function syncLook() {
      var bar = onHero && header.dataset.state === "top" && header.dataset.menu !== "open";
      header.dataset.look = bar ? "bar" : "island";
    }
    var sentinel = $("[data-top-sentinel]");
    if (sentinel && "IntersectionObserver" in window) {
      var first = true;
      new IntersectionObserver(function (entries) {
        header.dataset.state = entries[0].isIntersecting ? "top" : "solid";
        syncLook();
        if (first && onHero) {
          first = false;
          /* só anima as trocas seguintes, nunca o estado inicial */
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              header.classList.add("is-ready");
            });
          });
        }
      }).observe(sentinel);
    }
    syncLook();

    var toggle = $(".nav__toggle", header);
    var menu = $("#menu");
    if (!toggle || !menu) return;
    var outside = $$("main, footer");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menu.classList.toggle("is-open", open);
      if (open) menu.removeAttribute("inert");
      else menu.setAttribute("inert", "");
      outside.forEach(function (el) {
        el.inert = open;
      });
      header.dataset.menu = open ? "open" : "closed";
      syncLook();
      root.classList.toggle("is-locked", open);
      if (open) {
        var first = $("a", menu);
        if (first) first.focus({ preventScroll: true });
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* ---------- Tamanho do texto (A- / A+), como no site da Petrobras ---------- */
  function initFontSize() {
    var steps = [87.5, 100, 112.5, 125];
    var saved = Number(store.get("ci-font"));
    var i = steps.indexOf(saved);
    if (i < 0) i = 1;
    var labels = $$("[data-font-label]");
    var buttons = $$("[data-font-step]");
    if (!buttons.length) return;
    function apply() {
      var v = steps[i];
      root.style.fontSize = v === 100 ? "" : v + "%";
      labels.forEach(function (l) {
        l.textContent = String(v).replace(".", ",") + "%";
      });
      buttons.forEach(function (b) {
        var step = Number(b.dataset.fontStep);
        b.disabled = (step < 0 && i === 0) || (step > 0 && i === steps.length - 1);
      });
      store.set("ci-font", String(v));
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        i = Math.max(0, Math.min(steps.length - 1, i + Number(b.dataset.fontStep)));
        apply();
      });
    });
    apply();
  }

  /* ---------- Ondas da seção do mar: animam só quando visíveis ---------- */
  function initSeaWaves() {
    var sea = $("[data-sea]");
    if (!sea || !("IntersectionObserver" in window)) return;
    sea.classList.add("is-paused");
    new IntersectionObserver(
      function (entries) {
        sea.classList.toggle("is-paused", !entries[0].isIntersecting);
      },
      { rootMargin: "120px 0px" }
    ).observe(sea);
  }

  /* ---------- Revelação no scroll ---------- */
  function initReveal() {
    $$("[data-stagger]").forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (child, i) {
        child.style.setProperty("--i", i);
      });
    });
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- Vídeos de fundo (hero e mar): só tocam visíveis, um botão pausa todos ---------- */
  function initBgVideos() {
    var videos = $$("video[data-src-lg]");
    if (!videos.length) return;
    var buttons = $$("[data-video-toggle]");
    var probe = videos[0];
    /* H.264 quando houver suporte; VP9/WebM como alternativa */
    var ext = probe.canPlayType('video/mp4; codecs="avc1.640028"') ? ".mp4" : probe.canPlayType('video/webm; codecs="vp9"') ? ".webm" : "";
    if (!ext) {
      buttons.forEach(function (b) {
        b.hidden = true;
      });
      return;
    }
    var small = window.matchMedia("(max-width: 767px)").matches;
    var saveData = navigator.connection && navigator.connection.saveData;
    var userPaused = reduceMotion.matches || !!saveData;
    var visible = new Map();

    function load(v) {
      if (!v.getAttribute("src")) {
        v.src = (small ? v.dataset.srcSm : v.dataset.srcLg) + ext;
        v.defaultPlaybackRate = 0.8;
        v.playbackRate = 0.8;
      }
    }
    function sync(v) {
      if (userPaused || !visible.get(v)) {
        v.pause();
        return;
      }
      load(v);
      var p = v.play();
      if (p && p.catch) {
        p.catch(function (err) {
          /* autoplay bloqueado (modo economia, política do navegador): botão passa a "reproduzir" */
          if (err && err.name === "NotAllowedError" && !userPaused) {
            userPaused = true;
            paint();
          }
        });
      }
    }
    function paint() {
      buttons.forEach(function (b) {
        b.setAttribute("aria-label", userPaused ? "Reproduzir vídeos de fundo" : "Pausar vídeos de fundo");
        $("i", b).className = "ph-light " + (userPaused ? "ph-play" : "ph-pause");
      });
    }

    videos.forEach(function (v) {
      visible.set(v, false);
      v.addEventListener("playing", function () {
        v.classList.add("is-playing");
      });
    });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            visible.set(e.target, e.isIntersecting);
            sync(e.target);
          });
        },
        { rootMargin: "200px 0px" }
      );
      videos.forEach(function (v) {
        io.observe(v);
      });
    } else {
      videos.forEach(function (v) {
        visible.set(v, true);
        sync(v);
      });
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        userPaused = !userPaused;
        paint();
        videos.forEach(sync);
      });
    });
    paint();
  }

  /* ---------- Filtro segmentado com recorte animado ---------- */
  function createSeg(el, opts) {
    var inner = $(".seg__inner", el);
    var track = $(".seg__track", el);
    var layer = $(".seg__active", el);
    function buttons() {
      return $$(".seg__btn", track);
    }
    function sync() {
      layer.innerHTML = track.innerHTML;
      $$(".seg__btn", layer).forEach(function (b) {
        b.setAttribute("tabindex", "-1");
        b.removeAttribute("aria-pressed");
        b.removeAttribute("aria-controls");
      });
    }
    function place(animate) {
      var active = $('[aria-pressed="true"]', track) || buttons()[0];
      if (!active) return;
      var l = active.offsetLeft;
      var r = Math.max(0, inner.offsetWidth - l - active.offsetWidth);
      if (!animate) layer.style.transition = "none";
      layer.style.clipPath = "inset(0 " + r + "px 0 " + l + "px round 999px)";
      if (!animate) {
        void layer.offsetWidth;
        layer.style.transition = "";
      }
      if (l < el.scrollLeft || l + active.offsetWidth > el.scrollLeft + el.clientWidth) {
        el.scrollTo({ left: Math.max(0, l - 24), behavior: reduceMotion.matches || !animate ? "auto" : "smooth" });
      }
    }
    function setValue(v, animate) {
      buttons().forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.value === v));
      });
      place(animate);
    }
    function setCounts(counts) {
      buttons().forEach(function (b) {
        var c = $(".seg__count", b);
        if (c) c.textContent = counts[b.dataset.value] || 0;
      });
      sync();
      place(false);
    }
    track.addEventListener("click", function (e) {
      var b = e.target.closest(".seg__btn");
      if (!b || b.getAttribute("aria-pressed") === "true") return;
      setValue(b.dataset.value, true);
      if (opts && opts.onChange) opts.onChange(b.dataset.value);
    });
    sync();
    place(false);
    window.addEventListener(
      "resize",
      function () {
        place(false);
      },
      { passive: true }
    );
    if (doc.fonts && doc.fonts.ready) {
      doc.fonts.ready.then(function () {
        place(false);
      });
    }
    return { setValue: setValue, setCounts: setCounts };
  }

  function countByModule(list) {
    var counts = { "": list.length };
    CI.ordemModulos.forEach(function (k) {
      counts[k] = list.filter(function (c) {
        return c.modulo === k;
      }).length;
    });
    return counts;
  }

  function byDeadline(a, b) {
    var ca = a.prazoDias < 0;
    var cb = b.prazoDias < 0;
    if (ca !== cb) return ca ? 1 : -1;
    return ca ? b.prazoDias - a.prazoDias : a.prazoDias - b.prazoDias;
  }

  /* ---------- Home: desafios abertos ---------- */
  function initHome() {
    var list = $("[data-home-list]");
    if (!list) return;
    var open = CI.desafios
      .filter(function (c) {
        return c.prazoDias >= 0;
      })
      .sort(byDeadline);
    var current = "";
    var loaded = false;
    var allLink = $("[data-home-all]");
    var summary = $("[data-home-summary]");

    var seg = createSeg($('[data-seg="home"]'), {
      onChange: function (v) {
        current = v;
        render();
      },
    });
    seg.setCounts(countByModule(open));

    if (summary) {
      var urgent = open.filter(function (c) {
        return status(c).key === "prazo";
      }).length;
      summary.innerHTML =
        "Agora são <strong>" + open.length + " chamadas abertas</strong>" +
        (urgent ? ", e <strong>" + urgent + (urgent === 1 ? " encerra" : " encerram") + " nos próximos 10 dias</strong>" : "") +
        '. As já encerradas ficam na <a href="desafios.html?status=todos">lista completa de desafios</a>.';
    }

    /* o botão do rodapé acompanha o filtro */
    function paintAll(n) {
      if (!allLink) return;
      var nome = current ? CI.modulos[current].nome : "";
      var label = !n
        ? "Ver todos os desafios"
        : current
        ? n === 1
          ? "Ver o desafio de " + nome
          : "Ver os " + n + " desafios de " + nome
        : n === 1
        ? "Ver o desafio aberto"
        : "Ver os " + n + " desafios abertos";
      allLink.firstChild.nodeValue = label + " ";
      allLink.href = current && n ? "desafios.html?modulo=" + current : "desafios.html";
    }

    function render() {
      if (!loaded) return;
      var items = open.filter(function (c) {
        return !current || c.modulo === current;
      });
      paintAll(items.length);
      if (!items.length) {
        var nome = CI.modulos[current].nome;
        list.innerHTML = stateHTML({
          icon: "calendar-blank",
          title: "Nenhuma chamada aberta em " + esc(nome) + " agora",
          text: "Novas chamadas são publicadas ao longo do ano. Cadastre seu e-mail e avisamos quando abrir uma no seu tema.",
          actions:
            '<a class="btn btn--secondary btn--sm" href="#avisos">Receber avisos</a>' +
            '<a class="btn btn--secondary btn--sm" href="desafios.html?modulo=' + current + '&amp;status=todos">Ver chamadas encerradas</a>',
        });
        return;
      }
      var nomeMod = current ? CI.modulos[current].nome : "";
      var listHref = current ? "desafios.html?modulo=" + current : "desafios.html";
      var first = items.slice(0, 3);
      var rest = items.slice(3);
      var recent = rest
        .slice()
        .sort(function (a, b) {
          return (a.publicadoDias || 0) - (b.publicadoDias || 0);
        })
        .slice(0, 3);
      var more = function (n) {
        return n < 3 ? moreCardHTML(listHref, current ? "Ver todos os desafios de " + esc(nomeMod) : "Ver todos os desafios") : "";
      };
      var html = groupHTML(
        current && !rest.length ? "Chamadas abertas em " + esc(nomeMod) : "Encerram primeiro",
        current && !rest.length ? "Do prazo mais próximo para o mais distante." : "As propostas destas chamadas fecham antes. Vale começar por elas.",
        first.map(photoCardHTML).join("") + (rest.length ? "" : more(first.length))
      );
      if (recent.length) {
        html += groupHTML(
          "Publicadas recentemente",
          "Chamadas abertas há menos tempo, com mais prazo para preparar a proposta.",
          recent
            .map(function (c, i) {
              return photoCardHTML(c, i + 3);
            })
            .join("") + more(recent.length)
        );
      }
      list.innerHTML = html;
      revealCards(list);
    }

    /* os cards sobem e aparecem quando entram na tela, em sequência por coluna */
    function revealCards(scope) {
      var cards = $$(".pcard", scope);
      if (reduceMotion.matches || !("IntersectionObserver" in window)) {
        cards.forEach(function (c) {
          c.classList.add("is-in");
        });
        return;
      }
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      cards.forEach(function (c) {
        io.observe(c);
      });
    }

    list.setAttribute("aria-busy", "true");
    list.innerHTML = showcaseSkeletonHTML();
    setTimeout(function () {
      loaded = true;
      list.removeAttribute("aria-busy");
      render();
    }, 650);
  }

  /* ---------- Jornada ---------- */
  function initSteps() {
    var ol = $("[data-steps]");
    if (!ol) return;
    var steps = $$(".step", ol);
    function activate() {
      ol.style.setProperty("--p", 1);
      steps.forEach(function (s, i) {
        if (reduceMotion.matches) s.classList.add("is-active");
        else
          setTimeout(function () {
            s.classList.add("is-active");
          }, 80 + i * (1300 / Math.max(1, steps.length - 1)));
      });
    }
    if (!("IntersectionObserver" in window)) return activate();
    var io = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          activate();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(ol);
  }

  /* ---------- Faixa de temas ---------- */
  function initMarquee() {
    $$("[data-marquee]").forEach(function (m) {
      var track = $(".marquee__track", m);
      var group = $(".marquee__group", m);
      if (!track || !group) return;
      var clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      $$("a", clone).forEach(function (a) {
        a.setAttribute("tabindex", "-1");
      });
      track.appendChild(clone);
    });
  }

  /* ---------- Dúvidas: abas verticais no desktop, details no mobile ---------- */
  function initFaq() {
    var wrap = $("[data-faq]");
    if (!wrap) return;
    var items = $$("details", wrap).map(function (d) {
      return { q: $(".faq-q", d).textContent.trim(), a: $(".faq-details__body", d).innerHTML, icon: d.dataset.icon || "question" };
    });
    if (!items.length) return;
    var n = items.length;
    var current = 0;

    var faq = doc.createElement("div");
    faq.className = "faq";
    faq.innerHTML =
      '<div class="faq__list" role="tablist" aria-orientation="vertical" aria-label="Perguntas frequentes">' +
      items
        .map(function (it, i) {
          return (
            '<button class="faq__q" type="button" role="tab" id="faq-tab-' + i + '" aria-controls="faq-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
            '<span class="faq__qicon" aria-hidden="true"><i class="ph-light ph-' + it.icon + '"></i></span>' +
            '<span class="faq__qtext">' + esc(it.q) + "</span>" +
            '<i class="ph-light ph-arrow-right faq__arrow" aria-hidden="true"></i></button>'
          );
        })
        .join("") +
      "</div>" +
      '<div class="faq__panel" role="tabpanel" id="faq-panel" aria-labelledby="faq-tab-0" tabindex="0">' +
      '<div class="faq__bar">' +
      '<div class="faq__nav">' +
      '<button class="faq__step" type="button" data-step="-1" aria-label="Pergunta anterior"><i class="ph-light ph-arrow-left" aria-hidden="true"></i></button>' +
      '<button class="faq__step" type="button" data-step="1" aria-label="Próxima pergunta"><i class="ph-light ph-arrow-right" aria-hidden="true"></i></button>' +
      "</div></div>" +
      '<div class="faq__body" data-faq-body></div>' +
      "</div>";
    wrap.insertBefore(faq, wrap.firstChild);

    var tabs = $$(".faq__q", faq);
    var panel = $('[role="tabpanel"]', faq);
    var body = $("[data-faq-body]", faq);
    function show(i, focus) {
      current = i;
      tabs.forEach(function (t, j) {
        t.setAttribute("aria-selected", String(i === j));
        t.tabIndex = i === j ? 0 : -1;
      });
      panel.setAttribute("aria-labelledby", tabs[i].id);
      body.innerHTML =
        '<div class="faq__answer">' +
        '<i class="faq__mark ph-light ph-' + items[i].icon + '" aria-hidden="true"></i>' +
        '<h3 class="title-lg">' + esc(items[i].q) + "</h3>" + items[i].a + "</div>";
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () {
        show(i);
      });
    });
    $$("[data-step]", faq).forEach(function (b) {
      b.addEventListener("click", function () {
        show((current + Number(b.dataset.step) + n) % n);
      });
    });
    $(".faq__list", faq).addEventListener("keydown", function (e) {
      var i = tabs.indexOf(doc.activeElement);
      if (i < 0) return;
      var k = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") k = (i + 1) % n;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") k = (i - 1 + n) % n;
      else if (e.key === "Home") k = 0;
      else if (e.key === "End") k = n - 1;
      if (k !== null) {
        e.preventDefault();
        show(k, true);
      }
    });
    show(0);
  }

  /* ---------- Avisos por e-mail ---------- */
  function initNewsletter() {
    var form = $("[data-newsletter]");
    if (!form) return;
    var email = form.elements.email;
    var success = $("[data-newsletter-success]");
    var btn = $('[type="submit"]', form);
    var mail = $("[data-mail]");

    function chosen() {
      return $$('input[name="tema"]:checked', form).map(function (i) {
        return i.value;
      });
    }
    function joinPt(a) {
      return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " e " + a[a.length - 1];
    }
    /* A prévia mostra um aviso real do tema escolhido (ou o próximo prazo, sem escolha) */
    function paintPreview(animate) {
      if (!mail) return;
      var temas = chosen();
      var pick = CI.desafios
        .filter(function (c) {
          return c.prazoDias >= 0 && (!temas.length || temas.indexOf(c.tema) !== -1);
        })
        .sort(byDeadline)[0];
      $("[data-mail-subject]", mail).textContent = pick ? "Novo desafio aberto em " + pick.tema : "Avisos de " + temas[0];
      $("[data-mail-title]", mail).textContent = pick ? pick.titulo : "Quando abrir uma chamada neste tema, ela chega assim: resumo, prazo e link.";
      $("[data-mail-meta]", mail).textContent = pick
        ? CI.modulos[pick.modulo].nome + " · propostas até " + fmtShort(addDays(pick.prazoDias))
        : "Nenhuma chamada aberta neste tema agora";
      if (animate && !reduceMotion.matches) {
        mail.classList.remove("is-swap");
        void mail.offsetWidth;
        mail.classList.add("is-swap");
      }
    }

    form.addEventListener("change", function (e) {
      if (e.target.name === "tema") paintPreview(true);
    });
    paintPreview(false);

    email.addEventListener("input", function () {
      if (email.getAttribute("aria-invalid") === "true") setFieldError(email, emailError(email.value));
    });
    email.addEventListener("blur", function () {
      if (email.value.trim()) setFieldError(email, emailError(email.value));
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = emailError(email.value);
      setFieldError(email, msg);
      if (msg) {
        email.focus();
        return;
      }
      setBusy(btn, "Enviando…");
      setTimeout(function () {
        var temas = chosen();
        setBusy(btn, false);
        $("[data-success-email]", success).textContent = email.value.trim();
        $("[data-success-topics]", success).textContent = temas.length ? "sobre " + joinPt(temas) : "sobre todos os temas";
        form.hidden = true;
        success.hidden = false;
        success.focus();
      }, 700);
    });
    $("[data-newsletter-reset]", success).addEventListener("click", function () {
      success.hidden = true;
      form.hidden = false;
      form.reset();
      setFieldError(email, "");
      paintPreview(false);
      email.focus();
    });
  }

  /* ---------- Lista completa de desafios ---------- */
  function matches(c, q) {
    if (!q) return true;
    var hay = norm([c.titulo, c.resumo, c.area, c.tema, CI.modulos[c.modulo].nome].join(" "));
    return norm(q)
      .split(/\s+/)
      .filter(Boolean)
      .every(function (w) {
        return hay.indexOf(w) !== -1;
      });
  }

  function initListing() {
    var page = $("[data-listing]");
    if (!page) return;
    var params = new URLSearchParams(location.search);
    var state = {
      q: (params.get("q") || "").trim(),
      modulo: CI.modulos[params.get("modulo")] ? params.get("modulo") : "",
      area: params.get("area") || "",
      status: params.get("status") === "todos" ? "todos" : "abertos",
      ordem: params.get("ordem") === "recentes" ? "recentes" : "prazo",
    };
    var simulateError = params.get("simular") === "erro";

    var list = $("[data-list]");
    var count = $("[data-count]");
    var form = $("[data-filters]");
    var q = $("#f-q");
    var clear = $("[data-clear-q]");
    var area = $("#f-area");
    var ordem = $("#f-ordem");
    var abertos = $("#f-abertos");

    var areas = CI.desafios
      .map(function (c) {
        return c.area;
      })
      .filter(function (a, i, arr) {
        return arr.indexOf(a) === i;
      })
      .sort(function (a, b) {
        return a.localeCompare(b, "pt-BR");
      });
    area.insertAdjacentHTML(
      "beforeend",
      areas
        .map(function (a) {
          return '<option value="' + esc(a) + '">' + esc(a) + "</option>";
        })
        .join("")
    );
    if (areas.indexOf(state.area) === -1) state.area = "";

    q.value = state.q;
    area.value = state.area;
    ordem.value = state.ordem;
    abertos.checked = state.status === "abertos";
    clear.hidden = !state.q;

    var seg = createSeg($('[data-seg="listing"]'), {
      onChange: function (v) {
        state.modulo = v;
        update();
      },
    });
    seg.setValue(state.modulo, false);

    var loaded = false;

    function pool() {
      return CI.desafios.filter(function (c) {
        return (state.status === "todos" || c.prazoDias >= 0) && (!state.area || c.area === state.area) && matches(c, state.q);
      });
    }

    function syncURL() {
      var p = new URLSearchParams();
      if (state.q) p.set("q", state.q);
      if (state.modulo) p.set("modulo", state.modulo);
      if (state.area) p.set("area", state.area);
      if (state.status === "todos") p.set("status", "todos");
      if (state.ordem === "recentes") p.set("ordem", "recentes");
      var qs = p.toString();
      try {
        history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
      } catch (e) {
        /* file:// em alguns navegadores */
      }
    }

    function emptyHTML() {
      var title = state.q ? "Nenhum desafio encontrado para “" + esc(state.q) + "”" : "Nenhum desafio com esses filtros";
      var text = state.status === "abertos" ? "Tente outro termo, troque o módulo ou inclua as chamadas encerradas." : "Tente outro termo ou troque o módulo.";
      var actions = '<button class="btn btn--secondary btn--sm" type="button" data-reset>Limpar filtros</button>';
      if (state.status === "abertos") actions += '<button class="btn btn--secondary btn--sm" type="button" data-include-closed>Incluir encerrados</button>';
      return stateHTML({ icon: "magnifying-glass", title: title, text: text, actions: actions });
    }

    function update() {
      syncURL();
      if (!loaded) return;
      var base = pool();
      seg.setCounts(countByModule(base));
      var items = base.filter(function (c) {
        return !state.modulo || c.modulo === state.modulo;
      });
      items.sort(
        state.ordem === "recentes"
          ? function (a, b) {
              return a.publicadoDias - b.publicadoDias;
            }
          : byDeadline
      );
      var n = items.length;
      var word = n === 1 ? "desafio" : "desafios";
      var suffix = state.status === "abertos" ? (n === 1 ? " aberto" : " abertos") : "";
      count.textContent = n + " " + word + suffix;
      list.innerHTML = n ? items.map(cardHTML).join("") : emptyHTML();
    }

    function load(fail) {
      loaded = false;
      count.textContent = "Carregando desafios…";
      list.setAttribute("aria-busy", "true");
      list.innerHTML = skeletonHTML(6);
      setTimeout(function () {
        list.removeAttribute("aria-busy");
        if (fail) {
          count.textContent = "";
          list.innerHTML = stateHTML({
            kind: "erro",
            icon: "warning-circle",
            title: "Não foi possível carregar os desafios",
            text: "Verifique sua conexão e tente novamente. Se o problema continuar, escreva para canal.startups@petrobras.com.br.",
            actions: '<button class="btn btn--primary btn--sm" type="button" data-retry>Tentar novamente</button>',
          });
          return;
        }
        loaded = true;
        update();
      }, 650);
    }

    function reset() {
      state.q = "";
      state.modulo = "";
      state.area = "";
      state.status = "abertos";
      q.value = "";
      area.value = "";
      abertos.checked = true;
      clear.hidden = true;
      seg.setValue("", true);
      update();
      q.focus();
    }

    list.addEventListener("click", function (e) {
      if (e.target.closest("[data-reset]")) reset();
      else if (e.target.closest("[data-include-closed]")) {
        abertos.checked = false;
        state.status = "todos";
        update();
      } else if (e.target.closest("[data-retry]")) load(false);
    });

    var timer;
    q.addEventListener("input", function () {
      clear.hidden = !q.value;
      clearTimeout(timer);
      timer = setTimeout(function () {
        state.q = q.value.trim();
        update();
      }, 180);
    });
    clear.addEventListener("click", function () {
      q.value = "";
      clear.hidden = true;
      state.q = "";
      update();
      q.focus();
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearTimeout(timer);
      state.q = q.value.trim();
      update();
    });
    area.addEventListener("change", function () {
      state.area = area.value;
      update();
    });
    ordem.addEventListener("change", function () {
      state.ordem = ordem.value;
      update();
    });
    abertos.addEventListener("change", function () {
      state.status = abertos.checked ? "abertos" : "todos";
      update();
    });

    update();
    load(simulateError);
    if (params.get("buscar")) {
      q.focus();
    }
  }

  /* ---------- Detalhe do desafio ---------- */
  function getSaved() {
    try {
      var v = JSON.parse(store.get("ci-salvos") || "[]");
      return Array.isArray(v) ? v : [];
    } catch (e) {
      return [];
    }
  }

  function initDetail() {
    var host = $("[data-detail]");
    if (!host) return;
    var id = new URLSearchParams(location.search).get("id");
    var c = id
      ? CI.desafios.find(function (x) {
          return x.id === id;
        })
      : CI.desafios[0];

    if (!c) {
      doc.title = "Desafio não encontrado · Conexões para Inovação";
      host.innerHTML =
        '<div class="container page-head">' +
        stateHTML({
          icon: "magnifying-glass",
          title: "Não encontramos este desafio",
          text: "O endereço pode estar incompleto ou a chamada foi removida. Veja a lista com todos os desafios do programa.",
          actions: '<a class="btn btn--primary btn--sm" href="desafios.html">Ver desafios</a><a class="btn btn--secondary btn--sm" href="index.html">Ir para o início</a>',
        }) +
        "</div>";
      return;
    }

    var m = CI.modulos[c.modulo];
    var s = status(c);
    var prazo = addDays(c.prazoDias);
    var pub = addDays(-c.publicadoDias);
    var closed = s.key === "encerrado";
    var cd = countdown(c);
    var nextUrl = proposalHref(c);

    doc.title = c.titulo + " · Conexões para Inovação";

    var related = CI.desafios
      .filter(function (x) {
        return x !== c && x.prazoDias >= 0;
      })
      .sort(function (a, b) {
        var sa = a.modulo === c.modulo ? 0 : 1;
        var sb = b.modulo === c.modulo ? 0 : 1;
        return sa - sb || a.prazoDias - b.prazoDias;
      })
      .slice(0, 2);

    var cta = closed
      ? '<span class="btn btn--secondary btn--block" aria-disabled="true">Inscrições encerradas</span>'
      : '<a class="btn btn--primary btn--icon btn--block" href="' + nextUrl + '"><span class="btn__label">Enviar proposta</span><span class="btn__icon"><i class="ph-light ph-arrow-right" aria-hidden="true"></i></span></a>';

    /* Linha do tempo: marcos em dias a partir de hoje; "Hoje" fica entre o último marco passado e o próximo */
    var marcos = [
      { d: -c.publicadoDias, label: "Publicação da chamada" },
      { d: c.prazoDias, label: "Fim das inscrições" },
      { d: c.prazoDias + 30, label: "Resultado preliminar", prev: true },
      { d: c.prazoDias + 75, label: "Início dos projetos", prev: true },
    ];
    var k = -1;
    marcos.forEach(function (mc, j) {
      if (mc.d <= 0) k = j;
    });
    var pos = k < 0 ? 0 : k >= marcos.length - 1 ? marcos.length - 1 : k + (0 - marcos[k].d) / (marcos[k + 1].d - marcos[k].d);
    var nowX = (12.5 + 25 * pos).toFixed(2) + "%";
    var timeline =
      '<ol class="tl" style="--now-x:' + nowX + '">' +
      marcos
        .map(function (mc, j) {
          var dt = addDays(mc.d);
          var cls = mc.d <= 0 ? " is-done" : j === k + 1 ? " is-next" : "";
          var note = j === 1 && !closed ? '<span class="tl__note">' + s.left + "</span>" : mc.prev ? '<span class="tl__note">previsão</span>' : "";
          return (
            '<li class="tl__item' + cls + '"><span class="tl__dot" aria-hidden="true"></span>' +
            '<time datetime="' + isoDate(dt) + '">' + fmtShort(dt) + '</time><span class="tl__label">' + mc.label + "</span>" + note + "</li>" +
            (j === k ? '<li class="tl__now"><span>Hoje</span></li>' : "")
          );
        })
        .join("") +
      "</ol>";

    var secs = [
      ["contexto", "Contexto"],
      ["buscamos", "O que buscamos"],
      ["participar", "Quem pode participar"],
      ["avaliacao", "Como avaliamos"],
      ["cronograma", "Cronograma"],
      ["documentos", "Documentos"],
    ];
    function num(i) {
      return String(i + 1).padStart(2, "0");
    }
    function sec(i, body) {
      var id = secs[i][0];
      return (
        '<section class="prose-section" id="' + id + '" aria-labelledby="' + id + '-t">' +
        '<h2 class="title-lg prose-title" id="' + id + '-t"><span class="prose-num" aria-hidden="true">' + num(i) + "</span>" + secs[i][1] + "</h2>" +
        body + "</section>"
      );
    }

    host.innerHTML =
      '<div class="container">' +
      '<header class="dhero dhero--' + s.key + '">' +
      '<img class="dhero__photo" src="assets/media/desafios/' + c.id + '.webp" alt="" width="1200" height="800">' +
      '<div class="dhero__body">' +
      '<nav aria-label="Trilha de navegação"><ol class="crumbs">' +
      '<li><a href="index.html">Início</a></li><li aria-hidden="true"><i class="ph-light ph-caret-right"></i></li>' +
      '<li><a href="desafios.html">Desafios</a></li><li aria-hidden="true"><i class="ph-light ph-caret-right"></i></li>' +
      '<li><a href="desafios.html?modulo=' + c.modulo + '">' + esc(m.nome) + "</a></li></ol></nav>" +
      '<div class="dhero__top"><span class="dhero__module"><span class="dhero__icon"><i class="ph-light ph-' + m.icone + '" aria-hidden="true"></i></span>' + esc(m.nome) + "</span>" +
      '<span class="status status--' + s.key + '">' + s.label + "</span></div>" +
      '<h1 class="dhero__title">' + esc(c.titulo) + "</h1>" +
      '<p class="dhero__lead">' + esc(c.resumo) + "</p>" +
      '<dl class="dhero__facts">' +
      "<div><dt>Área</dt><dd>" + esc(c.area) + "</dd></div>" +
      "<div><dt>Tema</dt><dd>" + esc(c.tema) + "</dd></div>" +
      "<div><dt>Formato</dt><dd>" + esc(m.formato) + "</dd></div>" +
      "</dl>" +
      "</div></header>" +
      '<div class="detail-grid">' +
      '<article class="prose">' +
      sec(0, "<p>" + esc(c.contexto) + "</p>") +
      sec(
        1,
        '<ul class="wants">' +
          c.buscamos
            .map(function (b) {
              return '<li><span class="wants__icon" aria-hidden="true"><i class="ph-light ph-check"></i></span><span>' + esc(b) + "</span></li>";
            })
            .join("") +
          "</ul>"
      ) +
      sec(
        2,
        '<div class="callout"><span class="callout__icon" aria-hidden="true"><i class="ph-light ph-users-three"></i></span><div>' +
          '<p class="callout__title">' + esc(m.publico) + "</p>" +
          "<p>Os requisitos completos de elegibilidade, documentação e propriedade intelectual estão no edital.</p></div></div>"
      ) +
      sec(
        3,
        '<div class="criteria">' +
          CI.criterios
            .map(function (cr, i) {
              return (
                '<div class="criterion"><span class="criterion__num" aria-hidden="true">' + num(i) + '</span><i class="ph-light ph-' + cr.icone + '" aria-hidden="true"></i>' +
                "<h3>" + esc(cr.titulo) + "</h3><p>" + esc(cr.texto) + "</p></div>"
              );
            })
            .join("") +
          "</div>"
      ) +
      sec(4, timeline) +
      sec(
        5,
        '<ul class="docs">' +
          [
            ["file-pdf", "Edital completo", "PDF"],
            ["file-text", "Anexo técnico do desafio", "PDF"],
            ["file-text", "Modelo de proposta", "DOCX"],
          ]
            .map(function (dc) {
              return (
                '<li class="doc" aria-disabled="true"><i class="ph-light ph-' + dc[0] + '" aria-hidden="true"></i>' +
                "<div><strong>" + dc[1] + "</strong><span>" + dc[2] + '</span></div><span class="doc__state">Disponível na versão final</span></li>'
              );
            })
            .join("") +
          "</ul>"
      ) +
      "</article>" +
      '<aside class="aside aside--' + s.key + '" aria-label="Prazo e inscrição" style="--p:' + progress(c) + '"><div class="shell"><div class="core" data-panel>' +
      (closed
        ? '<div class="aside__count"><span class="small">Inscrições encerradas em</span><time class="aside__date" datetime="' + isoDate(prazo) + '">' + fmtLong(prazo) + "</time></div>"
        : '<div class="aside__count">' +
          '<p class="countdown countdown--xl"><span class="countdown__num">' + cd.num + '</span><span class="countdown__unit">' + cd.long + "</span></p>" +
          '<span class="meter meter--xl' + (s.key === "prazo" ? " meter--warn" : "") + '" aria-hidden="true"><span class="meter__bar"></span></span>' +
          '<p class="aside__line">Propostas até <time datetime="' + isoDate(prazo) + '">' + fmtLong(prazo) + "</time></p>" +
          "</div>") +
      '<div class="aside__actions">' + cta +
      '<div class="aside__secondary">' +
      '<button class="btn btn--secondary btn--sm" type="button" data-save aria-pressed="false"><i class="ph-light ph-bookmark-simple" aria-hidden="true"></i><span class="btn__label">Salvar</span></button>' +
      '<button class="btn btn--secondary btn--sm" type="button" data-copy><i class="ph-light ph-link-simple" aria-hidden="true"></i><span class="btn__label">Copiar link</span></button>' +
      "</div></div>" +
      '<nav class="toc" aria-label="Nesta página"><p class="toc__title">Nesta página</p><ol>' +
      secs
        .map(function (sc, i) {
          return '<li><a href="#' + sc[0] + '"><span class="toc__num" aria-hidden="true">' + num(i) + "</span>" + sc[1] + "</a></li>";
        })
        .join("") +
      "</ol></nav>" +
      "</div></div></aside>" +
      "</div>" +
      (related.length
        ? '<section class="related" aria-labelledby="rel-title"><h2 class="title-lg" id="rel-title">Outros desafios abertos</h2><div class="cards">' + related.map(cardHTML).join("") + "</div></section>"
        : "") +
      "</div>" +
      (closed
        ? ""
        : '<div class="mobile-bar" data-mobile-bar inert>' +
          '<div class="mobile-bar__info"><strong>' + s.left + "</strong><span>Propostas até " + fmtShort(prazo) + "</span></div>" +
          '<a class="btn btn--primary btn--sm" href="' + nextUrl + '">Enviar proposta</a></div>');

    /* Salvar no navegador */
    var save = $("[data-save]", host);
    function paintSave() {
      var on = getSaved().indexOf(c.id) !== -1;
      save.setAttribute("aria-pressed", String(on));
      $(".btn__label", save).textContent = on ? "Salvo" : "Salvar";
    }
    paintSave();
    save.addEventListener("click", function () {
      var list = getSaved();
      var i = list.indexOf(c.id);
      if (i === -1) list.push(c.id);
      else list.splice(i, 1);
      store.set("ci-salvos", JSON.stringify(list));
      paintSave();
      toast(i === -1 ? "Desafio salvo neste navegador." : "Desafio removido dos salvos.", i === -1 ? "bookmark-simple" : "x");
    });

    /* Copiar link */
    var copy = $("[data-copy]", host);
    copy.addEventListener("click", function () {
      var url = location.href;
      var done = function () {
        $(".btn__label", copy).textContent = "Copiado";
        toast("Link copiado.", "link-simple");
        setTimeout(function () {
          $(".btn__label", copy).textContent = "Copiar link";
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () {
          toast("Não foi possível copiar. Use o endereço da barra do navegador.", "warning-circle");
        });
      } else {
        toast("Não foi possível copiar. Use o endereço da barra do navegador.", "warning-circle");
      }
    });

    /* Barra fixa no mobile quando o painel sai da tela */
    var bar = $("[data-mobile-bar]");
    var panel = $("[data-panel]", host);
    if (bar && panel && "IntersectionObserver" in window) {
      doc.body.classList.add("has-mobile-bar");
      new IntersectionObserver(function (entries) {
        var e = entries[0];
        var show = !e.isIntersecting && e.boundingClientRect.top < 0;
        bar.classList.toggle("is-visible", show);
        bar.inert = !show;
      }).observe(panel);
    }

    /* Índice "Nesta página": marca a seção que está no centro da tela */
    var links = $$(".toc a", host);
    var sections = links.map(function (a) {
      return $(a.getAttribute("href"), host);
    });
    if (links.length && "IntersectionObserver" in window) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var i = sections.indexOf(e.target);
            links.forEach(function (a, j) {
              if (i === j) a.setAttribute("aria-current", "true");
              else a.removeAttribute("aria-current");
            });
          });
        },
        { rootMargin: "-35% 0px -60% 0px" }
      );
      sections.forEach(function (sct) {
        if (sct) spy.observe(sct);
      });
    }
  }

  /* ---------- Entrar / criar cadastro ---------- */
  function cnpjChars(v) {
    return v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 14);
  }
  function maskCNPJ(v) {
    var s = cnpjChars(v);
    var out = s.slice(0, 2);
    if (s.length > 2) out += "." + s.slice(2, 5);
    if (s.length > 5) out += "." + s.slice(5, 8);
    if (s.length > 8) out += "/" + s.slice(8, 12);
    if (s.length > 12) out += "-" + s.slice(12, 14);
    return out;
  }
  /* Aceita o CNPJ numérico e o alfanumérico (em vigor desde julho de 2026) */
  function validCNPJ(v) {
    var s = cnpjChars(v);
    if (!/^[A-Z0-9]{12}[0-9]{2}$/.test(s) || /^(.)\1{13}$/.test(s)) return false;
    function dv(n) {
      var w = n === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      for (var i = 0; i < n; i++) sum += (s.charCodeAt(i) - 48) * w[i];
      var r = sum % 11;
      return r < 2 ? 0 : 11 - r;
    }
    return dv(12) === +s[12] && dv(13) === +s[13];
  }
  CI._validCNPJ = validCNPJ;

  function initAuth() {
    var host = $("[data-auth]");
    if (!host) return;
    var params = new URLSearchParams(location.search);
    var next = params.get("next") || "";
    var safeNext = /^[a-z0-9-]+\.html(\?[\w=&%.-]*)?$/i.test(next) ? next : "desafios.html";
    var forProposal = params.get("acao") === "proposta";

    var note = $("[data-auth-note]");
    if (note && forProposal) note.hidden = false;

    var panels = { entrar: $("#painel-entrar"), cadastro: $("#painel-cadastro") };
    var seg = createSeg($('[data-seg="auth"]'), {
      onChange: function (v) {
        Object.keys(panels).forEach(function (k) {
          panels[k].hidden = k !== v;
        });
        var first = $("input, select", panels[v]);
        if (first) first.focus();
      },
    });
    var startTab = params.get("aba") === "cadastro" ? "cadastro" : "entrar";
    seg.setValue(startTab, false);
    Object.keys(panels).forEach(function (k) {
      panels[k].hidden = k !== startTab;
    });

    /* Mostrar/ocultar senha */
    $$("[data-toggle-password]").forEach(function (b) {
      b.addEventListener("click", function () {
        var input = $("#" + b.getAttribute("aria-controls"));
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        b.setAttribute("aria-pressed", String(show));
        b.setAttribute("aria-label", show ? "Ocultar senha" : "Mostrar senha");
        $("i", b).className = "ph-light " + (show ? "ph-eye-slash" : "ph-eye");
      });
    });

    /* Máscara de CNPJ */
    var cnpj = $("#c-cnpj");
    if (cnpj) {
      cnpj.addEventListener("input", function () {
        cnpj.value = maskCNPJ(cnpj.value);
      });
    }

    var rules = {
      "l-email": emailError,
      "l-senha": function (v) {
        return v ? "" : "Informe sua senha.";
      },
      "c-tipo": function (v) {
        return v ? "" : "Escolha o tipo de organização.";
      },
      "c-org": function (v) {
        return v.trim() ? "" : "Informe o nome da organização.";
      },
      "c-cnpj": function (v) {
        if (!v.trim()) return "Informe o CNPJ.";
        return validCNPJ(v) ? "" : "CNPJ inválido. Confira os 14 caracteres.";
      },
      "c-nome": function (v) {
        return v.trim().length >= 3 ? "" : "Informe seu nome completo.";
      },
      "c-email": emailError,
      "c-senha": function (v) {
        if (v.length < 8) return "Use pelo menos 8 caracteres.";
        if (!/[A-Za-z]/.test(v) || !/[0-9]/.test(v)) return "Combine letras e números.";
        return "";
      },
    };

    function check(input) {
      var rule = rules[input.id];
      var msg = "";
      if (input.type === "checkbox") msg = input.checked ? "" : "Aceite os termos para continuar.";
      else if (rule) msg = rule(input.value);
      setFieldError(input, msg);
      return msg;
    }

    $$("form[data-auth-form]", host).forEach(function (form) {
      var inputs = $$("input, select", form).filter(function (i) {
        return rules[i.id] || i.type === "checkbox";
      });
      inputs.forEach(function (i) {
        i.addEventListener("blur", function () {
          if (i.value) check(i);
        });
        i.addEventListener(i.type === "checkbox" || i.tagName === "SELECT" ? "change" : "input", function () {
          if (i.getAttribute("aria-invalid") === "true") check(i);
        });
      });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var firstBad = null;
        inputs.forEach(function (i) {
          if (check(i) && !firstBad) firstBad = i;
        });
        if (firstBad) {
          firstBad.focus();
          return;
        }
        var btn = $('[type="submit"]', form);
        setBusy(btn, form.dataset.authForm === "entrar" ? "Entrando…" : "Criando cadastro…");
        setTimeout(function () {
          setBusy(btn, false);
          var ok = $("[data-auth-success]", form.parentNode);
          var emailField = $('input[type="email"]', form);
          $("[data-auth-email]", ok).textContent = emailField ? emailField.value.trim() : "";
          var msgEl = $("[data-auth-next]", ok);
          if (msgEl) {
            msgEl.textContent = forProposal
              ? "Na versão final, o formulário de proposta abriria agora."
              : "Na versão final, você seguiria para a sua área no portal.";
          }
          var go = $("[data-auth-go]", ok);
          if (go) go.href = safeNext;
          form.hidden = true;
          ok.hidden = false;
          ok.focus();
        }, 800);
      });
    });
  }

  /* ---------- Início ---------- */
  function init() {
    initNav();
    initFontSize();
    initSeaWaves();
    initMarquee();
    initReveal();
    initBgVideos();
    initHome();
    initSteps();
    initFaq();
    initNewsletter();
    initListing();
    initDetail();
    initAuth();
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* Oriri Agência Cultural · interações da prévia (sem dependências) */
(function () {
  var WHATSAPP = '5516997614775'; // (16) 99761-4775
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function linkWhats(msg) { return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg); }
  function prepararWhats(raiz) {
    (raiz || document).querySelectorAll('[data-whats]').forEach(function (a) {
      a.href = linkWhats(a.getAttribute('data-whats'));
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  /* =========================================================
     PROJETOS: edite aqui. Fotos: salve em imagens/ com o nome
     indicado em "capa" e "galeria". Vídeo: cole o link do
     YouTube/Vimeo em "video" (formato embed).
     ========================================================= */
  var PROJETOS = [
    {
      id: 'ekaabo',
      titulo: 'E Káàbo – Travessia de Nós',
      sub: 'Grupo Corpo Negro',
      categoria: 'Artes cênicas',
      ano: 'A confirmar',
      parceiros: 'Grupo Corpo Negro',
      cor: 'terra',
      capa: 'imagens/projeto-ekaabo.jpg',
      resumo: 'Produção e circulação do espetáculo teatral do Grupo Corpo Negro, que mergulha em memória e ancestralidade afro-brasileira. A Oriri atuou na estruturação do projeto, na gestão dos recursos e na articulação de espaços e plateias para a circulação.',
      ficha: [['Realização', 'Grupo Corpo Negro'], ['Produção e gestão', 'Oriri Agência Cultural'], ['Coordenação', 'Nathália Fernandes'], ['Linguagem', 'Teatro · memória e ancestralidade']]
    },
    {
      id: 'mundo-na-cabeca',
      titulo: 'Mundo na Cabeça',
      sub: 'Literatura e educação antirracista',
      categoria: 'Artes cênicas · Educação',
      ano: 'A confirmar',
      parceiros: 'Escolas e redes de ensino',
      cor: 'ocre',
      capa: 'imagens/projeto-mundo-na-cabeca.jpg',
      resumo: 'Montagem voltada à literatura infantil, à identidade e à educação antirracista, levada para dentro das escolas. A Oriri cuidou da produção, do diálogo com as instituições de ensino e da logística das apresentações.',
      ficha: [['Produção', 'Oriri Agência Cultural'], ['Coordenação', 'Nathália Fernandes'], ['Público', 'Crianças e comunidade escolar'], ['Eixos', 'Literatura · identidade · antirracismo']]
    },
    {
      id: 'patrimonio',
      titulo: 'Semana de Preservação do Patrimônio',
      sub: 'Gestão Criativa',
      categoria: 'Patrimônio · Formação',
      ano: 'A confirmar',
      parceiros: 'Semana de Preservação do Patrimônio',
      cor: 'cafe',
      capa: 'imagens/projeto-patrimonio.jpg',
      resumo: 'Mediação e bate-papo sobre Gestão Criativa e Preservação Cultural, aproximando o público das discussões sobre memória, patrimônio material e imaterial e o papel da gestão na salvaguarda da cultura.',
      ficha: [['Atuação', 'Mediação e bate-papo'], ['Convidada', 'Nathália Fernandes'], ['Tema', 'Gestão Criativa e Preservação Cultural'], ['Formato', 'Encontro formativo']]
    },
    {
      id: 'diario-de-producao',
      titulo: 'Diário de Produção',
      sub: 'Mulheres Produtoras',
      categoria: 'Formação · Conteúdo',
      ano: 'A confirmar',
      parceiros: 'Mulheres Produtoras',
      cor: 'areia',
      capa: 'imagens/projeto-diario-de-producao.jpg',
      resumo: 'Série de conteúdo formativo que compartilha os bastidores da gestão cultural: rotinas, desafios e aprendizados de quem produz cultura, fortalecendo a rede de mulheres na produção.',
      ficha: [['Realização', 'Mulheres Produtoras'], ['Conteúdo', 'Nathália Fernandes'], ['Formato', 'Série em vídeo'], ['Foco', 'Bastidores e formação']]
    },
    {
      id: 'sesc-usp',
      titulo: 'Circulação e Ações Formativas',
      sub: 'Parcerias Sesc e USP',
      categoria: 'Produção · Formação',
      ano: 'A confirmar',
      parceiros: 'Sesc · USP Ribeirão Preto',
      cor: 'terra',
      capa: 'imagens/projeto-sesc-usp.jpg',
      resumo: 'Produção de oficinas, festivais e eventos culturais de grande alcance em parceria com o Sesc e a USP Ribeirão Preto, da programação à execução e ao relacionamento com as instituições.',
      ficha: [['Parceiros', 'Sesc · USP Ribeirão Preto'], ['Produção', 'Oriri Agência Cultural'], ['Formatos', 'Oficinas · festivais · eventos'], ['Alcance', 'Ribeirão Preto e região']]
    },
    {
      id: 'editais',
      titulo: 'Projetos Incentivados e Editais',
      sub: 'Gestão de recursos',
      categoria: 'Gestão · Captação',
      ano: 'Contínuo',
      parceiros: 'Artistas, coletivos e patrocinadores',
      cor: 'cafe',
      capa: 'imagens/projeto-editais.jpg',
      resumo: 'Elaboração e gestão de projetos para leis de incentivo e editais (Rouanet, ProAC, Paulo Gustavo, Aldir Blanc), conexão com patrocinadores e acompanhamento completo até a prestação de contas.',
      ficha: [['Leis e editais', 'Rouanet · ProAC · PNAB · Paulo Gustavo'], ['Etapas', 'Escrita · captação · execução · prestação de contas'], ['Gestão', 'Oriri Agência Cultural'], ['Para quem', 'Artistas, coletivos e empresas']]
    }
  ];

  function ph(cor, texto) {
    return '<div class="ph ph-' + cor + '" aria-hidden="true"><svg><use href="#i-traco"/></svg>' + (texto ? '<span>' + texto + '</span>' : '') + '</div>';
  }
  function img(src, alt, lazy) {
    return '<img src="' + src + '" alt="' + alt.replace(/"/g, '&quot;') + '"' + (lazy ? ' loading="lazy"' : '') + ' onerror="this.remove()">';
  }

  /* ---------- Monta os cards ---------- */
  var grade = document.querySelector('[data-grade]');
  grade.innerHTML = PROJETOS.map(function (p, i) {
    return '<li class="revela"><button class="card" type="button" data-projeto="' + i + '" aria-haspopup="dialog">' +
      ph(p.cor, 'Foto do projeto') + img(p.capa, p.titulo, true) +
      '<span class="card-tarja"><span><strong>' + p.titulo + '</strong><small>' + p.sub + '</small></span>' +
      '<span class="card-abre" aria-hidden="true"><svg class="ic"><use href="#i-seta"/></svg></span></span>' +
      '</button></li>';
  }).join('');

  /* ---------- Modal do projeto ---------- */
  var modal = document.querySelector('[data-modal]');
  var q = function (s) { return modal.querySelector(s); };
  var ultimoFoco = null;

  function abrir(p) {
    q('[data-m-capa]').innerHTML = ph(p.cor, '') + img(p.capa, p.titulo);
    q('[data-m-cat]').textContent = p.categoria;
    q('[data-m-titulo]').textContent = p.titulo + (p.sub ? ' · ' + p.sub : '');
    q('[data-m-ano]').textContent = p.ano;
    q('[data-m-parceiros]').textContent = p.parceiros;
    q('[data-m-resumo]').textContent = p.resumo;
    q('[data-m-ficha]').innerHTML = p.ficha.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('');
    var base = 'imagens/' + p.id;
    var video = p.video
      ? '<figure><iframe src="' + p.video + '" title="Vídeo: ' + p.titulo + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></figure>'
      : '<figure>' + ph('cafe', 'Espaço para vídeo') + '<span class="play" aria-hidden="true"><svg><use href="#i-play"/></svg></span></figure>';
    var cores = ['terra', 'ocre', 'areia', 'cafe'];
    q('[data-m-galeria]').innerHTML = video + [1, 2, 3, 4].map(function (n) {
      return '<figure>' + ph(cores[n - 1], 'Foto ' + n) + img(base + '-' + n + '.jpg', p.titulo + ', foto ' + n, true) + '</figure>';
    }).join('');
    var w = q('[data-m-whats]');
    w.setAttribute('data-whats', 'Olá, Oriri! Vi o projeto "' + p.titulo + '" no site e quero conversar sobre um projeto.');
    prepararWhats(modal);
    ultimoFoco = document.activeElement;
    modal.showModal();
    document.body.classList.add('modal-aberto');
    q('.modal-caixa').scrollTop = 0;
  }
  function fechar() { modal.close(); }
  modal.addEventListener('close', function () {
    document.body.classList.remove('modal-aberto');
    if (ultimoFoco) ultimoFoco.focus();
  });
  grade.addEventListener('click', function (e) {
    var c = e.target.closest('[data-projeto]');
    if (c) abrir(PROJETOS[+c.getAttribute('data-projeto')]);
  });
  q('[data-fechar]').addEventListener('click', fechar);
  modal.addEventListener('click', function (e) { if (e.target === modal) fechar(); }); // clique fora

  prepararWhats();

  /* ---------- Navbar ---------- */
  var topo = document.querySelector('[data-topo]');
  function aoRolar() { topo.classList.toggle('is-rolado', window.scrollY > 10); }
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  var btn = document.querySelector('[data-menu-btn]');
  var menu = document.getElementById('menu');
  function fecharMenu() { btn.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-aberto'); }
  btn.addEventListener('click', function () {
    var aberto = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!aberto));
    menu.classList.toggle('is-aberto', !aberto);
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) fecharMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharMenu(); });

  var links = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]:not(.pilula)'));
  if ('IntersectionObserver' in window) {
    var obsSecao = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle('is-atual', l.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) { var a = document.querySelector(l.getAttribute('href')); if (a) obsSecao.observe(a); });
  }

  /* ---------- Revelar ao rolar ---------- */
  var revela = document.querySelectorAll('.revela');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visivel'); obs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revela.forEach(function (el) {
      var irmaos = el.parentElement.children;
      var idx = Array.prototype.indexOf.call(irmaos, el);
      el.style.transitionDelay = (idx % 3) * 110 + 'ms';
      obs.observe(el);
    });
  } else {
    revela.forEach(function (el) { el.classList.add('is-visivel'); });
  }

  /* ---------- Faixas de fotos: movimento ligado ao scroll ---------- */
  var secFaixas = document.querySelector('[data-faixas]');
  var faixaD = document.querySelector('[data-faixa="direita"]');
  var faixaE = document.querySelector('[data-faixa="esquerda"]');
  var pedido = false;
  function moverFaixas() {
    pedido = false;
    var r = secFaixas.getBoundingClientRect();
    var vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    var prog = (vh - r.top) / (vh + r.height); // 0 → 1 enquanto a seção atravessa a tela
    var sobraD = Math.max(0, faixaD.scrollWidth - window.innerWidth);
    var sobraE = Math.max(0, faixaE.scrollWidth - window.innerWidth);
    faixaD.style.transform = 'translate3d(' + (-sobraD + sobraD * prog) + 'px,0,0)'; // vai para a direita
    faixaE.style.transform = 'translate3d(' + (-sobraE * prog) + 'px,0,0)';           // vai para a esquerda
  }
  function agendar() { if (!pedido) { pedido = true; requestAnimationFrame(moverFaixas); } }
  if (!reduz) {
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
  }
  moverFaixas();

  /* ---------- Contadores (count-up ao entrar na tela) ---------- */
  var numFmt = new Intl.NumberFormat('pt-BR');
  var contadores = document.querySelectorAll('[data-conta]');
  function contar(el) {
    var fim = +el.getAttribute('data-conta');
    if (reduz) { el.textContent = numFmt.format(fim); return; }
    var dur = 2000, t0 = null;
    function passo(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3); // desacelera no final
      el.textContent = numFmt.format(Math.round(fim * e));
      if (k < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }
  if ('IntersectionObserver' in window) {
    var obsNum = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-conta]').forEach(contar);
          obsNum.unobserve(e.target);
        }
      });
    }, { threshold: 0.35 });
    obsNum.observe(document.querySelector('[data-impacto]'));
  } else {
    contadores.forEach(function (el) { el.textContent = numFmt.format(+el.getAttribute('data-conta')); });
  }

  var ano = document.querySelector('[data-ano]');
  if (ano) ano.textContent = new Date().getFullYear();
})();

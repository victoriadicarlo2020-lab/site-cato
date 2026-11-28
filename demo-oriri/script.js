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
     PROJETOS: fonte oficial = docs/BASE_ORIRI.md (seção 5).
     Fotos: imagens/projeto-<id>.jpg (capa) e imagens/<id>-1.jpg … -4.jpg.
     Vídeo: link de incorporação do YouTube/Vimeo em "video".
     Ano vazio = não informado na base (o campo some do modal).
     ========================================================= */
  var PROJETOS = [
    { id: 'afrocirco', titulo: 'AfroCirco: Rir, Resistir e Recriar', grupo: '', categoria: 'Circo', edital: 'Rumos Itaú Cultural', ano: '2023–2024', cor: 'terra', capa: 'imagens/projeto-afrocirco.jpg' },
    { id: 'o-mundo-comeca-na-cabeca', titulo: 'O Mundo Começa na Cabeça', grupo: 'Grupo Corpo Negro', categoria: 'Teatro', edital: 'Edital Território SESI-SP (2024) · Viagem Teatral SESI · ProAC', ano: '2024', cor: 'ocre', capa: 'imagens/projeto-o-mundo-comeca-na-cabeca.jpg' },
    { id: 'madame-misteria', titulo: 'Madame M / Madame Mistéria', grupo: 'Cia. Teatro de Riscos', categoria: 'Teatro', edital: 'Edital Território SESI-SP (2024) · Viagem Teatral SESI · ProAC Editais', ano: '2024', cor: 'cafe', capa: 'imagens/projeto-madame-misteria.jpg' },
    { id: 'fernanda-marx', titulo: 'Fernanda Marx canta Alcione & Flor de Café 10 anos', grupo: 'Fernanda Marx', categoria: 'Música', edital: 'Edital Território SESI-SP · ProAC', ano: '', cor: 'areia', capa: 'imagens/projeto-fernanda-marx.jpg' },
    { id: 'um-tanto-de-sonho', titulo: 'Um Tanto de Sonho', grupo: 'Coletivo CabarElas', categoria: 'Circo', edital: 'Programação Mundo Circo SP', ano: '2024', cor: 'verde', capa: 'imagens/projeto-um-tanto-de-sonho.jpg' },
    { id: 'e-kaabo', titulo: 'E Káàbo, o futuro é preto', grupo: 'Grupo Corpo Negro', categoria: 'Teatro', edital: 'ProAC Editais', ano: '', cor: 'terra', capa: 'imagens/projeto-e-kaabo.jpg' },
    { id: 'electra-vida-e-sonho', titulo: 'Electra Enlutada & A Vida é Sonho', grupo: 'Cia. Teatral Boccaccione / Cia. Teatro de Riscos', categoria: 'Teatro', edital: 'ProAC · Circuito TUSP', ano: '', cor: 'cafe', capa: 'imagens/projeto-electra-vida-e-sonho.jpg' },
    { id: 'danca-rotina', titulo: 'Circulação de Dança Rotina', grupo: 'Funk Fockers e Coletivo Fuligem', categoria: 'Dança', edital: 'ProAC Editais', ano: '', cor: 'ocre', capa: 'imagens/projeto-danca-rotina.jpg' },
    { id: 'acervo-cedep', titulo: 'Digitalização do Acervo CEDEP – Cerâmica São Luiz', grupo: 'ONG Vivacidade', categoria: 'Memória e patrimônio', edital: 'ProAC LAB · Lei Aldir Blanc', ano: '', cor: 'areia', capa: 'imagens/projeto-acervo-cedep.jpg' },
    { id: 'mundo-sonha-mundo', titulo: 'Mundo Sonha Mundo', grupo: 'Grupo Teatro de Sobras', categoria: 'Teatro', edital: 'Lei Federal de Incentivo à Cultura', ano: '', cor: 'verde', capa: 'imagens/projeto-mundo-sonha-mundo.jpg' },
    { id: 'guerra-dos-barbaros', titulo: 'A Guerra dos Bárbaros e a árvore encantada da Jurema', grupo: 'Cia. São Jorge de Variedades', categoria: 'Teatro', edital: 'Prêmio Zé Renato', ano: '', cor: 'terra', capa: 'imagens/projeto-guerra-dos-barbaros.jpg' },
    { id: 'hamlet-cunqueiro', titulo: 'Clásicas Desfeitas: Hamlet, o de Cunqueiro', grupo: 'Coprodução internacional Brasil/Espanha', categoria: 'Internacional', edital: 'Cidade da Cultura da Galícia (Espanha)', ano: '', cor: 'cafe', capa: 'imagens/projeto-hamlet-cunqueiro.jpg' }
  ];

  function ph(cor, texto) {
    return '<div class="ph ph-' + cor + '" aria-hidden="true"><svg><use href="#i-traco"/></svg>' + (texto ? '<span>' + texto + '</span>' : '') + '</div>';
  }
  function img(src, alt, lazy) {
    return '<img src="' + src + '" alt="' + alt.replace(/"/g, '&quot;') + '"' + (lazy ? ' loading="lazy"' : '') + ' onerror="this.remove()">';
  }

  /* ---------- Monta os cards ---------- */
  var grade = document.querySelector('[data-grade]');
  var VISIVEIS = 6; // quantos cartazes aparecem antes de "Ver Todos os Projetos"
  grade.innerHTML = PROJETOS.map(function (p, i) {
    var extra = i >= VISIVEIS ? ' data-extra hidden' : '';
    var n = (i + 1 < 10 ? '0' : '') + (i + 1);
    return '<li class="revela"' + extra + '><button class="cartaz" type="button" data-projeto="' + i + '" aria-haspopup="dialog">' +
      '<span class="cartaz-foto">' + ph(p.cor, 'Foto do projeto') + img(p.capa, p.titulo, true) +
      '<span class="cartaz-num" aria-hidden="true">' + n + '</span>' +
      '<span class="cartaz-ver" aria-hidden="true">Ver projeto <svg class="ic"><use href="#i-seta"/></svg></span></span>' +
      '<span class="cartaz-info"><small>' + p.categoria + (p.ano ? ' · ' + p.ano : '') + '</small><strong>' + p.titulo + '</strong><span>' + (p.grupo || p.edital) + '</span></span>' +
      '</button></li>';
  }).join('');

  /* ---------- Ver todos os projetos ---------- */
  var btnTodos = document.querySelector('[data-ver-todos]');
  if (PROJETOS.length <= VISIVEIS) btnTodos.parentNode.hidden = true;
  btnTodos.addEventListener('click', function () {
    var aberto = btnTodos.getAttribute('aria-expanded') === 'true';
    grade.querySelectorAll('[data-extra]').forEach(function (li) {
      li.hidden = aberto;
      if (!aberto) requestAnimationFrame(function () { li.classList.add('is-visivel'); });
    });
    btnTodos.setAttribute('aria-expanded', String(!aberto));
    btnTodos.firstChild.textContent = aberto ? 'Ver Todos os Projetos ' : 'Mostrar menos ';
    if (aberto) document.getElementById('projetos').scrollIntoView();
  });

  /* ---------- Modal do projeto ---------- */
  var modal = document.querySelector('[data-modal]');
  var q = function (s) { return modal.querySelector(s); };
  var ultimoFoco = null;

  function abrir(p) {
    q('[data-m-capa]').innerHTML = ph(p.cor, '') + img(p.capa, p.titulo);
    q('[data-m-cat]').textContent = p.categoria;
    q('[data-m-titulo]').textContent = p.titulo;
    q('[data-m-grupo]').textContent = p.grupo || '—';
    q('[data-m-edital]').textContent = p.edital;
    q('[data-m-ano]').textContent = p.ano;
    q('[data-m-ano]').parentNode.hidden = !p.ano;
    q('[data-m-resumo]').textContent = (p.grupo ? 'Projeto de ' + p.grupo : 'Projeto') +
      ' aprovado em: ' + p.edital.split(' · ').join(', ') + (p.ano && p.edital.indexOf(p.ano) < 0 ? ' (' + p.ano + ')' : '') +
      '. Integra o portfólio de projetos, editais e grupos agenciados da Oriri Agência Cultural.';
    var ficha = [['Linguagem', p.categoria], ['Grupo / artista', p.grupo || '—'], ['Edital / fomento', p.edital]];
    if (p.ano) ficha.push(['Ano', p.ano]);
    ficha.push(['Agência', 'Oriri Agência Cultural']);
    q('[data-m-ficha]').innerHTML = ficha.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('');
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

  /* ---------- Parallax horizontal das faixas (ligado ao scroll) ----------
     Descendo a página: fileira de cima → direita, fileira de baixo → esquerda.
     Subindo: o movimento inverte. Suavizado com requestAnimationFrame. */
  var secFaixas = document.querySelector('[data-faixas]');
  var fileiras = [
    { el: document.querySelector('[data-faixa="direita"] .faixa-trilho'), dir: 1 },
    { el: document.querySelector('[data-faixa="esquerda"] .faixa-trilho'), dir: -1 }
  ];
  fileiras.forEach(function (f) { f.modelo = Array.prototype.slice.call(f.el.children); f.atual = null; });
  var curso = 0;        // quanto cada fileira percorre (px) enquanto a seção atravessa a tela
  var rodando = false;

  // duplica os cards até a fileira cobrir a tela + o percurso, sem buracos nas pontas
  function preencher() {
    var vw = document.documentElement.clientWidth;
    curso = Math.round(Math.min(vw * 0.55, 700));
    fileiras.forEach(function (f) {
      var precisa = vw + curso * 2 + 200;
      var guarda = 0;
      while (f.el.scrollWidth < precisa && guarda++ < 12) {
        f.modelo.forEach(function (t) {
          var c = t.cloneNode(true);
          f.el.appendChild(c);
        });
      }
      f.base = -(f.el.scrollWidth - vw) / 2; // centraliza: sobra igual dos dois lados
    });
  }

  function progresso() {
    var r = secFaixas.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = (vh - r.top) / (vh + r.height); // 0 quando a seção entra por baixo, 1 quando sai por cima
    return Math.max(0, Math.min(1, p));
  }

  function quadro() {
    var p = progresso() - 0.5; // -0,5 … 0,5
    var continuar = false;
    fileiras.forEach(function (f) {
      var alvo = f.base + f.dir * p * curso;
      if (f.atual === null) f.atual = alvo;
      f.atual += (alvo - f.atual) * 0.12; // suavização
      if (Math.abs(alvo - f.atual) > 0.3) continuar = true; else f.atual = alvo;
      f.el.style.transform = 'translate3d(' + f.atual.toFixed(2) + 'px,0,0)';
    });
    if (continuar) requestAnimationFrame(quadro); else rodando = false;
  }
  function mover() { if (!rodando) { rodando = true; requestAnimationFrame(quadro); } }

  preencher();
  mover();
  window.addEventListener('scroll', mover, { passive: true });
  window.addEventListener('resize', function () { preencher(); mover(); });

  /* ---------- Contadores (count-up ao entrar na tela) ---------- */
  var numFmt = new Intl.NumberFormat('pt-BR');
  var contadores = document.querySelectorAll('[data-conta]');
  function contar(el) {
    var fim = +el.getAttribute('data-conta');
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

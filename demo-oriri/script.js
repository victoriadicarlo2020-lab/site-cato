/* Oriri Agência Cultural · interações da prévia (sem dependências) */
(function () {
  /* >>> Troque pelo WhatsApp oficial da Oriri (DDI + DDD + número, só dígitos) <<< */
  var WHATSAPP = '5516999999999';

  function linkWhats(msg) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
  }

  /* ---------- Links de WhatsApp ---------- */
  document.querySelectorAll('[data-whats]').forEach(function (a) {
    a.href = linkWhats(a.getAttribute('data-whats'));
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---------- Topo: sombra ao rolar ---------- */
  var topo = document.querySelector('[data-topo]');
  function aoRolar() { topo.classList.toggle('is-rolado', window.scrollY > 10); }
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  /* ---------- Menu mobile ---------- */
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

  /* ---------- Link ativo no menu ---------- */
  var links = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]:not(.btn)'));
  if ('IntersectionObserver' in window) {
    var obsSecao = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('is-atual', l.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) {
      var alvo = document.querySelector(l.getAttribute('href'));
      if (alvo) obsSecao.observe(alvo);
    });
  }

  /* ---------- Revelar ao rolar ---------- */
  var revela = document.querySelectorAll('.revela');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visivel'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revela.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      obs.observe(el);
    });
  } else {
    revela.forEach(function (el) { el.classList.add('is-visivel'); });
  }

  /* ---------- Filtros do portfólio ---------- */
  var filtros = document.querySelector('[data-filtros]');
  var galeria = document.querySelector('[data-galeria]');
  var obras = Array.prototype.slice.call(galeria.querySelectorAll('.obra'));
  var vazia = document.querySelector('[data-vazia]');
  filtros.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var cat = b.getAttribute('data-filtro');
    filtros.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    var visiveis = 0;
    obras.forEach(function (o) {
      var mostra = cat === 'todos' || o.getAttribute('data-cat').split(' ').indexOf(cat) > -1;
      o.classList.toggle('is-oculta', !mostra);
      if (mostra) { visiveis++; o.classList.add('is-visivel'); }
    });
    galeria.classList.toggle('is-filtrada', cat !== 'todos');
    vazia.hidden = visiveis > 0;
  });

  /* ---------- Formulário → WhatsApp ---------- */
  var form = document.querySelector('[data-form]');
  var aviso = form.querySelector('[data-aviso]');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['nome', 'contato', 'demanda'].forEach(function (n) {
      var campo = form.elements[n];
      var vazio = !campo.value.trim();
      campo.closest('.campo').classList.toggle('is-erro', vazio);
      if (vazio && ok) { campo.focus(); ok = false; }
    });
    if (!ok) {
      aviso.textContent = 'Preencha os três campos para a gente conseguir te responder.';
      aviso.classList.add('is-erro');
      return;
    }
    var msg = 'Olá, Oriri! Vim pelo site.\n\n' +
      'Nome: ' + form.elements.nome.value.trim() + '\n' +
      'Contato: ' + form.elements.contato.value.trim() + '\n' +
      'Demanda: ' + form.elements.demanda.value;
    aviso.classList.remove('is-erro');
    aviso.textContent = 'Obrigada! Abrimos o WhatsApp com a sua mensagem pronta para enviar.';
    window.open(linkWhats(msg), '_blank', 'noopener');
    form.reset();
  });
  form.addEventListener('input', function (e) {
    var c = e.target.closest('.campo');
    if (c) c.classList.remove('is-erro');
  });

  /* ---------- Ano no rodapé ---------- */
  var ano = document.querySelector('[data-ano]');
  if (ano) ano.textContent = new Date().getFullYear();
})();

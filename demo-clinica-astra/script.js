/* Clínica Astra · interações da prévia (sem dependências) */
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cabeçalho: transparente → verde ao rolar ---------- */
  var topo = document.querySelector('[data-topo]');
  function aoRolar() { topo.classList.toggle('is-rolado', window.scrollY > 40); }
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

  /* ---------- Hero slider ---------- */
  var hero = document.querySelector('[data-slider]');
  var slides = Array.prototype.slice.call(hero.querySelectorAll('.slide'));
  var pontos = hero.querySelector('[data-pontos]');
  var TEMPO = 6500;
  var atual = 0, timer = null;
  hero.style.setProperty('--tempo', TEMPO + 'ms');

  slides.forEach(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function () { ir(i); reiniciar(); });
    pontos.appendChild(b);
  });
  var botoes = pontos.querySelectorAll('button');

  function ir(n) {
    n = (n + slides.length) % slides.length;
    if (n === atual) return;
    // carrega a imagem do slide antes de mostrar (as fotos usam loading="lazy")
    var img = slides[n].querySelector('img');
    if (img) img.loading = 'eager';
    slides[atual].classList.remove('is-ativo');
    botoes[atual].setAttribute('aria-selected', 'false');
    atual = n;
    slides[atual].classList.add('is-ativo');
    // reinicia a barrinha de progresso
    var b = botoes[atual];
    b.setAttribute('aria-selected', 'true');
    b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
  }
  function proximo() { ir(atual + 1); }
  function iniciar() { if (!reduzMovimento && !timer) timer = setInterval(proximo, TEMPO); }
  function parar() { clearInterval(timer); timer = null; }
  function reiniciar() { parar(); iniciar(); }

  hero.querySelector('[data-prox]').addEventListener('click', function () { ir(atual + 1); reiniciar(); });
  hero.querySelector('[data-ant]').addEventListener('click', function () { ir(atual - 1); reiniciar(); });

  // pausa ao passar o mouse e quando a aba não está visível
  hero.addEventListener('mouseenter', function () { parar(); hero.classList.add('is-pausado'); });
  hero.addEventListener('mouseleave', function () { hero.classList.remove('is-pausado'); iniciar(); });
  document.addEventListener('visibilitychange', function () { document.hidden ? parar() : iniciar(); });

  // arrastar no celular
  var x0 = null;
  hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) { ir(atual + (dx < 0 ? 1 : -1)); reiniciar(); }
    x0 = null;
  });
  // setas do teclado quando o foco está no slider
  hero.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { ir(atual + 1); reiniciar(); }
    if (e.key === 'ArrowLeft') { ir(atual - 1); reiniciar(); }
  });

  // pré-carrega os outros slides depois que a página abriu
  window.addEventListener('load', function () {
    slides.forEach(function (s) { var i = s.querySelector('img'); if (i) i.loading = 'eager'; });
  });
  iniciar();

  /* ---------- Revelar elementos ao rolar ---------- */
  var revelar = document.querySelectorAll('.revela');
  if ('IntersectionObserver' in window && !reduzMovimento) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visivel'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revelar.forEach(function (el) { io.observe(el); });
  } else {
    revelar.forEach(function (el) { el.classList.add('is-visivel'); });
  }

  /* ---------- Vídeos: carregam perto da tela, pausam fora dela ---------- */
  var videos = document.querySelectorAll('video[data-src]');
  function carregar(v) {
    if (v.src) return;
    v.addEventListener('loadeddata', function () { v.classList.add('is-pronto'); });
    v.addEventListener('error', function () { v.removeAttribute('src'); v.load(); }); // falhou: fica a capa verde
    v.src = v.getAttribute('data-src');
    v.load();
  }
  function tocar(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  if ('IntersectionObserver' in window) {
    var io3 = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { carregar(v); if (!reduzMovimento) tocar(v); }
        else if (v.src) v.pause();
      });
    }, { rootMargin: '200px 0px' });
    videos.forEach(function (v) { io3.observe(v); });
  } else {
    videos.forEach(function (v) { carregar(v); if (!reduzMovimento) tocar(v); });
  }
  if (reduzMovimento) videos.forEach(function (v) { v.removeAttribute('autoplay'); v.setAttribute('controls', ''); });

  /* ---------- Menu: marca a seção atual ---------- */
  var links = menu.querySelectorAll('a');
  var alvos = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = alvos.indexOf(en.target);
        links.forEach(function (l, j) { l.classList.toggle('is-atual', j === i); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    alvos.forEach(function (t) { if (t) io2.observe(t); });
  }
})();

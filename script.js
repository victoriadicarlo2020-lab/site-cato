/* Cato Mídias · Home — script.js */
{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* ---------- Dados (Canva "CATO. Institucional") ---------- */
/* Palavras-chave do segmento (faixa âmbar abaixo do topo) — tiradas dos serviços e nichos do manual */
const SEGMENTOS=['Bares e restaurantes','Fotografia gastronômica','Stop motion','Reels e vídeos de venda','Gestão de redes sociais','Design para redes','Produção audiovisual','Alimentos e bebidas','Cobertura de eventos','Negócios locais'];
/* ---------- Catálogo do portfólio ----------
   Fonte da verdade: catalogo-portfolio.json (lido ao carregar a página).
   Esta cópia só é usada quando o JSON não pode ser lido, por exemplo ao abrir index.html direto do disco. */
let CAT={"agencia":"Cato Mídias","especialidade":"Marketing, Audiovisual, Fotografia Gastronômica, Stop Motion e Social Media para Alimentos e Bebidas","repositorio":"victoriadicarlo2020-lab/site-cato","autoria_e_direitos":{"producao_integral":true,"etapas":["Concepção do briefing","Captação de imagens","Tratamento de material","Edição audiovisual","Apresentação final"],"aviso_legal":"Todo o material audiovisual apresentado é de autoria exclusiva da Cato Mídias, que detém o legítimo uso e propriedade intelectual de todas as obras."},"stopmotions_avulsos":{"pasta":"assets/portfolio/stopmotions-destaque/","quantidade":5,"arquivos":["stopmotion-gastronomico-01.mp4","stopmotion-gastronomico-03.mp4","stopmotion-gastronomico-02.mp4","stopmotion-gastronomico-04.mp4","stopmotion-gastronomico-05.mp4"]},"cases":[{"id":"emporio-cervejeiro","cliente":"Empório Cervejeiro","pasta":"assets/portfolio/emporio-cervejeiro/","entregas":{"videos":["video-01.mp4"],"stopmotions":["stopmotion-01.mp4"],"fotos":["foto-01.jpg","foto-02.jpg","foto-03.jpg","foto-04.jpg","foto-05.jpg"]}},{"id":"ponto-do-chopp","cliente":"Ponto do Chopp","pasta":"assets/portfolio/ponto-do-chopp/","entregas":{"videos_apresentacao":["video-apresentacao-01.mp4","video-apresentacao-02.mp4"],"fotos_espaco_apresentacao":["foto-espaco-01.jpg","foto-espaco-02.jpg","foto-espaco-03.jpg","foto-espaco-04.jpg"],"fotos_divulgacao":["foto-divulgacao-01.jpg","foto-divulgacao-02.jpg"]}},{"id":"marmitaria-nova-brasa","cliente":"Marmitaria Nova Brasa","pasta":"assets/portfolio/marmitaria-nova-brasa/","entregas":{"videos":["video-01.mp4","video-02.mp4","video-03.mp4","video-04.mp4"],"fotos":["foto-01.jpg","foto-02.jpg","foto-03.jpg","foto-04.jpg","foto-05.jpg","foto-06.jpg","foto-07.jpg","foto-08.jpg","foto-09.jpg","foto-10.jpg","foto-11.jpg","foto-12.jpg","foto-13.jpg","foto-14.jpg","foto-15.jpg","foto-16.jpg","foto-17.jpg","foto-18.jpg","foto-19.jpg","foto-20.jpg","foto-21.jpg","foto-22.jpg","foto-23.jpg","foto-24.jpg","foto-25.jpg"]}},{"id":"cascata-quintino-ii","cliente":"Cascata Quintino II","pasta":"assets/portfolio/cascata-quintino-ii/","entregas":{"videos_divulgacao":["video-divulgacao-01.mp4","video-divulgacao-02.mp4","video-divulgacao-03.mp4"],"fotos":["foto-01.jpg","foto-02.jpg","foto-03.jpg","foto-04.jpg","foto-05.jpg","foto-06.jpg","foto-07.jpg","foto-08.jpg","foto-09.jpg","foto-10.jpg","foto-11.jpg","foto-12.jpg","foto-13.jpg","foto-14.jpg","foto-15.jpg","foto-16.jpg","foto-17.jpg"]}}]};
const ETAPA_INFO=[
  {i:'clipboard-list',d:'Entendemos o negócio, o público e o objetivo e transformamos tudo isso em roteiro e direção criativa.'},
  {i:'camera',d:'Direção de arte, luz e captação de foto e vídeo no seu espaço, com câmera ou celular.'},
  {i:'sliders-horizontal',d:'Seleção, tratamento das fotos, correção de cor e pós-produção.'},
  {i:'clapperboard',d:'Montagem, ritmo, motion e stop motion quadro a quadro, no formato certo para cada rede.'},
  {i:'presentation',d:'Material revisado, apresentado a você e pronto para publicar.'}
];
const ROT={videos:['Vídeo','vídeos'],stopmotions:['Stop motion','stop motions'],fotos:['Foto','fotos'],videos_apresentacao:['Vídeo de apresentação','vídeos de apresentação'],fotos_espaco_apresentacao:['Foto do espaço','fotos do espaço'],fotos_divulgacao:['Foto de divulgação','fotos de divulgação'],videos_divulgacao:['Vídeo de divulgação','vídeos de divulgação']};
/* s = nome do serviço (rótulo) · n = benefício para o cliente (título do card) */
const SERVS=[
  {s:'Criação de conteúdo audiovisual',n:'Vídeos que mostram por que vale a pena pedir',d:'Reels, vídeos de venda, bastidores e conteúdos de tendência que apresentam seu produto do jeito certo. A gente roteiriza, dirige, grava (com câmera ou celular) e edita.',p:'Captação de vídeos brutos a partir de R$ 250',i:'video'},
  {s:'Design para redes sociais',n:'Um perfil com cara de marca, post após post',d:'Posts, stories, promoções, cardápios e artes para iFood com a sua identidade visual, entregues em até 2 dias úteis depois do briefing.',p:'A partir de R$ 45 por arte',i:'pen-tool'},
  {s:'Gestão de redes sociais',n:'Seu Instagram sempre ativo, sem tomar o seu tempo',d:'Planejamento do mês, feed organizado, legendas, stories e interação com o público. Você aprova o calendário e a gente cuida da frequência.',p:'A partir de R$ 500/mês',i:'calendar-check'},
  {s:'Fotografia',n:'Fotos que passam confiança antes da primeira visita',d:'Fotografia de produto e gastronômica, institucional, de equipe e retratos, tratadas e prontas para redes, cardápio e divulgação.',p:'A partir de R$ 350',i:'camera'},
  {s:'Produção de conteúdo 360°',n:'Um time inteiro, do planejamento à edição',d:'Planejamento, roteiro, direção criativa, captação de foto e vídeo e edição final. Você recebe tudo pronto para postar.',p:'A partir de R$ 650',i:'aperture'}
];
/* Preços de referência (validados com a Cato em 17/11/2026) */
const PRECO={gestao:500,arte:45,bruto:250,c360:650,foto:350,urg:.30};
const MESES_MIN=3;
const STEP=[
  {k:'bruto',n:'Captação de vídeos brutos',u:'diária',sub:'a partir de R$ 250 cada'},
  {k:'c360',n:'Produção de conteúdo 360°',u:'pacote',sub:'a partir de R$ 650 cada'},
  {k:'foto',n:'Fotografia',u:'sessão',sub:'a partir de R$ 350 cada'}
];
const WA='5516981367602';
const brl=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const icon=()=>{try{lucide.createIcons()}catch(e){}};

/* ---------- Marquee ---------- */
const mqItem=SEGMENTOS.map(c=>`<span>${c}</span><span aria-hidden="true">✦</span>`).join('');
$('[data-mq]').innerHTML=mqItem+`<span aria-hidden="true" class="contents">${mqItem}</span>`;

/* ---------- Mídia: caminhos relativos à raiz do site (assets/...) ---------- */
const srcDe=p=>p;
const ehVideo=f=>/\.(mp4|mov|webm)$/i.test(f);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const vis=new IntersectionObserver(es=>es.forEach(en=>{const v=en.target;if(en.isIntersecting)v.play().catch(()=>{});else v.pause()}),{rootMargin:'150px'});
const reduz=matchMedia('(prefers-reduced-motion: reduce)').matches;

const itensDe=c=>Object.entries(c.entregas).flatMap(([k,arr])=>arr.map((f,j)=>({p:c.pasta+f,k,v:ehVideo(f),rot:(ROT[k]||[k])[0],n:j+1,tot:arr.length})));
const resumo=c=>Object.entries(c.entregas).map(([k,a])=>a.length+' '+(a.length>1?(ROT[k]||[k,k])[1]:(ROT[k]||[k])[0].toLowerCase())).join(' · ');
const capa=c=>itensDe(c).find(x=>!x.v);

/* ---------- Etapas + aviso de autoria ---------- */
const drawAutoria=()=>{
  const E=CAT.autoria_e_direitos.etapas;
  $('[data-etapas]').innerHTML=E.map((n,i)=>{const x=ETAPA_INFO[i]||{i:'circle',d:''};return `
    <li class="tl-step" style="--i:${i}">
      <div class="flex items-center justify-between"><span class="tl-n font-mono text-sm font-bold">0${i+1}</span><i data-lucide="${x.i}" class="h-6 w-6 text-white/80"></i></div>
      <h3 class="mt-4 text-lg font-extrabold leading-tight">${esc(n)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-white/70">${x.d}</p>
    </li>`}).join('');
  $$('[data-aviso]').forEach(el=>el.textContent=CAT.autoria_e_direitos.aviso_legal);
  $('[data-etapas-txt]').textContent=E.join(' → ');
};

/* ---------- Stop motions em destaque ---------- */
const drawStops=()=>{
  const s=CAT.stopmotions_avulsos;
  $('[data-stops]').innerHTML=s.arquivos.map((f,i)=>`
  <figure class="sm-item">
    <button type="button" class="relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black shadow-[8px_8px_0_#000] transition hover:-translate-y-1" data-stop="${i}" aria-label="Ampliar stop motion gastronômico 0${i+1}">
      <video class="absolute inset-0 h-full w-full object-cover" ${reduz?'':'autoplay'} loop muted playsinline preload="metadata" data-auto src="${srcDe(s.pasta+f)}"></video>
      <span class="absolute left-3 top-3 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] font-bold text-ambar">SM 0${i+1}</span>
      <span class="rec absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-verm"></span>
    </button>
    <figcaption class="sr-only">Stop motion gastronômico 0${i+1} · Produção integral Cato Mídias</figcaption>
  </figure>`).join('');
  $$('[data-stops] video').forEach(v=>{v.muted=true;if(!reduz)vis.observe(v)});
};
const stopCase=()=>({id:'stopmotions',cliente:'Stop motions em destaque',pasta:CAT.stopmotions_avulsos.pasta,entregas:{stopmotions:CAT.stopmotions_avulsos.arquivos}});
$('[data-stops]').addEventListener('click',e=>{const b=e.target.closest('[data-stop]');if(b)abrirLB(stopCase(),+b.dataset.stop)});

/* ---------- Portfólio por case ---------- */
let filtro='todos';
const fBox=$('[data-filters]'),pBox=$('[data-port]');
const drawFilters=()=>{
  const abas=[{id:'todos',cliente:'Todos os cases'},...CAT.cases];
  fBox.innerHTML=abas.map(c=>`<button role="tab" aria-selected="${c.id===filtro}" data-g="${c.id}" class="shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${c.id===filtro?'bg-ambar text-black':'border border-white/25 hover:border-ambar hover:text-ambar'}">${esc(c.cliente)}</button>`).join('');
};
const tile=(x,i,c)=>`
  <button type="button" class="tile group relative aspect-[4/5] overflow-hidden rounded-2xl bg-quase text-left" data-i="${i}" aria-label="Abrir ${esc(x.rot.toLowerCase())} ${x.n} de ${x.tot} · ${esc(c.cliente)}">
    ${x.v?`<video muted loop playsinline preload="metadata" src="${srcDe(x.p)}#t=0.1"></video>`
         :`<img loading="lazy" decoding="async" alt="${esc(x.rot)} ${x.n} · ${esc(c.cliente)}" src="${srcDe(x.p)}">`}
    <span class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></span>
    <span class="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${x.v?'bg-ambar text-black':'bg-black/70 text-white'}">${esc(x.rot)}</span>
    ${x.v?`<span class="tile-play absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-white text-black transition"><i data-lucide="play" class="ml-0.5 h-5 w-5"></i></span>`:''}
    <span class="absolute bottom-3 left-3 font-mono text-[11px] font-bold text-white/85">${String(x.n).padStart(2,'0')}/${String(x.tot).padStart(2,'0')}</span>
  </button>`;
const etapasLista=()=>`<ul class="mt-3 space-y-2">${CAT.autoria_e_direitos.etapas.map(n=>`<li class="flex items-center gap-2 text-sm"><i data-lucide="check" class="h-4 w-4 shrink-0 text-ambar"></i>${esc(n)}</li>`).join('')}</ul>`;
const fichaCase=(c,botao)=>`
  <p class="label text-ambar">Case · produção integral</p>
  <h3 class="mt-2 text-3xl font-extrabold leading-tight">${esc(c.cliente)}</h3>
  <dl class="mt-5 space-y-2 text-sm">${Object.entries(c.entregas).map(([k,a])=>`<div class="flex justify-between gap-3 border-b border-white/10 pb-2"><dt class="text-white/70">${esc(a.length>1?(ROT[k]||[k,k])[1]:(ROT[k]||[k])[0])}</dt><dd class="font-bold tabular-nums">${a.length}</dd></div>`).join('')}</dl>
  <p class="label mt-6 text-white/60">Etapas realizadas pela Cato</p>
  ${etapasLista()}
  <p class="mt-6 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/65"><i data-lucide="badge-check" class="h-4 w-4 shrink-0 text-ambar"></i><span>${esc(CAT.autoria_e_direitos.aviso_legal)}</span></p>
  ${botao?`<button type="button" class="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ambar px-5 py-3.5 font-bold text-black transition hover:-translate-y-0.5" data-abrir="0"><i data-lucide="images" class="h-5 w-5"></i>Abrir galeria</button>`:''}`;
const drawPort=()=>{
  if(filtro==='todos'){
    pBox.innerHTML=`<div class="grid gap-5 sm:grid-cols-2">${CAT.cases.map(c=>{const cp=capa(c);return `
      <button type="button" class="case group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-quase text-left" data-case="${c.id}">
        ${cp?`<img loading="lazy" decoding="async" alt="${esc(c.cliente)}" src="${srcDe(cp.p)}" class="transition duration-700 group-hover:scale-105">`:''}
        <span class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></span>
        <span class="absolute inset-x-0 bottom-0 block p-6">
          <span class="block text-2xl font-extrabold leading-tight">${esc(c.cliente)}</span>
          <span class="mt-1 block text-sm text-white/80">${resumo(c)}</span>
          <span class="mt-4 inline-flex items-center gap-2 rounded-full bg-ambar px-4 py-2 text-sm font-bold text-black transition group-hover:shadow-[0_5px_0_#B70223]">Ver case <i data-lucide="arrow-right" class="h-4 w-4"></i></span>
        </span>
      </button>`}).join('')}</div>`;
  } else {
    const c=CAT.cases.find(x=>x.id===filtro),it=itensDe(c);
    pBox.innerHTML=`<div class="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside class="self-start rounded-3xl bg-quase p-6 lg:sticky lg:top-24">${fichaCase(c,true)}</aside>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">${it.map((x,i)=>tile(x,i,c)).join('')}</div>
    </div>`;
  }
  icon();
};
fBox.addEventListener('click',e=>{const b=e.target.closest('[data-g]');if(!b)return;filtro=b.dataset.g;drawFilters();drawPort()});
pBox.addEventListener('click',e=>{
  const cs=e.target.closest('[data-case]');
  if(cs){filtro=cs.dataset.case;drawFilters();drawPort();$('#portfolio').scrollIntoView({behavior:reduz?'auto':'smooth'});return}
  const t=e.target.closest('[data-i],[data-abrir]');
  if(t)abrirLB(CAT.cases.find(x=>x.id===filtro),+(t.dataset.i??t.dataset.abrir));
});
pBox.addEventListener('mouseover',e=>{const t=e.target.closest('.tile');const v=t&&t.querySelector('video');if(v&&v.paused)v.play().catch(()=>{})});
pBox.addEventListener('mouseout',e=>{const t=e.target.closest('.tile');if(t&&!t.contains(e.relatedTarget)){const v=t.querySelector('video');if(v)v.pause()}});

/* ---------- Galeria (lightbox) ---------- */
const lb=$('[data-lb]'),stage=$('[data-lb-stage]');let LB={c:null,it:[],i:0},lastFocus=null;
const mostrar=()=>{
  const x=LB.it[LB.i];
  stage.innerHTML=x.v
    ?`<video controls autoplay playsinline src="${srcDe(x.p)}"></video>`
    :`<img alt="${esc(x.rot)} ${x.n} · ${esc(LB.c.cliente)}" src="${srcDe(x.p)}">`;
  const v=stage.querySelector('video');if(v)v.play().catch(()=>{});
  $('[data-lb-tit]').textContent=LB.c.cliente;
  $('[data-lb-sub]').textContent=`${x.rot} ${x.n} de ${x.tot} · item ${LB.i+1} de ${LB.it.length} · © Cato Mídias`;
  $$('[data-lb-nav]').forEach(b=>b.hidden=LB.it.length<2);
};
function abrirLB(c,i){
  lastFocus=document.activeElement;LB={c,it:itensDe(c),i:i||0};
  $('[data-lb-info]').innerHTML=fichaCase(c,false);
  lb.classList.remove('hidden');document.documentElement.style.overflow='hidden';
  mostrar();icon();$('[data-lb-close]').focus();
}
const fecharLB=()=>{stage.innerHTML='';lb.classList.add('hidden');document.documentElement.style.overflow='';lastFocus&&lastFocus.focus()};
const nav=d=>{LB.i=(LB.i+d+LB.it.length)%LB.it.length;mostrar()};
lb.addEventListener('click',e=>{
  if(e.target.closest('[data-lb-close]'))return fecharLB();
  const n=e.target.closest('[data-lb-nav]');if(n)return nav(+n.dataset.lbNav);
  if(e.target===stage)fecharLB();
});
document.addEventListener('keydown',e=>{if(lb.classList.contains('hidden'))return;
  if(e.key==='Escape')fecharLB();else if(e.key==='ArrowRight')nav(1);else if(e.key==='ArrowLeft')nav(-1);
  else if(e.key==='Tab'){const f=$$('button,video[controls]',lb).filter(el=>!el.hidden&&el.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
let tx=null;stage.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
stage.addEventListener('touchend',e=>{if(tx===null)return;const dx=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(dx)>50)nav(dx<0?1:-1)});

const drawAll=()=>{drawAutoria();drawStops();drawFilters();drawPort()};
drawAll();
/* Lê o catálogo do repositório: arquivo novo no JSON aparece no site sem mexer no código */
fetch('catalogo-portfolio.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(j=>{
  if(j&&j.cases&&JSON.stringify(j)!==JSON.stringify(CAT)){CAT=j;drawAll()}
}).catch(()=>{});

/* ---------- Serviços ---------- */
$('[data-servs]').innerHTML=SERVS.map((s,i)=>`
  <article class="rv d${i%3} group flex flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_14px_0_#B70223]">
    <header class="flex items-center gap-4 bg-black p-5 text-white">
      <span class="star grid h-14 w-14 shrink-0 place-items-center bg-ambar text-xl font-black text-black transition duration-500 group-hover:rotate-45"><span class="transition duration-500 group-hover:-rotate-45">${i+1}</span></span>
      <div><p class="text-[11px] font-bold uppercase tracking-[.14em] text-ambar">${s.s}</p><h3 class="mt-1 text-lg font-extrabold leading-tight">${s.n}</h3></div>
    </header>
    <div class="flex flex-1 flex-col bg-ambar p-6">
      <p class="flex-1 text-[15px] leading-relaxed">${s.d}</p>
      <p class="mt-5 inline-flex items-center gap-2 text-sm font-extrabold"><i data-lucide="${s.i}" class="h-5 w-5"></i>${s.p}</p>
    </div>
  </article>`).join('')+`
  <a href="#simulador" class="rv d2 group flex flex-col justify-between rounded-3xl bg-black p-6 text-white transition duration-300 hover:-translate-y-2 hover:shadow-[0_14px_0_#FCA001]">
    <i data-lucide="calculator" class="h-10 w-10 text-ambar"></i>
    <div class="mt-10"><p class="text-2xl font-extrabold leading-tight">Monte seu pacote e veja o valor de referência na hora.</p>
    <p class="mt-4 inline-flex items-center gap-2 font-bold text-ambar">Simular meu orçamento <i data-lucide="arrow-right" class="h-5 w-5 transition group-hover:translate-x-1"></i></p></div>
  </a>`;
const pts=[];for(let i=0;i<24;i++){const a=i/24*Math.PI*2-Math.PI/2,r=i%2?42:50;pts.push(`${(50+r*Math.cos(a)).toFixed(1)}% ${(50+r*Math.sin(a)).toFixed(1)}%`)}
$$('.star').forEach(e=>e.style.clipPath=`polygon(${pts.join(',')})`);

/* ---------- Simulador ---------- */
const S={gestao:true,artes:8,bruto:0,c360:1,foto:0,stop:false,urg:false};
const PRESETS={redes:{gestao:true,artes:12,bruto:0,c360:0,foto:0,stop:false,urg:false},video:{gestao:true,artes:8,bruto:1,c360:1,foto:0,stop:false,urg:false},full:{gestao:true,artes:16,bruto:1,c360:1,foto:1,stop:true,urg:false},zero:{gestao:false,artes:0,bruto:0,c360:0,foto:0,stop:false,urg:false}};
$('[data-steppers]').innerHTML=STEP.map(s=>`
  <div class="flex items-center justify-between gap-4 rounded-2xl bg-quase p-4">
    <div><p class="font-bold">${s.n}</p><p class="text-sm text-white/65">${s.sub}</p></div>
    <div class="flex shrink-0 items-center gap-1 rounded-full border border-white/20 p-1">
      <button type="button" class="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/10" aria-label="Menos ${s.n}" data-st="${s.k}" data-d="-1"><i data-lucide="minus" class="h-4 w-4"></i></button>
      <output class="w-8 text-center text-lg font-extrabold" data-out="${s.k}">0</output>
      <button type="button" class="grid h-10 w-10 place-items-center rounded-full bg-ambar text-black transition hover:scale-105" aria-label="Mais ${s.n}" data-st="${s.k}" data-d="1"><i data-lucide="plus" class="h-4 w-4"></i></button>
    </div>
  </div>`).join('');

/* Valores do simulador: soma simples dos serviços escolhidos */
const nServ=()=>[S.gestao,S.artes>0,S.bruto>0,S.c360>0,S.foto>0,S.stop].filter(Boolean).length;
const calc=()=>{
  const m=(S.gestao?PRECO.gestao:0)+S.artes*PRECO.arte;
  const base=S.bruto*PRECO.bruto+S.c360*PRECO.c360+S.foto*PRECO.foto;
  const a=Math.round(base*(S.urg?1+PRECO.urg:1));
  const n=nServ();
  return{m,base,a,n,fm:m,fa:a};
};
const par=(x,y)=>[x?brl(x)+'/mês':'',y?brl(y):''].filter(Boolean).join(' + ')||brl(0);
const linhas=()=>{
  const L=[];
  if(S.gestao)L.push(['Gestão de redes sociais',brl(PRECO.gestao)+'/mês']);
  if(S.artes)L.push([`${S.artes} arte${S.artes>1?'s':''} por mês`,brl(S.artes*PRECO.arte)+'/mês']);
  STEP.forEach(s=>{if(S[s.k])L.push([`${s.n} · ${S[s.k]} ${S[s.k]>1?(s.u==='sessão'?'sessões':s.u+'s'):s.u}`,brl(S[s.k]*PRECO[s.k])])});
  if(S.stop)L.push(['Stop motion','sob consulta']);
  if(S.urg&&calc().base)L.push(['Urgência (+30% no avulso)',brl(calc().a-calc().base)]);
  return L;
};
const mensagem=()=>{
  const c=calc(),nome=$('[data-nome]').value.trim();
  let t='Olá, Cato! Fiz uma simulação no site e quero receber um orçamento.\n';
  if(nome)t+=`\nNome/negócio: ${nome}\n`;
  t+='\n'+linhas().map(([k,v])=>`• ${k}: ${v}`).join('\n');
  if(!linhas().length)t+='• Ainda não escolhi os serviços';
  t+=`\n\nServiços selecionados: ${c.n}`;
  t+=`\nValor final: mensal a partir de ${brl(c.fm)} · avulso a partir de ${brl(c.fa)}`;
  if(c.m)t+=`\nContrato mínimo de ${MESES_MIN} meses: a partir de ${brl(c.fm*MESES_MIN)}`;
  return t;
};
const tween=(el,to)=>{const from=+(el.dataset.v||0);el.dataset.v=to;const t0=performance.now(),dur=450;
  const f=now=>{const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=brl(Math.round(from+(to-from)*e));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const render=()=>{
  const c=calc();
  tween($('[data-tot="m"]'),c.fm);tween($('[data-tot="a"]'),c.fa);
  $('[data-contrato]').classList.toggle('hidden',!c.m);if(c.m)tween($('[data-tot="c"]'),c.fm*MESES_MIN);
  $('[data-r="n"]').textContent=c.n?`${c.n} serviço${c.n>1?'s':''}`:'Nenhum ainda';
  $('[data-r="fin"]').textContent=par(c.fm,c.fa);
  $('[data-k="gestao"]').checked=S.gestao;$('[data-k="stop"]').checked=S.stop;$('[data-k="urg"]').checked=S.urg;
  $('[data-k="artes"]').value=S.artes;$('[data-out="artes"]').textContent=S.artes;
  STEP.forEach(s=>$(`[data-out="${s.k}"]`).textContent=S[s.k]);
  const L=linhas();
  $('[data-lines]').innerHTML=L.length?L.map(([k,v])=>`<li class="flex justify-between gap-4 border-b border-black/15 pb-2"><span>${k}</span><span class="whitespace-nowrap font-bold">${v}</span></li>`).join(''):'<li class="text-black/70">Escolha pelo menos um serviço ao lado.</li>';
  $('[data-wa]').href=`https://wa.me/${WA}?text=${encodeURIComponent(mensagem())}`;
};
$('#simulador').addEventListener('input',e=>{const k=e.target.dataset&&e.target.dataset.k;if(!k)return;S[k]=e.target.type==='checkbox'?e.target.checked:+e.target.value;render()});
$('#simulador').addEventListener('change',e=>{const k=e.target.dataset&&e.target.dataset.k;if(k&&e.target.type==='checkbox'){S[k]=e.target.checked;render()}});
$('[data-nome]').addEventListener('input',render);
$('[data-steppers]').addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;const k=b.dataset.st;S[k]=Math.max(0,Math.min(20,S[k]+ +b.dataset.d));render()});
$('[data-presets]').addEventListener('click',e=>{const b=e.target.closest('[data-preset]');if(!b)return;Object.assign(S,PRESETS[b.dataset.preset]);render()});
$('[data-copy]').addEventListener('click',async e=>{const sp=$('span',e.currentTarget);try{await navigator.clipboard.writeText(mensagem());sp.textContent='Resumo copiado'}catch(err){sp.textContent='Não deu para copiar'}setTimeout(()=>sp.textContent='Copiar resumo',2200)});
render();

/* ---------- Formulário ---------- */
const form=$('[data-form]');
const showErr=(n,bad)=>{$(`[data-e="${n}"]`).classList.toggle('hidden',!bad);form.elements[n].classList.toggle('err',bad);form.elements[n].setAttribute('aria-invalid',bad)};
form.elements.tel.addEventListener('input',e=>{let d=e.target.value.replace(/\D/g,'').slice(0,11);e.target.value=d.length>6?`(${d.slice(0,2)}) ${d.slice(2,d.length-4)}-${d.slice(-4)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d});
form.addEventListener('submit',e=>{
  e.preventDefault();const f=form.elements;
  const v={nome:f.nome.value.trim().length<2,tel:f.tel.value.replace(/\D/g,'').length<10,mail:f.mail.value.trim()!==''&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.mail.value.trim()),msg:f.msg.value.trim().length<10};
  Object.entries(v).forEach(([n,b])=>showErr(n,b));
  const first=Object.keys(v).find(n=>v[n]);if(first){f[first].focus();return}
  let t=`Olá, Cato! Meu nome é ${f.nome.value.trim()}.\nWhatsApp: ${f.tel.value}`+(f.mail.value.trim()?`\nE-mail: ${f.mail.value.trim()}`:'')+`\nInteresse: ${f.serv.value}\n\n${f.msg.value.trim()}`;
  if(f.sim.checked)t+='\n\n— Minha simulação —\n'+mensagem().split('\n').slice(1).join('\n').trim();
  $('[data-ok-wa]').href=`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
  $('[data-ok-mail]').href=`mailto:catomidias@gmail.com?subject=${encodeURIComponent('Orçamento pelo site — '+f.nome.value.trim())}&body=${encodeURIComponent(t)}`;
  $('[data-ok]').classList.remove('hidden');$('[data-ok-wa]').focus();
});


/* ---------- Header, menu, digitação, reveal ---------- */
const hdr=$('[data-hdr]');
const onScroll=()=>{
  hdr.classList.toggle('solid',scrollY>40||!$('[data-menu]').classList.contains('hidden'));
  const y=Math.min(innerHeight-1,hdr.offsetHeight/2);
  const el=document.elementsFromPoint(innerWidth/2,y).find(n=>!hdr.contains(n));
  const z=el&&el.closest('[data-tone]');
  hdr.dataset.tone=scrollY<40?'dark':(z?z.dataset.tone:'dark');
};
addEventListener('resize',onScroll);
addEventListener('scroll',onScroll,{passive:true});onScroll();
const mb=$('[data-menu-btn]'),mn=$('[data-menu]');
mb.addEventListener('click',()=>{const o=mn.classList.toggle('hidden');mb.setAttribute('aria-expanded',!o);onScroll()});
$$('a',mn).forEach(a=>a.addEventListener('click',()=>{mn.classList.add('hidden');mb.setAttribute('aria-expanded','false')}));
const ty=$('[data-type]');if(ty&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const w=ty.dataset.type;let i=0;ty.textContent='';const tick=()=>{ty.textContent=w.slice(0,++i);if(i<w.length)setTimeout(tick,110)};setTimeout(tick,500)}
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{threshold:.12});
$$('.rv,[data-tl]').forEach(el=>io.observe(el));
icon();
}

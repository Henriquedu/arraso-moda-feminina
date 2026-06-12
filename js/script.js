
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const routes = {
  vestido: 'feminino/vestidos/', vestidos: 'feminino/vestidos/',
  calca: 'feminino/calcas/', calcas: 'feminino/calcas/', jeans: 'feminino/calcas/', alfaiataria: 'feminino/calcas/',
  blusa: 'feminino/blusas/', blusas: 'feminino/blusas/',
  look: 'feminino/looks-e-combinacoes/', looks: 'feminino/looks-e-combinacoes/', combinacao: 'feminino/looks-e-combinacoes/', combinacoes: 'feminino/looks-e-combinacoes/', casual: 'feminino/looks-e-combinacoes/',
  blazer: 'feminino/blazer/', shorts: 'feminino/shorts/', saia: 'feminino/saia/', saias: 'feminino/saia/',
  acessorio: 'acessorios/', acessorios: 'acessorios/', brinco: 'acessorios/brincos/', brincos: 'acessorios/brincos/',
  colar: 'acessorios/colares/', colares: 'acessorios/colares/', cinto: 'acessorios/cintos/', cintos: 'acessorios/cintos/',
  bolsa: 'bolsas/', bolsas: 'bolsas/', contato: 'contato/', whatsapp: 'contato/', instagram: 'contato/', facebook: 'contato/',
  troca: 'trocas-e-devolucoes/', trocas: 'trocas-e-devolucoes/', devolucao: 'trocas-e-devolucoes/', privacidade: 'politica-de-privacidade/'
};

function basePath() {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  const known = ['feminino','acessorios','bolsas','contato','trocas-e-devolucoes','quem-somos','politica-de-privacidade'];
  const idx = parts.findIndex(part => known.includes(part));
  if (idx === -1) return './';
  return '../'.repeat(parts.length - idx);
}

function normalize(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function runSearch(value) {
  const term = normalize(value);
  const key = Object.keys(routes).find(item => term.includes(item));
  window.location.href = basePath() + (key ? routes[key] : 'feminino/');
}

$$('.search-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const input = $('input', form);
    if (input && input.value.trim()) runSearch(input.value);
  });
});

const searchPanel = $('.search-panel');
$('.search-toggle')?.addEventListener('click', () => {
  searchPanel?.classList.add('open');
  searchPanel?.setAttribute('aria-hidden', 'false');
  $('.search-panel input')?.focus();
});
$('.close-search')?.addEventListener('click', () => {
  searchPanel?.classList.remove('open');
  searchPanel?.setAttribute('aria-hidden', 'true');
});
searchPanel?.addEventListener('click', event => {
  if (event.target === searchPanel) searchPanel.classList.remove('open');
});

const menu = $('.mobile-menu');
const overlay = $('.mobile-overlay');
const toggle = $('.menu-toggle');
function openMenu() { menu?.classList.add('open'); overlay?.classList.add('open'); document.body.style.overflow = 'hidden'; toggle?.setAttribute('aria-expanded', 'true'); }
function closeMenu() { menu?.classList.remove('open'); overlay?.classList.remove('open'); document.body.style.overflow = ''; toggle?.setAttribute('aria-expanded', 'false'); }
toggle?.addEventListener('click', openMenu);
$('.mobile-close')?.addEventListener('click', closeMenu);
overlay?.addEventListener('click', closeMenu);
$$('.submenu-btn').forEach(button => {
  button.addEventListener('click', () => {
    button.nextElementSibling?.classList.toggle('open');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(item => observer.observe(item));

const cookie = $('.cookie-bar');
if (localStorage.getItem('arrasoCookies') === 'ok') cookie?.classList.add('hide');
$('.cookie-bar button')?.addEventListener('click', () => {
  localStorage.setItem('arrasoCookies', 'ok');
  cookie?.classList.add('hide');
});

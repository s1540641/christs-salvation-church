// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navList = document.getElementById('nav-list');
menuBtn.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navList.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navList.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// Gift amount buttons
const amtButtons = document.querySelectorAll('.amts button');
const giveLink = document.getElementById('give-link');
const baseLink = giveLink.getAttribute('href');
amtButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    amtButtons.forEach(b => b.setAttribute('aria-pressed', b === btn));
    // Uncomment if your giving provider accepts an amount in the link:
    // giveLink.href = `${baseLink}?amount=${btn.dataset.amt}`;
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Photo viewer (works for every gallery on the page)
const items = [...document.querySelectorAll('.g-item')];
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
let group = [];
let current = 0;

function showPhoto(i) {
  current = (i + group.length) % group.length;
  lbImg.src = group[current].dataset.full;
  lbImg.alt = group[current].querySelector('img').alt;
}
function openLightbox(item) {
  group = items.filter(x => x.dataset.group === item.dataset.group);
  showPhoto(group.indexOf(item));
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  lb.querySelector('.lb-close').focus();
}
function closeLightbox() {
  lb.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
  group[current].focus();
}

items.forEach(item => item.addEventListener('click', () => openLightbox(item)));
lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
lb.querySelector('.lb-prev').addEventListener('click', () => showPhoto(current - 1));
lb.querySelector('.lb-next').addEventListener('click', () => showPhoto(current + 1));
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPhoto(current - 1);
  if (e.key === 'ArrowRight') showPhoto(current + 1);
});

// Hero slideshow
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const slides = [...hero.querySelectorAll('.slide')];
  const dotsWrap = hero.querySelector('.dots');
  const pauseBtn = hero.querySelector('.slide-pause');
  if (slides.length < 2) {
    const c = hero.querySelector('.slide-controls');
    if (c) c.hidden = true;
    return;
  }

  const INTERVAL = 5000; // milliseconds between photos
  let index = 0;
  let timer = null;
  let userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const dots = slides.map((slide, i) => {
    slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dot';
    b.setAttribute('aria-label', `Show photo ${i + 1}`);
    b.addEventListener('click', () => { show(i); restart(); });
    dotsWrap.appendChild(b);
    return b;
  });

  function show(n) {
    index = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
  }
  function start() {
    if (timer || userPaused) return;
    timer = setInterval(() => show(index + 1), INTERVAL);
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  function updatePauseLabel() {
    pauseBtn.textContent = userPaused ? 'Play' : 'Pause';
    pauseBtn.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
  }
  pauseBtn.addEventListener('click', () => {
    userPaused = !userPaused;
    updatePauseLabel();
    userPaused ? stop() : start();
  });

  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', start);

  show(0);
  updatePauseLabel();
  start();
})();
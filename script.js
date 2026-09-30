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

// Conference gallery viewer
const items = [...document.querySelectorAll('.g-item')];
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
let current = 0;

function showPhoto(i) {
  current = (i + items.length) % items.length;
  lbImg.src = items[current].dataset.full;
  lbImg.alt = items[current].querySelector('img').alt;
}
function openLightbox(i) {
  showPhoto(i);
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  lb.querySelector('.lb-close').focus();
}
function closeLightbox() {
  lb.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
  items[current].focus();
}

items.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
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
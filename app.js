const catEmojis = ['🐱','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🐈','🐈‍⬛'];
const floatingContainer = document.getElementById('floatingCats');

function spawnFloatingCat() {
  const el = document.createElement('div');
  el.className = 'floating-cat';
  el.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (1 + Math.random() * 2) + 'rem';
  const dur = 10 + Math.random() * 20;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = (Math.random() * -dur) + 's';
  floatingContainer.appendChild(el);
  setTimeout(() => el.remove(), (dur + 5) * 1000);
}

for (let i = 0; i < 20; i++) spawnFloatingCat();
setInterval(spawnFloatingCat, 2000);

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.padding = window.scrollY > 80 ? '0.6rem 2rem' : '1rem 2rem';
}, { passive: true });

const meows = ['meow!', 'MEOW!', 'mrrrow~', 'purrr...', '*hiss*', 'mew!', 'MREOW!', '=^.^=', 'nya~', '*chirp*'];
const meowPopup = document.getElementById('meowPopup');
const meowBtn = document.getElementById('meowBtn');

meowBtn.addEventListener('click', (e) => {
  const rect = e.target.getBoundingClientRect();
  meowPopup.textContent = meows[Math.floor(Math.random() * meows.length)];
  meowPopup.style.left = (rect.left + rect.width / 2 - 30) + 'px';
  meowPopup.style.top = (rect.top - 10) + 'px';
  meowPopup.classList.remove('visible');
  void meowPopup.offsetWidth;
  meowPopup.classList.add('visible');
  setTimeout(() => meowPopup.classList.remove('visible'), 1200);
});

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 40);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); counterObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animated'));
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

const catFacts = [
  "Cats sleep 12–16 hours a day. They're basically furry batteries that never fully charge.",
  "A group of cats is called a clowder. A group of kittens is called a kindle.",
  "Cats can make over 100 different sounds. Dogs can only make about 10.",
  "Cats have 32 muscles in each ear, letting them rotate them 180 degrees.",
  "A cat's nose print is unique — like a human fingerprint.",
  "Cats can't taste sweetness because they lack the taste receptor gene for it.",
  "Indoor cats can live up to 20 years. That's a lot of naps.",
  "Cats use their whiskers to measure whether they can fit through a gap.",
  "The oldest known pet cat was found in a 9,500-year-old grave in Cyprus.",
  "Cats purr at 25–150 Hz — a frequency known to promote healing in bones.",
  "A cat's brain is biologically closer to a human's than a dog's.",
  "Cats have a special organ (Jacobson's organ) that lets them 'taste' the air.",
  "The average cat can jump about 6 times its body length in a single bound.",
  "Cats have a third eyelid called a nictitating membrane to protect their eyes.",
  "Cat headbutting (bunting) means they're marking you with their scent — you belong to them now.",
];

let lastFactIndex = -1;
const catFactEl = document.getElementById('catFact');

function showRandomFact() {
  let idx;
  do { idx = Math.floor(Math.random() * catFacts.length); } while (idx === lastFactIndex);
  lastFactIndex = idx;
  catFactEl.style.opacity = 0;
  setTimeout(() => {
    catFactEl.textContent = catFacts[idx];
    catFactEl.style.transition = 'opacity 0.4s';
    catFactEl.style.opacity = 1;
  }, 200);
}

document.getElementById('newFactBtn').addEventListener('click', showRandomFact);
showRandomFact();

const pixelCat = document.getElementById('pixelCat');
const catSounds = ['meow!', 'purr...', 'mrrow!', 'nya~'];
if (pixelCat) {
  pixelCat.addEventListener('click', (e) => {
    const popup = document.createElement('div');
    popup.textContent = catSounds[Math.floor(Math.random() * catSounds.length)];
    popup.style.cssText = `
      position:fixed; left:${e.clientX - 20}px; top:${e.clientY - 40}px;
      font-family:monospace; font-weight:700; color:#ff6b6b;
      font-size:1rem; pointer-events:none; z-index:999;
      animation:popUp 1s forwards;
      text-shadow: 0 0 8px rgba(255,107,107,0.6);
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1100);
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .contact-card, .fact, .skill-group').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s, transform 0.5s';
  revealObserver.observe(el);
});

const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konami.length) { konamiIdx = 0; rainCats(); }
  } else { konamiIdx = 0; }
});

function rainCats() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const cat = document.createElement('div');
      cat.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)];
      cat.style.cssText = `
        position:fixed;
        left:${Math.random() * 100}vw;
        top:-50px;
        font-size:${1.5 + Math.random() * 2}rem;
        pointer-events:none;
        z-index:9999;
        animation: fall ${1.5 + Math.random()}s linear forwards;
      `;
      document.body.appendChild(cat);
      setTimeout(() => cat.remove(), 3000);
    }, i * 60);
  }
  if (!document.getElementById('fallStyle')) {
    const s = document.createElement('style');
    s.id = 'fallStyle';
    s.textContent = '@keyframes fall { to { transform: translateY(110vh) rotate(720deg); } }';
    document.head.appendChild(s);
  }
}

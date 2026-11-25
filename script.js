// Image slider - vanilla JS: arrows, dots, keyboard, swipe, autoplay.
const slider = document.querySelector('.slider'), track = document.getElementById('track'), dots = document.getElementById('dots');
const total = track.children.length; let i = 0, timer;

for (let n = 0; n < total; n++) {
  const d = document.createElement('button'); d.type = 'button'; d.setAttribute('aria-label', `Go to slide ${n + 1}`);
  d.addEventListener('click', () => { go(n); restart(); }); dots.appendChild(d);
}
function go(n) {
  i = (n + total) % total; track.style.transform = `translateX(-${i * 100}%)`;
  [...dots.children].forEach((d, k) => d.setAttribute('aria-current', k === i));
}
const restart = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 4000); };

document.getElementById('next').addEventListener('click', () => { go(i + 1); restart(); });
document.getElementById('prev').addEventListener('click', () => { go(i - 1); restart(); });
slider.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); });
slider.addEventListener('mouseenter', () => clearInterval(timer)); slider.addEventListener('mouseleave', restart);

let x0 = null; // swipe
slider.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
slider.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null; restart(); });

go(0); restart();

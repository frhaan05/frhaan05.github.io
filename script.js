/* ─────────────────────────────────────────
   Muhammad Farhan Fahad — Portfolio JS
   script.js
───────────────────────────────────────── */

/* ── CONSTELLATION CANVAS ── */
const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / 10000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.6
    });
  }
}
initParticles();

function drawConstellation() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100,160,255,0.7)';
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(80,140,255,${0.15 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawConstellation);
}
drawConstellation();

/* ── TYPING EFFECT ── */
const phrases = [
  'Exploring Generative AI & Intelligent Systems',
  'Building LLMs · RAG · AI Agents',
  'Turning Ideas into Real AI Systems',
  'Python · FastAPI · Deep Learning'
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const cur = phrases[pi];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = cur.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 40 : 65);
}
setTimeout(type, 800);

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── SKILL BARS ── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const bars = e.target.querySelectorAll('.skill-bar');
      bars.forEach(b => {
        b.style.width = b.dataset.pct + '%';
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.tech-card').forEach(c => barObserver.observe(c));

/* ── CONTACT FORM ── */
function sendMessage() {
  alert('Message sent! I will get back to you soon 🚀');
}

// ── Cursor ──────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
const spotlight = document.getElementById('spotlight');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  spotlight.style.left = mouseX + 'px';
  spotlight.style.top = mouseY + 'px';
});

// Ring follows with lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// ── Nav scroll effect ────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.background = 'rgba(5,5,13,0.85)';
    navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5)';
  } else {
    navbar.style.background = 'rgba(5,5,13,0.6)';
    navbar.style.boxShadow = '';
  }
}, { passive: true });

// ── Mobile hamburger ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => navbar.classList.toggle('menu-open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('menu-open'));
});

// ── Scroll fade-in with stagger ──────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// Stagger grid children
document.querySelectorAll('.hero-stat-grid, .projects-grid, .ach-grid, .contact-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.classList.add('fade-in');
    child.style.transitionDelay = `${i * 80}ms`;
    observer.observe(child);
  });
});

// Fade in individual elements
document.querySelectorAll(
  '.hero-card, .timeline-item, .edu-item, .about-text, .about-edu'
).forEach((el, i) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Timeline items: slide from left
document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.classList.remove('fade-in');
  el.classList.add('fade-in-left');
  el.style.transitionDelay = `${i * 60}ms`;
  observer.observe(el);
});

// ── Active nav highlighting ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => { if (!l.classList.contains('nav-cta')) l.style.color = ''; });
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active && !active.classList.contains('nav-cta')) active.style.color = '#eeeef8';
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

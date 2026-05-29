/* ========================================
   THAYNÁ ÁGNA — PORTFOLIO JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // LOADER
  // ============================
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    triggerHeroAnimations();
  }, 2000);

  document.body.style.overflow = 'hidden';

  // ============================
  // CURSOR
  // ============================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hide on leave
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });

  // ============================
  // NAV SCROLL
  // ============================
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ============================
  // HAMBURGER / MOBILE MENU
  // ============================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ============================
  // SMOOTH SCROLL
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================
  // INTERSECTION OBSERVER — AOS
  // ============================
  const aosElements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  aosElements.forEach(el => observer.observe(el));

  // ============================
  // TECH BARS ANIMATION
  // ============================
  const techFills = document.querySelectorAll('.tech-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  techFills.forEach(bar => barObserver.observe(bar));

  // ============================
  // HERO ANIMATIONS ON LOAD
  // ============================
  function triggerHeroAnimations() {
    const heroEls = document.querySelectorAll('#hero [data-aos]');
    heroEls.forEach(el => {
      const delay = el.getAttribute('data-aos-delay') || 0;
      setTimeout(() => {
        el.classList.add('aos-animate');
      }, parseInt(delay) + 200);
    });
  }

  // ============================
  // CONTACT FORM
  // ============================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.form-submit');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span>Mensagem enviada! ✓</span>';
      btn.style.background = '#5cd9f0';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ============================
  // CHIP HOVER EFFECT
  // ============================
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
    });
    chip.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // ============================
  // ACTIVE NAV LINK ON SCROLL
  // ============================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
        });
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => activeObserver.observe(section));

});

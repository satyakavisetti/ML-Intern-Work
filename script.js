const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const accordions = document.querySelectorAll('.accordion-item');
const sections = document.querySelectorAll('main .section');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

accordions.forEach((item) => {
  item.addEventListener('click', () => {
    const expanded = item.getAttribute('aria-expanded') === 'true';
    accordions.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      if (button.nextElementSibling) {
        button.nextElementSibling.style.maxHeight = '0';
      }
    });
    if (!expanded) {
      item.setAttribute('aria-expanded', 'true');
      const panel = item.nextElementSibling;
      if (panel) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => revealObserver.observe(section));

const typeHeroTitles = () => {
  document.querySelector('.hero-subtitle').innerText = '';
  new Typed('.hero-subtitle', {
    strings: ['Ingeniero Informático | Desarrollador Full Stack | Docente'],
    typeSpeed: 30,
    backSpeed: 25,
    showCursor: false,
  });
}

const showSectionOnScrollDown = () => {
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

const showNavBar = () => {
  const heroSection = document.querySelector('.hero');
  const navbar = document.querySelector('header');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(heroSection);
}

document.addEventListener('DOMContentLoaded', function() {
  typeHeroTitles();
  showSectionOnScrollDown();
  showNavBar();
});

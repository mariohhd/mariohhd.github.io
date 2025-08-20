const typeHeroTitles = () => {
  if(!Typed) {
    console.error('Typed.js library is not loaded.');
    return;
  }
  
  // Clear any existing text before typing
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (!heroSubtitle) {
    console.error('Hero subtitle element not found.');
    return;
  }
  heroSubtitle.innerText = '';
  
  // Initialize Typed.js with the new text
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

const applyTheme = (theme, toggleButton) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.getElementById('dark-icon').style.display = theme === 'light' ? 'block' : 'none';
  document.getElementById('light-icon').style.display = theme === 'dark' ? 'block' : 'none';

  // Update button text based on theme
  if(toggleButton) {
    toggleButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    toggleButton.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }

  const finisherColors = theme === 'dark' ? {
    background: '#9138e5',
    particles: ['#0c0528', '#000000', '#2235e5', '#000000', '#867fe5']
  } : {
    background: '#ffffff',
    particles: ['#d0d0d0', '#c0c0c0', '#e8f0fe', '#f5f5f5', '#333333']
  };

  new FinisherHeader({
      "count": 10,
      "size": {
        "min": 1300,
        "max": 1500,
        "pulse": 0
      },
      "speed": {
        "x": {
          "min": 0.1,
          "max": 0.6
        },
        "y": {
          "min": 0.1,
          "max": 0.6
        }
      },
      "colors": finisherColors,
      "blending": "overlay",
      "opacity": {
        "center": 0.5,
        "edge": 0.05
      },
      "skew": 0,
      "shapes": [
        "c",
        "t",
      ]
    });
}

const detectSystemPreference = () => {
  const userPreference = localStorage.getItem('theme');
  if (userPreference) {
    return userPreference;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

document.addEventListener('DOMContentLoaded', function() {
  typeHeroTitles();
  showSectionOnScrollDown();
  showNavBar();

  const currentTheme = detectSystemPreference();
  applyTheme(currentTheme);

  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme, toggleButton);
    });
  }

  // Burger menu functionality for mobile sidebar
  const burger = document.getElementById('burger-menu');
  const sidebar = document.getElementById('sidebar-nav');
  if (burger && sidebar) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      burger.classList.toggle('open'); // Toggle X icon
    });
    // Close sidebar when clicking a link
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        burger.classList.remove('open'); // Remove X icon
      });
    });
    // Close sidebar when clicking outside
    document.addEventListener('click', function (e) {
      if (!sidebar.contains(e.target) && !burger.contains(e.target)) {
        sidebar.classList.remove('open');
        burger.classList.remove('open'); // Remove X icon
      }
    });
  }
});

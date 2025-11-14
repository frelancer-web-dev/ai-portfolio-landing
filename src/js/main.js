// ===== CONFIG =====
const CONFIG = {
  DEFAULT_LANG: 'en',
  FLAGS: { en: '🇬🇧', uk: '🇺🇦', ru: '🇷🇺' },
  AVATAR_IMAGES: [
    'src/images/dodep-coder.png',
    'src/images/dodeper.png',
    'src/images/mykola.png',
    'src/images/dodeper1.png',
    'src/images/dodeper2.png'
  ],
  AVATAR_INTERVAL: 10000,
  TOAST_DURATION: 3000
};

// ===== GLOBAL STATE =====
const State = {
  translations: {},
  projects: {},
  currentLang: localStorage.getItem('lang') || CONFIG.DEFAULT_LANG
};

// Make state globally accessible
window.TRANSLATIONS = State.translations;
window.currentLang = State.currentLang;

// ===== UTILITIES =====
const Utils = {
  // Debounce function
  debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  },

  // Throttle function
  throttle(fn, limit) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Request Animation Frame wrapper
  raf(callback) {
    return requestAnimationFrame(callback);
  }
};

// ===== DATA LOADING =====
const DataLoader = {
  async loadTranslations() {
    try {
      const basePath = window.TRANSLATION_BASE_PATH || 'src/translations/';
      const [en, uk, ru] = await Promise.all([
        fetch(`${basePath}en.json`).then(r => r.ok ? r.json() : {}),
        fetch(`${basePath}uk.json`).then(r => r.ok ? r.json() : {}),
        fetch(`${basePath}ru.json`).then(r => r.ok ? r.json() : {})
      ]);
      
      Object.assign(State.translations, { en, uk, ru });
      window.TRANSLATIONS = State.translations;
      return true;
    } catch (error) {
      console.error('Failed to load translations:', error);
      return false;
    }
  },

  async loadProjects() {
    try {
      const path = window.location.pathname;
      const projectsPath = (path.includes('projects.html') || path.includes('src/res/')) 
        ? 'projects.json' 
        : 'src/res/projects.json';
      
      const response = await fetch(projectsPath);
      if (response.ok) {
        State.projects = await response.json();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load projects:', error);
      return false;
    }
  }
};

// ===== TOAST SYSTEM =====
const Toast = {
  element: null,
  timeout: null,

  init() {
    this.element = document.getElementById('toast');
  },

  show(message, duration = CONFIG.TOAST_DURATION) {
    if (!this.element) return;
    
    clearTimeout(this.timeout);
    this.element.textContent = message;
    this.element.classList.add('show');
    
    this.timeout = setTimeout(() => this.hide(), duration);
  },

  hide() {
    this.element?.classList.remove('show');
  },

  showCurrent() {
    this.show(State.translations[State.currentLang]?.['toast.current'] || 'You are already viewing this project!');
  },

  showSoon() {
    this.show(State.translations[State.currentLang]?.['toast.soon'] || 'SOON..');
  },

  showRedirect() {
    this.show(State.translations[State.currentLang]?.['toast.redirect'] || 'Redirecting to project...', 2000);
  }
};

// ===== LANGUAGE SYSTEM =====
const Lang = {
  translate(lang) {
    if (!State.translations[lang]) return;

    // Batch DOM updates
    const fragment = document.createDocumentFragment();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = State.translations[lang]?.[el.dataset.i18n];
      if (text) el.innerHTML = text;
    });
    
    // Update flag
    const btn = document.getElementById('currentLang');
    const flagEl = btn?.querySelector('.flag');
    if (flagEl) flagEl.textContent = CONFIG.FLAGS[lang] || CONFIG.FLAGS[CONFIG.DEFAULT_LANG];
    
    // Update active language option
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    
    State.currentLang = lang;
    window.currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update difficulty tags
    this.updateDifficultyTags();
    
    // Refresh animations if available
    typeof AOS !== 'undefined' && AOS.refresh();
  },

  updateDifficultyTags() {
    document.querySelectorAll('.project-card').forEach(card => {
      const projectId = card.dataset.projectId;
      const project = State.projects[projectId];
      if (!project?.difficulty) return;
      
      const existingTag = card.querySelector('.difficulty-tag');
      const label = State.translations[State.currentLang]?.[`difficulty.${project.difficulty}`] || project.difficulty;
      
      if (existingTag) {
        existingTag.textContent = label;
      } else {
        const tagsContainer = card.querySelector('.project-tags');
        if (tagsContainer) {
          tagsContainer.insertAdjacentHTML('afterbegin', 
            `<span class="difficulty-tag difficulty-${project.difficulty}">${label}</span>`
          );
        }
      }
    });
  },

  init() {
    this.translate(State.currentLang);
    
    const btn = document.getElementById('currentLang');
    const dropdown = document.getElementById('langDropdown');
    
    if (btn) {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        dropdown?.classList.toggle('active');
      });
    }
    
    // Close dropdown on outside click
    document.addEventListener('click', e => {
      if (dropdown && !btn?.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
    
    // Language option clicks
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        this.translate(opt.dataset.lang);
        dropdown?.classList.remove('active');
      });
    });
  }
};

// ===== EVENT HANDLERS =====
const Handlers = {
  handleProjectClick(e) {
    const link = e.target.closest('.project-link');
    if (!link) return;
    
    const type = link.dataset.project;
    if (type === 'current') {
      e.preventDefault();
      Toast.showCurrent();
    } else if (type === 'soon') {
      e.preventDefault();
      Toast.showSoon();
    } else if (type === 'external') {
      Toast.showRedirect();
    }
  },

  handleCardClick(e) {
    if (e.target.closest('a, button')) return;
    
    const card = e.target.closest('.project-card');
    const projectId = card?.dataset.projectId;
    if (!projectId) return;
    
    const isProjectsPage = window.location.pathname.includes('projects.html');
    const path = isProjectsPage ? 'project.html' : 'src/res/project.html';
    window.location.href = `${path}?id=${projectId}`;
  }
};

// ===== SCROLL EFFECTS =====
const ScrollEffects = {
  nav: null,
  heroContent: null,
  heroVisual: null,
  sections: [],
  navLinks: [],
  ticking: false,

  init() {
    this.nav = document.querySelector('.nav');
    this.heroContent = document.querySelector('.hero-content');
    this.heroVisual = document.querySelector('.hero-visual');
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', Utils.throttle(() => this.onScroll(), 100));
  },

  onScroll() {
    if (this.ticking) return;
    
    this.ticking = true;
    Utils.raf(() => {
      const scrollY = window.pageYOffset;
      
      // Nav scrolled state
      this.nav?.classList.toggle('scrolled', scrollY > 100);
      
      // Hero parallax (only if in viewport)
      if (scrollY < window.innerHeight) {
        if (this.heroContent) {
          this.heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
          this.heroContent.style.opacity = Math.max(0, 1 - scrollY / 700);
        }
        if (this.heroVisual) {
          this.heroVisual.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
      }
      
      // Active nav link
      let currentSection = '';
      this.sections.forEach(section => {
        if (scrollY >= section.offsetTop - 150) {
          currentSection = section.id;
        }
      });
      
      this.navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
      });
      
      this.ticking = false;
    });
  }
};

// ===== IMAGE LOADING =====
// ===== IMAGE LOADING =====
const ImageLoader = {
  observer: null,

  init() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    document.querySelectorAll('.project-preview').forEach(img => {
      // Встановлюємо src з data-src
      const src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
      }
      this.observer.observe(img);
    });
  },

  loadImage(img) {
    const placeholder = img.nextElementSibling;
    
    img.addEventListener('load', () => {
      img.classList.add('loaded');
      if (placeholder?.classList.contains('project-placeholder')) {
        placeholder.style.opacity = '0';
      }
    }, { once: true });
    
    img.addEventListener('error', () => {
      img.style.display = 'none';
      if (placeholder?.classList.contains('project-placeholder')) {
        placeholder.style.opacity = '1';
      }
    }, { once: true });
    
    if (img.complete && img.naturalHeight !== 0) {
      img.dispatchEvent(new Event('load'));
    }
  }
};

// ===== AVATAR SLIDER =====
const AvatarSlider = {
  img: null,
  container: null,
  currentIndex: 0,
  intervalId: null,

  init() {
    this.img = document.querySelector('.about-avatar img');
    this.container = document.querySelector('.about-avatar');
    if (!this.img) return;
    
    this.start();
    this.setupHoverPause();
  },

  start() {
    this.intervalId = setInterval(() => this.change(), CONFIG.AVATAR_INTERVAL);
  },

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  },

  change() {
    this.img.classList.add('fade-out');
    
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % CONFIG.AVATAR_IMAGES.length;
      this.img.src = CONFIG.AVATAR_IMAGES[this.currentIndex];
      this.img.classList.remove('fade-out');
      this.img.classList.add('fade-in');
      
      setTimeout(() => this.img.classList.remove('fade-in'), 1000);
    }, 1000);
  },

  setupHoverPause() {
    if (!this.container) return;
    
    this.container.addEventListener('mouseenter', () => this.stop());
    this.container.addEventListener('mouseleave', () => {
      if (!this.intervalId) this.start();
    });
  }
};

// ===== SMOOTH SCROLL =====
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
};

// ===== INITIALIZATION =====
async function init() {
  // Load data in parallel
  await Promise.all([
    DataLoader.loadTranslations(),
    DataLoader.loadProjects()
  ]);
  
  // Initialize components
  Toast.init();
  Lang.init();
  
  // Don't init AOS on project preview pages
  if (!document.querySelector('.project-preview-page') && typeof AOS !== 'undefined') {
    AOS.init({ 
      duration: 1000, 
      once: true, 
      offset: 100,
      disable: 'mobile' // Disable on mobile for better performance
    });
  }
  
  // Initialize features
  SmoothScroll.init();
  ScrollEffects.init();
  ImageLoader.init();
  AvatarSlider.init();
  
  // Setup project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', Handlers.handleCardClick);
  });
  
  // Add global click handler for project links
  document.addEventListener('click', Handlers.handleProjectClick);
  
  // Console signature
  console.log('%cМикола Портфоліо', 'color:#6366f1;font-size:24px;font-weight:bold');
  console.log('%cHTML • CSS • JavaScript', 'color:#a1a1aa;font-size:14px');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

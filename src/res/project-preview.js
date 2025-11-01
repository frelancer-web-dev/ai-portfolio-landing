// ===== PROJECT DATA =====
const PROJECTS_DATA = {
  'ai-portfolio': {
    title: 'AI Portfolio Landing',
    description: 'A dark, minimal landing page for showcasing web & design projects. Built with clean HTML, CSS, and JavaScript, featuring smooth scroll animations, responsive design, and an elegant dark theme. Perfect for developers and designers who want to showcase their work professionally.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      '../images/dodep-coder.png',
      '../images/dodep-coder.png',
      '../images/dodep-coder.png'
    ],
    features: [
      'Fully responsive design for all devices',
      'Smooth scroll animations with AOS library',
      'Multi-language support (EN, UK, RU)',
      'Dark theme with modern UI components',
      'Clean and semantic HTML structure'
    ],
    liveUrl: 'current',
    codeUrl: 'https://github.com/frelancer-web-dev/ai-portfolio-landing'
  },
  'techstore': {
    title: 'TechStore – E-commerce Demo',
    description: 'A dark, modern eCommerce landing page designed for showcasing tech products. Features a clean and minimal design with smooth UI elements, fully responsive layout, and elegant product displays. Built to provide an excellent user experience across all devices.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      '../images/favicon_techstore.png',
      '../images/favicon_techstore.png',
      '../images/favicon_techstore.png'
    ],
    features: [
      'Modern dark eCommerce design',
      'Product showcase sections',
      'Smooth animations and transitions',
      'Mobile-first responsive approach',
      'Clean code structure'
    ],
    liveUrl: 'https://frelancer-web-dev.github.io/TechStore/',
    codeUrl: 'https://github.com/frelancer-web-dev/TechStore'
  },
  'quoteflow': {
    title: 'QuoteFlow – Random Quote Generator',
    description: 'A simple and elegant app that displays random inspirational quotes. Features beautiful fade-in animations, dark/light theme toggle, and copy-to-clipboard functionality. Perfect for daily inspiration and motivation.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      '../images/favicon_quote.png',
      '../images/favicon_quote.png',
      '../images/favicon_quote.png'
    ],
    features: [
      'Random quote generation',
      'Dark/Light theme toggle',
      'Copy to clipboard functionality',
      'Smooth fade-in animations',
      'Clean minimalist interface'
    ],
    liveUrl: 'https://frelancer-web-dev.github.io/QuoteFlow/',
    codeUrl: 'https://github.com/frelancer-web-dev/QuoteFlow'
  },
  'focustimer': {
    title: 'FocusTimer – Minimal Pomodoro App',
    description: 'A simple and elegant Pomodoro timer for focused work sessions. Features smooth animations, circular progress bar, sound alerts, and a clean dark UI. Helps you stay productive with the proven Pomodoro technique.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      '../images/favicon_focustime.png',
      '../images/favicon_focustime.png',
      '../images/favicon_focustime.png'
    ],
    features: [
      'Pomodoro timer functionality',
      'Circular progress indicator',
      'Sound alerts for sessions',
      'Clean dark interface',
      'Session tracking'
    ],
    liveUrl: 'https://frelancer-web-dev.github.io/FocusTimer/',
    codeUrl: 'https://github.com/frelancer-web-dev/FocusTimer'
  },
  'weathernow': {
    title: 'WeatherNow – Minimal Weather Widget',
    description: 'A clean weather card with animated icons, city name, and temperature display. Features smooth refresh animations and dark theme with neon accents. Get weather updates in style.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      '../images/web_develop.png',
      '../images/web_develop.png',
      '../images/web_develop.png'
    ],
    features: [
      'Real-time weather data',
      'Animated weather icons',
      'City search functionality',
      'Dark theme with neon accents',
      'Smooth refresh animations'
    ],
    liveUrl: null,
    codeUrl: null
  },
  'palettecraft': {
    title: 'PaletteCraft – Color Palette Generator',
    description: 'Generate beautiful color combinations with one click. Features 5-color palettes, HEX code copying, and smooth color transition animations. Perfect for designers and developers.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      '../images/web_develop.png',
      '../images/web_develop.png',
      '../images/web_develop.png'
    ],
    features: [
      'Random palette generation',
      'HEX code copying',
      'Color lock functionality',
      'Smooth transitions',
      'Export palettes'
    ],
    liveUrl: null,
    codeUrl: null
  },
  'countify': {
    title: 'Countify – Animated Counter App',
    description: 'Beautiful counter with smooth number animations. Features increment/decrement buttons, smooth transitions, and optional sound effects. Simple yet elegant counting solution.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      '../images/web_develop.png',
      '../images/web_develop.png',
      '../images/web_develop.png'
    ],
    features: [
      'Smooth number animations',
      'Increment/Decrement controls',
      'Reset functionality',
      'Optional sound effects',
      'Clean minimalist design'
    ],
    liveUrl: null,
    codeUrl: null
  },
  'tasky': {
    title: 'Tasky – Minimal To-Do List',
    description: 'Clean and minimal to-do list with localStorage persistence. Add, delete, and mark tasks as complete with smooth animations. Stay organized with this simple task manager.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    images: [
      '../images/web_develop.png',
      '../images/web_develop.png',
      '../images/web_develop.png'
    ],
    features: [
      'Task creation and deletion',
      'Mark tasks as complete',
      'localStorage persistence',
      'Smooth animations',
      'Clean interface'
    ],
    liveUrl: null,
    codeUrl: null
  }
};

// ===== GALLERY MANAGEMENT =====
let currentImageIndex = 0;
let currentProject = null;

function initProjectPreview() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  console.log('Loading project:', projectId);
  
  if (!projectId || !PROJECTS_DATA[projectId]) {
    console.error('Project not found:', projectId);
    showError();
    return;
  }
  
  currentProject = PROJECTS_DATA[projectId];
  console.log('Project loaded:', currentProject.title);
  renderProject(currentProject);
  initGallery();
}

function renderProject(project) {
  // Title
  const titleEl = document.getElementById('projectTitle');
  if (titleEl) titleEl.textContent = project.title;
  
  // Tags
  const tagsContainer = document.getElementById('projectTags');
  if (tagsContainer) {
    tagsContainer.innerHTML = project.tags.map(tag => 
      `<span class="tag-large">${tag}</span>`
    ).join('');
  }
  
  // Description
  const descEl = document.getElementById('projectDescription');
  if (descEl) descEl.textContent = project.description;
  
  // Features
  const featuresList = document.getElementById('featuresList');
  if (featuresList) {
    featuresList.innerHTML = project.features.map(feature => 
      `<li>${feature}</li>`
    ).join('');
  }
  
  // Main Image
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = project.images[0];
    mainImage.alt = project.title;
  }
  
  // Indicators
  const indicatorsContainer = document.getElementById('galleryIndicators');
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = project.images.map((_, index) => 
      `<button class="gallery-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></button>`
    ).join('');
  }
  
  // Buttons
  setupButtons(project);
}

function setupButtons(project) {
  const viewLiveBtn = document.getElementById('viewLiveBtn');
  const viewCodeBtn = document.getElementById('viewCodeBtn');
  
  if (viewLiveBtn) {
    if (project.liveUrl === 'current') {
      viewLiveBtn.href = '#';
      viewLiveBtn.onclick = (e) => {
        e.preventDefault();
        Toast.showCurrent();
      };
    } else if (project.liveUrl) {
      viewLiveBtn.href = project.liveUrl;
      viewLiveBtn.target = '_blank';
      viewLiveBtn.onclick = () => {
        Toast.showRedirect();
      };
    } else {
      viewLiveBtn.href = '#';
      viewLiveBtn.onclick = (e) => {
        e.preventDefault();
        Toast.showSoon();
      };
    }
  }
  
  if (viewCodeBtn) {
    if (project.codeUrl) {
      viewCodeBtn.href = project.codeUrl;
      viewCodeBtn.target = '_blank';
    } else {
      viewCodeBtn.href = '#';
      viewCodeBtn.onclick = (e) => {
        e.preventDefault();
        Toast.showSoon();
      };
    }
  }
}

function initGallery() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.gallery-indicator');
  
  if (prevBtn) prevBtn.addEventListener('click', () => changeImage(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeImage(1));
  
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      currentImageIndex = parseInt(indicator.dataset.index);
      updateGallery();
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
  });
}

function changeImage(direction) {
  if (!currentProject) return;
  
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = currentProject.images.length - 1;
  } else if (currentImageIndex >= currentProject.images.length) {
    currentImageIndex = 0;
  }
  
  updateGallery();
}

function updateGallery() {
  if (!currentProject) return;
  
  const mainImage = document.getElementById('mainImage');
  const indicators = document.querySelectorAll('.gallery-indicator');
  
  if (mainImage) {
    // Fade out
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
      mainImage.src = currentProject.images[currentImageIndex];
      mainImage.style.opacity = '1';
    }, 200);
  }
  
  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentImageIndex);
  });
}

function showError() {
  const previewSection = document.querySelector('.project-preview');
  if (previewSection) {
    previewSection.innerHTML = `
      <div class="container">
        <div class="error-message" style="text-align: center; padding: 100px 20px;">
          <h1 style="font-size: 48px; margin-bottom: 20px;">Project Not Found</h1>
          <p style="color: var(--text-secondary); margin-bottom: 30px;">The project you're looking for doesn't exist.</p>
          <a href="../../index.html" class="btn-primary">Go Back Home</a>
        </div>
      </div>
    `;
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing project preview...');
  initProjectPreview();
});

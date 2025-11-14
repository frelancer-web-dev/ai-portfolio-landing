// ===== PROJECT PREVIEW STATE =====
const ProjectPreviewState = {
  projectsData: {},
  translations: { en: {}, uk: {}, ru: {} },
  currentImageIndex: 0,
  currentProject: null,
  featuresExpanded: false
};

// ===== UTILITIES =====
const PreviewUtils = {
  showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  },

  getTranslation(key, isProjectKey = false) {
    const lang = window.currentLang || 'en';
    const source = isProjectKey ? ProjectPreviewState.translations : window.TRANSLATIONS;
    return source?.[lang]?.[key] || key;
  },

  getDifficultyLabel(difficulty) {
    return this.getTranslation(`difficulty.${difficulty}`);
  }
};

// ===== DATA LOADING =====
const PreviewDataLoader = {
  async loadProjects() {
    try {
      const response = await fetch('projects.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      ProjectPreviewState.projectsData = await response.json();
      return true;
    } catch (error) {
      console.error('Failed to load projects:', error);
      return false;
    }
  },

  async loadTranslations() {
    try {
      const [en, uk, ru] = await Promise.all([
        fetch('../translations/project-en.json').then(r => r.json()),
        fetch('../translations/project-uk.json').then(r => r.json()),
        fetch('../translations/project-ru.json').then(r => r.json())
      ]);
      
      Object.assign(ProjectPreviewState.translations, { en, uk, ru });
      return true;
    } catch (error) {
      console.error('Failed to load translations:', error);
      return false;
    }
  }
};

// ===== UI RENDERER =====
const PreviewRenderer = {
  renderProject(project) {
    if (!project) return;

    const updates = {
      projectTitle: PreviewUtils.getTranslation(project.titleKey, true),
      projectDescription: PreviewUtils.getTranslation(project.descriptionKey, true),
      detailedDescription: PreviewUtils.getTranslation(project.detailedDescriptionKey, true),
      timeSpent: PreviewUtils.getTranslation(project.timeSpent, true),
      languagesUsed: project.languages.join(', ')
    };

    requestAnimationFrame(() => {
      Object.entries(updates).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
      });

      this.renderTags(project);
      this.renderFeatures(project);
      this.renderMainImage(project);
      this.renderGalleryIndicators(project);
      this.renderDetailedInfo(project);
      this.setupButtons(project);
    });
  },

  renderTags(project) {
    const container = document.getElementById('projectTags');
    if (!container) return;

    const difficultyLabel = PreviewUtils.getDifficultyLabel(project.difficulty);
    const html = `
      <div class="project-meta-tags">
        <span class="difficulty-tag difficulty-${project.difficulty}">${difficultyLabel}</span>
        ${project.tags.map(tag => `<span class="tag-large">${tag}</span>`).join('')}
      </div>
    `;
    container.innerHTML = html;
  },

  renderFeatures(project) {
    const list = document.getElementById('featuresList');
    if (!list || !project.featuresKeys) return;

    const features = project.featuresKeys;
    const visibleFeatures = features.slice(0, 3);
    const hiddenFeatures = features.slice(3);

    let html = visibleFeatures.map(key => 
      `<li>${PreviewUtils.getTranslation(key, true)}</li>`
    ).join('');

    if (hiddenFeatures.length > 0) {
      html += `
        <div class="features-list-collapsed" id="collapsedFeatures">
          ${hiddenFeatures.map(key => `<li>${PreviewUtils.getTranslation(key, true)}</li>`).join('')}
        </div>
        <button class="show-more-features-btn" id="toggleFeaturesBtn">
          <span data-i18n="preview.showMore">${PreviewUtils.getTranslation('preview.showMore')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      `;
    }

    list.innerHTML = html;

    const toggleBtn = document.getElementById('toggleFeaturesBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleFeatures());
    }

    ProjectPreviewState.featuresExpanded = false;
  },

  toggleFeatures() {
    ProjectPreviewState.featuresExpanded = !ProjectPreviewState.featuresExpanded;
    
    const collapsed = document.getElementById('collapsedFeatures');
    const btn = document.getElementById('toggleFeaturesBtn');
    
    if (!collapsed || !btn) return;

    collapsed.classList.toggle('expanded');
    btn.classList.toggle('expanded');
    btn.querySelector('span').textContent = PreviewUtils.getTranslation(
      ProjectPreviewState.featuresExpanded ? 'preview.showLess' : 'preview.showMore'
    );
  },

  renderMainImage(project) {
    const img = document.getElementById('mainImage');
    if (!img || !project.images?.[0]) return;

    img.src = project.images[0];
    img.alt = PreviewUtils.getTranslation(project.titleKey, true);
    img.style.opacity = '1';
  },

  renderGalleryIndicators(project) {
    const container = document.getElementById('galleryIndicators');
    if (!container || !project.images) return;

    const html = project.images.map((_, index) => 
      `<button class="gallery-indicator ${index === ProjectPreviewState.currentImageIndex ? 'active' : ''}" 
               data-index="${index}" 
               aria-label="View image ${index + 1}"></button>`
    ).join('');

    container.innerHTML = html;

    setTimeout(() => {
      container.querySelectorAll('.gallery-indicator').forEach(indicator => {
        indicator.addEventListener('click', () => {
          ProjectPreviewState.currentImageIndex = parseInt(indicator.dataset.index);
          PreviewGallery.update();
        });
      });
    }, 50);
  },

  renderDetailedInfo(project) {
    const difficultyEl = document.getElementById('difficultyLevel');
    if (difficultyEl && project.difficulty) {
      difficultyEl.textContent = PreviewUtils.getDifficultyLabel(project.difficulty);
      difficultyEl.className = `stat-value difficulty-${project.difficulty}`;
    }

    const allFeaturesList = document.getElementById('allFeaturesList');
    if (allFeaturesList && project.featuresKeys) {
      allFeaturesList.innerHTML = project.featuresKeys.map(key => 
        `<li>${PreviewUtils.getTranslation(key, true)}</li>`
      ).join('');
    }
  },

  setupButtons(project) {
    const liveBtn = document.getElementById('viewLiveBtn');
    const codeBtn = document.getElementById('viewCodeBtn');

    if (liveBtn) {
      const newBtn = liveBtn.cloneNode(true);
      liveBtn.replaceWith(newBtn);

      if (project.liveUrl === 'current') {
        newBtn.href = '#';
        newBtn.addEventListener('click', e => {
          e.preventDefault();
          PreviewUtils.showToast(PreviewUtils.getTranslation('toast.current'));
        });
      } else if (project.liveUrl) {
        newBtn.href = project.liveUrl;
        newBtn.target = '_blank';
        newBtn.rel = 'noopener noreferrer';
        newBtn.addEventListener('click', () => {
          PreviewUtils.showToast(PreviewUtils.getTranslation('toast.redirect'), 2000);
        });
      } else {
        newBtn.href = '#';
        newBtn.addEventListener('click', e => {
          e.preventDefault();
          PreviewUtils.showToast(PreviewUtils.getTranslation('toast.soon'));
        });
      }
    }

    if (codeBtn) {
      const newBtn = codeBtn.cloneNode(true);
      codeBtn.replaceWith(newBtn);

      if (project.codeUrl) {
        newBtn.href = project.codeUrl;
        newBtn.target = '_blank';
        newBtn.rel = 'noopener noreferrer';
      } else {
        newBtn.href = '#';
        newBtn.addEventListener('click', e => {
          e.preventDefault();
          PreviewUtils.showToast(PreviewUtils.getTranslation('toast.soon'));
        });
      }
    }
  },

  showError() {
    const section = document.querySelector('.project-preview');
    if (!section) return;

    section.style.opacity = '1';
    section.style.visibility = 'visible';

    const html = `
      <div class="container">
        <div class="error-message" style="text-align: center; padding: 100px 20px;">
          <h1 style="font-size: 48px; margin-bottom: 20px; color: var(--text-primary);">
            ${PreviewUtils.getTranslation('preview.error.title')}
          </h1>
          <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 18px;">
            ${PreviewUtils.getTranslation('preview.error.description')}
          </p>
          <a href="../../index.html" class="btn-primary">${PreviewUtils.getTranslation('preview.error.button')}</a>
        </div>
      </div>
    `;
    section.innerHTML = html;
  }
};

// ===== GALLERY =====
const PreviewGallery = {
  init() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn?.addEventListener('click', () => this.change(-1));
    nextBtn?.addEventListener('click', () => this.change(1));

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') this.change(-1);
      else if (e.key === 'ArrowRight') this.change(1);
    });
  },

  change(direction) {
    if (!ProjectPreviewState.currentProject?.images) return;

    ProjectPreviewState.currentImageIndex += direction;

    const len = ProjectPreviewState.currentProject.images.length;
    if (ProjectPreviewState.currentImageIndex < 0) ProjectPreviewState.currentImageIndex = len - 1;
    else if (ProjectPreviewState.currentImageIndex >= len) ProjectPreviewState.currentImageIndex = 0;

    this.update();
  },

  update() {
    if (!ProjectPreviewState.currentProject?.images) return;

    const img = document.getElementById('mainImage');
    const indicators = document.querySelectorAll('.gallery-indicator');

    if (img) {
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = ProjectPreviewState.currentProject.images[ProjectPreviewState.currentImageIndex];
        img.alt = PreviewUtils.getTranslation(ProjectPreviewState.currentProject.titleKey, true);
        img.style.opacity = '1';
      }, 200);
    }

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === ProjectPreviewState.currentImageIndex);
    });
  }
};

// ===== LANGUAGE OBSERVER =====
function observeLanguageChanges() {
  if (typeof Lang !== 'undefined' && Lang.translate) {
    const original = Lang.translate.bind(Lang);
    Lang.translate = function(lang) {
      original(lang);
      if (ProjectPreviewState.currentProject) {
        PreviewRenderer.renderProject(ProjectPreviewState.currentProject);
      }
    };
  }
}

// ===== INITIALIZATION =====
async function initProjectPreview() {
  const section = document.querySelector('.project-preview');
  if (section) {
    section.style.opacity = '1';
    section.style.visibility = 'visible';
  }

  const [projectsLoaded, translationsLoaded] = await Promise.all([
    PreviewDataLoader.loadProjects(),
    PreviewDataLoader.loadTranslations()
  ]);

  if (!projectsLoaded || !translationsLoaded) {
    PreviewRenderer.showError();
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  if (!projectId || !ProjectPreviewState.projectsData[projectId]) {
    PreviewRenderer.showError();
    return;
  }

  ProjectPreviewState.currentProject = ProjectPreviewState.projectsData[projectId];
  PreviewRenderer.renderProject(ProjectPreviewState.currentProject);
  PreviewGallery.init();
  observeLanguageChanges();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectPreview);
} else {
  initProjectPreview();
}

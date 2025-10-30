// ===== CONFIG =====
const TRANSLATIONS = {};
const FLAGS = { en: '🇬🇧', uk: '🇺🇦', ru: '🇷🇺' };

// ===== LOAD TRANSLATIONS =====
async function loadTranslations() {
    try {
        const [en, uk, ru] = await Promise.all([
            fetch('./src/translations/en.json').then(r => r.json()),
            fetch('./src/translations/uk.json').then(r => r.json()),
            fetch('./src/translations/ru.json').then(r => r.json())
        ]);
        
        TRANSLATIONS.en = en;
        TRANSLATIONS.uk = uk;
        TRANSLATIONS.ru = ru;
        
        return true;
    } catch (error) {
        console.error('Failed to load translations:', error);
        return false;
    }
}

// ===== TOAST NOTIFICATIONS =====
const Toast = {
    show(message, duration = 3000) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },
    
    showCurrent() {
        this.show(TRANSLATIONS[Lang.current]['toast.current']);
    },
    
    showSoon() {
        this.show(TRANSLATIONS[Lang.current]['toast.soon']);
    },
    
    showRedirect() {
        this.show(TRANSLATIONS[Lang.current]['toast.redirect'], 2000);
    }
};

// ===== LANGUAGE SYSTEM =====
const Lang = {
    current: localStorage.getItem('lang') || 'en',
    
    translate(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const text = TRANSLATIONS[lang]?.[key];
            if (text) el.innerHTML = text;
        });
        
        const btn = document.getElementById('currentLang');
        if (btn) btn.querySelector('.flag').textContent = FLAGS[lang];
        
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });
        
        this.current = lang;
        localStorage.setItem('lang', lang);
        AOS?.refresh();
    },
    
    init() {
        this.translate(this.current);
        
        const btn = document.getElementById('currentLang');
        const dropdown = document.getElementById('langDropdown');
        
        btn?.addEventListener('click', e => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', e => {
            if (!btn?.contains(e.target) && !dropdown?.contains(e.target)) {
                dropdown?.classList.remove('active');
            }
        });
        
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', () => {
                this.translate(opt.dataset.lang);
                dropdown?.classList.remove('active');
            });
        });
    }
};

// ===== PROJECT LINKS HANDLER =====
const handleProjectClick = (e) => {
    const link = e.target.closest('.project-link');
    if (!link) return;
    
    const projectType = link.dataset.project;
    
    if (projectType === 'current') {
        e.preventDefault();
        Toast.showCurrent();
    } else if (projectType === 'soon') {
        e.preventDefault();
        Toast.showSoon();
    } else if (projectType === 'external') {
        Toast.showRedirect();
    }
};

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const nav = document.querySelector('.nav');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let tick = false;
    window.addEventListener('scroll', () => {
        if (!tick) {
            requestAnimationFrame(() => {
                const y = window.pageYOffset;
                
                nav?.classList.toggle('scrolled', y > 100);
                
                if (y < window.innerHeight) {
                    if (heroContent) {
                        heroContent.style.transform = `translateY(${y * 0.3}px)`;
                        heroContent.style.opacity = Math.max(0, 1 - y / 700);
                    }
                    if (heroVisual) heroVisual.style.transform = `translateY(${y * 0.15}px)`;
                }
                
                let current = '';
                sections.forEach(s => {
                    if (y >= s.offsetTop - 150) current = s.id;
                });
                navLinks.forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href')?.slice(1) === current);
                });
                
                tick = false;
            });
            tick = true;
        }
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    
    Lang.init();
    AOS?.init({ duration: 1000, once: true, offset: 100 });
    
    initSmoothScroll();
    initScrollEffects();
    
    document.addEventListener('click', handleProjectClick);
    
    console.log('%cМикола Портфоліо', 'color:#6366f1;font-size:24px;font-weight:bold');
    console.log('%cHTML • CSS • JavaScript', 'color:#a1a1aa;font-size:14px');
});

// ===== CONFIG & DATA =====
const TRANSLATIONS = {
    en: {
        "nav.projects": "Projects", "nav.about": "About", "nav.contact": "Contact",
        "hero.label": "Frontend Developer & Designer",
        "hero.title": "Clean Code.<br />Smart Design.",
        "hero.description": "I build fast, modern, and minimal websites that focus on usability and visual impact.",
        "hero.cta": "View Projects",
        "projects.title": "Projects",
        "projects.project1.title": "AI Portfolio Landing",
        "projects.project1.description": "A dark, minimal landing page for showcasing web & design projects. Fully responsive and animated.",
        "projects.project2.title": "Minimal Business Website",
        "projects.project2.description": "A 3-page responsive business site with clean typography and optimized performance.",
        "projects.project3.title": "AI Dashboard UI",
        "projects.project3.description": "Frontend dashboard prototype with charts, stat cards, and dark/light mode.",
        "projects.project4.title": "Product Landing Page",
        "projects.project4.description": "A modern product landing built for conversion, featuring animations and CTA blocks.",
        "projects.project5.title": "Brand Identity Pack",
        "projects.project5.description": "Brand style guide with logo, color palette, and mockups — simple, clean, and consistent.",
        "projects.viewLive": "View Live →",
        "about.title": "About",
        "about.text1": "I'm Mykola — a frontend developer and designer focused on creating fast, minimal, and user-friendly web interfaces.",
        "about.text2": "I enjoy building from scratch: from idea and design to clean, responsive code. My main tools are HTML, CSS, JavaScript, and React.",
        "about.text3": "I aim for clarity, smooth user flow, and efficient structure in every project.",
        "about.skill1.title": "Frontend", "about.skill1.text": "HTML, CSS, JS, React",
        "about.skill2.title": "Design", "about.skill2.text": "UI/UX, Branding",
        "about.skill3.title": "Workflow", "about.skill3.text": "Git, Vite, Responsive",
        "contact.title": "Let's Connect",
        "contact.intro": "Ready to collaborate? Reach me through any platform below.",
        "footer.text": "© 2025 Mykola Portfolio. All rights reserved."
    },
    uk: {
        "nav.projects": "Проєкти", "nav.about": "Про мене", "nav.contact": "Контакти",
        "hero.label": "Frontend розробник і дизайнер",
        "hero.title": "Чистий код.<br />Розумний дизайн.",
        "hero.description": "Створюю швидкі, сучасні та мінімалістичні сайти з фокусом на зручність та візуальний вплив.",
        "hero.cta": "Переглянути проєкти",
        "projects.title": "Проєкти",
        "projects.project1.title": "AI Portfolio Landing",
        "projects.project1.description": "Темна мінімалістична сторінка для демонстрації веб-проєктів і дизайну. Повністю адаптивна з анімаціями.",
        "projects.project2.title": "Сайт бізнесу",
        "projects.project2.description": "3-сторінковий адаптивний сайт з чистою типографікою та оптимізованою продуктивністю.",
        "projects.project3.title": "AI Dashboard UI",
        "projects.project3.description": "Прототип панелі управління з графіками, картками статистики та темною темою.",
        "projects.project4.title": "Product Landing",
        "projects.project4.description": "Сучасна продуктова сторінка з анімаціями та блоками для конверсії.",
        "projects.project5.title": "Brand Identity Pack",
        "projects.project5.description": "Гайд бренду з логотипом, кольоровою палітрою та мокапами — просто, чисто, консистентно.",
        "projects.viewLive": "Переглянути →",
        "about.title": "Про мене",
        "about.text1": "Я Микола — frontend розробник і дизайнер, зосереджений на створенні швидких, мінімалістичних та зручних веб-інтерфейсів.",
        "about.text2": "Люблю будувати з нуля: від ідеї та дизайну до чистого, адаптивного коду. Мої основні інструменти — HTML, CSS, JavaScript та React.",
        "about.text3": "Прагну до чіткості, плавного користувацького потоку та ефективної структури в кожному проєкті.",
        "about.skill1.title": "Frontend", "about.skill1.text": "HTML, CSS, JS, React",
        "about.skill2.title": "Дизайн", "about.skill2.text": "Figma, UI/UX, Branding",
        "about.skill3.title": "Workflow", "about.skill3.text": "Git, Vite, Responsive",
        "contact.title": "Зв'яжіться зі мною",
        "contact.intro": "Готові до співпраці? Знайдіть мене на будь-якій платформі нижче.",
        "footer.text": "© 2025 Микола Портфоліо. Всі права захищені."
    },
    ru: {
        "nav.projects": "Проекты", "nav.about": "Обо мне", "nav.contact": "Контакты",
        "hero.label": "Frontend разработчик и дизайнер",
        "hero.title": "Чистый код.<br />Умный дизайн.",
        "hero.description": "Создаю быстрые, современные и минималистичные сайты с фокусом на удобство и визуальное воздействие.",
        "hero.cta": "Посмотреть проекты",
        "projects.title": "Проекты",
        "projects.project1.title": "AI Portfolio Landing",
        "projects.project1.description": "Темная минималистичная страница для демонстрации веб-проектов и дизайна. Полностью адаптивная с анимациями.",
        "projects.project2.title": "Сайт бизнеса",
        "projects.project2.description": "3-страничный адаптивный сайт с чистой типографикой и оптимизированной производительностью.",
        "projects.project3.title": "AI Dashboard UI",
        "projects.project3.description": "Прототип панели управления с графиками, карточками статистики и темной темой.",
        "projects.project4.title": "Product Landing",
        "projects.project4.description": "Современная продуктовая страница с анимациями и блоками для конверсии.",
        "projects.project5.title": "Brand Identity Pack",
        "projects.project5.description": "Гайд бренда с логотипом, цветовой палитрой и мокапами — просто, чисто, консистентно.",
        "projects.viewLive": "Посмотреть →",
        "about.title": "Обо мне",
        "about.text1": "Я Микола — frontend разработчик и дизайнер, сосредоточенный на создании быстрых, минималистичных и удобных веб-интерфейсов.",
        "about.text2": "Люблю строить с нуля: от идеи и дизайна до чистого, адаптивного кода. Мои основные инструменты — HTML, CSS, JavaScript и React.",
        "about.text3": "Стремлюсь к четкости, плавному пользовательскому потоку и эффективной структуре в каждом проекте.",
        "about.skill1.title": "Frontend", "about.skill1.text": "HTML, CSS, JS, React",
        "about.skill2.title": "Дизайн", "about.skill2.text": "Figma, UI/UX, Branding",
        "about.skill3.title": "Workflow", "about.skill3.text": "Git, Vite, Responsive",
        "contact.title": "Свяжитесь со мной",
        "contact.intro": "Готовы к сотрудничеству? Найдите меня на любой платформе ниже.",
        "footer.text": "© 2025 Микола Портфолио. Все права защищены."
    }
};

const FLAGS = { en: '🇬🇧', uk: '🇺🇦', ru: '🇷🇺' };

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

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

// ===== SCROLL EFFECTS =====
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
            
            // Nav background
            nav?.classList.toggle('scrolled', y > 100);
            
            // Parallax
            if (y < window.innerHeight) {
                if (heroContent) {
                    heroContent.style.transform = `translateY(${y * 0.3}px)`;
                    heroContent.style.opacity = Math.max(0, 1 - y / 700);
                }
                if (heroVisual) heroVisual.style.transform = `translateY(${y * 0.15}px)`;
            }
            
            // Active link
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

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    Lang.init();
    AOS?.init({ duration: 1000, once: true, offset: 100 });
    
    console.log('%cМикола Портфоліо', 'color:#6366f1;font-size:24px;font-weight:bold');
    console.log('%cHTML • CSS • JavaScript', 'color:#a1a1aa;font-size:14px');
});

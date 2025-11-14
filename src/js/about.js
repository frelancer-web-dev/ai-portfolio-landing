// ===== AVATAR SLIDER FOR ABOUT PAGE =====

const AVATAR_IMAGES_ABOUT = [
    '../images/dodep-coder.png',
    '../images/dodeper.png',
    '../images/mykola.png',
    '../images/dodeper1.png',
    '../images/dodeper2.png'
];

function initAvatarSliderAbout() {
    const avatarImg = document.querySelector('.avatar-large img');
    if (!avatarImg) return;
    
    let currentIndex = 0;
    let intervalId = null;
    
    function changeAvatar() {
        // Fade out
        avatarImg.classList.add('fade-out');
        
        setTimeout(() => {
            // Change image
            currentIndex = (currentIndex + 1) % AVATAR_IMAGES_ABOUT.length;
            avatarImg.src = AVATAR_IMAGES_ABOUT[currentIndex];
            
            // Fade in
            avatarImg.classList.remove('fade-out');
            avatarImg.classList.add('fade-in');
            
            setTimeout(() => {
                avatarImg.classList.remove('fade-in');
            }, 1000);
        }, 1000);
    }
    
    // Start slider
    intervalId = setInterval(changeAvatar, 10000);
    
    // Stop on hover
    const avatarContainer = document.querySelector('.avatar-large');
    if (avatarContainer) {
        avatarContainer.addEventListener('mouseenter', () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        });
        
        avatarContainer.addEventListener('mouseleave', () => {
            if (!intervalId) {
                intervalId = setInterval(changeAvatar, 10000);
            }
        });
    }
}

// ===== MEDIA TABS (VIDEO / RESUME) =====

function initMediaTabs() {
    const tabs = document.querySelectorAll('.media-tab');
    const contents = document.querySelectorAll('.media-content');
    
    if (!tabs.length || !contents.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(`${targetTab}Content`);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Load resume when switching to resume tab
                if (targetTab === 'resume') {
                    loadResume();
                }
            }
        });
    });
}

// ===== LOAD AND RENDER MARKDOWN RESUME =====

let resumeLoaded = false;

async function loadResume() {
    if (resumeLoaded) return; // Don't load twice
    
    const resumeContainer = document.getElementById('resumeMarkdown');
    if (!resumeContainer) return;
    
    try {
        const response = await fetch('../res/resume.md');
        if (!response.ok) {
            throw new Error('Failed to load resume');
        }
        
        const markdown = await response.text();
        const html = parseMarkdown(markdown);
        
        resumeContainer.innerHTML = html;
        resumeLoaded = true;
        
    } catch (error) {
        console.error('Error loading resume:', error);
        resumeContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <p>Unable to load resume. Please try downloading it instead.</p>
            </div>
        `;
    }
}

// ===== SIMPLE MARKDOWN PARSER =====

function parseMarkdown(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Code inline
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // Unordered lists
    html = html.split('\n').map(line => {
        if (line.trim().match(/^[\*\-] /)) {
            const content = line.trim().replace(/^[\*\-] /, '');
            return `<li>${content}</li>`;
        }
        return line;
    }).join('\n');
    
    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li>.*?<\/li>\n?)+/g, match => `<ul>${match}</ul>`);
    
    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    
    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');
    
    // Tables - простий парсинг
    const lines = html.split('\n');
    let inTable = false;
    let tableRows = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('|')) {
            if (line.includes('---')) continue; // Skip separator
            const cells = line.split('|').filter(c => c.trim());
            if (cells.length > 0) {
                const cellTags = cells.map(cell => `<td>${cell.trim()}</td>`).join('');
                tableRows.push(`<tr>${cellTags}</tr>`);
                inTable = true;
            }
        } else if (inTable && tableRows.length > 0) {
            const tableHtml = `<table>${tableRows.join('')}</table>`;
            html = html.replace(tableRows.map((_, idx) => lines[i - tableRows.length + idx]).join('\n'), tableHtml);
            tableRows = [];
            inTable = false;
        }
    }
    
    // Line breaks and paragraphs
    html = html.split('\n\n').map(para => {
        para = para.trim();
        if (!para) return '';
        
        // Don't wrap these tags in <p>
        if (para.startsWith('<h') || 
            para.startsWith('<ul') || 
            para.startsWith('<ol') || 
            para.startsWith('<pre') ||
            para.startsWith('<table') ||
            para.startsWith('<blockquote') ||
            para.startsWith('<hr')) {
            return para;
        }
        
        return `<p>${para.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');
    
    // Clean up double tags
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    html = html.replace(/<\/ol>\s*<ol>/g, '');
    
    return html;
}

// ===== INITIALIZE ALL =====

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initAvatarSliderAbout();
        initMediaTabs();
    });
} else {
    initAvatarSliderAbout();
    initMediaTabs();
}

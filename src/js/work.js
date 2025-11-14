// ===== WORK PAGE FUNCTIONALITY =====

// Load projects data and count them
async function loadProjectCount() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error('Failed to load projects');
        }
        
        const projectsData = await response.json();
        const projectCount = Object.keys(projectsData).length;
        
        // Animate counter
        animateCounter(projectCount);
        
    } catch (error) {
        console.error('Error loading project count:', error);
        // Fallback count
        const projectCountEl = document.getElementById('projectCount');
        if (projectCountEl) {
            projectCountEl.textContent = '9';
        }
    }
}

// Animate counter from 0 to target
function animateCounter(target) {
    const counterEl = document.getElementById('projectCount');
    if (!counterEl) return;
    
    let current = 0;
    const increment = Math.ceil(target / 30);
    const duration = 1000; // 1 second
    const stepTime = duration / (target / increment);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counterEl.textContent = target;
            clearInterval(timer);
        } else {
            counterEl.textContent = current;
        }
    }, stepTime);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadProjectCount();
});

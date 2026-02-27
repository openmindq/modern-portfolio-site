// Particle System Implementation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.previousElementSibling;
    const code = codeBlock.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Terminal Typing Animation
const terminalBody = document.getElementById('terminal-body');
const terminalLines = [
    { text: 'openmind chat "Create a REST API"', type: 'input' },
    { text: '✓ Analyzing project requirements...', type: 'response' },
    { text: '✓ Creating architectural plan (plan.md)', type: 'response' },
    { text: '✓ Initializing GitHub repository', type: 'response' },
    { text: '✓ Writing Express.js boilerplate', type: 'response' },
    { text: '✓ Implementing JWT Auth & Database models', type: 'response' },
    { text: '✓ Running 12 automated verification tests', type: 'response' },
    { text: '🚀 Deployed to production environment!', type: 'response' }
];

async function typeTerminal() {
    terminalBody.innerHTML = '';
    
    for (const line of terminalLines) {
        const div = document.createElement('div');
        div.className = 'terminal-line';
        
        if (line.type === 'input') {
            div.innerHTML = `<span class="prompt">$</span><span class="typewriter"></span><span class="cursor"></span>`;
            terminalBody.appendChild(div);
            const typewriter = div.querySelector('.typewriter');
            const cursor = div.querySelector('.cursor');
            
            for (let i = 0; i < line.text.length; i++) {
                typewriter.textContent += line.text[i];
                await new Promise(r => setTimeout(r, 60 + Math.random() * 40));
            }
            cursor.remove();
        } else {
            div.innerHTML = `<span class="response">${line.text}</span>`;
            terminalBody.appendChild(div);
            await new Promise(r => setTimeout(r, 500 + Math.random() * 300));
        }
    }
    
    setTimeout(typeTerminal, 5000);
}

// Start terminal animation
typeTerminal();

// Intersection Observer for fade-in elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .step, .hero-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Add a helper class for observer
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
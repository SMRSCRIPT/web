// تكوينات الجسيمات المتقدمة

const particleConfigs = {
    // التكوين الأساسي
    basic: {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#6C63FF" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00D4FF",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        }
    },

    // تكوين النيون
    neon: {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: ["#6C63FF", "#00D4FF", "#FF6584"] },
            shape: { type: "circle" },
            opacity: { value: 0.8, random: true },
            size: { value: 4, random: true },
            line_linked: {
                enable: true,
                distance: 100,
                color: "#ffffff",
                opacity: 0.6,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "bubble" },
                resize: true
            }
        }
    },

    // تكوين النجوم
    stars: {
        particles: {
            number: { value: 200, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: false },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            },
            twinkle: {
                particles: {
                    enable: true,
                    color: "#00D4FF",
                    frequency: 0.05,
                    opacity: 1
                }
            }
        }
    },

    // تكوين الطاقة
    energy: {
        particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: "#00D4FF" },
            shape: { type: "circle" },
            opacity: { value: 0.8, random: true },
            size: { value: 5, random: true, anim: { enable: true, speed: 2, size_min: 1 } },
            line_linked: {
                enable: true,
                distance: 200,
                color: "#6C63FF",
                opacity: 0.8,
                width: 2
            },
            move: {
                enable: true,
                speed: 5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        }
    }
};

// تهيئة الجسيمات
function initParticles() {
    if(typeof particlesJS !== 'undefined') {
        // يمكنك تغيير التكوين هنا
        particlesJS('particles-js', particleConfigs.neon);
        
        // تبديل التكوينات تلقائياً
        setInterval(() => {
            switchParticleTheme();
        }, 30000);
    }
}

// تبديل موضوع الجسيمات
function switchParticleTheme() {
    const themes = ['basic', 'neon', 'stars', 'energy'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    // إزالة الجسيمات الحالية
    pJS = null;
    
    // إضافة الجسيمات الجديدة
    setTimeout(() => {
        particlesJS('particles-js', particleConfigs[randomTheme]);
    }, 500);
}

// تأثيرات الجسيمات التفاعلية
document.addEventListener('DOMContentLoaded', function() {
    // إضافة مستمعين للأحداث
    const canvas = document.querySelector('#particles-js canvas');
    
    if(canvas) {
        canvas.addEventListener('click', (e) => {
            createParticleExplosion(e);
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if(Math.random() > 0.9) {
                createParticleTrail(e);
            }
        });
    }
});

// انفجار الجسيمات
function createParticleExplosion(e) {
    const particlesContainer = document.getElementById('particles-js');
    
    for(let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        
        const x = e.clientX;
        const y = e.clientY;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // ألوان عشوائية
        const colors = ['#6C63FF', '#00D4FF', '#FF6584', '#FFD166'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        
        // سرعة واتجاه عشوائي
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        particlesContainer.appendChild(particle);
        
        // تحريك الجسيم
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const moveParticle = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if(opacity > 0) {
                requestAnimationFrame(moveParticle);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(moveParticle);
    }
}

// أثر الجسيمات
function createParticleTrail(e) {
    const particlesContainer = document.getElementById('particles-js');
    
    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    
    // حجم عشوائي
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // لون عشوائي
    const colors = ['#6C63FF', '#00D4FF', '#FF6584'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    
    particlesContainer.appendChild(particle);
    
    // اختفاء تدريجي
    let opacity = 0.8;
    
    const fadeParticle = () => {
        opacity -= 0.05;
        particle.style.opacity = opacity;
        
        if(opacity > 0) {
            requestAnimationFrame(fadeParticle);
        } else {
            particle.remove();
        }
    };
    
    requestAnimationFrame(fadeParticle);
}

// موجات الجسيمات
function createParticleWave() {
    const particlesContainer = document.getElementById('particles-js');
    const waveCount = 10;
    
    for(let i = 0; i < waveCount; i++) {
        setTimeout(() => {
            for(let j = 0; j < 10; j++) {
                createWaveParticle(i * 100, j * 40);
            }
        }, i * 100);
    }
}

function createWaveParticle(startX, offsetY) {
    const particlesContainer = document.getElementById('particles-js');
    
    const particle = document.createElement('div');
    particle.className = 'wave-particle';
    
    const x = startX;
    const y = window.innerHeight / 2 + offsetY;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // لون موجة
    const hue = (Date.now() / 10) % 360;
    particle.style.background = `hsl(${hue}, 100%, 60%)`;
    
    particlesContainer.appendChild(particle);
    
    // حركة الموجة
    let posX = x;
    let amplitude = Math.sin(posX / 100) * 50;
    let opacity = 1;
    
    const moveWave = () => {
        posX += 3;
        amplitude = Math.sin(posX / 100) * 50;
        opacity -= 0.01;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${y + amplitude}px`;
        particle.style.opacity = opacity;
        
        if(posX < window.innerWidth && opacity > 0) {
            requestAnimationFrame(moveWave);
        } else {
            particle.remove();
        }
    };
    
    requestAnimationFrame(moveWave);
}

// تشكيلات الجسيمات
function createParticleShape(shape) {
    const particlesContainer = document.getElementById('particles-js');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 100;
    const particleCount = 50;
    
    for(let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'shape-particle';
        
        let x, y;
        
        switch(shape) {
            case 'circle':
                const angle = (i / particleCount) * Math.PI * 2;
                x = centerX + Math.cos(angle) * radius;
                y = centerY + Math.sin(angle) * radius;
                break;
                
            case 'spiral':
                const spiralAngle = i * 0.5;
                const spiralRadius = i * 2;
                x = centerX + Math.cos(spiralAngle) * spiralRadius;
                y = centerY + Math.sin(spiralAngle) * spiralRadius;
                break;
                
            case 'grid':
                const cols = 10;
                const rows = 5;
                const col = i % cols;
                const row = Math.floor(i / cols);
                x = centerX + (col - cols/2) * 30;
                y = centerY + (row - rows/2) * 30;
                break;
        }
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // لون متدرج
        const hue = (i / particleCount) * 360;
        particle.style.background = `hsl(${hue}, 100%, 60%)`;
        
        particlesContainer.appendChild(particle);
        
        // تحريك نحو المركز
        animateToCenter(particle, centerX, centerY);
    }
}

function animateToCenter(particle, centerX, centerY) {
    const rect = particle.getBoundingClientRect();
    let x = rect.left;
    let y = rect.top;
    
    const animate = () => {
        const dx = centerX - x;
        const dy = centerY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if(distance > 5) {
            x += dx * 0.1;
            y += dy * 0.1;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            requestAnimationFrame(animate);
        } else {
            particle.remove();
            createParticleExplosion({ clientX: centerX, clientY: centerY });
        }
    };
    
    requestAnimationFrame(animate);
}

// تهيئة كل التأثيرات
function initAllParticleEffects() {
    initParticles();
    
    // بدء الموجات
    setInterval(createParticleWave, 5000);
    
    // بدء التشكيلات
    setInterval(() => {
        const shapes = ['circle', 'spiral', 'grid'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        createParticleShape(randomShape);
    }, 10000);
}

// تصدير الوظائف
window.ParticleEffects = {
    init: initAllParticleEffects,
    createExplosion: createParticleExplosion,
    createShape: createParticleShape,
    createWave: createParticleWave
};

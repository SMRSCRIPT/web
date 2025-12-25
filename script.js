// ===== تهيئة الموقع =====
document.addEventListener('DOMContentLoaded', function() {
    initSite();
});

function initSite() {
    // 1. تهيئة الجسيمات
    initParticles();
    
    // 2. تهيئة المؤثرات
    initEffects();
    
    // 3. تهيئة الأزرار المغناطيسية
    initMagneticButtons();
    
    // 4. تهيئة العدادات
    initCounters();
    
    // 5. تهيئة شاشة التحميل
    initPreloader();
    
    // 6. تهيئة القائمة
    initNavigation();
    
    // 7. تهيئة البطاقات ثلاثية الأبعاد
    init3DCards();
    
    // 8. تهيئة التأثيرات التفاعلية
    initInteractiveEffects();
    
    // 9. تهيئة الموسيقى
    initAudio();
}

// ===== 1. الجسيمات =====
function initParticles() {
    if(typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
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
        });
    }
}

// ===== 2. المؤثرات =====
function initEffects() {
    // تأثيرات النيون العائمة
    createFloatingEffects();
    
    // تأثيرات الشرارة عند النقر
    document.addEventListener('click', createSparkle);
    
    // تأثير الماوس
    initMouseTrail();
}

function createFloatingEffects() {
    setInterval(() => {
        const effects = ['neon', 'orb', 'ring', 'sparkle'];
        const effect = effects[Math.floor(Math.random() * effects.length)];
        createFloatingEffect(effect);
    }, 3000);
}

function createFloatingEffect(type) {
    const container = document.querySelector('.floating-neon');
    if(!container) return;
    
    const effect = document.createElement('div');
    effect.className = `floating-${type}`;
    
    // تحديد موقع عشوائي
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    
    container.appendChild(effect);
    
    // إزالة التأثير بعد انتهائه
    setTimeout(() => {
        effect.remove();
    }, 5000);
}

// ===== 3. الأزرار المغناطيسية =====
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
            
            // إضافة جسيمات
            if(Math.random() > 0.7) {
                createButtonParticle(e, this);
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

function createButtonParticle(e, button) {
    const particle = document.createElement('div');
    particle.className = 'btn-particle';
    
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    button.querySelector('.btn-particles')?.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// ===== 4. العدادات =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 ثانية
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if(current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== 5. شاشة التحميل =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress');
    
    if(!preloader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if(progress > 100) progress = 100;
        
        if(progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if(progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // بدء الموسيقى
                startBackgroundMusic();
                
                // إظهار المؤثرات
                showInitialEffects();
            }, 500);
        }
    }, 200);
}

// ===== 6. التنقل =====
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // تأثيرات الروابط
    const navLinksAll = document.querySelectorAll('.nav-link');
    navLinksAll.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createLinkEffect(link);
        });
    });
}

function createLinkEffect(link) {
    const effect = document.createElement('div');
    effect.className = 'link-effect';
    link.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 1000);
}

// ===== 7. البطاقات ثلاثية الأبعاد =====
function init3DCards() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 20;
            const rotateX = ((centerY - y) / centerY) * 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // تأثير الوهج
            const glow = card.querySelector('.card-glow');
            if(glow) {
                glow.style.opacity = '0.3';
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            const glow = card.querySelector('.card-glow');
            if(glow) {
                glow.style.opacity = '0';
            }
        });
    });
}

// ===== 8. التأثيرات التفاعلية =====
function initInteractiveEffects() {
    // تأثيرات النص
    initTextEffects();
    
    // تأثيرات الصور
    initImageEffects();
    
    // تأثيرات الماوس
    initMouseEffects();
}

function initTextEffects() {
    const textElements = document.querySelectorAll('.text-gradient, .text-shine, .text-neon');
    
    textElements.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.animationPlayState = 'running';
        });
        
        text.addEventListener('mouseleave', () => {
            setTimeout(() => {
                text.style.animationPlayState = 'paused';
            }, 1000);
        });
    });
}

function initImageEffects() {
    const images = document.querySelectorAll('.hologram-image');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.filter = 'hue-rotate(180deg)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.filter = 'hue-rotate(0deg)';
        });
    });
}

function initMouseEffects() {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    });
}

// ===== 9. الصوت =====
function initAudio() {
    const playBtn = document.getElementById('playMusic');
    const muteBtn = document.getElementById('muteMusic');
    const audio = document.getElementById('bgMusic');
    
    if(playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if(audio.paused) {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
    
    if(muteBtn && audio) {
        muteBtn.addEventListener('click', () => {
            audio.muted = !audio.muted;
            muteBtn.innerHTML = audio.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        });
    }
}

// ===== وظائف مساعدة =====
function createSparkle(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

function startBackgroundMusic() {
    const audio = document.getElementById('bgMusic');
    if(audio) {
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Auto-play prevented'));
    }
}

function showInitialEffects() {
    // إظهار تأثيرات الافتتاح
    for(let i = 0; i < 20; i++) {
        setTimeout(() => {
            createSparkle({
                clientX: Math.random() * window.innerWidth,
                clientY: Math.random() * window.innerHeight
            });
        }, i * 100);
    }
}

// ===== تأثيرات التمرير =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.cosmic-nav');
    const scrollTop = window.pageYOffset;
    
    if(scrollTop > 100) {
        navbar.style.background = 'rgba(10, 14, 23, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 14, 23, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    // تأثيرات التمرير على العناصر
    animateOnScroll();
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if(elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// ===== تهيئة التأثيرات النهائية =====
window.addEventListener('load', () => {
    // بدء جميع التأثيرات بعد تحميل الصفحة
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

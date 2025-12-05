// Portfolio JavaScript - Enhanced Liquid Glass Design
document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Create floating particles
    function createParticles() {
        if (prefersReducedMotion.matches) return;
        
        const container = document.getElementById('particles-container');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            const startX = Math.random() * 100;
            const drift = (Math.random() - 0.5) * 50; // -25 to 25
            const duration = 15 + Math.random() * 15; // 15-30s
            const delay = Math.random() * 10; // 0-10s
            const size = 2 + Math.random() * 4; // 2-6px
            
            particle.style.left = `${startX}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.setProperty('--drift', `${drift}px`);
            
            container.appendChild(particle);
        }
    }
    createParticles();

    // Add smooth scroll behavior
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

    // Enhanced intersection observer with stagger effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all sections and glass cards for animation
    document.querySelectorAll('section, .glass-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });

    // Mouse parallax effect on glass cards
    if (!prefersReducedMotion.matches) {
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
    }

    // Parallax scroll effect for background decorations
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking && !prefersReducedMotion.matches) {
            window.requestAnimationFrame(function() {
                const scrolled = window.scrollY;
                
                // Header parallax
                const header = document.querySelector('header');
                if (header) {
                    header.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                
                // Background decorations parallax
                const aiChip = document.querySelector('.ai-chip');
                const neuralNetwork = document.querySelector('.neural-network');
                const dataViz = document.querySelector('.data-visualization');
                
                if (aiChip) aiChip.style.transform = `translateY(${scrolled * 0.15}px)`;
                if (neuralNetwork) neuralNetwork.style.transform = `translateY(${scrolled * 0.1}px)`;
                if (dataViz) dataViz.style.transform = `translateY(${scrolled * 0.2}px)`;
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Tech tag wave animation
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        if (!prefersReducedMotion.matches) {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.style.animation = 'tagPulse 2s ease-in-out infinite';
        }
        
        tag.addEventListener('click', function() {
            if (!prefersReducedMotion.matches) {
                this.style.animation = 'tagBounce 0.5s ease';
                setTimeout(() => {
                    this.style.animation = 'tagPulse 2s ease-in-out infinite';
                    this.style.animationDelay = `${index * 0.1}s`;
                }, 500);
            }
        });
    });

    // Add dynamic keyframes for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tagPulse {
            0%, 100% { box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.2); }
            50% { box-shadow: 0 6px 24px 0 rgba(31, 38, 135, 0.4); }
        }
        
        @keyframes tagBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
        }
        
        @media (prefers-reduced-motion: reduce) {
            @keyframes tagPulse { }
            @keyframes tagBounce { }
        }
    `;
    document.head.appendChild(style);

    // Career timeline progressive reveal
    const careerItems = document.querySelectorAll('.career-item');
    const careerObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    careerItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        careerObserver.observe(item);
    });

    // Add ripple effect on click
    document.querySelectorAll('.glass-card, .tech-tag, .career-item').forEach(element => {
        element.addEventListener('click', function(e) {
            if (prefersReducedMotion.matches) return;
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            const rippleStyle = document.createElement('style');
            rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Console message
    console.log('🎨 Portfolio loaded with enhanced liquid glass design');
    console.log('✨ Dynamic animations active');
    console.log('👨‍💻 Developed by 畑田 祐陽 (Yuhi Hatada)');
});

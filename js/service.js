// service.js - Lightweight Smooth Scrolling Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize WOW.js
    new WOW().init();

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileNav.classList.add('active');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Section Scroll Animations
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-100px 0px -100px 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Booking Buttons Modal
    document.querySelectorAll('.btn_1').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                const card = this.closest('.kit-card') || this.closest('.service-card');
                const itemName = card ? 
                    (card.querySelector('.kit-name')?.textContent || 
                     card.querySelector('.service-title')?.textContent) : 
                    'Design Service';
                
                // Simple alert for booking confirmation
                alert(`Thank you for your interest in ${itemName}!\n\nOur team will contact you shortly to discuss your project.`);
            }
        });
    });

    // Header Background Change on Scroll
    const header = document.getElementById('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    header.style.background = 'var(--light)';
                    header.style.boxShadow = '0 2px 20px rgba(136, 33, 47, 0.1)';
                } else {
                    header.style.background = '#fffff';
                    header.style.boxShadow = 'none';
                }
            });
        }, {
            threshold: 0,
            rootMargin: '-100px 0px 0px 0px'
        });

        headerObserver.observe(heroSection);
    }

    // Add CSS for smooth animations
    if (!document.querySelector('#smooth-animations')) {
        const style = document.createElement('style');
        style.id = 'smooth-animations';
        style.textContent = `
            section {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }
            section.section-visible {
                opacity: 1;
                transform: translateY(0);
            }
            .nav-links a {
                transition: color 0.3s ease;
            }
            .nav-links a:hover {
                color: var(--primary);
            }
            .kit-card, .service-card {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .kit-card:hover, .service-card:hover {
                transform: translateY(-5px);
            }
        `;
        document.head.appendChild(style);
    }
});

// Add scroll progress indicator (optional lightweight feature)
window.addEventListener('scroll', function() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollPercent + '%';
});
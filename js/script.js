// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Header scroll effect
    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Fade in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Smooth scroll animation for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenu = document.getElementById('closeMenu');

    mobileMenu.addEventListener('click', function () {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', function () {
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close mobile menu when clicking on links
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Timeline Popup
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const timelinePopup = document.getElementById('timelinePopup');
    const closePopup = document.getElementById('closePopup');

    // Open timeline popup
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function () {
            timelinePopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close timeline popup
    if (closePopup) {
        closePopup.addEventListener('click', function () {
            timelinePopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close popup when clicking outside
    if (timelinePopup) {
        timelinePopup.addEventListener('click', function (e) {
            if (e.target === timelinePopup) {
                timelinePopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Process Modal Functionality
    const processModal = document.getElementById('processModal');
    const nextPageBtn = document.querySelector('.next-page-btn');
    const closeModal = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Open modal
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            processModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal
    function closeProcessModal() {
        processModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeProcessModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProcessModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && processModal.style.display === 'block') {
            closeProcessModal();
        }
    });

    // FAQ Toggle Functionality
    function initFAQToggle() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                // Add click animation
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // Open first FAQ by default
        if (faqItems.length > 0) {
            setTimeout(() => {
                faqItems[0].classList.add('active');
            }, 1000);
        }
    }
    
    // Initialize FAQ toggle
    initFAQToggle();

    // Design Kits 3D effect
    const cards = document.querySelectorAll('.kit-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;

            const rotateX = (mouseY / (cardRect.height / 2)) * -5;
            const rotateY = (mouseX / (cardRect.width / 2)) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Animate process steps on scroll
    const processSteps = document.querySelectorAll('.process-step');
    
    function animateOnScroll() {
        processSteps.forEach(step => {
            const stepTop = step.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (stepTop < windowHeight - 100) {
                step.classList.add('visible');
            }
        });
    }
    
    // Initial animation check
    animateOnScroll();
    
    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);
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
// Case Studies JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseStudies = document.querySelectorAll('.case-study');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterCaseStudies(filter);
        });
    });

    function filterCaseStudies(filter) {
        caseStudies.forEach(study => {
            if (filter === 'all') {
                study.style.display = 'block';
                setTimeout(() => {
                    study.style.opacity = '1';
                    study.style.transform = 'translateY(0)';
                }, 100);
            } else {
                const categories = study.getAttribute('data-category').split(' ');
                if (categories.includes(filter)) {
                    study.style.display = 'block';
                    setTimeout(() => {
                        study.style.opacity = '1';
                        study.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    study.style.opacity = '0';
                    study.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        study.style.display = 'none';
                    }, 300);
                }
            }
        });
    }

    // Image hover effects
    const imageWrappers = document.querySelectorAll('.image-wrapper');
    
    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        wrapper.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // CTA button functionality
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('primary')) {
                e.preventDefault();
                alert('Starting Your Project\n\nRedirecting to consultation booking...');
            }
            // Secondary button (View Portfolio) will naturally navigate to portfolio page
        });
    });

    // Animation on scroll
    function animateOnScroll() {
        const caseStudies = document.querySelectorAll('.case-study');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0.2s';
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, { threshold: 0.1 });
        
        caseStudies.forEach(study => {
            observer.observe(study);
        });
    }

    // Initialize animations
    setTimeout(animateOnScroll, 500);

    // Add smooth scrolling for navigation
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
});
// portfolio.js - Lightweight Portfolio Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initFilterSystem();
    initScrollProgress();
    initScrollAnimations();
    initModalSystem();
    initLoadMore();
    initSmoothScrolling();
});

// Filter System
function initFilterSystem() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filter = this.dataset.filter;
            
            portfolioItems.forEach(item => {
                const categories = item.dataset.category.split(' ');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                item.style.display = shouldShow ? 'block' : 'none';
                
                // Add animation for visible items
                if (shouldShow) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                }
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.portfolio-item, .portfolio-header, .portfolio-nav, .portfolio-cta');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Modal System
function initModalSystem() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');

    // Project data
    const projects = {
        project1: {
            title: "Modern 3BHK, Bangalore",
            location: "Whitefield, Bangalore",
            area: "1,250 sq.ft",
            duration: "45 days",
            savings: "₹1.2L",
            kit: "SignatureKit",
            description: "A contemporary 3BHK apartment featuring open-plan living spaces, modern kitchen, and premium finishes.",
            features: ["Open-plan living area", "Modern modular kitchen", "3 bedrooms with built-in wardrobes", "2 luxury bathrooms", "Balcony with city views"],
            images: [
                "https://cdn.home-designing.com/wp-content/uploads/2018/11/luxury-interior-design-living-room.jpg",
                "https://cdn.home-designing.com/wp-content/uploads/2018/11/luxury-interior-design-dining-room.jpg"
            ]
        },
        project2: {
            title: "Luxury Penthouse, Chennai",
            location: "Boat Club Road, Chennai",
            area: "2,800 sq.ft",
            duration: "60 days",
            savings: "₹2.8L",
            kit: "LuxeKit",
            description: "An exclusive penthouse with panoramic city views, premium materials, and custom-designed interiors.",
            features: ["Panoramic city views", "Premium marble flooring", "Custom-designed furniture", "Home theater system", "Private terrace garden"],
            images: [
                "https://wallpapercave.com/wp/wp11265359.jpg",
                "https://wallpapercave.com/wp/wp11265360.jpg"
            ]
        },
        project3: {
            title: "Boutique Café, Bangalore",
            location: "Koramangala, Bangalore",
            area: "800 sq.ft",
            duration: "30 days",
            savings: "₹80K",
            kit: "SimpleKit",
            description: "A cozy boutique café with industrial-chic design, perfect for the urban coffee enthusiast.",
            features: ["Industrial-chic design", "Custom coffee bar", "Indoor planting", "Artisanal lighting", "Compact kitchen setup"],
            images: [
                "https://themansionatthevillages.com/wp-content/uploads/2022/10/Revision-Photo-24.jpg",
                "https://themansionatthevillages.com/wp-content/uploads/2022/10/Revision-Photo-25.jpg"
            ]
        },
        project4: {
            title: "Corporate Office, Delhi",
            location: "Connaught Place, Delhi",
            area: "5,000 sq.ft",
            duration: "75 days",
            savings: "₹4.5L",
            kit: "SignatureKit",
            description: "A professional corporate office space designed for productivity and employee well-being.",
            features: ["Open workspace layout", "Executive cabins", "Conference rooms", "Breakout areas", "Reception lounge"],
            images: [
                "https://th.bing.com/th/id/R.177ddddf5df5b9ba014d7a0d6622097f?rik=xW3qAeOZQqbr1w&riu=http%3a%2f%2fd21corporatepark.in%2fwp-content%2fuploads%2f2019%2f08%2flocation-img.jpg",
                "https://th.bing.com/th/id/R.177ddddf5df5b9ba014d7a0d6622097f?rik=xW3qAeOZQqbr1w&riu=http%3a%2f%2fd21corporatepark.in%2fwp-content%2fuploads%2f2019%2f08%2flocation-img2.jpg"
            ]
        },
        project5: {
            title: "Heritage Home, Mumbai",
            location: "Colaba, Mumbai",
            area: "3,200 sq.ft",
            duration: "90 days",
            savings: "₹3.2L",
            kit: "ArchKit",
            description: "A heritage home restoration blending traditional architecture with modern comforts.",
            features: ["Heritage restoration", "Modern amenities", "Period-appropriate materials", "Custom woodwork", "Landscaped courtyard"],
            images: [
                "https://tse2.mm.bing.net/th/id/OIP.SAyugyfxOs6iJrEmS5iqOAHaE8?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
                "https://tse2.mm.bing.net/th/id/OIP.SAyugyfxOs6iJrEmS5iqOAHaE8?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
            ]
        },
        project6: {
            title: "Smart Apartment, Hyderabad",
            location: "Gachibowli, Hyderabad",
            area: "950 sq.ft",
            duration: "35 days",
            savings: "₹95K",
            kit: "SimpleKit",
            description: "A compact smart apartment with space-saving solutions and modern technology integration.",
            features: ["Smart home automation", "Space-saving furniture", "Efficient storage solutions", "Modern kitchenette", "Compact bathroom design"],
            images: [
                "https://i.pinimg.com/736x/50/1a/07/501a07b58b105d699a9d7fe006a559b6.jpg",
                "https://i.pinimg.com/736x/50/1a/07/501a07b58b105d699a9d7fe006a559b7.jpg"
            ]
        }
    };

    // View project buttons
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.dataset.project;
            showProjectModal(projects[projectId]);
        });
    });

    function showProjectModal(project) {
        modalBody.innerHTML = `
            <div class="project-modal-content">
                <div class="modal-header-section">
                    <h2>${project.title}</h2>
                    <p class="modal-location">${project.location}</p>
                    <div class="modal-badge ${project.kit.toLowerCase()}">${project.kit}</div>
                </div>
                
                <div class="modal-image-gallery">
                    <div class="main-image">
                        <img src="${project.images[0]}" alt="${project.title}" loading="lazy">
                    </div>
                </div>
                
                <div class="modal-project-details">
                    <div class="details-grid">
                        <div class="detail-item">
                            <i class="fas fa-ruler-combined"></i>
                            <span>${project.area}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${project.duration}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-rupee-sign"></i>
                            <span>${project.savings} saved</span>
                        </div>
                    </div>
                    
                    <div class="project-description">
                        <h3>Project Overview</h3>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Load More
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let visibleCount = 6;

    // Hide items beyond initial count
    portfolioItems.forEach((item, index) => {
        if (index >= visibleCount) {
            item.style.display = 'none';
        }
    });

    loadMoreBtn.addEventListener('click', function() {
        visibleCount += 3;
        
        portfolioItems.forEach((item, index) => {
            if (index < visibleCount) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            }
        });

        // Hide button when all items are visible
        if (visibleCount >= portfolioItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Simple Booking Modal
function showBookingModal(service) {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <h3>🎉 Thank You!</h3>
            <p>We've received your interest in <strong>${service}</strong>.</p>
            <p>Our architect will contact you within 24 hours.</p>
            <button class="btn-confirm">Got It!</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-overlay').addEventListener('click', () => modal.remove());
    modal.querySelector('.btn-confirm').addEventListener('click', () => modal.remove());
    
    // Add minimal styles
    if (!document.querySelector('#booking-modal-css')) {
        const style = document.createElement('style');
        style.id = 'booking-modal-css';
        style.textContent = `
            .booking-modal {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                z-index: 9999; padding: 20px;
            }
            .booking-modal .modal-overlay {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); backdrop-filter: blur(5px);
            }
            .booking-modal .modal-content {
                position: relative; background: white; padding: 30px;
                border-radius: 15px; text-align: center; max-width: 400px;
                width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            .booking-modal h3 { color: var(--primary); margin-bottom: 15px; }
            .booking-modal p { margin-bottom: 10px; color: var(--accent); }
            .booking-modal .btn-confirm {
                background: var(--primary); color: white; border: none;
                padding: 12px 30px; border-radius: 25px; margin-top: 20px;
                cursor: pointer; font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }
}

// Add click handlers for CTA buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.consultation-btn') || 
        e.target.closest('.cta-btn.secondary')) {
        e.preventDefault();
        showBookingModal('Portfolio Consultation');
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
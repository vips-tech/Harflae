// Portfolio Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.getElementById('portfolioGrid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Load More functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let visibleItems = 6;
    const allItems = document.querySelectorAll('.portfolio-item');

    // Initially hide items beyond the first 6
    allItems.forEach((item, index) => {
        if (index >= visibleItems) {
            item.style.display = 'none';
        }
    });

    loadMoreBtn.addEventListener('click', function() {
        visibleItems += 3;
        
        allItems.forEach((item, index) => {
            if (index < visibleItems) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }
        });

        // Hide load more button if all items are visible
        if (visibleItems >= allItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // Project Modal functionality
    const projectModal = document.getElementById('projectModal');
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
            savings: "₹1.2 Lakhs",
            kit: "SignatureKit",
            description: "A contemporary 3BHK apartment featuring open-plan living spaces, modern kitchen, and premium finishes.",
            features: ["Open-plan living area", "Modern modular kitchen", "3 bedrooms with built-in wardrobes", "2 luxury bathrooms", "Balcony with city views"],
            beforeAfter: [
                "https://cdn.home-designing.com/wp-content/uploads/2018/11/luxury-interior-design-living-room.jpg",
                "https://cdn.home-designing.com/wp-content/uploads/2018/11/luxury-interior-design-dining-room.jpg"
            ]
        },
        project2: {
            title: "Luxury Penthouse, Chennai",
            location: "Boat Club Road, Chennai",
            area: "2,800 sq.ft",
            duration: "60 days",
            savings: "₹2.8 Lakhs",
            kit: "LuxeKit",
            description: "An exclusive penthouse with panoramic city views, premium materials, and custom-designed interiors.",
            features: ["Panoramic city views", "Premium marble flooring", "Custom-designed furniture", "Home theater system", "Private terrace garden"],
            beforeAfter: [
                "https://wallpapercave.com/wp/wp11265359.jpg",
                "https://wallpapercave.com/wp/wp11265360.jpg"
            ]
        },
        project3: {
            title: "Boutique Café, Bangalore",
            location: "Koramangala, Bangalore",
            area: "800 sq.ft",
            duration: "30 days",
            savings: "₹80,000",
            kit: "SimpleKit",
            description: "A cozy boutique café with industrial-chic design, perfect for the urban coffee enthusiast.",
            features: ["Industrial-chic design", "Custom coffee bar", "Indoor planting", "Artisanal lighting", "Compact kitchen setup"],
            beforeAfter: [
                "https://themansionatthevillages.com/wp-content/uploads/2022/10/Revision-Photo-24.jpg",
                "https://themansionatthevillages.com/wp-content/uploads/2022/10/Revision-Photo-25.jpg"
            ]
        },
        project4: {
            title: "Corporate Office, Delhi",
            location: "Connaught Place, Delhi",
            area: "5,000 sq.ft",
            duration: "75 days",
            savings: "₹4.5 Lakhs",
            kit: "SignatureKit",
            description: "A professional corporate office space designed for productivity and employee well-being.",
            features: ["Open workspace layout", "Executive cabins", "Conference rooms", "Breakout areas", "Reception lounge"],
            beforeAfter: [
                "https://th.bing.com/th/id/R.177ddddf5df5b9ba014d7a0d6622097f?rik=xW3qAeOZQqbr1w&riu=http%3a%2f%2fd21corporatepark.in%2fwp-content%2fuploads%2f2019%2f08%2flocation-img.jpg",
                "https://th.bing.com/th/id/R.177ddddf5df5b9ba014d7a0d6622097f?rik=xW3qAeOZQqbr1w&riu=http%3a%2f%2fd21corporatepark.in%2fwp-content%2fuploads%2f2019%2f08%2flocation-img2.jpg"
            ]
        },
        project5: {
            title: "Heritage Home, Mumbai",
            location: "Colaba, Mumbai",
            area: "3,200 sq.ft",
            duration: "90 days",
            savings: "₹3.2 Lakhs",
            kit: "ArchKit",
            description: "A heritage home restoration blending traditional architecture with modern comforts.",
            features: ["Heritage restoration", "Modern amenities", "Period-appropriate materials", "Custom woodwork", "Landscaped courtyard"],
            beforeAfter: [
                "https://tse2.mm.bing.net/th/id/OIP.SAyugyfxOs6iJrEmS5iqOAHaE8?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
                "https://tse2.mm.bing.net/th/id/OIP.SAyugyfxOs6iJrEmS5iqOAHaE8?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
            ]
        },
        project6: {
            title: "Smart Apartment, Hyderabad",
            location: "Gachibowli, Hyderabad",
            area: "950 sq.ft",
            duration: "35 days",
            savings: "₹95,000",
            kit: "SimpleKit",
            description: "A compact smart apartment with space-saving solutions and modern technology integration.",
            features: ["Smart home automation", "Space-saving furniture", "Efficient storage solutions", "Modern kitchenette", "Compact bathroom design"],
            beforeAfter: [
                "https://i.pinimg.com/736x/50/1a/07/501a07b58b105d699a9d7fe006a559b6.jpg",
                "https://i.pinimg.com/736x/50/1a/07/501a07b58b105d699a9d7fe006a559b7.jpg"
            ]
        }
    };

    // View project button click
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                showProjectModal(project);
            }
        });
    });

    // Show project modal
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
                        <img src="${project.beforeAfter[0]}" alt="${project.title}">
                    </div>
                    <div class="image-thumbnails">
                        <img src="${project.beforeAfter[0]}" alt="Before" class="active">
                        <img src="${project.beforeAfter[1]}" alt="After">
                    </div>
                </div>
                
                <div class="modal-project-details">
                    <div class="details-grid">
                        <div class="detail-item">
                            <i class="fas fa-ruler-combined"></i>
                            <div>
                                <span class="detail-label">Area</span>
                                <span class="detail-value">${project.area}</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <span class="detail-label">Duration</span>
                                <span class="detail-value">${project.duration}</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-rupee-sign"></i>
                            <div>
                                <span class="detail-label">Client Savings</span>
                                <span class="detail-value">${project.savings}</span>
                            </div>
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
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    modalClose.addEventListener('click', closeModal);
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeModal();
        }
    });

    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });

    // CTA button functionality
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('primary')) {
                // Book consultation
                alert('Redirecting to consultation booking...');
            } else {
                // Talk to architect
                alert('Connecting you with an architect...');
            }
        });
    });

    // Consultation button in header
    const consultationBtn = document.querySelector('.consultation-btn');
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function() {
            alert('Opening consultation booking modal...');
        });
    }
});
// Services Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Service data
    const serviceData = {
        simplekit: {
            title: "SimpleKit",
            price: "₹150/sq.ft",
            description: "Perfect for budget-conscious homeowners looking for quick, beautiful makeovers without compromising on design quality.",
            features: [
                "2D floor plan layouts",
                "Basic mood board creation",
                "1 design revision",
                "Material suggestions",
                "Color scheme planning"
            ]
        },
        signaturekit: {
            title: "SignatureKit",
            price: "₹300/sq.ft",
            description: "Our most popular package for premium homes and offices, offering comprehensive design solutions.",
            features: [
                "Full 3D design visualization",
                "Detailed Bill of Quantities",
                "2 design revisions",
                "Site guidance sessions",
                "Material & vendor recommendations"
            ]
        },
        luxekit: {
            title: "LuxeKit",
            price: "₹500/sq.ft",
            description: "The ultimate luxury experience for high-end spaces with premium materials and custom detailing.",
            features: [
                "Premium material selection",
                "Custom architectural detailing",
                "Unlimited design revisions",
                "5 on-site visits",
                "Luxury brand partnerships"
            ]
        },
        archkit: {
            title: "ArchKit",
            price: "Custom Quote",
            description: "Complete architectural and interior design package for new constructions or major renovations.",
            features: [
                "Full architectural services",
                "Interior design package",
                "Site supervision",
                "Structural planning",
                "Project management"
            ]
        },
        execution: {
            title: "Execution Guardian",
            price: "+15% of project cost",
            description: "Let us guide you through the entire execution process with our vendor network and quality control.",
            features: [
                "Vendor selection & negotiation",
                "Site progress tracking",
                "Quality control checks",
                "Budget management",
                "Timeline supervision"
            ]
        },
        visualization: {
            title: "3D Visualization",
            price: "+₹25,000",
            description: "Photorealistic 3D renders that bring your design to life before construction begins.",
            features: [
                "Photorealistic renders",
                "360° virtual tour",
                "Material visualization",
                "Lighting simulation",
                "Multiple angle views"
            ]
        },
        sourcing: {
            title: "Material Sourcing",
            price: "Commission-free",
            description: "Direct access to premium materials at wholesale prices through our vendor partnerships.",
            features: [
                "Direct vendor negotiations",
                "Zero commission policy",
                "Quality assurance",
                "Bulk pricing benefits",
                "Material samples"
            ]
        },
        supervision: {
            title: "Site Supervision",
            price: "+₹50,000",
            description: "Professional oversight to ensure your project meets quality standards and stays on schedule.",
            features: [
                "Regular site inspections",
                "Quality control reports",
                "Progress photography",
                "Vendor coordination",
                "Issue resolution"
            ]
        }
    };

    // DOM Elements
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceModal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalBookBtn = document.getElementById('modalBookBtn');
    const bookConsultationBtn = document.getElementById('bookConsultation');
    const downloadBrochureBtn = document.getElementById('downloadBrochure');

    // Service item click handler
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceKey = this.getAttribute('data-service');
            const service = serviceData[serviceKey];
            
            if (service) {
                showServiceModal(service);
            }
        });
    });

    // Show service modal
    function showServiceModal(service) {
        modalTitle.textContent = service.title;
        modalPrice.textContent = service.price;
        modalDescription.textContent = service.description;
        
        // Clear previous features
        modalFeatures.innerHTML = '';
        
        // Add features
        service.features.forEach(feature => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.innerHTML = `
                <i class="fas fa-check"></i>
                <span>${feature}</span>
            `;
            modalFeatures.appendChild(featureItem);
        });
        
        // Set up book button
        modalBookBtn.onclick = function() {
            alert(`Booking consultation for: ${service.title}\n\nOur team will contact you within 24 hours to schedule your consultation.`);
            closeModal();
        };
        
        // Show modal
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        serviceModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Modal close handlers
    modalClose.addEventListener('click', closeModal);
    
    serviceModal.addEventListener('click', function(e) {
        if (e.target === serviceModal) {
            closeModal();
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
            closeModal();
        }
    });

    // CTA button handlers
    bookConsultationBtn.addEventListener('click', function() {
        alert('Booking General Consultation\n\nRedirecting to our booking calendar...');
    });

    downloadBrochureBtn.addEventListener('click', function() {
        alert('Downloading Services Brochure\n\nYour download will begin shortly...');
        
        // Simulate download (in real implementation, this would trigger actual download)
        setTimeout(() => {
            alert('Brochure download complete! Check your downloads folder.');
        }, 2000);
    });

    // Add animation to service items on load
    function animateServiceItems() {
        serviceItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100 + 300);
        });
    }

    // Initialize animations
    setTimeout(animateServiceItems, 500);
});
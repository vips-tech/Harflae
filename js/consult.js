// Consultation Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const consultationForm = document.getElementById('consultationForm');
    const payBtn = document.getElementById('payBtn');
    const upiOptions = document.getElementById('upiOptions');
    const uploadArea = document.getElementById('uploadArea');
    const screenshotInput = document.getElementById('screenshot');
    const filePreview = document.getElementById('filePreview');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close');
    const modalBtn = document.querySelector('.modal-btn');
    const copyUpiBtns = document.querySelectorAll('.copy-upi');

    let paymentScreenshot = null;

    // Pay button click
    payBtn.addEventListener('click', function() {
        upiOptions.style.display = 'flex';
        payBtn.style.display = 'none';
    });

    // Copy UPI functionality
    copyUpiBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const upiId = this.getAttribute('data-upi');
            navigator.clipboard.writeText(upiId).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.background = '#27ae60';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '#747749';
                }, 2000);
            });
        });
    });

    // File upload functionality
    uploadArea.addEventListener('click', function() {
        screenshotInput.click();
    });

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.background = 'rgba(116, 119, 73, 0.2)';
        this.style.borderColor = '#747749';
    });

    uploadArea.addEventListener('dragleave', function() {
        this.style.background = 'rgba(116, 119, 73, 0.05)';
        this.style.borderColor = '#747749';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.background = 'rgba(116, 119, 73, 0.05)';
        this.style.borderColor = '#747749';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    screenshotInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    function handleFileUpload(file) {
        if (file.type.startsWith('image/')) {
            paymentScreenshot = file;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                filePreview.innerHTML = `
                    <img src="${e.target.result}" alt="Payment Screenshot">
                    <p>${file.name}</p>
                    <button type="button" class="remove-file">
                        <i class="fas fa-times"></i> Remove
                    </button>
                `;
                
                // Enable submit button
                submitBtn.disabled = false;
                
                // Add remove file functionality
                const removeBtn = filePreview.querySelector('.remove-file');
                removeBtn.addEventListener('click', function() {
                    paymentScreenshot = null;
                    filePreview.innerHTML = '';
                    screenshotInput.value = '';
                    submitBtn.disabled = true;
                });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file (JPG, PNG, etc.)');
        }
    }

    // Form submission
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!paymentScreenshot) {
            alert('Please upload payment screenshot before submitting.');
            return;
        }

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            projectType: document.getElementById('projectType').value,
            area: document.getElementById('area').value,
            budget: document.getElementById('budget').value,
            timeline: document.getElementById('timeline').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
            timestamp: new Date().toISOString()
        };

        // Send email with form data and screenshot
        sendConsultationEmail(formData, paymentScreenshot);
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        this.reset();
        paymentScreenshot = null;
        filePreview.innerHTML = '';
        upiOptions.style.display = 'none';
        payBtn.style.display = 'flex';
        submitBtn.disabled = true;
    });

    // Function to send email (using EmailJS)
    function sendConsultationEmail(formData, screenshot) {
        // This is a placeholder for email sending functionality
        console.log('Sending consultation request to: kirubakarandhoni7@gmail.com');
        console.log('Form data:', formData);
        console.log('Screenshot:', screenshot ? screenshot.name : 'No screenshot');
        
        // Example using EmailJS (you would need to set up an account)
        /*
        const templateParams = {
            to_email: 'kirubakarandhoni7@gmail.com',
            from_name: formData.fullName,
            from_email: formData.email,
            phone: formData.phone,
            project_type: formData.projectType,
            area: formData.area,
            budget: formData.budget,
            timeline: formData.timeline,
            location: formData.location,
            description: formData.description,
            attachment: screenshot
        };

        emailjs.send('your_service_id', 'your_template_id', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response);
            }, function(error) {
                console.log('Failed to send email:', error);
            });
        */
        
        // Alternative: Simple form submission with file upload
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('projectType', formData.projectType);
        data.append('area', formData.area);
        data.append('budget', formData.budget);
        data.append('timeline', formData.timeline);
        data.append('location', formData.location);
        data.append('description', formData.description);
        data.append('screenshot', screenshot);
        
        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted successfully with attachment');
        }, 1000);
    }

    // Show success modal
    function showSuccessModal() {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal functionality
    function closeSuccessModal() {
        successModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', closeSuccessModal);
    modalBtn.addEventListener('click', closeSuccessModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.style.display === 'block') {
            closeSuccessModal();
        }
    });

    // Form validation
    function validateForm() {
        const requiredFields = consultationForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = '#e9ecef';
            }
        });
        
        return isValid;
    }

    // Real-time validation
    consultationForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });
    });
});
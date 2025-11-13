// Form submission handler
document.getElementById('consultationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
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
    
    // Send email (using EmailJS or similar service)
    sendConsultationEmail(formData);
    
    // Show success modal
    showSuccessModal();
    
    // Reset form
    this.reset();
});

// Function to send email (using EmailJS)
function sendConsultationEmail(formData) {
    // This is a placeholder for email sending functionality
    // In a real implementation, you would use a service like EmailJS, Formspree, or your backend
    
    console.log('Sending consultation request to: kirubakarandhoni7@gmail.com');
    console.log('Form data:', formData);
    
    // Example using EmailJS (you would need to set up an account)
    /*
    emailjs.send('your_service_id', 'your_template_id', {
        to_email: 'kirubakarandhoni7@gmail.com',
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        area: formData.area,
        budget: formData.budget,
        timeline: formData.timeline,
        location: formData.location,
        description: formData.description
    })
    .then(function(response) {
        console.log('Email sent successfully!', response);
    }, function(error) {
        console.log('Failed to send email:', error);
    });
    */
    
    // Alternative: Simple form submission to Formspree
    /*
    fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _subject: 'New Consultation Request from ' + formData.fullName,
            _replyto: formData.email,
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            projectType: formData.projectType,
            area: formData.area,
            budget: formData.budget,
            timeline: formData.timeline,
            location: formData.location,
            description: formData.description
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Form submitted successfully:', data);
    })
    .catch(error => {
        console.error('Form submission error:', error);
    });
    */
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
}

// Close modal functionality
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('successModal').style.display = 'none';
});

document.querySelector('.modal-btn').addEventListener('click', function() {
    document.getElementById('successModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form validation
function validateForm() {
    const form = document.getElementById('consultationForm');
    const requiredFields = form.querySelectorAll('[required]');
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

// Add real-time validation
document.querySelectorAll('#consultationForm input, #consultationForm select, #consultationForm textarea').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#e9ecef';
        }
    });
});
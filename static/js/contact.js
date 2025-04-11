// JavaScript for contact page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Setup form validation
    setupFormValidation();
    
    // Setup any animations or effects
    setupAnimations();
});

// Form validation for contact form
function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Prevent default form submission
            e.preventDefault();
            
            // Validate form inputs
            if (validateForm()) {
                // If form is valid, submit it
                this.submit();
            }
        });
        
        // Add validation on blur for each field
        const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error messages on focus
            input.addEventListener('focus', function() {
                const errorElement = this.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
                this.classList.remove('error');
            });
        });
    }
}

// Validate the entire form before submission
function validateForm() {
    const form = document.getElementById('contact-form');
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    // Validate each field
    if (!validateField(nameInput)) isValid = false;
    if (!validateField(emailInput)) isValid = false;
    if (!validateField(subjectInput)) isValid = false;
    if (!validateField(messageInput)) isValid = false;
    
    return isValid;
}

// Validate a single form field
function validateField(field) {
    let isValid = true;
    const fieldName = field.getAttribute('name');
    
    // Remove any existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove error class
    field.classList.remove('error');
    
    // Check for empty fields
    if (field.value.trim() === '') {
        showError(field, 'This field is required');
        isValid = false;
    } else {
        // Specific validation for email
        if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Validation for message length
        if (fieldName === 'message' && field.value.length < 20) {
            showError(field, 'Message must be at least 20 characters');
            isValid = false;
        }
    }
    
    return isValid;
}

// Display error message for a field
function showError(field, message) {
    // Add error class to the field
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error-color)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    
    // Insert error message after the field
    field.parentElement.appendChild(errorElement);
}

// Setup animations or effects for the contact page
function setupAnimations() {
    // Animate form fields on focus
    const formFields = document.querySelectorAll('.form-input, .form-textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.style.transition = 'border-color 0.3s ease';
            this.style.borderColor = 'var(--accent-color)';
        });
        
        field.addEventListener('blur', function() {
            if (!this.classList.contains('error')) {
                this.style.borderColor = 'var(--secondary-bg)';
            }
        });
    });
    
    // Animate submit button on hover
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        submitBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }
}

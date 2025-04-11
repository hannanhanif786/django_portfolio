// Main JavaScript file for common functionality across the site

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    setupNavigation();
    
    // Animate elements on scroll
    setupScrollAnimations();
    
    // Tech stack filtering
    setupTechFiltering();
    
    // Initialize flash messages
    setupFlashMessages();
});

// Setup navigation and mobile menu
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Set active nav link based on current page
    const currentLocation = window.location.pathname;
    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation === linkPath) {
            link.classList.add('active');
        }
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    // Function to check if element is in viewport
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Initial check for elements in viewport
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
    
    // Check elements on scroll
    window.addEventListener('scroll', function() {
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const parent = bar.parentElement;
            if (isInViewport(parent)) {
                const width = bar.getAttribute('data-progress') + '%';
                bar.style.width = width;
            }
        });
    }
    
    // Initial animation
    animateProgressBars();
    
    // Animate on scroll
    window.addEventListener('scroll', animateProgressBars);
}

// Setup tech stack filtering
function setupTechFiltering() {
    const techTabs = document.querySelectorAll('.tech-tab');
    const techCards = document.querySelectorAll('.tech-card');
    
    if (techTabs.length > 0) {
        techTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                techTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                console.log("testing category : ", category)
                // Filter tech cards
                techCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    console.log("testing category : ", category)
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Set first tab as active by default
        techTabs[0].click();
    }
}

// Setup flash messages
function setupFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        // Auto-dismiss flash messages after 5 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateX(100%)';
            
            // Remove from DOM after animation
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 5000);
        
        // Add close button functionality
        const closeBtn = message.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                message.style.opacity = '0';
                message.style.transform = 'translateX(100%)';
                
                // Remove from DOM after animation
                setTimeout(() => {
                    message.remove();
                }, 300);
            });
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

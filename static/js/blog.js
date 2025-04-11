// JavaScript for blog page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Setup blog card hover effects
    setupBlogCards();
    
    // Initialize syntax highlighting for code blocks
    setupCodeHighlighting();
});

// Setup blog card animations and effects
function setupBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
    });
}

// Setup code highlighting in blog posts
function setupCodeHighlighting() {
    // Get all code blocks in blog post
    const codeBlocks = document.querySelectorAll('pre code');
    
    if (codeBlocks.length > 0) {
        // Simple syntax highlighting without an external library
        codeBlocks.forEach(block => {
            // Simple version just applying some styling
            highlightSyntax(block);
        });
    }
}

// Simple syntax highlighting function
function highlightSyntax(codeBlock) {
    let content = codeBlock.innerHTML;
    
    // Highlight strings
    content = content.replace(/(["'`])(.*?)\1/g, '<span style="color:#bb86fc">$1$2$1</span>');
    
    // Highlight keywords
    const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'return', 'true', 
                       'false', 'for', 'while', 'class', 'import', 'export', 'from', 
                       'try', 'catch', 'async', 'await', 'new'];
    
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        content = content.replace(regex, `<span style="color:#03dac6">${keyword}</span>`);
    });
    
    // Highlight comments
    content = content.replace(/(\/\/.*)/g, '<span style="color:#6c7680">$1</span>');
    content = content.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6c7680">$1</span>');
    
    // Apply highlighted content
    codeBlock.innerHTML = content;
}

// Share blog post functionality
function sharePost(platform) {
    const url = window.location.href;
    const title = document.querySelector('.blog-post-title').textContent;
    
    let shareUrl;
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank');
}

// Related posts functionality
function loadRelatedPosts() {
    const relatedPosts = document.querySelector('.related-posts');
    
    if (relatedPosts) {
        const currentPostId = relatedPosts.getAttribute('data-post-id');
        
        // In a real implementation, this would be an AJAX call to the server
        // For this template, we're just showing/hiding the loading state
        
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
            
            // Simulate loading delay
            setTimeout(() => {
                loadingIndicator.style.display = 'none';
                
                // In a real implementation, the server would return related posts
                // and we would render them here
            }, 1000);
        }
    }
}

// RLDA Interactive Features - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('RLDA Intranet initializing...');
    
    // Initialize all interactive features
    initMobileNavigation();
    initScrollToTop(); // Initialize this first
    initScrollEffects();
    initAnimations();
    initObjectiveInteractions();
    initSmoothScrolling();
    initHeaderEffects();
    
    // Initialize animations after a short delay
    setTimeout(initOnLoadAnimations, 100);
    
    console.log('All RLDA features initialized successfully');
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Mobile menu toggled');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll to Top Button - Fixed Implementation
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        console.log('Scroll to top button found, initializing...');
        
        // Show/hide scroll to top button based on scroll position
        function toggleScrollTopButton() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Initial check
        toggleScrollTopButton();

        // Listen for scroll events with throttling
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(toggleScrollTopButton, 10);
        }, { passive: true });

        // Fixed scroll to top functionality
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Scroll to top button clicked');
            
            // Multiple fallback methods for scrolling to top
            if ('scrollTo' in window) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for older browsers
                const scrollStep = window.pageYOffset / 15;
                const scrollInterval = setInterval(function() {
                    if (window.pageYOffset !== 0) {
                        window.scrollBy(0, -scrollStep);
                    } else {
                        clearInterval(scrollInterval);
                    }
                }, 15);
            }
        });

        // Add keyboard support
        scrollTopBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        console.log('Scroll to top button initialized successfully');
    } else {
        console.error('Scroll to top button not found');
    }
}

// Scroll Effects and Animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with AOS attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Header Background Change on Scroll
function initHeaderEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        function updateHeader() {
            if (window.pageYOffset > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
        
        // Initial call
        updateHeader();
        
        // Listen for scroll events
        let headerTimeout;
        window.addEventListener('scroll', function() {
            if (headerTimeout) clearTimeout(headerTimeout);
            headerTimeout = setTimeout(updateHeader, 10);
        }, { passive: true });
    }
}

// Smooth Scrolling for Navigation Links - Enhanced Implementation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            console.log('Navigation link clicked:', targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                console.log('Scrolling to position:', targetPosition);
                
                // Enhanced smooth scrolling with fallback
                if ('scrollTo' in window) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback smooth scroll
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 800;
                    let start = null;
                    
                    function step(timestamp) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const ease = easeInOutCubic(progress / duration);
                        
                        window.scrollTo(0, startPosition + distance * ease);
                        
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }
                    }
                    
                    window.requestAnimationFrame(step);
                }
            } else {
                console.log('Target element not found for:', targetId);
            }
        });
    });
}

// Enhanced Objective Interactions
function initObjectiveInteractions() {
    const objectiveCards = document.querySelectorAll('.objective-card');
    
    console.log('Found objective cards:', objectiveCards.length);
    
    objectiveCards.forEach((card, index) => {
        // Add enhanced hover effects
        card.addEventListener('mouseenter', function() {
            console.log('Objective card hovered:', index + 1);
            
            // Enhanced hover effect
            this.style.transform = 'translateY(-8px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(0, 63, 127, 0.25)';
            this.style.background = 'var(--color-bg-2)';
            
            // Animate the objective number
            const number = this.querySelector('.objective-number');
            if (number) {
                number.style.transform = 'scale(1.15) rotate(10deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            // Reset effects
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.background = '';
            
            const number = this.querySelector('.objective-number');
            if (number) {
                number.style.transform = '';
            }
        });

        // Add click interaction for accessibility
        card.addEventListener('click', function() {
            console.log('Objective card clicked:', index + 1);
            
            // Toggle active state
            this.classList.toggle('active-clicked');
            
            // Remove active state from other cards
            objectiveCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('active-clicked');
                }
            });
        });

        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Add focus support
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Corporate Objective ${index + 1}`);

        // Add staggered animation attributes
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());
    });
}

// Enhanced Animations
function initAnimations() {
    // Floating elements animation enhancement
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
        let startTime = Date.now();
        function animateFloat() {
            const elapsed = Date.now() - startTime;
            const randomX = Math.sin(elapsed * 0.001 + index) * 15;
            const randomY = Math.cos(elapsed * 0.0012 + index) * 20;
            const rotation = Math.sin(elapsed * 0.0015 + index) * 15;
            
            element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotation}deg)`;
            requestAnimationFrame(animateFloat);
        }
        animateFloat();
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            console.log('Content card hovered');
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Alert banner interactions
    const alertBanner = document.querySelector('.alert-banner');
    if (alertBanner) {
        const alertIcons = alertBanner.querySelectorAll('i');
        alertIcons.forEach(icon => {
            setInterval(() => {
                icon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }, 3000);
        });
    }

    // Enhanced sidebar links interaction
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(15deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        // Ensure external links work properly
        if (link.hasAttribute('target')) {
            link.addEventListener('click', function(e) {
                console.log('External link clicked:', this.href);
                // Let the browser handle the link normally
            });
        }
    });
}

// On Load Animations
function initOnLoadAnimations() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.8s ease';
        }, index * 200);
    });
}

// Easing function for smooth animations
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Utility function for smooth value animations
function animateValue(element, start, end, duration, suffix = '') {
    if (!element) return;
    
    const startTimestamp = performance.now();
    
    const step = (timestamp) => {
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeInOutCubic(progress);
        element.textContent = Math.floor(current) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Responsive adjustments
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Analytics-ready event tracking
function trackEvent(category, action, label) {
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
}

// Track user interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button, .objective-card, .content-card');
    if (target) {
        const elementType = target.tagName.toLowerCase();
        const elementClass = target.className.split(' ')[0] || 'unknown';
        trackEvent('User Interaction', 'Click', `${elementType}.${elementClass}`);
    }
});

// Add dynamic styles for enhanced interactions
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .objective-card.active-clicked {
        background: var(--color-bg-3) !important;
        transform: scale(1.02) !important;
        box-shadow: 0 15px 35px rgba(0, 63, 127, 0.25) !important;
    }
    
    .loaded .hero-text > * {
        transition: all 0.8s ease;
    }
    
    .objective-card {
        transition: all 0.3s ease;
    }
    
    .objective-card .objective-number {
        transition: transform 0.3s ease;
    }
    
    .objective-card:focus {
        outline: 2px solid var(--railway-blue);
        outline-offset: 2px;
    }
    
    .scroll-top:focus {
        outline: 2px solid var(--railway-saffron);
        outline-offset: 2px;
    }
    
    @media (max-width: 768px) {
        .objective-card {
            cursor: pointer;
            tap-highlight-color: rgba(0, 63, 127, 0.1);
        }
        
        .objective-card.active-clicked .objective-content h4 {
            color: var(--railway-blue) !important;
        }
        
        .objective-card.active-clicked .objective-content p {
            color: var(--color-text) !important;
        }
    }
`;
document.head.appendChild(dynamicStyles);

// Enhanced loading experience
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('RLDA Intranet fully loaded');
});

// Console welcome message
console.log(`
🚂 RLDA Intranet System v2.1 Loaded
═══════════════════════════════════
Rail Land Development Authority
Modern Web Experience

Features Initialized:
✅ Mobile Navigation
✅ Smooth Scrolling Navigation
✅ Scroll-to-Top Button (Fixed)
✅ Interactive Animations
✅ Corporate Objectives (9 cards)
✅ Enhanced Hover Effects
✅ Responsive Design
✅ Keyboard Accessibility

Status: All systems operational
IT Wing, RLDA - 2024
`);

// Export functions for debugging and external use
window.RLDAInterface = {
    animateValue,
    trackEvent,
    initMobileNavigation,
    initScrollEffects,
    initScrollToTop,
    initAnimations,
    initObjectiveInteractions,
    initSmoothScrolling,
    version: '2.1',
    status: 'operational'
};
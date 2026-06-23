// Nova Hospital - Premium Healthcare Website JavaScript
// Enhanced functionality with Visuo-style interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all premium features
    initializeScrollEffects();
    initializeCounterAnimations();
    initializeProgressRings();
    initializeWhatsAppIntegration();
    initializeHeaderEffects();
    initializeMobileNavigation();
    initializeServiceInteractions();
    initializeFormInteractions();
    initializeSmoothScrolling();
    
    console.log('🏥 Nova Hospital Premium Website Loaded Successfully!');
});

// Premium Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animations for statistics
                if (entry.target.classList.contains('statistics-section')) {
                    animateCounters();
                }
                
                // Trigger progress ring animations
                if (entry.target.classList.contains('stat-card-premium')) {
                    animateProgressRings(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all premium sections
    document.querySelectorAll('.workflow-section, .premium-services, .statistics-section, .testimonials-section, .contact-section-premium').forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual cards for stagger effect
    document.querySelectorAll('.workflow-step, .service-card-premium, .stat-card-premium, .testimonial-card-premium, .contact-card-premium').forEach(card => {
        observer.observe(card);
    });
}

// Counter Animations for Statistics
function initializeCounterAnimations() {
    window.animateCounters = function() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const stepTime = Math.abs(Math.floor(duration / target));
            const startTime = Date.now();
            
            const timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(progress * target);
                
                counter.textContent = current.toLocaleString();
                
                if (progress === 1) {
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };
}

// Progress Ring Animations
function initializeProgressRings() {
    window.animateProgressRings = function(container) {
        const progressCircles = container ? 
            container.querySelectorAll('.progress-circle') : 
            document.querySelectorAll('.progress-circle');
        
        progressCircles.forEach(circle => {
            const percentage = container ? 
                container.querySelector('.percentage')?.textContent : '98';
            const percent = parseInt(percentage) || 98;
            const circumference = 314;
            const offset = circumference - (percent / 100 * circumference);
            
            // Animate the stroke-dashoffset
            circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
            circle.style.strokeDashoffset = offset;
        });
    };
}

// Enhanced WhatsApp Integration
function initializeWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn, .cta-button, .service-button, .contact-action-btn, .emergency-cta-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            let message = '';
            const buttonText = this.textContent.trim().toLowerCase();
            
            // Determine message based on button context
            if (buttonText.includes('emergency') || this.classList.contains('emergency-cta-btn')) {
                message = createEmergencyMessage();
            } else if (buttonText.includes('cardiac') || buttonText.includes('cardiology')) {
                message = createCardiologyMessage();
            } else if (this.closest('.service-card-premium')) {
                message = createServiceMessage(this.closest('.service-card-premium'));
            } else {
                message = createGeneralAppointmentMessage();
            }
            
            const whatsappURL = `https://wa.me/919105106999?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
            
            // Add success feedback
            showNotification('Redirecting to WhatsApp...', 'success');
        });
    });
}

// Message Templates
function createGeneralAppointmentMessage() {
    return `🏥 **NOVA HOSPITAL APPOINTMENT REQUEST**

Hello Nova Hospital Team,

I would like to schedule a medical consultation appointment.

📋 **APPOINTMENT DETAILS:**
• Preferred consultation type: General/Specialist
• Preferred date and time: [Please specify]
• Patient name: [Your name]
• Contact number: [Your number]
• Medical concern: [Brief description]

📍 **HOSPITAL LOCATION:**
Nova Hospital
Noorpur - Amroha Road, Village Milak
Badshahpur, Naugawan Sadat, UP

📞 **CONTACT:** 9105106999

Please confirm appointment availability and provide:
✓ Required documents list
✓ Consultation fees
✓ Doctor availability
✓ Any preparation instructions

Thank you for your premium healthcare services!`;
}

function createEmergencyMessage() {
    return `🚨 **EMERGENCY MEDICAL ASSISTANCE NEEDED**

Hello Nova Hospital Emergency Team,

This is an URGENT medical assistance request.

🏥 **EMERGENCY DETAILS:**
• Patient condition: [Describe emergency]
• Current location: [Your location]  
• Contact number: [Your number]
• Need ambulance: Yes/No
• Time of emergency: ${new Date().toLocaleString()}

📍 **HOSPITAL LOCATION:**
Nova Hospital
Noorpur - Amroha Road, Village Milak
Badshahpur, Naugawan Sadat, UP

📞 **EMERGENCY HOTLINE:** 9105106999

⚡ IMMEDIATE RESPONSE REQUIRED ⚡

Please dispatch emergency team/ambulance immediately.`;
}

function createCardiologyMessage() {
    return `❤️ **CARDIOLOGY CONSULTATION REQUEST**

Hello Nova Hospital Cardiology Department,

I need consultation for cardiac care services.

🫀 **CARDIOLOGY SERVICES INTERESTED IN:**
• Cardiac consultation and evaluation
• ECG, Echo, Stress Test procedures
• Interventional cardiology services
• Cardiac catheterization lab procedures
• Emergency cardiac care information

👨‍⚕️ **PATIENT INFORMATION:**
• Name: [Your name]
• Age: [Your age]
• Current symptoms: [Describe symptoms]
• Medical history: [Brief history]
• Previous cardiac procedures: [If any]

📍 **HOSPITAL:** Nova Hospital, Noorpur - Amroha Road, Badshahpur
📞 **EMERGENCY:** 9105106999

Please provide:
✓ Cardiologist availability
✓ Procedure costs and preparation
✓ Emergency cardiac care protocols

Thank you for your advanced cardiac care services!`;
}

function createServiceMessage(serviceCard) {
    const serviceName = serviceCard.querySelector('h3')?.textContent || 'Medical Service';
    const serviceFeatures = Array.from(serviceCard.querySelectorAll('.service-highlights li'))
        .map(li => li.textContent.replace(/✓|•/, '•').trim())
        .slice(0, 4)
        .join('\n');

    return `🏥 **${serviceName.toUpperCase()} CONSULTATION REQUEST**

Hello Nova Hospital ${serviceName} Department,

I need information and consultation for ${serviceName.toLowerCase()} services.

📋 **SERVICE FEATURES OF INTEREST:**
${serviceFeatures}

👤 **PATIENT INFORMATION:**
• Name: [Your name]
• Age: [Your age]  
• Symptoms/Condition: [Describe condition]
• Insurance: [Insurance details]
• Preferred appointment time: [Date/Time]

📞 **CONSULTATION REQUEST:**
• Doctor consultation availability
• Treatment procedures and costs
• Required medical documents
• Preparation instructions
• Follow-up care protocols

📍 **HOSPITAL:** Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur
📞 **CONTACT:** 9105106999

Please provide comprehensive information about ${serviceName.toLowerCase()} services.
Thank you!`;
}

// Header Scroll Effects
function initializeHeaderEffects() {
    const header = document.querySelector('.premium-header');
    let scrolled = false;
    
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 100;
        
        if (isScrolled && !scrolled) {
            header.classList.add('scrolled');
            scrolled = true;
        } else if (!isScrolled && scrolled) {
            header.classList.remove('scrolled');
            scrolled = false;
        }
    });
}

    // Enhanced department-specific WhatsApp messaging
    function setupDepartmentMessaging() {
        const departmentCards = document.querySelectorAll('[class*="bg-white"][class*="p-8"][class*="rounded-3xl"]');
        
        departmentCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target.closest('a')) return;
                
                const departmentName = card.querySelector('h3')?.textContent || 'Medical Services';
                const departmentServices = Array.from(card.querySelectorAll('li'))
                    .map(li => li.textContent.replace(/✓|•/, '•').trim())
                    .join('\n');

                let message = `Hello Nova Hospital,

I need information about **${departmentName}** services.

🏥 **DEPARTMENT SERVICES:**
${departmentServices}

📋 **REQUEST DETAILS:**
• Doctor consultation availability
• Treatment procedures and costs
• Appointment booking process  
• Emergency services availability
• Required medical documents

📍 **HOSPITAL LOCATION:**
Nova Hospital, Noorpur – Amroha Rd, Village Milak, Badshahpur, Naugawan Sadat, Uttar Pradesh

📞 **CONTACT:** 9105106999

Please provide detailed information about the above services.
Thank you!`;

                const whatsappURL = `https://wa.me/919105106999?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            });
            
            // Add hover effect to indicate clickable
            card.style.cursor = 'pointer';
            card.classList.add('transition-transform', 'hover:scale-105');
        });
    }

    // Emergency contact functionality
    function setupEmergencyContacts() {
        const emergencyElements = document.querySelectorAll('[href*="tel:9105106999"], [class*="emergency"]');
        
        emergencyElements.forEach(element => {
            if (element.tagName === 'A' && element.href.includes('tel:')) {
                // Already has tel: link, enhance with tracking
                element.addEventListener('click', function() {
                    console.log('Emergency call initiated');
                });
            } else if (!element.href) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const confirmCall = confirm('Do you want to call Nova Hospital Emergency Services?\n\nPhone: 9105106999\n\nThis will open your phone dialer.');
                    
                    if (confirmCall) {
                        window.open('tel:9105106999');
                    }
                });
            }
        });
    }

    // Cath Lab detailed information
    function setupCathLabInfo() {
        const cathLabSection = document.querySelector('#cathlab');
        if (cathLabSection) {
            const cathLabFeatures = cathLabSection.querySelectorAll('[class*="bg-white/5"]');
            
            cathLabFeatures.forEach(feature => {
                feature.addEventListener('click', function() {
                    const featureName = feature.querySelector('h4')?.textContent || 'Cath Lab Service';
                    const featureDesc = feature.querySelector('p')?.textContent || 'Advanced cardiac procedure';
                    
                    const message = `Hello Nova Hospital,

I need detailed information about your **Cardiac Catheterization Lab 1** services.

🫀 **SPECIFIC INTEREST:** ${featureName}
📋 **SERVICE DESCRIPTION:** ${featureDesc}

**INFORMATION NEEDED:**
• Procedure availability and scheduling
• Cardiologist consultation requirements  
• Pre-procedure preparation guidelines
• Cost estimation and insurance coverage
• Emergency cardiac intervention protocols
• Post-procedure care and monitoring

📍 **HOSPITAL:** Nova Hospital, Noorpur – Amroha Rd, Village Milak, Badshahpur, Naugawan Sadat, UP

📞 **EMERGENCY:** 9105106999

Please provide comprehensive information about your interventional cardiology services.
Thank you!`;

                    const whatsappURL = `https://wa.me/919105106999?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                });
                
                feature.style.cursor = 'pointer';
                feature.classList.add('hover:bg-white/10', 'transition-colors');
            });
        }
    }

    // Scroll animations and interactions
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe department cards and key sections
        document.querySelectorAll('[class*="bg-white"][class*="p-8"], [class*="bg-slate-50"]').forEach(el => {
            observer.observe(el);
        });
    }

    // Header scroll effects
    function setupHeaderEffects() {
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header?.classList.add('backdrop-blur-lg', 'bg-white/95');
            } else {
                header?.classList.remove('backdrop-blur-lg', 'bg-white/95');
            }
        });
    }

    // Mobile responsiveness enhancements
    function setupMobileEnhancements() {
        // Touch interactions for mobile
        if ('ontouchstart' in window) {
            document.querySelectorAll('[class*="hover:"]').forEach(element => {
                element.addEventListener('touchstart', function() {
                    // Enable touch interactions
                });
            });
        }
    }

    // Initialize all functionality
    initializeWhatsAppBooking();
    setupDepartmentMessaging();
    setupEmergencyContacts();
    setupCathLabInfo();
    setupScrollAnimations();
    setupHeaderEffects();
    setupMobileEnhancements();

    console.log('🏥 Nova Hospital website loaded successfully!');
    console.log('✅ All interactive features initialized:');
    console.log('• WhatsApp appointment booking');
    console.log('• Department-specific messaging');
    console.log('• Emergency contact system');
    console.log('• Cath Lab information system');
    console.log('• Scroll animations');
    console.log('• Mobile touch interactions');
});

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fadeInUp {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition-property: transform, opacity, background-color, border-color, color, box-shadow;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 200ms;
    }
    
    /* Enhanced WhatsApp button pulse effect */
    .fixed.bottom-6.right-6 {
        animation: pulse 3s infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
        }
    }
`;
document.head.appendChild(style);
// Mobile Navigation
function initializeMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.premium-nav');
    const body = document.body;
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const isOpen = nav.classList.contains('mobile-open');
            
            if (isOpen) {
                nav.classList.remove('mobile-open');
                body.classList.remove('nav-open');
                this.classList.remove('active');
            } else {
                nav.classList.add('mobile-open');
                body.classList.add('nav-open');
                this.classList.add('active');
            }
        });
        
        // Close nav when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
                body.classList.remove('nav-open');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Service Card Interactions
function initializeServiceInteractions() {
    const serviceCards = document.querySelectorAll('.service-card-premium');
    
    serviceCards.forEach(card => {
        // Add click tracking
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button') && !e.target.closest('a')) {
                const serviceName = this.querySelector('h3')?.textContent;
                console.log(`Service card clicked: ${serviceName}`);
                
                // Optional: Auto-scroll to contact section
                // document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Add hover effect tracking
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
    });
}

// Form Interactions (for future contact forms)
function initializeFormInteractions() {
    const contactBtns = document.querySelectorAll('.contact-action-btn');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.textContent.toLowerCase();
            
            if (action.includes('direction')) {
                // Use enhanced directions with auto location
                getDirections();
            } else if (action.includes('call')) {
                // Open phone dialer
                window.open('tel:9105106999');
                showNotification('Opening phone dialer...', 'info');
            } else if (action.includes('email')) {
                // Open email client
                window.open('mailto:info@novahospital.com?subject=Healthcare Inquiry&body=Hello Nova Hospital Team,%0D%0A%0D%0AI would like to inquire about your healthcare services.');
                showNotification('Opening email client...', 'info');
            }
        });
    });
}

// Smooth Scrolling Enhancement
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Close mobile nav if open
                const nav = document.querySelector('.premium-nav');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (nav.classList.contains('mobile-open')) {
                    nav.classList.remove('mobile-open');
                    document.body.classList.remove('nav-open');
                    mobileToggle.classList.remove('active');
                }
                
                // Smooth scroll with offset for fixed header
                const headerHeight = document.querySelector('.premium-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification System
// Enhanced Notification System for Location
function showLocationNotification(message, type = 'info', duration = 4000) {
    // Remove existing notifications
    const existing = document.querySelector('.location-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `location-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getLocationNotificationIcon(type)}"></i>
            <span>${message}</span>
            ${type === 'loading' ? '<div class="loading-spinner"></div>' : ''}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function getLocationNotificationIcon(type) {
    const icons = {
        'loading': 'location-arrow',
        'success': 'check-circle',
        'error': 'exclamation-triangle',
        'warning': 'map-marker-alt',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle', 
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Optimization
function initializePerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    };
    
    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Analytics and Tracking (placeholder)
function initializeAnalytics() {
    // Track button clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .cta-button, .service-button')) {
            const buttonText = e.target.textContent.trim();
            console.log('Button clicked:', buttonText);
            // Send to analytics service
        }
    });
    
    // Track page engagement time
    let startTime = Date.now();
    let maxScroll = 0;
    
    window.addEventListener('scroll', function() {
        const scrollPercentage = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        maxScroll = Math.max(maxScroll, scrollPercentage);
    });
    
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        console.log(`Page engagement: ${timeOnPage}s, Max scroll: ${maxScroll}%`);
        // Send to analytics service
    });
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    // Enhanced focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    initializePerformanceOptimizations();
    initializeAnalytics();
    initializeAccessibility();
});

// Add premium CSS animations dynamically
const premiumStyles = document.createElement('style');
premiumStyles.textContent = `
    /* Premium Animation Keyframes */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Animation Classes */
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .workflow-step.animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .service-card-premium.animate-in {
        animation: scaleIn 0.6s ease-out forwards;
    }
    
    .stat-card-premium.animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .testimonial-card-premium.animate-in {
        animation: fadeInLeft 0.6s ease-out forwards;
    }
    
    .contact-card-premium.animate-in {
        animation: fadeInRight 0.6s ease-out forwards;
    }
    
    /* Stagger delays */
    .workflow-step:nth-child(1) { animation-delay: 0.1s; }
    .workflow-step:nth-child(2) { animation-delay: 0.2s; }
    .workflow-step:nth-child(3) { animation-delay: 0.3s; }
    .workflow-step:nth-child(4) { animation-delay: 0.4s; }
    
    .service-card-premium:nth-child(1) { animation-delay: 0.1s; }
    .service-card-premium:nth-child(2) { animation-delay: 0.2s; }
    .service-card-premium:nth-child(3) { animation-delay: 0.3s; }
    .service-card-premium:nth-child(4) { animation-delay: 0.4s; }
    .service-card-premium:nth-child(5) { animation-delay: 0.5s; }
    .service-card-premium:nth-child(6) { animation-delay: 0.6s; }
    
    /* Location Notification Styles */
    .location-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 16px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .location-notification.show {
        transform: translateX(0);
    }
    
    .notification-loading { 
        background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
    }
    
    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 8px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .notification-success { background: #10b981; }
    .notification-error { background: #ef4444; }
    .notification-warning { background: #f59e0b; }
    .notification-info { background: #3b82f6; }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    /* Mobile Navigation Styles */
    @media (max-width: 768px) {
        .premium-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 300px;
            height: 100vh;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            transition: right 0.3s ease;
            z-index: 1001;
            padding-top: 100px;
        }
        
        .premium-nav.mobile-open {
            right: 0;
        }
        
        .premium-nav ul {
            flex-direction: column;
            gap: 0;
            padding: 0 32px;
        }
        
        .nav-link {
            display: block;
            padding: 16px 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav-open {
            overflow: hidden;
        }
    }
    
    /* Accessibility */
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--gray-900);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    }
    
    .skip-link:focus {
        top: 6px;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #667eea !important;
        outline-offset: 2px !important;
    }
    
    /* Lazy Loading */
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(premiumStyles);

console.log('🎨 Premium Nova Hospital Website Fully Loaded!');
console.log('✨ Features: Visuo-style animations, WhatsApp integration, mobile responsive, accessibility enhanced');
// ================================================= 
// ADVANCED ANIMATION CONTROLLER
// =================================================

class PremiumAnimationController {
    constructor() {
        this.observers = new Map();
        this.animationQueue = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupAdvancedScrollAnimations();
        this.setupParallaxEffects();
        this.setupMagneticButtons();
        this.setupTiltCards();
        this.setupTextRevealAnimations();
        this.setupCountUpAnimations();
        this.setupParticleEffects();
        this.setupAdvancedHoverEffects();
        this.setupTypewriterEffect();
        this.setupMorphingShapes();
    }

    // Advanced Scroll-based Animations
    setupAdvancedScrollAnimations() {
        const animationConfig = [
            { selector: '.hero-badge', animation: 'animate-slide-left', delay: 0.2 },
            { selector: '.hero-title', animation: 'animate-slide-up', delay: 0.4 },
            { selector: '.hero-description', animation: 'animate-slide-up', delay: 0.6 },
            { selector: '.hero-actions', animation: 'animate-bounce', delay: 0.8 },
            { selector: '.trust-indicators', animation: 'animate-slide-up', delay: 1.0 },
            { selector: '.workflow-step', animation: 'animate-flip-y', stagger: 0.2 },
            { selector: '.service-card-premium', animation: 'animate-zoom-rotate', stagger: 0.1 },
            { selector: '.stat-card-premium', animation: 'animate-flip-x', stagger: 0.2 },
            { selector: '.testimonial-card-premium', animation: 'animate-slide-right', stagger: 0.3 },
            { selector: '.contact-card-premium', animation: 'animate-bounce', stagger: 0.2 }
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animationConfig.forEach(config => {
            const elements = document.querySelectorAll(config.selector);
            elements.forEach((element, index) => {
                element.dataset.animation = config.animation;
                element.dataset.delay = config.delay + (config.stagger ? config.stagger * index : 0);
                observer.observe(element);
            });
        });
    }

    triggerAnimation(element) {
        const animation = element.dataset.animation;
        const delay = parseFloat(element.dataset.delay) || 0;

        setTimeout(() => {
            element.classList.add(animation);
        }, delay * 1000);
    }

    // Parallax Effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.gradient-orb, .floating-stat');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.2;
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    // Magnetic Button Effects
    setupMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.cta-button, .service-button, .whatsapp-btn');
        
        magneticButtons.forEach(button => {
            button.classList.add('magnetic-effect');
            
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    // 3D Tilt Effect for Cards
    setupTiltCards() {
        const tiltCards = document.querySelectorAll('.service-card-premium, .stat-card-premium, .testimonial-card-premium');
        
        tiltCards.forEach(card => {
            card.classList.add('tilt-effect');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // Text Reveal Animations
    setupTextRevealAnimations() {
        const revealTexts = document.querySelectorAll('.section-title, .hero-title');
        
        revealTexts.forEach(text => {
            text.classList.add('animate-text-reveal');
        });
    }

    // Enhanced Counter Animations
    setupCountUpAnimations() {
        const counters = document.querySelectorAll('.counter, .percentage');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count || element.textContent);
        const duration = 2000;
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    }

    // Particle Effects for Hero Section
    setupParticleEffects() {
        const heroSection = document.querySelector('.premium-hero');
        if (!heroSection) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                animation: particle-float ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particleContainer.appendChild(particle);
        }

        heroSection.appendChild(particleContainer);
    }

    // Advanced Hover Effects
    setupAdvancedHoverEffects() {
        // Glow effect on service icons
        const serviceIcons = document.querySelectorAll('.service-icon-premium');
        serviceIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.classList.add('animate-glow');
            });
            icon.addEventListener('mouseleave', () => {
                icon.classList.remove('animate-glow');
            });
        });

        // Heartbeat effect for emergency elements
        const emergencyElements = document.querySelectorAll('.emergency-icon-premium, .emergency-cta-btn');
        emergencyElements.forEach(element => {
            element.classList.add('animate-heartbeat');
        });

        // Wave effect for trust indicators
        const trustItems = document.querySelectorAll('.trust-item');
        trustItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-wave');
            }, index * 200);
        });
    }

    // Typewriter Effect
    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-blue)';
            element.style.animation = 'blink 1s infinite';
            
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }
            }, 50);
        });
    }

    // Morphing Shapes
    setupMorphingShapes() {
        const morphingElements = document.querySelectorAll('.logo-gradient-bg, .service-icon-premium');
        morphingElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('animate-morphing');
            });
            element.addEventListener('mouseleave', () => {
                element.classList.remove('animate-morphing');
            });
        });
    }

    // Stagger Animation Utility
    staggerAnimation(elements, animationClass, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }

    // Sequence Animation Utility  
    sequenceAnimation(animations) {
        let totalDelay = 0;
        animations.forEach(animation => {
            setTimeout(() => {
                const elements = document.querySelectorAll(animation.selector);
                elements.forEach(el => el.classList.add(animation.class));
            }, totalDelay);
            totalDelay += animation.delay;
        });
    }
}

// Loading Animation Manager
class LoadingAnimationManager {
    constructor() {
        this.isLoading = true;
        this.init();
    }

    init() {
        this.createLoadingScreen();
        this.simulateLoading();
    }

    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'premium-loader';
        loader.innerHTML = `
            <div class="loader-container">
                <div class="hospital-pulse">
                    <div class="pulse-ring"></div>
                    <div class="pulse-ring"></div>
                    <div class="pulse-ring"></div>
                    <i class="fas fa-hospital-symbol loader-icon"></i>
                </div>
                <div class="loader-text">
                    <h3>Nova Hospital</h3>
                    <p>Loading Premium Healthcare Experience...</p>
                </div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            color: white;
        `;

        document.body.appendChild(loader);
        this.addLoaderStyles();
    }

    addLoaderStyles() {
        const loaderStyles = document.createElement('style');
        loaderStyles.textContent = `
            .loader-container {
                text-align: center;
            }
            .hospital-pulse {
                position: relative;
                width: 100px;
                height: 100px;
                margin: 0 auto 30px;
            }
            .pulse-ring {
                position: absolute;
                border: 3px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                animation: pulse-ring 2s ease-out infinite;
            }
            .pulse-ring:nth-child(2) { animation-delay: 0.5s; }
            .pulse-ring:nth-child(3) { animation-delay: 1s; }
            .loader-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 40px;
                animation: heartbeat 1s ease-in-out infinite;
            }
            .loader-text h3 {
                font-size: 28px;
                margin-bottom: 10px;
                animation: fadeInUp 1s ease-out;
            }
            .loader-text p {
                font-size: 16px;
                opacity: 0.9;
                animation: fadeInUp 1s ease-out 0.5s both;
            }
            @keyframes pulse-ring {
                0% { transform: scale(0.1); opacity: 1; }
                80%, 100% { transform: scale(1.2); opacity: 0; }
            }
        `;
        document.head.appendChild(loaderStyles);
    }

    simulateLoading() {
        // Simulate loading time
        setTimeout(() => {
            this.hideLoader();
        }, 3000);
    }

    hideLoader() {
        const loader = document.getElementById('premium-loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                loader.remove();
                this.isLoading = false;
                this.triggerEntryAnimations();
            }, 500);
        }
    }

    triggerEntryAnimations() {
        // Trigger page entry animations after loading
        const animationController = new PremiumAnimationController();
        
        // Add premium loading complete class to body
        document.body.classList.add('premium-loaded');
    }
}

// Mouse Movement Effects
class MouseEffects {
    constructor() {
        this.cursor = null;
        this.follower = null;
        this.init();
    }

    init() {
        this.createCustomCursor();
        this.setupMouseTracker();
        this.setupClickRipples();
    }

    createCustomCursor() {
        // Create custom cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--primary-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        `;

        this.follower = document.createElement('div');
        this.follower.className = 'cursor-follower';
        this.follower.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s ease;
            transform: translate(-50%, -50%);
            opacity: 0.5;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.follower);
    }

    setupMouseTracker() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.follower.style.left = e.clientX + 'px';
                this.follower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .service-card-premium, .stat-card-premium');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                this.follower.style.transform = 'translate(-50%, -50%) scale(2)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.follower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    setupClickRipples() {
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
        });
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            animation: ripple-animation 0.6s ease-out;
        `;

        document.body.appendChild(ripple);

        const rippleStyles = document.createElement('style');
        rippleStyles.textContent = `
            @keyframes ripple-animation {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('#ripple-styles')) {
            rippleStyles.id = 'ripple-styles';
            document.head.appendChild(rippleStyles);
        }

        setTimeout(() => ripple.remove(), 600);
    }
}

// Initialize All Premium Animation Systems
document.addEventListener('DOMContentLoaded', function() {
    // Start with loading animation
    const loadingManager = new LoadingAnimationManager();
    
    // Initialize mouse effects (desktop only)
    if (window.innerWidth > 768) {
        const mouseEffects = new MouseEffects();
    }
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('🎨 Premium Animation System Loaded!');
    console.log('✨ Features: Advanced animations, custom cursor, loading screen, particle effects');
});

// Performance optimization for animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}
// Enhanced Get Directions Function with Auto Location Detection
function getDirections() {
    // Check if geolocation is available
    if (navigator.geolocation) {
        showLocationNotification('📍 Detecting your location...', 'loading');
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Success - got user location
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Nova Hospital exact coordinates
                const hospitalAddress = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, Uttar Pradesh";
                
                // Create directions URL with user's current location
                const directionsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${encodeURIComponent(hospitalAddress)}`;
                
                // Open in same tab for better user experience
                window.location.href = directionsUrl;
                
                console.log('✅ Opening directions from current location to Nova Hospital');
                showLocationNotification('🗺️ Opening directions from your location...', 'success');
            },
            function(error) {
                // Error or user denied location access
                console.log('Location error:', error);
                
                let errorMessage = '🏥 Opening hospital location...';
                if (error.code === error.PERMISSION_DENIED) {
                    errorMessage = '📍 Location access denied. Opening hospital location...';
                }
                
                // Fallback - open general hospital location
                const hospitalAddress = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, Uttar Pradesh";
                const fallbackUrl = `https://www.google.com/maps/search/${encodeURIComponent(hospitalAddress)}`;
                
                window.location.href = fallbackUrl;
                
                showLocationNotification(errorMessage, 'warning');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes cache
            }
        );
    } else {
        // Geolocation not supported
        const hospitalAddress = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, Uttar Pradesh";
        const fallbackUrl = `https://www.google.com/maps/search/${encodeURIComponent(hospitalAddress)}`;
        
        window.location.href = fallbackUrl;
        
        showLocationNotification('🏥 Opening hospital location...', 'info');
    }
}

// Updated Google Maps Function (for compatibility)
function openGoogleMaps() {
    getDirections(); // Use the enhanced function
}

// Live Location Tracking Feature
function trackLiveLocation() {
    showNotification('Starting live location tracking...', 'info');
    
    if (!navigator.geolocation) {
        showNotification('Geolocation is not supported by this browser.', 'error');
        return;
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000 // Cache location for 1 minute
    };

    // Start watching position
    const watchId = navigator.geolocation.watchPosition(
        function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            const timestamp = new Date(position.timestamp);

            // Nova Hospital exact coordinates (from Google Maps)
            const hospitalLat = 28.3699; // Exact coordinates for Nova Hospital, Badshahpur
            const hospitalLng = 78.0580; // Exact coordinates from the map image

            // Calculate distance to hospital
            const distance = calculateDistance(userLat, userLng, hospitalLat, hospitalLng);

            // Update live location display
            updateLiveLocationDisplay({
                userLat,
                userLng,
                accuracy,
                timestamp,
                distance,
                watchId
            });

            // Create live directions URL
            const liveDirectionsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/Nova+Hospital+Noorpur+Amroha+Road+Village+Milak+Badshahpur+Naugawan+Sadat+Uttar+Pradesh?travelmode=driving`;
            
            // Store for use with live map
            window.liveLocationData = {
                userLat,
                userLng,
                hospitalLat,
                hospitalLng,
                distance,
                directionsUrl: liveDirectionsUrl,
                watchId
            };

            showNotification(`Live location tracked! Distance to hospital: ${distance.toFixed(2)} km`, 'success');
        },
        function(error) {
            let errorMessage = 'Error getting location: ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Location access denied by user.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Location request timed out.';
                    break;
                default:
                    errorMessage += 'Unknown error occurred.';
            }
            showNotification(errorMessage, 'error');
        },
        options
    );

    // Store watch ID globally for cleanup
    window.locationWatchId = watchId;
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Update live location display with enhanced real-time data
function updateLiveLocationDisplay(data) {
    // Remove existing live location display
    const existingDisplay = document.querySelector('.live-location-display');
    if (existingDisplay) {
        existingDisplay.remove();
    }

    // Create enhanced live location display
    const liveDisplay = document.createElement('div');
    liveDisplay.className = 'live-location-display';
    
    // Calculate movement status
    const isMoving = data.speed && data.speed > 0.5; // Moving if speed > 0.5 m/s
    const direction = data.bearing ? getDirectionName(data.bearing) : 'Unknown';
    const speedKmh = data.speed ? (data.speed * 3.6).toFixed(1) : '0.0';
    
    liveDisplay.innerHTML = `
        <div class="live-location-card">
            <div class="live-location-header">
                <i class="fas fa-location-dot live-pulse"></i>
                <h4>📍 Live GPS Tracking</h4>
                <div class="tracking-status">
                    <span class="status-indicator ${isMoving ? 'status-moving' : 'status-stationary'}">
                        <i class="fas fa-circle"></i>
                        ${isMoving ? 'MOVING' : 'STATIONARY'}
                    </span>
                </div>
                <button class="stop-tracking-btn" onclick="stopLocationTracking()">
                    <i class="fas fa-stop"></i>
                </button>
            </div>
            <div class="live-location-content">
                <div class="location-info">
                    <div class="primary-stats">
                        <div class="stat-item primary">
                            <span class="label">🏥 Distance to Hospital:</span>
                            <span class="value distance-value">${data.distance.toFixed(2)} km</span>
                        </div>
                        <div class="stat-item primary">
                            <span class="label">⏱️ Estimated Time:</span>
                            <span class="value eta-value">${data.eta || calculateETA(data.distance, data.speed || 0)}</span>
                        </div>
                    </div>
                    
                    <div class="secondary-stats">
                        <div class="stat-row">
                            <div class="stat-item">
                                <span class="label">📍 Your Location:</span>
                                <span class="value coordinates">${data.userLat.toFixed(6)}, ${data.userLng.toFixed(6)}</span>
                            </div>
                        </div>
                        <div class="stat-row">
                            <div class="stat-item">
                                <span class="label">🧭 Direction:</span>
                                <span class="value">${direction} (${data.bearing ? Math.round(data.bearing) : 0}°)</span>
                            </div>
                            <div class="stat-item">
                                <span class="label">🚗 Speed:</span>
                                <span class="value">${speedKmh} km/h</span>
                            </div>
                        </div>
                        <div class="stat-row">
                            <div class="stat-item">
                                <span class="label">🎯 Accuracy:</span>
                                <span class="value">±${Math.round(data.accuracy)}m</span>
                            </div>
                            <div class="stat-item">
                                <span class="label">🕒 Last Update:</span>
                                <span class="value">${data.timestamp.toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="live-location-actions">
                    <button class="live-action-btn primary" onclick="openLiveDirections()">
                        <i class="fas fa-route"></i>
                        Live Navigation
                    </button>
                    <button class="live-action-btn secondary" onclick="shareCurrentLocation()">
                        <i class="fas fa-share-alt"></i>
                        Share Location
                    </button>
                    <button class="live-action-btn emergency" onclick="callEmergencyWithLocation()">
                        <i class="fas fa-phone-alt"></i>
                        Emergency Call
                    </button>
                </div>
                
                <div class="hospital-info-mini">
                    <div class="hospital-details-compact">
                        <h5>🏥 Nova Hospital</h5>
                        <p>Noorpur - Amroha Road, Village Milak, Badshahpur</p>
                        <p><strong>Emergency:</strong> 9105106999</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add to page
    document.body.appendChild(liveDisplay);
    
    // Auto-scroll to show if needed (mobile)
    if (window.innerWidth <= 768) {
        liveDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Update page title with distance info
    const originalTitle = document.title;
    if (!originalTitle.includes('km to')) {
        document.title = `${data.distance.toFixed(1)}km to Nova Hospital - ${originalTitle}`;
    }
}

// बेहतरीन Interactive Live Map
function showLiveMap() {
    // Check करते हैं कि map modal already open तो नहीं है
    const existing = document.querySelector('.super-map-modal');
    if (existing) {
        existing.remove();
    }

    // Super Map Modal बनाते हैं
    const mapModal = document.createElement('div');
    mapModal.className = 'super-map-modal';
    mapModal.innerHTML = `
        <div class="map-container-super">
            <div class="map-header-super">
                <div class="map-title">
                    <span class="map-icon">🗺️</span>
                    <h3>Nova Hospital Live Map</h3>
                </div>
                <button class="map-close-btn" onclick="closeSuperMap()">✕</button>
            </div>
            
            <div class="map-content-super">
                <div class="map-controls-super">
                    <button class="map-btn primary" onclick="showMyLocationOnMap()">
                        <span>📍</span> मेरा Location
                    </button>
                    <button class="map-btn secondary" onclick="showHospitalOnMap()">
                        <span>🏥</span> Hospital Location
                    </button>
                    <button class="map-btn success" onclick="getDirectionsOnMap()">
                        <span>🧭</span> Directions लें
                    </button>
                </div>
                
                <div class="embedded-map-super">
                    <iframe 
                        id="superMapFrame"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.123!2d78.0580!3d28.3699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNova%20Hospital!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                        width="100%" 
                        height="400" 
                        style="border:0; border-radius: 15px;" 
                        allowfullscreen="" 
                        loading="lazy">
                    </iframe>
                </div>
                
                <div class="map-info-super">
                    <div class="hospital-info-super">
                        <h4>🏥 Nova Hospital</h4>
                        <p>📍 Noorpur - Amroha Road, Village Milak, Badshahpur</p>
                        <p>🏘️ Naugawan Sadat, Uttar Pradesh</p>
                        <p>📞 <strong>Emergency: 9105106999</strong></p>
                        <p>⏰ <strong>24/7 Services Available</strong></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(mapModal);
    document.body.style.overflow = 'hidden';

    // Animation के लिए delay
    setTimeout(() => {
        mapModal.classList.add('show');
    }, 50);

    showBetterNotification('🗺️ Interactive map खुल गया!', 'success');
}

// Map पर अपना location दिखाना
function showMyLocationOnMap() {
    if (window.currentLocationData) {
        const { userLat, userLng } = window.currentLocationData;
        const mapFrame = document.getElementById('superMapFrame');
        if (mapFrame) {
            const myLocationSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7006.5!2d${userLng}!3d${userLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin`;
            mapFrame.src = myLocationSrc;
        }
        showBetterNotification('📍 आपका location map पर दिख रहा है', 'info');
    } else {
        showBetterNotification('📍 पहले location tracking करें', 'error');
        trackLiveLocation();
    }
}

// Map पर hospital दिखाना  
function showHospitalOnMap() {
    const mapFrame = document.getElementById('superMapFrame');
    if (mapFrame) {
        const hospitalSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.123!2d78.0580!3d28.3699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNova%20Hospital!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin`;
        mapFrame.src = hospitalSrc;
    }
    showBetterNotification('🏥 Nova Hospital का location दिख रहा है', 'info');
}

// Directions लेना
function getDirectionsOnMap() {
    if (window.currentLocationData) {
        // Google Maps में directions खोलना
        window.open(window.currentLocationData.directionsURL, '_blank');
        showBetterNotification('🧭 Google Maps में directions खुल रहा है', 'success');
    } else {
        // सिर्फ hospital के लिए search करना
        const hospitalQuery = 'Nova Hospital Noorpur Amroha Road Village Milak Badshahpur Naugawan Sadat Uttar Pradesh';
        const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(hospitalQuery)}`;
        window.open(searchUrl, '_blank');
        showBetterNotification('🗺️ Hospital का location Google Maps में खुल रहा है', 'info');
    }
}

// Map बंद करना
function closeSuperMap() {
    const mapModal = document.querySelector('.super-map-modal');
    if (mapModal) {
        mapModal.classList.remove('show');
        setTimeout(() => {
            mapModal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Map control functions
function getCurrentLocationForMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Update map to show current location
                const mapFrame = document.getElementById('liveMapFrame');
                if (mapFrame) {
                    const newSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.123456789!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zCurrent%20Location!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;
                    mapFrame.src = newSrc;
                }
                
                showNotification('Map centered on your location', 'success');
            },
            function(error) {
                showNotification('Unable to get current location', 'error');
            }
        );
    }
}

function showHospitalOnMap() {
    const mapFrame = document.getElementById('liveMapFrame');
    if (mapFrame) {
        const hospitalMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.4567890123!2d78.0580!3d28.3699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390936b2c3d4e5f6%3A0x789abcdef0123456!2sNova%20Hospital!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin`;
        mapFrame.src = hospitalMapSrc;
    }
    showNotification('🏥 Map centered on Nova Hospital location', 'info');
}

function showRouteOnMap() {
    if (window.liveLocationData) {
        const { userLat, userLng } = window.liveLocationData;
        const hospitalLat = 28.3699;
        const hospitalLng = 78.0580;
        
        const mapFrame = document.getElementById('liveMapFrame');
        if (mapFrame) {
            const routeMapSrc = `https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d7012.987654321!2d${hospitalLng}!3d${hospitalLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s${userLat}%2C${userLng}!3m2!1d${userLat}!2d${userLng}!4m5!1s0x390936b2c3d4e5f6%3A0x789abcdef0123456!2sNova%20Hospital!3m2!1d${hospitalLat}!2d${hospitalLng}!5e0!3m2!1sen!2sin!4v1703123456790!5m2!1sen!2sin`;
            mapFrame.src = routeMapSrc;
        }
        showNotification('🗺️ Route displayed on map from your location', 'success');
    } else {
        showNotification('📍 Please enable location tracking first', 'warning');
        trackLiveLocation();
    }
}

function startNavigation() {
    if (window.liveLocationData) {
        window.open(window.liveLocationData.directionsUrl, '_blank');
        showNotification('Starting live navigation...', 'success');
    } else {
        openGoogleMaps();
        showNotification('Opening standard directions...', 'info');
    }
}

function closeLiveMap() {
    const mapModal = document.querySelector('.live-map-modal');
    if (mapModal) {
        mapModal.classList.remove('show');
        setTimeout(() => {
            mapModal.remove();
            document.body.classList.remove('modal-open');
        }, 300);
    }
}

function openLiveDirections() {
    if (window.liveLocationData) {
        window.open(window.liveLocationData.directionsUrl, '_blank');
        showNotification('Opening live directions...', 'success');
    } else {
        showNotification('Location data not available', 'error');
    }
}

function shareCurrentLocation() {
    if (window.liveLocationData) {
        const { userLat, userLng, distance } = window.liveLocationData;
        const locationText = `My current location: ${userLat.toFixed(6)}, ${userLng.toFixed(6)}\n\nDistance to Nova Hospital: ${distance.toFixed(2)} km\n\nNova Hospital Address:\nNoorpur - Amroha Road, Village Milak, Badshahpur\nNaugawan Sadat, Uttar Pradesh\n\nEmergency: 9105106999`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Location - Distance to Nova Hospital',
                text: locationText,
                url: `https://www.google.com/maps?q=${userLat},${userLng}`
            });
        } else {
            navigator.clipboard.writeText(locationText).then(() => {
                showNotification('Location details copied to clipboard!', 'success');
            });
        }
    } else {
        showNotification('No location data to share', 'error');
    }
}

// Enhanced emergency call with location
function callEmergencyWithLocation() {
    if (window.liveLocationData) {
        const { userLat, userLng, distance } = window.liveLocationData;
        
        // Create emergency message with location
        const emergencyMessage = `🚨 NOVA HOSPITAL EMERGENCY CALL
        
Patient Location: ${userLat.toFixed(6)}, ${userLng.toFixed(6)}
Distance to Hospital: ${distance.toFixed(2)} km
Time: ${new Date().toLocaleString()}

Google Maps Link: https://www.google.com/maps?q=${userLat},${userLng}

IMMEDIATE ASSISTANCE NEEDED!`;

        // Copy to clipboard for reference
        navigator.clipboard.writeText(emergencyMessage).catch(() => {});
        
        // Show emergency options
        const confirmCall = confirm(`🚨 EMERGENCY CALL TO NOVA HOSPITAL

Your location will be shared:
📍 Distance: ${distance.toFixed(2)} km from hospital
📞 Calling: 9105106999

Press OK to call now.`);
        
        if (confirmCall) {
            // Open dialer
            window.open('tel:9105106999');
            showNotification('🚨 Emergency call initiated! Location copied to clipboard.', 'error', 10000);
        }
    } else {
        window.open('tel:9105106999');
        showNotification('📞 Calling Nova Hospital Emergency...', 'error');
    }
}

// Get direction name from bearing
function getDirectionName(bearing) {
    const directions = [
        'North', 'Northeast', 'East', 'Southeast',
        'South', 'Southwest', 'West', 'Northwest'
    ];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
}

// Calculate ETA based on distance and speed
function calculateETA(distance, speed) {
    if (!speed || speed <= 0) {
        // Estimate based on average walking speed (5 km/h) if stationary
        const walkingSpeed = 5; // km/h
        const timeHours = distance / walkingSpeed;
        
        if (timeHours < 1) {
            return `${Math.round(timeHours * 60)} min walk`;
        } else {
            return `${Math.round(timeHours * 10) / 10}h walk`;
        }
    }
    
    const speedKmh = speed * 3.6; // Convert m/s to km/h
    const timeHours = distance / speedKmh;
    
    if (timeHours < 1) {
        return `${Math.round(timeHours * 60)} min`;
    } else {
        return `${Math.round(timeHours * 10) / 10}h`;
    }
}

// Calculate bearing (direction) between two points
function calculateBearing(lat1, lng1, lat2, lng2) {
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    
    const y = Math.sin(dLng) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
    
    const bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
}

// Alternative function for directions from current location
function getDirectionsFromCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Nova Hospital location (you can replace with exact coordinates)
                const hospitalAddress = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, Uttar Pradesh";
                
                // Google Maps directions URL
                const directionsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${encodeURIComponent(hospitalAddress)}`;
                
                window.open(directionsUrl, '_blank');
                showNotification('Opening directions from your location...', 'success');
            },
            function(error) {
                // Fallback to general search if location access denied
                openGoogleMaps();
                console.log('Location access denied, opening general search');
            }
        );
    } else {
        // Fallback for browsers that don't support geolocation
        openGoogleMaps();
        console.log('Geolocation not supported, opening general search');
    }
}

// Enhanced contact action handlers
function handleContactActions() {
    const contactButtons = document.querySelectorAll('.contact-action-btn');
    
    contactButtons.forEach(button => {
        const buttonText = button.textContent.trim().toLowerCase();
        
        if (buttonText.includes('direction')) {
            // Already handled with onclick
            return;
        } else if (buttonText.includes('call')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const confirmCall = confirm('Do you want to call Nova Hospital?\n\nPhone: 9105106999');
                if (confirmCall) {
                    window.open('tel:9105106999');
                    showNotification('Opening phone dialer...', 'info');
                }
            });
        } else if (buttonText.includes('email')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const emailSubject = 'Healthcare Inquiry - Nova Hospital';
                const emailBody = `Dear Nova Hospital Team,

I would like to inquire about your healthcare services.

Please provide information about:
• Available medical services
• Doctor consultation schedules
• Appointment booking process
• Hospital facilities
• Emergency services

Patient Details:
• Name: [Your Name]
• Contact: [Your Phone]
• Medical Concern: [Brief Description]

Hospital Location:
Nova Hospital
Noorpur - Amroha Road, Village Milak
Badshahpur, Naugawan Sadat, UP

Thank you for your time.

Best regards,
[Your Name]`;
                
                const mailtoUrl = `mailto:info@novahospital.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                window.open(mailtoUrl);
                showNotification('Opening email client...', 'info');
            });
        } else if (buttonText.includes('appointment')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Trigger WhatsApp appointment booking
                const message = `Hello Nova Hospital,

I would like to book an appointment.

📅 **APPOINTMENT REQUEST:**
• Patient Name: [Your Name]
• Preferred Date: [Date]
• Preferred Time: [Time]
• Medical Department: [Specialty]
• Contact Number: [Your Phone]
• Medical Concern: [Brief Description]

📍 **HOSPITAL LOCATION:**
Nova Hospital, Noorpur - Amroha Road
Village Milak, Badshahpur
Naugawan Sadat, Uttar Pradesh

📞 **CONTACT:** 9105106999

Please confirm appointment availability.
Thank you!`;

                const whatsappUrl = `https://wa.me/919105106999?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                showNotification('Opening WhatsApp for appointment booking...', 'success');
            });
        }
    });
}

// Multiple Maps Integration Options
const mapsIntegration = {
    // Google Maps
    googleMaps: function() {
        return `https://www.google.com/maps/search/Nova+Hospital+Noorpur+Amroha+Road+Village+Milak+Badshahpur+Naugawan+Sadat+Uttar+Pradesh`;
    },
    
    // Apple Maps (for iOS users)
    appleMaps: function() {
        return `http://maps.apple.com/?q=Nova+Hospital+Noorpur+Amroha+Road+Village+Milak+Badshahpur+Naugawan+Sadat+Uttar+Pradesh`;
    },
    
    // Waze Navigation
    waze: function() {
        return `https://waze.com/ul?q=Nova+Hospital+Noorpur+Amroha+Road+Village+Milak+Badshahpur&navigate=yes`;
    },
    
    // Generic navigation (detects user's preferred app)
    navigate: function() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            return this.appleMaps();
        } else {
            return this.googleMaps();
        }
    }
};

// Enhanced Maps Opening with Options
function openMapsWithOptions() {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Show options for mobile users
        const mapChoice = confirm(
            'Choose your preferred navigation app:\n\n' +
            'OK - Google Maps\n' +
            'Cancel - Apple Maps (iOS) / Browser Default'
        );
        
        if (mapChoice) {
            window.open(mapsIntegration.googleMaps(), '_blank');
        } else {
            window.open(mapsIntegration.navigate(), '_blank');
        }
    } else {
        // Desktop - always use Google Maps
        window.open(mapsIntegration.googleMaps(), '_blank');
    }
    
    showNotification('Opening maps application...', 'info');
}

// Initialize contact actions when page loads
document.addEventListener('DOMContentLoaded', function() {
    handleContactActions();
    
    // Add click tracking for directions
    console.log('📍 Maps integration loaded for Nova Hospital');
    console.log('🗺️ Location: Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, UP');
});

// Stop location tracking function
function stopLocationTracking() {
    if (window.locationWatchId) {
        navigator.geolocation.clearWatch(window.locationWatchId);
        window.locationWatchId = null;
        window.liveLocationData = null;
        
        // Remove live location display
        const liveDisplay = document.querySelector('.live-location-display');
        if (liveDisplay) {
            liveDisplay.remove();
        }
        
        // Reset page title
        const currentTitle = document.title;
        if (currentTitle.includes('km to')) {
            document.title = currentTitle.replace(/\d+\.\d+km to Nova Hospital - /, '');
        }
        
        showNotification('📍 Location tracking stopped', 'info');
    }
}

// =============================================================================
// सुपर आसान और बेहतरीन LIVE LOCATION TRACKING SYSTEM
// =============================================================================

// आसान और तेज़ Live Location Tracking
function trackLiveLocation() {
    // शुरुआती message
    showBetterNotification('🛰️ आपका location track कर रहे हैं...', 'info');
    
    // Check करते हैं कि GPS available है या नहीं
    if (!navigator.geolocation) {
        showBetterNotification('❌ आपके device में GPS नहीं है', 'error');
        return;
    }

    // GPS settings - बेहतर accuracy के लिए
    const gpsOptions = {
        enableHighAccuracy: true,  // high accuracy GPS
        timeout: 10000,           // 10 seconds timeout
        maximumAge: 0             // fresh location हमेशा
    };

    // Loading screen दिखाते हैं
    showGPSLoading();

    // Location track करना शुरू करते हैं
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // User की location मिल गई
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            // Nova Hospital की exact location
            const hospitalLat = 28.3699;
            const hospitalLng = 78.0580;

            // Distance calculate करते हैं
            const distance = calculateRealDistance(userLat, userLng, hospitalLat, hospitalLng);
            
            // Loading हटाते हैं
            hideGPSLoading();

            // बेहतरीन tracking display दिखाते हैं
            showAwesomeTrackingDisplay({
                userLat: userLat,
                userLng: userLng,
                hospitalLat: hospitalLat,
                hospitalLng: hospitalLng,
                distance: distance,
                accuracy: accuracy,
                timestamp: new Date()
            });

            // Live directions URL बनाते हैं
            const directionsURL = `https://www.google.com/maps/dir/${userLat},${userLng}/Nova+Hospital,+Badshahpur`;
            
            // Global storage
            window.currentLocationData = {
                userLat, userLng, hospitalLat, hospitalLng, 
                distance, directionsURL, accuracy
            };

            // Success message
            showBetterNotification(`🎯 Location मिल गया! Hospital ${distance.toFixed(1)} km दूर है`, 'success');
        },
        function(error) {
            hideGPSLoading();
            let errorMsg = '🚨 Location Error: ';
            
            if (error.code === 1) {
                errorMsg = '📍 कृपया location permission दें।';
            } else if (error.code === 2) {
                errorMsg = '🌐 Internet connection check करें।';
            } else {
                errorMsg = '⏰ Location लेने में time लग रहा है, फिर try करें।';
            }
            
            showBetterNotification(errorMsg, 'error');
        },
        gpsOptions
    );
}

// Distance calculate करने का function (accurate formula)
function calculateRealDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

// बेहतरीन Loading Screen
function showGPSLoading() {
    const loading = document.createElement('div');
    loading.id = 'gpsLoading';
    loading.innerHTML = `
        <div class="loading-overlay">
            <div class="loading-box">
                <div class="gps-animation">
                    <div class="satellite-icon">🛰️</div>
                    <div class="signal-waves">
                        <div class="wave wave1"></div>
                        <div class="wave wave2"></div>
                        <div class="wave wave3"></div>
                    </div>
                </div>
                <h3>📡 GPS से connect हो रहे हैं...</h3>
                <p>कृपया location permission allow करें</p>
                <div class="progress-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    
    loading.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.85); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
        font-family: system-ui, -apple-system, sans-serif;
    `;
    
    document.body.appendChild(loading);
}

function hideGPSLoading() {
    const loading = document.getElementById('gpsLoading');
    if (loading) loading.remove();
}

// शानदार Tracking Display
function showAwesomeTrackingDisplay(data) {
    // पुराना display हटाते हैं
    const old = document.querySelector('.awesome-tracking');
    if (old) old.remove();

    const trackingDiv = document.createElement('div');
    trackingDiv.className = 'awesome-tracking';
    
    trackingDiv.innerHTML = `
        <div class="tracking-card">
            <div class="tracking-header">
                <div class="status-badge">
                    <span class="pulse-dot"></span>
                    LIVE TRACKING
                </div>
                <button class="close-btn" onclick="closeTracking()">✕</button>
            </div>
            
            <div class="location-info">
                <div class="hospital-section">
                    <div class="hospital-icon">🏥</div>
                    <div>
                        <h4>Nova Hospital</h4>
                        <p>Badshahpur, UP</p>
                    </div>
                </div>
                
                <div class="distance-section">
                    <div class="distance-big">${data.distance.toFixed(1)} <span>KM</span></div>
                    <div class="distance-label">आपसे दूरी</div>
                </div>
                
                <div class="details-grid">
                    <div class="detail-item">
                        <span class="label">📍 Location</span>
                        <span class="value">${data.userLat.toFixed(4)}, ${data.userLng.toFixed(4)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">🎯 Accuracy</span>
                        <span class="value">±${Math.round(data.accuracy)}m</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">🕐 Time</span>
                        <span class="value">${data.timestamp.toLocaleTimeString('hi-IN')}</span>
                    </div>
                </div>
            </div>
            
            <div class="action-buttons">
                <button class="action-btn primary" onclick="startNavigation()">
                    <span class="btn-icon">🧭</span>
                    <span>Navigation शुरू करें</span>
                </button>
                <button class="action-btn secondary" onclick="shareLocation()">
                    <span class="btn-icon">📤</span>
                    <span>Location Share करें</span>
                </button>
                <button class="action-btn emergency" onclick="callEmergency()">
                    <span class="btn-icon">🚨</span>
                    <span>Emergency: 9105106999</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(trackingDiv);
    
    // Smooth animation
    setTimeout(() => trackingDiv.classList.add('show'), 100);
}

// Navigation शुरू करने का function
function startNavigation() {
    if (window.currentLocationData) {
        window.open(window.currentLocationData.directionsURL, '_blank');
        showBetterNotification('🧭 Navigation शुरू हो रहा है...', 'success');
    } else {
        openGoogleMaps();
    }
}

// Location share करने का function
function shareLocation() {
    if (window.currentLocationData) {
        const shareText = `📍 मेरा Location:
Nova Hospital से ${window.currentLocationData.distance.toFixed(1)} km दूर

🏥 Hospital Address:
Nova Hospital, Noorpur - Amroha Road
Village Milak, Badshahpur
Naugawan Sadat, Uttar Pradesh

📞 Emergency: 9105106999
🗺️ Maps: ${window.currentLocationData.directionsURL}`;

        if (navigator.share) {
            navigator.share({
                title: 'Nova Hospital Location',
                text: shareText
            });
        } else {
            navigator.clipboard.writeText(shareText);
            showBetterNotification('📋 Location details copy हो गए!', 'success');
        }
    }
}

// Emergency call
function callEmergency() {
    const confirmCall = confirm('Nova Hospital Emergency पर call करना है?\n📞 9105106999');
    if (confirmCall) {
        window.open('tel:9105106999');
        showBetterNotification('📞 Emergency call हो रहा है...', 'error');
    }
}

// Tracking बंद करने का function
function closeTracking() {
    const tracking = document.querySelector('.awesome-tracking');
    if (tracking) tracking.remove();
    window.currentLocationData = null;
}

// बेहतर Notification System
function showBetterNotification(message, type = 'info') {
    const existing = document.querySelector('.better-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'better-notification';
    notification.innerHTML = `
        <div class="notification-content ${type}">
            <span class="notification-text">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}
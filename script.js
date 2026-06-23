// Nova Hospital - Premium Healthcare Website JavaScript
// Enhanced functionality with working features

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
    document.querySelectorAll('.workflow-section, .premium-services, .statistics-section, .contact-section-premium').forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual cards for stagger effect
    document.querySelectorAll('.workflow-step, .service-card-premium, .stat-card-premium, .contact-card-premium').forEach(card => {
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

// Enhanced Google Maps Directions with Auto Location
function getDirections() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Success - got user location
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Nova Hospital coordinates (approximate)
                const hospitalLocation = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, UP";
                
                // Create Google Maps direction URL with user's current location
                const directionsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${encodeURIComponent(hospitalLocation)}`;
                
                // Open in same tab for better mobile experience
                window.open(directionsUrl, '_self');
                
                console.log('🗺️ Directions opened with user location');
            },
            function(error) {
                // Error getting location - show fallback
                let errorMessage = 'Unable to get your location. ';
                
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
                        break;
                }
                
                console.log('🗺️ Location error:', errorMessage);
                
                // Fallback - open Google Maps with hospital search
                const hospitalLocation = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, UP";
                const fallbackUrl = `https://www.google.com/maps/search/${encodeURIComponent(hospitalLocation)}`;
                window.open(fallbackUrl, '_self');
            }
        );
    } else {
        // Geolocation not supported
        console.log('🗺️ Geolocation not supported by this browser');
        
        // Fallback - open Google Maps with hospital search
        const hospitalLocation = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, UP";
        const fallbackUrl = `https://www.google.com/maps/search/${encodeURIComponent(hospitalLocation)}`;
        window.open(fallbackUrl, '_self');
    }
}
// Enhanced WhatsApp Integration
function initializeWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('.cta-button, .service-button, .contact-action-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            let message = '';
            const buttonText = this.textContent.trim().toLowerCase();
            
            // Determine message based on button context
            if (buttonText.includes('emergency') || this.classList.contains('emergency-cta-btn')) {
                message = createEmergencyMessage();
            } else if (this.closest('.service-card-premium')) {
                message = createServiceMessage(this.closest('.service-card-premium'));
            } else {
                message = createGeneralAppointmentMessage();
            }
            
            const whatsappURL = `https://wa.me/919105106999?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
            
            console.log('📱 WhatsApp message sent');
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
        
        // Close nav when clicking outside
        nav.addEventListener('click', function(e) {
            if (e.target === nav) {
                nav.classList.remove('mobile-open');
                body.classList.remove('nav-open');
                mobileToggle.classList.remove('active');
            }
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
            }
        });
    });
}

// Form Interactions
function initializeFormInteractions() {
    const contactBtns = document.querySelectorAll('.contact-action-btn');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.textContent.toLowerCase();
            
            if (action.includes('direction')) {
                getDirections();
            } else if (action.includes('call')) {
                window.open('tel:9105106999');
                console.log('📞 Opening phone dialer');
            } else if (action.includes('schedule')) {
                // Open WhatsApp for appointment scheduling
                const message = createGeneralAppointmentMessage();
                const whatsappURL = `https://wa.me/919105106999?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
                console.log('📅 Opening WhatsApp for appointment');
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

console.log('🎨 Premium Nova Hospital Website Fully Loaded!');
console.log('✨ Features: Light pink theme, WhatsApp integration, mobile responsive, auto-directions');
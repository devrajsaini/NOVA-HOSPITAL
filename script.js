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
    initializeDoctorInteractions();
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
    document.querySelectorAll('.workflow-section, .expert-doctors-section, .statistics-section, .contact-section-premium').forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual cards for stagger effect
    document.querySelectorAll('.workflow-step, .doctor-card-premium, .stat-card-premium, .contact-card-premium').forEach(card => {
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

// Enhanced Google Maps Directions with Better Fallback
function getDirections() {
    // First, try to get user location with a shorter timeout
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 60000
        };
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Success - got user location
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Nova Hospital location
                const hospitalLocation = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, UP";
                
                // Create Google Maps direction URL with user's current location
                const directionsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${encodeURIComponent(hospitalLocation)}`;
                
                // Open Google Maps in new tab
                window.open(directionsUrl, '_blank');
                
                console.log('🗺️ Directions opened with user location');
            },
            function(error) {
                // Location failed - use improved fallback
                console.log('🗺️ Location detection failed, using smart fallback');
                openDirectionsWithoutLocation();
            },
            options
        );
    } else {
        // Geolocation not supported - use fallback
        console.log('🗺️ Geolocation not supported, using fallback');
        openDirectionsWithoutLocation();
    }
}

// Smart fallback function that works without precise location
function openDirectionsWithoutLocation() {
    // Open Google Maps with Nova Hospital as destination
    // This will prompt user to enter their location or use "My Location"
    const hospitalLocation = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, UP";
    
    // Different fallback URLs to try
    const fallbackUrls = [
        // Option 1: Open directions interface where user can set their location
        `https://www.google.com/maps/dir/Current+Location/${encodeURIComponent(hospitalLocation)}`,
        
        // Option 2: Open hospital location with directions button
        `https://www.google.com/maps/place/${encodeURIComponent(hospitalLocation)}`,
        
        // Option 3: Open hospital search with directions
        `https://www.google.com/maps/search/${encodeURIComponent(hospitalLocation)}`
    ];
    
    // Try the first fallback option
    window.open(fallbackUrls[0], '_blank');
    
    // Show user a helpful message
    console.log('🗺️ Opening Google Maps - you can set your location there for directions');
}

// Open Hospital Location in Google Maps
function openInGoogleMaps() {
    const hospitalLocation = "Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur, Naugawan Sadat, UP";
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(hospitalLocation)}`;
    window.open(mapsUrl, '_blank');
    console.log('🗺️ Opening hospital location in Google Maps');
}
// Enhanced WhatsApp Integration
function initializeWhatsAppIntegration() {
    // Exclude Get Directions button from WhatsApp integration
    const whatsappButtons = document.querySelectorAll('.cta-button, .doctor-cta-btn, .contact-action-btn:not([onclick*="getDirections"])');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim().toLowerCase();
            
            // Skip if it's Get Directions button
            if (buttonText.includes('direction') || buttonText.includes('get directions')) {
                return; // Let the original onclick handle it
            }
            
            e.preventDefault();
            
            let message = '';
            
            // Determine message based on button context
            if (buttonText.includes('emergency') || this.classList.contains('emergency')) {
                message = createEmergencyMessage();
            } else if (this.closest('.doctor-card-premium')) {
                message = createDoctorConsultationMessage(this.closest('.doctor-card-premium'));
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

function createDoctorConsultationMessage(doctorCard) {
    const doctorName = doctorCard.querySelector('h3')?.textContent || 'Doctor';
    const specialty = doctorCard.querySelector('.doctor-specialty')?.textContent || 'Medical Specialist';
    const credentials = doctorCard.querySelector('.credential')?.textContent || 'Medical Professional';
    const experience = doctorCard.querySelector('.experience')?.textContent || 'Experienced';
    const specializations = Array.from(doctorCard.querySelectorAll('.specialization'))
        .map(spec => spec.textContent.trim())
        .slice(0, 3)
        .join(', ');

    return `🩺 **DOCTOR CONSULTATION REQUEST**

Hello Nova Hospital Team,

I would like to book a consultation with ${doctorName}.

👨‍⚕️ **DOCTOR DETAILS:**
• Name: ${doctorName}
• Specialty: ${specialty}
• Qualifications: ${credentials}
• Experience: ${experience}
• Specializations: ${specializations}

📋 **APPOINTMENT REQUEST:**
• Patient name: [Your name]
• Contact number: [Your number]
• Preferred date: [Date preference]
• Preferred time: [Time preference]
• Medical concern: [Brief description]
• Previous medical records: [Yes/No]

💼 **CONSULTATION REQUIREMENTS:**
• Consultation fees and payment modes
• Required documents to bring
• Appointment confirmation
• Hospital location and directions
• Any preparation instructions

📍 **HOSPITAL:** Nova Hospital, Noorpur - Amroha Road, Village Milak, Badshahpur
📞 **CONTACT:** 9105106999

Please confirm ${doctorName}'s availability and provide appointment details.
Thank you!`;
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

// Doctor Card Interactions
function initializeDoctorInteractions() {
    const doctorCards = document.querySelectorAll('.doctor-card-premium');
    
    doctorCards.forEach(card => {
        // Add click tracking
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button') && !e.target.closest('a')) {
                const doctorName = this.querySelector('h3')?.textContent;
                console.log(`Doctor card clicked: ${doctorName}`);
            }
        });
        
        // Add hover effect for consultation badge
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.consultation-badge');
            if (badge) {
                badge.style.transform = 'translateY(0)';
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
                // Only open Google Maps, not WhatsApp
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
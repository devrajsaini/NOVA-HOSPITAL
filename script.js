// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// WhatsApp integration for all appointment buttons
function setupWhatsAppIntegration() {
    const appointmentButtons = document.querySelectorAll('.appointment-btn, .btn-primary, .contact-btn');
    
    appointmentButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            let message = '';
            
            // Check if it's a doctor appointment button
            const doctorCard = button.closest('.doctor-card');
            if (doctorCard) {
                const doctorName = doctorCard.querySelector('h3').textContent;
                const specialization = doctorCard.querySelector('.specialization').textContent;
                
                message = `Hello, I would like to book an appointment with ${doctorName} (${specialization}) at Nova Hospital.

Please help me with:
- Available appointment slots
- Consultation fees
- Required documents

Contact: 9105106999
Thank you!`;
            } else {
                message = `Hello, I would like to schedule an appointment at Nova Hospital.

Hospital Address:
Nova Hospital, Noorpur - Amroha Rd, Village Milak, Badshahpur, Naugawan Sadat, Uttar Pradesh

Please help me with:
- Available time slots
- Doctor consultation
- Services information

Contact: 9105106999
Thank you!`;
            }
            
            const whatsappURL = `https://wa.me/919105106999?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    });
}

// Phone call functionality
function setupPhoneIntegration() {
    const phoneElements = document.querySelectorAll('.emergency-call, .emergency-btn, [href="tel:9105106999"]');
    
    phoneElements.forEach(element => {
        element.addEventListener('click', (e) => {
            if (!element.href || !element.href.includes('tel:')) {
                e.preventDefault();
                window.open('tel:9105106999');
            }
        });
    });
}

// Service link interactions
function setupServiceLinks() {
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const serviceCard = link.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            
            let message = '';
            
            // Special detailed message for Cardiology
            if (serviceName.includes('Cardiology')) {
                message = `Hello, I would like to know more about Nova Hospital's Cardiology & Cardiac Catheterization Lab services.

🏥 **ADVANCED CARDIAC CARE FACILITIES:**
✅ Modern Cardiac Catheterization Lab
✅ Interventional Cardiology Procedures  
✅ Angiography & Angioplasty
✅ Heart Attack Emergency Treatment
✅ 24/7 Cardiac Emergency Care

📍 **Hospital Address:**
Nova Hospital, Noorpur - Amroha Rd, Village Milak, Badshahpur, Naugawan Sadat, Uttar Pradesh

Please provide information about:
- Cardiology consultation appointment
- Cardiac Catheterization Lab procedures
- Emergency cardiac care
- Cost details and insurance

📞 **Emergency Contact:** 9105106999
Thank you!`;
            } else {
                message = `Hello, I would like to know more about ${serviceName} services at Nova Hospital.

Hospital Address:
Nova Hospital, Noorpur - Amroha Rd, Village Milak, Badshahpur, Naugawan Sadat, Uttar Pradesh

Please provide information about:
- Available treatments
- Doctor consultation
- Cost details
- Appointment booking

Contact: 9105106999
Thank you!`;
            }
            
            const whatsappURL = `https://wa.me/919105106999?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    });
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Counter animation for stats
                if (entry.target.classList.contains('stat-item') || entry.target.classList.contains('stat-box')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .doctor-card, .contact-card, .stat-item, .stat-box, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Counter animation
function animateCounter(element) {
    const counter = element.querySelector('h3');
    if (!counter) return;
    
    const target = counter.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const isSlash = target.includes('/');
    
    if (isSlash) return; // Skip 24/7 type counters
    
    let numericTarget;
    if (isPercentage) {
        numericTarget = parseInt(target.replace('%', ''));
    } else if (isPlus) {
        numericTarget = parseInt(target.replace('+', ''));
    } else {
        numericTarget = parseInt(target);
    }
    
    if (isNaN(numericTarget)) return;
    
    const duration = 2000;
    const step = numericTarget / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < numericTarget) {
            let displayValue = Math.floor(current);
            if (isPercentage) {
                counter.textContent = displayValue + '%';
            } else if (isPlus) {
                counter.textContent = displayValue + '+';
            } else {
                counter.textContent = displayValue;
            }
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Floating cards animation
function setupFloatingAnimation() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.style.animation = `float 3s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.5}s`;
    });
}

// Loading animation
function setupLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-left');
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateX(0)';
            }
        }, 300);
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    setupWhatsAppIntegration();
    setupPhoneIntegration();
    setupServiceLinks();
    setupAnimations();
    setupMobileMenu();
    setupFloatingAnimation();
    setupLoadingAnimation();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
    }
    
    .loaded .hero-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 1s ease;
    }
    
    @media (max-width: 768px) {
        .navbar {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            z-index: 999;
        }
        
        .navbar.active {
            left: 0;
        }
        
        .navbar ul {
            flex-direction: column;
            gap: 2rem;
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(style);

// Console log for debugging
console.log('Nova Hospital website loaded successfully!');
console.log('All interactive features initialized:');
console.log('- WhatsApp integration ✓');
console.log('- Phone call functionality ✓');
console.log('- Service links ✓');
console.log('- Animations ✓');
console.log('- Mobile menu ✓');
console.log('- Counter animations ✓');
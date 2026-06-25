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
    initializeCustomCursor();
    initializeDepartmentsFilter();
    
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

// Custom Cursor Implementation
function initializeCustomCursor() {
    // Check if device supports hover (ignore touch screens)
    if (window.matchMedia("(hover: none)").matches) return;

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'custom-cursor-outline';
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    function animate() {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;
        
        outlineX = outlineX + (distX * 0.15);
        outlineY = outlineY + (distY * 0.15);
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animate);
    }
    animate();

    const hoverElements = document.querySelectorAll('a, button, .nav-link, .cta-button, .service-card, .doctor-card-premium, .stat-card-premium');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });
}

// Departments Filter Implementation
function initializeDepartmentsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const deptCards = document.querySelectorAll('.dept-card');

    if (!filterBtns.length || !deptCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            deptCards.forEach(card => {
                // Remove featured styling to normalize grid when filtering
                if (filterValue !== 'all') {
                    card.classList.remove('featured');
                } else if (card.querySelector('.dept-title').textContent === 'Cardiology Center') {
                    // Re-add featured to Cardiology Center if "All" is selected
                    card.classList.add('featured');
                }

                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    // Small delay for animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 400); // Matches CSS transition duration
                }
            });
        });
    });
}

console.log('🎨 Premium Nova Hospital Website Fully Loaded!');
console.log('✨ Features: Dark theme, WhatsApp integration, mobile responsive, auto-directions');
// ========================================
// ADVANCED ANIMATION CONTROLLER
// ========================================

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimation();
        this.setupParticleEffects();
        this.setupProgressRingAnimations();
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Add scroll animation to sections
        document.addEventListener('DOMContentLoaded', () => {
            const sections = document.querySelectorAll('.workflow-section, .expert-doctors-section, .statistics-section, .contact-section-premium');
            sections.forEach(section => {
                section.classList.add('animate-on-scroll');
                observer.observe(section);
            });

            // Add stagger animation to workflow steps
            const workflowGrid = document.querySelector('.workflow-grid');
            if (workflowGrid) {
                workflowGrid.classList.add('stagger-animation');
            }

            // Add stagger animation to doctor cards
            const doctorsGrid = document.querySelector('.doctors-grid-premium');
            if (doctorsGrid) {
                doctorsGrid.classList.add('stagger-animation');
            }

            // Add stagger animation to stats cards
            const statsGrid = document.querySelector('.statistics-grid');
            if (statsGrid) {
                statsGrid.classList.add('stagger-animation');
            }
        });
    }

    // Counter animation for numbers
    setupCounterAnimations() {
        const animateCounter = (element, target, duration = 2000) => {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                element.textContent = Math.floor(start);
                
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    animateCounter(counter, target);
                    counter.dataset.animated = 'true';
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', () => {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        });
    }

    // Enhanced hover effects
    setupHoverEffects() {
        document.addEventListener('DOMContentLoaded', () => {
            // Doctor cards hover effect
            const doctorCards = document.querySelectorAll('.doctor-card-premium');
            doctorCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-15px) rotateY(5deg) rotateX(5deg)';
                    card.style.boxShadow = '0 30px 60px rgba(236, 72, 153, 0.3)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
                    card.style.boxShadow = '0 8px 32px rgba(236, 72, 153, 0.1)';
                });
            });

            // Button ripple effect
            const buttons = document.querySelectorAll('.cta-button, .doctor-cta-btn, .contact-action-btn');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        });
    }

    // Loading animation
    setupLoadingAnimation() {
        document.addEventListener('DOMContentLoaded', () => {
            // Create loading screen
            const loader = document.createElement('div');
            loader.className = 'page-loader';
            loader.innerHTML = '<div class="loader-spinner"></div>';
            document.body.appendChild(loader);

            // Remove loader after page loads
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.remove();
                }, 2000);
            });
        });
    }

    // Particle effects enhancement
    setupParticleEffects() {
        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('bg-canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            
            let particles = [];
            let particleCount = 85;
            const connectionDistance = 125;
            let mouse = { x: null, y: null, radius: 160 };
            
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                if (window.innerWidth < 768) {
                    particleCount = 35;
                } else {
                    particleCount = 85;
                }
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            window.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });
            
            window.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
            
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.vx = (Math.random() - 0.5) * 0.4;
                    this.vy = (Math.random() - 0.5) * 0.4;
                    this.radius = Math.random() * 1.5 + 1;
                    this.color = 'rgba(14, 165, 233, 0.4)';
                }
                
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    
                    if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                    if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
                    
                    if (mouse.x !== null) {
                        const dx = this.x - mouse.x;
                        const dy = this.y - mouse.y;
                        const dist = Math.hypot(dx, dy);
                        if (dist < mouse.radius) {
                            const force = (mouse.radius - dist) / mouse.radius;
                            const angle = Math.atan2(dy, dx);
                            this.x += Math.cos(angle) * force * 1.5;
                            this.y += Math.sin(angle) * force * 1.5;
                        }
                    }
                }
                
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
            }
            
            function init() {
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
            init();
            
            function connect() {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.hypot(dx, dy);
                        
                        if (dist < connectionDistance) {
                            const alpha = (1 - dist / connectionDistance) * 0.12;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
                            ctx.lineWidth = 0.8;
                            ctx.stroke();
                        }
                    }
                }
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                
                connect();
                requestAnimationFrame(animate);
            }
            animate();
        });
    }

    // Progress ring animations
    setupProgressRingAnimations() {
        const animateProgressRing = (ring, percentage) => {
            const circumference = 314; // 2 * PI * 50 (radius)
            const offset = circumference - (percentage / 100) * circumference;
            ring.style.strokeDashoffset = offset;
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const ring = entry.target.querySelector('.progress-circle');
                    const percentage = 98; // Your success rate
                    
                    setTimeout(() => {
                        animateProgressRing(ring, percentage);
                    }, 500);
                    
                    entry.target.dataset.animated = 'true';
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', () => {
            const progressContainers = document.querySelectorAll('.stat-chart');
            progressContainers.forEach(container => {
                progressObserver.observe(container);
            });
        });
    }
}

// Text typing animation
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controller
    new AnimationController();

    // Typing animation removed from hero badge as requested

    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.premium-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Add scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollIndicator.style.width = scrolled + '%';
        }
    });
});

// Add CSS for ripple effect and additional animations
const additionalStyles = `
<style>
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: rippleAnimation 0.6s linear;
    pointer-events: none;
}

@keyframes rippleAnimation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.scroll-indicator {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #ec4899 100%);
    z-index: 9999;
    transition: width 0.25s ease;
}

.txt {
    border-right: 2px solid #ec4899;
    animation: blink 0.7s infinite;
}

@keyframes blink {
    0%, 50% {
        border-color: transparent;
    }
    51%, 100% {
        border-color: #ec4899;
    }
}

/* Enhanced button styles */
.cta-button, .doctor-cta-btn, .contact-action-btn {
    position: relative;
    overflow: hidden;
}

/* 3D Card Effect */
.card-3d {
    transform-style: preserve-3d;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.card-3d:hover {
    transform: rotateY(10deg) rotateX(10deg) translateZ(20px);
}

/* Medical pulse animation for health-related icons */
.medical-pulse {
    animation: medicalPulse 2s infinite;
}

@keyframes medicalPulse {
    0% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
});
// ========================================
// CUSTOM ANIMATED CURSOR CONTROLLER
// ========================================

class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorOuter = null;
        this.cursorTrails = [];
        this.isMoving = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.outerX = 0;
        this.outerY = 0;
        this.trailX = [];
        this.trailY = [];
        
        this.init();
    }

    init() {
        // Don't initialize on mobile devices
        if (window.innerWidth <= 768) return;
        
        this.createCursor();
        this.bindEvents();
        this.animate();
    }

    createCursor() {
        // Main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        // Outer ring
        this.cursorOuter = document.createElement('div');
        this.cursorOuter.className = 'cursor-outer';
        document.body.appendChild(this.cursorOuter);

        // Create cursor trails
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.className = `cursor-trail cursor-trail-${i}`;
            document.body.appendChild(trail);
            this.cursorTrails.push(trail);
            this.trailX[i] = 0;
            this.trailY[i] = 0;
        }

        // Cursor arrow for directions
        this.cursorArrow = document.createElement('div');
        this.cursorArrow.className = 'cursor-arrow';
        document.body.appendChild(this.cursorArrow);
    }

    bindEvents() {
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isMoving = true;
            
            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';
            
            this.createParticles(this.mouseX, this.mouseY);
        });

        // Mouse down
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
            this.createRipple(this.mouseX, this.mouseY);
            setTimeout(() => {
                this.cursor.classList.remove('click');
            }, 200);
        });

        // Hover effects for different elements
        this.bindHoverEffects();
        
        // Stop moving detection
        let moveTimeout;
        document.addEventListener('mousemove', () => {
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => {
                this.isMoving = false;
            }, 100);
        });
    }

    bindHoverEffects() {
        // Links and navigation
        const links = document.querySelectorAll('a, .nav-link');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.cursor.classList.add('link');
                this.cursorOuter.classList.add('hover');
                this.showArrow('→');
            });
            link.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('link');
                this.cursorOuter.classList.remove('hover');
                this.hideArrow();
            });
        });

        // Buttons
        const buttons = document.querySelectorAll('button, .cta-button, .doctor-cta-btn, .contact-action-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.cursor.classList.add('button');
                this.cursorOuter.classList.add('hover');
                this.showArrow('⚡');
            });
            button.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('button');
                this.cursorOuter.classList.remove('hover');
                this.hideArrow();
            });
        });

        // Text areas
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
        textElements.forEach(text => {
            text.addEventListener('mouseenter', () => {
                this.cursor.classList.add('text');
            });
            text.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('text');
            });
        });

        // Medical/Emergency elements
        const medicalElements = document.querySelectorAll('.emergency-icon, .medical-pulse, .fa-heartbeat, .fa-user-md');
        medicalElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('medical');
                this.showArrow('❤️');
            });
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('medical');
                this.hideArrow();
            });
        });

        // Images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorOuter.classList.add('hover');
                this.showArrow('🔍');
            });
            img.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorOuter.classList.remove('hover');
                this.hideArrow();
            });
        });

        // Form inputs
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('mouseenter', () => {
                this.cursor.classList.add('text');
                this.showArrow('✏️');
            });
            input.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('text');
                this.hideArrow();
            });
        });

        // Loading states
        const loadingElements = document.querySelectorAll('.loading, .loader');
        loadingElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('loading');
            });
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('loading');
            });
        });

        // Doctor cards - special magnetic effect
        const doctorCards = document.querySelectorAll('.doctor-card-premium');
        doctorCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.cursor.classList.add('magnetic');
                this.showArrow('👨‍⚕️');
            });
            card.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('magnetic');
                this.hideArrow();
            });
        });

        // Statistics cards
        const statCards = document.querySelectorAll('.premium-stat-card, .stat-card-premium');
        statCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.showArrow('📊');
            });
            card.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.hideArrow();
            });
        });
    }

    showArrow(symbol) {
        this.cursorArrow.textContent = symbol;
        this.cursorArrow.classList.add('show');
        this.cursorArrow.style.left = this.mouseX + 'px';
        this.cursorArrow.style.top = (this.mouseY - 30) + 'px';
    }

    hideArrow() {
        this.cursorArrow.classList.remove('show');
    }

    createParticles(x, y) {
        if (Math.random() > 0.7) { // Create particles 30% of the time
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    animate() {
        // Smooth outer cursor movement
        this.outerX += (this.mouseX - this.outerX) * 0.1;
        this.outerY += (this.mouseY - this.outerY) * 0.1;
        
        this.cursorOuter.style.left = this.outerX + 'px';
        this.cursorOuter.style.top = this.outerY + 'px';

        // Update cursor trails
        this.trailX.unshift(this.mouseX);
        this.trailY.unshift(this.mouseY);
        
        this.cursorTrails.forEach((trail, index) => {
            if (this.trailX[index] && this.trailY[index]) {
                trail.style.left = this.trailX[index] + 'px';
                trail.style.top = this.trailY[index] + 'px';
            }
        });

        // Keep only recent positions
        if (this.trailX.length > 5) this.trailX.pop();
        if (this.trailY.length > 5) this.trailY.pop();

        // Update arrow position if visible
        if (this.cursorArrow.classList.contains('show')) {
            this.cursorArrow.style.left = this.mouseX + 'px';
            this.cursorArrow.style.top = (this.mouseY - 30) + 'px';
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Advanced cursor effects for specific interactions
class CursorEffects {
    static createMagneticEffect(element, cursor) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            cursor.style.transform = `translate(-50%, -50%) translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            cursor.style.transform = 'translate(-50%, -50%)';
        });
    }

    static createTrailEffect(x, y) {
        const colors = ['#ec4899', '#667eea', '#764ba2', '#f093fb'];
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: 4px;
                    height: 4px;
                    background: ${colors[i]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9990;
                    animation: trailFade 0.8s ease-out forwards;
                `;
                document.body.appendChild(dot);
                
                setTimeout(() => dot.remove(), 800);
            }, i * 100);
        }
    }
}

// Initialize cursor on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop
    if (window.innerWidth > 768) {
        // const cursor = new CustomCursor(); // Disabled because it conflicts with initializeCustomCursor()
        
        // Add magnetic effect to important buttons
        const importantButtons = document.querySelectorAll('.cta-button.primary, .doctor-cta-btn');
        importantButtons.forEach(button => {
            CursorEffects.createMagneticEffect(button, cursor.cursor);
        });

        // Add special scroll cursor effects
        let scrolling = false;
        window.addEventListener('scroll', () => {
            if (!scrolling) {
                cursor.cursor.classList.add('loading');
                scrolling = true;
                setTimeout(() => {
                    cursor.cursor.classList.remove('loading');
                    scrolling = false;
                }, 200);
            }
        });

        // Add directional arrows based on scroll
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                cursor.cursor.classList.add('cursor-arrow-down');
                cursor.cursor.classList.remove('cursor-arrow-up');
            } else {
                cursor.cursor.classList.add('cursor-arrow-up');
                cursor.cursor.classList.remove('cursor-arrow-down');
            }
            lastScrollY = currentScrollY;
            
            // Remove arrow classes after scroll stops
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                cursor.cursor.classList.remove('cursor-arrow-up', 'cursor-arrow-down');
            }, 500);
        });
    }
});

// Add trail fade animation to CSS
const trailStyle = document.createElement('style');
trailStyle.textContent = `
@keyframes trailFade {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
}
`;
document.head.appendChild(trailStyle);
// ========================================
// ANIMATED SERVICES TEXT CONTROLLER
// ========================================

class AnimatedServicesText {
    constructor() {
        this.textItems = document.querySelectorAll('.service-text-item');
        this.currentIndex = 0;
        this.animationDuration = 1000; // Duration each text stays visible
        this.transitionDuration = 500;  // Fade transition duration
        this.totalCycleDuration = this.textItems.length * (this.animationDuration + this.transitionDuration);
        
        this.init();
    }

    init() {
        if (this.textItems.length === 0) return;
        
        // Start the animation cycle
        this.startAnimation();
        
        // Add enhanced effects
        this.addParticleEffects();
        this.addSoundEffects();
    }

    startAnimation() {
        // Set initial state
        this.textItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translate(-50%, -50%) translateY(50px)';
        });

        // Start the continuous cycle
        this.runCycle();
        
        // Repeat the cycle
        setInterval(() => {
            this.runCycle();
        }, this.totalCycleDuration);
    }

    runCycle() {
        this.textItems.forEach((item, index) => {
            // Calculate when this item should appear
            const delay = index * (this.animationDuration + this.transitionDuration);
            
            setTimeout(() => {
                this.showText(item, index);
                
                // Hide text after duration
                setTimeout(() => {
                    this.hideText(item);
                }, this.animationDuration);
                
            }, delay);
        });
    }

    showText(item, index) {
        // Add entrance animation
        item.style.opacity = '1';
        item.style.transform = 'translate(-50%, -50%) translateY(0px)';
        item.classList.add('active', 'glowing');
        
        // Add directional slide effects
        if (index % 2 === 0) {
            item.classList.add('slide-from-left');
        } else {
            item.classList.add('slide-from-right');
        }
        
        // Create particle burst effect
        this.createParticleBurst(item);
        
        // Add typing effect for certain items
        if (index === 0) { // Medical Services gets typing effect
            item.classList.add('typing-effect');
        }
    }

    hideText(item) {
        // Add exit animation
        item.style.opacity = '0';
        item.style.transform = 'translate(-50%, -50%) translateY(-50px)';
        item.classList.remove('active', 'glowing', 'slide-from-left', 'slide-from-right', 'typing-effect');
        item.classList.add('fade-out');
        
        // Clean up classes after animation
        setTimeout(() => {
            item.classList.remove('fade-out');
        }, this.transitionDuration);
    }

    createParticleBurst(textElement) {
        const rect = textElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create multiple particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'text-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #ec4899, #667eea);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: particleBurst 1s ease-out forwards;
                transform-origin: center;
                --angle: ${(360 / 8) * i}deg;
            `;
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => particle.remove(), 1000);
        }
    }

    addParticleEffects() {
        // Add CSS for particle burst animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleBurst {
                0% {
                    opacity: 1;
                    transform: rotate(var(--angle)) translateX(0px) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: rotate(var(--angle)) translateX(100px) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    addSoundEffects() {
        // Create subtle sound effects (optional)
        this.textItems.forEach((item, index) => {
            item.addEventListener('animationstart', () => {
                // You can add Web Audio API sounds here
                this.playTextSound(index);
            });
        });
    }

    playTextSound(index) {
        // Web Audio API for subtle sound effects
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different frequencies for different services
            const frequencies = [220, 246, 261, 293, 329, 349, 392, 440];
            oscillator.frequency.setValueAtTime(frequencies[index], audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }
}

// Enhanced scroll-based text animation
class ScrollBasedTextAnimation {
    constructor() {
        this.textItems = document.querySelectorAll('.service-text-item');
        this.heroSection = document.querySelector('.premium-hero');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        if (!this.heroSection) return;
        
        const rect = this.heroSection.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.bottom / window.innerHeight)));
        
        // Animate text based on scroll progress
        this.textItems.forEach((item, index) => {
            const itemProgress = Math.max(0, Math.min(1, 
                (scrollProgress - (index * 0.1)) * (1 / 0.1)
            ));
            
            item.style.opacity = itemProgress;
            item.style.transform = `translate(-50%, -50%) translateY(${(1 - itemProgress) * 50}px)`;
        });
    }
}

// Mouse interaction effects
class MouseInteractionEffects {
    constructor() {
        this.textItems = document.querySelectorAll('.service-text-item');
        this.init();
    }

    init() {
        this.textItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translate(-50%, -50%) scale(1.1)';
                item.style.filter = 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translate(-50%, -50%) scale(1)';
                item.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))';
            });
        });
    }
}

// Initialize all text animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a moment for other animations to start
    setTimeout(() => {
        new AnimatedServicesText();
        new ScrollBasedTextAnimation();
        new MouseInteractionEffects();
    }, 2000);
    
    // Add pause/resume functionality
    let animationPaused = false;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'p' || e.key === 'P') {
            if (animationPaused) {
                document.querySelectorAll('.service-text-item').forEach(item => {
                    item.style.animationPlayState = 'running';
                });
                animationPaused = false;
            } else {
                document.querySelectorAll('.service-text-item').forEach(item => {
                    item.style.animationPlayState = 'paused';
                });
                animationPaused = true;
            }
        }
    });
});
// ========================================
// EMERGENCY CARE FUNCTIONALITY
// ========================================

// Ambulance Request Function
function requestAmbulance() {
    // Show ambulance request modal/alert
    const message = `🚨 AMBULANCE REQUEST 🚨\n\nWe are processing your ambulance request.\n\nFor immediate assistance, please call:\n📞 9105106999\n\nOur team will dispatch an ambulance to your location immediately.\n\nStay calm and provide the following information:\n• Your exact location\n• Nature of emergency\n• Patient's condition\n• Contact number\n\nHelp is on the way!`;
    
    alert(message);
    
    // Optional: Log emergency request
    console.log('Emergency ambulance requested at:', new Date());
    
    // Optional: Send emergency request to WhatsApp
    const emergencyMessage = encodeURIComponent(`🚨 EMERGENCY AMBULANCE REQUEST 🚨\n\nI need immediate ambulance assistance.\n\nPlease dispatch ambulance to my location.\n\nThis is a medical emergency.`);
    const whatsappURL = `https://wa.me/919105106999?text=${emergencyMessage}`;
    
    // Ask user if they want to send WhatsApp message too
    if (confirm('Would you like to send an emergency request via WhatsApp as well?')) {
        window.open(whatsappURL, '_blank');
    }
}

// Emergency Care Animation Controller
class EmergencyAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.addScrollAnimations();
        this.addHoverEffects();
        this.addEmergencyAlerts();
    }

    addScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe emergency section elements
        const emergencyElements = document.querySelectorAll('.feature-item, .emergency-quote, .emergency-cta');
        emergencyElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    }

    addHoverEffects() {
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.feature-icon');
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.4)';
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.feature-icon');
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '0 0 10px rgba(220, 38, 38, 0.5)';
            });
        });
    }

    addEmergencyAlerts() {
        // Add periodic emergency pulse to call button
        const callButton = document.querySelector('.emergency-call-btn');
        if (callButton) {
            setInterval(() => {
                callButton.style.animation = 'none';
                setTimeout(() => {
                    callButton.style.animation = 'emergencyCallPulse 2s infinite';
                }, 100);
            }, 10000); // Every 10 seconds
        }
    }
}

// Emergency Contact Quick Actions
class EmergencyContacts {
    constructor() {
        this.emergencyNumber = '9105106999';
        this.init();
    }

    init() {
        // Add keyboard shortcut for emergency call
        document.addEventListener('keydown', (e) => {
            // Ctrl + E for emergency
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.makeEmergencyCall();
            }
            
            // Ctrl + A for ambulance
            if (e.ctrlKey && e.key === 'a') {
                e.preventDefault();
                requestAmbulance();
            }
        });

        // Add emergency floating button (optional)
        this.addEmergencyFloatingButton();
    }

    makeEmergencyCall() {
        window.open(`tel:${this.emergencyNumber}`);
    }

    addEmergencyFloatingButton() {
        // Create floating emergency button
        const floatingBtn = document.createElement('div');
        floatingBtn.className = 'floating-emergency-btn';
        floatingBtn.innerHTML = `
            <i class="fas fa-phone-alt"></i>
            <span>Emergency</span>
        `;
        
        floatingBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #dc2626, #ef4444);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
            z-index: 1000;
            transition: all 0.3s ease;
            animation: emergencyFloat 3s ease-in-out infinite;
        `;

        floatingBtn.addEventListener('click', () => {
            this.makeEmergencyCall();
        });

        floatingBtn.addEventListener('mouseenter', () => {
            floatingBtn.style.transform = 'scale(1.1)';
            floatingBtn.style.boxShadow = '0 12px 35px rgba(220, 38, 38, 0.6)';
        });

        floatingBtn.addEventListener('mouseleave', () => {
            floatingBtn.style.transform = 'scale(1)';
            floatingBtn.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.4)';
        });

        document.body.appendChild(floatingBtn);

        // Add floating button animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes emergencyFloat {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize Emergency Features
document.addEventListener('DOMContentLoaded', () => {
    new EmergencyAnimations();
    new EmergencyContacts();
    
    // Add emergency section to navigation
    const emergencySection = document.getElementById('emergency-care');
    if (emergencySection) {
        // Smooth scroll to emergency section
        const createEmergencyLink = () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && !document.querySelector('.emergency-nav-link')) {
                const emergencyLink = document.createElement('li');
                emergencyLink.innerHTML = `
                    <a href="#emergency-care" class="nav-link emergency-nav-link">
                        <i class="fas fa-ambulance"></i> Emergency
                    </a>
                `;
                navLinks.insertBefore(emergencyLink, navLinks.children[1]);
                
                // Add emergency styling
                const emergencyNavLink = emergencyLink.querySelector('.nav-link');
                emergencyNavLink.style.color = '#dc2626';
                emergencyNavLink.style.fontWeight = '700';
            }
        };
        
        setTimeout(createEmergencyLink, 1000);
    }
});

// Emergency section specific animations
const emergencyAnimationStyle = document.createElement('style');
emergencyAnimationStyle.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .feature-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .emergency-quote {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .emergency-cta {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;
document.head.appendChild(emergencyAnimationStyle);
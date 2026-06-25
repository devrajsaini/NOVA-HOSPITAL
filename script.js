/**
 * Nova Hospital - Premium Theme Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Preloader Logic ---
    const preloader = document.getElementById('preloader');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const preloaderSpans = document.querySelectorAll('.preloader-text span');
    
    // Add staggered delay to spans for letter animation
    if(preloaderSpans.length > 0) {
        preloaderSpans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.04}s`;
        });
    }

    let progress = 0;
    const duration = 2000; // Total 2 seconds loader
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    if(preloader) {
        const loaderInterval = setInterval(() => {
            progress += increment;
            if (progress > 100) progress = 100;
            
            if(progressFill) progressFill.style.width = `${progress}%`;
            if(progressText) progressText.innerText = `${Math.floor(progress)}%`;

            if (progress === 100) {
                clearInterval(loaderInterval);
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    document.body.classList.remove('loading');
                }, 400); // Pause briefly at 100% before fading out
            }
        }, intervalTime);
    }

    // --- 1. Sticky Header ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.padding = '15px 0';
        }
    });

    // --- 2. Render Departments Dynamically ---
    const departmentsGrid = document.getElementById('departmentsGrid');
    
    // Assuming `hospitalData` is available globally from `data.js`
    if (typeof hospitalData !== 'undefined' && departmentsGrid) {
        
        let deptHTML = '';
        
        // Loop over the object keys
        for (const [key, dept] of Object.entries(hospitalData)) {
            
            // Build the scope list items
            let scopeHTML = '';
            if (dept.scope && dept.scope.length > 0) {
                scopeHTML = '<ul class="dept-scope">';
                // Display max 3 items for brevity on cards
                const displayScope = dept.scope.slice(0, 3);
                displayScope.forEach(item => {
                    scopeHTML += `<li><i class="fas fa-check"></i> ${item}</li>`;
                });
                if (dept.scope.length > 3) {
                    scopeHTML += `<li><i class="fas fa-ellipsis-h"></i> And more</li>`;
                }
                scopeHTML += '</ul>';
            }

            deptHTML += `
                <div class="dept-card">
                    <div class="dept-img-container">
                        <img src="${dept.image}" alt="${dept.title}" onerror="this.src='https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80'">
                        <span class="dept-category">${dept.category || 'Specialty'}</span>
                    </div>
                    <div class="dept-content">
                        <h3>${dept.title}</h3>
                        <p>${dept.overview}</p>
                        ${scopeHTML}
                        <a href="#appointment" class="card-link mt-4" style="margin-top: 15px;">Book Now <i class="fas fa-angle-right"></i></a>
                    </div>
                </div>
            `;
        }
        
        departmentsGrid.innerHTML = deptHTML;
    } else {
        console.warn('hospitalData is not defined or departmentsGrid not found. Please ensure data.js is loaded first.');
        if(departmentsGrid) {
            departmentsGrid.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;">Department data is currently unavailable.</p>';
        }
    }

    // --- 3. Mobile Menu Toggle (Basic implementation) ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#ffffff';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            }
        });
    }

    // --- 4. Simple Form Submission (Prevent Default) ---
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your appointment request has been submitted successfully. We will contact you shortly to confirm.');
            appointmentForm.reset();
        });
    }

    // --- 5. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const body = faq.querySelector('.faq-body');
                if(body) body.style.display = 'none';
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
                const body = item.querySelector('.faq-body');
                if(body) body.style.display = 'block';
            }
        });
    });

    // --- 6. Scroll Reveal Animations ---
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
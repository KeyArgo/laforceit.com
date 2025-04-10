/**
 * Main JavaScript file for argobox.com
 * Handles animations, interactions, and dynamic content
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all website functionality
    initNavigation();
    initParticlesAndIcons();
    initRoleRotation();
    initTerminalTyping();
    initSolutionsCarousel();
    initScrollReveal();
    updateMetrics();
    updateYear();
    
    // Initialize form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        initFormHandling(contactForm);
    }
});

/**
 * Set up navigation functionality - mobile menu and scroll spy
 */
function initNavigation() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        });
    }
    
    // Navigation scroll spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Navbar style change on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarStyle() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        updateNavbarStyle();
    });
    
    // Initial call to set correct states
    updateActiveNavLink();
    updateNavbarStyle();
}

/**
 * Create background particles and floating tech icons
 */
function initParticlesAndIcons() {
    createBackgroundParticles();
    createFloatingIcons();
}

/**
 * Create animated background particles
 */
function createBackgroundParticles() {
    const particlesContainer = document.getElementById('particles-container');
    
    if (!particlesContainer) return;
    
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size, opacity, and position
        const size = Math.random() * 4 + 1;
        const opacity = Math.random() * 0.3 + 0.1;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;
        
        // Position randomly with some clustering toward top areas
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        
        // Animation properties
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add particle animation
        particle.style.animation = `particle-float ${Math.random() * 20 + 10}s linear infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Create floating tech icons in the background
 */
function createFloatingIcons() {
    const iconContainer = document.getElementById('floating-icons');
    
    if (!iconContainer) return;
    
    iconContainer.innerHTML = '';
    
    // Tech-related unicode symbols and fontawesome classes
    const icons = [
        '⚙️', '💻', '🔒', '🔌', '🌐', '☁️', '📊', 
        'fa-server', 'fa-network-wired', 'fa-database', 
        'fa-code-branch', 'fa-cloud', 'fa-shield-alt'
    ];
    
    for (let i = 0; i < 12; i++) {
        const icon = document.createElement('div');
        icon.classList.add('floating-icon');
        
        const iconType = icons[Math.floor(Math.random() * icons.length)];
        
        // Handle both unicode and font awesome
        if (iconType.startsWith('fa-')) {
            const faIcon = document.createElement('i');
            faIcon.className = `fas ${iconType}`;
            icon.appendChild(faIcon);
        } else {
            icon.textContent = iconType;
        }
        
        // Random size and position
        const size = Math.random() * 24 + 16;
        icon.style.fontSize = `${size}px`;
        
        // Position
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.bottom = `-50px`;
        
        // Animation
        icon.style.animationDuration = `${Math.random() * 30 + 20}s`;
        icon.style.animationDelay = `${Math.random() * 10}s`;
        
        iconContainer.appendChild(icon);
    }
}

/**
 * Initialize role rotation in the hero section
 */
function initRoleRotation() {
    const roles = document.querySelectorAll('.role');
    const descriptionElement = document.getElementById('role-description');
    
    if (roles.length === 0 || !descriptionElement) return;
    
    let currentRole = 0;
    
    function rotateRoles() {
        // Hide current role
        roles[currentRole].classList.remove('active');
        
        // Move to next role
        currentRole = (currentRole + 1) % roles.length;
        
        // Show new role
        roles[currentRole].classList.add('active');
        
        // Update description text
        const newDescription = roles[currentRole].getAttribute('data-description');
        if (newDescription) {
            descriptionElement.textContent = newDescription;
            
            // Animate the description change
            descriptionElement.style.opacity = '0';
            descriptionElement.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                descriptionElement.style.opacity = '1';
                descriptionElement.style.transform = 'translateY(0)';
            }, 50);
        }
    }
    
    // Set initial role to active
    roles[0].classList.add('active');
    
    // Initialize with the first description
    const initialDescription = roles[0].getAttribute('data-description');
    if (initialDescription && descriptionElement) {
        descriptionElement.textContent = initialDescription;
    }
    
    // Start rotation with delay
    setInterval(rotateRoles, 5000);
}

/**
 * Initialize terminal typing animation in the hero section
 */
function initTerminalTyping() {
    const terminalText = document.getElementById('terminal-text');
    if (!terminalText) return;
    
    const terminalMessages = [
        "> Ready for deployment...",
        "> Reducing operational costs by 30%",
        "> Improving system reliability to 99.9%",
        "> Accelerating digital transformation",
        "> Enhancing security compliance",
        "> Streamlining IT workflows",
        "> Optimizing infrastructure performance",
        "> Implementing best practices",
        "> Supporting business objectives"
    ];
    
    let currentMessage = 0;
    
    function typeMessage(message, index = 0) {
        if (index < message.length) {
            terminalText.textContent = message.substring(0, index + 1);
            setTimeout(() => typeMessage(message, index + 1), 50 + Math.random() * 50);
        } else {
            // Wait before clearing and typing next message
            setTimeout(clearAndTypeNext, 3000);
        }
    }
    
    function clearAndTypeNext() {
        // Clear the current text with a backspace effect
        const currentText = terminalText.textContent;
        
        function backspace(length = currentText.length) {
            if (length > 0) {
                terminalText.textContent = currentText.substring(0, length - 1);
                setTimeout(() => backspace(length - 1), 20);
            } else {
                // Move to next message
                currentMessage = (currentMessage + 1) % terminalMessages.length;
                setTimeout(() => typeMessage(terminalMessages[currentMessage]), 500);
            }
        }
        
        backspace();
    }
    
    // Start the typing animation with the first message
    typeMessage(terminalMessages[0]);
}

/**
 * Initialize the solutions carousel
 */
function initSolutionsCarousel() {
    const slides = document.querySelectorAll('.solution-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length === 0 || dots.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            
            // Restart automatic rotation
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Start automatic rotation
    slideInterval = setInterval(nextSlide, 5000);
    
    // Show first slide initially
    showSlide(0);
}

/**
 * Add scroll reveal animations to elements
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-header, .service-card, .project-card, .lab-card, .timeline-item, .contact-item');
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

/**
 * Update metrics values periodically to simulate live data
 */
function updateMetrics() {
    const metrics = {
        'CPU Usage': { min: 30, max: 60, element: null },
        'Memory': { min: 45, max: 70, element: null },
        'Storage': { min: 60, max: 75, element: null },
        'Network': { min: 15, max: 40, element: null }
    };
    
    // Get all metric elements
    document.querySelectorAll('.metric').forEach(metric => {
        const nameElement = metric.querySelector('.metric-name');
        if (nameElement && metrics[nameElement.textContent]) {
            metrics[nameElement.textContent].element = metric;
        }
    });
    
    function updateMetricValues() {
        Object.keys(metrics).forEach(key => {
            const metric = metrics[key];
            if (!metric.element) return;
            
            const valueEl = metric.element.querySelector('.metric-value');
            const progressEl = metric.element.querySelector('.metric-progress');
            
            if (valueEl && progressEl) {
                const newValue = Math.floor(Math.random() * (metric.max - metric.min)) + metric.min;
                valueEl.textContent = `${newValue}%`;
                progressEl.style.width = `${newValue}%`;
            }
        });
    }
    
    // Update metrics every 5 seconds
    setInterval(updateMetricValues, 5000);
}

/**
 * Initialize contact form handling
 */
function initFormHandling(form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        const formData = {
            name: form.elements['name'].value,
            email: form.elements['email'].value,
            subject: form.elements['subject'].value,
            message: form.elements['message'].value
        };

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            const notification = document.getElementById('form-notification');
            const notificationIcon = notification.querySelector('i');
            const notificationText = notification.querySelector('.notification-text');

            if (data.success) {
                notification.style.display = 'block';
                notification.classList.add('success');
                notification.classList.remove('error');
                notificationIcon.className = 'fas fa-check-circle';
                notificationText.textContent = "Message sent successfully! We'll get back to you soon.";
                form.reset();
            } else {
                notification.style.display = 'block';
                notification.classList.add('error');
                notification.classList.remove('success');
                notificationIcon.className = 'fas fa-exclamation-circle';
                notificationText.textContent = "Failed to send message. Please try again or contact me directly.";
            }

            // Hide notification after 5 seconds
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);

        } catch (error) {
            console.error("Error:", error);
            const notification = document.getElementById('form-notification');
            notification.style.display = 'block';
            notification.classList.add('error');
            notification.classList.remove('success');
            notification.querySelector('i').className = 'fas fa-exclamation-circle';
            notification.querySelector('.notification-text').textContent = "Something went wrong while sending your message.";
            
            // Hide notification after 5 seconds
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        } finally {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

/**
 * Update copyright year in the footer
 */
function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}
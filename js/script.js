// Set current year with animation
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize AOS (Animate on Scroll) with premium settings
AOS.init({
    duration: 1200,
    once: true,
    offset: 100,
    delay: 100,
    easing: 'ease-in-out-cubic',
    mirror: false,
    anchorPlacement: 'top-bottom'
});

// Loading animation removed for faster performance
window.addEventListener('load', () => {
    // Animate hero content after loading
    anime({
        targets: '.hero-content h1',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutExpo',
        delay: 300
    });

    anime({
        targets: '.hero-content p',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 600
    });

    anime({
        targets: '.hero-btns',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 900
    });
});

// Initialize Owl Carousel with luxury settings
$(document).ready(function () {
    // Testimonial slider with premium effects
    $('.testimonial-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        dots: true,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        },
        onInitialized: function (event) {
            // Add animation to active item
            $('.owl-item.active').find('.testimonial-card').addClass('animated');
        },
        onTranslate: function (event) {
            $('.testimonial-card').removeClass('animated');
        },
        onTranslated: function (event) {
            $('.owl-item.active').find('.testimonial-card').addClass('animated');
        }
    });

    // Partner slider with luxury effects
    $('.partner-slider').owlCarousel({
        loop: true,
        margin: 40,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        smartSpeed: 800,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        },
        onInitialized: function (event) {
            anime({
                targets: '.partner-logo',
                scale: [0.8, 1],
                opacity: [0, 1],
                delay: anime.stagger(100),
                duration: 800,
                easing: 'easeOutBack'
            });
        }
    });

    // Initialize multiple sliders if needed
    initializeSliders();
});

// Navbar scroll effect with smooth transitions
let lastScrollTop = 0;
let navbar = $('.navbar');
let ticking = false;

$(window).scroll(function () {
    const scrollTop = $(this).scrollTop();

    // Request animation frame for smooth performance
    if (!ticking) {
        window.requestAnimationFrame(function () {
            handleNavbarScroll(scrollTop);
            ticking = false;
        });
        ticking = true;
    }

    // Back to top button
    if (scrollTop > 300) {
        $('.back-to-top').fadeIn(300).addClass('active');
    } else {
        $('.back-to-top').fadeOut(300).removeClass('active');
    }

    // Luxury Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const scrollProgress = document.querySelector(".scroll-progress");
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + "%";
    }

    lastScrollTop = scrollTop;
});

function handleNavbarScroll(scrollTop) {
    if (scrollTop > 100) {
        navbar.addClass('scrolled');

        // Add subtle animation
        if (scrollTop > lastScrollTop) {
            navbar.css({
                'transform': 'translateY(-100%)',
                'transition': 'transform 0.3s ease'
            });
        } else {
            navbar.css({
                'transform': 'translateY(0)',
                'transition': 'transform 0.3s ease'
            });
        }
    } else {
        navbar.removeClass('scrolled');
        navbar.css('transform', 'translateY(0)');
    }
}

// Smooth scrolling for anchor links with custom easing
$('a[href*="#"]:not([href="#"])').on('click', function (e) {
    if (this.hash !== "") {
        e.preventDefault();
        const hash = this.hash;
        const target = $(hash);

        if (target.length) {
            const headerHeight = $('.navbar').outerHeight();
            const targetPosition = target.offset().top - headerHeight;

            // Custom scroll animation with easing
            anime({
                targets: document.documentElement,
                scrollTop: targetPosition,
                duration: 1000,
                easing: 'easeInOutCubic',
                complete: function () {
                    // Update URL without jumping
                    history.pushState(null, null, hash);
                }
            });
        }
    }
});

// Active nav link on scroll with highlight animation
$(window).scroll(function () {
    const scrollDistance = $(window).scrollTop() + 100;
    let currentSection = '';

    $('section').each(function () {
        const sectionTop = $(this).offset().top;
        const sectionId = $(this).attr('id');

        if (scrollDistance >= sectionTop) {
            currentSection = sectionId;
        }
    });

    if (currentSection !== '') {
        $('.navbar-nav .nav-link').removeClass('active');
        const activeLink = $('.navbar-nav .nav-link[href="#' + currentSection + '"]');
        activeLink.addClass('active');

        // Add highlight animation
        if (!activeLink.hasClass('highlighted')) {
            activeLink.addClass('highlighted');
            setTimeout(() => activeLink.removeClass('highlighted'), 1000);
        }
    }
}).scroll();

// Portfolio filtering with 3D animations
$('.filter-btn').click(function () {
    const filterValue = $(this).attr('data-filter');

    // Button animation
    anime({
        targets: this,
        scale: [1, 0.9, 1],
        duration: 300,
        easing: 'easeInOutSine'
    });

    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    // Portfolio items animation
    const portfolioItems = $('.portfolio-item');
    const filteredItems = filterValue === 'all' ? portfolioItems : portfolioItems.filter('[data-category="' + filterValue + '"]');

    // Hide all items with animation
    portfolioItems.each(function (index) {
        const item = $(this);
        if (!filteredItems.is(item)) {
            anime({
                targets: item[0],
                opacity: 0,
                scale: 0.8,
                duration: 400,
                easing: 'easeInSine',
                complete: function () {
                    item.hide();
                }
            });
        }
    });

    // Show filtered items with staggered animation
    setTimeout(() => {
        filteredItems.each(function (index) {
            const item = $(this);
            item.show();
            anime({
                targets: item[0],
                opacity: [0, 1],
                scale: [0.8, 1],
                translateY: [50, 0],
                duration: 600,
                delay: index * 100,
                easing: 'easeOutBack'
            });
        });
    }, 400);
});

// Counter animation with progress bars
$('.stat-number').counterUp({
    delay: 10,
    time: 2500,
    onComplete: function () {
        // Add celebration animation
        anime({
            targets: this,
            scale: [1, 1.1, 1],
            duration: 500,
            easing: 'easeInOutSine'
        });
    }
});

// Lightbox with enhanced animations
lightbox.option({
    'resizeDuration': 300,
    'wrapAround': true,
    'albumLabel': 'Image %1 of %2',
    'fadeDuration': 400,
    'imageFadeDuration': 400,
    'positionFromTop': 100
});

// Back to top button with smooth scroll
$('.back-to-top').click(function (e) {
    e.preventDefault();

    anime({
        targets: this,
        scale: [1, 0.9, 1],
        duration: 300,
        easing: 'easeInOutSine'
    });

    anime({
        targets: document.documentElement,
        scrollTop: 0,
        duration: 1000,
        easing: 'easeInOutCubic'
    });

    return false;
});

// Premium Form submission with loading animation
$('#contactForm').submit(function (e) {
    e.preventDefault();

    const form = $(this);
    const submitBtn = form.find('button[type="submit"]');
    const originalText = submitBtn.html();

    // Show loading animation
    submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Sending...');

    // Simulate API call with animation
    setTimeout(() => {
        // Reset button
        submitBtn.prop('disabled', false).html(originalText);

        // Show success toast
        showLuxuryToast('Success!', 'Thank you for your message! We will contact you soon.', 'success', 'fa-check-circle');

        // Form reset animation
        anime({
            targets: form.find('.form-control'),
            translateY: [0, -10, 0],
            opacity: [1, 0.5, 1],
            duration: 600,
            easing: 'easeInOutSine',
            delay: anime.stagger(100),
            complete: function () {
                form[0].reset();
            }
        });
    }, 2000);
});

// Newsletter form with premium effects
$('.newsletter-form').submit(function (e) {
    e.preventDefault();

    const form = $(this);
    const input = form.find('input');
    const button = form.find('button');
    const originalText = button.html();

    // Button animation
    button.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');

    // Input animation
    anime({
        targets: input[0],
        scale: [1, 1.05, 1],
        duration: 400,
        easing: 'easeInOutSine'
    });

    setTimeout(() => {
        // Reset button
        button.prop('disabled', false).html(originalText);

        // Show toast
        showLuxuryToast('Subscribed!', 'Thank you for subscribing to our newsletter!', 'success', 'fa-paper-plane');

        // Input clear animation
        anime({
            targets: input[0],
            value: '',
            duration: 300,
            easing: 'easeOutSine'
        });
    }, 1500);
});

// Luxury Toast Notification System
function showLuxuryToast(title, message, type = 'info', iconClass = 'fa-info-circle') {
    const container = document.getElementById('toastContainer') || createToastContainer();
    const toastId = 'toast-' + Date.now();

    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `luxury-toast luxury-toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="removeToast('${toastId}')">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Animate toast in
    anime({
        targets: `#${toastId}`,
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutBack'
    });

    // Animate progress bar
    anime({
        targets: `#${toastId} .toast-progress`,
        width: ['100%', '0%'],
        duration: 5000,
        easing: 'linear',
        complete: function () {
            removeToast(toastId);
        }
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        removeToast(toastId);
    }, 5000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

function removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        anime({
            targets: toast,
            translateX: [0, 100],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInSine',
            complete: function () {
                toast.remove();
            }
        });
    }
}

// Dark Mode Toggle with smooth transitions
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    // Button animation
    anime({
        targets: themeToggle,
        rotate: 360,
        scale: [1, 1.2, 1],
        duration: 600,
        easing: 'easeInOutCubic'
    });

    const isDark = body.getAttribute('data-theme') === 'dark';

    // Smooth theme transition
    if (isDark) {
        // Switch to light mode
        body.style.transition = 'background-color 0.8s ease, color 0.8s ease';
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');

        // Animate elements for light mode
        animateThemeTransition('light');
    } else {
        // Switch to dark mode
        body.style.transition = 'background-color 0.8s ease, color 0.8s ease';
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');

        // Animate elements for dark mode
        animateThemeTransition('dark');
    }

    // Reset transition after animation
    setTimeout(() => {
        body.style.transition = '';
    }, 800);
});

function animateThemeTransition(theme) {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .team-card, .pricing-card');

    anime({
        targets: cards,
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        color: theme === 'dark' ? '#e0e0e0' : '#333333',
        duration: 800,
        easing: 'easeInOutQuad',
        delay: anime.stagger(50)
    });
}

// Parallax scrolling effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Mouse cursor animation
function initMouseEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'luxury-cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'luxury-cursor-follower';
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Main cursor
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        cursor.style.left = posX + 'px';
        cursor.style.top = posY + 'px';

        // Follower
        followerX += (mouseX - followerX) / 6;
        followerY += (mouseY - followerY) / 6;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }

    animate();

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });
}

// Particle animation for hero section
function initParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    heroSection.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = posX + '%';
        particle.style.top = posY + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        particlesContainer.appendChild(particle);
    }
}

// Page transition animations
function initPageTransitions() {
    // Add transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);

    // Handle link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && !link.href.includes('#') && link.target !== '_blank') {
            e.preventDefault();

            // Show transition
            anime({
                targets: transitionOverlay,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeInOutSine',
                complete: function () {
                    window.location.href = link.href;
                }
            });
        }
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initParallax();
    initMouseEffects();
    initParticles();
    initPageTransitions();

    // Add scroll animations for elements
    addScrollAnimations();

    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip({
        animation: true,
        delay: { "show": 300, "hide": 100 }
    });
});

// Add custom scroll animations
function addScrollAnimations() {
    // Scroll trigger for elements
    const scrollTrigger = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Add specific animations based on class
                if (entry.target.classList.contains('stat-item')) {
                    anime({
                        targets: entry.target,
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutBack'
                    });
                }

                if (entry.target.classList.contains('feature-item')) {
                    anime({
                        targets: entry.target,
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe elements
    document.querySelectorAll('.stat-item, .feature-item, .process-step, .team-card').forEach(el => {
        scrollTrigger.observe(el);
    });
}

// Initialize multiple sliders with unique settings
function initializeSliders() {
    // Additional slider configurations can be added here
    console.log('All sliders initialized');
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes lightbox
    if (e.key === 'Escape') {
        if (lightbox && lightbox.active) {
            lightbox.close();
        }
    }

    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft') {
        $('.testimonial-slider').trigger('prev.owl.carousel');
    }
    if (e.key === 'ArrowRight') {
        $('.testimonial-slider').trigger('next.owl.carousel');
    }
});

// Add CSS for custom elements
function addCustomStyles() {
    const styles = `
        /* Luxury Toast */
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9998;
        }
        
        .luxury-toast {
            background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            min-width: 300px;
            border-left: 4px solid;
            animation: toastIn 0.5s ease forwards;
        }
        
        .luxury-toast-success {
            border-left-color: #4CAF50;
        }
        
        .luxury-toast-error {
            border-left-color: #f44336;
        }
        
        .luxury-toast-info {
            border-left-color: #2196F3;
        }
        
        .luxury-toast-warning {
            border-left-color: #ff9800;
        }
        
        .toast-icon {
            font-size: 1.5rem;
            margin-right: 15px;
        }
        
        .toast-content {
            flex: 1;
        }
        
        .toast-title {
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 1.1rem;
        }
        
        .toast-message {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            padding: 5px;
            transition: color 0.3s ease;
        }
        
        .toast-close:hover {
            color: white;
        }
        
        .toast-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: rgba(255, 255, 255, 0.2);
        }
        
        /* Cursor effects */
        .luxury-cursor {
            position: fixed;
            width: 10px;
            height: 10px;
            background: #e60000;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        
        .luxury-cursor.active {
            transform: scale(1.5);
            background: #ffdd57;
        }
        
        .luxury-cursor-follower {
            position: fixed;
            width: 30px;
            height: 30px;
            border: 2px solid rgba(230, 0, 0, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9996;
            transition: all 0.3s ease;
        }
        
        .luxury-cursor-follower.active {
            transform: scale(0.5);
            border-color: #ffdd57;
            background: rgba(255, 221, 87, 0.1);
        }
        
        /* Particles */
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: floatParticle linear infinite;
        }
        
        /* Page transition */
        .page-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #e60000, #800000);
            z-index: 9998;
            opacity: 0;
            pointer-events: none;
        }
        
        /* Animation keyframes */
        @keyframes floatParticle {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes toastIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Nav link highlight animation */
        .nav-link.highlighted {
            animation: navLinkHighlight 1s ease;
        }
        
        @keyframes navLinkHighlight {
            0%, 100% {
                color: inherit;
            }
            50% {
                color: #ffdd57;
                text-shadow: 0 0 10px rgba(255, 221, 87, 0.5);
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Add custom styles on load
window.addEventListener('load', addCustomStyles);

// Performance optimization
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reinitialize animations on resize
        AOS.refresh();
    }, 250);
});

// Service Worker registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

// Export functions for global use (if needed)
window.JustAskPremium = {
    showToast: showLuxuryToast,
    changeTheme: () => themeToggle.click(),
    scrollToSection: (sectionId) => {
        const target = document.getElementById(sectionId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
};
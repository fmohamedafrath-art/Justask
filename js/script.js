// Set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Owl Carousel
$(document).ready(function () {
    $('.testimonial-slider').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
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
        }
    });

    $('.partner-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
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
            1200: {
                items: 6
            }
        }
    });
});

// Navbar scroll effect
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.navbar').addClass('scrolled');
        $('.back-to-top').fadeIn();
    } else {
        $('.navbar').removeClass('scrolled');
        $('.back-to-top').fadeOut();
    }
});

// Smooth scrolling for anchor links
$('a[href*="#"]').on('click', function (e) {
    if (this.hash !== "" && this.hash !== "#") {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top - 70
        }, 500);
    }
});

// Active nav link on scroll
$(window).scroll(function () {
    var scrollDistance = $(window).scrollTop() + 100;

    $('section').each(function () {
        var sectionTop = $(this).offset().top;
        var sectionId = $(this).attr('id');

        if (scrollDistance >= sectionTop) {
            $('.navbar-nav .nav-link').removeClass('active');
            $('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass('active');
        }
    });
}).scroll();

// Portfolio filtering
$('.filter-btn').click(function () {
    var filterValue = $(this).attr('data-filter');

    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filterValue === 'all') {
        $('.portfolio-item').fadeIn(300);
    } else {
        $('.portfolio-item').each(function () {
            if ($(this).attr('data-category') === filterValue) {
                $(this).fadeIn(300);
            } else {
                $(this).fadeOut(300);
            }
        });
    }
});

// Counter animation
$('.stat-number').counterUp({
    delay: 10,
    time: 2000
});

// Lightbox
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'albumLabel': 'Image %1 of %2'
});

// Back to top button
$('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
    return false;
});

// Form submission
$('#contactForm').submit(function (e) {
    e.preventDefault();
    showToast('Success!', 'Thank you for your message! We will contact you soon.', 'fa-check-circle');
    this.reset();
});

// Newsletter form
$('.newsletter-form').submit(function (e) {
    e.preventDefault();
    showToast('Subscribed!', 'Thank you for subscribing to our newsletter!', 'fa-paper-plane');
    $(this).find('input').val('');
});

// Toast Notification Function
function showToast(title, message, iconClass = 'fa-info-circle') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <i class="fas ${iconClass} toast-icon"></i>
        <div class="toast-content">
            <div class="fw-bold">${title}</div>
            <small>${message}</small>
        </div>
    `;
    container.appendChild(toast);

    // Remove toast after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}



// Dark Mode Toggle
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
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});

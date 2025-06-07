document.addEventListener('DOMContentLoaded', function() {

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.onscroll = function() {
        // Show button when user scrolls down 300px
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    };

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Mobile Navigation Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // --- Fade-in Animation on Scroll ---
    // This uses the Intersection Observer API for better performance
    const faders = document.querySelectorAll('.timeline-item, .skill-card, .education-card, .achievement-card, .about-text, .contact-info-grid');

    const appearOptions = {
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // trigger a little early
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, appearOptions);

    // Add a base class to elements that will be animated
    faders.forEach(fader => {
        fader.classList.add('fade-in');
        appearOnScroll.observe(fader);
    });

    // --- Active Navigation Link on Scroll (Scroll Spy) ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const sectionTop = section.offsetTop - 90; // Adjusted offset for fixed header and better activation
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.href.includes(current)) {
                a.classList.add('active');
            }
        });

        // Special handling for the last section (Contact)
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const contactSectionTop = contactSection.offsetTop - 90;
            if (scrollY + window.innerHeight >= document.body.scrollHeight) {
                current = 'contact';
            }
        }

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.href.includes(current)) {
                a.classList.add('active');
            }
        });
    });

});

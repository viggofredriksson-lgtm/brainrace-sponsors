// ========================================
// GÖTEBORG BASKETBALL FESTIVAL - PARTNERS
// ========================================

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('open');
    });
});

// Animated number counter
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);

                    el.textContent = current.toLocaleString('sv-SE');

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

// Fade-in on scroll
function initFadeIn() {
    const elements = document.querySelectorAll(
        '.stat-card, .why-card, .exposure-phase, .tier-card, .partners-section, .about-grid, .contact-grid'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for sibling elements
                const parent = entry.target.parentElement;
                const siblings = parent.querySelectorAll('.fade-in');
                let delay = 0;
                siblings.forEach((sib, i) => {
                    if (sib === entry.target) delay = i * 100;
                });

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
}

// Navbar shadow on scroll
function initNavShadow() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
        }
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show success message
        const wrapper = form.parentElement;
        wrapper.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#5fb5b2" stroke-width="2" style="width: 64px; height: 64px; margin: 0 auto 20px;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 style="font-family: 'Montserrat', sans-serif; font-size: 22px; margin-bottom: 12px;">Tack för ert intresse!</h3>
                <p style="color: #555; line-height: 1.7;">Vi har tagit emot er förfrågan och återkommer så snart vi kan.<br>Vi ser fram emot att prata mer om ett partnerskap!</p>
            </div>
        `;
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    initFadeIn();
    initNavShadow();
    initContactForm();
    initSmoothScroll();
});

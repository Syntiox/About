/* =====================================================
   ABOUT SYNTIOX — JavaScript
   Scroll reveals, navbar, mobile menu, year auto-fill
   ===================================================== */

// ── Scroll Reveal ──
function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ── Navbar scroll effect ──
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.82)';
            navbar.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    }, { passive: true });
}

// ── Mobile Menu ──
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

// ── Year auto-fill ──
function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ── Active nav link ──
function initActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
            link.classList.add('active');
        }
    });
}

// ── Counter animation ──
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalVal = target.getAttribute('data-count');
                const isNumber = !isNaN(parseInt(finalVal));

                if (isNumber) {
                    const end = parseInt(finalVal);
                    let current = 0;
                    const step = Math.max(1, Math.floor(end / 40));
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= end) {
                            current = end;
                            clearInterval(timer);
                        }
                        target.textContent = current + (target.dataset.suffix || '');
                    }, 30);
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initNavbar();
    initMobileMenu();
    initYear();
    initActiveLink();
    animateCounters();
});

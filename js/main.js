// Main JavaScript for Event Sphere
const SCROLL_THRESHOLD = 100;
const NOTIFICATION_DURATION = 3000;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

let notificationTimeout = null;
let activeModal = null;

function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement !== null) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function updateActiveNav() {
    const pathArray = window.location.pathname.split('/');
    const currentPage = pathArray[pathArray.length - 1] || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html') || (currentPage === 'index.html' && linkHref === '#')) {
            link.classList.add('active');
        }
    });
}

function initStickyNav() {
    const header = document.querySelector('header');
    if (header === null) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

function initMobileMenu() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(menuBtn, nav.firstChild);
    
    menuBtn.addEventListener('click', function() {
        const navUl = nav.querySelector('ul');
        navUl.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting === true) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.card, .diff, .cards-section').forEach(function(element) {
        element.classList.add('fade-element');
        observer.observe(element);
    });
}

// ===== LOADING SCREEN =====

function initLoadingScreen() {
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader !== null) {
            setTimeout(function() {
                loader.style.opacity = '0';
                setTimeout(function() { loader.style.display = 'none'; }, 300);
            }, 500);
        }
    });
}

function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initModals() {
    if (!document.querySelector('.modal')) {
        const modalHTML = `<div class="modal" id="eventModal"><div class="modal-content"><span class="modal-close">&times;</span><div class="modal-body"><h2 id="modalTitle"></h2><div id="modalContent"></div><button class="btn modal-btn">Register Now</button></div></div></div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn !== null) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            activeModal = null;
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
            activeModal = null;
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            activeModal = null;
        }
    });
}

function openModal(title, content) {
    const modal = document.querySelector('.modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (modal !== null && modalTitle !== null && modalContent !== null) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modal.classList.add('active');
        activeModal = modal;
    }
}

function validateEmail(email) {
    if (typeof email !== 'string' || email.trim() === '') return false;
    return EMAIL_REGEX.test(email);
}

function validatePhone(phone) {
    const cleanPhone = phone.replace(/[\s-]/g, '');
    return /^[0-9]{10}$/.test(cleanPhone);
}

function validateRequired(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function showNotification(message, type) {
    if (typeof type === 'undefined') type = 'success';
    if (notificationTimeout !== null) clearTimeout(notificationTimeout);
    
    const existingNotification = document.querySelector('.notification');
    if (existingNotification !== null) existingNotification.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = '<span class="notification-icon"></span><span class="notification-message">' + message + '</span>';
    document.body.appendChild(notification);
    
    setTimeout(function() { notification.classList.add('show'); }, 10);
    
    notificationTimeout = setTimeout(function() {
        notification.classList.remove('show');
        setTimeout(function() {
            if (notification.parentElement !== null) notification.remove();
        }, 300);
    }, NOTIFICATION_DURATION);
}

// ===== CARD HOVER EFFECTS =====

/**
 * Initialize card hover effects
 * Demonstrates: Array iteration, Event Handling, DOM Manipulation
 */
function initCardEffects() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== TYPEWRITER EFFECT =====

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== PARALLAX EFFECT =====

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== SEARCH FUNCTIONALITY =====

function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function animateCounter(element, target, duration) {
    if (typeof duration === 'undefined') duration = 2000;
    
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target.toString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toString();
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    updateActiveNav();
    initStickyNav();
    initMobileMenu();
    initScrollAnimations();
    initLoadingScreen();
    initScrollToTop();
    initModals();
    initCardEffects();
    document.body.classList.add('loaded');
    console.log('Event Sphere initialized!');
});

window.EventSphere = {
    openModal: openModal,
    showNotification: showNotification,
    validateEmail: validateEmail,
    validatePhone: validatePhone,
    validateRequired: validateRequired,
    animateCounter: animateCounter
};

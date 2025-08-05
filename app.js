// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const skillBars = document.querySelectorAll('.skill__progress');
const skillsSection = document.querySelector('#skills');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for ALL links (navigation + hero buttons)
function initializeSmoothScrolling() {
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// Enhanced Active Navigation Link Highlighting
function highlightActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Remove active class from all links first
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Find which section is currently in view
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop - 50 && 
            scrollPosition < sectionTop + sectionHeight - 50) {
            currentSection = sectionId;
        }
    });
    
    // Add active class to the corresponding navigation link
    if (currentSection) {
        const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Update on scroll
window.addEventListener('scroll', highlightActiveNavLink);

// Update on page load
document.addEventListener('DOMContentLoaded', highlightActiveNavLink);

// Fix for clicks
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});


// Header Background on Scroll
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
}

// Animate Skill Bars
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special handling for skills section
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
        }
    });
}, observerOptions);

// Observe sections for animations
sections.forEach(section => {
    animateOnScroll.observe(section);
});

// Observe skill categories for staggered animation
const skillCategories = document.querySelectorAll('.skills__category');
skillCategories.forEach((category, index) => {
    const staggeredObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'all 0.6s ease-out';
    staggeredObserver.observe(category);
});

// Animate project cards
const projectCards = document.querySelectorAll('.project__card');
projectCards.forEach((card, index) => {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, observerOptions);
    
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.8s ease-out';
    cardObserver.observe(card);
});

// Animate certification cards
const certificationCards = document.querySelectorAll('.certification__card');
certificationCards.forEach((card, index) => {
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'all 0.6s ease-out';
    certObserver.observe(card);
});

// Animate contact items
const contactItems = document.querySelectorAll('.contact__item');
contactItems.forEach((item, index) => {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease-out';
    contactObserver.observe(item);
});

// Typing Animation for Hero Section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero__subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1500);
    }
});

// Parallax Effect for Hero Section
function handleParallax() {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero__visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--cyber-primary), var(--cyber-secondary));
        color: var(--cyber-dark);
        border: none;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
}

// Add glitch effect to name on hover
function addGlitchEffect() {
    const heroName = document.querySelector('.hero__name');
    if (heroName) {
        heroName.addEventListener('mouseenter', () => {
            heroName.style.animation = 'glitch 0.5s ease-in-out';
        });
        
        heroName.addEventListener('animationend', () => {
            heroName.style.animation = '';
        });
    }
}

// Add CSS for glitch animation
function addGlitchCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translateX(0); }
            20% { transform: translateX(-2px) translateY(2px); }
            40% { transform: translateX(-2px) translateY(-2px); }
            60% { transform: translateX(2px) translateY(2px); }
            80% { transform: translateX(2px) translateY(-2px); }
            100% { transform: translateX(0); }
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
        }
    `;
    document.head.appendChild(style);
}

// Text reveal animation for section titles
function addTextRevealAnimation() {
    const sectionTitles = document.querySelectorAll('.section__title');
    
    sectionTitles.forEach(title => {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'all 0.8s ease-out';
        titleObserver.observe(title);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and interactions
    addGlitchCSS();
    addGlitchEffect();
    createScrollToTopButton();
    addTextRevealAnimation();
    
    // Initialize smooth scrolling for ALL links
    initializeSmoothScrolling();
    
    // Add event listeners
    window.addEventListener('scroll', () => {
        highlightActiveNavLink();
        handleHeaderScroll();
        handleParallax();
    });
    
    // Initial calls
    highlightActiveNavLink();
    handleHeaderScroll();
});

// Preloader (optional)
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader__content">
            <div class="preloader__logo">IA</div>
            <div class="preloader__text">Loading...</div>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--cyber-dark);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const preloaderContent = preloader.querySelector('.preloader__content');
    preloaderContent.style.cssText = `
        text-align: center;
        color: var(--cyber-text);
    `;
    
    const preloaderLogo = preloader.querySelector('.preloader__logo');
    preloaderLogo.style.cssText = `
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--cyber-primary), var(--cyber-secondary));
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 24px;
        color: var(--cyber-dark);
        margin: 0 auto 20px;
        animation: pulse 2s infinite ease-in-out;
    `;
    
    const preloaderText = preloader.querySelector('.preloader__text');
    preloaderText.style.cssText = `
        font-size: 18px;
        font-weight: 500;
        color: var(--cyber-primary);
    `;
    
    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(pulseStyle);
    
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
showPreloader();

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    highlightActiveNavLink();
    handleHeaderScroll();
    handleParallax();
}, 10));

// Console welcome message
console.log(`
🔐 Welcome to Idrees Ali's Cybersecurity Portfolio
----------------------------------------------------
🛡️  SOC Analyst | Penetration Tester | DFIR Specialist
📧  Contact: idreesali102@gmail.com
🌐  LinkedIn: https://www.linkedin.com/in/idrees-ali-b2b6932a3/
----------------------------------------------------
Built with ❤️ and cybersecurity expertise
`);

// Error handling for development
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added later for offline functionality
        console.log('Service Worker support detected');
    });
}
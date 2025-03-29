// Pre-load cursor initialization before DOM is fully loaded
// This helps it appear faster
if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor-preload';
    cursor.className = 'fixed pointer-events-none z-50 opacity-0 transition-opacity duration-300';
    cursor.style.cssText = 'top:50%;left:50%;transform:translate(-50%,-50%);position:fixed;';
    document.body.appendChild(cursor);
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    initializeSpiderBotCursor(cursor, isDarkMode);
}

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    setupThemeToggle();
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Initialize custom cursor immediately at high priority
    setupCustomCursor();
    
    // Initialize the hero spider bot greeting next
    setupHeroSpiderGreeting();
    
    // Start all other initializations after a brief delay
    // to prioritize visual elements loading first
    setTimeout(() => {
        // Header scroll effect
        setupHeaderScroll();
        
        // Initialize portfolio filter
        setupPortfolioFilter();
        
        // Initialize testimonial carousel - using global function from testimonial-carousel.js
        if (typeof setupTestimonialCarousel === 'function') {
            setupTestimonialCarousel();
        }
        
        // Initialize counter animation
        setupCounterAnimation();
        
        // Initialize typewriter effect
        setupTypewriter();
        
        // Setup contact form ajax submission
        setupContactForm();
        
        // Initialize particles.js if available
        if (typeof particlesJS !== 'undefined') {
            initParticles();
        }
        
        // Initialize AOS animations
        AOS.init({
            duration: 800,
            once: false,
            mirror: true
        });
    }, 100);
});

// Theme Toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check user preference or system preference
        if (localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Toggle theme on click
        themeToggle.addEventListener('click', function() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Custom Cursor
function setupCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    
    if (cursor) {
        // Only show custom cursor on desktop
        if (window.innerWidth > 1024) {
            // Initialize state variables
            let position = { x: 0, y: 0 };
            let isHovering = false;
            let isClicking = false;
            let isDarkMode = document.documentElement.classList.contains('dark');
            let hasTarget = false;
            let targetPosition = { x: 0, y: 0 };
            
            // Create and append spider bot cursor HTML
            initializeSpiderBotCursor(cursor, isDarkMode);

            // Update cursor position on mouse move
            document.addEventListener('mousemove', function(e) {
                position = { x: e.clientX, y: e.clientY };
                updateCursorDOM(cursor, position, isHovering, isClicking, isDarkMode, hasTarget, targetPosition);
                
                // Show cursor
                if (cursor.style.opacity === '0') {
                    cursor.style.opacity = '1';
                }
            });
            
            // Check for dark mode changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        isDarkMode = document.documentElement.classList.contains('dark');
                        updateCursorDOM(cursor, position, isHovering, isClicking, isDarkMode, hasTarget, targetPosition);
                    }
                });
            });
            
            // Start observing the document for class changes
            observer.observe(document.documentElement, { attributes: true });
            
            // Hide cursor when it leaves the window
            document.addEventListener('mouseout', function(e) {
                if (e.relatedTarget === null) {
                    cursor.style.opacity = '0';
                }
            });
            
            // Mouse over interactive elements
            document.addEventListener('mouseover', function(e) {
                const target = e.target;
                const isInteractiveElement = 
                    target.tagName.toLowerCase() === 'a' || 
                    target.tagName.toLowerCase() === 'button' || 
                    target.tagName.toLowerCase() === 'input' || 
                    target.tagName.toLowerCase() === 'textarea' || 
                    target.tagName.toLowerCase() === 'select';
                
                const hasInteractiveParent = 
                    !!target.closest('.portfolio-item') || 
                    !!target.closest('.interactive');
                    
                isHovering = isInteractiveElement || hasInteractiveParent;
                
                // Set target for "scanning" animation
                if (isHovering) {
                    if (isInteractiveElement) {
                        const rect = target.getBoundingClientRect();
                        targetPosition = {
                            x: rect.left + rect.width / 2,
                            y: rect.top + rect.height / 2
                        };
                        hasTarget = true;
                    } else if (hasInteractiveParent) {
                        const portfolioItem = target.closest('.portfolio-item');
                        const interactiveItem = target.closest('.interactive');
                        
                        if (portfolioItem) {
                            const rect = portfolioItem.getBoundingClientRect();
                            targetPosition = {
                                x: rect.left + rect.width / 2,
                                y: rect.top + rect.height / 2
                            };
                            hasTarget = true;
                        } else if (interactiveItem) {
                            const rect = interactiveItem.getBoundingClientRect();
                            targetPosition = {
                                x: rect.left + rect.width / 2,
                                y: rect.top + rect.height / 2
                            };
                            hasTarget = true;
                        } else {
                            hasTarget = false;
                        }
                    } else {
                        hasTarget = false;
                    }
                } else {
                    hasTarget = false;
                }
                
                updateCursorDOM(cursor, position, isHovering, isClicking, isDarkMode, hasTarget, targetPosition);
            });
            
            document.addEventListener('mousedown', function() {
                isClicking = true;
                updateCursorDOM(cursor, position, isHovering, isClicking, isDarkMode, hasTarget, targetPosition);
            });
            
            document.addEventListener('mouseup', function() {
                isClicking = false;
                updateCursorDOM(cursor, position, isHovering, isClicking, isDarkMode, hasTarget, targetPosition);
            });
            
            // Check for window resize to disable on mobile
            window.addEventListener('resize', function() {
                if (window.innerWidth <= 1024) {
                    cursor.style.opacity = '0';
                    // Clean up by removing all child elements
                    cursor.innerHTML = '';
                } else {
                    // Re-initialize if switching back to desktop
                    initializeSpiderBotCursor(cursor, isDarkMode);
                }
            });
        }
    }
}

// Helper function to initialize the simplified bot cursor HTML
function initializeSpiderBotCursor(cursor, isDarkMode) {
    cursor.innerHTML = `
        <div class="custom-cursor-container" style="width: 50px; height: 50px; transform: translate(-50%, -50%) scale(1); transition: transform 0.2s ease-out;">
            <!-- Bot SVG -->
            <svg viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 0 3px rgba(79, 209, 197, 0.5))">
                <!-- Web Grid Background when hovering -->
                <g class="web-grid" style="opacity: 0.4; transition: opacity 0.3s ease;">
                  <circle cx="12" cy="12" r="10" stroke="#4FD1C5" stroke-width="0.2" fill="none" />
                  <circle cx="12" cy="12" r="8" stroke="#4FD1C5" stroke-width="0.2" fill="none" />
                  <line x1="2" y1="12" x2="22" y2="12" stroke="#4FD1C5" stroke-width="0.2" />
                  <line x1="12" y1="2" x2="12" y2="22" stroke="#4FD1C5" stroke-width="0.2" />
                  <line x1="4" y1="4" x2="20" y2="20" stroke="#4FD1C5" stroke-width="0.2" />
                  <line x1="20" y1="4" x2="4" y2="20" stroke="#4FD1C5" stroke-width="0.2" />
                </g>
                
                <!-- Bot Body - Always teal-colored circle -->
                <circle cx="12" cy="12" r="6" fill="#4FD1C5" 
                        style="transition: fill 0.3s ease, opacity 0.2s ease; filter: drop-shadow(0 0 2px rgba(79, 209, 197, 0.5));">
                </circle>
                
                <!-- Bot Face/Eyes - Always white for contrast -->
                <circle cx="10" cy="10" r="1.2" fill="white" class="bot-eye"
                        style="animation: pulseScale 1.5s infinite;"></circle>
                <circle cx="14" cy="10" r="1.2" fill="white" class="bot-eye"
                        style="animation: pulseScale 1.5s infinite 0.2s;"></circle>
                
                <!-- Bot Antenna - Always white -->
                <path d="M10,7 Q12,4 14,7" stroke="white" 
                      stroke-width="0.8" fill="none" 
                      style="animation: antennaWiggle 3s ease-in-out infinite;"></path>
                
                <!-- Bot Legs - All with consistent white color -->
                <path d="M6,10 Q4,8 2,9" stroke="white" 
                      stroke-width="0.8" fill="none"
                      style="animation: legWiggle 2s ease-in-out infinite;"></path>
                <path d="M6,12 Q3,12 1,13" stroke="white" 
                      stroke-width="0.8" fill="none"
                      style="animation: legWiggle 2s ease-in-out infinite; animation-delay: 0.3s;"></path>
                <path d="M6,14 Q4,16 2,17" stroke="white" 
                      stroke-width="0.8" fill="none"
                      style="animation: legWiggle 2s ease-in-out infinite; animation-delay: 0.6s;"></path>
                
                <!-- Bot Legs - Right side -->
                <path d="M18,10 Q20,8 22,9" stroke="white" 
                      stroke-width="0.8" fill="none"
                      style="animation: legWiggle 2s ease-in-out infinite; animation-delay: 0.2s;"></path>
                <path d="M18,12 Q21,12 23,13" stroke="white" 
                      stroke-width="0.8" fill="none"
                      style="animation: legWiggle 2s ease-in-out infinite; animation-delay: 0.5s;"></path>
                <path d="M18,14 Q20,16 22,17" stroke="white" 
                      stroke-width="0.8" fill="none"
                      style="animation: legWiggle 2s ease-in-out infinite; animation-delay: 0.8s;"></path>
            </svg>
            
            <!-- Greeting Message -->
            <div class="cursor-greeting" style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); opacity: 0; transition: opacity 0.5s ease; color: #4FD1C5; font-weight: bold; text-shadow: 0 0 2px rgba(0,0,0,0.5); white-space: nowrap; font-size: 14px;">
                Hi there!
            </div>
        </div>
    `;
    
    // Show greeting occasionally
    setTimeout(() => {
        showCursorGreeting(cursor);
    }, 3000);
}

// Function to show random greeting in the cursor
function showCursorGreeting(cursor) {
    const greetings = [
        "Hi there!",
        "Hello!",
        "Welcome!",
        "Greetings!",
        "Hey!",
        "Need data?",
        "Let's scrape!",
        "Web bot ready!"
    ];
    
    const greetingElement = cursor.querySelector('.cursor-greeting');
    if (greetingElement) {
        // Select random greeting
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        greetingElement.textContent = greeting;
        
        // Show greeting
        greetingElement.style.opacity = '1';
        
        // Hide after 2 seconds
        setTimeout(() => {
            greetingElement.style.opacity = '0';
            
            // Schedule next greeting (5-30 seconds later)
            const nextDelay = 5000 + Math.random() * 25000;
            setTimeout(() => {
                showCursorGreeting(cursor);
            }, nextDelay);
        }, 2000);
    }
}

// Helper function to update cursor DOM based on state
function updateCursorDOM(cursorElement, position, isHovering, isClicking, isDarkMode, hasTarget, targetPosition) {
    // Set cursor position
    cursorElement.style.left = `${position.x}px`;
    cursorElement.style.top = `${position.y}px`;
    
    // Get main container element
    const container = cursorElement.querySelector('.custom-cursor-container');
    if (!container) return;

    // Update container transform based on hovering state
    container.style.transform = `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`;
    
    // Get SVG element
    const svg = cursorElement.querySelector('svg');
    if (!svg) return;
    
    // Update SVG filter based on hover state - consistent glow in both modes
    svg.style.filter = `drop-shadow(0 0 3px ${isHovering ? 'rgba(79, 209, 197, 0.8)' : 'rgba(79, 209, 197, 0.5)'})`;
    
    // Only update opacity for clicking state - colors stay consistent
    const bodyCircle = svg.querySelector('circle[cx="12"][cy="12"]');
    if (bodyCircle) {
        bodyCircle.style.opacity = isClicking ? 0.7 : 1;
    }
    
    // Add animation to eyes on hover
    const eyes = svg.querySelectorAll('circle[cx="10"][cy="10"], circle[cx="14"][cy="10"]');
    eyes.forEach(eye => {
        eye.style.animation = isHovering ? 'pulseScale 1.5s infinite' : '';
    });
    
    // Add click indicator if clicking
    if (isClicking) {
        // Remove existing click indicators
        const existingIndicators = svg.querySelectorAll('.click-indicator');
        existingIndicators.forEach(ind => ind.remove());
        
        // Create new circle for click indicator
        const clickCircle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        clickCircle1.setAttribute('cx', '12');
        clickCircle1.setAttribute('cy', '15');
        clickCircle1.setAttribute('r', '1.5');
        clickCircle1.setAttribute('fill', '#4FD1C5');
        clickCircle1.classList.add('click-indicator');
        clickCircle1.style.animation = 'pulseOut 0.5s ease-out';
        
        const clickCircle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        clickCircle2.setAttribute('cx', '12');
        clickCircle2.setAttribute('cy', '12');
        clickCircle2.setAttribute('r', '8');
        clickCircle2.setAttribute('stroke', '#4FD1C5');
        clickCircle2.setAttribute('stroke-width', '0.5');
        clickCircle2.setAttribute('fill', 'none');
        clickCircle2.classList.add('click-indicator');
        clickCircle2.style.animation = 'pulseOut 0.8s ease-out';
        
        svg.appendChild(clickCircle1);
        svg.appendChild(clickCircle2);
    }
    
    // Clean up existing extras
    const existingExtras = document.querySelectorAll('.cursor-extra');
    existingExtras.forEach(el => el.remove());
    
    // Add scanning effect when hovering
    if (isHovering) {
        const scanningEffect = document.createElement('div');
        scanningEffect.classList.add('cursor-extra', 'fixed', 'pointer-events-none', 'z-[48]');
        scanningEffect.style.cssText = `
            left: ${position.x}px;
            top: ${position.y}px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 1px dashed rgba(79, 209, 197, 0.4);
            transform: translate(-50%, -50%);
            animation: scanPulse 2s infinite linear;
        `;
        document.body.appendChild(scanningEffect);
        
        // Add data particles
        const particleCount = isHovering ? 5 : 2;
        for (let i = 0; i < particleCount; i++) {
            const angle = (i * Math.PI * 2) / particleCount;
            const distance = isHovering ? 20 : 12;
            
            const particle = document.createElement('div');
            particle.classList.add('cursor-extra', 'fixed', 'rounded-full', 'pointer-events-none', 'z-[49]');
            particle.style.cssText = `
                left: ${position.x + Math.cos(angle) * distance}px;
                top: ${position.y + Math.sin(angle) * distance}px;
                width: 4px;
                height: 4px;
                background: #4FD1C5;
                opacity: 0.7;
                animation: pulseScale 1.5s infinite ${i * 0.2}s${isHovering ? ', spinAround 4s infinite linear' : ''};
                transform-origin: ${-Math.cos(angle) * distance}px ${-Math.sin(angle) * distance}px;
            `;
            document.body.appendChild(particle);
        }
        
        // Add network nodes
        for (let i = 0; i < 3; i++) {
            const theta = Math.random() * Math.PI * 2;
            const radius = 30 + Math.random() * 20;
            
            const node = document.createElement('div');
            node.classList.add('cursor-extra', 'fixed', 'rounded-full', 'pointer-events-none', 'z-[48]');
            node.style.cssText = `
                left: ${position.x + Math.cos(theta) * radius}px;
                top: ${position.y + Math.sin(theta) * radius}px;
                width: 6px;
                height: 6px;
                background: rgba(79, 209, 197, 0.3);
                box-shadow: 0 0 4px rgba(79, 209, 197, 0.6);
                opacity: 0.7;
            `;
            document.body.appendChild(node);
        }
    }
    
    // Target connection line
    if (hasTarget) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('cursor-extra', 'fixed', 'pointer-events-none', 'z-[47]');
        svg.style.cssText = `
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            position: fixed;
        `;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', position.x);
        line.setAttribute('y1', position.y);
        line.setAttribute('x2', targetPosition.x);
        line.setAttribute('y2', targetPosition.y);
        line.setAttribute('stroke', '#4FD1C5');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '4,4');
        line.style.animation = 'dataFlow 2s linear infinite';
        line.style.opacity = '0.4';
        
        svg.appendChild(line);
        document.body.appendChild(svg);
    }
}

// Header Scroll Effect
function setupHeaderScroll() {
    const header = document.getElementById('header');
    
    if (header) {
        // Initial check on page load
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
            header.classList.add('py-2');
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('header-scrolled');
            header.classList.remove('py-2');
            header.classList.remove('shadow-md');
            header.classList.add('py-4');
        }
        
        // Check on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.classList.add('header-scrolled');
                header.classList.add('py-2');
                header.classList.add('shadow-md');
                header.classList.remove('py-4');
            } else {
                header.classList.remove('header-scrolled');
                header.classList.remove('py-2');
                header.classList.remove('shadow-md');
                header.classList.add('py-4');
            }
            
            // Update active section in navigation
            updateActiveSection();
        });
    }
}

// Update active section in navigation
function updateActiveSection() {
    const sections = ['hero', 'services', 'portfolio', 'process', 'datasets', 'testimonials', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            // Consider a section in view when it's top is within 100px of the viewport top
            if (rect.top <= 100 && rect.bottom >= 100) {
                // Update desktop nav
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${section}`) {
                        link.classList.add('text-primary-500');
                    } else {
                        link.classList.remove('text-primary-500');
                    }
                });
                
                // Update mobile nav
                mobileNavLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${section}`) {
                        link.classList.add('bg-secondary-100');
                        link.classList.add('dark:bg-secondary-800');
                        link.classList.add('text-primary-500');
                    } else {
                        link.classList.remove('bg-secondary-100');
                        link.classList.remove('dark:bg-secondary-800');
                        link.classList.remove('text-primary-500');
                    }
                });
                
                break;
            }
        }
    }
}

// Portfolio Filter
function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length && portfolioItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Counter Animation
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length) {
        const speed = 200; // The lower the slower
        
        const animateCounter = (counter, target) => {
            const count = +counter.innerText;
            const increment = Math.ceil(target / speed);
            
            if (count < target) {
                counter.innerText = Math.min(count + increment, target);
                setTimeout(() => animateCounter(counter, target), 20);
            } else {
                counter.innerText = target;
            }
        };
        
        // Start animation when elements are in viewport
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    
                    animateCounter(counter, target);
                    
                    // Only animate once
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// Typewriter Effect
function setupTypewriter() {
    const typewriterText = document.getElementById('typewriter-text');
    
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = '';
        
        let i = 0;
        const typeSpeed = 50; // milliseconds
        
        function typeWriter() {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Start typing when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(typewriterText);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(typewriterText);
    }
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send AJAX request
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    showFormMessage('success', data.message);
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    showFormMessage('error', data.message || 'Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFormMessage('error', 'An unexpected error occurred. Please try again.');
            });
        });
    }
}

// Show form message
function showFormMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('flash-message', 'fixed', 'bottom-4', 'right-4', 'z-50', 'bg-white', 'dark:bg-secondary-800', 'p-4', 'rounded', 'shadow-lg');
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const color = type === 'success' ? 'text-green-500' : 'text-red-500';
    
    messageDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icon} ${color} mr-3"></i>
            <p class="text-secondary-700 dark:text-secondary-200">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-auto">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Initialize particles.js
// Setup Hero Spider Greeting with random text
function setupHeroSpiderGreeting() {
    const greetings = [
        "Hi!",
        "Hello!",
        "Welcome!",
        "Hey there!",
        "Data needed?",
        "Scraping ready!",
        "Web bot active!",
        "Need help?",
        "Crawling web!"
    ];
    
    const spiderBot = document.querySelector('.spider-bot');
    const speechBubble = document.querySelector('.spider-bot .speech-bubble');
    const greetingText = document.querySelector('.spider-bot .greeting-text');
    
    if (speechBubble && greetingText && spiderBot) {
        let isInteracting = false;
        
        // Function to display a random greeting
        const showRandomGreeting = () => {
            const greeting = greetings[Math.floor(Math.random() * greetings.length)];
            
            // Fade out first
            speechBubble.style.opacity = '0';
            
            // After fade out, change text and fade in
            setTimeout(() => {
                greetingText.textContent = greeting;
                speechBubble.style.opacity = '1';
                
                // Hide after a delay if not interacting
                if (!isInteracting) {
                    setTimeout(() => {
                        speechBubble.style.opacity = '0';
                    }, 3000);
                }
            }, 500);
        };
        
        // Show the initial greeting with a short delay
        setTimeout(showRandomGreeting, 1000);
        
        // Add interaction events for both desktop and mobile
        
        // Mouse events for desktop
        spiderBot.addEventListener('mouseenter', () => {
            isInteracting = true;
            showRandomGreeting();
        });
        
        spiderBot.addEventListener('mouseleave', () => {
            isInteracting = false;
            setTimeout(() => {
                speechBubble.style.opacity = '0';
            }, 1000);
        });
        
        // Touch events for mobile
        spiderBot.addEventListener('touchstart', () => {
            isInteracting = true;
            showRandomGreeting();
        });
        
        // Click events for both
        spiderBot.addEventListener('click', showRandomGreeting);
        
        // Periodic greeting changes when not interacting
        setInterval(() => {
            if (!isInteracting) {
                showRandomGreeting();
            }
        }, 8000);
    }
}

function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#14b8a6'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#14b8a6',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}
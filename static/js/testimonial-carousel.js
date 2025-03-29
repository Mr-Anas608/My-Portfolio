/**
 * Enhanced Testimonial Carousel with 3D and Perspective Effects
 * This script handles the testimonial carousel with smooth transitions and 3D card effects
 */

function setupTestimonialCarousel() {
    const container = document.querySelector('.testimonial-carousel-container');
    if (!container) return;

    const track = container.querySelector('.testimonial-track');
    const slides = Array.from(container.querySelectorAll('.testimonial-slide'));
    const dots = Array.from(container.querySelectorAll('.testimonial-dot'));
    const prevButton = container.querySelector('.testimonial-prev');
    const nextButton = container.querySelector('.testimonial-next');

    if (!track || slides.length === 0) return;

    // Set initial width based on container
    let slideWidth;
    let currentIndex = 0;
    let autoplayInterval;
    const totalSlides = slides.length;

    // Touch support variables
    let startX = 0;
    let isDragging = false;
    let dragStartPos = 0;
    let currentTranslate = 0;

    // Initialize the carousel
    function initCarousel() {
        // Calculate the width each slide should be
        recalculateWidths();

        // Set initial positions and classes
        updateCarousel();
        
        // Start autoplay
        startAutoplay();

        // Add event listeners
        if (prevButton) prevButton.addEventListener('click', goToPrev);
        if (nextButton) nextButton.addEventListener('click', goToNext);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Touch/mouse events for swipe
        track.addEventListener('mousedown', startDrag);
        track.addEventListener('touchstart', startDrag, { passive: true });
        
        track.addEventListener('mouseup', endDrag);
        track.addEventListener('touchend', endDrag);
        
        track.addEventListener('mousemove', drag);
        track.addEventListener('touchmove', drag, { passive: true });
        
        track.addEventListener('mouseleave', endDrag);

        // Pause autoplay on hover
        container.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        container.addEventListener('mouseleave', () => {
            startAutoplay();
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            recalculateWidths();
            updateCarousel(false); // Update without animation on resize
        });

        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
    }

    // Recalculate slide widths based on screen size
    function recalculateWidths() {
        const containerWidth = container.clientWidth;
        
        // Make slides responsive based on screen size
        if (window.innerWidth < 768) {
            // On mobile, one slide takes full width
            slideWidth = containerWidth * 0.85;
            slides.forEach(slide => slide.style.width = `${slideWidth}px`);
        } else {
            // On desktop, center slide is larger
            slideWidth = containerWidth * 0.6;
            slides.forEach(slide => slide.style.width = `${slideWidth}px`);
        }
    }

    // Handle keyboard navigation
    function handleKeyboardNavigation(e) {
        // Only respond if the carousel is in the viewport
        const rect = container.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (!isInViewport) return;

        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    }

    // Start autoplay functionality
    function startAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            goToNext();
        }, 5000); // Change slide every 5 seconds
    }

    // Go to the previous slide
    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Go to the next slide
    function goToNext() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    // Go to a specific slide
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentIndex = index;
            updateCarousel();
        }
    }

    // Update the carousel position and classes
    function updateCarousel(animate = true) {
        // Calculate the position
        const position = -currentIndex * slideWidth;
        
        // Add or remove transition based on animate parameter
        if (animate) {
            track.style.transition = 'transform 0.5s ease-out';
        } else {
            track.style.transition = 'none';
        }

        // Update transform position
        currentTranslate = position;
        track.style.transform = `translateX(${position}px)`;

        // Update active classes for slides
        slides.forEach((slide, index) => {
            // Remove all classes first
            slide.classList.remove('active', 'prev', 'next');
            
            // Add the appropriate class
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
                slide.classList.add('prev');
            } else if (index === (currentIndex + 1) % totalSlides) {
                slide.classList.add('next');
            }
        });

        // Update dot navigation
        dots.forEach((dot, index) => {
            // Remove active class from all dots
            dot.classList.remove('active', 'bg-primary-500', 'dark:bg-primary-500');
            
            // Hide all pulse effects
            const pulseElement = dot.querySelector('span');
            if (pulseElement) pulseElement.classList.add('hidden');
            
            // If this is the active dot
            if (index === currentIndex) {
                dot.classList.add('active', 'bg-primary-500', 'dark:bg-primary-500');
                // Show pulse effect on active dot
                if (pulseElement) pulseElement.classList.remove('hidden');
            }
        });
    }

    // Touch/Mouse event handlers
    function startDrag(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        dragStartPos = currentTranslate;
        
        // Pause the transition during drag
        track.style.transition = 'none';
        
        // Prevent default only for mouse events to avoid stopping scroll on touch devices
        if (e.type.includes('mouse')) {
            e.preventDefault();
        }
    }

    function drag(e) {
        if (!isDragging) return;
        
        const currentPosition = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const diff = currentPosition - startX;
        
        // Update transform with the drag distance
        track.style.transform = `translateX(${dragStartPos + diff}px)`;
    }

    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        
        // Calculate how far we dragged
        const currentPosition = e.type.includes('mouse') ? e.clientX : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : startX);
        const diff = currentPosition - startX;
        
        // Determine if we should navigate to the next/prev slide based on drag distance
        if (Math.abs(diff) > slideWidth * 0.2) {
            if (diff > 0) {
                goToPrev();
            } else {
                goToNext();
            }
        } else {
            // If the drag wasn't far enough, snap back
            track.style.transition = 'transform 0.3s ease-out';
            track.style.transform = `translateX(${dragStartPos}px)`;
        }
    }

    // Initialize the carousel
    initCarousel();
}

// Export the setup function if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setupTestimonialCarousel };
}
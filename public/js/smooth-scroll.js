/**
 * RouteMaestro Advanced Momentum Smooth Scrolling
 * Features:
 * - Momentum scrolling with velocity tracking
 * - Automatic scroll continuation after user stops scrolling
 * - Instant stop on user interaction
 * - Cross-browser compatibility
 * - Accessibility support
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        momentum: {
            friction: 0.92,
            minVelocity: 0.1,
            maxVelocity: 50,
            touchMultiplier: 2,
            wheelMultiplier: 1
        },
        easing: {
            duration: 1000,
            function: 'easeInOutCubic'
        }
    };

    // State variables
    let isScrolling = false;
    let momentumActive = false;
    let velocity = 0;
    let lastScrollTime = 0;
    let lastScrollTop = 0;
    let animationFrame = null;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Easing functions
    const easingFunctions = {
        easeInOutCubic: function(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeOutQuart: function(t) {
            return 1 - (--t) * t * t * t;
        },
        easeInOutQuart: function(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        }
    };

    // Utility functions
    function getCurrentScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    function getMaxScrollTop() {
        return Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        ) - window.innerHeight;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    // Momentum scrolling implementation
    function calculateVelocity() {
        const currentTime = Date.now();
        const currentScrollTop = getCurrentScrollTop();
        const timeDelta = currentTime - lastScrollTime;
        
        if (timeDelta > 0) {
            const scrollDelta = currentScrollTop - lastScrollTop;
            velocity = (scrollDelta / timeDelta) * 16; // Normalize to 60fps
            velocity = clamp(velocity, -config.momentum.maxVelocity, config.momentum.maxVelocity);
        }
        
        lastScrollTime = currentTime;
        lastScrollTop = currentScrollTop;
    }

    function applyMomentum() {
        if (Math.abs(velocity) < config.momentum.minVelocity || prefersReducedMotion) {
            momentumActive = false;
            return;
        }

        const currentScrollTop = getCurrentScrollTop();
        const maxScrollTop = getMaxScrollTop();
        const newScrollTop = currentScrollTop + velocity;

        // Boundary checking
        if (newScrollTop <= 0 || newScrollTop >= maxScrollTop) {
            velocity = 0;
            momentumActive = false;
            return;
        }

        // Apply friction
        velocity *= config.momentum.friction;

        // Scroll to new position
        window.scrollTo(0, newScrollTop);

        // Continue momentum if still active
        if (momentumActive) {
            animationFrame = requestAnimationFrame(applyMomentum);
        }
    }

    function startMomentum() {
        if (prefersReducedMotion || Math.abs(velocity) < config.momentum.minVelocity) {
            return;
        }

        momentumActive = true;
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        animationFrame = requestAnimationFrame(applyMomentum);
    }

    function stopMomentum() {
        momentumActive = false;
        velocity = 0;
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    // Event handlers
    let scrollTimeout = null;
    function handleScroll() {
        calculateVelocity();
        isScrolling = true;
        stopMomentum();


        // Clear existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        // Set timeout to start momentum after scrolling stops
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            startMomentum();
        }, 150);
    }

    function handleWheel(e) {
        if (prefersReducedMotion) return;
        
        calculateVelocity();
        
        // Add wheel delta to velocity for more responsive momentum
        const wheelDelta = e.deltaY * -0.01 * config.momentum.wheelMultiplier;
        velocity += wheelDelta;
        velocity = clamp(velocity, -config.momentum.maxVelocity, config.momentum.maxVelocity);
    }

    function handleTouch() {
        stopMomentum();
        isScrolling = true;
    }

    function handleTouchEnd() {
        // Multiply velocity for touch devices for better momentum
        velocity *= config.momentum.touchMultiplier;
        velocity = clamp(velocity, -config.momentum.maxVelocity, config.momentum.maxVelocity);
        
        setTimeout(() => {
            if (!isScrolling) {
                startMomentum();
            }
        }, 100);
    }


    // Smooth scroll to position
    function smoothScrollTo(targetPosition, duration = config.easing.duration, easingFunction = config.easing.function) {
        if (prefersReducedMotion) {
            window.scrollTo(0, targetPosition);
            return;
        }

        const startPosition = getCurrentScrollTop();
        const distance = targetPosition - startPosition;
        const startTime = Date.now();
        const easing = easingFunctions[easingFunction] || easingFunctions.easeInOutCubic;

        function animateScroll() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            const currentPosition = startPosition + (distance * easedProgress);

            window.scrollTo(0, currentPosition);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    // Anchor link smooth scrolling
    function handleAnchorClick(e) {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;

        const href = target.getAttribute('href');
        if (href === '#') return;

        const targetElement = document.querySelector(href);
        if (!targetElement) return;

        e.preventDefault();
        stopMomentum();

        const targetPosition = targetElement.offsetTop - 80; // Account for fixed header
        smoothScrollTo(targetPosition);

        // Update URL without jumping
        if (history.pushState) {
            history.pushState(null, null, href);
        }
    }

    // Initialize
    function init() {
        // Skip initialization if reduced motion is preferred
        if (prefersReducedMotion) {
            console.log('RouteMaestro Smooth Scroll: Reduced motion detected, using browser default scrolling');
            return;
        }

        // Initialize scroll tracking
        lastScrollTime = Date.now();
        lastScrollTop = getCurrentScrollTop();

        // Add event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouch, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Handle anchor links
        document.addEventListener('click', handleAnchorClick);


        // Remove any existing scroll-to-top buttons created by other scripts
        const existingButtons = document.querySelectorAll('.scroll-to-top, [class*="go-to-top"], [class*="back-to-top"], button[class*="scroll"], button[class*="top"]');
        existingButtons.forEach(button => {
            button.remove();
        });

        // Periodic check to remove any scroll-to-top buttons that might appear
        setInterval(() => {
            const buttons = document.querySelectorAll('.scroll-to-top, [class*="go-to-top"], [class*="back-to-top"], button[class*="scroll"], button[class*="top"]');
            buttons.forEach(button => {
                if (button.style.position === 'fixed' || getComputedStyle(button).position === 'fixed') {
                    button.remove();
                }
            });
        }, 1000);

        console.log('RouteMaestro Momentum Smooth Scrolling initialized ✅');
    }

    // Public API
    window.RouteMaestroSmoothScroll = {
        scrollTo: smoothScrollTo,
        stop: stopMomentum,
        config: config
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Custom events
    window.addEventListener('scroll', function() {
        // Dispatch custom scroll events for other scripts
        const customEvent = new CustomEvent('routemaestro:scroll', {
            detail: {
                scrollTop: getCurrentScrollTop(),
                velocity: velocity,
                momentumActive: momentumActive
            }
        });
        window.dispatchEvent(customEvent);
    });

})();

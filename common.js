document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const backToTopButton = document.getElementById('back-to-top');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    // Event Listeners
    if (backToTopButton) {
        backToTopButton.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', toggleBackToTopButton);
    }
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMobileMenu);
    }
    
    // Initially hide the back to top button
    if (backToTopButton) {
        backToTopButton.style.display = 'none';
    }
    
    /**
     * Scroll to the top of the page
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    /**
     * Toggle the back to top button based on scroll position
     */
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }
    
    /**
     * Toggle the mobile menu
     */
    function toggleMobileMenu() {
        mainNav.classList.toggle('show');
    }
    
    /**
     * Check if the device is mobile
     * @returns {boolean} True if the device is mobile
     */
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Initialize mobile menu state
    if (isMobile() && mainNav) {
        mainNav.classList.add('mobile');
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (mainNav) {
            if (isMobile()) {
                mainNav.classList.add('mobile');
            } else {
                mainNav.classList.remove('mobile');
                mainNav.classList.remove('show');
            }
        }
    });
});

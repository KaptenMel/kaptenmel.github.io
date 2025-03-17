// JavaScript for custom cursor, loading screen, dark/light mode toggle, and cookie consent banner
const loadingAnimation = document.getElementById('loading-animation');
const themeToggle = document.getElementById('theme-toggle');
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesButton = document.getElementById('accept-cookies');
const declineCookiesButton = document.getElementById('decline-cookies');

// Hide the loading screen when the page has fully loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingAnimation.style.opacity = '0'; // Fade out the loading screen
        setTimeout(() => {
            loadingAnimation.style.display = 'none'; // Hide the loading screen after fading out
        }, 500); // Wait for the fade-out transition to complete
    }, 1000); // Simulate a 1-second loading delay
});

// Dark/Light Mode Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateThemeIcon(isLightMode);
});

// Update the theme icon
function updateThemeIcon(isLightMode) {
    const icon = themeToggle.querySelector('i');
    if (isLightMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeIcon(true);
}

// Check if the user has already accepted or declined cookies
const cookiesAccepted = localStorage.getItem('cookiesAccepted');

if (cookiesAccepted === null || cookiesAccepted === undefined) {
    // Show the cookie banner if no preference is set
    cookieBanner.style.display = 'flex';
} else {
    // Hide the cookie banner if the user has already made a choice
    cookieBanner.style.display = 'none';
}

// Handle "Accept" button click
acceptCookiesButton.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
});

// Handle "Decline" button click
declineCookiesButton.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false');
    cookieBanner.style.display = 'none';
});

// Custom Cursor Logic
document.addEventListener('mousemove', (e) => {
    // Move the custom cursor to the mouse position
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});

// Add hover effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .link-button');
interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover');
    });
});

// Add click animation for interactive elements
document.addEventListener('mousedown', () => {
    customCursor.classList.add('click');
});

document.addEventListener('mouseup', () => {
    customCursor.classList.remove('click');
});
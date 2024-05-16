// Smooth Scroll Function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Scroll to the top of the target element
        });
    });
});

// Responsive Mobile Menu Toggle
function toggleMobileMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.classList.toggle('is-active');
}

// Theme Switcher (Light/Dark Mode)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme); // Save the theme preference
}

// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
    }
    
    // Optionally, bind the theme toggle to a specific element
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});

// Dynamic Button Effects
document.querySelectorAll('.social-link').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0px 8px 12px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

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

// Function to create a social link element
function createSocialLink(linkData) {
    const link = document.createElement('a');
    link.href = linkData.url;
    link.target = "_blank";
    link.classList.add('social-link');
    link.classList.add(linkData.name.toLowerCase()); // Add class for styling
    link.style.backgroundColor = linkData.bgColor;
    link.textContent = linkData.name;
    return link;
}

// Function to dynamically create and append social links
function createSocialLinks() {
    const socialLinksContainer = document.querySelector('.social-links');
    const existingLinks = socialLinksContainer.querySelectorAll('.social-link');
    
    socialMediaLinks.forEach(linkData => {
        // Check if a button with the same URL already exists
        const exists = Array.from(existingLinks).some(link => link.href === linkData.url);
        if (!exists) {
            const link = createSocialLink(linkData);
            socialLinksContainer.appendChild(link);
        }
    });
}

// Call the function to create and append social links
createSocialLinks();

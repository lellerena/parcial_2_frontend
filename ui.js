// DOM Elements - Navigation
const homeLink = document.getElementById('home-link');
const profileLink = document.getElementById('profile-link');

// Navigation Event Listeners
homeLink.addEventListener('click', handleHomeClick);
profileLink.addEventListener('click', handleProfileClick);

// Extracted click handlers
function handleHomeClick(e) {
    console.log('Home link clicked');
    if (e) e.preventDefault();
    timeline.style.display = 'block';
    profile.style.display = 'none';
    if (typeof window.loadPosts === 'function') {
        loadPosts(); // From posts.js
    }
    updateNavHighlight('home');
}

function handleProfileClick(e) {
    console.log('Profile link clicked');
    if (e) e.preventDefault();
    updateNavHighlight('profile');
    if (typeof window.showUserProfile === 'function') {
        showUserProfile(); // From profile.js
    }
}

// Add visual indication of current page
function updateNavHighlight(currentPage) {
    if (currentPage === 'home') {
        homeLink.classList.add('active-nav');
        profileLink.classList.remove('active-nav');
        document.title = 'Home | X';
    } else if (currentPage === 'profile') {
        profileLink.classList.add('active-nav');
        homeLink.classList.remove('active-nav');
        document.title = 'My Profile | X';
    }
}

// Initialize the active state based on initial page load
function initNavigation() {
    // Default to home page on initial load
    updateNavHighlight('home');
}

// Make functions available globally
window.updateNavHighlight = updateNavHighlight;

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleHomeClick,
        handleProfileClick,
        updateNavHighlight,
        initNavigation
    };
}

console.log('UI script loaded successfully');
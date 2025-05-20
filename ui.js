// ui.js

// Declare DOM elements here, but don't assign yet
let homeLink;
let profileLink;
let timeline = document.getElementById('timeline'); // Assuming timeline and profile exist on load
let profile = document.getElementById('profile');

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
    if (!homeLink || !profileLink) return;

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

// Initialization function to find DOM elements and attach listeners
function initNavigation() {
    homeLink = document.getElementById('home-link');
    profileLink = document.getElementById('profile-link');
    timeline = document.getElementById('timeline');
    profile = document.getElementById('profile');

    if (homeLink) homeLink.addEventListener('click', handleHomeClick);
    if (profileLink) profileLink.addEventListener('click', handleProfileClick);

    // Default to home page on initial load
    updateNavHighlight('home');
}

// Make functions available globally (if needed)
window.updateNavHighlight = updateNavHighlight;

// Export for testing and initialization
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleHomeClick,
        handleProfileClick,
        updateNavHighlight,
        initNavigation
    };
}

console.log('UI script loaded successfully');

// DOM Elements - Navigation
const homeLink = document.getElementById('home-link')
const profileLink = document.getElementById('profile-link')

// Navigation Event Listeners
homeLink.addEventListener('click', (e) => {
    console.log('Home link clicked')
    e.preventDefault()
    timeline.style.display = 'block'
    profile.style.display = 'none'
    loadPosts() // From posts.js
    updateNavHighlight('home') // Add this line to update nav
})

profileLink.addEventListener('click', (e) => {
    console.log('Profile link clicked')
    e.preventDefault()
    updateNavHighlight('profile') // Add this line to update nav
    showUserProfile() // Using the function from profile.js
})

// Add visual indication of current page
function updateNavHighlight(currentPage) {
    if (currentPage === 'home') {
        homeLink.classList.add('active-nav')
        profileLink.classList.remove('active-nav')

        // Update document title
        document.title = 'Home | X'
    } else if (currentPage === 'profile') {
        profileLink.classList.add('active-nav')
        homeLink.classList.remove('active-nav')

        // Update document title
        document.title = 'My Profile | X'
    }
}

// Initialize the active state based on initial page load
function initNavigation() {
    // Default to home page on initial load
    updateNavHighlight('home')
}

// Make functions available globally
window.updateNavHighlight = updateNavHighlight

console.log('UI script loaded successfully')

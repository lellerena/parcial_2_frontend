// DOM Elements - Profile
const profileUsername = document.getElementById('profile-username')
const profileEmail = document.getElementById('profile-email')
const profilePostsContainer = document.getElementById('profile-posts-container')

// Load profile data
function loadProfileData() {
    const currentUser = window.appState.currentUser
    if (currentUser) {
        db.collection('users')
            .doc(currentUser.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const userData = doc.data()
                    profileUsername.textContent =
                        userData.username || currentUser.email.split('@')[0]
                    profileEmail.textContent =
                        userData.email || currentUser.email
                } else {
                    // If user document doesn't exist yet, use info from auth
                    profileUsername.textContent =
                        currentUser.displayName ||
                        currentUser.email.split('@')[0]
                    profileEmail.textContent = currentUser.email
                }
            })
            .catch((error) => {
                console.error('Error loading profile data: ', error)
            })
    }
}

// Switch to profile page and load content
function showUserProfile() {
    // Toggle visibility
    timeline.style.display = 'none'
    profile.style.display = 'block'

    // Load profile data and posts
    loadProfileData()
    loadUserPosts()
}

// Make functions available globally
window.loadProfileData = loadProfileData
window.showUserProfile = showUserProfile

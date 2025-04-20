// DOM Elements - Authentication
const authSection = document.getElementById('auth-section')
const mainSection = document.getElementById('main-section')
const loginForm = document.getElementById('login-form')
const signupForm = document.getElementById('signup-form')
const forgotPasswordForm = document.getElementById('forgot-password-form')
const showSignupLink = document.getElementById('show-signup')
const showLoginLink = document.getElementById('show-login')
const forgotPasswordLink = document.getElementById('forgot-password-link')
const backToLoginLink = document.getElementById('back-to-login')
const loginButton = document.getElementById('login-button')
const signupButton = document.getElementById('signup-button')
const resetButton = document.getElementById('reset-button')
const logoutLink = document.getElementById('logout-link')

// Authentication Event Listeners
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault()
    loginForm.style.display = 'none'
    signupForm.style.display = 'block'
    forgotPasswordForm.style.display = 'none'
})

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault()
    loginForm.style.display = 'block'
    signupForm.style.display = 'none'
    forgotPasswordForm.style.display = 'none'
})

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault()
    loginForm.style.display = 'none'
    signupForm.style.display = 'none'
    forgotPasswordForm.style.display = 'block'
})

backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault()
    loginForm.style.display = 'block'
    signupForm.style.display = 'none'
    forgotPasswordForm.style.display = 'none'
})

// Login functionality
loginButton.addEventListener('click', () => {
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
        alert(`Login Error: ${error.message}`)
    })
})

// Sign up functionality
signupButton.addEventListener('click', () => {
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const username = document.getElementById('signup-username').value

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Add user to Firestore
            return db.collection('users').doc(userCredential.user.uid).set({
                username: username,
                email: email,
                createdAt: new Date()
            })
        })
        .catch((error) => {
            alert(`Sign Up Error: ${error.message}`)
        })
})

// Reset password functionality
resetButton.addEventListener('click', () => {
    const email = document.getElementById('reset-email').value

    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert('Password reset email sent. Check your inbox.')
            loginForm.style.display = 'block'
            forgotPasswordForm.style.display = 'none'
        })
        .catch((error) => {
            alert(`Password Reset Error: ${error.message}`)
        })
})

// Logout functionality
logoutLink.addEventListener('click', (e) => {
    e.preventDefault()
    auth.signOut()
})

// Auth state change listener
auth.onAuthStateChanged((user) => {
    if (user) {
        window.appState.currentUser = user
        authSection.style.display = 'none'
        mainSection.style.display = 'block'
        loadPosts() // From posts.js
    } else {
        window.appState.currentUser = null
        authSection.style.display = 'block'
        mainSection.style.display = 'none'
        loginForm.style.display = 'block'
        signupForm.style.display = 'none'
        forgotPasswordForm.style.display = 'none'
    }
})

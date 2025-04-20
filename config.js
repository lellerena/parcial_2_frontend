// Firebase Configuration

const firebaseConfig = {
    apiKey: 'AIzaSyD33QpNMiP35qx9Hup8brWDdOFY25r_4lM',
    authDomain: 'frontend-parcial-2.firebaseapp.com',
    projectId: 'frontend-parcial-2',
    storageBucket: 'frontend-parcial-2.firebasestorage.app',
    messagingSenderId: '290998256291',
    appId: '1:290998256291:web:612e25ed13f7923452f516',
    measurementId: 'G-J6HWJZC66D'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()

// Global state accessible across modules
window.appState = {
    currentUser: null
}

const timeline = document.getElementById('timeline')
const profile = document.getElementById('profile')

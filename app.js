// app.js

// Import initNavigation from ui.js
const { initNavigation } = require('./ui.js');  // or import if using ES modules

window.addEventListener('DOMContentLoaded', () => {
  initNavigation();  // This will set up the UI event listeners properly
});

console.log('X Twitter Clone Application Started');

// Export for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initNavigation };
}

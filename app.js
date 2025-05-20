// app.js
function initNavigation() {
  // Default to home page on initial load
  if (typeof window.updateNavHighlight === 'function') {
    window.updateNavHighlight('home');
  }
}

window.addEventListener('DOMContentLoaded', initNavigation);
console.log('X Twitter Clone Application Started');

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initNavigation };
}
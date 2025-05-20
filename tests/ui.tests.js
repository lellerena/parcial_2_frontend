// Setup minimal DOM elements before importing ui.js
beforeAll(() => {
  document.body.innerHTML = `
    <a id="home-link" class="link"></a>
    <a id="profile-link" class="link"></a>
    <div id="timeline"></div>
    <div id="profile"></div>
  `;

  // Mock classList methods for elements we test
  const homeLink = document.getElementById('home-link');
  const profileLink = document.getElementById('profile-link');

  homeLink.classList.add = jest.fn();
  homeLink.classList.remove = jest.fn();

  profileLink.classList.add = jest.fn();
  profileLink.classList.remove = jest.fn();
});

// Now import your UI module AFTER DOM is ready
const {
  updateNavHighlight,
  handleHomeClick,
  handleProfileClick,
  initNavigation,  // import this too
} = require('../ui.js');

describe('UI Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.title = '';

    // Initialize DOM refs & event listeners inside ui.js
    initNavigation();
  });

  test('updateNavHighlight sets home as active', () => {
    updateNavHighlight('home');

    expect(document.getElementById('home-link').classList.add).toHaveBeenCalledWith('active-nav');
    expect(document.getElementById('profile-link').classList.remove).toHaveBeenCalled();
    expect(document.title).toBe('Home | X');
  });

  test('updateNavHighlight sets profile as active', () => {
    updateNavHighlight('profile');

    expect(document.getElementById('profile-link').classList.add).toHaveBeenCalledWith('active-nav');
    expect(document.getElementById('home-link').classList.remove).toHaveBeenCalled();
    expect(document.title).toBe('My Profile | X');
  });

  test('handleHomeClick shows timeline and hides profile', () => {
    handleHomeClick({ preventDefault: jest.fn() });

    expect(document.getElementById('timeline').style.display).toBe('block');
    expect(document.getElementById('profile').style.display).toBe('none');
  });
});

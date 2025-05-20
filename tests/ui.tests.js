// tests/ui.test.js
const { updateNavHighlight, handleHomeClick, handleProfileClick } = require('../ui.js');

describe('UI Functions', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    document.title = '';
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
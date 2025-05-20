// tests/setup.js
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Mock Firebase
global.firebase = {
  initializeApp: jest.fn(),
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn()
  })),
  firestore: jest.fn()
};

// Mock appState
global.window.appState = {
  currentUser: null
};

// Mock DOM elements
document.getElementById = jest.fn((id) => {
  const elements = {
    'home-link': { classList: { add: jest.fn(), remove: jest.fn() } },
    'profile-link': { classList: { add: jest.fn(), remove: jest.fn() } },
    'timeline': { style: { display: '' } },
    'profile': { style: { display: '' } }
  };
  return elements[id] || { style: { display: '' } };
});
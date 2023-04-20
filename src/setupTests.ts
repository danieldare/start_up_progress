// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

afterEach(() => {
  jest.clearAllMocks();
});

interface LocalStorage {
  [key: string]: string;
}

const mock = (() => {
  let store: LocalStorage = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string | number) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: mock });

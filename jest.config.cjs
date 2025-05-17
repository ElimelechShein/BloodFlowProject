module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // טרנספילציה של כל קובץ JS/JSX/TS/TSX
  },
  testEnvironment: 'jsdom', // סביבה עבור בדיקות דפדפן
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // התקנת jest-dom עבור בדיקות
};


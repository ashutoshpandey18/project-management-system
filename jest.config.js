module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.test.(js|jsx|ts|tsx)',
  ],
};
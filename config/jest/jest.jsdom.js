module.exports = {
  rootDir: '../../',
  verbose: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  maxWorkers: '50%',
};

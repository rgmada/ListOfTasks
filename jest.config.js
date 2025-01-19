module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '.next/'], 
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', 
  },
  testMatch: ['**/?(*.)+(spec|test).ts'],  
};

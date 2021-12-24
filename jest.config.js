/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/infra/database/helpers/**',
    '!<rootDir>/src/infra/database/migrations/**',
    '!<rootDir>/src/main/**',
    '!**/protocols/**',
  ],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
};
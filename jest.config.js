module.exports = {
  'collectCoverage': true,
  'collectCoverageFrom': [
    '**/*.js',
    '!**/*.test.js',
    '!**/*.config.js'
  ],
  'coverageDirectory': 'test-output',
  'coverageReporters': [
    'text-summary',
    'cobertura',
    'lcov'
  ],
  'coveragePathIgnorePatterns': [
    '<rootDir>/node_modules/',
    '<rootDir>/test-output/',
    '<rootDir>/test/',
    '.*/__mocks__/.*',
    '<rootDir>/server/migrations/',
    '<rootDir>/server/models/',
    '<rootDir>/server/config/',
    '<rootDir>/server/plugins/'
  ],
  'coverageThreshold': {
    'global': {
      'statements': 90
    }
  },
  'modulePathIgnorePatterns': [
    'node_modules'
  ],
  'reporters': [
    'default',
    [
      'jest-junit',
      {
        'suiteName': 'jest tests',
        'outputDirectory': 'test-output',
        'outputName': 'junit.xml'
      }
    ]
  ],
  'resetModules': true,
  'restoreMocks': true,
  'testEnvironment': 'node'
}

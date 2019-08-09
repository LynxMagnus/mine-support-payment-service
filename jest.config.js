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
    '<rootDir>/server/config/'
  ],
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
  'testEnvironment': 'node'
}

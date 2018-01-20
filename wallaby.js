module.exports = (wallaby) => {
  return {
    debug: true,
    testFramework: 'jest',
    files: [
      'helpers/**/*.js',
      'run.js',
      'package.json',
      {pattern: '**/*.spec.js', ignore: true}
    ],
    tests: [
      '**/*.spec.js'
    ],
    env: {type: 'node'}
  }
}

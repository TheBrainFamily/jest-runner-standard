# jest-runner-standard
Standard Style runner for Jest

```
npm install --save-dev jest-runner-standard

```

In your jest.standard-config.js:

```
module.exports = {
  runner: 'jest-runner-standard',
  'testMatch': ['<rootDir>/**/*.js']
}
```

run 

```
jest --projects jest.standard-config.js --watch
```

Profit!

# Examples

https://github.com/TheBrainFamily/TheBrain2.0

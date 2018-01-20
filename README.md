# jest-runner-standard
Standard Style runner for Jest

![Demonstration](http://g.recordit.co/MPksN5pxY8.gif)


# Usage
```
npm install --save-dev jest-runner-standard

```

In your jest.standard-config.js:

```
module.exports = {
  projects: [
    {
      'runner': 'jest-runner-standard',
      'testMatch': ['<rootDir>/**/*.js'],
      'displayName': 'standard linting'
    },
    {
      'displayName': 'test'
    }
  ]
}

```

run 

```
jest --watch
```

Profit!

# Examples

This repo, also:

https://github.com/TheBrainFamily/TheBrain2.0

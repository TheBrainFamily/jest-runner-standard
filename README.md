# jest-runner-standard
Standard Style runner for Jest

![Demonstration](http://g.recordit.co/MPksN5pxY8.gif)

Not only we run them on file changes, alongside with related jest tests, but also we have this beautiful jest-like visualisation of the failure :-)

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

# TODO

- tests (I hope to get quibble work with jest.. so I can use testdoubles https://github.com/testdouble/quibble/issues/23 )
- make the --fix optional
- ?

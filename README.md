# jest-runner-standard
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Standard Style runner for Jest. 

# Motivation

I liked the idea of the jest-runner-eslint, and thought it would be great to have one like that for standard. I also wanted to add a nice error messaging that will give you some context about where in the code you made a mistake.

# Show case
![Demonstration](http://g.recordit.co/MPksN5pxY8.gif)

Not only we run them on file changes, alongside with related jest tests, but also we have this beautiful jest-like visualisation of the failure :-)

# Usage

Make sure you have standard already installed.

```
npm install --save-dev jest-runner-standard
```

In your jest.config.js, assuming you want to run both your tests and linting:

```javascript
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

This repo (if you want to use jest while modyfing the package, do npm link and then npm link jest-runner-standard)

also:

https://github.com/TheBrainFamily/TheBrain2.0

# TODO

- tests (I hope to get quibble work with jest.. so I can use testdoubles https://github.com/testdouble/quibble/issues/23 )
- make the --fix configurable
- ?

# CREDITS

Using internally a fork of https://github.com/rogeliog/create-jest-runner , and was obviously inspired by https://github.com/jest-community/jest-runner-eslint . Huge kudos to the author @rogeliog and contributors :)

exports.isPathIgnored = (opts, standard, testPath) => new standard.eslint.CLIEngine({...opts, ignorePattern: opts.ignore}).isPathIgnored(testPath)

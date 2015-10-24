exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: [
        'e2e/**/*.spec.js'
    ],

    framework: 'jasmine',

    capabilities: {
        'browserName': 'chrome'
    },

    jasmineNodeOpts: {
        showColors: true, // use colors in the command line report
        defaultTimeoutInterval: 30000
    },

    seleniumServerJar: './node_modules/grunt-protractor-runner/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar'
};
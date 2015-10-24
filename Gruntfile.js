module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        release: 'release',
        filename: 'ui-navbar',
        meta: {},

        connect: {
            server: {
                options: {
                    port: 5000,
                    base: 'src'
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        protractor: {
            e2e: {
                options: {
                    args: {
                        specs: ['e2e/**/*.spec.js']
                    },
                    configFile: 'protractor.conf.js',
                    keepAlive: true
                }
            }
        },

        protractor_webdriver: {
            start: {
                options: {
                    path: './node_modules/grunt-protractor-runner/node_modules/protractor/bin/',
                    command: 'webdriver-manager start'
                }
            }
        },

        concat: {
            release: {
                src: [
                    'src/**/*.js',
                    'template/**/*.js',
                    '!**/*.min.js',
                    '!**/*.spec.js'
                ],
                dest: 'release/js/<%= filename %>.js'
            }
        },

        uglify: {
            release: {
                src: ['release/js/<%= filename %>.js'],
                dest: 'release/js/<%= filename %>.min.js'
            }
        },

        cssmin: {
            build: {
                src: 'css/<%=  filename %>.css',
                dest: 'release/css/<%= filename %>.min.css'
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['css/ui-navbar.css'], dest: 'release/', filter: 'isFile'}
                ]
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        html2js: {
            release: {
                options: {
                    module: null, // no bundle for all the templates
                    base: '.'
                },
                files: [{
                    expand: true,
                    src: ['template/**/*.html'],
                    ext: '.html.js'
                }]
            }
        }
    });

    grunt.registerTask('build', ['jshint','html2js','concat','uglify','cssmin', 'copy']);

    grunt.registerTask('e2e', [
        'connect:server',
        'protractor_webdriver:start',
        'protractor:e2e'
    ]);

};
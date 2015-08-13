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

        concat: {
            release: {
                src: [
                    'src/**/*.js',
                    'template/**/*.js'
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

};
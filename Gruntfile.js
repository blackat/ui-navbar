module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dist: 'dist',
        filename: 'ui-navbar',
        meta: {},

        concat: {
            dist: {
                src: [
                    'src/**/*.js',
                    'template/**/*.js'
                ],
                dest: 'dist/js/<%= filename %>.js'
            }
        },

        uglify: {
            dist: {
                src: ['dist/js/<%= filename %>.js'],
                dest: 'dist/js/<%= filename %>.min.js'
            }
        },

        cssmin: {
            build: {
                src: 'css/<%=  filename %>.css',
                dest: 'dist/css/<%= filename %>.min.css'
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['css/ui-navbar.css'], dest: 'dist/', filter: 'isFile'}
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
            dist: {
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
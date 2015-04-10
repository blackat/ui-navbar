module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                files: {
                    'dist/js/navbar-min.js': ['src/navbar.js']
                }
            }
        },

        cssmin: {
            build: {
                src: 'css/navbar.css',
                dest: 'dist/css/navbar.min.css'
            }
        }
    });

    grunt.registerTask('default', ['uglify']);

};
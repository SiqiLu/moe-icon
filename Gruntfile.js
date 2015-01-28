/* !
 * moe UI Gruntfile
 * http://ui.moe.click
 * Copyright 2013-2015 Siqi Lu
 * Licensed under MIT
 */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),

        // Task configuration.
        clean: {
            dist: 'dist',
            npm: 'node_modules'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            grunt: {
                src: 'Gruntfile.js'
            },
            core: {
                src: ['js/*.js', '!js/*.min.js']
            }
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            grunt: {
                src: '<%= jshint.grunt.src %>'
            },
            core: {
                src: '<%= jshint.core.src %>'
            }
        },

        uglify: {
            options: {
                preserveComments: 'all',
                sourceMap: true
            },
            core: {
                src: 'js/moe-icon-ie7.js',
                dest: 'js/moe-icon-ie7.min.js'
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            core: {
                src: 'css/moe-icon.css'
            }
        },

        csscomb: {
            options: {
                config: '.csscomb.json'
            },
            core: {
                expand: true,
                cwd: 'css/',
                src: '*.css',
                dest: 'css/'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '0',
                advanced: true
            },
            core: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'src/css',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            release: {
                expand: true,
                src: ['fonts/**', 'css/moe-*', 'js/moe-*'],
                dest: 'dist/'
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release %VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: '%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin master',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        }
    });

    // This command registers the default task which will install bower packages into wwwroot/lib
    grunt.registerTask('default', ['js', 'css', 'build']);

    grunt.registerTask('js', ['jshint', 'jscs', 'uglify']);
    grunt.registerTask('css', ['csslint', 'csscomb', 'cssmin']);
    grunt.registerTask('build', ['clean:dist', 'copy']);

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });
    require('time-grunt')(grunt);
};

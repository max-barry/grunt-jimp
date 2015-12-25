/*
 * grunt-jimp
 * 
 *
 * Copyright (c) 2015 Max Barry
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    jimp: {
      default_options: {
        options: {
          suffix: 'crop',
          actions: {
            blur: 30,
            scale: 0.5,
            sepia: true,
            crop: [0, 0, 500, 300],
          }
        },
        files: [{
            expand: true,
            cwd: 'test/fixtures/',
            src: ['**/*.{jpg,jpeg,png,bmp}'],
            dest: 'tmp/'
        }]
      },
    },
    bump: {
        options: {
            push: true,
            pushTo: "origin",
            files: [
                "package.json",
            ],
            commitFiles: [
                "package.json",
            ]
        }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jimp', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

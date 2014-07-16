module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      server: {
        options: {
          force: true,
          jshintrc: '.jshintrc-server'
        },
        src: [
          '*.js'
        ]
      },
      test: {
        options: {
          jshintrc: '.jshintrc-server'
        },
        src: [
          'test/*.js'
        ]
      }
    },
    watch: {
      lintServer: {
        options: {
          atBegin: true,
          nospawn: true,
        },
        files: '<%= jshint.server.src %>',
        tasks: 'jshint:server'
      },
      lintTest: {
        options: {
          atBegin: true
        },
        files: '<%= jshint.test %>',
        tasks: 'jshint:test'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};

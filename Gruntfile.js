
  'use strict';

  module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      htmlhint: {
        build: {
          options: {
            'tag-pair': true,
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'doctype-first': true,
            'spec-char-escape': true,
            'id-unique': true,
            'head-script-disabled': true,
            'style-disabled': true
          },
          src: ['app/index.html']
        }
      },
      sass: {
        build: {
          files: {
            'app/styles/main.css': 'app/styles/main.css'
          }
        }
      },

      connect: {
        options: {
          port: 3333,
          base: 'app',
          hostname: 'localhost',
          livereload: 35729
        },
        server: {
          open: true
        }
      },

      watch: {
        configFiles: {
          files: ['Gruntfile.js', 'bower.json', 'package.json'],
          options: {
            reload: true
          }
        },
        html: {
          files: ['app/views/{,*/}*.html'],
          tasks: ['htmlhint']
        },
        bower: {
          files: ['./bower.json'],
          tasks: ['wireDependencies']
        },
        js: {
          files: ['app/scripts/{,*/}*.js'],
          tasks: ['newer:jshint:all']
        },
        livereload: {
          options: { livereload: true },
          files: ['app/**/*']
        },
        sass: {
          files: ['app/styles/{,*/}*.{scss,sass}'],
          tasks: ['sass']
        }
      }

});

grunt.registerTask('serve', ['connect:server', 'watch', 'livereload']);
grunt.registerTask('default', []);
};

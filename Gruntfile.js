module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          hostname: '*',
          port: grunt.option('port') || 9001,
          base: ['<%= buildDir %>/', './'],
          livereload: false
        }
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: true,
        },
        files: [
        '<%= buildDir %>/**',
        '<%= copy.img.src %>',
        '<%= copy.fonts.src %>',
        '<%= copy.js.src %>'
        ]
      }
    }
  });
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-serve');

    grunt.registerTask('serve', [
    'connect',
    'watch'
    ]);




  // Tell Grunt what to do when we type "grunt" into the terminal
  grunt.registerTask('default', [
  'grunt-contrib-livereload',
  'grunt-contrib-watch',
  'grunt-serve'
  ]);
};

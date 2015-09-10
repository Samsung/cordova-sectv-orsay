module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
          jshintrc: '.jshintrc',
      },
      src: ['cordova-js-src/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('jenkins', ['jshint']);
};

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      src: ['cordova-js-src/**/*.js']
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      src: ['cordova-js-src/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('precommit', ['jshint', 'jscs']);
};

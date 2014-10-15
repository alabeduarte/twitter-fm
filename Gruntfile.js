module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
  });

  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', ["test"]);
};
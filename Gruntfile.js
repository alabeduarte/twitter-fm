module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['tests/server/**/*Spec.js'],
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
  });

  grunt.registerTask('test', ['mochaTest', 'karma']);
  grunt.registerTask('default', ["test"]);
};
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
    karma: {
      unit: {
        options: {
          singleRun: true,
          frameworks: ['mocha', 'chai'],
          files: [
            'public/js/vendor/angular/angular.js',
            'public/js/vendor/angular-mocks/angular-mocks.js',
            'public/js/app/app.js',
            'public/js/app/twitterListCtrl.js',
            'tests/client/testHelper.js',
            'tests/client/**/*Spec.js'
          ],
          browsers: ['PhantomJS'],
          colors: true
        }
      }
    },
  });

  grunt.registerTask('test', ['mochaTest', 'karma']);
  grunt.registerTask('default', ["test"]);
};
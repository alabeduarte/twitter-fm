angular.module('twitter-fm', ['socket.io']);

angular.module('socket.io', []).factory('io', function() {
  return window.io;
});
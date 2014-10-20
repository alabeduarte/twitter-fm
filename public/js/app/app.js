angular.module('twitter-fm', ['socket.io', 'audioPlayer']);

angular.module('socket.io', []).factory('io', function() {
  return window.io;
});

angular.module('audioPlayer', []).factory('audioPlayer', function() {
  return new AudioPlayer();
});
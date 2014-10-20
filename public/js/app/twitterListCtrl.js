var app = angular.module('twitter-fm');

app.controller('TwitterListCtlr', ['$scope', 'io', 'audioPlayer', function ($scope, io, audioPlayer) {
  var socket = io.connect(window.location.origin);
  $scope.text = '> waiting for tweets...';

  socket.on('tweet', function (data) {
    $scope.$apply(function () {
      $scope.text = data.text;

      audioPlayer.open('http://localhost:5000/files/1413771049790.mp3');
    });
  });
}]);
var app = angular.module('twitter-fm');

app.controller('TwitterListCtlr', ['$scope', 'io', 'audioPlayer', function ($scope, io, audioPlayer) {
  var socket = io.connect(window.location.origin);
  $scope.text = '> waiting for tweets...';

  socket.on('tweet', function (data) {
    $scope.$apply(function () {
      $scope.text = data.text;
      audioPlayer.open(window.location.origin + '/speech?q=' + data.text);
    });
  });
}]);
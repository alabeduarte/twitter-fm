var app = angular.module('twitter-fm');

app.controller('TwitterListCtlr', ['$scope', 'io', function ($scope, io) {
  var socket = io.connect(window.location.origin);
  $scope.test = '> waiting for tweets...';

  socket.on('tweet', function (data) {
    console.log('tweet received: ', data.text);

    $scope.$apply(function () {
      $scope.test = data.text;
    });
  });
}]);
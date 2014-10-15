var app = angular.module('twitter-fm');

app.controller('TwitterListCtlr', ['$scope', function ($scope) {
  var socket = io();
  $scope.test = '> waiting for tweets...';

  socket.on('tweet', function (data) {
    console.log('tweet received: ', data.text);
    $scope.test = data.text;
  });
}]);
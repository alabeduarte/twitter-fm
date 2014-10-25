var app = angular.module('twitter-fm');

app.controller('TwitterListCtlr', ['$scope', '$sce', 'io', 'tweetToQuery', function ($scope, $sce, io, tweetToQuery) {
  var socket = io.connect(window.location.origin);
  $scope.text = '> waiting for tweets...';

  function textToSpeechUrl (q) {
    var url = 'http://translate.google.com/translate_tts?tl=en-us&q=' + q;
    return $sce.trustAsUrl(url).$$unwrapTrustedValue();
  };

  socket.on('tweet', function (data) {
    $scope.$apply(function () {
      $scope.text = '> ' + data.text;

      var queryString = tweetToQuery.encode(data.text);
      $scope.spokenWordUri = textToSpeechUrl(queryString);
    });
  });
}]);
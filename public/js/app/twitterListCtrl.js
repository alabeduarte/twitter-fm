var app = angular.module('twitter-fm');

app.controller('TwitterListCtlr', ['$scope', '$sce', 'io', 'tweetToQuery', function ($scope, $sce, io, tweetToQuery) {
  var socket = io.connect(window.location.origin);
  $scope.text = '> waiting for tweets...';

  function textToSpeechUrl (q, language) {
    var url = 'http://translate.google.com/translate_tts?tl=' + language + '&q=' + q;
    return $sce.trustAsUrl(url).$$unwrapTrustedValue();
  };

  function process (data, language) {
    $scope.$apply(function () {
      $scope.text = '> ' + data.text;

      var queryString = tweetToQuery.encode(data.text);
      $scope.spokenWordUri = textToSpeechUrl(queryString, language);
    });
  };

  socket.on('tweet-pt', function (data) { process(data, 'pt-br') });
  socket.on('tweet-en', function (data) { process(data, 'en') });
}]);
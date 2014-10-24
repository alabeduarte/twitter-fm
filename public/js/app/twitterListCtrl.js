var app = angular.module('twitter-fm');

app.controller('TwitterListCtlr', ['$scope', '$sce', 'io', function ($scope, $sce, io) {
  var socket = io.connect(window.location.origin);
  $scope.text = '> waiting for tweets...';

  function textToSpeechUrl (q) {
    var url = 'http://translate.google.com/translate_tts?tl=en-us&q=' + q;
    return $sce.trustAsUrl(url).$$unwrapTrustedValue();
  };

  function queryString (tweet) {
    var maxLength = 100;

    var text = tweet.substring(0, maxLength);
    return encodeURIComponent(text);
  }

  socket.on('tweet', function (data) {
    $scope.$apply(function () {
      $scope.text = '> ' + data.text;

      $scope.spokenWordUri = textToSpeechUrl(queryString(data.text));
    });
  });
}]);
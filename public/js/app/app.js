angular.module('twitter-fm', ['socket.io', 'tweetToQuery'])
  .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://*.google.com/**']);
  }]);

angular.module('socket.io', []).factory('io', function() {
  return window.io;
});

angular.module('tweetToQuery', []).factory('tweetToQuery', function() {
  return new TweetToQuery();
});
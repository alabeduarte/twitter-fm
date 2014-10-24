angular.module('twitter-fm', ['socket.io'])
  .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://*.google.com/**']);
  }]);

angular.module('socket.io', []).factory('io', function() {
  return window.io;
});
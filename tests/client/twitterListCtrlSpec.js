describe('TwitterListCtlr', function() {
  var scope;

  describe("when there's any tweet", function() {
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();

      $controller('TwitterListCtlr', {
        $scope: scope,
        io: {
          connect: function (url) {
            return {
              on: function (data) {}
            }
          }
        },
      });
    }));

    it('should begins with waiting message', function() {
      expect(scope.text).to.equal('> waiting for tweets...');
    });
  });

  describe("when some tweet arrived from server", function() {
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();

      $controller('TwitterListCtlr', {
        $scope: scope,
        io: {
          connect: function (url) {
            return {
              on: function (key, callback) { callback({ text: 'hello world' }); }
            }
          }
        },
      });
    }));

    it('should display tweet message', function() {
      expect(scope.text).to.equal('> hello world');
    });
  });

  describe("when some tweet arrived from server", function() {
    var url = 'http://translate.google.com/translate_tts?tl=en&q=';
    var tweet = function (message) {
      return {
        on: function (key, callback) { callback({ text: message }); }
      }
    };

    describe("when tweet is a simple string", function() {
      var tweetEvent = tweet('Hello World');

      beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        $controller('TwitterListCtlr', {
          $scope: scope,
          io: { connect: function (url) { return tweetEvent; } },
        });
      }));

      it("should set spoken word url", function() {
        var encodedURI = url + 'Hello%20World';

        expect(scope.spokenWordUri).to.equal(encodedURI);
      });
    });

    describe("when tweet has hashtag", function() {
      var tweetEvent = tweet('Hello World #fail');

      beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        $controller('TwitterListCtlr', {
          $scope: scope,
          io: { connect: function (url) { return tweetEvent; } },
        });
      }));

      it("should encode spoken word url without hashtag", function() {
        var encodedURI = url + 'Hello%20World%20';

        expect(scope.spokenWordUri).to.equal(encodedURI);
      });
    });

    describe("when tweet has more than 100 characters", function() {
      var tweetEvent;
      var moreThan100Characters;
      var totalLength = 130;

      beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        var text = '';
        for(i=1;i<=totalLength;i++) { text += '*'; };
        moreThan100Characters = text;

        var tweetEvent = tweet(moreThan100Characters);

        scope = $rootScope.$new();

        $controller('TwitterListCtlr', {
          $scope: scope,
          io: { connect: function (url) { return tweetEvent; } },
        });
      }));

      it("should set spoken word url with the only first 99 characters", function() {
        var encodedURI = url + moreThan100Characters.substring(0, 100);

        expect(scope.spokenWordUri).to.equal(encodedURI);
      });

      xit("should set spoken word url with the only remaining characters", function() {
        var encodedURI = url + moreThan100Characters.substring(100, totalLength + 1);

        expect(scope.spokenWordUri).to.equal(encodedURI);
      });
    });

  });

});
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
        audioPlayer: {
          download: function (url, callback) {
            callback();
          },
          open: function (url) {}
        }
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
              on: function (key, callback) { callback({ text: 'hello' }); }
            }
          }
        },
        audioPlayer: {
          download: function (url, callback) {
            callback();
          },
          open: function (url) {}
        }
      });
    }));

    it('should display tweet message', function() {
      expect(scope.text).to.equal('hello');
    });
  });

  describe("when some tweet arrived from server", function() {
    var open = function (url) {};
    var spy = sinon.spy(open);

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
      var audioPlayer = {
        open: spy
      };

      scope = $rootScope.$new();

      $controller('TwitterListCtlr', {
        $scope: scope,
        io: {
          connect: function (url) {
            return {
              on: function (key, callback) { callback({ text: 'Hello World' }); }
            }
          }
        },
        audioPlayer: audioPlayer
      });
    }));

    it("should open tweet's speech mp3", function() {
      expect(spy).to.have.been.calledWith(window.location.origin + '/speech?q=Hello World');
    });
  });

});
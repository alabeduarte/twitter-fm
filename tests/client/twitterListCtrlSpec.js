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
        audioPlayer: { open: function (url) {} }
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
        audioPlayer: { open: function (url) {} }
      });
    }));

    it('should display tweet message', function() {
      expect(scope.text).to.equal('hello');
    });
  });

  describe("when some tweet arrived from server", function() {
    var spy = sinon.spy(function (url) {});

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
      var audioPlayer = {};
      audioPlayer.open = spy;

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
        audioPlayer: audioPlayer
      });
    }));

    it("should play tweet's speech", function() {
      expect(spy).to.have.been.calledWith('http://localhost:5000/files/1413771049790.mp3');
    });
  });

});
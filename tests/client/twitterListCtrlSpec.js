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
        }
      });
    }));

    it('should begins with waiting message', function() {
      expect(scope.text).to.equal('> waiting for tweets...');
    });
  });

  describe("when some tweet arrived from server ", function() {
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
        }
      });
    }));

    it('should display tweet message', function() {
      expect(scope.text).to.equal('hello');
    });
  });

});
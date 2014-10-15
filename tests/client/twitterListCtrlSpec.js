describe('TwitterListCtlr', function() {
  var scope, location;
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
    expect(scope.test).to.equal('> waiting for tweets...');
  });
});
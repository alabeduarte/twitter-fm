describe('TweetToQuery', function() {
  var tweetToQuery;

  beforeEach(function () {
    tweetToQuery = new TweetToQuery();
  });

  describe("when tweet is a simple string", function() {
    it("should encode string", function() {
      expect(tweetToQuery.encode('Hello World')).to.equal('Hello%20World');
    });
  });

  describe("when tweet has hashtag", function() {
    it("should encode string", function() {
      expect(tweetToQuery.encode('Hello World #fail')).to.equal('Hello%20World%20%23fail');
    });
  });

  describe("when tweet has more than 100 characters", function() {
    var moreThan100Characters;
    var totalLength = 130;

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
      var text = '';
      for(i=1;i<=totalLength;i++) { text += '*'; };
      moreThan100Characters = text;
    }));

    it("should return string with the only first 99 characters", function() {
      expect(
        tweetToQuery.encode(moreThan100Characters)
      )
      .to.equal(
        moreThan100Characters.substring(0, 100)
      );
    });

    xit("should set spoken word url with the only remaining characters", function() {
      expect(
        tweetToQuery.encode(moreThan100Characters)
      )
      .to.equal(
        moreThan100Characters.substring(100, totalLength + 1)
      );
    });
  });

});
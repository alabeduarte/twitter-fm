describe('TweetToQuery', function () {
  var tweetToQuery;

  beforeEach(function () {
    tweetToQuery = new TweetToQuery();
  });

  describe("when tweet is a simple string", function () {
    it("should encode string", function () {
      expect(tweetToQuery.encode('Hello World')).to.equal('Hello%20World');
    });
  });

  describe("when tweet has hashtag", function () {
    it("should return without hashtag with simple string", function () {
      expect(tweetToQuery.encode('Hello #fail World')).to.equal('Hello%20%20World');
    });

    it("should return without hashtag with underscoe", function () {
      expect(tweetToQuery.encode('Hello #fail_with_underscore World')).to.equal('Hello%20%20World');
    });

    it("should return without hashtag with dash", function () {
      expect(tweetToQuery.encode('Hello #fail-with-dash World')).to.equal('Hello%20%20World');
    });

    it("should return without hashtag with upper case", function () {
      expect(tweetToQuery.encode('Hello #FAIL World')).to.equal('Hello%20%20World');
    });
  });

  describe('when tweet has url', function () {
    it('should return without url', function () {
      expect(tweetToQuery.encode('Hello http://t.co/a5UUGPVlWl World')).to.equal('Hello%20%20World');
    });
  });

  describe('when tweet is a RT (retweet)', function () {
    it('should return without RT when begins with RT', function () {
      expect(tweetToQuery.encode('RT Hello World')).to.equal('Hello%20World');
    });

    it('should return keep RT when do not begins with RT', function () {
      expect(tweetToQuery.encode('Hello RT World')).to.equal('Hello%20RT%20World');
    });
  });

  describe("when tweet has more than 100 characters", function () {
    var moreThan100Characters;
    var totalLength = 130;

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
      var text = '';
      for(i=1;i<=totalLength;i++) { text += '*'; };
      moreThan100Characters = text;
    }));

    it("should return string with the only first 99 characters", function () {
      expect(
        tweetToQuery.encode(moreThan100Characters)
      )
      .to.equal(
        moreThan100Characters.substring(0, 100)
      );
    });

    xit("should set spoken word url with the only remaining characters", function () {
      expect(
        tweetToQuery.encode(moreThan100Characters)
      )
      .to.equal(
        moreThan100Characters.substring(100, totalLength + 1)
      );
    });
  });

});
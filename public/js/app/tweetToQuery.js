var TweetToQuery = function () {
  String.prototype.withoutUrl = function () {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    return this.replace(expression, '');
  };

  String.prototype.withoutHashTag = function () {
    var expression = /[#][a-zA-Z0-9\-_]+/gi;
    return this.replace(expression, '');
  };

  String.prototype.withoutRT = function () {
    var expression = /^(RT )/;
    return this.replace(expression, '');
  };
};

TweetToQuery.prototype.encode = function (tweet) {
  var maxLength = 100;

  var first100Characters = tweet.substring(0, maxLength);
  var text = first100Characters
                      .withoutUrl()
                      .withoutHashTag()
                      .withoutRT();

  return encodeURIComponent(text);
};
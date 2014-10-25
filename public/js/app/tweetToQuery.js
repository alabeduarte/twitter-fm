var TweetToQuery = function () {
  this.excludeUrlFrom = function (text) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    return text.replace(expression, '');
  };
};

TweetToQuery.prototype.encode = function (tweet) {
  var maxLength = 100;

  var first100Characters = tweet.substring(0, maxLength);
  var text = this.excludeUrlFrom(first100Characters);

  return encodeURIComponent(text);
};
var TweetToQuery = function () {};

TweetToQuery.prototype.encode = function (tweet) {
  var maxLength = 100;

  var text = tweet.substring(0, maxLength);
  return encodeURIComponent(text);
};
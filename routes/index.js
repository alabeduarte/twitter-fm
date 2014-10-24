exports.index = function (req, res) {
  res.render('index', { title: 'Twitter FM' });
};

exports.tweets = function (req, res) {
  var twitter = require('./lib/twitter');

  var tweets = function (tweet) { return { text: tweet.text }; };
  twitter.tweets(function (data) { res.send(data.map(tweets)); });
};
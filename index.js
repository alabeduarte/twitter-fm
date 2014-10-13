var twitter = require('./twitter');

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  var tweets = function (tweet) {
    return { text: tweet.text };
  };

  twitter.tweets(function (data) {
    res.send(data.map(tweets));
  });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
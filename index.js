var twitter = require('./lib/twitter');
var routes = require('./routes');
var path = require('path');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/tweets', routes.tweets);

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io').listen(server);

twitter.onTweet(function (tweet) {
  console.log(">", '(', tweet.lang, ')', tweet.text);
  io.sockets.emit('tweet-' + tweet.lang, { text: tweet.text, lang: tweet.lang });
});
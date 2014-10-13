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
app.get('/tweets', function(req, res) {
  var tweets = function (tweet) { return { text: tweet.text }; };
  twitter.tweets(function (data) { res.send(data.map(tweets)); });
});

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log('> connected');

  twitter.onTweet(function (tweet) {
    var data = { text: tweet.text };
    console.log(">", data.text);

    socket.emit('tweet', data);
  });
});
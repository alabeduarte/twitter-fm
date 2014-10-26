var username = process.env.USERNAME;

var Twit = require('twit');
var T = new Twit({
  consumer_key:             process.env.CONSUMER_KEY
  , consumer_secret:       process.env.CONSUMER_SECRET
  , access_token:             process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

var twitter = {
  tweets: function (callback) {
    params = { q: 'screen_name=' + username, count: 10 };
    T.get('statuses/home_timeline', params, function (err, data, response) { callback(data); });
  },
  onTweet: function(callback) {
    var stream = T.stream('user');
    // var stream = T.stream('statuses/sample');
    // var stream = T.stream('statuses/filter', { track: '#fail', language: 'en' });
    stream.on('tweet', function (tweet) { callback(tweet); });
  },
};

module.exports = twitter;
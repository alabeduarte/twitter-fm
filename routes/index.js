exports.index = function (req, res) {
  res.render('index', { title: 'Twitter FM' });
};

exports.tweets = function (req, res) {
  var twitter = require('./lib/twitter');

  var tweets = function (tweet) { return { text: tweet.text }; };
  twitter.tweets(function (data) { res.send(data.map(tweets)); });
};

exports.speech = function (req, res) {
  var fs = require("fs");
  var request = require('request');

  var query = req.query.q;

  var downloadfile = 'http://translate.google.com/translate_tts?ie=UTF-8&q='+ query + '&tl=en-us';
  var currentTime = new Date();
  var realname = currentTime.getTime() + ".mp3";

  var filePath = "webroot/files/"+realname;

  request(downloadfile).pipe(fs.createWriteStream(filePath));
  res.redirect('files/' + realname);
};

exports.deliverFile = function (req, res) {
  var paperboy = require('paperboy');
  var path = require("path");
  var WEBROOT = path.join(path.dirname(__filename), '../webroot');

  var ip = req.connection.remoteAddress;
  paperboy
    .deliver(WEBROOT, req, res)
    .addHeader('Expires', 30000)
  .addHeader('Content-type:', 'audio/mpeg')
    .addHeader('X-PaperRoute', 'Node')
    .before(function() {
      console.log('Received Request');
    })
    .after(function(statCode) {
      console.log(statCode, req.url, ip);
    })
    .error(function(statCode, msg) {
      res.writeHead(statCode, {'Content-Type': 'text/plain'});
      res.end("Error " + statCode);
      console.log(statCode, req.url, ip, msg);
    })
    .otherwise(function(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Error 404: File not found");
      console.log(404, req.url, ip, err);
    });
};
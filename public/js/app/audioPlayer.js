var AudioPlayer = function (context, request) {
  if (!context) {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    this.context = new AudioContext();
  } else {
    this.context = context;
  }

  this.request = (!request) ? new XMLHttpRequest() : request;
};

AudioPlayer.prototype.open = function (url) {
  var self = this;
  var context = self.context;
  var request = self.request;

  request.onload = function () {
    var data = request.response;
    var source = context.createBufferSource();

    self.decode(data, source);
  };

  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  request.send();
};

AudioPlayer.prototype.decode = function (data, source) {
  var context = this.context;

  context.decodeAudioData(data, function (buffer) {
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime);
  }, function (e) {
    console.log('ERROR', "Error with decoding audio data", e, data, source);
  });
};
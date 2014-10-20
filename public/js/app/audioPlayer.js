var AudioPlayer = function (context, request) {
  if (!context) {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    this.context = new AudioContext();
  } else {
    this.context = context;
  }

  if (!request) {
    this.request = new XMLHttpRequest();
  } else {
    this.request = request;
  }
};

AudioPlayer.prototype.open = function (url) {
  var self = this;
  var request = self.request;
  var context = self.context;

  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  request.onload = function() {
    var data = request.response;
    var source = context.createBufferSource();

    self.play(data, source);
  };

  request.send();
};

AudioPlayer.prototype.play = function (data, source) {
  var context = this.context;

  context.decodeAudioData(data, function (buffer) {
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime);
  });
};
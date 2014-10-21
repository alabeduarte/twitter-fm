describe('AudioPlayer', function () {

  describe('#open', function () {
    var audioPlayer;

    var request = {
      responseType: null,
      response: '<< data >>',
      open: function (url) {},
      send: function () {}
    };

    var context = {
      createBufferSource: function () {
        return '<< source >>';
      }
    };

    beforeEach(function () {
      audioPlayer = new AudioPlayer(context, request);
    });

    it("should promise to open audio's url", function () {
      var open = function (method, url, async) {};
      var spy = sinon.spy(open);
      request.open = spy;

      audioPlayer.open('http://twitter-fm.mp3');

      expect(spy).to.have.been.calledWith('GET', 'http://twitter-fm.mp3', true);
    });

    it("should set response type to 'arraybuffer'", function () {
      audioPlayer.open('http://twitter-fm.mp3');

      expect(request.responseType).to.equal('arraybuffer');
    });

    describe('on load request', function () {
      it("should decode audio with data response and buffer source", function () {
        var decode = function (data, source) {};
        var spy = sinon.spy(decode);
        audioPlayer.decode = spy;

        audioPlayer.open('http://twitter-fm.mp3');
        request.onload();

        var data = request.response;
        var source = context.createBufferSource();

        expect(spy).to.have.been.calledWith(data, source);
      });
    });

    it("should send request", function () {
      var send = function () {};
      var spy = sinon.spy(send);
      request.send = spy;

      audioPlayer.open('http://twitter-fm.mp3');

      expect(spy).to.have.been.called;
    });
  });

  describe('#decode', function () {
    var audioPlayer;

    var context = {
      decodeAudioData: function (data, callback) {
        callback();
      }
    };
    var data = {}
    var source = {
      buffer: null,
      connect: function (destination) {},
      start: function (currentTime) {}
    };

    beforeEach(function () {
      audioPlayer = new AudioPlayer(context);
    });

    it("should set source buffer", function() {
      audioPlayer.decode(data, source);

      expect(source.buffer).not.to.be.null;
    });

    it('should connect with context destination', function() {
      var connect = function (destination) {};
      var spy = sinon.spy(connect);
      source.connect = spy;
      context.destination = 'somewhere';

      audioPlayer.decode(data, source);

      expect(spy).to.have.been.calledWith('somewhere');
    });

    it('should start audio given a context current time', function() {
      var start = function (currentTime) {};
      var spy = sinon.spy(start);
      source.start = spy;
      context.currentTime = 123;

      audioPlayer.decode(data, source);

      expect(spy).to.have.been.calledWith(123);
    });
  });

});
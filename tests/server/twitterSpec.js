var expect = require('chai').expect;
var io = require('socket.io-client');

describe('Suite of unit tests', function() {

    var socket;

    beforeEach(function(done) {
        socket = io.connect('http://localhost');
        socket.on('connect', function() {
            console.log('worked...');
        });
        socket.on('disconnect', function() {
            console.log('disconnected...');
        });
        done();
    });

    describe('First (hopefully useful) test', function() {

        it('Doing some things with indexOf()', function(done) {
            expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
            expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
            done();
        });

        it('Doing something else with indexOf()', function(done) {
            expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
            expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
            done();
        });

    });

});
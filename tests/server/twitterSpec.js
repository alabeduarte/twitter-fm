var expect = require('chai').expect;

describe('Index', function(){
  it('should return helloworld', function() {
    var content = 'HelloWorld';

    expect(content).to.equal('HelloWorld');
  });
});
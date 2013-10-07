// TODO use browserify
var expect = global.chai ? global.chai.expect : require('chai').expect;
var client = global.client ? global.client : require('../lib/client');

describe('client', function() {
  it('returns ok', function(done) {
    client('http://localhost:3000/', function(err, res) {
      if (err) return done(err);
      expect(res).to.have.property('ok', true);
      done();
    });
  });
});

describe('dummy', function() {
  it('fails', function() {
    expect(true).to.equal(false);
  });

  it('does nothing', function() {
    expect(true).to.equal(true);
  });
});

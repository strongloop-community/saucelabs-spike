describe('dummy', function() {
  var expect = chai.expect;
  it('fails', function() {
    expect(true).to.equal(false);
  });

  it('does nothing', function() {
    expect(true).to.equal(true);
  });
});

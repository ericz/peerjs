describe('util', function() {

  var testRandom = function(fn) {
    var i = 0
      , generated = {};
    while(i < 25) {
      var p = fn();
      if (generated[p]) throw new Error('not so random')
      generated[p] = 1;
      i++;
    }
  }

  it('inherits', function() {
    function ctor() {}
    function superCtor() {}
    superCtor.prototype.test = function() { return 5; }
    util.inherits(ctor, superCtor);
    expect(new ctor()).to.be.a(superCtor);
    expect(new ctor().test()).to.be.equal(5);
  })

  /*
   *  extend overwrites keys if already exists
   *  leaves existing keys alone otherwise
   */
  it('extend', function() {
    var a = {a: 1, b: 2, c: 3, d: 4}
      , b = {d: 2};
    util.extend(b, a);
    expect(b).to.eql(a);
    expect(b.d).to.be.equal(4);
    b = {z: 2};
    util.extend(b, a);
    expect(b.z).to.be.equal(2);
  })

  it('pack', function() {
    expect(util.pack).to.be.equal(BinaryPack.pack);
  })

  it('unpack', function() {
    expect(util.unpack).to.be.equal(BinaryPack.unpack);
  })

  it('randomPort', function() {
    testRandom(util.randomPort);
  })

  // FF no like
  it('log', function(done) {
    var consolelog = console.log;
    // default is false
    expect(util.debug).to.be.equal(false);
    util.debug = true;
    console.log = function() {
      var arg = Array.prototype.slice.call(arguments);
      expect(arg.join(' ')).to.be.equal('PeerJS:  hi');
      done();
    }
    util.log('hi');
    // reset
    console.log = consolelog;
    util.debug = false;
  })

  it('setZeroTimeout', function(done) {
    expect(util.setZeroTimeout).to.be.a('function');
    expect(util.setZeroTimeout).to.have.length(1);
    var called = false;
    util.setZeroTimeout(function() { called = true; });
    setTimeout(function() {
      expect(called).to.be.equal(true);
      done();
    }, 0);
  })

  it('blobToArrayBuffer', function(done) {
    var blob = new Blob(['hi']);
    util.blobToArrayBuffer(blob, function(result) {
      expect(result.byteLength).to.be.equal(2);
      expect(result.slice).to.be.a('function');
      expect(result instanceof ArrayBuffer).to.be.equal(true);
      done();
    });
  })

  it('blobToBinaryString', function(done) {
    var blob = new Blob(['hi']);
    util.blobToBinaryString(blob, function(result) {
      expect(result).to.equal('hi');
      done();
    });
  })

  it('binaryStringToArrayBuffer', function() {
    var ba = util.binaryStringToArrayBuffer('\0\0');
    expect(ba.byteLength).to.be.equal(2);
    expect(ba.slice).to.be.a('function');
    expect(ba instanceof ArrayBuffer).to.be.equal(true);
  })

  it('randomToken', function() {
    testRandom(util.randomToken);
  })

  it('validateIdKey', function() {
    expect(util.validateIdKey(31)).to.be.equal(true);
    expect(util.validateIdKey('dfasf2a2_')).to.be.equal(false);
    expect(util.validateIdKey('aCc-_ 12dz')).to.be.equal(false);
    expect(util.validateIdKey('a-B_c 1')).to.be.equal(true);
  })
});

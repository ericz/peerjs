var p;

describe('Peer', function() {

  beforeEach(function() {
    p = new Peer();
  });


  it('constructor', function(done) {
    // Ensures id & key valid and aborts/return early
    var abort = Peer.prototype._abort;
    var ab = false;
    Peer.prototype._abort = function(err, msg) { ab = err }
    p = new Peer('@123');
    setTimeout(function() {
      // abort called
      expect(ab).to.be.equal('invalid-id');
      // returns early
      expect(p.connections === undefined).to.be.equal(true);

      p = new Peer({key: '@123'});
      setTimeout(function() {
        expect(ab).to.be.equal('invalid-key');
        expect(p.connections === undefined).to.be.equal(true);
        // reset prototype
        Peer.prototype._abort = abort;
        done();
      }, 1);
    }, 1);

    // sets id & calls _init()
    var init = false;
    var peerinit = Peer.prototype._init;
    Peer.prototype._init = function() { init = true }
    var pp = new Peer('abc123');
    expect(pp.id).to.be.equal('abc123');
    expect(init).to.be.equal(true);
    Peer.prototype._init = peerinit;

    // calls _getId when no id given
    var getId = false;
    var peergetId = Peer.prototype._getId;
    Peer.prototype._getId = function() {getId = true }
    pp = new Peer();
    expect(getId).to.be.equal(true);
    Peer.prototype._getId = peergetId;
  });

  it('inherits from EventEmitter', function() {
    expect(p instanceof EventEmitter).to.be.equal(true);
  });

  it('_getId')

  it('_init')

  it('_handleServerJSONMessage')

  it('_processQueue')

  it('_abort')

  it('_cleanup')

  it('_attachConnectionListeners')

  it('connect')
  
  it('destroy')

});

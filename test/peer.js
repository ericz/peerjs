var p;

describe('Peer', function() {

  beforeEach(function() {
    p = new Peer();
  });

  // TODO
  it('constructor', function() {
    // Ensures alphanumeric id & key and aborts/return early
    p = new Peer('123');
    

    // sets id & calls _init()
    var init = false;
    var peerinit = Peer.prototype._init;
    Peer.prototype._init = function() { init = true }
    p = new Peer('abc123');
    expect(p.id).to.be.equal('abc123');
    expect(init).to.be.equal(true);
    Peer.prototype._init = peerinit;

    // calls _getId when no id given
    var getId = false;
    var peergetId = Peer.prototype._getId;
    Peer.prototype._getId = function() {getId = true }
    p = new Peer();
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

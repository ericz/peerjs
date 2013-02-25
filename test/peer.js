var peer;

describe('Peer', function() {

  beforeEach(function() {
    peer = new Peer();
  });


  it('constructor', function(done) {
    // Ensures id & key valid and aborts/return early
    var ab = intercept(Peer.prototype, Peer.prototype._abort);
    peer = new Peer('@123');
    setTimeout(function() {
      // abort called
      expect(ab().args[0]).to.be.equal('invalid-id');
      // returns early
      expect(peer.connections === undefined).to.be.equal(true);

      ab = intercept(Peer.prototype, Peer.prototype._abort);
      peer = new Peer({key: '@123'});
      setTimeout(function() {
        expect(ab().args[0]).to.be.equal('invalid-key');
        expect(peer.connections === undefined).to.be.equal(true);
        done();
      }, 1);
    }, 1);

    // sets id & calls _init()
    var init = intercept(Peer.prototype, Peer.prototype._init);
    var pp = new Peer('abc123');
    expect(pp.id).to.be.equal('abc123');
    expect(!!init()).to.eql(true);

    // calls _getId when no id given
    var getId = intercept(Peer.prototype, Peer.prototype._getId);
    pp = new Peer();
    expect(!!getId()).to.be.equal(true);
  });

  it('inherits from EventEmitter', function() {
    expect(peer instanceof EventEmitter).to.be.equal(true);
  })

  it('_getId')

 /*
  * create and start socket for Peer
  * and registers 'message', 'error', 'socket-error' listeners
  */
  it('_init', function() {
    var callSocketStart = intercept(Socket.prototype, Socket.prototype.start);

    peer._init();
    // socket created
    expect(peer._socket instanceof Socket).to.be.equal(true);
    // test listeners
    var callHandle = intercept(Peer.prototype, Peer.prototype._handleServerJSONMessage);
    var callAbort = intercept(Peer.prototype, Peer.prototype._abort);
    
    // 'message' listener calls _handleServerJSONMessage
    peer._socket.emit('message', 'hi');
    expect(callHandle().args[0]).to.be.equal('hi');

    // 'error' listener calls _abort
    peer._socket.emit('error', 'err!!!');
    expect(callAbort().args[1]).to.be.equal('err!!!');

    // 'close' listener calls _abort
    callAbort = intercept(Peer.prototype, Peer.prototype._abort);
    peer._socket.emit('close');
    expect(callAbort().args[0]).to.match(/^socket-closed/);

    // socket start()
    expect(!!callSocketStart()).to.be.equal(true);
  })

  it('_handleServerJSONMessage')

  it('_processQueue')

  it('_abort')

  it('_cleanup')

  it('_attachConnectionListeners')

  it('connect')
  
  it('destroy')

});

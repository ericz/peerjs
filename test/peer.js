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
  })

  it('_getId')

 /*
  * Opens socket for Peer
  * and registers 'message', 'error', 'socket-error' listeners
  */
  it('_init', function() {
    var callSocketStart = false;
    var socketstartFn = Socket.prototype.start;
    Socket.prototype.start = function() { callSocketStart = true };

    p._init();
    // socket created
    expect(p._socket instanceof Socket).to.be.equal(true);
    // test listeners
    var callHandle = false, callAbort = false;
    p._handleServerJSONMessage = function(data) { callHandle = data };
    p._abort = function(type, msg) { callAbort = type + msg }
    // 'message' listener calls _handleServerJSONMessage
    p._socket.emit('message', 'hi');
    expect(callHandle).to.be.equal('hi');
    // 'error' listener calls _abort
    p._socket.emit('error', 'err!!!');
    expect(callAbort).to.be.equal('socket-errorerr!!!');
    // 'close' listener calls _abort
    p._socket.emit('close');
    expect(callAbort).to.match(/^socket-closed/);

    // socket start()
    expect(callSocketStart).to.be.equal(true);

    // reset
    Socket.prototype.start = socketstartFn;
  })

  it('_handleServerJSONMessage')

  it('_processQueue')

  it('_abort')

  it('_cleanup')

  it('_attachConnectionListeners')

  it('connect')
  
  it('destroy')

});

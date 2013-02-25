var sock;

describe('Socket', function() {

  beforeEach(function() {
    sock = new Socket('example.com', '80', 'mykey', 'someid');
  })

  /*
   *  generates random token and 
   *  sets this._httpUrl and this._wsUrl
   */
  it('constructor', function() {
    expect(sock._httpUrl).to.match(/^http:\/\/example\.com:80\/mykey\/someid\//);
    expect(sock._wsUrl).to.match(/^ws:\/\/example\.com:80\/peerjs\?key=mykey&id=someid&token=/);

    var token1 = sock._wsUrl.substr(sock._wsUrl.indexOf('&token=') + 7);
    var token2 = sock._httpUrl.substr(sock._httpUrl.indexOf('someid/') + 7);
    expect(token1).to.be.equal(token2);
  })

  it('inherits from EventEmitter', function() {
    expect(sock instanceof EventEmitter).to.be.equal(true);
  })

  /*
   *  calls _startXhrStream & _startWebSocket
   */
  it('start', function() {
    var xhrCall = intercept(Socket.prototype, Socket.prototype._startXhrStream);
    var wsCall = intercept(Socket.prototype, Socket.prototype._startWebSocket);
    sock.start();
    expect(!!xhrCall()).to.be.equal(true);
    expect(!!wsCall()).to.be.equal(true);
  })

  /*
   *  creates a WebSocket on ._socket
   *  (no error handling? que? TODO?)
   *
   *  sets event listener onmessage & onopen
   */
  it('_startWebSocket', function() {
    sock._startWebSocket();
    // calling _startWebSocket again returns early
    var s = sock._socket;
    sock._startWebSocket();
    expect(s).to.be.equal(sock._socket);

    // sets a event listener that relays onmessage
    var relay = false;
    sock.addListener('message', function(msg) {
      expect(msg.txt).to.be.equal('hi');
      relay = true;
    });
    sock._socket.onmessage({data: JSON.stringify({txt: "hi"}) });
    expect(relay).to.be.equal(true);
    // PeerJS only handles JSON messages (if not, the expect statement in addListener would throw / fail)
    sock._socket.onmessage({data: new Blob() });

    // if websocket successful, clear http request stuff
    sock._socket.onopen();

    // TODO

  })

  it('_startXhrStream')

  it('_handleStream')

  it('_setHTTPTimeout')

  it('send')

  it('close')
  
  it('_wsOpen')

});
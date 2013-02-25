var sock;

describe('Socket', function() {

  beforeEach(function() {
    sock = new Socket();
  })

  /*
   *  generates random token and 
   *  sets this._httpUrl and this._wsUrl
   */
  it('constructor', function() {
    sock = new Socket('example.com', 'alphabetPort', 'mykey', 'someid');
    expect(sock._httpUrl).to.match(/^http:\/\/example\.com:alphabetPort\/mykey\/someid\//);
    expect(sock._wsUrl).to.match(/^ws:\/\/example\.com:alphabetPort\/peerjs\?key=mykey&id=someid&token=/);

    var token1 = sock._wsUrl.substr(sock._wsUrl.indexOf('&token=') + 7);
    var token2 = sock._httpUrl.substr(sock._httpUrl.indexOf('someid/') + 7);
    expect(token1).to.be.equal(token2);
  })

  it('inherits from EventEmitter', function() {
    expect(sock instanceof EventEmitter).to.be.equal(true);
  })

  /*
   *  Starts socket calling _startXhrStream & _startWebSocket
   */
  it('start', function() {
    var xhrCall = intercept(Socket.prototype, Socket.prototype._startXhrStream);
    var wsCall = intercept(Socket.prototype, Socket.prototype._startWebSocket);
    sock.start();
    expect(!!xhrCall()).to.be.equal(true);
    expect(!!wsCall()).to.be.equal(true);
  })

  it('_startWebSocket')

  it('_startXhrStream')

  it('_handleStream')

  it('_setHTTPTimeout')

  it('send')

  it('close')
  
  it('_wsOpen')

});
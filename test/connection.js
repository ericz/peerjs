var d;

describe('DataConnection', function() {

  beforeEach(function() {
    d = new DataConnection();
  });

  // TODO
  it('constructor', function() {
    // setup test
    var init = false;
    var initialize = DataConnection.prototype.initialize;
    DataConnection.prototype.initialize = function() { init = true; }

    d = new DataConnection(123, 321);

    expect(d.id).to.be.equal(123);
    expect(d.peer).to.be.equal(321);

    expect(init).to.be.equal(true);
    // reset
    DataConnection.prototype.initialize = initialize;
  });

  it('inherits from EventEmitter', function() {
    expect(d instanceof EventEmitter).to.be.equal(true);
  });

  it('initialize');

  it('_setupOffer', function() {

  });

  it('_setupDataChannel', function() {

  });

  // TODO
  it('_startPeerConnection', function() {
    d._startPeerConnection();
    expect(d._pc instanceof RTCPeerConnection).to.be.equal(true);
  });

  it('_setupIce', function() {

  });

  /*
   *  sets _dc.onopen, _dc.onmessage, _dc.onclose
   *  test them here
   */
  it('_configureDataChannel', function() {
    d._dc = {};
    d._configureDataChannel();

    var onopen = false;
    d.addListener('open', function() { onopen = true });
    d._dc.onopen();
    expect(onopen).to.be.equal(true);
    expect(d.open).to.be.equal(true);

    var onmessage = false;
    d._handleDataMessage = function(a) { onmessage = a };
    d._dc.onmessage(123);
    expect(onmessage).to.be.equal(123);

    var onclose = false;
    d.addListener('close', function() { onclose = true; })
    d._dc.onclose();
    expect(onclose).to.be.equal(true);
  });

  it('_makeOffer', function() {

  });

  it('_makeAnswer', function() {

  });

  it('_cleanup', function() {

  });

  it('_handleDataMessage', function() {

  });

  it('close', function() {

  });

  it('send', function() {

  });

  it('handleSDP', function() {

  });

  it('handleCandidate', function() {

  });

  it('handleLeave"', function() {

  });

});

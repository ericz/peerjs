var d;

describe('DataConnection', function() {

  beforeEach(function() {
    d = new DataConnection();
  });

  // TODO
  it('constructor', function() {
    var init = intercept(DataConnection.prototype, DataConnection.prototype.initialize);
    d = new DataConnection(123, 321);
    expect(d.id).to.be.equal(123);
    expect(d.peer).to.be.equal(321);
    expect(!!init()).to.be.equal(true);
  });

  it('inherits from EventEmitter', function() {
    expect(d instanceof EventEmitter).to.be.equal(true);
  });

  it('initialize');

  it('_setupOffer');

  it('_setupDataChannel');

  // TODO
  it('_startPeerConnection', function() {
    d._startPeerConnection();
    expect(d._pc instanceof RTCPeerConnection).to.be.equal(true);
  });

  it('_setupIce');

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

  it('_makeOffer');

  it('_makeAnswer');

  it('_cleanup');

  it('_handleDataMessage');

  it('close');

  it('send');

  it('handleSDP');

  it('handleCandidate');

  it('handleLeave"');

});

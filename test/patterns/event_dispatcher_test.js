var sinon = require("sinon"),
    chai = require("chai");

var expect = chai.expect;
var assert = chai.assert;

var eventDispatcher = require("../../src/patterns/dispatcher/event_dispatcher");

describe('Event Dispatcher Test', function() {

  it('should responds to dispatcher methods', function() {
    expect(eventDispatcher).to.respondTo('listen');
    expect(eventDispatcher).to.respondTo('dispatch');
    expect(eventDispatcher).to.respondTo('unlisten');
  });

  it('should listen and to an event subscription and dispatch an event afterwards', function() {
    var callback = sinon.spy();
    var data = {mydata : "mydata", test: "data"};
    var myEvent = "myEvent";

    eventDispatcher.listen(myEvent, callback);
    sinon.assert.notCalled(callback);

    eventDispatcher.dispatch(myEvent, data);
    sinon.assert.called(callback);
    sinon.assert.calledWith(callback, data);
  });

  it('dispatches all arguments', function() {
    var callback = sinon.spy();
    var data = {mydata : "mydata", test: "data"};
    var additionalData = {data: "additionalData"};
    var myEvent = "myEvent";

    eventDispatcher.listen(myEvent, callback);
    sinon.assert.notCalled(callback);

    eventDispatcher.dispatch(myEvent, data, additionalData);
    sinon.assert.called(callback);
    sinon.assert.calledWith(callback, data, additionalData);
  });

  it('should stop listening for an event and not dispatch any event afterwards', function() {
    var callback = sinon.spy();
    var data = {data : "mydata"};
    var myEvent = "myEvent";

    eventDispatcher.listen(myEvent, callback);
    eventDispatcher.dispatch(myEvent, data);
    eventDispatcher.unlisten(myEvent, callback);

    eventDispatcher.dispatch(myEvent, callback);
    eventDispatcher.dispatch(myEvent, callback);

    sinon.assert.calledOnce(callback);
  });

  it('should stop listening and start listening again and dispatch event afterwards', function() {
    var callback = sinon.spy();
    var data = {data : "mydata"};
    var myEvent = "myEvent";

    eventDispatcher.listen(myEvent, callback);
    eventDispatcher.dispatch(myEvent, data);
    eventDispatcher.unlisten(myEvent, callback);

    eventDispatcher.dispatch(myEvent, callback);
    eventDispatcher.dispatch(myEvent, callback);

    eventDispatcher.listen(myEvent, callback);
    eventDispatcher.dispatch(myEvent, callback);

    sinon.assert.calledTwice(callback);
    sinon.assert.calledWith(callback, data);
  });

  it('should listening for different events and dispatch', function() {
    var firstCallback = sinon.spy();
    var secondCallback = sinon.spy();
    var dataOne = {data : "mydata1"};
    var dataTwo = {data : "mydata2"};
    var myFirstEvent = "myFirstEvent";
    var mySecondEvent = "mySecondEvent";

    eventDispatcher.listen(myFirstEvent, firstCallback);
    eventDispatcher.dispatch(myFirstEvent, dataOne);

    eventDispatcher.listen(mySecondEvent, secondCallback);
    eventDispatcher.dispatch(mySecondEvent, dataTwo);

    sinon.assert.calledWith(firstCallback, dataOne);
    sinon.assert.calledWith(secondCallback, dataTwo);
  });

   it('should register different callbacks for one event and dispatch', function() {
    var firstCallback = sinon.spy();
    var secondCallback = sinon.spy();
    var thirdCallback = sinon.spy();
    var dataOne = {data : "mydata1"};
    var myFirstEvent = "myFirstEvent";

    eventDispatcher.listen(myFirstEvent, firstCallback);
    eventDispatcher.listen(myFirstEvent, secondCallback);
    eventDispatcher.listen(myFirstEvent, thirdCallback);

    eventDispatcher.dispatch(myFirstEvent, dataOne);

    sinon.assert.calledWith(firstCallback, dataOne);
    sinon.assert.calledWith(secondCallback, dataOne);
    sinon.assert.calledWith(thirdCallback, dataOne);

  });

  it("exports itself to another object", function () {
    var obj = {};
    eventDispatcher.exportTo(obj);
    assert.isFunction(obj.dispatch);
    assert.isFunction(obj.listen);
    assert.isFunction(obj.unlisten);
    assert.isFunction(obj.scopedDispatch);
  });
});

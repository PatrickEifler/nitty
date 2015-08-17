var assert = require("chai").assert;
var sinon = require("sinon");
var dispatcher = require("../../src/patterns/dispatcher/event_dispatcher");
var Ctrl = require("../../src/base/ctrl");

describe("Ctrl Test", function () {
  beforeEach(function() {
    var context = {
      set: function(data) {
        return data;
      }
    };
    var updatedSignal;
    var api = {
      onUpdateDo: function(updateCallback) {
        dispatcher.listen(
          "update_event",
          updateCallback
        );
      }
    };
    var dataMapper = function(params){
      return params;
    };

    sinon.spy(api, "onUpdateDo");
    sinon.spy(context, "set");

    this.ctrlInstance = Ctrl.createInstance(
      api, updatedSignal, context, dataMapper
    );

    sinon.spy(this.ctrlInstance, "dataMapper");
  });

  afterEach(function() {
    this.ctrlInstance = undefined;
  });

  it("creates an instance", function() {
    assert.isObject(this.ctrlInstance);
    assert.property(this.ctrlInstance, "api");
    assert.property(this.ctrlInstance, "signal");
    assert.property(this.ctrlInstance, "context");
    assert.property(this.ctrlInstance, "dataMapper");
  });

  it("initializes the given signal with given listener", function() {
    var _listener = this.ctrlInstance.context.set,
        _context = this.ctrlInstance.context;
    assert.strictEqual(this.ctrlInstance.signal.getNumListeners(),1);
    assert.isTrue(this.ctrlInstance.signal.has(_listener, _context));
  });

  it("registers to update stream and dispatches signal", function() {
    dispatcher.dispatch("update_event", {test: "test"});

    sinon.assert.calledOnce(this.ctrlInstance.api.onUpdateDo);
    sinon.assert.calledOnce(this.ctrlInstance.dataMapper);
    sinon.assert.calledWith(this.ctrlInstance.dataMapper, {test: "test"});
    sinon.assert.calledWith(this.ctrlInstance.context.set, {test: "test"});
  });

});

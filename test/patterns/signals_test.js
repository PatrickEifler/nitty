var assert = require("chai").assert;
var sinon = require("sinon");
var L = require("lodash");

var Signals = require("../../src/patterns/signals/signals");

describe('Signals', function() {

  it("responds to init signal", function () {
    assert.property(Signals, "initSignal");
  });

  it("signal instance public interface", function () {
    var signal = Signals.initSignal();
    assert.property(signal, "hasListener");
    assert.property(signal, "addListener");
    assert.property(signal, "addListenerOnce");
    assert.property(signal, "removeListener");
    assert.property(signal, "removeAllListeners");
    assert.property(signal, "getNumberOfListeners");
    assert.property(signal, "stopPropagation");
    assert.property(signal, "dispatch");
  });

  it("registers a listener to a signal", function () {
    var signal = Signals.initSignal(),
        listener = function() {},
        context = function() {},
        priority = 0;

    assert.isObject(signal.addListener(listener,context,priority));
    assert.isTrue(signal.hasListener(listener, context));
  });

  it("registers a listener to a signal once", function () {
    var signal = Signals.initSignal(),
        listener = function() {},
        context = function() {},
        priority = 0;

    assert.isObject(signal.addListenerOnce(listener,context,priority));
    assert.isTrue(signal.hasListener(listener, context));
  });

  it("removes a listener from a signal", function () {
    var signal = Signals.initSignal(),
        listener = function() {},
        context = function() {},
        priority = 0;

    signal.addListenerOnce(listener,context,priority);
    signal.removeListener(listener, context);
    assert.isFalse(signal.hasListener(listener, context));
  });

  it("removes all listeners from a signal", function () {
      var signal = Signals.initSignal(),
        listeners = {0: {}, 1: {}, 2: {}};
        priority = 0;

    L.times(3, function (n) {
      var l = n;
      listeners[l].listener = function() {};
      listeners[l].context = function() {};

      signal.addListener(
        listeners[n].listener,
        listeners[n].context,
        priority+n
      );
    });

    assert.strictEqual(signal.getNumberOfListeners(),3);
    signal.removeAllListeners();
    assert.strictEqual(signal.getNumberOfListeners(),0);
  });

});

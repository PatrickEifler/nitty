var assert = require("chai").assert;
var sinon = require("sinon");
var Api = require("../../src/base/api");
var Ctrl = require("../../src/base/ctrl");
var Context = require("../../src/base/context");
var Presenter = require("../../src/base/presenter");
var SingletonFactory = require("../../src/factory/singleton_factory");
var dispatcher = require("../../src/patterns/dispatcher/event_dispatcher");

describe("Base Integration Test", function () {

  var api = Api.createInstance(
    "integration"
  );

  var updatedSignal;

  var dataMapper = function(params) {
    return params;
  };
  var presenter = SingletonFactory.createInstance(Presenter.createInstance());

  var objectToBePassedToView = {};

  var context = Context.createInstance(function(data) {
    presenter.mapObj(data, function() {
      objectToBePassedToView = { passed: data.integration.passed };
    });
  });

  beforeEach(function() {
    this.ctrl = Ctrl.createInstance(
      api, updatedSignal, context, dataMapper
    );
  });

  afterEach(function() {
    this.ctrl = null;
  });

  it("registers signal to api update stream and maps the response on update", function() {
    assert.strictEqual(this.ctrl.signal.getNumberOfListeners(),1);
    assert.isTrue(this.ctrl.signal.hasListener(context.set, context));

    dispatcher.dispatch("success_integration", { integration: {passed: true} });

    assert.deepEqual(objectToBePassedToView, {passed: true});
  });

});

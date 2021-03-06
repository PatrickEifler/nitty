var assert = require("chai").assert;
var sinon = require("sinon");
var Api = require("../../src/base/api");
var dispatcher = require("../../src/patterns/dispatcher/event_dispatcher");

describe("Api Test", function () {
  beforeEach(function() {
    var handler = function(data) {
      return {set_data: data};
    };
    var scope = "api_scope";
    this.apiInstance = Api.createInstance(scope);
  });

  afterEach(function() {
    this.apiInstance = undefined;
  });

  it("creates an instance", function() {
    assert.isObject(this.apiInstance);
    assert.property(this.apiInstance, "onUpdateDo");
    assert.property(this.apiInstance, "events");
  });

  it("should have a scope property", function() {
    assert.strictEqual(this.apiInstance.scope, "api_scope");
  });

  it("fires the given callback on update event", function() {
    var callback = sinon.spy();
    this.apiInstance.onUpdateDo(callback);
    dispatcher.dispatch("success_api_scope", {some_data: "data"});
    sinon.assert.calledOnce(callback);
    sinon.assert.calledWith(callback, {some_data: "data"});
  });

});

var assert = require("chai").assert;
var Context = require("../../src/base/context");

describe("Context Test", function () {
  beforeEach(function() {
    var handler = function(data) {
      return {set_data: data};
    };
    this.contextInstance = Context.createInstance(handler);
  });

  afterEach(function() {
    this.contextInstance = undefined;
  });

  it("creates an instance", function() {
    assert.isObject(this.contextInstance);
    assert.property(this.contextInstance, "handler");
  });

  it("set function calls the handler and returns handled data", function() {
    var data = {test: "me"};
    assert.deepEqual(this.contextInstance.set(data), {set_data: data});
  });

});

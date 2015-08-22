var assert = require("chai").assert;
var singletonFactory = require("../../src/factory/singleton_factory");

describe("Singleton factory Test", function(){
  it("should create a singleton from a given constructor", function() {
    var Constr = function(id) {
      this.id = id;
    };
    var instance = singletonFactory.createInstance(Constr);
    var sameInstance = singletonFactory.createInstance(Constr);

    assert.strictEqual(instance, sameInstance);
    assert.strictEqual(instance.id, sameInstance.id);

    sameInstance.id = 2;
    assert.strictEqual(instance.id, sameInstance.id);
  });
});

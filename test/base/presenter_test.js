var assert = require("chai").assert;
var sinon = require("sinon");
var Presenter = require("../../src/base/presenter");

describe("Presenter Test", function () {
  beforeEach(function() {
    var handler = function(data) {
      return {set_data: data};
    };

    this.presenterInstance = Presenter.createInstance();
  });

  afterEach(function() {
    this.presenterInstance = undefined;
  });

  it("creates an instance", function() {
    assert.isObject(this.presenterInstance);
    assert.property(this.presenterInstance, "mapCollection");
    assert.property(this.presenterInstance, "mapObj");
  });

  it("maps a collection with a given iterator", function () {
    var collection = [
      {
        id: "1",
      },
      {
        id: "2",
      },
      {
        id: "invalid",
      }
    ];
    var iterator = function (item, index) {
      if(item.id === "invalid") { return; }
      item.name = "test"+index;
      return item;
    };

    assert.include(
      this.presenterInstance.mapCollection(collection, iterator),
      collection[1]
    );

    assert.notInclude(
      this.presenterInstance.mapCollection(collection, iterator),
      collection[2]
    );

    assert.propertyVal(
      this.presenterInstance.mapCollection(collection, iterator)[0],
      "name",
      "test0"
    );

  });

});

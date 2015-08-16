var jsDom = require("jsdom");
GLOBAL.window = jsDom.jsdom().parentWindow;

var assert = require("assert");
var emitter = require("../../src/api/emitter");

describe("Emitter Test", function(){
  it("should respond to send", function() {
    assert.ok(emitter.send("test"), {test: "test"});
  });
});

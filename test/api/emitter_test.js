var jsDom = require("jsdom");
GLOBAL.window = jsDom.jsdom().parentWindow;
GLOBAL.document = jsDom.jsdom.document;
var assert = require("chai").assert;

var emitter = require("../../src/api/emitter");
var loader = require("../../src/utils/ajax_loader");

var $ = require("jquery");

describe("Emitter Test", function(){
  it("responds to send and renders loader div until server responds", function() {
    loader.init();

    assert.ok(emitter.send("test"), {test: "test"});

    assert.lengthOf($("body").find(".loader"), 1);
    assert.lengthOf($("body").find(".lock-ui"), 1);
  });
});

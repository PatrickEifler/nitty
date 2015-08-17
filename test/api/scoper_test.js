var jsDom = require("jsdom");
GLOBAL.window = jsDom.jsdom().parentWindow;

var assert = require("chai").assert,
    sinon = require("sinon"),
    ApiScoper = require("../../src/api/scoper").Class,
    dispatcher = require("../../src/patterns/dispatcher/event_dispatcher"),
    api = require("../../src/api/emitter"),
    neoJquery = require("jquery");

describe("Api Scoper Test", function(){

  beforeEach(function() {
    sinon.spy(api, "send");
  });

  afterEach(function() {
    api.send.restore();
  });

  it("should respond to functions", function() {
    var scopedApi = new ApiScoper(api, "agent");
    assert.notEqual(null, scopedApi.on);
    assert.notEqual(null, scopedApi.send);
    scopedApi = undefined;
  });

  it("should respond to events", function() {
    var scopedApi = new ApiScoper(api, "agent");
    assert.equal("success", scopedApi.EVENT.SUCCESS);
    assert.equal("error", scopedApi.EVENT.ERROR);
    scopedApi = undefined;
  });

  it("should set the api scope", function() {
    var scopedApi = new ApiScoper(api, "agent");
    assert.equal("agent", scopedApi.scope_selector);
    scopedApi = undefined;
  });

  it("should fire on success event with scoped data", function() {
    var apiScoper = new ApiScoper(api, "agent");
    var agentResponseObject = {agent: {scoped_data :"scoped_data"}};

    sinon.spy(apiScoper, "processResult");

    api.trigger("success", agentResponseObject);

    assert(apiScoper.processResult.calledOnce);

    assert.deepEqual(
      apiScoper.processResult.getCall(0).args[0],
      agentResponseObject
    );

    apiScoper.processResult.restore();
  });

  it("should not fire on success event without scoped data", function() {
    var apiScoper = new ApiScoper(api, "agent");
    var someReponse = {test: "test"};
    var callback = sinon.spy();

    apiScoper.api.trigger("success", someReponse);
    apiScoper.api.on("success", callback);
    sinon.assert.notCalled(callback);
  });
});
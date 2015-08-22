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
    assert.notEqual(null, scopedApi.listen);
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

  it("should fire on success event and returns scoped data", function() {
    var apiScoper = new ApiScoper(api, "agent");
    var agentResponseObject = {agent: {scoped_data :"scoped_data"}};
    var scopedData = {scoped_data :"scoped_data"};
    var scopedResultCallback = sinon.spy();

    sinon.spy(apiScoper, "processResult");
    api.listen(apiScoper.selector_success, scopedResultCallback);
    api.dispatch("success", agentResponseObject, { xhr: "test",textStatus: "test"} );

    assert(apiScoper.processResult.calledOnce);

    sinon.assert.calledWith(apiScoper.processResult, agentResponseObject);

    sinon.assert.calledWith(scopedResultCallback, scopedData);

    apiScoper.processResult.restore();
  });

  it("should not fire on success event without scoped data", function() {
    var apiScoper = new ApiScoper(api, "agent");
    var someReponse = {test: "test"};
    var callback = sinon.spy();

    apiScoper.api.dispatch("success", someReponse,  { xhr: "test",textStatus: "test"});
    apiScoper.api.listen("success", callback);

    sinon.assert.notCalled(callback);
  });

  it("should fire on success event if no scope was given", function() {
    var apiScoper = new ApiScoper(api);
    var someReponse = {test: "test"};
    var caller = sinon.spy();
    sinon.spy(apiScoper, "processResult");

    api.listen("_success_response_", caller);
    apiScoper.api.dispatch("success", someReponse,  { xhr: "test",textStatus: "test"});

    assert(apiScoper.processResult.calledOnce);

    sinon.assert.calledWith(apiScoper.processResult, someReponse);

    assert(caller.calledOnce);
    sinon.assert.calledWith(caller, someReponse);

    apiScoper.processResult.restore();
  });
});
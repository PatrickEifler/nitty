var assert = require("assert");

var ng = require("../src/index");

describe('Nitty Gritty Test', function() {
  it('should return a map of services', function() {
    //base modules
    assert.notEqual(null, ng.ctrl);
    assert.notEqual(null, ng.api);
    assert.notEqual(null, ng.context);
    assert.notEqual(null, ng.presenter);

    //patterns
    assert.notEqual(null, ng.dispatcher);
    assert.notEqual(null, ng.singleton);
    assert.notEqual(null, ng.observer_subject);
    assert.notEqual(null, ng.signals);

    //query components
    assert.notEqual(null, ng.query_builder);
    assert.notEqual(null, ng.query_cleaner);
    assert.notEqual(null, ng.querier);
    assert.notEqual(null, ng.query_base_ctrl);

    //api components
    assert.notEqual(null, ng.api_event);
    assert.notEqual(null, ng.api_scoper);
    assert.notEqual(null, ng.emitter);

    //utils
    assert.notEqual(null, ng.loader);
    assert.notEqual(null, ng.abbreviator);
  });
});

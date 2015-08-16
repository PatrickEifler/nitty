var assert = require("assert");

var ng = require("../src/index");

describe('Nitty Gritty Test', function() {
  it('should return a map of services', function() {
    assert.notEqual(null, ng.ajax_loader);
    assert.notEqual(null, ng.abbreviator);

    assert.notEqual(null, ng.dispatcher);
    assert.notEqual(null, ng.singleton);
    assert.notEqual(null, ng.observer_subject);
    assert.notEqual(null, ng.signals);
    assert.notEqual(null, ng.object_creator);

    assert.notEqual(null, ng.query_builder);
    assert.notEqual(null, ng.query_cleaner);
    assert.notEqual(null, ng.querier);
    assert.notEqual(null, ng.query_base_ctrl);

    assert.notEqual(null, ng.base_ctrl);

    assert.notEqual(null, ng.api_event);
    assert.notEqual(null, ng.api_scoper);
    assert.notEqual(null, ng.emitter);
  });
});

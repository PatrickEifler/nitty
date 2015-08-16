"use strict";

var assert = require("chai").assert;

var Querier = require("../../src/query/querier");

describe('Querier', function() {
  it('instantiates the Querier', function() {
    var mock = {
      query_type: "test_type",
      args: ["1","2"]
    };
    var querier = Querier.createInstance(mock);

    assert.isObject(querier);
  });
  it('returns the args for a given query type', function() {
    var mock = {
      query_type: "test_type",
      args: {result: "3"}
    };
    var querier = Querier.createInstance(mock);

    assert.deepEqual(querier.getArgsForQueryType("test_type"), {result: "3"});
  });
  it('returns the query type it is bound to', function() {
    var mock = {
      query_type: "test_type",
      args: {result: "3"}
    };
    var querier = Querier.createInstance(mock);

    assert.equal(querier.getType(), "test_type");
  });
});

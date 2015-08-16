var assert = require("chai").assert;
var QueryCleaner = require("../../src/query/query_cleaner");

describe('QueryCleaner', function() {
  it('cleans up the query object', function() {
    var queryObj = {
      undefinedVal: undefined,
      empty: [],
      empty_too: "",
      keep: "me",
      keepMe: {key: "value is there"}
    };
    var cleanedQueryObj = QueryCleaner.clean(queryObj);
    assert.notDeepEqual(queryObj, cleanedQueryObj);
    assert.property(cleanedQueryObj, "keep");
    assert.property(cleanedQueryObj, "keepMe");
    assert.notProperty(cleanedQueryObj, "empty_too");
    assert.notProperty(cleanedQueryObj, "empty");
    assert.notProperty(cleanedQueryObj, "undefinedVal");
  });
});

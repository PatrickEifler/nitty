var assert = require("chai").assert;
var sinon = require("sinon");

var QueryBuilder = require("../../src/query/query_builder");
var QueryBaseCtrl = require("../../src/query/query_base_ctrl");

describe('Query', function() {

  it("delegates observer subject functions", function () {
    var queryBuilder = QueryBuilder.getInstance();
    assert.property(queryBuilder, "addObserver");
    assert.property(queryBuilder, "removeObserver");
  });

  it('fetches the query and notifies its observer if updated', function() {
    var apiMock = {
      reload: function(query) {
        return query;
      }
    };
    var updateEvent = "UPDATE";
    var queryEnrichers = {
      enrich_query_with_sort: function(querier) {
        return querier.getArgsForQueryType('enrich_query_with_sort');
      }
    };
    var queryCtrl = QueryBaseCtrl.createInstance(
      apiMock, updateEvent, queryEnrichers
    );
    var queryBuilder = QueryBuilder.getInstance();
    var queryMock = {
     arr: [1,3,4]
    };
    sinon.spy(queryCtrl, "processQuery");

    queryBuilder.fetchQuery(queryMock);
    queryBuilder.fetchQuery(queryMock);

     //The observer is notified and processes the query
     //only once because the query is only updated if there is a diff
    sinon.assert.calledOnce(queryCtrl.processQuery);

    queryCtrl.processQuery.restore();
  });
});

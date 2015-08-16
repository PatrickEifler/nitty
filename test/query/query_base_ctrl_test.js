var assert = require("chai").assert;
var sinon = require("sinon");

var QueryBaseCtrl = require("../../src/query/query_base_ctrl");
var Querier = require("../../src/query/querier");
var dispatcher = require("../../src/patterns/dispatcher/event_dispatcher");

describe('QueryBaseCtrl', function() {
  beforeEach(function() {
    var apiMock = {
      reload: function(query) {
        return query; //send reload
      }
    };
    var updateEvent = "UPDATE";
    var queryEnrichers = {
      enrich_query_with_sort: function(querier) {
        return querier.getArgsForQueryType('enrich_query_with_sort');
      }
    };
    this.queryCtrl = QueryBaseCtrl.createInstance(
      apiMock, updateEvent, queryEnrichers
    );
  });
  afterEach(function() {
    this.queryCtrl = null;
  });

  it('is constructable', function() {
    assert.notEqual(null, this.queryCtrl);
  });

  it("reacts on the given event", function() {
    sinon.spy(this.queryCtrl, "resetOffset");
    sinon.spy(this.queryCtrl, "processQuery");

    var querier = Querier.createInstance({
      query_type: "enrich_query_with_sort",
      args: {
          enrich_query_with_sort_info: {
            order_by: "order_by",
            order_direction: "asc"
          }
        }
    });
    dispatcher.dispatch("UPDATE", querier);

    sinon.assert.calledOnce(this.queryCtrl.resetOffset);
    sinon.assert.calledOnce(this.queryCtrl.processQuery);

    this.queryCtrl.resetOffset.restore();
    this.queryCtrl.processQuery.restore();
  });

});

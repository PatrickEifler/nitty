var L = require("lodash"),
    dispatcher = require("../index").dispatcher,
    Query = require("../index").query_builder;

var QueryBaseCtrl = (function() {
  var _QueryBaseCtrl;


  _QueryBaseCtrl = function(api, queryUpdateEvent, queryEnrichers) {
    var self = this;
    self.api = api;
    self.queryUpdateEvent = queryUpdateEvent;
    self.queryEnrichers = queryEnrichers;
    self.queryBuilder = Query.getInstance();

    self.initializeQueryUpdater();
    self.queryBuilder.addObserver(self.queryUpdater);
    self.registerQueryUpdate();

    //Set Query
    self.query = self.queryBuilder.query;
  };

  _QueryBaseCtrl.prototype = {
    version: 1.0,

    updated_query: {},

    initializeQueryUpdater: function() {
      var self = this;

      self.queryUpdater = {
        update: function() {
          self.updated_query = arguments[0];
          self.processQuery();
        }
      };
    },

    registerQueryUpdate: function() {
      var self = this,
          _handleQueryUpdate = function(querier) {
            self.resetOffset(querier);

            self.queryBuilder.fetchQuery(
              self.queryEnrichers[querier.getType()](querier)
            );

          };

      dispatcher.listen(
        this.queryUpdateEvent,
        _handleQueryUpdate
      );
    },

    resetOffset: function (querier) {
      if(querier.getType() !== "paginator") {
        return this.ensureQuery(this.updated_query) ? this.updated_query.offset = 0 : undefined;
      }
    },

    ensureQuery: function(query) {
      return typeof query !== "undefined";
    },

    processQuery: function () {
      this.api.reload(this.updated_query);
    }

  };


  return _QueryBaseCtrl;
}());


exports.createInstance = function (api, queryUpdateEvent, queryEnrichers) {
  return new QueryBaseCtrl(api, queryUpdateEvent, queryEnrichers);
};

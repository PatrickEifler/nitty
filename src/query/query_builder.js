var L = require("lodash"),
    ObserverSubject = require("../main").observer_subject,
    singleton_factory = require("../main").singleton;

var Query = (function() {
  var QueryConstr,
      _query = {
        offset: 0,
        limit: 25
      },
      _isEqualQuery = function(query_key, new_query, old_query) {
        return _isEqualValue(query_key, new_query, old_query) ||
              _isDeepEqual(query_key, new_query, old_query);
      },
      _isEqualValue = function(query_key, new_query, old_query) {
        return new_query[query_key] === old_query[query_key];
      },
      _isDeepEqual = function(query_key, new_query, old_query) {
        return  L.isEqual(new_query[query_key], old_query[query_key]);
      },
      _updateArray = function(a,b) {
        a.pop();
        return !L.isArray(b) ? a.push(b) : undefined;
      };

  QueryConstr = function() {
    this.observerSubject = ObserverSubject.createInstance();
    this.query = _query;
  };

  QueryConstr.prototype.addObserver = function(newObserver) {
    this.observerSubject.addObserver(newObserver);
  };

  QueryConstr.prototype.removeObserver = function(deleteObserver) {
    this.observerSubject.removeObserver(deleteObserver);
  };

  QueryConstr.prototype.fetchQuery = function(query) {
    if(!query) { return; }

    var _new_query = query,
        _old_query = this.query,
        _query_key = L.keys(_new_query);

    if(_isEqualQuery(_query_key, _new_query, _old_query)) {

      return;

    } else {

      var _updated_query = L.merge(
        _old_query,
        _new_query,
        function(a,b) {
          return L.isArray(a) ? _updateArray(a,b) : undefined;
        }
      );

      this.query = _updated_query;
      this.observerSubject.notifyObservers(_updated_query);

    }
  };

  return singleton_factory.create_instance(QueryConstr);
}());


exports.getInstance = function() {
  return Query.getInstance();
};

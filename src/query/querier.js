"use strict";

var Querier = (function () {
  var Q,
      _type,
      _args,
      _initialize = function(query) {
        _type = query.query_type;
        _args = query.args;
      };


  Q = function(query) {
    _initialize(query);
  };

  Q.prototype.getArgsForQueryType = function(type) {
    if(type !== _type) { return; }
    return _args;
  };

  Q.prototype.getType = function() {
    return _type;
  };

  return Q;
}());

exports.createInstance = function(query) {
  return new Querier(query);
};

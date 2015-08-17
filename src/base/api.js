var scoper = require("../api/scoper"),
    dispatcher = require("../patterns/dispatcher/event_dispatcher");

var Api = (function () {
  var _Api = function (scope, events) {
    this.scope = scope;
    this.events = events;
  };

  _Api.prototype.onUpdateDo = function (callback) {
    dispatcher.listen(
      this.events.update,
      callback
    );
  };

  return _Api;
})();

exports.createInstance = function(scope, events) {
  return new Api(scope, events);
};
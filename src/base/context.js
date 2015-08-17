var Context = (function() {
  var _Context = function (handler) {
    this.handler = handler;
  };

  _Context.prototype.set = function (data) {
    return this.handler(data);
  };

  return _Context;
})();

exports.createInstance = function (handler) {
  return new Context(handler);
};

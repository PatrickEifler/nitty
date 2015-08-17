var L = require("lodash");

var Presenter = (function () {
  var _Presenter = function () {};

  _Presenter.prototype.mapCollection = function (collection, iterator) {
    return L.map(collection, iterator);
  };

  _Presenter.prototype.mapObj = function (obj, mapper) {
    return mapper(obj);
  };

  return _Presenter;
})();

exports.createInstance = function () {
  return new Presenter();
};

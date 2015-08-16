"use strict";

var _ensureObjectCreation = function() {
  if(typeof Object.create !== 'function') {
    Object.create = function(o) {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }
};

module.exports.ensureObjectCreation = _ensureObjectCreation;

"use strict";

var L = require("lodash");

var removeEmptyKeys = function(query) {
  return L.omit(query, function(value) {
    return value === "" || typeof value !== "undefined" && value.length <= 0 ||
      value === undefined || value === false;
  });
};

exports.clean = function(query) {
  return removeEmptyKeys(query);
};

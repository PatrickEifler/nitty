var Backbone = require("backbone"),
    $ = require("jquery"),
    L = require("lodash"),
    EVENT = require("./event"),
    loader = require("../index").loader,
    timeout;

L.extend(exports, Backbone.Events);

exports.send = function(action, args) {
  return $.ajax(action, {
    type: "POST",
    dataType: "json",
    data: {
      payload: JSON.stringify(args)
    },
    beforeSend: function() {
      loader.lockUi();
      if(timeout) { clearTimeout(timeout); }

      //only show loader if request takes longer than 500ms
      timeout = setTimeout(function() {
        loader.showLoader();
      }, 500);
    },
    success: function(result, textStatus, xhr) {
      if(timeout) { clearTimeout(timeout); }
      loader.unlockUi();
      loader.removeLoader();
      exports.trigger(EVENT.success, result, textStatus, xhr);
    },
    error: function(status) {
      if(timeout) { clearTimeout(timeout); }
      loader.lockUi();
      loader.removeLoader();
    }
  });
};

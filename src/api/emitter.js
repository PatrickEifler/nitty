var Backbone = require("backbone"),
    $ = require("jquery"),
    L = require("lodash"),
    EVENT = require("./event"),
    ajax_loader = require("../main").ajax_loader,
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
      ajax_loader.lockUi();
      if(timeout) { clearTimeout(timeout); }
      timeout = setTimeout(function() {
        ajax_loader.showLoader();
      }, 500);
    },
    success: function(result, textStatus, xhr) {
      if(timeout) { clearTimeout(timeout); }
      ajax_loader.unlockUi();
      ajax_loader.removeLoader();
      exports.trigger(EVENT.success, result, textStatus, xhr);
    },
    error: function(status) {
      if(timeout) { clearTimeout(timeout); }
      ajax_loader.lockUi();
      ajax_loader.removeLoader();
    }
  });
};

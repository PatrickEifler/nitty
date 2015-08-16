var Backbone = require("backbone"),
    L = require("lodash"),
    API_EVENT = require("./event");

var ApiScoper = (function() {
  var Constr;

  Constr = function (api, selector) {
    L.extend(this, Backbone.Events);
    var scopes = Array.prototype.slice.call(arguments, 1);
    this.api = api;
    this.scope_selector = scopes.length > 1 ? scopes : selector;
    this.xhrsRunning = [];
    this.EVENT = API_EVENT;
    this.initializeEventListeners();
  };

  Constr.prototype.initializeEventListeners = function () {

    var self = this;
    if(self.isArray(self.scope_selector)) {
      L.forEach(self.scope_selector, function (selector) {
        var SELECTOR_SUCCESS = "success_"+selector;
        self.api.on(self.EVENT.SUCCESS, function(result, textStatus, xhr){
          self.processResult(result, selector, xhr, SELECTOR_SUCCESS);
        });
      });
    } else {
      self.api.on(self.EVENT.SUCCESS, function(result, textStatus, xhr){
        self.processResult(result, self.scope_selector, xhr);
      });
      self.api.on(self.EVENT.ERROR, function(serverError, textStatus, xhr){
        if(L.contains(self.xhrsRunning, xhr)){
          L.without(self.xhrsRunning, xhr);
        }
        self.trigger(self.EVENT.SERVER_ERROR, serverError, textStatus);
      });
    }
  };

  Constr.prototype.processResult = function(result, scope_selector, xhr, success_event) {
    var _success_event = success_event || this.EVENT.SUCCESS;

    if(this.hasSelectedScope(result, scope_selector)) { //scoped result
      this.trigger(_success_event, result[scope_selector]);
    }
    else if(typeof scope_selector === "undefined") {
      this.trigger("_success_response_", result);
    }
    else if(this.hasError(result, xhr)){ //error
      L.without(this.xhrsRunning, xhr);
      this.trigger(this.EVENT.ERROR, result.error);
    }
    else if (this.isEmptyScope(result, scope_selector)) { //empty result
      if(scope_selector === "error") {
        this.trigger(this.EVENT.CLEAR_ERRORS);
      }
    }
  };

  Constr.prototype.hasSelectedScope = function(result, scope_selector) {
    return L.has(result, scope_selector) && !L.isEmpty(result[scope_selector]);
  };

  Constr.prototype.hasError = function (result, xhr) {
    return L.has(result, "error") || L.has(result, "error") && L.contains(this.xhrsRunning, xhr);
  };

  Constr.prototype.isEmptyScope = function (result, scope_selector) {
    return L.has(result, scope_selector) === false || L.size(result[scope_selector]) === 0;
  };

  Constr.prototype.send = function(action, args, options){
    this.xhrsRunning.push(this.api.send(action, args, options));
  };

  Constr.prototype.isArray = function(obj) {
    return Object.prototype.toString.call( obj ) === '[object Array]';
  };

  return Constr;
}());

exports.Class = ApiScoper;

var L = require("lodash"),
    dispatcher = require("../patterns/dispatcher/event_dispatcher"),
    API_EVENT = require("./event");

var ApiScoper = (function() {
  var Constr;

  Constr = function (api, selector) {
    dispatcher.exportTo(this);
    var scopes = Array.prototype.slice.call(arguments, 1);
    this.api = api;
    this.scope_selector = scopes.length > 1 ? scopes : selector;
    this.xhrsRunning = [];
    this.EVENT = API_EVENT;
    this.selector_success = "success_"+selector;
    this.initializeEventListeners();
  };

  Constr.prototype.initializeEventListeners = function () {

    var self = this;
    if(self.isArray(self.scope_selector)) {
      L.forEach(self.scope_selector, function (selector) {
        self.api.listen(self.EVENT.SUCCESS, function(result, responseData){
          self.processResult(
            result,
            selector,
            self.selector_success,
            responseData.xhr
          );
        });
      });
    } else {
      self.api.listen(self.EVENT.SUCCESS, function(result, responseData){
        self.processResult(
          result,
          self.scope_selector,
          self.selector_success,
          responseData.xhr
        );
      });
      self.api.listen(self.EVENT.ERROR, function(error_response){
        if(L.contains(self.xhrsRunning, error_response.xhr)){
          L.without(self.xhrsRunning, error_response.xhr);
        }
        self.dispatch(
          self.EVENT.SERVER_ERROR,
          {
            responseText: error_response.responseText,
            textStatus: error_response.textStatus,
            error: error_response.error
          }
        );
      });
    }
  };

  Constr.prototype.processResult = function(result, scope_selector, success_event, xhr) {
    var _success_event = success_event || API_EVENT.SUCCESS;

    if(this.hasSelectedScope(result, scope_selector)) { //scoped result
      this.dispatch(_success_event, result[scope_selector]);
    }
    else if(typeof scope_selector === "undefined") {
      this.dispatch("_success_response_", result);
    }
    else if(this.hasError(result, xhr)){ //error
      L.without(this.xhrsRunning, xhr);
      this.dispatch(this.EVENT.ERROR, result.error);
    }
    else if (this.isEmptyScope(result, scope_selector)) { //empty result
      if(scope_selector === "error") {
        this.dispatch(this.EVENT.CLEAR_ERRORS);
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

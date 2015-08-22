var EventDispatcher = (function () {
  var _EventDispatcher = function() {},

    eventListeners = {},

    listen = function(eventName, callback) {
      var listeners = eventListeners[eventName];
      if(listeners === undefined) {
        listeners = eventListeners[eventName] = [];
      }
      listeners.push(callback);
    },

    unlisten = function(eventName, registered_callback) {
      var listeners = eventListeners[eventName],
          callbackIndex;
      if(typeof listeners === 'undefined') { return; }

      callbackIndex = listeners.indexOf(registered_callback);

      if(callbackIndex === -1) { return; }
      listeners.splice(callbackIndex, 1);
    },

    dispatch = function(eventName, data) {
      var listeners = eventListeners[eventName];
      if(typeof listeners === "undefined") { return; }

      for(var i=0, len = listeners.length; i < len; i++) {
        listeners[i](data);
      }
    },

    scopedDispatch = function(eventName, data, selector) {
      var listeners = eventListeners[eventName];
      if(typeof listeners === "undefined") { return; }

      for(var i=0, len = listeners.length; i < len; i++) {
        listeners[i](data[selector]);
      }
    },

    exportTo = function (obj) {
      obj.listen = listen;
      obj.unlisten = unlisten;
      obj.dispatch = dispatch;
      obj.scopedDispatch = scopedDispatch;
    };

  return {
    listen: listen,
    unlisten: unlisten,
    dispatch: dispatch,
    scopedDispatch: scopedDispatch,
    exportTo: exportTo
  };
}());

module.exports = {
  listen: EventDispatcher.listen,
  unlisten: EventDispatcher.unlisten,
  dispatch: EventDispatcher.dispatch,
  scopedDispatch: EventDispatcher.scopedDispatch,
  exportTo: EventDispatcher.exportTo
};
var initialize = exports.initialize = function() {
  var _listen = listen,
      _unlisten = unlisten,
      _dispatch = dispatch;

  return {
    listen: _listen,
    unlisten: _unlisten,
    dispatch: _dispatch,
    export_self_to: function(target) {
      target.listen = _listen;
      target.unlisten = _unlisten;
      target.dispatch = _dispatch;
    }
  };
};

var eventListeners = {};

var listen = module.exports.listen = function(eventName, callback) {
  var listeners = eventListeners[eventName];
  if(listeners === undefined) {
    listeners = eventListeners[eventName] = [];
  }
  listeners.push(callback);
};

var unlisten = module.exports.unlisten = function(eventName, registered_callback) {
  var listeners = eventListeners[eventName],
      callbackIndex;
  if(typeof listeners === 'undefined') { return; }

  callbackIndex = listeners.indexOf(registered_callback);

  if(callbackIndex === -1) { return; }
  listeners.splice(callbackIndex, 1);
};

var dispatch = module.exports.dispatch = function(eventName, data) {
  var listeners = eventListeners[eventName];
  if(typeof listeners === "undefined") { return; }

  for(var i=0, len = listeners.length; i < len; i++) {
    listeners[i](data);
  }
};

var scopedDispatch = module.exports.scopedDispatch = function(eventName, data, selector) {
  var listeners = eventListeners[eventName];
  if(typeof listeners === "undefined") { return; }

  for(var i=0, len = listeners.length; i < len; i++) {
    listeners[i](data[selector]);
  }
};

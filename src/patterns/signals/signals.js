/* A Signal is similar to an Event Emitter/Dispatcher or a Pub/Sub system,
 * the main difference is that each event type has its own controller and
 * doesn't rely on strings to broadcast/subscribe to events.
*/

var SignalRegister = require("./signal_register");

module.exports.initSignal = function() {
  return new Signal();
};

var Signal = (function () {
  var _Signal,
    _shouldPropagate = true;

  _Signal = function() {
    var self = this;

    self._bindings = [];
    self._prevParams = null;
    self._memorize = false;

    this.dispatch = function() {
      _Signal.prototype.dispatch.apply(self, arguments);
    };

    self.register = SignalRegister.init(
      self._bindings,
      self._memorize,
      self._prevParams
    );
  };

  _Signal.prototype = {
    version: 1.0,

    active: true,

    hasListener: function (listener, context) {
      return this.register.indexOfListener(listener, context) !== -1;
    },

    addListener: function (listener, listenerContext, priority) {
      this.register.validateListener(listener, 'addListener');
      return this.register.registerListener(
        listener,
        false,
        listenerContext,
        priority
      );
    },

    addListenerOnce: function (listener, listenerContext, priority) {
      this.register.validateListener(listener, 'addOnce');
      return this.register.registerListener(
        listener,
        true,
        listenerContext,
        priority
      );
    },

    removeListener: function (listener, context) {
      this.register.validateListener(listener, 'removeListener');

      var i = this.register.indexOfListener(listener, context);
      if (i !== -1) {
        this._bindings[i]._destroy();
        this._bindings.splice(i, 1);
      }
      return listener;
    },

    removeAllListeners: function () {
      var n = this._bindings.length;
      while (n--) {
        this._bindings[n]._destroy();
      }
      this._bindings.length = 0;
    },

    getNumberOfListeners: function () {
      return this._bindings.length;
    },

    stopPropagation: function () {
      this._shouldPropagate = false;
    },

    dispatch: function (params) {
      if (! this.active) {
        return;
      }

      var paramsArr = Array.prototype.slice.call(arguments),
          n = this._bindings.length,
          bindings;

      if (this._memorize) {
        this._prevParams = paramsArr;
      }

      if (! n) {
        return;
      }

      bindings = this._bindings.slice();
      this._shouldPropagate = true;

      do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
    },

    forget: function(){
      this._prevParams = null;
    },

    dispose: function () {
      this.removeAll();
      delete this._bindings;
      delete this._prevParams;
    },

    toString: function () {
      return '[Signal active:'+ this.active +' numListeners:'+ this.getNumberOfListeners() +']';
    }

  };

  return _Signal;
}());

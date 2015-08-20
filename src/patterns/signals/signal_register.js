var SignalBinder = require("./signal_binder");

var SignalRegister = (function () {
  var _SignalRegister = function (bindings, shouldMemorize, previousParams) {
    this.bindings = bindings;
    this.shouldMemorize = shouldMemorize;
    this.previousParams = previousParams;
  };

  _SignalRegister.prototype = {
    version: 1.0,

    validateListener: function(listener, fnName) {
      if (typeof listener !== 'function') {
        throw new Error(
          'Listener is missing - type === function'
        );
      }
    },

    registerListener: function (listener, isOnce, listenerContext, priority) {
      var prevIndex = this.indexOfListener(listener, listenerContext),
          binding;

      if (prevIndex !== -1) {
        binding = this.bindings[prevIndex];
        if (binding.isOnce() !== isOnce) {
          throw new Error(
            'Invalid listener remove the relationship first. Then add it once.'
          );
        }
      } else {
        binding = SignalBinder.init(
          this,
          listener,
          isOnce,
          listenerContext,
          priority
        );
        this.addBinding(binding);
      }

      if(this.shouldMemorize && this.previousParams){
        binding.execute(this.previousParams);
      }

      return binding;
    },

    addBinding: function (binding) {
      var n = this.bindings.length;
      do { --n; } while (this.bindings[n] && binding._priority <= this.bindings[n]._priority);
      this.bindings.splice(n + 1, 0, binding);
    },

    indexOfListener: function (listener, context) {
      var n = this.bindings.length,
          cur;
      while (n--) {
        cur = this.bindings[n];
        if (cur._listener === listener && cur.context === context) {
          return n;
        }
      }
      return -1;
    }
  };

  return _SignalRegister;
}());

exports.init = function (bindings, shouldMemorize, previousParams) {
  return new SignalRegister(bindings, shouldMemorize, previousParams);
};





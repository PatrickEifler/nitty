/* A Signal is similar to an Event Emitter/Dispatcher or a Pub/Sub system,
 * the main difference is that each event type has its own controller and
 * doesn't rely on strings to broadcast/subscribe to events.
*/

// SIGNAL BINDING OBJECT
var SignalBinding = require("./signal_binding");

//INTERFACE
module.exports.initSignal = function() {
  return new Signal();
};

//SIGNAL OBJECT
var Signal = (function () {
  var _Signal,
      _validateListener = function(listener, fnName) {
        if (typeof listener !== 'function') {
          throw new Error(
            'listener is a required param of {fn}() and should be a Function.'
            .replace('{fn}',
            fnName)
          );
        }
      };

  _Signal = function() {
    var self = this;

    self._bindings = [];
    self._prevParams = null;

    this.dispatch = function() {
      _Signal.prototype.dispatch.apply(self, arguments);
    };
  };

  _Signal.prototype = {
    version: 1.0,

    memorize: false,
    active: true,

    has : function (listener, context) {
      return this._indexOfListener(listener, context) !== -1;
    },

    add : function (listener, listenerContext, priority) {
      _validateListener(listener, 'add');
      return this._registerListener(listener, false, listenerContext, priority);
    },

    addOnce : function (listener, listenerContext, priority) {
      _validateListener(listener, 'addOnce');
      return this._registerListener(listener, true, listenerContext, priority);
    },

    remove : function (listener, context) {
      _validateListener(listener, 'remove');

      var i = this._indexOfListener(listener, context);
      if (i !== -1) {
        this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
        this._bindings.splice(i, 1);
      }
      return listener;
    },

    removeAll : function () {
      var n = this._bindings.length;
      while (n--) {
        this._bindings[n]._destroy();
      }
      this._bindings.length = 0;
    },

    getNumListeners : function () {
      return this._bindings.length;
    },

    halt : function () {
      this._shouldPropagate = false;
    },

    /**
    * Dispatch/Broadcast Signal to all listeners added to the queue.
    * @param {...*} [params] Parameters that should be passed to each handler.
    */
    dispatch : function (params) {
      if (! this.active) {
        return;
      }

      var paramsArr = Array.prototype.slice.call(arguments),
          n = this._bindings.length,
          bindings;

      if (this.memorize) {
        this._prevParams = paramsArr;
      }

      if (! n) {
        //should come after memorize
        return;
      }

      bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
      this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

      //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
      //reverse loop since listeners with higher priority will be added at the end of the list
      do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
    },

    /**
   * Forget memorized arguments.
   * @see Signal.memorize
   */
    forget : function(){
      this._prevParams = null;
    },

    /**
    * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
    * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
    */
    dispose : function () {
      this.removeAll();
      delete this._bindings;
      delete this._prevParams;
    },

    toString : function () {
      return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
    },

    // @private

    _shouldPropagate: true,

    _registerListener : function (listener, isOnce, listenerContext, priority) {
      var prevIndex = this._indexOfListener(listener, listenerContext),
          binding;

      if (prevIndex !== -1) {
        binding = this._bindings[prevIndex];
        if (binding.isOnce() !== isOnce) {
          throw new Error(
            'You cannot add'+ (isOnce? '' : 'Once') +
            '() then add'+ (!isOnce? '' : 'Once') +
            '() the same listener without removing the relationship first.'
          );
        }
      } else {
        binding = SignalBinding.init(
          this,
          listener,
          isOnce,
          listenerContext,
          priority
        );
        this._addBinding(binding);
      }

      if(this.memorize && this._prevParams){
        binding.execute(this._prevParams);
      }

      return binding;
    },

    _addBinding : function (binding) {
      //simplified insertion sort
      var n = this._bindings.length;
      do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
      this._bindings.splice(n + 1, 0, binding);
    },

    _indexOfListener : function (listener, context) {
      var n = this._bindings.length,
          cur;
      while (n--) {
        cur = this._bindings[n];
        if (cur._listener === listener && cur.context === context) {
          return n;
        }
      }
      return -1;
    }

  };

  return _Signal;
}());

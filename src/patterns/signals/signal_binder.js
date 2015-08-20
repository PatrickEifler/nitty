var _SignalBinder = (function() {
  var _SignalBinderConstr = function(signal, listener, isOnce, listenerContext, priority) {
    this._listener = listener;
    this._isOnce = isOnce;
    this.context = listenerContext;
    this._signal = signal;
    this._priority = priority || 0;
  };

  _SignalBinderConstr.prototype = {
    version: 1.0,

    active : true,
    params : null,

    execute : function (paramsArr) {
      var handlerReturn, params;
      if (this.active && !!this._listener) {
        params = this.params? this.params.concat(paramsArr) : paramsArr;
        handlerReturn = this._listener.apply(this.context, params);
        if (this._isOnce) {
          this.detach();
        }
      }
      return handlerReturn;
    },

    detach : function () {
      return this.isBound()? this._signal.remove(this._listener, this.context) : null;
    },

    isBound : function () {
      return (!!this._signal && !!this._listener);
    },

    isOnce : function () {
      return this._isOnce;
    },

    getListener : function () {
      return this._listener;
    },

    getSignal : function () {
      return this._signal;
    },

    _destroy : function () {
      delete this._signal;
      delete this._listener;
      delete this.context;
    },

    toString : function () {
      return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
    }

  };

  return _SignalBinderConstr;
}());

module.exports.init = function(signal, listener, isOnce, listenerContext, priority) {
  return new _SignalBinder(signal, listener, isOnce, listenerContext, priority);
};

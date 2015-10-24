var signals = require("../patterns/signals/signals"),
    L = require("lodash");

var Ctrl = (function() {

  var _Ctrl = function(api, signal, context, dataMapper) {

    /*
      * Base Ctrl - Constructor
      *
      * @api (type: Api)
      * The api the ctrl should register to
      *
      * @signal (type: Signal)
      * The signal the ctrl should register and dispatch
      *
      * @context (type: Object)
      * The context object encapsulates the objects
      * which will be bound to the signal
      *
      * @dataMapper (type: Function)
      * The dataMapper function represents the callback for custom
      * manipulation on the api update params
    */

    this.api = api;
    this.signal = signal;
    this.context = context;
    this.dataMapper = dataMapper;

    this.initializeSignal();
    this.registerToApiUpdateStream();
  };

  _Ctrl.prototype = {
    version: 1.0,

    initializeSignal: function() {
      var _self           = this,
          _context        = _self.context,
          _registerSignal = function(callback, context) {
            _self.signal.addListener(callback, context);
          };

      _self.signal   = signals.initSignal();

      if (L.isArray(_context)) {
        L.forEach(_context, function(c) {
          _registerSignal(c.set, c);
        });
      } else {
        _registerSignal(_context.set, _context);
      }
    },

    registerToApiUpdateStream: function() {
      var self = this,
          apiScope = self.api.scope,
      updateCallback = function(params) {
        self.dispatchUpdatedSignal(
          self.dataMapper(L.merge(params, {scope: apiScope}))
        );
      };

      self.api.onUpdateDo(updateCallback);
    },

    dispatchUpdatedSignal: function(signalParams) {
      this.signal.dispatch(signalParams);
    }

  };

  return _Ctrl;
}());

exports.createInstance = function(api, signal, context, dataMapper) {
  return new Ctrl(api, signal, context, dataMapper);
};

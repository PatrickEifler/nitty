"use strict";

var signals = require("../index").signals,
    L = require("lodash");

var BaseCtrl = (function() {

  var _BaseCtrl = function(api, signal, context, dataMapper) {

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

  _BaseCtrl.prototype = {
    version: 1.0,

    initializeSignal: function() {
      var _self           = this,
          _context        = _self.context,
          _registerSignal = function(callback, context) {
            _self.signal.add(callback, context);
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
      updateCallback = function(params) {
        self.dispatchUpdatedSignal(
          self.dataMapper(params)
        );
      };

      self.api.onUpdateDo(updateCallback);
    },

    dispatchUpdatedSignal: function(signalParams) {
      this.signal.dispatch(signalParams);
    }

  };

  return _BaseCtrl;
}());

exports.createInstance = function(api, signal, context, dataMapper) {
  return new BaseCtrl(api, signal, context, dataMapper);
};

/**
  Example:

      var out = require("commons").out;
      out.log("Hello World!");
      out.warn("OMG!");
*/

// base

exports.base_ctrl = require("./base/ctrl");


// utils

exports.ajax_loader = require("./utils/ajax_loader");
exports.abbreviator = require("./utils/abbreviator");

// patterns

exports.singleton = require("./factory/singleton_factory");
exports.observer_subject = require("./patterns/observer/subject");
exports.dispatcher = require("./patterns/dispatcher/event_dispatcher");
exports.signals = require("./patterns/signals/signals");
exports.object_creator = require("./patterns/object/object_create_polyfill");

// query

exports.query_builder = require("./query/query_builder");
exports.query_cleaner = require("./query/query_cleaner");
exports.querier = require("./query/querier");
exports.query_base_ctrl = require("./query/query_base_ctrl");


// api

exports.api_event = require("./api/event");
exports.api_scoper = require("./api/scoper");
exports.emitter = require("./api/emitter");

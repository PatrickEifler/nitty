/**
  Example:
    var ctrl = require("nitty").ctrl;
*/

// base

exports.ctrl = require("./base/ctrl");
exports.context = require("./base/context");
exports.api = require("./base/api");
exports.presenter = require("./base/presenter");

// api

exports.api_event = require("./api/event");
exports.api_scoper = require("./api/scoper");
exports.emitter = require("./api/emitter");

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


// utils

exports.ajax_loader = require("./utils/ajax_loader");
exports.abbreviator = require("./utils/abbreviator");
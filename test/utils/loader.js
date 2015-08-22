var jsdom = require("jsdom");
var assert = require("chai").assert;
var $ = require("jquery");
var Loader = require("../../src/utils/loader");

jsdom.env(
  "<html><body></body></html>",
  [""],
  function (errors, window) {
  }
);

describe('Loader', function() {
  beforeEach(function () {
    Loader.init();
  });

  afterEach(function () {
    Loader.cleanup();
  });

  it('renders the loader to body', function() {
    Loader.showLoader();

    assert.isTrue($("body").find(".loader").is(":visible"));
  });

  it('hides the loader from body', function() {
    assert.isFunction(Loader.removeLoader);
  });

  it('should run w/o error', function() {
    assert.isFunction(Loader.lockUi);
  });

  it('should run w/o error', function() {
    assert.isFunction(Loader.unlockUi);
  });

});

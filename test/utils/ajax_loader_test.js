GLOBAL.window = require("jsdom").jsdom().parentWindow;

var assert = require("assert");

var AjaxLoader = require("../../src/utils/ajax_loader");

describe('AjaxLoader', function() {
  describe('#showLoader()', function() {
    it('should run w/o error', function() {
      AjaxLoader.showLoader();
    });
  });
  describe('#removeLoader()', function() {
    it('should run w/o error', function() {
      AjaxLoader.removeLoader();
    });
  });
  describe('#lockUi()', function() {
    it('should run w/o error', function() {
      AjaxLoader.lockUi();
    });
  });
  describe('#unlockUi()', function() {
    it('should run w/o error', function() {
      AjaxLoader.unlockUi();
    });
  });
});

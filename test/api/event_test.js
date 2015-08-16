var assert = require("chai").assert;

var ApiEvent = require("../../src/api/event");

describe('ApiEvent', function() {
  describe('.EVENT', function() {
    it('should return a hash of events', function() {

      assert.isString(ApiEvent.ERROR);
      assert.isString(ApiEvent.SUCCESS);
      assert.isString(ApiEvent.SERVER_ERROR);
      assert.isString(ApiEvent.CLEAR_ERRORS);
    });
  });
});

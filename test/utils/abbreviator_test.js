var chai = require("chai");

var abbreviator = require("../../src/utils/abbreviator");

describe("Abbreviator Test", function () {

  it("responds to shortenNumber", function() {
    chai.expect(abbreviator).to.respondTo('shortenNumber');
  });

  it("responds to unshortNumber", function() {
    chai.expect(abbreviator).to.respondTo('unshortNumber');
  });

  it("rounds a number to one decimal places and add the m suffix", function() {
    var number = "1739668";
    var shortenedNumber = abbreviator.shortenNumber(number);
    chai.assert.strictEqual(shortenedNumber, 1.7);

    number = 1967386;
    shortenedNumber = abbreviator.shortenNumber(number);
    chai.assert.strictEqual(shortenedNumber, 1.9);
  });

  it("converts a rounded number back to its full size", function() {
    var number = "1739668";
    var shortenedNumber = abbreviator.shortenNumber(number);
    var unShortenedNumber = abbreviator.unshortNumber(shortenedNumber);

    chai.assert.strictEqual(unShortenedNumber, 1700000);
  });

  it("converts another bigger rounded number", function() {
    var number = 165923887;
    var shortenedNumber = abbreviator.shortenNumber(number);
    chai.assert.strictEqual(shortenedNumber, 165.9);

    var unShortenedNumber = abbreviator.unshortNumber(shortenedNumber);

    chai.assert.strictEqual(unShortenedNumber, 165900000);
  });

});

var assert = require("chai").assert;
var sinon = require("sinon");
var ObserverSubject = require("../../src/patterns/observer/subject");

describe("Observer Subject Test", function () {
  beforeEach(function() {
    this.subjectInstance = ObserverSubject.createInstance();
    this.observer = {
      update: function () { return "done"; }
    };
  });

  afterEach(function() {
    this.subjectInstance = undefined;
    this.observer = undefined;
  });

  it("creates an instance", function() {
    assert.isObject(this.subjectInstance);
    assert.property(this.subjectInstance, "addObserver");
    assert.property(this.subjectInstance, "removeObserver");
    assert.property(this.subjectInstance, "notifyObservers");
  });

  it("observes an object", function() {
    this.subjectInstance.addObserver(this.observer);
    assert.lengthOf(this.subjectInstance._list, 1);
  });

  it("unobserves an object", function() {
    this.subjectInstance.removeObserver(this.observer);
    assert.lengthOf(this.subjectInstance._list, 0);
  });

  it("notifies the observers which calls the update callback", function() {
    var anotherObserver = {update: function () {}};
    sinon.spy(this.observer, "update");
    sinon.spy(anotherObserver, "update");

    this.subjectInstance.addObserver(this.observer);
    this.subjectInstance.addObserver(anotherObserver);
    this.subjectInstance.notifyObservers();

    sinon.assert.calledOnce(this.observer.update);
    sinon.assert.calledOnce(anotherObserver.update);
  });

});

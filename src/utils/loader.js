var $ = require("jquery"),
    L = require("lodash"),
    loader_tmpl = require("./templates/loader"),
    locker_tmpl = require("./templates/lock_ui");

var DOM = {
    scope: "body",
    loader: ".loader",
    lock_ui: ".lock-ui"
  },
  selector = {
    $loader: undefined,
    $locker: undefined
  };

var setSelectors = function() {
  if(typeof selector.$loader === "undefined") {
    selector.$loader = $(DOM.loader);
  }
  if(typeof selector.$locker === "undefined") {
    selector.$locker = $(DOM.scope).find(DOM.lock_ui);
  }
};

var init = function() {
  setSelectors();

  $(DOM.scope).prepend(loader_tmpl);
  $(DOM.scope).append(locker_tmpl);
  $(DOM.scope).children(DOM.loader).hide();
  $(DOM.scope).children(DOM.lock_ui).hide();

  var onScroll = L.throttle(function(){
    var scrollPos = $(window).scrollTop();
    selector.$loader.css("padding-top", (scrollPos - 100) + "px");
  });

  var $doc = $(document);
  $doc.scroll(onScroll);

  onScroll();
};

$(function() {
  L.once(function(){
   init();
  });
});

exports.init = init;

exports.showLoader = function () {
  setSelectors();
  selector.$loader.show();
};

exports.removeLoader = function() {
  setSelectors();
  selector.$loader.hide();
};

exports.lockUi = function() {
  setSelectors();
  selector.$locker.show();
};

exports.unlockUi = function() {
  setSelectors();
  selector.$locker.hide();
};

exports.cleanup = function() {
  $(DOM.scope).find(DOM.loader).remove();
  $(DOM.scope).find(DOM.lock_ui).remove();
};
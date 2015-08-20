var $ = require("jquery"),
    L = require("lodash");

var DOM = {
    scope: "body",
    ajax_loader: ".loader",
    lock_ui: ".lock-ui"
  },
  selector = {
    $loader: undefined,
    $locker: undefined
  },
  loader_tmpl = '<div class="loader"><div class="loader-gif"></div></div>',
  locker_tmpl = '<div class="lock-ui"></div>';


var setSelectors = function() {
  if(typeof selector.$loader === "undefined") {
    selector.$loader = $(DOM.ajax_loader);
  }
  if(typeof selector.$locker === "undefined") {
    selector.$locker = $(DOM.scope).children(DOM.lock_ui);
  }
};

var init = function() {
  $(DOM.scope).prepend(loader_tmpl);
  $(DOM.scope).append(locker_tmpl);
  $(DOM.scope).children(DOM.ajax_loader).hide();
  $(DOM.scope).children(DOM.lock_ui).hide();

  var onScroll = L.throttle(function(){
    var scrollPos = $(window).scrollTop();
    $(DOM.ajax_loader).css("padding-top", (scrollPos - 100) + "px");
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

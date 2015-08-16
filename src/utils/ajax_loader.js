"use strict";

var $ = require("jquery"),
    L = require("lodash");

var DOM = {
    neo_scope: ".neo .neo-inner-content",
    ajax_loader: ".neo_ajax_loader",
    lock_until_loaded: ".lock_until_loaded"
  },
  selector = {
    $loader: undefined,
    $locker: undefined
  },
  loader_tmpl = '<div class="neo_ajax_loader"><div class="loader-gif"></div></div>',
  locker_tmpl = '<div class="lock_until_loaded"></div>';


var setSelectors = function() {
  if(typeof selector.$loader === "undefined") {
    selector.$loader = $(DOM.ajax_loader);
  }
  if(typeof selector.$locker === "undefined") {
    selector.$locker = $(DOM.neo_scope).children(DOM.lock_until_loaded);
  }
};

$(function() {
  L.once(function(){
    $(DOM.neo_scope).first().prepend(loader_tmpl);
    $(DOM.neo_scope).first().append(locker_tmpl);
    $(DOM.neo_scope).children(DOM.ajax_loader).hide();
    $(DOM.neo_scope).children(DOM.lock_until_loaded).hide();

    var onScroll = L.throttle(function(){
      var scrollPos = $(window).scrollTop();
      $(DOM.ajax_loader).css("padding-top", (scrollPos - 100) + "px");
    });

    var $doc = $(document);
    $doc.scroll(onScroll);

    onScroll();
  });
});

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

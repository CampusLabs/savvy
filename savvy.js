(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'underscore'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'), require('underscore'));
  } else {
    root.Savvy = factory(root.jQuery, root._);
  }
})(this, function ($, _) {
  'use strict';

  var Savvy = window.Savvy = function (el, dfd, options) {
    _.extend(this, options);
    this.setElement(el);
    if (dfd) this.setDfd(dfd);
  };

  _.extend(Savvy.prototype, {
    pendingContent: '',
    doneContent: '',
    failContent: '',
    duration: -1,

    setElement: function (el) {
      this.$el = el instanceof $ ? el : $(el);
      this.method = this.$el.is(':input:not(button)') ? 'val' : 'html';
      return this;
    },

    setDfd: function (dfd) {
      this.reset();
      var self = this;
      var $el = this.$el;
      var method = this.method;
      this.storedClass = $el.attr('class');
      this.storedContent = $el[method]();
      $el.addClass('js-savvy-pending')[method](self.pendingContent);
      this.dfd = dfd
        .done(function () {
          if (self.dfd !== dfd) return;
          $el.addClass('js-savvy-done')[method](self.doneContent);
        })
        .fail(function () {
          if (self.dfd !== dfd) return;
          $el.addClass('js-savvy-fail')[method](self.failContent);
        })
        .always(function () {
          if (self.dfd !== dfd) return;
          $el.removeClass('js-savvy-pending');
          var duration = self.duration;
          if (duration < 0) return;
          if (duration === 0) return self.reset();
          _.delay(function () {
            if (self.dfd !== dfd) return;
            self.reset();
          }, duration);
        });
      return this;
    },

    reset: function () {
      if (!this.dfd) return this;
      this.dfd = null;
      this.$el.attr('class', this.storedClass)[this.method](this.storedContent);
      return this;
    }
  });
});

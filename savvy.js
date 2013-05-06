(function () {
  'use strict';

  // Store a local reference to jQuery and Underscorea.
  var $ = window.jQuery;
  var _ = window._;

  var Savvy = window.Savvy = {
    defaults: {
      savingHtml: 'Saving...',
      savingClass: 'js-savvy-saving',
      savedHtml: 'Saved',
      savedClass: 'js-savvy-saved',
      errorHtml: 'Error',
      errorClass: 'js-savvy-error',
      duration: -1
    }
  };

  $.fn.savvy = function (jqXhr, options) {
    options = _.extend({}, Savvy.defaults, options);
    return $(this).savvyReset().each(function () {
      var $self = $(this);
      $self
        .data({
          savvyJqXhr: jqXhr,
          savvyHtml: $self.html(),
          savvyClass: $self.attr('class')
        })
        .html(options.savingHtml).addClass(options.savingClass);
      jqXhr
        .done(function () {
          if ($self.data('savvyJqXhr') !== jqXhr) return;
          $self.html(options.savedHtml).addClass(options.savedClass);
        })
        .fail(function () {
          if ($self.data('savvyJqXhr') !== jqXhr) return;
          $self.html(options.errorHtml).addClass(options.errorClass);
        })
        .always(function () {
          if ($self.data('savvyJqXhr') !== jqXhr) return;
          $self.removeClass(options.savingClass);
          var duration = options.duration;
          if (duration < 0) return;
          if (duration === 0) return $self.savvyReset();
          _.delay(function () {
            if ($self.data('savvyJqXhr') !== jqXhr) return;
            $self.savvyReset();
          }, duration);
        });
    });
  };

  $.fn.savvyReset = function () {
    return $(this).each(function () {
      var $self = $(this);
      var data = $self.data();
      $self.html(data.savvyHtml).attr('class', data.savvyClass);
    });
  };
})();

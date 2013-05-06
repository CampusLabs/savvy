(function () {
  'use strict';

  // Store a local reference to jQuery and Underscorea.
  var $ = window.jQuery;
  var _ = window._;

  var Savvy = window.Savvy = {
    defaults: {
      savingContent: 'Saving...',
      savingClass: 'js-savvy-saving',
      savedContent: 'Saved',
      savedClass: 'js-savvy-saved',
      errorContent: 'Error',
      errorClass: 'js-savvy-error',
      duration: -1
    }
  };

  $.fn.savvy = function (jqXhr, options) {
    options = _.extend({}, Savvy.defaults, options);
    return $(this).savvyReset().each(function () {
      var $self = $(this);
      var method = $self.is(':input:not(button)') ? 'val' : 'html';
      $self
        .data({
          savvyJqXhr: jqXhr,
          savvyContent: $self[method](),
          savvyClass: $self.attr('class')
        })
        .addClass(options.savingClass)[method](options.savingContent);
      jqXhr
        .done(function () {
          if ($self.data('savvyJqXhr') !== jqXhr) return;
          $self.addClass(options.savedClass)[method](options.savedContent);
        })
        .fail(function () {
          if ($self.data('savvyJqXhr') !== jqXhr) return;
          $self.addClass(options.errorClass)[method](options.errorContent);
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

      // If `savvyContent` hasn't been set, there is nothing to do here.
      if (data.savvyContent == null) return;
      var method = $self.is(':input:not(button)') ? 'val' : 'html';
      $self.attr('class', data.savvyClass)[method](data.savvyContent);
    });
  };
})();

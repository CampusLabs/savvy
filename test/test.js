(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var chai = window.chai;
  var mocha = window.mocha;
  var Savvy = window.Savvy;

  mocha.setup('bdd');
  var expect = chai.expect;

  var before = window.before;
  var describe = window.describe;
  var it = window.it;

  before(function () {
    this.html = '<strong>Save</strong>';
    this.classes = 'green button';
    this.$el = $('<button>').html(this.html).addClass(this.classes);
  });

  describe('$el.savvy(jqXhr, options)', function () {
    before(function () {
      _.extend(Savvy.defaults, {
        errorContent: 'Whoops!',
        errorClass: 'it broked'
      });
      this.options = _.defaults({
        savingContent: 'Saving the thing',
        savingClass: 'my saving classes'
      }, Savvy.defaults);
    });

    describe('immediately', function () {
      before(function () {
        this.$el.savvy(new $.Deferred(), this.options);
      });

      it('replaces $el html with "saving" html', function () {
        expect(this.$el.html()).to.equal(this.options.savingContent);
      });

      it('adds saving classes to $el', function () {
        expect(this.$el.attr('class')).to.include(this.options.savingClass);
      });
    });

    describe('after success', function () {
      before(function () {
        var dfd = new $.Deferred();
        this.$el.savvy(dfd, this.options);
        dfd.resolve();
      });

      it('replaces $el html with "saved" html on success', function () {
        expect(this.$el.html()).to.equal(this.options.savedContent);
      });

      it('adds "saved" classes to $el on success', function () {
        expect(this.$el.attr('class')).to.include(this.options.savedClass);
      });

      it('removes "saving" classes on $el', function () {
        expect(this.$el.attr('class'))
          .to.not.include(this.options.savingClass);
      });
    });

    describe('after error', function () {
      before(function () {
        var dfd = new $.Deferred();
        this.$el.savvy(dfd, this.options);
        dfd.reject();
      });

      it('replaces $el html with "error" html on error', function () {
        expect(this.$el.html()).to.equal(this.options.errorContent);
      });

      it('adds "error" classes to $el on error', function () {
        expect(this.$el.attr('class')).to.include(this.options.errorClass);
      });

      it('removes "saving" classes on $el', function () {
        expect(this.$el.attr('class'))
          .to.not.include(this.options.savingClass);
      });
    });
  });

  describe('$el.savvyReset()', function () {
    before(function () {
      this.$el.savvy(new $.Deferred(), this.options);
      this.$el.savvyReset();
    });

    it('resets $el to its previous html', function () {
      expect(this.$el.html()).to.equal(this.html);
    });

    it('resets $el to its previous classes', function () {
      expect(this.$el.attr('class')).to.equal(this.classes);
    });
  });

  mocha.run();
})();

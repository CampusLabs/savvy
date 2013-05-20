(function () {
  'use strict';

  mocha.setup('bdd');
  var expect = chai.expect;

  before(function () {
    this.content = '<strong>Save</strong>';
    this.classes = 'green button';
    this.$el = $('<button>').html(this.content).addClass(this.classes);
    this.dfd = new $.Deferred();
    this.options = {
      pendingContent: 'Working...',
      doneContent: 'Yay!',
      failContent: 'Whoops',
      duration: 1
    };
    this.savvy = new Savvy(this.$el, this.dfd, this.options);
  });

  describe('new Savvy(el, dfd, options)', function () {
    it('attaches $el to the instance', function () {
      expect(this.savvy.$el).to.equal(this.$el);
    });

    it('sets the correct content method', function () {
      expect(this.savvy.method).to.equal('html');
      expect((new Savvy('<input>')).method).to.equal('val');
    });

    it('sets the dfd object', function () {
      expect(this.savvy.dfd).to.equal(this.dfd);
    });

    it('extends the options hash onto the instance', function () {
      _.each(this.options, function (val, key) {
        expect(this[key]).to.equal(val);
      }, this.savvy);
    });
  });

  describe('Deferred state changes', function () {
    beforeEach(function () {
      this.savvy.setDfd(new $.Deferred());
    });

    it('sets correct pending class and content', function () {
      expect(this.savvy.$el.hasClass('js-savvy-pending')).to.be.true;
      expect(this.savvy.$el.html()).to.equal(this.savvy.pendingContent);
    });

    it('sets correct done class and content ', function () {
      this.savvy.dfd.resolve();
      expect(this.savvy.$el.hasClass('js-savvy-done')).to.be.true;
      expect(this.savvy.$el.html()).to.equal(this.savvy.doneContent);
    });

    it('sets correct fail class and content ', function () {
      this.savvy.dfd.reject();
      expect(this.savvy.$el.hasClass('js-savvy-fail')).to.be.true;
      expect(this.savvy.$el.html()).to.equal(this.savvy.failContent);
    });

    it('returns $el to the previous state after duration', function (done) {
      this.savvy.dfd.resolve();
      var self = this;
      _.delay(function () {
        expect(self.savvy.$el.html()).to.equal(self.content);
        expect(self.savvy.$el.attr('class')).to.equal(self.classes);
        done();
      }, this.options.duration);
    });
  });

  mocha.run();
})();

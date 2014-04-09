academy.Views.Lesson = cdb.core.View.extend({
  el: document.body,

  events: {
  },

  initialize: function() {
    _.bindAll(this, '_initBindings', '_onScroll');

    this.$header = this.$el.find('.header');
    this.$scrollInner = this.$el.find('#lss-scroll-recieve');
    this.scrollHeight = this.$scrollInner.outerHeight()-80;
    this.$progressBar = this.$el.find('.progress-bar');
    this.contentHeight = this.$el.find('.lss-inner').outerHeight();

    this._initBindings();
    this._initViews();
  },

  _initBindings: function() {
    $(window).on('scroll', this._onScroll);
  },

  _initViews: function() {
    var mapOptions = {
      scrollwheel: false
    }

    cartodb.createVis('cartodb-map', this.options.vizjson, mapOptions);
  },

  _onScroll: function() {
    if (this.$el.scrollTop() === 0) {
      if (this.$header.hasClass('border')) {
        this.$header.removeClass('border');
      }
    } else {
      if (!this.$header.hasClass('border')) {
        this.$header.addClass('border');
      }

      if (this.$el.scrollTop() <= this.scrollHeight) {
        if (this.$scrollInner.hasClass('scroll')) {
          this.$scrollInner.removeClass('scroll');
        }

        if (!this.$progressBar.hasClass('hide')) {
          this.$progressBar.addClass('hide');
          this.$progressBar.css('width', '0%');
        }
      } else {
        var value = this.$el.scrollTop()-this.scrollHeight,
            percentNum = (value*100)/this.contentHeight,
            percent = percentNum+'%';

        if (percentNum < 100) {
          this.$progressBar.css('width', percent);
        } else {
          this.$progressBar.css('width', '100%');
        }

        if (!this.$scrollInner.hasClass('scroll')) {
          this.$scrollInner.addClass('scroll');
        }

        if (this.$progressBar.hasClass('hide')) {
          this.$progressBar.removeClass('hide');
        }
      }
    }
  }
});

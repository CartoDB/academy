academy.Models.Lesson = cdb.core.Model.extend({
  defaults: {
    'progress': false
  }
});

academy.Views.Lesson = cdb.core.View.extend({
  el: document.body,

  events: {
    'mouseenter .progress-bar': '_showProgress',
    'mouseout .progress-bar': '_hideProgress'
  },

  initialize: function() {
    _.bindAll(this, '_initBindings', '_onScroll');

    this.model = new academy.Models.Lesson();

    this.model.on('change:progress', this._toggleProgress, this);

    this.$header = this.$('.header');
    this.$scrollInner = this.$('#lss-scroll-recieve');
    this.$progressBar = this.$('.progress-bar');
    this.$progressNum = this.$('.progress-num');
    this.$content = this.$('.crs-content');
    this.elHeight = this.$el.outerHeight();
    this.mapHeight = this.$('.lss-course').outerHeight();
    this.footerHeight = this.$('.footer').outerHeight();

    this._initBindings();
    this._initViews();
    this._onScroll();
  },

  _initBindings: function() {
    $(window)
      .on('scroll', this._onScroll)
      .on('resize', this._onScroll);
  },

  _initViews: function() {
    var mapOptions = {
      scrollwheel: false,
      zoomControl: false,
      cartodb_logo: false
    }

    cartodb.createVis('cartodb-map', this.options.vizjson, mapOptions)
    .done(function(vis){
      map = vis.getNativeMap();
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
    });

    this.dropdown = new academy.ui.Views.Dropdown();

    this._buildToc();
  },

  _buildToc: function() {
    var $item = $('<ul>'),
      $el,
      title,
      link;

    this.$content.find('h2').each(function() {
      $el = $(this);
      title = $el.text();
      link = "#" + $el.attr("id");
      $item.append('<p class="size-s crs-nav-info"><a href="'+link+'">'+title+'</a></p>');

      var $subItem = $('<ul>'),
        $subEl,
        subTitle,
        subLink;

      $(this).nextAll('h4,h3,h2').each(function(j) {
        if ($(this).is('h2')) return false;

        $subEl = $(this);
        subTitle = $subEl.text();
        subLink = "#" + $subEl.attr("id");

        $subItem.append('<p class="size-s crs-nav-info"><a href="'+subLink+'">'+subTitle+'</a></p>');
      });

      $item.append($subItem);
    });

    this.$(".nav-toc").append($item);
  },

  _showProgress: function() {
    clearTimeout(this.resizePID);

    if (!this.model.get('progress')) {
      this.model.set('progress', true);
    }
  },

  _hideProgress: function() {
    var that = this;

    this.resizePID = setTimeout(function() {
      if (that.model.get('progress')) {
        that.model.set('progress', false);
      }
    }, 1000);
  },

  _toggleProgress: function() {
    if (this.model.get('progress')) {
      this.$progressNum.fadeIn(150);
    } else {
      this.$progressNum.fadeOut(150);
    }
  },

  _onScroll: function() {
    var that = this;

    var pos = this.$el.scrollTop();

    if (pos === 0) {
      if (this.$header.hasClass('border')) {
        this.$header.removeClass('border');
      }
    } else {
      if (!this.$header.hasClass('border')) {
        this.$header.addClass('border');
      }
    }

    if (pos <= this.mapHeight) {
      if (this.scrollFinished) {
        this.$progressNum.hide();
        this.$progressBar.animate({
          width: '0%'
        }, 150, function() {
          if (!that.$progressBar.hasClass('hide')) {
            that.$progressBar.addClass('hide');
            that.$progressBar.css({
              'width': '0%',
              '-webkit-transition': 'none',
              'transition': 'none'
            });

            that.$progressNum.html('100% read');
          }
        });

        this.scrollFinished = false;
      }

      if (this.$scrollInner.hasClass('scroll')) {
        this.$scrollInner.removeClass('scroll');
      }
    } else {
      var scrollPercent = (100 * (pos+$(window).height())) / (this.elHeight-this.footerHeight);

      if (!this.$scrollInner.hasClass('scroll')) {
        var scrollPercent_ = (scrollPercent < 100) ? scrollPercent : 100;

        this.$scrollInner.addClass('scroll');

        this.$progressBar.animate({
          width: scrollPercent_+'%'
        }, 150, function() {
          that.scrollFinished = true;

          that.$progressBar.css({
            '-webkit-transition': 'width .15s linear',
            'transition': 'width .15s linear'
          });

          that.$progressNum.html(parseInt(scrollPercent_, 10)+'% read');
        });
      }

      if (this.scrollFinished) {
        if (scrollPercent < 100) {
          this.$progressBar.css({
            'width': scrollPercent+'%'
          });

          this.$progressNum.html(parseInt(scrollPercent, 10)+'% read');
        } else {
          this.$progressBar.css('width', '100%');
          this.$progressNum.html('100% read');
        }
      }

      if (this.$progressBar.hasClass('hide')) {
        this.$progressBar.removeClass('hide');
      }
    }
  }
});

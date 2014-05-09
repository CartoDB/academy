academy.Models.Lesson = cdb.core.Model.extend({
  defaults: {
    'progress': false
  }
});

academy.Views.Lesson = cdb.core.View.extend({
  el: document.body,

  events: {
    'mouseenter .progress-bar': '_showProgress',
    'mouseout .progress-bar': '_hideProgress',
    'mouseover .crs-content h3': '_showAnchor',
    'mouseout .crs-content h3': '_hideAnchor',
    'mouseout .crs-content h3 a': '_hideAnchor',
    'click .twitter a': '_onClickTwitter',
    'click .facebook a': '_onClickFacebook'
  },

  initialize: function() {
    _.bindAll(this, '_initBindings', '_onScroll');

    this.model = new academy.Models.Lesson();

    this.model.on('change:progress', this._toggleProgress, this);

    this.$header = this.$('.header');
    this.$scrollInner = this.$('#lss-scroll-recieve');
    this.$lssContainer = this.$('.lss-container');
    this.$progressBar = this.$('.progress-bar');
    this.$progressNum = this.$('.progress-num');
    this.$content = this.$('.crs-content');
    this.$sidebar = this.$('.crs-nav');
    this.contentPos = this.$('.crs-content').offset().top;
    this.mapHeight = this.$('.lss-course').outerHeight();
    this.footerHeight = this.$('.footer').outerHeight();
    this.sidebarPos = this.$('.crs-inner').offset().top-106;

    this._initViews();
    this._onScroll();
    this._initBindings();
  },

  _initBindings: function() {
    var that = this;

    $(window)
      .on('scroll', this._onScroll)
      .on('resize', this._onScroll);

    $('.nav-toc a').on('click', function(e) {
      window.router.navigate($(this).attr('href'), { trigger: true });

      that._goto(e);
    });
  },

  _initViews: function() {
    this.anchor = new cdb.core.Template({
      template: $("#anchor-template").html()
    });

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

  _onClickTwitter: function(e) {
    var href = $(e.target).attr('href');

    window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    ga('send', 'event', 'button', 'click', 'twitter');

    return false;
  },

  _onClickFacebook: function(e) {
    var href = $(e.target).attr('href');

    javascript:window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    ga('send', 'event', 'button', 'click', 'facebook');

    return false;
  },

  _goto: function(e) {
    e.preventDefault();

    var el = $(e.target).attr('href');

    this.$el.animate({
      scrollTop: $(el).offset().top-106
    });
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

  _showAnchor: function(e) {
    var $target = $(e.target).closest('h3'),
        $anchor = $target.find('.anchor');

    if ($anchor.length >= 1) {
      $anchor.show();
    } else {
      var $anchor_ = this.anchor.render({ url: $target.attr('id')})

      $target.append($anchor_);
    }
  },

  _hideAnchor: function(e) {
    $(e.target).find('.anchor').hide();
  },

  _onScroll: function() {
    var that = this;

    var pos = $(window).scrollTop();

    if (pos === 0) {
      if (this.$header.hasClass('border')) {
        this.$header.removeClass('border');
      }
    } else {
      if (!this.$header.hasClass('border')) {
        this.$header.addClass('border');
      }
    }

    if (pos >= this.sidebarPos) {
      if (!this.$sidebar.hasClass('fixed')) {
        this.$sidebar.addClass('fixed');
      }

      if (pos >= parseInt(($(document).height()-$(window).height()-this.footerHeight), 10)) {
        if (!this.$sidebar.hasClass('bottom')) {
          this.$sidebar.addClass('bottom');
        }
      } else {
        if (this.$sidebar.hasClass('bottom')) {
          this.$sidebar.removeClass('bottom');
        }
      }
    } else {
      if (this.$sidebar.hasClass('fixed')) {
        this.$sidebar.removeClass('fixed');
      }
    }

    if (pos <= this.mapHeight) {
      if (this.$scrollInner.hasClass('fixed')) {
        this.$scrollInner.removeClass('fixed');
      }

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

      if (this.$lssContainer.hasClass('scrolled')) {
        this.$lssContainer.removeClass('scrolled');
      }
    } else {
      var scrollPercent = (100 * (pos+$(window).height()-this.contentPos)) / this.$('.crs-content').outerHeight();

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

      if (!this.$scrollInner.hasClass('fixed')) {
        this.$scrollInner.addClass('fixed');
      }

      if (!this.$lssContainer.hasClass('scrolled')) {
        this.$lssContainer.addClass('scrolled');
      }
    }
  }
});

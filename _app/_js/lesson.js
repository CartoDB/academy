App.Views.Lesson = Backbone.View.extend({

  el: '.js-Lesson',

  initialize: function() {
    this.$content = this.$('.js-Content-inner');
    this.$subsidebar = this.$('.js-Subsidebar');

    this.$header = this.$('.js-Header');
    this.$subheader = this.$('.js-Subheader');

    this._initViews();
    this._initBindings();
  },

  _initAnchors: function() {
    // https://github.com/jekyll/jekyll/blob/master/site/_includes/anchor_links.html
    var anchorForId = function (id) {
      var anchor = document.createElement("a");
      anchor.className = "Title-link";
      anchor.href      = "#" + id;
      anchor.innerHTML = "<span class=\"sr-only\">Permalink</span><i class=\"icon icon-link\"></i>";
      anchor.title = "Permalink";
      return anchor;
    };
    var linkifyAnchors = function (level, containingElement) {
      var headers = containingElement.getElementsByTagName("h" + level);
      for (var h = 0; h < headers.length; h++) {
        var header = headers[h];
        if (typeof header.id !== "undefined" && header.id !== "") {
          header.appendChild(anchorForId(header.id));
        }
      }
    };
    document.onreadystatechange = function () {
      if (this.readyState === "complete") {
        var contentBlock = document.getElementsByClassName("js-Content-inner")[0];
        if (!contentBlock) {
          return;
        }
        for (var level = 1; level <= 6; level++) {
          linkifyAnchors(level, contentBlock);
        }
      }
    };
  },

  _initViews: function() {
    this._buildToc();
    this._initAnchors();
  },

  _initBindings: function() {
    var _this = this;

    $(document)
      .ready(function() {
        $('.sticky').Stickyfill();
        _this._fixSubheader();
      });

    $(window)
      .scroll(function() {
        _this._fixSubheader();
      })
      .resize(function() {
        _this._fixSubheader();
      });

    this.$content.find('h2, h3').waypoint({
      handler: function(direction) {
        if (direction == 'down') {
          _this.$('.js-Sidebar-item').removeClass('is-active');
          _this.$('.js-Subsidebar-list').removeClass('is-active');

          var $active = _this.$subsidebar.find('a[href="#' + this.element.id + '"]');

          // h3
          $active
            .closest('.js-Sidebar-item')
            .addClass('is-active');

          var $subactive = $active.closest('.js-Subsidebar-list');

          if ($subactive.children().length > 0) {
            $subactive.addClass('is-active');
          }

          // h2
          if (!$('.js-Subsidebar-list.is-active').length) {
            $subactive = $active.next('.js-Subsidebar-list');

            if ($subactive.children().length > 0) {
              $subactive.addClass('is-active');
            }

            $subactive
              .closest('.js-Sidebar-item')
              .addClass('is-active');
          }
        }
      },
      offset: $(window).height()
    });

    this.$content.find('h2, h3').waypoint({
      handler: function(direction) {
        if (direction == 'up') {
          _this.$('.js-Sidebar-item').removeClass('is-active');
          _this.$('.js-Subsidebar-list').removeClass('is-active');

          var $active = _this.$subsidebar.find('a[href="#' + this.element.id + '"]');

          // h3
          $active
            .closest('.js-Sidebar-item')
            .addClass('is-active');

          var $subactive = $active.closest('.js-Subsidebar-list');

          if ($subactive.children().length > 0) {
            $subactive.addClass('is-active');
          }

          // h2
          if (!$('.js-Subsidebar-list.is-active').length) {
            $subactive = $active.next('.js-Subsidebar-list');

            if ($subactive.children().length > 0) {
              $subactive.addClass('is-active');
            }

            $subactive
              .closest('.js-Sidebar-item')
              .addClass('is-active');
          }
        }
      }
    });
  },

  _buildToc: function() {
    var _this = this;

    this.$content.find('h2').each(function() {
      var $title = $(this);
      var title = $title.text();
      var link = '#' + $title.attr('id');

      var $item = $('<li class="Sidebar-item js-Sidebar-item Subsidebar-item js-Subsidebar-item">');

      $item.append('<a href="'+link+'" class="Sidebar-link">'+title+'</a>');

      var $subitem= $('<ul class="Subsidebar-list js-Subsidebar-list">');

      $item.append($subitem);

      $(this).nextAll('h3, h2').each(function(j) {
        var $subTitle = $(this);

        if ($subTitle.is('h2')) return false;

        var subTitle = $subTitle.html();
        var subLink = '#' + $subTitle.attr('id');

        $subitem.append('<li class="Sidebar-item js-Sidebar-item Subsidebar-item"><a href="'+subLink+'" class="Sidebar-link">'+subTitle+'</a></li>');
      });

      _this.$subsidebar.append($item);
    });
  },

  _fixSubheader: function() {
    var w = $(window).width();

    if (w > 750) {
      if (document.body.scrollTop >= this.$header.height()) {
        this.$subheader.addClass('is-fixed');
      } else {
        this.$subheader.removeClass('is-fixed');
      }
    } else {
      if (this.$subheader.hasClass('is-fixed')) {
        this.$subheader.removeClass('is-fixed');
      }
    }
  }

});

$(function() {
  if ($('body').hasClass('js-Lesson')) {
    window.lesson = new App.Views.Lesson();
  }
});

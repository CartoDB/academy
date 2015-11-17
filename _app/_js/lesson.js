App.Views.Lesson = Backbone.View.extend({

  el: '.js-Lesson',

  initialize: function() {
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

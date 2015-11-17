App.Views.Lesson = Backbone.View.extend({

  el: '.js-Lesson',

  initialize: function() {
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
      });
  }

});

$(function() {
  if ($('body').hasClass('js-Lesson')) {
    window.item = new App.Views.Lesson();
  }
});

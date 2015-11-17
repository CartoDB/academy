App.Views.Main = Backbone.View.extend({

  el: 'body',

  events: {
    'click': '_closeDropdowns',
    'keydown': '_onKeyDown'
  },

  initialize: function() {
    this._initViews();
  },

  _initViews: function() {
    this._initDropdowns();
    var navbar = new App.Views.Navbar();
    this._initHighlights();
  },

  _initHighlights: function() {
    _.each(this.$('.language-bash'), function(el) {
      $(el).closest('pre').addClass('Console');
    });
  },

  _onKeyDown: function(e) {
    switch (e.which) {
      // esc
      case 27 :
        this._closeDropdowns();
        break;
    }
  },

  _closeDropdowns: function() {
    this.trigger('closedropdowns');
  },

  _initDropdowns: function() {
    var _this = this;

    _.each(this.$('.js-Dropdown'), function(el) {
      var dropdown = new App.Views.Dropdown({
        el: $(el)
      });

      dropdown.bind('onclickdropdownlink', function() {
        _this._closeDropdowns();
      });

      _this.bind('closedropdowns', function() {
        dropdown.close();
      });
    });
  },

});

$(function() {
  window.main = new App.Views.Main();
});

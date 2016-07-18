App.Views.Main = Backbone.View.extend({

  el: 'body',

  events: {
    'click': '_closeDropdowns',
    'keydown': '_onKeyDown',
    'click .js-Action--NAVbuilder': '_onClickNAVbuilder',
    'click .js-Action--NAVengine': '_onClickNAVengine',
    'click .js-Action--NAVsolutions': '_onClickNAVsolutions',
    'click .js-Action--NAVpricing': '_onClickNAVpricing',
    'click .js-Action--NAVblog': '_onClickNAVblog',
    'click .js-Action--NAVlogin': '_onClickNAVlogin',
    'click .js-Action--NAVcontact': '_onClickNAVcontact',
  },

  _onClickNAVbuilder: function () {
    ga('send', 'event', 'NAVbuilder', 'click', 'Builder')
  },

  _onClickNAVengine: function () {
    ga('send', 'event', 'NAVengine', 'click', 'Builder')
  },

  _onClickNAVdataserv: function () {
    ga('send', 'event', 'NAVdataserv', 'click', 'Builder')
  },

  _onClickNAVsolutions: function () {
    ga('send', 'event', 'NAVsolutions', 'click', 'Builder')
  },

  _onClickNAVpricing: function () {
    ga('send', 'event', 'NAVpricing', 'click', 'Builder')
  },

  _onClickNAVblog: function () {
    ga('send', 'event', 'NAVblog', 'click', 'Builder')
  },

  _onClickNAVlogin: function () {
    ga('send', 'event', 'NAVlogin', 'click', 'Builder')
  },

  _onClickNAVcontact: function () {
    ga('send', 'event', 'NAVcontact', 'click', 'Builder')
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

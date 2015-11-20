App.Views.Navbar = Backbone.View.extend({

  el: '.js-Offcanvas-inner',

  events: {
    'click .js-Navbar-button': '_onClickNavbarButton'
  },

  initialize: function() {
    this.model = new Backbone.Model({ hidden: true });

    this.model.on("change:hidden", this._toggleNavbar, this);
  },

  _onClickNavbarButton: function(e) {
    e.preventDefault();

    this.model.set('hidden', !this.model.get('hidden'));
  },

  _toggleNavbar: function() {
    if (this.model.get('hidden')) {
      this.$el.removeClass('is-active');
    } else {
      this.$el.addClass('is-active');
    }
  }
});

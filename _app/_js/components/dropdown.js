App.Views.Dropdown = Backbone.View.extend({

  events: {
    'click': '_onClickDropdown',
    'click .js-Dropdown-target': '_onClickDropdownLink'
  },

  initialize: function() {
    this.$dropdown = this.$('.js-Dropdown-inner');

    this.model = new Backbone.Model({ hidden: true });

    this.model.on("change:hidden", this._toggleDropdown, this);
  },

  _onClickDropdown: function(e) {
    if (!$(e.target).hasClass('js-Dropdown-link')) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  close: function() {
    if (!this.model.get('hidden')) {
      this.model.set('hidden', true);
    }
  },

  _onClickDropdownLink: function(e) {
    e.preventDefault();

    if (this.model.get('hidden')) {
      this.trigger('onclickdropdownlink');
    }

    this.model.set('hidden', !this.model.get('hidden'));
  },

  _toggleDropdown: function() {
    this.$dropdown.toggleClass('is-active', !this.model.get('hidden'));
  }
});

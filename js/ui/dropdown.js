academy.ui.Models.Dropdown = cdb.core.Model.extend({
  defaults: {
    closed: true
  }
});

academy.ui.Views.Dropdown = cdb.core.View.extend({
  el: '#dropdown',

  events: {
    'click': '_onClickDropdown',
    'mouseleave': '_close'
  },

  initialize: function() {
    var that = this;

    this.model = new academy.ui.Models.Dropdown();

    this.model.on("change:closed", this._toggle, this);
  },

  _onClickDropdown: function(e) {
    e.preventDefault();

    this._open();
  },

  _toggle: function() {
    if (this.model.get('closed')) {
      this.$el.removeClass('drp-open');
    } else {
      this.$el.addClass('drp-open');
    }
  },

  _open: function() {
    if (this.model.get('closed')) {
      this.model.set('closed', false);
    }
  },

  _close: function() {
    if (!this.model.get('closed')) {
      this.model.set('closed', true);
    }
  }
});

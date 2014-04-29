academy.Views.Home = cdb.core.View.extend({
  el: document.body,

  events: {
    'click .more': '_goto',
    'submit .subscribe': '_onSubmitForm'
  },

  initialize: function() {
    this._initViews();
  },

  _initViews: function() {
    var mapOptions = {
      scrollwheel: false,
      zoomControl: false,
      cartodb_logo: false
    }

    cartodb.createVis('cartodb-map', this.options.vizjson, mapOptions);
  },

  _goto: function(e) {
    e.preventDefault();

    var el = $(e.target).attr('href');

    this.$el.animate({
      scrollTop: $(el).offset().top
    });
  },

  _onSubmitForm: function(e) {
    e.preventDefault();
  }
});

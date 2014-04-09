academy.Views.Home = cdb.core.View.extend({
  el: document.body,

  events: {
    'click .more': '_goto'
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

    var el = $(e.target).attr('data-href');

    this.$el.animate({
      scrollTop: $(el).offset().top
    });
  }
});

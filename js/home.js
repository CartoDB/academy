academy.Views.Home = cdb.core.View.extend({
  el: document.body,

  events: {
    'submit .subscribe': '_onSubmitForm',
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

    var el = $(e.target).attr('href');

    $('body, html').animate({ scrollTop: $(el).offset().top }, 250);
  },

  _onSubmitForm: function(e) {
    e.preventDefault();
  }
});

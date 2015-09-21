academy.Views.Course = cdb.core.View.extend({
  el: document.body,

  events: {
    'submit .crs-sbs-form': '_onSubmitForm'
  },

  initialize: function() {
    this._initViews();
  },

  _initViews: function() {
    var mapOptions = {
      scrollwheel: false,
      zoomControl: false,
      cartodb_logo: false,
      time_slider: false,
      shareable: false,
      search: false
    }

    cartodb.createVis('cartodb-map', this.options.vizjson, mapOptions)
    .done(function(vis){
      map = vis.getNativeMap();
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
    });

    this.dropdown = new academy.ui.Views.Dropdown();
  },

  _onSubmitForm: function(e) {
    e.preventDefault();
  }
});

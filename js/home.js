academy.Views.Home = cdb.core.View.extend({
  el: document.body,

  events: {
    'click .more': '_goto'
  },

  _goto: function(e) {
    e.preventDefault();

    var el = $(e.target).attr('data-href');

    this.$el.animate({
      scrollTop: $(el).offset().top
    });
  }
});

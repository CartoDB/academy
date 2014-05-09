(function($, window, undefined) {

  // constants
  var TRUE = true, FALSE = true, NULL = null
  , name = 'placeholder'
  // Plugin parts
  , Core, API, Helper
  // default options
  , defaultOptions = {
    globalEvents : []
  };

  /***************************************************************************
  * Private methods
  **************************************************************************/
  Core = {
    pluginName : name,
    options : null,

    _init : function (options) {
      // take user options in consideration
      Core.options = $.extend( true, defaultOptions, options );
      return this.each( function () {
        var $el = $(this);

        // Add custom html
        Core._addCustom($el);

        // Bind events
        Core._bind($el);

        // Check if input has value (TIMEOUT due to if browser saves values)
        setTimeout(function(){
          Core._check($el);
        },300);
      });
    },


    _bind: function($el) {
      $el.data('label').bind({'click':Core._onLabelClick});
      $el.bind({'keyup': Core._onChange});
    },


    _trigger : function ( eventName, data, $el ) {
      var isGlobal = $.inArray( eventName, Core.options.globalEvents ) >= 0, eventName = eventName + '.' +  Core.pluginName;

      if (!isGlobal) {
        $el.trigger( eventName, data );
      } else {
        $.event.trigger( eventName, data );
      }
    },


    // PRIVATE LOGIC
    _stopPropagation: function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
    },

    _addCustom: function($el) {
      // Get input properties and position
      var pos = $el.position()
        , height = $el.outerHeight(true);

      // Create label
      var $label = $('<label class="placeholder" style="line-height:' + height + 'px">').text($el.attr('data-label'));

      // Add label
      $el.before($label);

      // Set label to the element
      $el.data('label',$label);

      // Set input for label
      $label.data('input',$el);
    },

    _check: function($el) {
      // Check if element has a previous value
      if ($el.val() != '') {
        $el.data('label').hide();
      }
    },

    _onChange: function(ev) {
      var value = $(ev.target).val()
        , $label = $(ev.target).data('label');

      if (value.length>0) {
        $label.fadeOut(10);
      } else {
        $label.fadeIn(300);
      }
    },

    _onLabelClick: function(ev) {
      // Focus on input when clicks in the label
      $(ev.target).data('input').focus();
    }
  };


  /***************************************************************************
  * Plugin installation
  **************************************************************************/
  $.fn[name] = function (userInput) {
    // check if such method exists
    if ( $.type( userInput ) === "string" && API[ userInput ] ) {
      return API[ userInput ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
    }
    // initialise otherwise
    else if ( $.type( userInput ) === "object" || !userInput ) {
      return Core._init.apply( this, arguments );
    } else {
      $.error( 'You cannot invoke ' + name + ' jQuery plugin with the arguments: ' + userInput );
    }
  };
})( jQuery, window );

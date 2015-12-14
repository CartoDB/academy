window.onload = function() {

    var tableName = "earthquakes_cdbjs_lesson3";

    var layerSource = {
            user_name: 'documentation',
            type: 'cartodb',
            sublayers: [{
                sql: "SELECT * FROM " + tableName, // Earthquake data
                cartocss: $("#simple").html() // Simple visualization
            }]
    }
    
    // Instantiate new map object, place it in 'map' element
    var map_object = new L.Map('map', {
        center: [37.7741154,-122.4437914], // San Francisco
        zoom: 2
    });

    // Create layer selector
    function createSelector(layer) {
        var cartocss = "";
        var $options = $(".layer_selector").find("li");
        $options.click(function(e) {
            var $li = $(e.target);
            var selected = $li.attr('data');

            $options.removeClass('cartocss_selected');
            $li.addClass('cartocss_selected');

            cartocss = $('#'+selected).text();

            layer.setCartoCSS(cartocss);
        });
    }

    // Pull tiles from CartoDB's basemaps
    L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap<\/a> contributors'
    }).addTo(map_object);

    // for storing sublayer outside of createlayer
    var sublayers;

    // Add data layer to your map
    cartodb.createLayer(map_object,layerSource)
        .addTo(map_object)
        .done(function(layer) {
            sublayer = layer.getSubLayer(0);
            createSelector(sublayer);
        })
        .error(function(err) {
            console.log("error: " + err);
        });
}
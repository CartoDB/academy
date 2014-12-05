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
        var condition = "";
        var $options = $(".layer_selector").find("li");
        $options.click(function(e) {
            var $li = $(e.target);
            var selected = $li.attr('data');
            var type = $li.data('type');

            if (type === "cartocss") {
                $options.removeClass('cartocss_selected');
                if (selected !== "simple") {
                    $li.addClass('cartocss_selected');                      
                }
                condition = $('#'+selected).text();
                layer.setCartoCSS(condition);
            } else {
                $options.removeClass('sql_selected');
                if (selected !== "") {
                    $li.addClass('sql_selected');
                }
                if (selected.indexOf('guinea') !== -1) {
                    map_object.setView(L.latLng([-9.5, 147.116667]),6);
                } else {
                    map_object.setView(L.latLng([37.7741154,-122.4437914]),2);
                }
                layer.setSQL("SELECT * FROM " + tableName + selected);
            }
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
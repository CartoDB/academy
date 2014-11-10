window.onload = function() {
    cdb.init(function() {
        // Instantiate new map object, place it in 'map' element
        var map_object = new L.Map('map', {
            center: [35,-110],
            zoom: 3
        });

        // Put layer data into a JS object
        var layerSource = {
                user_name: 'documentation',
                type: 'cartodb',
                sublayers: [{
                    sql: "SELECT * FROM all_day_cdb_gu_l3", // African countries
                    cartocss: '#all_day_cdb_gu_l3{polygon-fill:#FF6600;polygon-opacity:0.7;line-color:#FFF;line-width:1;line-opacity:1;}'
                }]
        }

        // For storing the sublayers
        var sublayer;

        // Pull tiles from OpenStreetMap
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'OpenStreetMap'
        }).addTo(map_object);

        // Add data layer to your map
        cartodb.createLayer(map_object,layerSource)
            .addTo(map_object)
            .done(function(layer) {
                sublayer = layer;
            })
            .error(function(err) {
                console.log("Error: " + err);
            });
    });
}

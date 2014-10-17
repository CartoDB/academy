var vizjson = 'http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json';

// Choose center and zoom level
var options = {
            center: [41.8369, -87.6847], // Chicago
            zoom: 7
        }

// Instantiate map on specified DOM element
var map_object = new L.Map('map', options);

// Add a basemap to the map object just created
L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Stamen'
    }).addTo(map_object);

// Add CartoDB data layers
cartodb.createLayer(map_object,vizjson)
    .addTo(map_object);

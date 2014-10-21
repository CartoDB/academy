// Instantiate new map object, place it in 'map' element
var map_object = new L.Map('map', {
    center: [43,0], // Southern France
    zoom: 3
});

// Put layer data into a JS object
var layerSource = {
        user_name: 'documentation',
        type: 'cartodb',
        sublayers: [{
            sql: "SELECT * FROM africa_adm0", // African countries
            cartocss: '#africa_adm0{polygon-fill:#FF6600;polygon-opacity:0.7;line-color:#FFF;line-width:1;line-opacity:1;}'
        },
        {
            sql: "SELECT * FROM ne_50m_lakes", // Natural and artificial lakes
            cartocss: '#ne_50m_lakes {polygon-fill:#0000FF;}'
        }]
}

// For storing the sublayers
var sublayers = [];

// Pull tiles from OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
}).addTo(map_object);

// Add data layer to your map
cartodb.createLayer(map_object,layerSource)
    .addTo(map_object)
    .done(function(layer) {
       for (var i = 0; i < layer.getSubLayerCount(); i++) {
           sublayers[i] = layer.getSubLayer(i);
           alert("Congrats, you added sublayer #" + i + "!");
       }
       var op = 0.7;
       layer.setOpacity(op);

       $(function() {
           $( "#slider-range-min" ).slider({
             range: "min",
             value: 70,
             min: 0,
             max: 100,
             slide: function( event, ui ) {
               $( "#amount" ).val(ui.value + "%" );
               // scale to [0,1] from [0,100]
               op = $( "#slider-range-min" ).slider( "value" ) / 100;
               layer.setOpacity(op);
             }
           });
           $( "#amount" ).val( $( "#slider-range-min" ).slider( "value" ) + "%");
         });
    })
    .error(function(err) {
        console.log("error: " + err);
    });
    
var sublayer0Shown = true;
$("#sublayer0").on('click', function() {
    if (sublayer0Shown) {
        sublayers[0].hide();
    } else {
        sublayers[0].show();
    }
    sublayer0Shown = !sublayer0Shown; 
});

var sublayer1Shown = true;
$("#sublayer1").on('click', function() {
    if (sublayer1Shown) {
        sublayers[1].hide();
    } else {
        sublayers[1].show();
    }
    sublayer1Shown = !sublayer1Shown; 
});
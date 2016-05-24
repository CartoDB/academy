window.onload = function() {
    var vizjson_url = 'https://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json';

    cartodb.createVis('map', vizjson_url)
        .done(function(vis, layers) {
            // do stuff
            alert("Layers has " + layers.length + " layers.");
        })
        .error(function(err) {
            // report error
            console.log("An error occurred: " + err);
        });
}

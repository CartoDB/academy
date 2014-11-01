window.onload = function() {
    cdb.init(function() {
        var vizjson_url = 'http://documentation.cartodb.com/api/v2/viz/ef933ce8-e9ca-11e2-98b0-5404a6a683d5/viz.json';

        cartodb.createVis('map', vizjson_url)
            .done(function(vis, layers) {
                // do stuff
                alert("Layers has " + layers.length + " layers.");
            })
            .error(function(err) {
                // report error
                console.log("An error occurred: " + err);
            });
    });
}

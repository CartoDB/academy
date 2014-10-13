vzj = 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json';

// Create map object with Leaflet
var map = new L.Map('map', {
        zoomControl: false,
        center: [43,0], // Southern France
        zoom: 5
    });
        
// Add OpenStreetMap tiles
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
}).addTo(map);

cartodb.createLayer(map, vzj)
    .addTo(map)
    .done(function() {
        alert("Layer loaded");
    });

---
id: 2
layout: lesson
title:  "Lesson 2"
subtitle: "Creating basic map apps"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
continue_link: "lesson-3"
tweet_text: "Lesson 2 from CartoDB.js from the ground up is coming soon!"
vizjson: "http://andye.cartodb.com/api/v2/viz/19de0ce2-3deb-11e4-b07b-0edbca4b5057/viz.json"
---

## Creating basic map apps

We saw in the last lesson that we can build custom webpages in JavaScript by using createVis and createLayer from the CartoDB.js library. In this lesson we will take a look at some of the methods we can use to alter the layers of our map. If you take a look through the [documentation of CartoDB.js](http://docs.cartodb.com/cartodb-platform/cartodb-js.html), you will that there are many methods to boost the power of your maps.

Download/copy the template for this lesson from [***this link***]({{site.baseurl}}/t/), or use [***this***]() JS Fiddle to follow along and explore. We will also use the following two viz.json files:

+ World Lakes: [viz.json file 1](http://#)
+ African Countries: [viz.json file 2](http://#)

The data for this visualization comes from CartoDB's [***Common Data***](), a storehouse of great open data.

### Exploring callback functions

Callback functions are an important part of the JavaScript language. Combined with `.done`, a [jQuery method](http://api.jquery.com/deferred.done/) that runs once the object it is acting on is resolved, users can interact with your map once it has loaded. Testing for when your map calls an error is important as well. Chaining on `.error` ([jQuery docs](http://api.jquery.com/error/)) helps you debug and mitigate errors. Both createVis and createLayer return callback objects. createVis returns `vis`, `layers`, and `err`, and can be formatted like this:

{% highlight javascript %}
cartodb.createVis(map_id, vizjson_url)
    .done(function(vis, layers) {
        // do stuff
        alert("Layers has " + layers.length + " layers.");
    })
    .error(function(err) {
        // report error
        console.log("An error occurred: " + err);
    });
{% endhighlight %}

The JS alert box will tell us how many layers are in `layers`. As mentioned before, `layer[0]` is the base map. `layer[1]` and up are the data layers added in a visualization in CartoDB's Editor. For this visualization, there was only one data layer added so it has length two.

createLayer has callback objects, `layer` and `err`. It can be called like this:

{% highlight javascript %}
cartodb.createLayer(map_object, vizjson)
    .addTo(map_object)
    .done(function(layer) {
        // do stuff
        alert("Layer has " + layer.getSubLayerCount() + " layer(s).");
    })
    .error(function(err) {
        // report error
        console.log("An error occurred: " + err);
    });
{% endhighlight %}

Here we used the layer method `getSubLayerCount()`, which tells us the number of sublayers listed in the viz.json, as we saw in Lesson 1. 

From now on, the two blocks of code above will be our working examples for using createVis and createLayer.

### Adding multiple layers from different visualizations

We'll start working with createLayer.

Look at the following snippet of code and predict what will happen. Then paste it into the template between the `<script> ... </script>` tags and save it as `lesson-2-multilayer.html`. If you'd prefer JS Fiddle, check out the demo [here](http://jsfiddle.net/gh/get/library/pure/cartodb/cartodb.js/t/03-cartodb.js-ground-up/lesson-2/jsfiddle/tree/master/js_demo2).

{% highlight javascript %}
window.onload = function () {

    // Instantiate new map object, place it in 'map' element
    var map = new L.Map('map', {
        center: [43,0], // Southern France
        zoom: 3
    });

    // Pull tiles from OpenStreetMap
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap'
    }).addTo(map);
    
    // Put viz.json URLs into an array
    var vizjsons = [
        'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json',
        'http://documentation.cartodb.com/api/v2/viz/236085de-ea08-11e2-958c-5404a6a683d5/viz.json'
    ]

    // use forEach method to iteratively create layers from vizjson files
    vizjsons.forEach(function(vizjson, index) {
        cartodb.createLayer(map, vizjson)
            .addTo(map)
            .done(function(layer) {
                alert("Congrats, you added vizjson #" + (index+1));
            })
            .error(function(err) {
                console.log("error: " + err + " for layer " + index);
            });
        });
}
{% endhighlight %}

** Change this link **
[Here's](http://jsfiddle.net/udk3veav/) an example at work.

### Layer controls

Now that we've added our layers to our map, let's look at different ways to interact with them. Perhaps the simplest example would be selectively hiding or showing layers. 

The methods for `cartodb.Layer` are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbcartodblayer).

The methods for `cartodb.Vis` are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbvis).

The function inside of `.done()` can extract `vis` and `layers` from the createVis object. As a reminder, `layers` will be an array of two layers: the zeroth element will be the base map, while the first element will be the data layers from CartoDB. Let's use `layers` and explore some of its methods. One of the first things you can control easily is custom interactivity.






The first thing we want to do is enable interactivity for the layers of our map. So we'll need `setInteraction`. Next, we'll need to select the features that we want to be 

Get rid of the alert from the code snippet above, and replace the body of the `function() {...}` with the following:

http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json

{% highlight javascript %}
layers[1].setInteraction(true);


{% endhighlight %}





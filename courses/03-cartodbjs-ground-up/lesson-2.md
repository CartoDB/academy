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

Callback functions are an important part of the JavaScript language. Combined with `.done`, a [jQuery method](http://api.jquery.com/deferred.done/) that runs once the object it is acting on is resolved, you can perform specific actions on the different layers of your map. Testing for when your map calls an error is important as well. Chaining on `.error` ([jQuery docs](http://api.jquery.com/error/)) helps you debug and mitigate errors.

Both createVis and createLayer return callback objects. createVis returns `vis`, `layers`, and `err`, and can be formatted like this:

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

The JS alert box tells us the number of layers array by returning `layers.length`. As mentioned before, `layer[0]` is the base map. `layer[1]` contains all the data sublayers of a visualization in CartoDB's Editor. As you should see, the alert box tells you that there are two layers to that visualization.

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

From now on, the two blocks of code above will be our working examples for extending our CartoDB.js adventures.

### Adding multiple layers from different visualizations

We'll start working with createLayer to create a multilayer visualization in CartoDB.js.

There isn't a restriction on how many createLayers you call in CartoDB.js. You could just list them one after another, each with a different viz.json. But this could be tedious if you have several layers to apply. A concise alternative is to place all your viz.jsons into an array and then use the `forEach` method to the array and pass each element to createLayer. Check out the docs page on this method [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

The following code block rehashes all we've seen in [Lesson 1]({{site.baseurl}}/courses/03-cartodbjs-ground-up/lesson-1.html) and includes what we've encountered in this lesson so far. Before copying, pasting, and running the code, predict what will happen. Then paste it into the template between the `<script> ... </script>` tags and save it as `lesson-2-multilayer.html`. If you prefer JS Fiddle, check out the demo [here](http://jsfiddle.net/gh/get/library/pure/ohasselblad/misc/tree/master/js_demo2).

{% highlight javascript %}
window.onload = function () {

    // Instantiate new map object, place it in 'map' element
    var map = new L.Map('map', {
        center: [43,0], // Southern France
        zoom: 3
    });

    // Put viz.json URLs into an array
    var vizjsons = [
        'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json',
        'http://documentation.cartodb.com/api/v2/viz/236085de-ea08-11e2-958c-5404a6a683d5/viz.json'
    ]

    // For storing the layer objects
    var layers = [];

    // Pull tiles from OpenStreetMap
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap'
    }).addTo(map);

    // iteratively create layers from vizjson files
    vizjsons.forEach(function(vizjson, index) {
        cartodb.createLayer(map, vizjson)
            .addTo(map)
            .done(function(layer) {
                layers[index] = layer;
                alert("Congrats, you added vizjson #" + (index+1) + "Layers has length " + layers.length);
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

Now that we've added layers to our map, let's look at different ways to interact with them. Selectively hiding or showing layers just takes a few more lines of code, so let's start there.

We can use [layer methods](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbcartodblayer) to hide or show our layers. Let's make some buttons to add to our template. Save your file with the above code as `lesson-2-layercontrols.html`. Make sure you include the previous code block.

{% highlight html %}
<h4>Layer controls</h4>
<div id="buttons">
    <button id="layer0">Toggle layer 0</button>
    <button id="layer1">Toggle layer 1</button>
</div>
{% endhighlight %}

We need these buttons to trigger events. We want them to hide or show our layers, so we need to attach events to the buttons. We can do this with jQuery.

{% highlight javascript %}
var layer0_shown = true;
$("#layer0").on('click', function() {
    if (layer0_shown) {
        layers[0].hide();
    } else {
        layers[0].show();
    }
    layer0_shown = !layer0_shown; 
});
{% endhighlight %}

The same can be done for `layer[1]` if you change all the 0s into 1s. Check out a JS Fiddle example.

The methods for `cartodb.Layer` are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbcartodblayer).

The methods for `cartodb.Vis` are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbvis).

The function inside of `.done()` can extract `vis` and `layers` from the createVis object. As a reminder, `layers` will be an array of two layers: the zeroth element will be the base map, while the first element will be the data layers from CartoDB. Let's use `layers` and explore some of its methods. One of the first things you can control easily is custom interactivity.






The first thing we want to do is enable interactivity for the layers of our map. So we'll need `setInteraction`. Next, we'll need to select the features that we want to be 

Get rid of the alert from the code snippet above, and replace the body of the `function() {...}` with the following:

http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json

{% highlight javascript %}
layers[1].setInteraction(true);


{% endhighlight %}





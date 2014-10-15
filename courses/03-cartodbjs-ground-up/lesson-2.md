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

In the last lesson, we saw that it is easy building custom webpages in JavaScript by using createVis and createLayer from the CartoDB.js library. In this lesson we will take a look at some of the methods we can use to alter the layers of our map. If you take a look through the [documentation of CartoDB.js](http://docs.cartodb.com/cartodb-platform/cartodb-js.html), you will see that there are many methods to boost the power of your maps.

Download/copy the template for this lesson from [***this link***]({{site.baseurl}}/t/), or use [***this***]() JS Fiddle to follow along and explore. We will also use the following two viz.json files:

+ World Lakes: [viz.json file 1](http://#)
+ African Countries: [viz.json file 2](http://#)

The data for these visualizations comes from CartoDB's [***Common Data***](), an expanding storehouse of great open data.

### Exploring callback functions

[Callback functions](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/) are an important part of the JavaScript language. Combined with `.done`, a [jQuery method](http://api.jquery.com/deferred.done/) that runs once the object it is acting on is resolved, you can perform specific actions on the different layers of your map after they've loaded. Testing for when your map returns an error is important as well. Chaining on `.error` ([jQuery docs](http://api.jquery.com/error/)) helps you debug and mitigate problems in your code.

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

The JS alert box tells us the number of layers by returning `layers.length`. As mentioned before, `layers[0]` is the base map. `layers[1]` contains all the data sublayers of a visualization in CartoDB's Editor. As you should see, the alert box tells you that there are two layers to that visualization.

createLayer has callback objects `layer` and `err`. It can be called like this:

{% highlight javascript %}
cartodb.createLayer(map_object, layerSource)
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

Here we used the layer method `getSubLayerCount()` to get the number of sublayers listed in the viz.json, as we saw in Lesson 1. Here we are using maps that have only a single layer. Also note that a generic `layerSource` is specified instead of `vizjson_url`, as in createVis. For createLayer, data can be passed directly as an object in the following form:

{% highlight javascript %}
var layerSource = {
    user_name: 'your CartoDB username',
    type: 'cartodb',
    sublayers: [{
            sql: "SELECT * FROM table_name_1",
            cartocss: '#table_name_1 {polygon-fill: #333;}'
        }, 
        {
            sql: "SELECT * FROM table_name_2",
            cartocss: '#table_name_2 {polygon-fill: #ccc;}'
        }]
}
{% endhighlight %}

From now on, the two blocks of code above will be our working examples for extending our CartoDB.js adventures. Try them out first to make sure you can get them going. Save your file as `lesson-2-ondone.html`.

And don't forget that they should be within the following construct so your map will only load once your window as loaded.

{% highlight javascript %}
window.onload = function() {
    ...
}
{% endhighlight %}

### Adding multiple layers from different visualizations

We'll start working with createLayer to create a multilayer visualization in CartoDB.js.

There isn't a restriction on how many createLayers you call in CartoDB.js. You could just list them one after another, each with a different viz.json. But this could be tedious if you have several layers to add to your map. A concise alternative is to place all your viz.jsons into an array, apply the `forEach` method to it, and then pass each element to createLayer. Check out the docs page on this method [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

The following code block rehashes all we've seen in [Lesson 1]({{site.baseurl}}/courses/03-cartodbjs-ground-up/lesson-1.html) and includes what we've encountered in this lesson so far. Before copying, pasting, and running the code, predict what will happen. Then paste it into the template between the `<script> ... </script>` tags and save it as `lesson-2-multilayer.html`. If you prefer JS Fiddle, check out the demo [here](http://jsfiddle.net/gh/get/library/pure/ohasselblad/misc/tree/master/js_demo2). 

{% highlight javascript %}
window.onload = function () {

    // Instantiate new map object, place it in 'map' element
    var map = new L.Map('map', {
        center: [43,0], // Southern France
        zoom: 3
    });

    // Put layer data into a JS object
    var vizjsons = {
        user_name: '',
        type: 'cartodb',
        sublayers: [
            { sql: "SELECT * FROM table_1" },
            { sql: "SELECT * FROM table_2" },
            { sql: "SELECT * FROM table_3" }
        ]
    }

    // For storing the layer objects
    var layers = [];

    // Pull tiles from OpenStreetMap
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap'
    }).addTo(map);

    // Iteratively create layers from viz.json files
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

_**NB**: If you use Google Maps as your base map, the `.addTo` method needs to take a second argument, an integer that defines the layer order. In we changed this to use Google Maps instead, we would just use `index` like so: `.addTo(map,index)`._

All of these techniques can be used for createVis with minor modifications. One difference is the procedure for accessing layers. Since `layers[1]` contains all the sublayers, one can access them by calling `getSubLayer(i)`, where `i` is the sublayer order, starting from `0` up to `layers.getSubLayerCount() - 1`. They can be conveniently stored in an array as we did above with createLayer, or they can be accessed by calling `layers.getSubLayer(n)`.


**Tip**: If you want to access `layers` or `layer` outside of `.done`, make sure that you declare an array outside of the scope of the createLayer statement as we did above.

### Layer controls

Now that we've added layers to our map, let's look at different ways to interact with them. Selectively hiding or showing layers just takes a few more lines of code, so let's start there.

We can use [layer methods](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbcartodblayer) to hide or show our layers. Let's make some buttons to add to our template. Since we'll be reusing most of the code from above, save your previous file as `lesson-2-layercontrols.html`. Make sure to include the code we've used up to this point.

First we need to add a way for the user to interact with the map from a browser window. An easy way to do so is to create buttons to trigger events. The following lines of code are our starting point.

{% highlight html %}
<h4>Layer controls</h4>
<div id="buttons">
    <button id="layer0">Toggle layer 0</button>
    <button id="layer1">Toggle layer 1</button>
</div>
{% endhighlight %}

Next, we need these buttons to trigger the events. We want them to hide or show our layers, so we need associate them with the `layer.hide()` or `layer.show()` methods. We can do this with a little jQuery and an if/else statements. Put the following code block below the `forEach` statement, making sure you paste it between the curly braces on the callback function that's called when the window loads.

{% highlight javascript %}
var layer0Shown = true;
$("#layer0").on('click', function() {
    if (layer0Shown) {
        layers[0].hide();
    } else {
        layers[0].show();
    }
    layer0Shown = !layer0Shown; 
});
{% endhighlight %}

This bit of script does the following: If a user clicks the DOM element with an `id` of `layer0`, CartoDB.js will hide or show `layers[0]` depending on its state (`layer0Shown` being true or false). Although not concise, you can control `layer[1]` by copying the block of code above and changing all the 0s into 1s.


Check out a JS Fiddle example.

### Layer opacity

To wrap up our brief introduction to the layer methods, let's further control the display of our map by changing the opacity. Again appealing to jQuery, we simply copy the example code from the [UI slider widget](http://jqueryui.com/slider/#rangemin) and make small modifications. 

First place the following stags into the `<head>` tags:
{% highlight javascript %}
<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
<script src="http://code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
<link rel="stylesheet" href="http://jqueryui.com/resources/demos/style.css">
{% endhighlight %}

Next place the following DIV tags below the `<h3>` tags:
{% highlight javascript %}
<div id="slider-range-min"></div>
{% endhighlight %}

And finally, put the following JavaScript below the `forEach` structure.

{% highlight javascript %}
var op = 0.5;
layers[1].setOpacity(op);

$(function() {
    $( "#slider-range-min" ).slider({
      range: "min",
      value: 50,
      min: 0,
      max: 100,
      slide: function( event, ui ) {
        $( "#amount" ).val(ui.value + "%" );
        // scale to [0,1] from [0,100]
        op = $( "#slider-range-min" ).slider( "value" ) / 100;
        layers[1].setOpacity(op);
      }
    });
    $( "#amount" ).val( $( "#slider-range-min" ).slider( "value" ) + "%");
  });
{% endhighlight %}


Now we have built a basic app with your map! Congrats on making is this far.

If you want to explore more, check out the following links for other methods in the library:

+ cartodb.Layer are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbcartodblayer).
+ cartodb.Vis are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbvis).

That's the end of Lesson 2. The next lesson goes into customizing the interactivity of the different layers of your map.
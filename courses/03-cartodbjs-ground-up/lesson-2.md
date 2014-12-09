---
id: 2
layout: lesson
title:  "Lesson 2"
subtitle: "Creating basic map apps"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
continue_link: "lesson-3"
tweet_text: "I did CartoDB.js from the ground, Lesson 2! #CartoDB"
vizjson: "http://andye.cartodb.com/api/v2/viz/19de0ce2-3deb-11e4-b07b-0edbca4b5057/viz.json"
---

<iframe src="//player.vimeo.com/video/110427306" width="700" height="393" frameborder="0"></iframe>

## Creating basic map apps

In the last lesson, we saw that it is easy building custom webpages in JavaScript by using createVis and createLayer from the CartoDB.js library. In this lesson we will take a look at some of the methods we can use to alter the layers of our map. If you take a look through the [documentation of CartoDB.js](http://docs.cartodb.com/cartodb-platform/cartodb-js.html), you will see that there are many methods to boost the power of your maps.

Download/copy the template for this lesson from [this link]({{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-2/CartoDB-js-lesson2-template.html), or use [jsFiddle](http://jsfiddle.net/) to follow along and explore. We will also use the [viz.json file from the last lesson](http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json) in our first example. Finally, we will be using the following two tables from CartoDB's [Common Data](http://blog.cartodb.com/better-common-data/), an expanding storehouse of great open data:

+ World Lakes has a table name `ne_50m_lakes`
+ African Countries has a table name `africa_admin0`

### Exploring callback functions

[Callback functions](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/) are an important part of the JavaScript language. Combined with `.done`, a promise object that runs once the deferred object it is acting on is resolved, you can synchronously perform specific actions on the different layers of your map after they have loaded. Testing for when your map returns an error is important as well. Chaining on `.error` helps you debug and mitigate problems in your code.

Both createVis and createLayer return callback objects. createVis sends a `vis` object and an array of layers to `.done`, and `.error` receives an error string. The whole structure can be formatted like this:

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

The JS alert box tells us the number of layers by returning `layers.length`. As mentioned before, `layers` is an array where `layers[0]` is the base map, and `layers[1]` contains all the data sublayers of a visualization created in the CartoDB Editor. 

Grab the [template]({{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-2/CartoDB-js-lesson2-template.html), copy and paste the code for createVis, and save your file as `lesson-2-ondone.html`. If you prefer jsFiddle, check out the demo [here](http://jsfiddle.net/gh/get/library/pure/CartoDB/academy/tree/master/t/03-cartodbjs-ground-up/lesson-2/jsfiddle_demo_ondone).

**Tip:** Don't forget that the code blocks we're working with should be within the following event handler so your map code will run once all the DOM elements and other assets have loaded.

{% highlight javascript %}
window.onload = function() {
    ...
}
{% endhighlight %}

As you should see, the alert box tells you that there are two layers to that visualization. Compare yours to a [complete one]({{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-2/CartoDB-js-lesson2-ondone.html).

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

Here we used the layer method `getSubLayerCount()` to get the number of sublayers passed to createLayer, which should look familiar to what you saw in Lesson 1. Notice that a generic `layerSource` is specified instead of `vizjson_url`, as is required in createVis. For createLayer, data can be passed directly as an object in the following form:

{% highlight javascript %}
var layerSource = {
    user_name: 'a CartoDB username',
    type: 'cartodb',
    sublayers: [{
            sql: "SELECT * FROM table_name_1",
            cartocss: '#table_name_1 {...CartoCSS styles...}'
        }, 
        {
            sql: "SELECT * FROM table_name_2",
            cartocss: '#table_name_2 {...CartoCSS styles...}'
        }]
}
{% endhighlight %}

If you are not familiar with SQL or CartoCSS, don't worry! Their use in CartoDB.js is covered in Lesson 3. 

From now on, the blocks of code for createVis and createLayer above will be our working examples for extending our CartoDB.js adventures. 

### Adding multiple layers from different Visualizations

We'll start working with createLayer to create a multilayer visualization in CartoDB.js.

The createLayer method allows you to create maps with many layers. You could just call createLayer over and over again for each _layerSource_, but this could be tedious if you have several layers to add to your map and want to customize interactivity.

As we saw above, a concise alternative is to create a JS object similiar to a viz.json. The format we'll use is:

{% highlight javascript %}
var layerSource = {
        user_name: 'documentation',
        type: 'cartodb',
        sublayers: [{
            sql: "SELECT * FROM africa_adm0", // African countries
            cartocss: '#africa_adm0{polygon-fill:#FF6600;polygon-opacity:0.7;line-color:#FFF;line-width:1;line-opacity:1;}'
        },
        {
            sql: "SELECT * FROM ne_50m_lakes", // Natural and artificial lakes
            cartocss: '#ne_50m_lakes {polygon-fill: #0000FF;}'
        }]
}
{% endhighlight %}

If you look back at the [viz.json](http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json) we inspected in Lesson 1, this layer we just created--which consists of two sublayers--is almost identical in structure to `layers[1]`. As you'll recall with createVis, `layers[0]` is the base map. createLayer does not carry a basemap with it unless it is previously specified. Therefore, `layer` in createLayer is equivalent to `layers[1]` in createVis.

The following code block rehashes all we've seen in [Lesson 1]({{site.baseurl}}/courses/03-cartodbjs-ground-up/lesson-1.html) and includes what we've encountered in this lesson so far. Before copying, pasting, and running the code, predict what will happen. Then paste it into the template between the `<script> ... </script>` tags and save it as `lesson-2-multilayer.html`. If you prefer jsFiddle, check out the demo [here](http://jsfiddle.net/gh/get/library/pure/CartoDB/academy/tree/master/t/03-cartodbjs-ground-up/lesson-2/jsfiddle_demo_multilayer). Compare your code to the one [here]({{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-2/CartoDB-js-lesson2-multilayer.html).

{% highlight javascript %}
window.onload = function () {

    // Instantiate new map object, place it in 'map' element
    var map_object = new L.Map('map', {
        center: [43,0], // Southern France
        zoom: 3
    });

    // Put layer data into a JS object
    var layerSource = {
        // Use what was given above
    }

    // For storing the sublayers
    var sublayers = [];

    // Pull tiles from OpenStreetMap
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map_object);

    // Add data layer to your map
    cartodb.createLayer(map_object,layerSource)
        .addTo(map_object)
        .done(function(layer) {
           for (var i = 0; i < layer.getSubLayerCount(); i++) {
               sublayers[i] = layer.getSubLayer(i);
               alert("Congrats, you added sublayer #" + i + "!");
           } 
        })
        .error(function(err) {
            console.log("error: " + err);
        });
    }
{% endhighlight %}

All of these techniques can be used for createVis with minor modifications. One difference is the procedure for accessing layers. Since `layers[1]` contains all the sublayers, one can access them by calling `getSubLayer(i)`, where `i` is the sublayer order, starting from `0` up to `layers[1].getSubLayerCount() - 1`. They can be conveniently stored in an array as we did above with createLayer, or they can be accessed by calling `layers[1].getSubLayer(n)`. Another modification is the replacement of the `layerSource` object with a viz.json.

**Tip:** If you want to access sublayers outside of `.done`, make sure that you declare an array outside of the scope of the createLayer statement as we did above.

### Layer controls

Now that we've added layers to our map, let's look at different ways to interact with them. Selectively hiding or showing layers just takes a few more lines of code, so let's start there.

We can use [layer methods](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbcartodblayer) to hide or show our layers. Let's make some buttons to add to our template. Since we'll be reusing most of the code from above, save your previous file as `lesson-2-layercontrols.html`. Make sure to include the code we've used up to this point.

First we need to add a way for the user to interact with the map from a browser window. An easy way to do so is to create buttons to trigger events. The following lines of code are our starting point.

{% highlight html %}
<p>Layer controls</p>
<div id="buttons">
    <button id="sublayer0" class="Btn Btn--l Btn--blue"><span>Toggle Countries</span></button>
    <button id="sublayer1" class="Btn Btn--l Btn--blue"><span>Toggle Lakes</span></button>
</div>
{% endhighlight %}

Next, we need these buttons to trigger the events. We want them to hide or show our layers, so we need associate them with the `sublayer.hide()` or `sublayer.show()` methods. We can do this with a little jQuery and an if/else statements. Put the following code block below the createLayer construct, making sure you paste it between the curly braces on the callback function that's called when the window loads.

{% highlight javascript %}
var sublayer0Shown = true;
$("#sublayer0").on('click', function() {
    if (sublayer0Shown) {
        sublayers[0].hide();
    } else {
        sublayers[0].show();
    }
    sublayer0Shown = !sublayer0Shown; 
});
{% endhighlight %}

This bit of script does the following: If a user clicks the DOM element with an `id` of `sublayer0`, CartoDB.js will hide or show `sublayers[0]` depending on its state (`sublayer0Shown` being true or false). Although not concise, you can control `sublayer[1]` by copying the block of code above and changing all the 0s into 1s.

Check yours with [this working example]({{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-2/CartoDB-js-lesson2-toggles.html}}), or look at a jsFiddle [demo](http://jsfiddle.net/gh/get/library/pure/CartoDB/academy/tree/master/t/03-cartodbjs-ground-up/lesson-2/jsfiddle_demo_layercontrols).

**Pro Tip:** If you want to add ten layers but only modify one of them, put the nine that remain static into one layer source object and the non-static one in it's own layer source object. Then call createLayer twice, once on each object. In this way, you can play with the layer you want to play with without having to re-render the other nine.

### Layer opacity

To wrap up our brief introduction to the layer and sublayer methods, let's further control the display of our map by changing the opacity. Again appealing to jQuery, we can simply copy the example code from the [UI slider widget](http://jqueryui.com/slider/#rangemin) and make small modifications. 

First place the following tags into the `<head>` tags:
{% highlight javascript %}
<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
<script src="http://code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
{% endhighlight %}

Next place the following HTML tags below the `<div>` that contains the buttons:
{% highlight javascript %}
<div id="dash" style="width: 500px;">
    <p>
        <label for="amount">Opacity:</label>
        <input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold;">
    </p>
    <div id="header"></div>
    <div id="slider-range-min"></div>
</div>
{% endhighlight %}

And finally, put the following JavaScript within the `.done` method, underneath the `for` loop.

{% highlight javascript %}
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
{% endhighlight %}

Check yours with [this one]({{site.baseurl}}{{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-2/CartoDB-js-lesson2-toggles-and-slider.html). Or check out this [jsFiddle](http://jsfiddle.net/gh/get/library/pure/CartoDB/academy/tree/master/t/03-cartodbjs-ground-up/lesson-2/jsfiddle_demo_toggles_and_slider).

**Pro Tip:** If you want to control the opacity of the layers separately, you need to do two createLayer calls, one for each layer source.

Now we have built a basic app with your map! Congrats on making it this far.

If you want to explore more, check out the following links for other methods in the library:

+ cartodb.Layer are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbcartodblayer).
+ cartodb.Vis are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbvis).

That's the end of Lesson 2. You saw a little bit of SQL and CartoCSS in this lesson. The next lesson we will explore them more with the goal of customizing the display of data on your maps.

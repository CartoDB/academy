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

If you take a look through the [documentation of CartoDB.js](http://docs.cartodb.com/cartodb-platform/cartodb-js.html), you will see a lot of methods to boost the power of your maps.

We saw in the last lesson that we can pull our map from CartoDB by using createVis and createLayer. In this lesson we will take a look at some of the methods we can use to alter the layers of our map.

Download/copy the template for this lesson from [this link***]({{site.baseurl}}/t/). We will also use a new viz.json. Grab it [here](#viz_json_link). 

### Exploring callback functions on createVis and createLayer

Callback functions are an important part of the JavaScript language. Combined with `.done` and `.fail`, [jQuery methods](http://api.jquery.com/deferred.done/) that run once the object they act on is resolved, users can interact with your map once it has loaded. Both createVis and createLayer return callback objects. createVis returns `vis` and `layers`, and can be formatted like this:

{% highlight javascript %}
cartodb.createVis(dom_id, vizjson)
    .done(function(vis, layers) {
        // do stuff
    })
    .fail(function(err) {
        // report error
    });
{% endhighlight %}

createLayer only has one callback object, `layer`. It can be called like this:

{% highlight javascript %}
cartodb.createLayer(map_object, vizjson)
    .addTo(map_object)
    .done(function(layer) {
        // do stuff
    })
    .fail(function(err) {
        // report error
    });
{% endhighlight %}

This will be our working template for coding for now on.

### Multiple Layers



We'll start working with createLayer. Our goal is to do stuff after the map has loaded. To do this, we need to listen for when the map has been loaded and applied to our web page. We can use the [jQuery method](http://api.jquery.com/deferred.done/) `.done()` acting on createVis as below. Once createVis has successfully run, the function that's an argument to `.done()` runs. In our case, we're passing `layers` and `vis`, two important objects that allow control of the display of data on your map.

Look at the following snippet of code and predict what will happen. Then paste it into the template between the `<script> ... </script>` tags and save it as `lesson-2-on-done.html`. 

{% highlight javascript %}

window.onload = function () {
    
    var map = new L.Map('map', {
        zoomControl: false,
        center: [43,0], // Southern France
        zoom: 3
    });

    L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: 'Stamen'
        }).addTo(map);
    
    var layers = [
        'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json',
        'http://documentation.cartodb.com/api/v2/viz/236085de-ea08-11e2-958c-5404a6a683d5/viz.json'
    ]
    
    layers.forEach(function(vizjson) {
        cartodb.createLayer(map, vizjson)
        });

}

{% endhighlight %}

As you hopefully saw, after the map was loaded successfully, the function in `.done` was called, which made an alert go off. 

The methods for `cartodb.Vis` are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbvis). And the methods for `cartodb.Layer` are [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#cartodbcartodblayer).

The function inside of `.done()` can extract `vis` and `layers` from the createVis object. As a reminder, `layers` will be an array of two layers: the zeroth element will be the base map, while the first element will be the data layers from CartoDB. Let's use `layers` and explore some of its methods. One of the first things you can control easily is custom interactivity.






The first thing we want to do is enable interactivity for the layers of our map. So we'll need `setInteraction`. Next, we'll need to select the features that we want to be 

Get rid of the alert from the code snippet above, and replace the body of the `function() {...}` with the following:

http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json

{% highlight javascript %}
layers[1].setInteraction(true);


{% endhighlight %}





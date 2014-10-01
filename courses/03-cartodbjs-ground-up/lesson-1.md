---
id: 1
layout: lesson
title:  "Lesson 1"
subtitle: "createVis vs. createLayer"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
continue_link: "lesson-2"
tweet_text: "I just created some vis! Working my way through cartodb.js from the ground up. #CartoDB"
vizjson: "http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json"
---

## _Create Visualization_ vs. _Create Layer_

The CartoDB.js API is a powerful way to build a dynamic web app. The data is visualized dynamically with some JavaScript or with CartoCSS styling and SQL queries that you've seen in CartoDB Academy lessons up to this point. Along with CartoCSS, other JS libraries, and our SQL API, the sky's the limit. This course, CartoDB.js from the ground up, will show you how to build amazing apps in a small amount of time.

In CartoDB, there are two main methods to bring your maps into custom webpages. The first, ```createVis``` is more straight forward and has some customization, consists of two map layers in an array: layer 0 is the base map; layer 1 is the CartoDB data layer. The second method, ```createLayer``` allows for much more customization, including the combining of layers from seprate maps, each with its own levels of customization. For ```createLayer```, one has client-side control over the basemap. Both methods allow custom CartoCSS styling, SQL queries, and overlay options (zoom controls, a search box, a share button, etc.).

Before showing these methods, we need to be introduced to their main sources of information.

### Viz JSON, nice to meet you.

Up to this point, all of the methods for displaying maps to the world have involved the first two sharing methods you've seen in the sharing panel (see below). The first, "Get the link," creates a shortened URL that points to a map in your account on CartoDB's website. The second, "Embed it," gives you the HTML for an `iframe` that you can drop into your custom web page. The third option, "CartoDB.js," will be our jumping off point for this course on CartoDB.js because you'll easily be able to see how the API's methods line up with the data hierarchy of your map's metadata.

![Share panel]({{site.baseurl}}/img/course3/lesson1/share-panel.png)

Download the viz JSON used in this lesson [here](http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json). You can download a viz JSON from any visualization you've created and inspect it with your favorite text editor, or view it in your browser if you have a JSON viewer. For this lesson, we will be using the viz JSON for a multi-layer map similiar to the one created at the end of [Course 1]({{site.baseurl}}/courses/01-beginners-course/lesson-5.html). If you're unfamiliar with the JSON file format, check out the [official site](http://json.org/) or [Wikipedia](http://en.wikipedia.org/wiki/JSON) for a lot more information. 

There's a lot of metadata in this file. Browsing through all the possibilities shows you how much power you have to customize your maps in the CartoDB Editor. Review the documentation for it [here](http://docs.cartodb.com/cartodb-editor.html) to explore what some of these JSON entries allow you to do in your maps.

![Screenshot of viz JSON]({{site.baseurl}}/img/course3/lesson1/json-view.png)

If you find the top-most level called `layers`, you see that it's an array of two objects. The first object's "options" have type "Tiled" and a name of "CartoDB Flat Blue." This layer, `layers[0]`, corresponds to the base layer map of our visualization. If you try changing the base map in CartoDB Editor and reload the viz JSON, you'll see the information in this layer change accordingly. Make note of other options included in this "options" object as they will come up again later.

The next object down, `layers[1]`, contains information about the data that was loaded into the map and visualized. The first entry, `type`, tells you that this is a group of layers. Under options, you see some of the information that's used by the CartoDB.js API to retrieve information from the servers. The majority of this second object in the `layers` array is taken up by `layer_definition`. In our case, we have two sublayers in `layers[1]` to our map because there are two objects in the `layers` array that's under `layer_definition`. In future lessons, we will retrieve these layers by calling

{% highlight javascript %}
layers[1].getSubLayer(0)
{% endhighlight %}

to get the zeroth sublayer. Since they're arrays, the method `getSubLayer` uses the same index notation as JavaScript (counting from zero).

Looking at our viz JSON, we can see that the zeroth layer, buried under options, has a `layer_name` of `us_counties` and comes from our [dataset](http://acdmy.org/d/counties.zip) titled `us_counties`. The dataset consists of a collection of [GeoJSON](http://geojson.org/) MultiPolygon geometry types of counties in the United States. The second comes from a [dataset](http://acdmy.org/d/tornadoes.zip) that is made up of GeoJson Points on tornados in the United States. Other important info to pick out:


+ a `sql: "..."` tells you the SQL statement used with each data set (defaults to `select * from dataset`)
+ a `visible: true` means it'll display by default
+ a `cartocss: "..."` tells you about the styles applied to your map
+ a `interactivity: "column1, column2, ..."` tells you the info that is click/hover enabled


Now that we've thoroughly met with our viz JSON, let's look at some JavaScript methods that ineract with it.

### Create Visualization versus Create Layer
 

### CreateVis
The most basic way to display your map from CartoDB.js involves a call to 

{% highlight javascript %}
cartodb.createVis(div_id, viz_json_url[, options])
{% endhighlight %}

Couched between the ```<script> ... </script>``` tags, createVis puts a map and CartoDB data layers into the DOM element you specify. Here we use `map` and have a ```<div id='map'></div>``` placed earlier in the HTML file.

{% highlight javascript %}
<script>
    window.onload = function() {
        var vizjson = 'link from share panel';
        cartodb.createVis('map', vizjson);
    }
</script>
{% endhighlight %}

createVis also accepts options that you can dynamically specifiy. They take the form of a dictionary, and can be passed to a third optional argument.

{% highlight javascript %}
var options = {
    center: [41.8369, -87.6847], // Chicago
    zoom: 7,
    scrollwheel: true
};

cartodb.createVis('map',vizjson,options);
{% endhighlight %}

To see createVis out in the wild, check out an [awesome example](http://blog.cartodb.com/map-of-the-week-swiss-soccer/) in our Map of the Week series on our blog.

The documentation for `cartodb.createVis` is found [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#visualization).


### Create Layer

If you want to exercise more control over the layers and base map, `createLayer` may be the best option for you. You specifiy the base map yourself and load the layer from one or multiple viz JSON files. Unlike `createVis`, `createLayer` needs a map object, such as one created by Google Maps for Leaflet. This object is a required argument in a `createLayer` call. This allows more control of the basemap for the JavaScript/HTML you're writing.

A basic [Leaflet map](http://leafletjs.com/reference.html#map-class) can be created as follows:

{% highlight javascript %}
var map = new L.Map(dom_id, options);

L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Stamen'
    }).addTo(dom_id);
{% endhighlight %}

If you're just adding a single layer, you can add a layer to the above base map as follows:

{% highlight javascript %}
var vizjson = 'link from share panel';
cartodb.createLayer(map_object, vizjson);
{% endhighlight %}

Add more info here...

### Summing it up. And finally making something!

Now that we're done with our crash course, let's finally dive into making our first map with CartoDB.js.

Use [this template](#) and drop in the URL for the viz JSON linked above or pick one from your own CartoDB maps. Try putting in the `createVis` examples introduced before. Check out stellar examples out and hack away.

Using the same template, try out `createLayer`




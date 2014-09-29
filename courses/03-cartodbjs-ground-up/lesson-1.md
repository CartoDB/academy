---
id: 1
layout: lesson
title:  "Lesson 1"
subtitle: "createVis vs. createLayer"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
continue_link: "lesson-2"
tweet_text: "I just created some vis! Working my way through cartodb.js from the ground up. #CartoDB"
vizjson: "http://andye.cartodb.com/api/v2/viz/19de0ce2-3deb-11e4-b07b-0edbca4b5057/viz.json"
---

## _Create Visualization_ vs. _Create Layer_

The [CartoDB.js API](http://docs.cartodb.com/cartodb-platform/cartodb-js.html) is a powerful way to build a dynamic web app with the data you import into CartoDB. Along with CartoCSS, other JS libraries, and our [SQL API](http://docs.cartodb.com/cartodb-platform/sql-api.html), the sky's the limit. This course, CartoDB.js from the ground up, will show you how to build amazing apps in a small amount of time.


### Viz JSON, nice to meet you.

Up to this point, all of the methods for displaying maps to the world have involved the first two sharing methods you've seen in the sharing panel (see below). The first, "Get the link," creates a shortened URL that points to your map in your account on CartoDB's website. The second, "Embed it," gives you the HTML for an `iframe` that you can drop into your custom web page. The third option, "CartoDB.js," will be our jumping off point for this course on CartoDB.js because you'll easily be able to see how the API's methods line up with the data hierarchy of your map's metadata.

![Share panel]({{site.baseurl}}/img/course3/lesson1/share-panel.png)

You can download this a viz JSON from any map you've created and inspect it with your favorite text editor, or view it in your browser if you have a JSON viewer. For this lesson, we will be using the viz JSON for a multi-layer map similiar to the one created at the end of [Course 1]({{site.baseurl}}/courses/01-beginners-course/lesson-5.html). Download the viz JSON [here](http://andye.cartodb.com/api/v2/viz/19de0ce2-3deb-11e4-b07b-0edbca4b5057/viz.json). If you're unfamiliar with the JSON file format, check out the [official site](http://json.org/) or [Wikipedia](http://en.wikipedia.org/wiki/JSON) for a lot more information. 

There's a lot of metadata in this file. Browsing through all the possibilities shows you how much power you have to customize your maps in the CartoDB Editor. Review the documentation for it [here](http://docs.cartodb.com/cartodb-editor.html) to explore what some of these JSON entries allow you to do in your maps.

![Screenshot of viz JSON]({{site.baseurl}}/img/course3/lesson1/json-view.png)

If you find the top-most level called `layers`, you see that it's an array of two objects. The first object's `options` have type "Tiled" and a name of "CartoDB Flat Blue." This layer corresponds to the base layer map of our visualization. If you try changing the base map in CartoDB Editor and the reloading it, you'll see the information in this layer change accordingly. Make note of other options included in this options object as they will come up again later.

The next object down in the `layers` array contains information about the data that was loaded into the map and visualized. The first entry, `type`, tells you that this is a group of layers. Under options, you see some of the information that's used by the CartoDB.js API to retrieve information from the servers. The majority of this second object in the `layers` array is taken up by `layer_definition`. In our case, we have two layers to our map (there are two objects in the `layers` array that's under `layer_definition`).

The first, buried under options, has a `layer_name` of `us_counties` and comes from our [dataset](http://acdmy.org/d/counties.zip) titled `us_counties`. The dataset consists of a collection of [GeoJSON](http://geojson.org/) MultiPolygon geometry types of every United States county. The second comes from a [dataset](http://acdmy.org/d/tornadoes.zip) that is made up of GeoJson Points on tornados in the United States. Other important info to pick out:


+ `sql: "..."` tells you the SQL statement used with each data set (defaults to `select * from dataset`)
+ `visible: true` means it'll display by default
+ `cartocss: "..."` tells you CSS-like the styling of the map
+ `interactivity: "column1, column2, ..."` tells you the info that is click/hover enabled

Now that we've thoroughly met with our viz JSON, let's look at some JavaScript methods that ineract with it.

### Create Visualization versus Create Layer
 
In CartoDB, there are two main methods to bring your maps into custom webpages. The first, ```createVis``` is more straight forward and has some customization, consists of two map layers in an array: layer 0 is the base map; layer 1 is the CartoDB data layer. The second method, ```createLayer``` allows for much more customization, including the combining of layers from seprate maps, each with its own levels of customization. For ```createLayer```, one has client-side control over the basemap. Both methods allow custom CartoCSS and SQL commands (?), and overlay options (zoom controls, search box, share button, etc.).

### CreateVis
The most basic way to display your map from CartoDB.js involves a call to 

{% highlight javascript %}
    cartodb.createVis(div_id, viz_json_url[, options])
{% endhighlight %}

Couched between the ```<script> ... </script>``` tags, createVis puts a map and CartoDB data layers into the DOM element you specify. Here we use `map` and have a ```<div id='map'></div>``` placed earlier in the HTML file.

{% highlight javascript %}
var vizjson = 'link from share panel';
cartodb.createVis('map', vizjson);
{% endhighlight %}

createVis also accepts options that you can dynamically specifiy. They take the form of a dictionary:

{% highlight javascript %}
var options = {
    center: [3.6833, 40.4000], // Madrid
    zoom: 6, 
    zoomControl: false,  // Don't add the zoom overlay (it is added by default)
    loaderControl: false // Don't show tiles loader
  };
{% endhighlight %}

To see createVis out in the wild, check out an [awesome example](http://blog.cartodb.com/map-of-the-week-swiss-soccer/) in our Map of the Week series on our blog.

The documentation for `cartodb.createVis` is found [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#visualization).


### Create Layer

If you want to exercise more control over the layers and base map, `createLayer` may be the best option for you. You specifiy the base map yourself and load the layer from one or multiple viz JSON files. Unlike `createVis`, `createLayer` needs a map object, such as one created by Google Maps for Leaflet. This object is a required argument in a `createLayer` call. This allows more control of the basemap for the JavaScript/HTML you're writing.

A basic [Leaflet map](http://leafletjs.com/reference.html#map-class) can be specified as follows:

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




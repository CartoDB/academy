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

The CartoDB.js API provides powerful tools to build dynamic web apps. Along with CartoCSS, other JS libraries, and our SQL API, the sky's the limit. This course, CartoDB.js from the ground up, will show you how to build amazing apps in a small amount of time.

In CartoDB, there are two main methods to bring your maps into custom webpages. The first, ```createVis``` allows for quick and easy maps with a large degree of customization. It gives two map layers in an array: layer 0 is the base map; layer 1 is the CartoDB data layer. The second method, ```createLayer```, allows for much more customization, including the combining of layers from seprate maps, each with its own levels of customization. ```createLayer``` also allows client-side control over basemaps. Both methods allow custom CartoCSS styling, SQL queries, and overlay options (zoom controls, a search box, a share button, etc.).

Before showing these methods, we need to be introduced to these methods' main sources of information.

### Viz JSON, nice to meet you.

Up to this point, all of the methods for displaying maps to the world have involved the first two sharing options you've seen in the sharing panel (see below). The first, "Get the link," creates a shortened URL that points to a map in your account on CartoDB's website. The second, "Embed it," gives you an `iframe` that you can drop into your custom web page. The third option, "CartoDB.js," will be our jumping off point for this course because you'll easily be able to see how the API's methods line up with the data hierarchy of your map's metadata.

![Share panel]({{site.baseurl}}/img/course3/lesson1/share-panel.png)

Download the viz JSON used in this lesson [here](http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json). You can download a viz JSON from any visualization you've created and inspect it with your favorite text editor, or view it in your browser if you have a JSON viewer. For this lesson, we will be using the viz JSON for a multi-layer map similiar to the one created at the end of [Course 1]({{site.baseurl}}/courses/01-beginners-course/lesson-5.html). If you're unfamiliar with the JSON file format, check out the [official site](http://json.org/) or [Wikipedia](http://en.wikipedia.org/wiki/JSON) for a lot more information. 

There's a lot of metadata in this file. Browsing through all the possibilities shows you how much power you have to customize your maps in the CartoDB Editor. Review the [documentation for CartoDB Editor](http://docs.cartodb.com/cartodb-editor.html) to explore what some of these JSON entries allow you to do in your maps.

![Screenshot of viz JSON]({{site.baseurl}}/img/course3/lesson1/json-view.png)

Looking at your viz JSON, find the top-most level called `layers`. You can see that it's an array of two objects. The first object's `options` have type "Tiled" and a name of "CartoDB Flat Blue." This layer, `layers[0]`, corresponds to the base layer map of our visualization. If you try changing the base map in CartoDB Editor and reload the viz JSON, you will see the information in this layer change accordingly. Make note of other properties included in this `options` object as they will come up again later.

The next object down, `layers[1]`, contains information about the data that was loaded into the map and visualized. The first entry, `type`, tells you that this is a group of layers. Under options, you can see some of the information that's used by the CartoDB.js API to retrieve information from the servers. In contrast to `layers[0]`, the majority of this second object in the `layers` array is taken up by `layer_definition`. In our case, we have two sublayers in `layers[1]` because there are two objects in the `layers` array that's under `layer_definition`. In future lessons, we will retrieve these layers by calling

{% highlight javascript %}
sublayer1 = layers[1].getSubLayer(0);
sublayer2 = layers[1].getSubLayer(1);
...
{% endhighlight %}

Looking back at our viz JSON, we can see that the zeroth layer, buried under options, has a `layer_name` of "us_counties" and comes from our [us_counties dataset](http://acdmy.org/d/counties.zip) back in the Beginner's Course. The second comes from another familiar [dataset](http://acdmy.org/d/tornadoes.zip) on tornados in the United States. Other important info to pick out:


+ `sql: "..."` tells you the SQL statement used with each data set (defaults to `select * from dataset`)
+ `visible: true` means it'll display by default
+ `cartocss: "..."` tells you about the styles applied to your map
+ `interactivity: "column1, column2, ..."` tells you the info that is click/hover enabled

In summation, the viz JSON is CartoDB.js's conduit to the data, queries, basemaps, styles, etc. that you set when you created a visualization with the data you uploaded into your CartoDB account. Now that we've thoroughly met with our viz JSON, let's look at the two most important JavaScript methods that ineract with it.

### CreateVis
The most basic way to display your map from CartoDB.js involves a call to 

{% highlight javascript %}
cartodb.createVis(div_id, viz_json_url)
{% endhighlight %}

Couched between the `<script> ... </script>` tags, createVis puts a map and CartoDB data layers into the DOM element you specify. In the snippet below we assume that `<div id='map'></div>` placed earlier in an HTML file.

{% highlight javascript %}
    window.onload = function() {
        var vizjson = 'link from share panel';
        cartodb.createVis('map', vizjson);
    }
{% endhighlight %}

And that's it! All you need is that snippet of code, a script block that sources CartoDB.js, and inclusion of the CartoDB.js CSS file. It's really one of the easiest ways to create a custom map on your webpage.

createVis also accepts options that you specifiy outside of the CartoDB Editor. They take the form of a [JS object](http://www.w3schools.com/js/js_objects.asp), and can be passed as third optional argument.

{% highlight javascript %}
var options = {
    center: [40.4000, -3.6833], // Madrid
    zoom: 7,
    scrollwheel: true
};

cartodb.createVis('map',vizjson,options);
{% endhighlight %}

To see createVis out in the wild, check out an [awesome example](http://blog.cartodb.com/map-of-the-week-swiss-soccer/) in our Map of the Week series on our blog.

The documentation for `cartodb.createVis` is found [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#visualization).


### Create Layer

If you want to exercise more control over the layers and base map, `createLayer` may be the best option for you. You specifiy the base map yourself and load the layer from one or multiple viz JSON files. Unlike createVis, createLayer needs a map object, such as one created by Google Maps for Leaflet. This allows more control of the basemap for the JavaScript/HTML you're writing.

A basic [Leaflet map](http://leafletjs.com/reference.html#map-class) without your data can be created as follows:

{% highlight javascript %}
window.onload = function() {

    // Choose center and zoom level
    options = {
                center: [41.8369, -87.6847], // Chicago
                zoom: 7
            }
    
    // Instantiate map on specified DOM element
    var map_object = new L.Map(dom_id, options);
    
    // Add a basemap to the map object just created
    L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: 'Stamen'
        }).addTo(map_object);
        
}
{% endhighlight %}

Here we pulled the base map tiles from [Stamen](http://maps.stamen.com/). There are many other options basemap options--learn more about your options in [this great tutorial](http://docs.cartodb.com/tutorials/custom_basemaps.html).

The map we just created doesn't have any CartoDB data layers yet. If you're just adding a single layer, you can put your data on top of the basemap from above. If you want to add more, you just repeat the process. We'll be doing much more with this later.

This is the basic snippet to put your data on top of the map you just created. Drop this in below the `L.tileLayer` section.

{% highlight javascript %}
var vizjson = 'link from share panel';
cartodb.createLayer(map_object, vizjson).addTo(map_object);
{% endhighlight %}

### Summing it up. And finally making something!

Now that we're done with our crash course on the basics, let's finally dive into making our first map with CartoDB.js.

Use [this template](https://gist.github.com/ohasselblad/8464c87f8d5e34aea838) and drop in the URL for the viz JSON linked above. There are a couple of new things to notice about it. Besides the normal HTML skeleton, the template includes the CartoDB.js library
{% highlight HTML %}
<script src="http://libs.cartocdn.com/cartodb.js/v3/cartodb.js"></script>
{% endhighlight %}
__AND__ the map styling sheet
{% highlight HTML %}
<link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/themes/css/cartodb.css" />
{% endhighlight %}
between the `<head>` tags. You need them both to get your maps going.

After you get it working, swap out the viz JSON we provided and try it for some of your visualizations. Try putting in the `createVis` examples introduced before. Check out stellar examples in the [Map Gallery](http://cartodb.com/gallery/) and hack away.

Using the same template, try out `createLayer`

CartoDB.js is open source. Fork it and contribute.



---
title: "CARTO.js from the ground up — Torque.js"
redirect_from: /courses/03-cartojs-ground-up/lesson-4.html
permalink: /courses/cartojs-ground-up/torquejs/
tweet_text: "I'm more animated because of Torque.js @cartoDB"
lesson_message: "Congrats on finishing animated JavaScript mapper!"
---
# Torque.js

<iframe src="https://player.vimeo.com/video/124651323" width="700" height="393" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Torque was developed by CartoDB to show geospatial information that changes over time, and the uses are very diverse! See the band INXS [take over the world](http://inxsmap.com/), a [striking map](http://cartodb.s3.amazonaws.com/static_vizz/sunrise.html) showing Tweets mentioning sunrise, or, the inspiration for this lesson, a [visualization](https://carto.com/blog/map-of-the-week-bbr/) of the acceleration felt along a bike ride. 

Torque animated maps are great for [time series data](http://en.wikipedia.org/wiki/Time_series), that is, data that records measurements over a time interval. In order to use Torque, your data must include a timestamp or date. To learn more about the date formats CartoDB accepts, check out the [PostgreSQL documentation on date/time types](http://www.postgresql.org/docs/9.1/static/datatype-datetime.html), and [PostgreSQL functions for formatting dates](http://www.postgresql.org/docs/9.1/static/functions-formatting.html).

This lesson strongly relies on techniques developed in the past three lessons on CARTO.js, as well as general JavaScript skills. As usual, there will be some CartoCSS and SQL covered in this lesson. 

**Goals**

1. Expose the rich methods and events in the [Torque.js](https://carto.com/docs/cartodb-platform/torque-js/) library
2. Make temporal mapping more accessible and hackable
3. Make this map using JavaScript:

<iframe src="/t/03-cartojs-ground-up/lesson-4/bonus.html" width="100%" height="480"></iframe>


## Import your data

The data for this lesson comes from [Movebank](https://www.movebank.org), an amazing repository of tracking data for animals all over the world. The dataset we'll be working with is from a white stork's trip over 303 days from Greece through the Middle East to Sub-Saharan Africa and back.

Copy the link below to import the data into your account. Make sure the dataset name is `academy_torque_stork`. The file will take up approximately 8MB in your CartoDB account.

{% highlight html %}
https://carto.com/academy/d/academy_torque_stork.zip
{% endhighlight %}

Lastly, update the privacy settings once the dataset is uploaded by clicking on the padlock icon in the upper left corner in the Data View and setting the privacy to 'Public.'


## Template

The HTML template we will be using for this lesson is available in the repository where all Map Academy lessons are stored.

[Download](/t/03-cartojs-ground-up/lesson-4/template.html) (right click and Save As...) the template HTML file or [copy it from here](https://raw.githubusercontent.com/CartoDB/academy/master/_app/t/03-cartojs-ground-up/lesson-4/template.html) and open it in your preferred text editor.


## Getting started

The basic piece required to create a Torque layer on the fly in CARTO.js is the type of layer source object passed to createLayer.

The generic format for Torque is:

{% highlight javascript %}
var layerSource = {
  type: 'torque',
  options: {
    query: 'SQL statement',  // Optional, but required if `table_name` is not given
    table_name: 'table_name',  // Optional, but required if `query` is not given
    user_name: 'your_user_name',
    cartocss: 'CartoCSS styles'
  }
}
{% endhighlight %}

This JSON object is passed as the second argument to createLayer:

{% highlight javascript %}
cartodb.createLayer(map_object, layerSource)
  .addTo(map)
  .done(function(layer) {
    // do stuff
    var torqueLayer = layer;
  })
  .error(function(err) {
    console.log("Error: " + err);
  });
{% endhighlight %}

Alternatively, you can create a Torque visualization in the CartoDB Editor by copying the viz.json file and placing it in createVis:

{% highlight javascript %}
var vizjsonUrl = 'link to viz.json file';

cartodb.createVis(dom_id, vizjsonURL);
{% endhighlight %}

In this lesson, though, we'll stick with createLayer as it allows for greater customization using JavaScript. All we have to do now is to create a map as we've done in the previous three lessons. The following code goes between the `<script>` tags towards the end of the template HTML file.

{% highlight javascript %}
function main() {
  // Instantiate new map object, place it in 'map' element
  var map = new L.Map('map', {
    center: [25,25], // Western Egypt
    zoom: 4,
    scrollWheelZoom: false
  });

  // setup layer
  var layerSource = {
    type: 'torque',
    options: {
      user_name: 'your_user_name', // replace with your user name
      table_name: 'academy_torque_stork',
      cartocss: $("#cartocss").html()
    }
  }

  var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CartoDB</a>'
  });

  map.addLayer(layer);

  // put torque layer on top of basemap
  cartodb.createLayer(map, layerSource)
    .addTo(map)
    .done(function(layer) {
      // do stuff
    })
    .error(function(err) {
      console.log("Error: " + err);
    });
}

window.onload = main;
{% endhighlight %}

Below the comment `// do stuff` within createLayer is where we will add the fun customization possible with Torque.js, the focus of this lesson. 

Within the HTML template, put your CartoDB user name in the quotes after `user_name` in the layerSource object in order to pull in the dataset from your CartoDB account.

{% highlight javascript %}
// setup layer
var layerSource = {
  type: 'torque',
  options: {
    user_name: 'your_user_name', // replace with your user name
    table_name: 'academy_torque_stork',
    cartocss: $("#cartocss").html()
  }
}
{% endhighlight %}

This basic HTML template and `layerSource` will _almost_ produce a basic Torque map as you would see it in the CartoDB Editor. First though, we need to take advantage of some special Torque styling options using [CartoCSS](https://carto.com/docs/cartodb-platform/cartocss/), the syntax language that allows for greater control over how data is styled visually in CartoDB.

It's often easiest to use CartoDB's Editor to start the styling for your map and then work from there to customize it further. First, place the following CartoCSS between the `<head>` tags: 

{% highlight html %}
<style type="cartocss/text" id="cartocss">
/** torque visualization */

Map {
-torque-frame-count:303;
-torque-animation-duration:30;
-torque-time-attribute:"timestamp";
-torque-aggregation-function:"count(cartodb_id)";
-torque-resolution:2;
-torque-data-aggregation:linear;
}

#academy_torque_stork{
  comp-op: lighter;
  marker-fill-opacity: 0.9;
  marker-line-color: #FFF;
  marker-line-width: 0;
  marker-line-opacity: 1;
  marker-type: ellipse;
  marker-width: 6;
  marker-fill: #FFCC00;
}
#academy_torque_stork[frame-offset=1] {
 marker-width:8;
 marker-fill-opacity:0.45;
}
#academy_torque_stork[frame-offset=2] {
 marker-width:10;
 marker-fill-opacity:0.225;
}
</style>
{% endhighlight %}

Using the [techniques from the last lesson](/courses/cartojs-ground-up/basic-interactivity/#cartocss-strings-in-javascript), we can apply our CartoCSS styles to a DOM element by using [jQuery](https://jquery.com/).

Notice that this block's DOM `id` is "cartocss", so the

{% highlight js %}
cartocss: $("#cartocss").html()
{% endhighlight %}

statement in the `layerSource` object means that this text is applied as the CartoCSS for this map.


## Aggregate functions

An extremely useful feature of Torque is the automatic aggregation of data by bin. Using [common aggregate functions](http://www.postgresql.org/docs/9.3/static/functions-aggregate.html) from PostgreSQL you can have values calculated to highlight what's happening in any cell of your map.

This is handled in one line in the Torque CartoCSS:

{% highlight scss %}
-torque-aggregation-function:"count(cartodb_id)";
{% endhighlight %}

By default it counts the number of events happening by counting how many points (using each point's `cartodb_id`) are within the area. Each row represents an event -- something that happens in a specific place (lat, long) at a specific time or sequence (date or number column) -- so counting the `cartodb_id` means you are counting events.

The aggregate functions can operate on any other number column instead of `cartodb_id`, though. For instance, if you want to find the max magnitude of all of the events in a bin, you'd just replace the value above with `max(magnitude)`. You can do more advanced things like dividing by a constant or even dividing the `min` of one column by the `max` of another. Remember that everything happens at the bin level, and the values in bins are recalculated at new zoom levels.

The output of the aggregate calculation within a bin is stored in a special variable accessible to the CartoCSS conditional structures. It's called `value`, and you'll see its usage below.

{% highlight scss %}
Map {
  -torque-frame-count:303;
  -torque-animation-duration:30;
  -torque-time-attribute:"timestamp";
  -torque-aggregation-function:"avg(ground_spe)";
  -torque-resolution:1;
  -torque-data-aggregation:linear;
}

#academy_torque_stork{
  marker-fill-opacity: 0.7;
  marker-line-color: #FFF;
  marker-line-width: 0;
  marker-line-opacity: 1;
  marker-type: ellipse;
  marker-width: 4;
  marker-fill: #5CA2D1;
  [value < 12] {  /* if 6 <= value < 12, color the marker red */
    marker-fill: #F84F40;
  }
  [value < 6 ] { /* if 3 <= value < 6, color the marker purple */
    marker-fill: #A53ED5;
  }
  [value < 3 ] { /* if value < 3, color the marker blue */
    marker-fill: #5CA2D1;
  }
}
{% endhighlight %}

What is a bin, though? Torque automatically calculates two-dimensional bins that depend on the zoom level of your map and the resolution, which is set within CartoCSS:

{% highlight scss %}
-torque-resolution:2;
{% endhighlight %}

Points are snapped to a grid that is defined by the resolution you set (a smaller resolution produces a smaller grid spacing). This has the effect of creating a two-dimensional histogram if you aggregate by `count`, which you can then visualize by changing the opacity. Play around with different resolutions -- especially large ones -- to see the effect. Because of the nature of [quadtrees](http://en.wikipedia.org/wiki/Quadtree) and tiles based on 256 or 512 pixel edges, resolutions will produce more reliable results if they are in powers of 2. Resolutions such as 0.125 (2^(-3)), 16 (2^4), and 128 (2^7) are all acceptable.

### Our stork

For our stork, we have a column in our dataset called `ground_spe` that we are going to use to visualize the average speed of the bird within any of the bins. We can use `value` and some conditions in our CartoCSS to style the marker on the map.

PostgreSQL has many [aggregate functions](http://www.postgresql.org/docs/9.3/static/functions-aggregate.html) that return various statistical measures you might be interested in calculating.

The following style works to show the different average velocities of the stork within any two-dimensional bin for which we have data to aggregate. The values 12, 6, and 3 were chosen from applying the following query and seeing how it would be grouped or clustered.

{% highlight sql %}
SELECT
  date_part('days',timestamp),
  avg(ground_spe)
FROM
  academy_torque_stork
GROUP BY
  date_part('days',timestamp)
{% endhighlight %}

Once you get a sense of what the values are to be used later in the CartoCSS, clear this query.

The CartoCSS used to produce the map is below. Replace the CartoCSS that was previously used and use the updated styling instead.

{% highlight scss %}
Map {
    -torque-frame-count:303;
    -torque-animation-duration:30;
    -torque-time-attribute:"timestamp";
    -torque-aggregation-function:"avg(ground_spe)"; /* calculate avg speed within a bin */
    -torque-resolution:1;
    -torque-data-aggregation:linear;
}

#academy_torque_stork{
  marker-fill-opacity: 0.7;
  marker-line-color: #FFF;
  marker-line-width: 0;
  marker-line-opacity: 1;
  marker-type: ellipse;
  marker-width: 4;
  marker-fill: #5CA2D1;
  [value < 12] {
    marker-fill: #F84F40;
  }
  [value < 6 ] {
    marker-fill: #A53ED5;
  }
  [value < 3 ] {
    marker-fill: #5CA2D1;
  }
}
#academy_torque_stork[frame-offset=1] {
 marker-width:2.75;
 marker-fill-opacity:0.5;
}
#academy_torque_stork[frame-offset=2] {
 marker-width:1.75;
 marker-fill-opacity:0.25;
}
#academy_torque_stork[frame-offset=3] {
 marker-width:1;
 marker-fill-opacity:0.125;
}
#academy_torque_stork[frame-offset=4] {
 marker-width:0.5;
 marker-fill-opacity:0.0625;
}
{% endhighlight %}

Besides the styling based on the average speed, there is also styling in the trailing frames. The offsets give the effect of a breadcrumb trail where the markers get smaller and less opaque as time passes, like ants eating the crumbs.

Besides `frame-offset` and `value`, you can also use `zoom` in the CartoCSS to style your map.


## Pulling it all together

To pull in that new styling all you have to do is replace the previous styling with the one above.

To add some control to your maps, there are several [event handlers](https://github.com/CartoDB/torque/blob/master/doc/API.md#events) specific to Torque. For instance, you can add the following piece of code below the line `var torqueLayer = layer;` to have the map stop playing at the final step:

{% highlight javascript %}
// pause animation at last frame
torqueLayer.on('change:time', function(changes) {
  if (changes.step === torqueLayer.provider.getSteps() - 1) {
    torqueLayer.pause();
  }
});
{% endhighlight %}

And to ensure that the map does not play without all of the tiles loading, use this piece of code:

{% highlight javascript %}
// once animation is loaded, automatically play
torqueLayer.on('load', function() {
    torqueLayer.play();
});
{% endhighlight %}

As a checkpoint, check yours against a working version:

+ <a href="https://github.com/CartoDB/academy/raw/master/_app/t/03-cartojs-ground-up/lesson-4/" target="_blank">Source code</a>
+ <a href="{{ site.baseurl }}/t/03-cartojs-ground-up/lesson-4/checkpoint.html" target="_blank">Live version</a>


## Taking it further

We can wire up some query events to our SQL to investigate the behavior of our stork within specific countries. Like the static data layers we saw in the previous section, we can apply `setSQL(...)` to our `torqueLayer` to alter the data in our map. The following requires some more advanced uses of SQL and JavaScript. _Instead of copying and pasting as before, it is recommended to look at the <a href="https://github.com/CartoDB/academy/raw/master/_app/t/03-cartojs-ground-up/lesson-4/torque-sql.html" target="_blank">the source code</a> for the <a href="{{ site.baseurl }}/t/03-cartojs-ground-up/lesson-4/torque-sql.html" target="_blank">working example</a> instead._

To do this, we need to do a spatial intersection of our data points with country polygons. I loaded the dataset of African Countries (`africa_adm0`) from Common Data, CartoDB's data library, and applied a query similar to the following (which we'll update to make it more responsive in JavaScript). This grabs all the data for the stork that intersects with the country Chad.

{% highlight sql %}
SELECT
  s.*
FROM
  academy_torque_stork s,
  (
    SELECT
      the_geom
    FROM
      africa_adm0
    WHERE
      name = 'Chad'
  ) a
WHERE
  ST_Intersects(
    s.the_geom,
    a.the_geom
  )
{% endhighlight %}

To make it responsive to user interaction, we can remove the example of Chad, and convert it to use [mustache templates](https://github.com/janl/mustache.js/) on the variable country:

{% highlight html %}
<style type="text/sql" id="sql">
SELECT
  s.*
FROM
  academy_torque_stork s,
  (
    SELECT
      the_geom
    FROM
      africa_adm0
    WHERE
      name = '{% raw %}{{country}}{% endraw %}'
  ) a
WHERE
  ST_Intersects(
    s.the_geom,
    a.the_geom
  )
</style>
{% endhighlight %}

Besides relying on [jQuery](https://jquery.com/), CARTO.js relies on [mustache.js](https://github.com/janl/mustache.js/), where you can easily template text strings. That's what's in `{% raw %}{{country}}{% endraw %}` above.

We wire this into the JavaScript similar to what is below. It's close to what was done in the previous lesson but since the time component changes, the slider automatically changes to reflect the total span of time the stork visited the country selected.

{% highlight javascript %}
// generate SQL to reflect user interaction
var newSQL = Mustache.render($("#sql").html(), {country: countrySelected});

// print to console for debugging purposes
console.log("SQL applied:",newSQL);

// apply SQL to torque layer
torqueLayer.setSQL(newSQL);
{% endhighlight %}

We need to put these pieces of code into some `if` statements so it's easy to reset the map, place the selector function in the proper place, and add buttons.

Here's the selector function:

{% highlight javascript %}
// Create data selector
function createSelector(layer) {
    var condition = "";
    var $options = $(".layer_selector").find("li");
    $options.click(function(e) {
      layer.stop();
      var $li = $(e.target);
      var selected = $li.attr('data');
      if (selected === 'XXXXX') {
          var newSQL = "SELECT * FROM " + tableName;
          $("#location").text("");
      } else {
          var newSQL = Mustache.render($("#sql").html(),{country: selected});
          $("#location").text("to " + selected);
      }
      console.log("SQL applied:",newSQL);
      layer
        .setSQL(newSQL)
        .on('load', function() {
            layer.play();
        });
    });
}
{% endhighlight %}

Next we need to add `createSelector(torqueLayer)` within `.done(...)` after `var torqueLayer = layer;`.

And finally, we need to add buttons that will trigger the query to be applied based on user interaction. The CSS to style the buttons is already in the template. We can do this with the following:

{% highlight html %}
<div id="sql-buttons" class="layer_selector">
    <p>Select a country to see the stork's movements there </p>
    <ul>
        <li data="Chad">Chad</li>
        <li data="Egypt">Egypt</li>
        <li data="S. Sudan">South Sudan</li>
        <li data="Sudan">Sudan</li>
        <li data="XXXXX">Reset to All</li>
    </ul>
</div>
{% endhighlight %}

Checkout a <a href="{{ site.baseurl }}/t/03-cartojs-ground-up/lesson-4/torque-sql.html" target="_blank">live working example</a> or <a href="https://github.com/CartoDB/academy/raw/master/_app/t/03-cartojs-ground-up/lesson-4/torque-sql.html" target="_blank">view the source code</a>.


## Bonus: Adding another layer

Unlike static layers, Torque layers cannot have sublayers. If you want to slap on an underlying static layer to show the overall movement of our stork, we can add another createLayer with a layer source object that defines the underlying style.

The following will produce a dashed white line underneath the animated layer:

{% highlight javascript %}
var staticLayerSource = {
  type: 'cartodb',
  sublayers: [{
    sql: "SELECT ST_MakeLine(the_geom_webmercator ORDER BY timestamp) the_geom_webmercator FROM academy_torque_stork",
    cartocss: "#academy_torque_stork{line-color: #FFFFFF; line-width: 1; line-opacity: 0.7; line-dasharray: 3,2,1;}"
  }]
}

cartodb.createLayer(map,staticLayerSource).addTo(map);
{% endhighlight %}

The query makes a long line ordered by the column `timestamp`, and the CartoCSS `line-dasharray` makes it dashed. Learn more about SQL in our [Map Academy lessons on PostGIS](/courses/sql-postgis/postgis-in-cartodb/).


## Resources and other examples

* [Torque.js documentation](https://github.com/CartoDB/torque/blob/master/doc/API.md)
* [CARTO.js documentation](https://carto.com/docs/cartodb-platform/cartodb-js/)
* [Visualize Bird Flight](http://lifewatch.inbo.be/blog/posts/forward-trajectory-visualizations.html) in a single night
* [Bird Tracking](http://smithsonianscience.si.edu/2015/05/satellite-tracking-helps-with-curlew-conservation/) on Smithsonian Science
* An [EcoHack](https://carto.com/blog/ecohack/) on animal tracks (map [here](http://robbykraft.github.io/AnimalTrack/))

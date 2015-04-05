---
id: 4
layout: lesson
title:  "Lesson 4"
subtitle: "Torque.js"
course: "CartoDB.js from the ground up"
course_slug: "03-cartodbjs-ground-up"
tweet_text: "I'm more animated because of Torque.js @cartoDB"
vizjson: "http://documentation.cartodb.com/api/v2/viz/47a9b8f8-da51-11e4-b561-0e0c41326911/viz.json"
lesson_message: "Congrats on finishing, animated JavaScript mapper!"
---

## Torque.js

Torque was developed by CartoDB to show geospatial information that changes in time. The uses are very diverse! See the band INXS [take over the world](http://inxsmap.com/), a [striking map](http://cartodb.s3.amazonaws.com/static_vizz/sunrise.html) showing Tweets mentioning sunrise, or, the inspiration for this lesson, a [visualization](http://blog.cartodb.com/map-of-the-week-bbr/) of the acceleration felt on a bike ride.

This lesson strongly relies on techniques developed in the past three lessons on CartoDB.js, as well as general JavaScript skills. As usual, there will be some CartoCSS and SQL used in this lesson.

**Goals**

1. Expose the rich methods and events in the Torque.js library
2. Make temporal mapping more accessible and hackable
3. Make this map using JavaScript:

<iframe src="{{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-4/final_product.html" width="100%" height="480"></iframe>

### Import your data

The data for this lesson comes from [MoveBank](https://www.movebank.org), an amazing repository of tracking data for animals all over the world. The dataset we'll be working with is from a white stork's trip over 303 days from Greece, through the Middle East, to Sub-Saharan Africa, and back.

Copy the following link to import the data into your account. Make sure the table name is `academy_torque_stork`. The file will take up about 8 MB in your account.

{% highlight html %}
http://academy.cartodb.com/d/academy_torque_stork.zip
{% endhighlight %}

### Template

The HTML template we will be using for this lesson is available in the repository where all Map Academy lessons are stored.

[Download](/t/03-cartodbjs-ground-up/lesson-4/template.html) (right click and Save As...) the template HTML file or [copy it from here](https://raw.githubusercontent.com/CartoDB/academy/master/t/03-cartodbjs-ground-up/lesson-4/template.html).

## Getting started

The basic piece required to create a Torque layer on the fly in CartoDB.js is the type of layer source object passed to createLayer.

The generic format for Torque is:

{% highlight javascript %}
var layerSource = {
        type: 'torque',
        options: {
            query: 'SQL statement', 	// Required if `table_name` is not given
            table_name: 'table_name', 	// Required if `query` is not given
            user_name: 'your_user_name',
            cartocss: 'CartoCSS styles',
        }
    }
{% endhighlight %}

This JSON object is passed as the second argument to createLayer:

{% highlight javascript %}
cartodb.createLayer(map_object, layerSource)
    .done(function(layer) {
        // do stuff
        var torqueLayer = layer;
    })
    .error(function(err) {
        console.log("Error: " + err);
    });
{% endhighlight %}

Alternatively, you can create a Torque visualization in the CartoDB Editor, copy the viz.json file, and place it in createVis:

{% highlight javascript %}
var vizjsonUrl = 'link to viz.json file';

cartodb.createVis(dom_id, vizjsonURL);
{% endhighlight %}

In this lesson, though, we'll stick with createLayer as it exposes more to customize using JavaScript. All we have to do now is to create a map as we've done in the previous three lessons. The following goes between the `<script>` tags towards the end of the template HTML file.

{% highlight javascript %}
window.onload = function() {

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
            user_name: 'documentation', // replace with your user name
            table_name: 'academy_torque_stork',
            cartocss: $("cartocss")
        }
    }

    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });

    map.addLayer(layer);

    // put torque layer on top of basemap
    cartodb.createLayer('map', layerSource)
        .done(function(layer) {
            // do stuff
        })
        .error(function(err) {
            console.log("Error: " + err);
        });
}

window.onload = main;
{% endhighlight %}

Below the comment `// do stuff` is where we will be adding some of the fun that comes in doing Torque.js and will be the focus of this lesson. Paste that into your HTML template and customizing `layerSource` to reflect your credentials will _almost_ produce a basic Torque map as you would see it in the CartoDB Editor. First we need to take advantage of some special Torque styling options with CartoCSS.

It's often easiest to use CartoDB's Editor to start the styling for your map and then work from there to customize it further with CartoCSS. Using the [techniques from the last lesson]({{site.baseurl}}/courses/03-cartodbjs-ground-up/lesson-3.html#cartocss-strings-in-javascript), we can grab the styles from a DOM element using [jQuery](https://jquery.com/) by placing the following between the `<head>` tags:

{% highlight html %}
<style type="cartocss/text" id="basic">
/** torque visualization */

Map {
-torque-frame-count:512;
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

Notice that this block's `id` is "cartocss", so the

{% highlight js %}
cartocss: $("#cartocss").html()
{% endhighlight %}

statement in the `layerSource` object means that this text is applied as the CartoCSS for this map.

## Aggregate functions

An extremely useful feature of Torque is the automatic aggregation of data by bin. Using common aggregate functions from SQL you can have values calculated to highlight what's happening in any cell of your map.

This is handled in one line in the Torque CartoCSS:

{% highlight css %}
-torque-aggregation-function:"count(cartodb_id)";
{% endhighlight %}

By default it counts the number of events happening by counting how many points (using each point's `cartodb_id`) are within the area. Each row represents an event -- something that happens in a specific place (lat, long) at a specific time or sequence (date or number column) -- so counting `cartodb_id`s means you are counting events.

The aggregate functions can operate on any other number column instead of `cartodb_id`, though. For instance, if you want to find the max magnitude of all of the events in a bin, you'd just replace the value above with `max(magnitude)`. You can do more advanced things like dividing by a constant or even dividing the `min` of one column by the `max` of another. Remember that everything happens at the bin level, and that bins are recalculated at new zoom levels.

The output of the aggregate calculation within a bin is stored in a special variable accessible to the CartoCSS conditional structures. It's called `value`, and you'll see its usage below.

{% highlight css %}
Map {
    -torque-frame-count:512;
    -torque-animation-duration:30;
    -torque-time-attribute:"timestamp";
    -torque-aggregation-function:"avg(ground_speed)";
    -torque-resolution:0.125;
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

What is a bin, though? Torque automatically calculates two-dimensional bins that depend on the zoom level of your map and the resolution you define in the Torque flavor of CartoCSS using the resolution setting:

{% highlight css %}
-torque-resolution:2;
{% endhighlight %}

Points are snapped to a grid that is defined by the resolution you set (a smaller resolution produces a smaller grid spacing). This has the effect of creating a two-dimensional histogram if you aggregate by `count`, which you can then visualize by changing the opacity. Play around with different resolutions -- especially large ones -- to see the effect. Because of the nature of [quadtrees](http://en.wikipedia.org/wiki/Quadtree) and tiles based on 256 or 512 pixel edges, resolutions will produce more reliable results if they are in powers of 2. Resolutions such as 0.125 (2<sup>-3</sup>), 16 (2<sup>4</sup>), and 128 (2<sup>7</sup>) are all acceptable.

### Our stork

For our stork, we have a column in our data set called `ground_speed` that we are going to use to visualize the average speed of the bird within any of the bins. We can use `value` and some conditions in our CartoCSS to style the marker on the map.

PostgreSQL has many [aggregate functions](http://www.postgresql.org/docs/9.3/static/functions-aggregate.html) that give back the various statistical measures you could be interested in calculating.

The following style works to show the different average velocities of the stork within any two dimensional bin for which we have data to aggregate. The values 12, 6, and 3 were chosen from applying the following query and getting intuition about how it would be grouped or clustered.

{% highlight sql %}
SELECT
  date_part('days',timestamp),
  avg(ground_speed)
FROM
  academy_torque_stork
GROUP BY
  date_part('days',timestamp)
{% endhighlight %}

The CartoCSS used to produce the map is here:

{% highlight css %}
Map {
    -torque-frame-count:512;
    -torque-animation-duration:30;
    -torque-time-attribute:"timestamp";
    -torque-aggregation-function:"avg(ground_speed)"; /* calculate avg speed within a bin */
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

To add some control to your maps, there are several [event handlers](https://github.com/CartoDB/torque/blob/master/doc/API.md#events). For instance, you can add the following piece of code the line below `var torqueLayer = ...` to have the map stop playing at the final step:

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

## Taking it further

We can wire up some query events to our SQL to investigate the behavior of our stork within specific countries. Like the static data layers we saw in the previous section, we can apply `setSQL(...)` to our `torqueLayer` to alter the data in our map. The following requires some more advanced uses of SQL and JavaScript.

To do this, we need to do a spatial intersection of our data points with country polygons. I loaded the dataset of African Countries (`africa_adm0`) from Common Data, CartoDB's data library, and applied a query similar to the following (which we'll update to make it more responsive in JavaScript):

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

To make it interactive, we need to convert it to:

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

Besides relying on [jQuery](https://jquery.com/), CartoDB.js relies on [mustache.js](https://github.com/janl/mustache.js/), where you can easily template text strings. That's what's in `{% raw %}{{country}}{% endraw %}` above.

We wire this into the JavaScript as below. It's similar to what was done in the previous lesson but since the time component changes, the slider automatically changes to reflect the total span of time the stork visited the country selected.

{% highlight javascript %}
// generate SQL to reflect user interaction
var newSQL = Mustache.render($("#sql").html(),{country: countrySelected});

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

And finally, we need to add buttons that will trigger the query to be applied based on user interaction. We can do this with the following:

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

Checkout a <a href="{{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-4/bonus.html" target="_blank">live working example</a> or <a href="https://github.com/CartoDB/academy/raw/master/t/03-cartodbjs-ground-up/lesson-3/cartocss-string.html" target="_blank">view the source code</a>.

### Resources

* Torque.js documentation
* CartoDB.js documentation


**Happy Mapping!**

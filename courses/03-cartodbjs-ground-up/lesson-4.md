---
id: 4
layout: lesson
title:  "Lesson 4"
subtitle: "Torque.js"
course: "CartoDB.js from the ground up"
course_slug: "03-cartodbjs-ground-up"
tweet_text: "Animating maps with JavaScript and Torque"
vizjson: "http://documentation.cartodb.com/api/v2/viz/07a3e3bc-6df7-11e4-b5a6-0e9d821ea90d/viz.json"
lesson_message: "I'm more animated because of Torque.js"
---

Torque is close to our heart at CartoDB.


**Goals with this lesson**

1. Expose the rich methods and events in the Torque.js library
2. Make temporal mapping more accessible and hackable

## Getting started

The basic piece for creating a Torque layer on the fly in CartoDB.js, is only a difference in the layer source passed to createLayer.

The generic format is:

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
cartodb.createLayer(dom_id,layerSource)
    .done(function(layer) {
        // do stuff
    })
    .error(function(err) {
        console.log("Error: " + err);
    });
{% endhighlight %}

Below the comment `// do stuff` is where we will be adding all the fun that comes in doing Torque.js and will be the focus of this lesson.

## Aggregate functions

An extremely useful feature of Torque is the automatic aggregation of data by bin. Using common aggregate functions from SQL you can have values calculated to highlight what's happening in any cell of your map. 

This is handled in one line of the Torque flavor of CartoCSS:

{% highlight css %}
-torque-aggregation-function:"count(cartodb_id)";
{% endhighlight %}

By default it counts the number of events happening by counting how many `cartodb_id`s are within the area. But you can have it operate on any other number column instead. For instance, if you want to find the max magnitude of a specific column, you'd just replace the value above with `max(magnitude)`. You can do more advanced things like dividing by a constant or even dividing the `min` of one column by the `max` of another.

What's a bin, though? Torque automatically calculates two-dimensional bins that depend on the zoom level of your map and the resolution you define in:

{% highlight css %}
-torque-resolution:2;
{% endhighlight %}

Points are snapped to a grid that is defined by the resolution you set. This has the effect of creating a two-dimensional histogram if you aggregate by `count`.

## Pulling it all together



## Bonus Section

We can wire up some query events to our SQL to investigate the behavior or our stork within specific countries. Like the static data layers we saw in the previous section, we can apply `setSQL(...)` to our `torqueLayer` to alter the data in our map. Warning: this requires some more advanced uses of SQL and JavaScript.

To do this, we need to do a spatial intersection of our data points with country polygons. I loaded the `africa_adm0` table from Common Data, CartoDB's data library, and applied the following query (which we'll update to make it more responsive in JavaScript):

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

We need to convert it to:

{% highlight html %}
<style type="text/sql" id="sql">
SELECT 
  s.* 
FROM 
  white_stork_movebank_non_null s, 
  (
    SELECT 
      the_geom 
    FROM 
      africa_adm0 
    WHERE 
      name = '{{country}}'
  ) a
WHERE 
  ST_Intersects(
    s.the_geom,
    a.the_geom
  )
  </style>
{% endhighlight %}

Besides relying on [jQuery](), CartoDB.js relies on [mustache.js](https://github.com/janl/mustache.js/), where you can easily template text strings. That's what's in `{{country}}` above.

We wire this into the JavaScript as below.

{% highlight javascript %}
var newSQL = Mustache.render($("#sql").html(),{country: countrySelected});
torqueLayer.setSQL(newSQL);
$("#desc").html("<p>The Torque stork's journey in " + countrySelected + "</p>");
{% endhighlight %}

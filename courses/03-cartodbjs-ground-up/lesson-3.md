---
id: 3
layout: lesson
title:  "Lesson 3"
subtitle: "Basic interactivity"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
tweet_text: "Lesson 3 from CartoDB.js helped me query and style"
vizjson: "http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json"
---

## Basic Interactivity

In the last lesson, we got a small peek at CartoCSS and SQL when we created a layer source object to get information to createLayer:

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
            cartocss: '#ne_50m_lakes {polygon-fill:#0000FF;}'
        }]
}
{% endhighlight %}

SQL is a language for asking specific questions of your data and getting answers. For instance, if you have a database of home prices in different postal codes, one can easily find all homes at a certain price in a certain postal code. CartoDB uses a specific SQL database called PostgreSQL. SQL is an acronym for _structured querying language_. If you want to learn more, check out the following resources:

+ A more traditional approach to learning SQL by [W3Schools](http://www.w3schools.com/sql/)
+ Other resources? 

CartoCSS is a language to change the appearance of the data in your map. Look up at the layer source code above, you can see some of the simpler ways of styling data.

And finally, we can add another entry to the sublayer object to allow users to get click/hover event on their maps.

**Our goal with this lesson:**
Add more interactivity to our maps by appealing to SQL and CartoCSS.

We will be using the real-time earthquake data available through CartoDB's Common Data. It pulls data automatically from the [United States Geological Services' archive](http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php), which is updated every five minutes. As you will be doing this lesson at a different time, your data will appear different than what appears in this lesson. If you don't see enough natural disaster data to make your map complete, import another data set from [USGS' website](http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php) that has a longer span of time.

Before working with any data, it is important to inspect it.

The table has about a dozen columns, all of which are [explained here](http://earthquake.usgs.gov/earthquakes/feed/v1.0/glossary.php#time). The ones of interest to us are:

+ time (date format)
+ latitude (number)
+ longitude (number)
+ depth (number -- depth in kilometers below surface)
+ mag (number -- [magnitude of event](http://earthquake.usgs.gov/learn/glossary/?term=magnitude))
+ place (string -- where the event occurred)

We will start out with the following layer source. We will be able to update the layer by calling some of the listed methods of the CartoDB.js API.

{% highlight javascript %}
var layerSource = {
    user_name: 'documentation', 
    type: 'cartodb',
    sublayers: [
        { 
            sql: "SELECT * FROM all_day_cdb_gu_l3", // All earthquakes in the past 24 hours
            cartocss: '#all_day{marker-fill-opacity:0.9;marker-line-color:FFF;marker-line-width: 1.5;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 10;marker-fill: #FF6600;marker-allow-overlap: true;}'
        }]
    }
{% endhighlight %}

The main method to change these definitions after they have been declared is `sublayer.set(layerDefinition)`, but if you only need to change CartoCSS or SQL, there are more conventient functions `setCartoCSS({...})` and `setSQL({...})`.

### CartoCSS
CartoCSS is a styling language that works with the data you import into CartoDB. It helps you make your maps beautiful. It was created by [MapBox](https://www.mapbox.com) and is [open source](https://github.com/mapbox/carto).

In CartoDB.js we can initialize our layer with pre-defined CartoCSS like we saw above, or we can update it on the fly with `sublayer.setCartoCSS({'cartocss': '#layer_name {...}'})`.

There are several types of elements to look at with CartoCSS, all based on an underlying map server layer called Mapnik. The elements that we will focus on now are: point, line, and polygon.

Conditions in CartoCSS

If you want to style points based on the values, you can use conditions similar to what you would use for an if/else statement in JavaScript.

The format is as follows:
{% highlight javascript %}
#table_name [column1 > val1] {
    marker-width: 10;
}
#table_name [column2 > val2] {
    marker-width: 20;
}
etc.
{% endhighlight %}

Doing this, your styles are more dynamic and responsive to your data. It allows you to easily make your own choropleth, category, or bubble map, just as you would see in the Visualization wizard in CartoDB Editor. In our case, we are working with data that is continuous.

[Fun example](http://bl.ocks.org/xavijam/57f1c141bff4990b598f) by [Javier Medina](https://github.com/xavijam).

### Basic SQL queries
Let's do a few simple queries in the CartoDB Editor, and then work in JavaScript to build an application with some of the more interesting queries. Since we're working with earthquake data, let's find 


### Interactivity
Besides using SQL and CartoCSS, you can set the interactivity of your map by passing a third key to your layer source:

{% highlight javascript %}
layerSource = {
    sql: 'SELECT * FROM table_name',
    cartocss: '#table_name{...}',
    interactivity: 'column1, column2, ...'
}
{% endhighlight %}

You can also enable interactivity afterwards by using `setInteractivity(true)` and then `setInteraction('column1, column2, ...')`.




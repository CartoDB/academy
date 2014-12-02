---
id: 3
layout: lesson
title:  "Lesson 3"
subtitle: "Basic interactivity"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
tweet_text: "Lesson 2 from CartoDB.js from the ground up is coming soon!"
vizjson: "http://andye.cartodb.com/api/v2/viz/19de0ce2-3deb-11e4-b07b-0edbca4b5057/viz.json"
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

In this lesson, we will be using these two powerful languages to boost the expressiveness of our maps.

_SQL_ is a language for posing queries on your data and getting back the data that matches your query. For instance, if you have a database of home prices in different postal codes, one can easily find all homes within a certain price range in a specific postal code. SQL is an acronym for _structured querying language_. If you want to learn more about SQL, check out our course [SQL and PostGIS in CartoDB]({{site.baseurl}}/course/04-sql-postgis.html). In this lesson, we will only be using basic SQL so don't worry if you're unfamiliar with this language.

_CartoCSS_ is a language to change the appearance of the data layer on your map. Look up at the layer source code above, you can see some of the simpler ways of styling data. CartoCSS is a styling language that works with the data you import into CartoDB. It helps you make your maps beautiful. It was created by [MapBox](https://www.mapbox.com) and is [open source](https://github.com/mapbox/carto). 

Using the CartoDB.js API, the main methods to change the SQL and CartoCSS after they have been declared is `sublayer.set(layerDefinition)`, but if you only need to change one of CartoCSS or SQL, there are some convenient functions:

* `setCartoCSS("...")`
* `setSQL("...")`

**Our goal with this lesson:**
Add more interactivity to our maps by using CartoDB.js methods for altering SQL and CartoCSS.

### The Data

We will be using the real-time earthquake data available through CartoDB's [Common Data](http://blog.cartodb.com/better-common-data/). It pulls data automatically from the [United States Geological Services' archive](http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php), which is updated every hour. As you will be doing this lesson at a different time than when this lesson was written, your data will appear different than what appears below. If you don't see enough natural disaster data to make your map complete, import another data set from [USGS' website](http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php) that has a longer span of time.

To get started, go to your account and select Common Data. Once there, select "Physical Datasets" and then "Realtime earthquakes." This will import the earthquake data into your account. Inspect the columns, play with the [filters](http://docs.cartodb.com/cartodb-editor.html#filters), [alter the SQL](http://docs.cartodb.com/cartodb-editor.html#custom-sql) to figure out the type of information that's contained in the data table.

Before working with any data, it is important to inspect the data types and their values.

The table has about a dozen columns, all of which are [explained here](http://earthquake.usgs.gov/earthquakes/feed/v1.0/glossary.php). The ones of interest to us are:

+ time (date format)
+ latitude (number)
+ longitude (number)
+ depth (number) -- depth of the event in kilometers
+ mag (number) -- [magnitude of event](http://earthquake.usgs.gov/learn/glossary/?term=magnitude)
+ place (string) -- description of where the event occurred

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

### CartoCSS
Since we have only point data in our earthquake dataset, we will be focusing on the `marker` type of CartoCSS, but as you can see in the documentation it is only one of several object types that can be styled directly on your map.

An easy way to get used to the basics of CartoCSS is by using the [Vizualization wizard](http://docs.cartodb.com/cartodb-editor.html#wizards) in CartoDB Editor. It allows you to pick different visualizations and style them differently in the wizard.

Make sure you're in "MAP VIEW" to see your data visualized with as _Simple_.  Sticking with _Simple_, click on the [CartoCSS Editor tab](http://docs.cartodb.com/cartodb-editor.html#cartocss) (the one with `CSS`) two below the Wizards tab to see how your data is styled.

![Simple CartoCSS Visualization]({{baseurl.site}}/img/course3/lesson3/cartocss-simple.png)

You should see that the marker fill has an opacity option (`marker-fill-opacity`), the border to the marker (`marker-line-color`) is colored to be white (#FFF is short for #FFFFFF, which is white in hexadecimal), the marker width is set to 10, the fill is orange (#FF6600), and so on. Check out the [CartoCSS docs](https://github.com/mapbox/carto/blob/master/docs/latest.md) for more info about the other options.

Now switch to _Choropleth_, select the `mag` column and _Equal Interval_ as Quantification. Now switch to the CartoCSS tab again. You can see that in addition to the first data structure, there are additional ones with conditional statements on the `mag` column. If you switch to select _Bubble_ from the Visualization Wizard, you will see your marker sizes given conditional styles like 

The format is as follows:
{% highlight css linenos %}
    #table_name [mag < val1] {
        marker-width: 10;
    }
    #table_name [mag < val2] {
        marker-width: 20;
    }
    ...
{% endhighlight %}

There are several types of elements to look at with CartoCSS, all based on an underlying map server layer called Mapnik. The elements that we will focus on now are: point, line, and polygon.

Conditions in CartoCSS

If you want to style points based on the values, you can use conditions similar to what you would use for an if/else statement in JavaScript.

Doing this, your styles are more dynamic and responsive to your data. It allows you to easily make your own choropleth, category, or bubble map, just as you would see in the Visualization wizard in CartoDB Editor. In our case, we are working with data that is continuous.

In CartoDB.js we can initialize our layer with pre-defined CartoCSS like we saw above, or we can update it on the fly with `sublayer.setCartoCSS({'cartocss': '#layer_name {...}'})`.

[Fun example](http://bl.ocks.org/xavijam/57f1c141bff4990b598f) by [Javier Medina](https://github.com/xavijam).

### Basic SQL queries
Let's do a few simple queries in the CartoDB Editor, and then work in JavaScript to build an application with some of the more interesting queries. Since we're working with earthquake data, let's find 


If you want to go a lot further with SQL and know (or want to learn) a little PostGIS, check out the tutorial [Query by Distance](http://docs.cartodb.com/tutorials/query_by_distance.html).

### Interactivity, the third option
And finally, we can add another entry to the sublayer object to allow users to get click/hover event on their maps.

Besides using SQL and CartoCSS, you can set the interactivity of your map by passing a third key to your layer source:

{% highlight javascript %}
layerSource = {
    sql: 'SELECT * FROM table_name',
    cartocss: '#table_name{...}',
    interactivity: 'column1, column2, ...'
}
{% endhighlight %}

As this is a 

You can also enable interactivity afterwards by using `setInteractivity(true)` and then `setInteraction('column1, column2, ...')`.



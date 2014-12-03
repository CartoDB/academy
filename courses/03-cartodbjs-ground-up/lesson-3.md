---
id: 3
layout: lesson
title:  "Lesson 3"
subtitle: "Basic interactivity"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
tweet_text: "I'm learning how to use SQL and CartoCSS in CartoDB's JavaScript API!"
vizjson: "http://andye.cartodb.com/api/v2/viz/19de0ce2-3deb-11e4-b07b-0edbca4b5057/viz.json"
---

## The basics 

This is the third lesson in the course _CartoDB.js from the ground up_. While covering our JavaScript API in more depth, this lesson also relies on a basic understanding of the CartoCSS and SQL languages. We will keep it pretty basic here so you should not have trouble following along. If you would prefer to have a crash course before starting, check out some of the great documentation and use cases for CartoCSS. For SQL, you can teach yourself using the CartoDB Editor by using our first lesson in the [SQL and PostGIS in CartoDB]({{site.baseurl}}/course/04-sql-postgis.html) series. 

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

In this lesson, we will be using these powerful languages to boost the expressiveness of our maps.

_SQL_ is a language for posing queries on your data and getting back the data that matches your query. For instance, if you have a database of home prices in different postal codes, one can easily find all homes within a certain price range in a specific postal code. SQL is an acronym for _structured querying language_.

_CartoCSS_ is a language for altering the appearance of the data layer on your map. Look up at the layer source code above, you can see some of the simpler ways of styling data. CartoCSS is a styling language that works with the data you import into CartoDB. It helps you make your maps beautiful. It was created by [MapBox](https://www.mapbox.com), is [open source](https://github.com/mapbox/carto), and is [lots of fun](link/to/fun/example/of/cartocss). 

Using the CartoDB.js API, the main method to change the SQL and CartoCSS after they have been declared is `sublayer.set(sublayerDefinition)`, where `sublayerDefinition` is equivalent to one of the object in the `sublayers` array declared in `layerSource` above. If you only need to change one of CartoCSS or SQL for a previously created layer, there are some convenient methods:

* `sublayer.setCartoCSS("new CartoCSS styles")`
* `sublayer.setSQL("new SQL")`

If you want to retrieve previously created sublayers, you have:

* `sublayer.getCartoCSS("new CartoCSS styles")`
* `sublayer.getSQL("new SQL")`

**Our goal with this lesson:**
Add more interactivity to our maps by using CartoDB.js sublayer methods for altering SQL and CartoCSS.

### The Data

We will be using the real-time earthquake data available through CartoDB's [Common Data](http://blog.cartodb.com/better-common-data/). It pulls data automatically from the [United States Geological Services' archive](http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php), which is updated every hour. As you will be doing this lesson at a different time than when this lesson was written, your data will appear different than what appears below. If you don't see enough natural disaster data to make your map complete, import another data set from [USGS' website](http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php) that has a longer span of time.

Before working with any data, it is important to inspect the data types and their values.

To get started, go to your account and select Common Data. Once there, select "Physical Datasets" and then "Realtime earthquakes." This will import the earthquake data into your account. Inspect the columns, play with the [filters](http://docs.cartodb.com/cartodb-editor.html#filters), or [alter the SQL](http://docs.cartodb.com/cartodb-editor.html#custom-sql) to learn about the type of information that's contained in the data table.

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

An easy way to get used to the basics of CartoCSS is by using the [Vizualization wizard](http://docs.cartodb.com/cartodb-editor.html#wizards) in the CartoDB Editor. It allows you to pick different visualizations to style them differently in the wizard.

Make sure you're in "MAP VIEW" to see your data visualized with _Simple_.  Sticking with _Simple_, click on the [CartoCSS Editor tab](http://docs.cartodb.com/cartodb-editor.html#cartocss) (the one with `CSS`) two below the Wizards tab to see how your data is styled.

![Simple CartoCSS Visualization]({{baseurl.site}}/img/course3/lesson3/cartocss-simple.png)

You should see that the marker fill has an opacity option (`marker-fill-opacity`), the border to the marker (`marker-line-color`) is colored to be white (#FFF is short for #FFFFFF, which is white in [hexadecimal](http://www.web-colors-explained.com/hex.php)), the marker width is set to 10 pixels, the fill is orange (#FF6600), and so on. Check out the [CartoCSS docs](https://github.com/mapbox/carto/blob/master/docs/latest.md) for more info about the other options.

### CartoCSS strings in JavaScript

You have several options for using the CartoCSS text in CartoDB.js. As the styling statements can be rather long, you may want to deal with the CartoCSS strings in different ways depending on your coding goals.

One option is to pass it as a string concatenated from separate lines:

{% highlight js %}
var simpleStyle = 
    '#all_day_cdb_gu_l3{' +
        'marker-fill-opacity: 0.9;' + 
        'marker-line-color: #FFF;' + 
        'marker-line-width: 1.5;' + 
        'marker-line-opacity: 1;' + 
        'marker-placement: point;' + 
        'marker-type: ellipse;' + 
        'marker-width: 10;' + 
        'marker-fill: #FF6600;' + 
        'marker-allow-overlap: true;' + 
    '}';
{% endhighlight %}

Another option is to [minify](link/to/minify/site/or/description) the string--that is, to get rid of all the white space and newlines. This makes your styles much less readable, but your JavaScript file will be smaller and load a tiny bit faster.

{% highlight js %}
var simpleStyle = '#all_day_cdb_gu_l3{marker-fill-opacity:0.9;marker-line-color:#FFF;marker-line-width:1.5;marker-line-opacity:1;marker-placement:point;marker-type:ellipse;marker-width:10;marker-fill:#FF6600;marker-allow-overlap:true;}';
{% endhighlight %}

Because single or double quotes often appear in CartoCSS statements, you should be cautious to make sure that every character is part of the string. For instance, the following would produce a parse error:

{% highlight js %}
var cartocss = '#table_name{text-face-name:'DejaVu Sans Book';}'
{% endhighlight %}

The syntax highlighting we use in Academy helps us tell the story: the _DejaVu Sans Book_ portion of the CartoCSS statement is interpreted as a series of variables (grey), not part of the string (green). You could fix it by writing it the following ways instead:

{% highlight js %}
var cartocss = '#table_name{text-face-name:"DejaVu Sans Book";}';

// programmatically change the font
var font = '"DejaVu Sans Book"';
var cartocss = '#table_name{text-face-name:' + font + ';}';
{% endhighlight %}

A third option is to create a custom `<style>` type with a DOM `id` that allows you to extract the text. For instance, one could use the following:

{% highlight css %}
<style type="cartocss/text" id="simple">
    /** simple visualization */

    #all_day_cdb_gu_l3{
        marker-fill-opacity: 0.9;
        marker-line-color: #FFF;
        marker-line-width: 1.5;
        marker-line-opacity: 1;
        marker-placement: point;
        marker-type: ellipse;
        marker-width: 10;
        marker-fill: #FF6600;
        marker-allow-overlap: true;
    }
</style>
{% endhighlight %}


{% highlight html %}
<script>
    ...code...

    simpleStyle = $("#simple").text();
    sublayer.setCartoCSS(simpleStyle);

    ...more code...
</script>
{% endhighlight %}

This option allows you to directly copy and paste the code from the CartoDB Editor without worrying about errors in reformatting. Because of it's ease of use and readability, this is the format we will use for this lesson.

### Conditions in CartoCSS

Now that we know what the _Simple_ visualization looks like in CartoCSS, let's look at other visualizations. Switch to _Choropleth_, select the `mag` column for ???, and choose _Equal Interval_ for Quantification. Now switch to the CartoCSS tab again. 

You can see that in addition to the first data structure, there are additional ones with conditional statements on the `mag` column. If you switch to select _Bubble_ from the Visualization Wizard, you will see your markers are given conditional styles similar to the following:

{% highlight css %}
#table_name [mag < 2.0] {
    marker-width: 10;
}
#table_name [mag < 4.0] {
    marker-width: 20;
}
...
{% endhighlight %}

Doing this, your styles are more dynamic and responsive to your data. It allows you to easily make your own choropleth, category, or bubble map, just as you would see in the Visualization Wizard in the CartoDB Editor.

### Maps styled by end user

CartoDB was created with the goal to help people from all walks of life tell stories with data and maps. Let's say you're contracted by the USGS to create a simple interface to easily communicate earthquake data. If you have one of our paid accounts, you will have access to data syncing, making this goal even easier.

First, we'll initialize a map like we have done in Lesson 2 and define the style for a _Simple visualization_ between custom `<style>` tags as we discussed above. Put the `<style type='cartocss/text'>...</style>` element between the `<head>` tags, below the CSS and JavaScript inclusions.
    
Next, initialize a map like we did in the last lesson:

{% highlight js %}
window.onload = function () {

    var layerName = "all_day_cdb_gu_l3";

    // Put layer data into a JS object
    var layerSource = {
            user_name: 'documentation', 
            type: 'cartodb',
            sublayers: [{ 
                sql: "SELECT * FROM " + layerName, // All earthquakes in the past 24 hours
                cartocss: $("#simple").html() // Simple visualization
            }]
        }

    // For storing the sublayer
    var sublayer;

    // Instantiate new map object, place it in 'map' element
    var map_object = new L.Map('map', {
        center: [37.7741154,-122.4437914], // San Francisco
        zoom: 4
    });

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map_object);

    // Add data layer to your map
    cartodb.createLayer(map_object,layerSource)
        .addTo(map_object)
        .done(function(layer) {
            sublayer = layer.getSubLayer(0);
        })
        .error(function(err) {
            console.log("error: " + err);
        });
}
{% endhighlight %}

Next we need to add some of the styles from the CartoDB Editor. The visualizations that I am recreating are: 

+ Simple with an `id` of `simple`
+ Category visualization with an `id` of `categ-report-sta`
+ Choropleth of earthquakes by magnitude with an `id` of `choropleth-magnitude`
+ Size (bubble) earthquakes by magnitude with an `id` of `bubble-magnitude`
+ Size (bubble) earthquakes by magnitude, choropleth by depth with an `id` of `choropleth-magnitude`

All of these CartoCSS styles go in their own `<style>` structure between the `<head>` tags.
    
Now that we have our styles, we need to interact with them. Our first step is to create some buttons with the following HTML that is placed immediately after the `<div id='map'></div>` element:

{% highlight html %}
<div id="layer_selector">
    <ul>
        <li data="categ-report-sta">Categorize earthquakes by reporting station</li>
        <li data="choropleth-magnitude">Color earthquakes by magnitude</li>
        <li data="bubble-magnitude">Size earthquakes by magnitude</li>
        <li data="bubble-choropleth">Size earthquakes by magnitude, color by depth</li>
        <li data="simple">Reset map</li>
    </ul>
</div>
{% endhighlight %}

And finally, we need to connect click events with these buttons. The following code does just the trick:

{% highlight js %}
// Create layer selector
function createSelector(layer) {
    var cartocss = "";
    var $options = $("#layer_selector").find("li");
    $options.click(function(e) {
        var $li = $(e.target);
        var selected = $li.attr('data');

        $options.removeClass('selected');
        $li.addClass('selected');

        cartocss = $('#'+selected).text();

        layer.setCartoCSS(cartocss);
    });
}
{% endhighlight %}

This code finds all the `li` elements and stores their reference in the variable `$options`. Once one of the `li` elements is clicked, its reference is stored in `$li`, and it's `data` is extracted and placed in the variable `selected`. The style of the buttons is altered, and then the CartoCSS text is retrieved from the `<style>` structures you previously created. Finally, the layer is told to change is appearance once the `setCartoCSS()` method is applied to it.
    
Check out a working copy [here]({{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-3/cartocss-style.html). There is also a version that uses [minified strings]({{site.baseurl}}/t/03-cartodbjs-ground-up/lesson-3/cartocss-string.html) if you prefer that method. And look [here](link/to/jsfiddle) for a jsFiddle.

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



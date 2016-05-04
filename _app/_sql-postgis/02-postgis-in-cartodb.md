---
title: "SQL and PostGIS in CartoDB — PostGIS in CartoDB"
redirect_from: /courses/04-sql-postgis/lesson-2.html
permalink: /courses/sql-postgis/postgis-in-cartodb/
permalink_next: /courses/sql-postgis/editing-tables-more-advanced-postgis/
tweet_text: "I just (geospatially) revisited Highway 61 @cartoDB"
lesson_message: "Nice work geospatial explorer! More SQL &amp; PostGIS is coming up next!"
---
# PostGIS in CartoDB

<p><iframe src="//player.vimeo.com/video/120176143" width="700" height="393" frameborder="0"> </iframe></p>

CartoDB is built on top of [PostgreSQL](http://www.postgresql.org/) using the [PostGIS](http://www.postgis.net/) extension. This means that you have all the power of relational databases combined with hundreds of geospatial functions. In this lesson, we introduce several commonly used functions in PostGIS with the goal of extending your geospatial analysis of data within CartoDB, and show you some of the analysis you can do with your geospatial data.

**Lesson Goal:**
Geospatially _revisit_ blues musician birthplaces along Highway 61 by using important functions in PostGIS and SQL.(Yep, this is a reference to the Bob Dylan album [_Highway 61 Revisited_](http://en.wikipedia.org/wiki/Highway_61_Revisited)). By the end of this lesson, you will be able to make this [final map](#finalmap).

_If you are new to using SQL in CartoDB, start with [Lesson 1](/courses/sql-postgis/intro-to-sql-and-postgis/). This lesson relies exclusively on the CartoDB Editor. If you are not familiar with the Editor, view [Online Mapping for Beginners](/courses/beginners-course/making-your-first-map/)._


## Data

**Mississippi portion of US Route 61**

We are going to use data derived from the [Federal Highway Administration](http://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm). Copy and paste the following URL into the [CartoDB Connect Dataset options](http://docs.cartodb.com/cartodb-editor/datasets/#connect-dataset):

{% highlight text %}
http://academy.cartodb.com/d/highway_61.geojson
{% endhighlight %}

**Birthplaces of Mississippi Blues Musicians**

The second dataset contains the coordinates of the birthplaces of a selection of Mississippi-born blues musicians, as [listed on Wikipedia](http://en.wikipedia.org/wiki/List_of_Delta_blues_musicians).

{% highlight text %}
http://academy.cartodb.com/d/mississippi_blues_musicians.geojson
{% endhighlight %}


## Show Buffers

As the name suggests, `ST_Buffer` takes a geometry as an argument and returns that [geometry with a buffer around it](http://en.wikipedia.org/wiki/Buffer_%28GIS%29). It always returns a polygon. In its simplest usage, you can create a polygon centered on a point. The same applies to lines and polygons, but you always get out a polygon.

Like other PostGIS functions, it preserves the projection units. That is, if you put in a point in WGS 84, you will get out a polygon in WGS 84. For more about WGS 84, view the previous lesson's section on [measurement units](/courses/sql-postgis/intro-to-sql-and-postgis/#measurement-units).

The examples below show how a point or line geometry can be transformed to a polygon geometry, using `ST_Buffer`.

![images comparing geometry before/after ST_Buffer()](/img/course4/lesson2/buffer-demo.png)

**Function definitions**
{% highlight c++ %}
geometry ST_Buffer(geometry g1, float radius_of_buffer)
geography ST_Buffer(geography g1, float radius_of_buffer_in_meters)
{% endhighlight %}

The function `ST_Buffer` takes a geometry, such as a point in the first argument, and the radius for the buffer as the second argument. For more information, see the PostGIS [documentation page](http://www.postgis.org/docs/ST_Buffer.html) for additional information and function definitions.

As was mentioned in the [previous lesson](/courses/sql-postgis/intro-to-sql-and-postgis/), there is a hidden column in CartoDB called `the_geom_webmercator` which is responsible for making the data appear on your map in the correct location. It is usually in the projection [Web Mercator](), but that is not required. To use it with other projections, project the data, and the alias column, as `the_geom_webmercator`.

For this lesson, we are working in distances on the earth's surface with meters. Therefore, we need to cast our geometry in `the_geom` to [geography](http://postgis.net/docs/manual-1.5/ch04.html#PostGIS_Geography), buffer off of that in meters, and then transform to Mercator to display along with our Web Mercator-projected basemap.

To visualize a 25 mile corridor around U.S. Route 61, run the following query with the CartoDB [SQL editor](http://docs.cartodb.com/cartodb-editor/managing-your-data/#running-sql-queries). Go to MAP VIEW to see the result of the query.

{% highlight sql %}
SELECT
  ST_Transform(
    ST_Buffer(
      the_geom::geography,
      25*1609
    )::geometry,
    3857
  ) As the_geom_webmercator,
  cartodb_id
FROM
  highway_61
{% endhighlight %}

This statement draws a 25 mile buffer around our road segment, the Mississippi portion of [US Route 61](http://en.wikipedia.org/wiki/U.S._Route_61). Note that we convert from meters to miles with the conversion 1609 meters &#8776; 1 mile.

Also notice that the `cartodb_id` column was selected, so that interactivity (click events, hovers) can be enabled.

To extend this and see which musicians are in the buffer, [create a multilayered map](http://docs.cartodb.com/tutorials/multilayer_overview.html) by clicking on _+ Add Layer_ from the top of the [CartoDB Sidebar](http://docs.cartodb.com/cartodb-editor/maps/#cartodb-sidebar). Select the dataset `mississippi_blues_musicians`, and style it to your liking.

![ST_Buffer of U.S. Route 61](/img/course4/lesson2/buffer-example.png)

There we go! We have a visual to aid in our spatial analysis of the data.

### Find Musicians within the Buffer

Now that we have visualized our buffer, let's find which blues musicians were born within that buffer. While it might seem like the following statement would work well in a `WHERE` clause, it is _very inefficient_.

{% highlight sql %}
ST_Intersects(
  ST_Buffer(
    the_geom_of_highway,
    25*1609
  ),
  the_geom_of_musicians
)
{% endhighlight %}

`ST_Intersects()` returns a true/false value, depending on whether or not two entries have an overlap, which is why it is good for a `WHERE` condition.

The **better** choice is to use `ST_DWithin()`. 

**Function definition**
{% highlight js %}
boolean ST_DWithin(geometry g1, geometry g2, double precision distance_of_srid);
boolean ST_DWithin(geography gg1, geography gg2, double precision distance_meters);
boolean ST_DWithin(geography gg1, geography gg2, double precision distance_meters, boolean use_spheroid);
{% endhighlight %}

Given two columns of geospatial data, you can use `ST_DWithin` to find out which points are within a given distance of each other. Notice that the return value is a boolean, so it is a good function for the `ON` part of `JOIN` or a `WHERE` or of SQL statements. If you are not familiar with `JOIN`s, view this great discussion of [Coding Horror](http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/).

Let's continue our usage of `the_geom_webmercator`, and use the middle definition for `ST_DWithin` above. Run the following SQL query:

{% highlight sql %}
SELECT
  mbm.the_geom_webmercator,
  mbm.name,
  mbm.city,
  mbm.cartodb_id
FROM
  mississippi_blues_musicians AS mbm, 
  highway_61 AS hwy
WHERE
  ST_DWithin(
    mbm.the_geom_webmercator,
    hwy.the_geom_webmercator,
    25*1609
  )
{% endhighlight %}

This command returns all locations, names, cities, and cartodb_ids from rows in the `mississippi_blues_musicians` table that are within a 25 mile distance of the highway. Remember from [Lesson 1](/courses/sql-postgis/intro-to-sql-and-postgis/) that the `AS` keyword lets you define table names and column names with a more concise, or less confusing, alias.

The embedded map has the bottom layer as the buffered highway, and the top layer as the SQL statement applied to the `mississippi_blues_musicians` table, to show only the musicians within our buffer.

<iframe width='100%' height='520' frameborder='0' src='http://documentation.cartodb.com/viz/6c1f86e4-ab04-11e4-9c80-0e853d047bba/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

### Finding Distance from Road

Let's take a different approach and calculate the distance of each musician from the highway. In [Lesson 1](/courses/sql-postgis/intro-to-sql-and-postgis/) of this course, we found the distance between a point for each row of our table. Now we have points and a line. Luckily, PostGIS is flexible and can calculate the distance to the closest point on a line.

Notice that we are rounding up with the `ceil()` function, and dividing the distance by 1609 meters/mile to convert to miles.

{% highlight sql %}
SELECT
  mbm.the_geom_webmercator,
  mbm.name,
  mbm.city,
  ceil(
    ST_Distance(
      mbm.the_geom_webmercator,
  	  hwy.the_geom_webmercator
    ) / 1609
  ) AS d
FROM
  mississippi_blues_musicians AS mbm,
  highway_61 AS hwy
ORDER BY
  d ASC
{% endhighlight %}

You can visualize the data in this newly created table by making a choropleth on the column `d`. Since we already did something very similar to that in [Lesson 1](/courses/sql-postgis/intro-to-sql-and-postgis/), we will move on to new functionality.

![ST_Distance](/img/course4/lesson2/stdistance.png)

### Visualizing Lines from Musicians to the Road

`ST_MakeLine()` returns a line geometry given two or more points. When working on a collection of points, it returns the path of connect-the-dot points ordered by cartodb_id. View the [PostGIS documentation](http://postgis.net/) for more details about this.

For this scenario, we are interested in drawing [as-the-crow-flies](http://en.wikipedia.org/wiki/As_the_crow_flies) lines of any one musician to the highway's nearest respective point. Because the highway is a line, and the musician birthplaces are points, we need to find a way to get the nearest point to the musician birthplaces.

Looking through the PostGIS docs, you will find `ST_ClosestPoint()`, which is what we need. We will use `ST_ClosestPoint` to find the closest point, and then make a line from this point to the musician birthplaces.

{% highlight sql %}
SELECT
  ST_MakeLine(
    ST_ClosestPoint(
      hwy.the_geom_webmercator,
      mbm.the_geom_webmercator),
    mbm.the_geom_webmercator
  ) AS the_geom_webmercator
FROM
  mississippi_blues_musicians AS mbm,
  highway_61 AS hwy
{% endhighlight %}

Here is a screenshot of the result of this query.

![ST_MakeLine example](/img/course4/lesson2/makeline.png)


## Bringing It All Together

We can bring together all the SQL statements, and create a chroropleth of the lines, based on how far away the birth places are from the highway. We are basically just making a new column in the `SELECT` for each of the commands that we have already run.

One new additional piece is `UNION ALL`. These SQL keywords allow us to concatenate tables together, as long as the schema are the same. Notice that `the_geom_webmercator` has type geography, name and city are strings, and distance is a float. Since it does not make sense to talk about how far an object is away from itself, use `null` for the value of `d` for the highway.

Note that comment lines begin with a double hyphen.

{% highlight sql %}
SELECT
  -- draw lines as the_geom_webmercator
  ST_MakeLine(
    ST_ClosestPoint(
      hwy.the_geom_webmercator,
      mbm.the_geom_webmercator
	),
    mbm.the_geom_webmercator
  ) AS the_geom_webmercator,
  -- include musician name
  mbm.name,
  -- include city name
  mbm.city,
  -- rounded-up distance birthplace is from the highway
  ceil(
    ST_Distance(
      mbm.the_geom_webmercator,
  	  hwy.the_geom_webmercator
    ) / 1609
  ) AS d
FROM
  mississippi_blues_musicians AS mbm,
  highway_61 AS hwy
UNION ALL 
-- include highway in the same table
SELECT
  the_geom_webmercator,
  'US Route 61' AS name,
  null AS city,
  null AS d
FROM
  highway_61
{% endhighlight %}

<a name="finalmap"></a> The final map appears as follows:
<iframe width='100%' height='520' frameborder='0' src='http://documentation.cartodb.com/viz/88c8383e-ab10-11e4-8a1f-0e853d047bba/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

**Tip:** If you are interested in copying the CartoCSS used to make this map, paste the following into the [CartoCSS Editor](http://docs.cartodb.com/cartodb-editor/maps/#cartocss), accessible from the CartoDB sidebar:

{% highlight scss %}
/** choropleth visualization */

#highway_61{
  polygon-opacity: 0;
  line-color: #FFFFCC;
  line-width: 2.5;
  line-opacity: 0.8;
}
#highway_61 [ d <= 141] {
   line-color: #0C2C84;
}
#highway_61 [ d <= 68] {
   line-color: #225EA8;
}
#highway_61 [ d <= 49] {
   line-color: #1D91C0;
}
#highway_61 [ d <= 41] {
   line-color: #41B6C4;
}
#highway_61 [ d <= 33] {
   line-color: #7FCDBB;
}
#highway_61 [ d <= 22] {
   line-color: #C7E9B4;
}
#highway_61 [ d <= 4] {
   line-color: #FFFFCC;
}
#highway_61 [ name = 'US Route 61'] {
   line-color: #F84F40;
}

{% endhighlight %}

**Tip:** To customize your hover window so that US Route 61's `null` value distance and name do not appear, you can use this updated HTML template:

{% highlight html %}
{% raw %}
<div class="cartodb-tooltip-content-wrapper">
  <div class="cartodb-tooltip-content">
    <h4>Name</h4>
    <p>{{name}}</p>
    {{#city}}
    <h4>City</h4>
    <p>{{city}}</p>
    <h4>Distance</h4>
    <p>{{d}} miles</p>
    {{/city}}
  </div>
</div>
{% endraw %}
{% endhighlight %}

### Reference

Functions mentioned in this lesson:

+ [ST_Intersects](http://postgis.net/docs/ST_Intersects.html)
+ [ST_MakeLine](http://postgis.net/docs/ST_MakeLine.html)
+ [ST_Buffer](http://postgis.net/docs/ST_Buffer.html)
+ [ST_Distance](http://postgis.net/docs/ST_Distance.html)
+ [ST_ClosestPoint](http://postgis.net/docs/ST_ClosestPoint.html)
+ [ST_DWithin](http://postgis.net/docs/ST_DWithin.html)
+ [ceil](http://www.postgresql.org/docs/9.3/static/functions-math.html)

**Tip:** View [What are the most common PostGIS functions?](http://docs.cartodb.com/faqs/postgresql-and-postgis/#what-are-the-most-common-postgis-functions) in the documentation FAQ's:

**Other References**

* Basic `ST_Buffer` usage in the CartoDB tutorial [_Drawing a circle from a point and radius_](http://docs.cartodb.com/tutorials/circle_point_radius.html)
* Maptime NYC [blog post about PostGIS and SQL](http://blog.cartodb.com/maptime-entry/)

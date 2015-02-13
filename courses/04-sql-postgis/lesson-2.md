---
id: 2
layout: lesson
title:  "Lesson 2"
subtitle: "PostGIS in CartoDB"
course: "SQL and PostGIS in CartoDB"
course_slug: "04-sql-postgis"
continue_link: "lesson-3"
tweet_text: "I just (geosptially) revisited Highway 61 @cartoDB"
vizjson: "http://documentation.cartodb.com/api/v2/viz/07a3e3bc-6df7-11e4-b5a6-0e9d821ea90d/viz.json"
---

## PostGIS in CartoDB

CartoDB is built on top of [PostgreSQL](http://www.postgresql.org/) using the [PostGIS](http://www.postgresql.org/) extension. This means that you have all the power of relational databases combined with hundreds of geospatial functions. 

In this lesson, we will introduce several commonly used functions in PostGIS with the goal of extending your geospatial analysis of data within CartoDB. We will be using some of the most commonly used PostGIS functions to give you a flavor for some of the analysis you can do with your geospatial data.

**Our goal with this lesson:**
Geospatially revisit blues musician birthplaces along Highway 61 by using important functions in PostGIS and SQL.

_If you haven't gotten your feet wet with SQL in CartoDB, check out [Lesson 1](http://academy.cartodb.com/courses/04-sql-postgis/lesson-1.html) first._

### Data

**Mississippi portion of US Route 61**

We're going to be using data derived from the [Federal Highway Administration](http://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm). Copy and paste the following URL into the [CartoDB Importer](http://docs.cartodb.com/cartodb-editor.html#importing-data).

{% highlight text %}
http://academy.cartodb.com/d/highway_61_revisited.geojson
{% endhighlight %}

Don't worry about downloading and then uploading the data--just directly import it into your CartoDB account.

**Birthplaces of Mississippi Blues Musicians**

The second data set contains the coordinates of the birthplaces of a selection of Mississippi-born Blues musicians as [listed on Wikipedia](http://en.wikipedia.org/wiki/List_of_Delta_blues_musicians).

{% highlight text %}
http://academy.cartodb.com/d/mississippi_blues_musicians.geojson
{% endhighlight %}


### Show Buffers

As the name suggests, `ST_Buffer` takes a geometry as an argument and returns that geometry but with a buffer around it. It always returns a polygon. In its simplest usage, you can create a polygon centered on a point. The same applies to lines and polygons, but you always get out a polygon.

Like other PostGIS functions, it preserves the projection units. That is, if you put in a point in WGS 84, you'll get out a polygon in WGS 84.

The two examples below show how a point or line geometry translates to a polygon geometry using `ST_Buffer`.

![images comparing geometry before/after ST_Buffer()]({{site.baseurl}}/img/course4/lesson2/buffer-demo.png)

**Function definition**
{% highlight c++ %}
geometry ST_Buffer(geometry g1, float radius_of_buffer)
geography ST_Buffer(geography g1, float radius_of_buffer_in_meters)
{% endhighlight %}

See the [documentation page](http://www.postgis.org/docs/ST_Buffer.html) for more information and use cases.

Since the hidden column called `the_geom_webmercator` is responsible for making the data appear on your map in the correct location, and its units are meters, we will be exclusively using it. It is in the projection [WebMercator](http://en.wikipedia.org/wiki/Web_Mercator), or [ESPG 3857](http://spatialreference.org/ref/sr-org/7483/). `the_geom_webmercator` is updated in the background every time you update `the_geom`. It is _not_ updated, though, when you only select `the_geom` in a `SELECT` statement.

To visualize a 25 mile corridor around U.S. Route 61, put the following command into your [SQL editor](http://docs.cartodb.com/cartodb-editor.html#custom-sql).

{% highlight sql %}
SELECT
  ST_Buffer(
    the_geom_webmercator,
    25*1609
    ) AS the_geom_webmercator,
  cartodb_id
FROM
  highway_61
{% endhighlight %}

This statement draws a 25 mile buffer around our road segment, the Mississippi portion of [US Route 61](http://en.wikipedia.org/wiki/U.S._Route_61). Note that we convert from meters to miles with the conversion 1609 meters &#8776; 1 mile.

Also notice that `cartodb_id` was selected so that interactivity (click events, hovers) can be enabled.

To extend this to see which musicians are in the buffer, [create a multilayered map](http://docs.cartodb.com/tutorials/multilayer_overview.html) by clicking on "+ Add Layer" at the top of the [CartoDB Sidebar](http://docs.cartodb.com/cartodb-editor.html#cartodb-sidebar). Select the table `mississippi_blues_musicians`. Finally, style it to your liking.

![ST_Buffer of U.S. Route 61]({{site.baseurl}}/img/course4/lesson2/buffer-example.png)

There we go! We have a visual of what's going on to aid in our spatial analysis of the data.


### Find Musicians within the Buffer

Now that we've visualized our buffer, let's find which blues musicians were born within that buffer. While it might seem like doing the following statement would work well in the `WHERE` clause, it turns out to be _very inefficient_.

**Don't do it this way**
{% highlight sql %}
ST_Intersects(
  ST_Buffer(
    the_geom_of_highway,
    25*1609
  ),
  the_geom_of_musicians
)
{% endhighlight %}

For later reference, `ST_Intersects()` returns true/false depending on whether or not the two entries have an overlap.

The **better** choice is `ST_DWithin()`. The function definitions for it are as follows:

{% highlight js %}
boolean ST_DWithin(geometry g1, geometry g2, double precision distance_of_srid);
boolean ST_DWithin(geography gg1, geography gg2, double precision distance_meters);
boolean ST_DWithin(geography gg1, geography gg2, double precision distance_meters, boolean use_spheroid);
{% endhighlight %}

Given two columns of geospatial data, you can use `ST_DWithin` to find out which points are within a given distance of each other. Notice that the return value is a boolean, so it is a good function for the `WHERE` or `JOIN ON` parts of a SQL statements.

We'll continue our usage of `the_geom_webmercator`, so we will use the middle definition.

The SQL query we'll run is the following:

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

This command grabs all locations, names, cities, and cartodb_ids from rows in the `mississippi_blues_musicians` table that are within a 25 mile distance of the highway. Recall from [Lesson 1](http://academy.cartodb.com/courses/04-sql-postgis/lesson-1.html) that the `AS` keyword allows for table names and column names to have a more concise or less confusing alias.

The embedded map below has the bottom layer as the buffered highway, but the top layer is with the SQL statement above applied to the `mississippi_blues_musicians` table.

<iframe width='100%' height='520' frameborder='0' src='http://documentation.cartodb.com/viz/6c1f86e4-ab04-11e4-9c80-0e853d047bba/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

### Finding Distance from Road

We can take a different tact now and calculate the distance each musician is from the highway. In [Lesson 1](http://academy.cartodb.com/courses/04-sql-postgis/lesson-1.html) of this course, we found the distance between a point for each row of the table. Now we have points and a line. Luckily, PostGIS is flexible enough to still work. In this case, it finds the distance to the closest point on the line.

Notice that we're rounding up with the `ceil()` function, and dividing the distance by 1609 meters/mile to convert to miles.

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

You could visualize the data in this newly created table by making a choropleth on the column `d`. Since we already did something very similar to that in [Lesson 1](http://academy.cartodb.com/courses/04-sql-postgis/lesson-1.html), we'll move on to new functionality.

![ST_Distance]({{site.baseurl}}/img/course4/lesson2/stdistance.png)

### Visualizing Lines from Musicians to the Road

`ST_MakeLine()` returns a line geometry given two or more points. When working on a collection of points, it returns the path that an object follows if you specify the order the object visited the points. Check out the documentation for more on this. 

In our case, we're interested in drawing [as-the-crow-flies](http://en.wikipedia.org/wiki/As_the_crow_flies) lines of any one musician to the highway's nearest respective point. Because the highway is a line and the musician birthplaces are points, we need to find a way to get the nearest point to the musician birthplaces.

Looking through the PostGIS docs, you'll find `ST_ClosestPoint()`, which fits the bill.

So our strategy is to use `ST_ClosestPoint` to find the closest point, and then make a line from this point to the musician birthplaces.

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

Below is a screenshot of the result of this query.

![ST_MakeLine example]({{site.baseurl}}/img/course4/lesson2/makeline.png)

### Bringing It All Together

We can bring together all the SQL statements we've run into one and create a chroropleth on the lines based on how long the birth places are from the highway. We're basically just making a new column in the `SELECT` for each of the commands that we've run before.

One additional piece that will look new below is `UNION ALL`. These SQL keywords allow us to concatenate tables together as long as the schema are the same. Notice that `the_geom_webmercator` has type geography, name and city are strings, and distance is a float. Since it doesn't make sense to talk about how far an object is away from itself, we can put `null` for the value of `d` for the highway.

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
  '' AS city,
  null AS d
FROM
  highway_61
{% endhighlight %}

<iframe width='100%' height='520' frameborder='0' src='http://documentation.cartodb.com/viz/88c8383e-ab10-11e4-8a1f-0e853d047bba/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

If you're interested in copying the CartoCSS I used to make this map, paste the following into the [CartoCSS pane](http://docs.cartodb.com/cartodb-editor.html#cartocss) in the sidebar:

{% highlight css %}
/** choropleth visualization */

#highway_61{
  polygon-opacity: 0;
  line-color: #FFFFCC;
  line-width: 1.5;
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

### Reference

Functions mentioned in this lesson:

+ [ST_Intersects](http://postgis.org/docs/ST_Intersects.html)
+ [ST_MakeLine](http://postgis.org/docs/ST_MakeLine.html)
+ [ST_Buffer](http://postgis.org/docs/ST_Buffer.html)
+ [ST_Distance](http://postgis.org/docs/ST_Distance.html)
+ [ST_ClosestPoint](http://postgis.org/docs/ST_ClosetPoint.html)
+ [ST_DWithin](http://postgis.net/docs/ST_DWithin.html)
+ [ceil](http://www.postgresql.org/docs/9.3/static/functions-math.html)

Here are some of the most commonly used PostGIS functions in CartoDB:

1. [ST_Transform](http://postgis.org/docs/ST_Transform.html)
2. [ST_Area](http://postgis.org/docs/ST_Area.html)
3. [ST_Union](http://postgis.org/docs/ST_Union.html)
4. [ST_Centroid](http://postgis.org/docs/ST_Centroid.html)
5. [ST_SetSRID](http://postgis.org/docs/ST_SetSRID.html)
6. [ST_Collect](http://postgis.org/docs/ST_Collect.html)
7. [ST_Y](http://postgis.org/docs/ST_Y.html)
8. [ST_X](http://postgis.org/docs/ST_X.html)
9. [ST_Intersection](http://postgis.org/docs/ST_Intersection.html)
10. [ST_Contains](http://postgis.org/docs/ST_Contains.html)

**See also**

Basic `ST_Buffer` usage in the CartoDB tutorial [_Drawing a circle from a point and radius_](http://docs.cartodb.com/tutorials/circle_point_radius.html).


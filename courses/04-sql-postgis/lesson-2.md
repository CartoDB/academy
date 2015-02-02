---
id: 2
layout: lesson
title:  "Lesson 2"
subtitle: "PostGIS in CartoDB"
course: "SQL and PostGIS in CartoDB"
course_slug: "04-sql-postgis"
continue_link: "lesson-3"
tweet_text: ""
vizjson: "http://documentation.cartodb.com/api/v2/viz/07a3e3bc-6df7-11e4-b5a6-0e9d821ea90d/viz.json"
---

## PostGIS in CartoDB

CartoDB is built on top of [PostgreSQL](http://www.postgresql.org/) using the [PostGIS](http://www.postgresql.org/) extension. This means that you have all the power of relational databases combined with hundreds of geospatial functions. 

In this lesson, we will introduce several commonly used functions in PostGIS with the goal of extending your geospatial analysis of data within CartoDB. We will be using some of the most commonly used PostGIS functions to give you a flavor for some of the analysis you can do with your geospatial data.

**Our goal with this lesson:**
Geospatially revisit blues musician birthplaces along Highway 61.

### Data

**Mississippi portion of US Route 61**

We're going to be using data derived from the [Federal Highway Administration](http://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm). Copy and paste the following URL into the [CartoDB Importer](http://docs.cartodb.com/cartodb-editor.html#importing-data).

{% highlight text %}
http://academy.cartodb.com/d/highway_61_revisited.geojson
{% endhighlight %}

Don't worry about downloading and then uploading the data--just directly import into your CartoDB account.

**Birthplaces of Mississippi Blues Musicians**

The second data set contains the coordinates of the birthplaces of a selection of Mississippi-born Blues musicians as [listed on Wikipedia](http://en.wikipedia.org/wiki/List_of_Delta_blues_musicians).

{% highlight text %}
http://academy.cartodb.com/d/mississippi_blues_musicians.geojson
{% endhighlight %}


### Show buffers

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


### Find musicians within the buffer

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

Read more at the `ST_DWithin()` [documentation page](http://postgis.net/docs/ST_DWithin.html). 

Given two columns of geospatial data, you can use `ST_DWithin` to find out how many points are within a given distance of each other. Notice that the return value is a boolean, so this is a good function for the `WHERE` or `JOIN ON` parts of a SQL statements.

Since we're interested in units in meters, we'll use the middle definition.

The SQL query we'll run is the following:

{% highlight sql %}
SELECT
  mbm.the_geom_webmercator,
  mbm.name,
  mbm.city
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

### Finding distance from road

We can also find the distance each musician is from the highway.

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
{% endhighlight %}


### Visualizing lines from musicians to the road

`ST_MakeLine()` is returns a line geometry given two points. Given a series of points, it will create a line between points in a series. ST_MakeLine can be used to create the path that an object follows if you know the order the object visited the points. This can be done as follows.

```sql
SELECT ST_MakeLine(a.the_geom,b.the_geom)
FROM tablename a, tablename b
WHERE a.cartodb_id = b.cartodb_id + 1
```

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


### Bringing it all together

We can bring together all the SQL statements we've run into one and create a chroropleth on the lines based on how long the birth places are from the highway. We're basically just making a new column in the `SELECT` for each of the commands that we've run before.

One additional piece that will look new below is `UNION ALL`. These SQL keywords allow us to concatenate tables together as long as the schema are the same. Notice that `the_geom_webmercator` has type geography, name and city are strings, and distance is a float. Since it doesn't make sense to talk about how far an object is away from itself, we can put `null` for the value of `d` for the highway 


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

_Pro Tip:_ the double hyphens begin comment lines in SQL

### Reference

Functions mentioned in this lesson:

+ [ST_Intersects](http://postgis.org/docs/ST_Intersects.html)
+ [ST_MakeLine](http://postgis.org/docs/ST_MakeLine.html)
+ [ST_Buffer](http://postgis.org/docs/ST_Buffer.html)
+ [ST_Distance](http://postgis.org/docs/ST_Distance.html)
+ [ST_ClosestPoint](http://postgis.org/docs/ST_ClosetPoint.html)
+ [ST_DWithin](http://postgis.org/docs/ST_DWithin.html)

Here are some of the most commonly used PostGIS functions in CartoDB:

1. ST_Transform
2. ST_Area
3. ST_Union
4. ST_Centroid
5. ST_SetSRID
6. ST_Collect
7. ST_Y
8. ST_X
9. ST_Intersection
10. ST_Contains

**See also**

Basic `ST_Buffer` usage in the CartoDB tutorial [_Drawing a circle from a point and radius_](http://docs.cartodb.com/tutorials/circle_point_radius.html).


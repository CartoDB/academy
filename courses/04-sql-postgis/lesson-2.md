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

In this lesson, we will introduce several commonly used functions in PostGIS with the goal of extending your geospatial analysis of data within CartoDB.

This lesson is structured a little differently than other [Map Academy](http://academy.cartodb.com/) lessons in that subsections will be more discrete instead of having an overall lesson goal.

PostGIS functions are usually paired with other functions.

### Data
We're going to be using data derived from the [Federal Highway Administration](http://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm).

**Mississippi portion of US Route 61**
{% highlight text %}
http://academy.cartodb.com/d/highway_61_revisited.geojson
{% endhighlight %}

The second data set contains the coordinates of the birthplaces of a selection of Mississippi-born Blues musicians as [listed on Wikipedia](http://en.wikipedia.org/wiki/List_of_Delta_blues_musicians).

**Birthplaces of Mississippi Blues Musicians**
{% highlight text %}
http://academy.cartodb.com/d/mississippi_blues_musicians.geojson
{% endhighlight %}


### Show buffers

As the name suggests, `ST_Buffer` takes a geometry as an argument and returns a polygon of the buffered object. In its simplest usage, you can create a polygon centered on a point. So in this case, the input is a point and the output is a polygon. Keep in mind that it preserves the projection units. That is, if you put in a point in WGS 84, you'll get out a polygon in WGS 84. WYPIISWYGO. The same applies to lines and polygons, but you always get out a polygon.

The two examples below show how a point or line geometry translates to a polygon geometry.

![images comparing geometry before/after ST_Buffer()]()

**Function definition**
{% highlight c++ %}
geometry ST_Buffer(geometry g1, float radius_of_buffer)
geography ST_Buffer(geography g1, float radius_of_buffer_in_meters)
{% endhighlight %}

There are other function definitions at the [documentation page](http://www.postgis.org/docs/ST_Buffer.html).

Since the hidden column called `the_geom_webmercator` is responsible for making the data appear on your map in the correct location, we will be exclusively using it. It is in the [projection webmercator](http://en.wikipedia.org/wiki/Web_Mercator), or [ESPG 3857](http://spatialreference.org/ref/sr-org/7483/). `the_geom_webmercator` is updated in the background every time you update `the_geom`.

You may have noticed that doing SQL queries selecting `the_geom` your data fails to appear if `the_geom_webmercator` is not also selected. 

{% highlight sql %}
SELECT
  ST_Buffer(
    the_geom_webmercator,
    20*1609
    ) AS the_geom_webmercator
FROM
  highway_61
{% endhighlight %}

This statement draws a 25 mile buffer around our road segment, the Mississippi portion of [US Route 61](http://en.wikipedia.org/wiki/U.S._Route_61).

This query grabs the geometry, name, and city of the Blues Musicians that were born within 25 miles of modern day highway 61. 

First let's visualize a 25 mile buffer around Highway 61. Notice below that we convert meters to miles by the conversion factor 1 mile &approx; 1609 meters.

{% highlight sql %}
SELECT
  ST_Buffer(the_geom_webmercator,25*1609) AS the_geom_webmercator
FROM
  highway_61
{% endhighlight %}


**See also**
Basic `ST_Buffer` usage in the CartoDB tutorial [_Drawing a circle from a point and radius_](http://docs.cartodb.com/tutorials/circle_point_radius.html).


### Find musicians within the buffer

Now that we've visualized our buffer, let's find which blues musicians were born within that buffer. While it might seem like doing the following statement would work well in the `WHERE` clause, it turns out to be very inefficient.

**Don't do it this way**
{% highlight sql %}
ST_Intersect(
  ST_Buffer(
    the_geom_of_highway,
	25*1609
  ),
  the_geom_of_musicians
)
{% endhighlight %}

The better choice is `ST_DWithin()`. The function definitions for it are as follows:

{% highlight js %}
boolean ST_DWithin(geometry g1, geometry g2, double precision distance_of_srid);
boolean ST_DWithin(geography gg1, geography gg2, double precision distance_meters);
boolean ST_DWithin(geography gg1, geography gg2, double precision distance_meters, boolean use_spheroid);
{% endhighlight %}

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

{% highlight sql %}
SELECT
  ST_MakeLine(
    ST_ClosestPoint(
      hwy.the_geom_webmercator,
      mbm.the_geom_webmercator),
    mbm.the_geom_webmercator
  ) AS the_geom_webmercator,
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
UNION ALL
SELECT
  the_geom_webmercator,
  'US Route 61' AS name,
  '' AS city,
  null AS d
FROM
  highway_61
{% endhighlight %}


### ST_DWithin

Documentation:
http://postgis.net/docs/ST_DWithin.html

{% highlight c++ %}
boolean ST_DWithin(geometry g1, geometry g2, double precision distance_of_srid);

boolean ST_DWithin(geography gg1, geography gg2, double precision distance_meters);

boolean ST_DWithin(geography gg1, geography gg2, double precision distance_meters, boolean use_spheroid);
{% endhighlight %}

Given two columns of geospatial data, you can use `ST_DWithin` to find out how many points are within a given distance of each other. Notice that the return value is a boolean, so this is a good function for the `WHERE` or `JOIN ON` parts of a SQL statements.

It may be tempting to use `ST_Buffer()` with `ST_Intersects()` to know, say how many points are in a certain distance around a geometry, but it is much less efficient than using `ST_DWithin`.




```sql
UPDATE 
  st_dwithin_examples
SET 
  the_geom = CDB_LatLng(random()*10 + 27.7000,random()*10 + 85.3333)
```
Select all other populated places within 25km of Kathmandu.

```sql
SELECT *
FROM 
  st_dwithin_examples
WHERE
  ST_DWithin(
    the_geom::geography,
	CDB_LatLng(27.7,85.33)::geography,
	25000
  )
```


{% highlight sql %}
SELECT 
  mbm.the_geom_webmercator AS the_geom_webmercator, 
  mbm.name, 
  mbm.city
FROM 
  highway_61_revisited hr, 
  mississippi_blues_musicians mbm
WHERE
  ST_DWithin(
    hr.the_geom_webmercator,
    mbm.the_geom_webmercator,
    25*1609)  
{% endhighlight %}

### ST_Contains


{% highlight sql %}
SELECT 
  us_counties.the_geom_webmercator,
  us_counties.cartodb_id, 
  count(quakes.the_geom) AS total 
FROM 
  us_counties 
JOIN 
  quakes 
ON 
  st_contains(
    us_counties.the_geom,
    quakes.the_geom_webmercator
  ) 
GROUP BY 
  us_counties.cartodb_id
{% endhighlight %}

### ST_Intersects

Documentation:
http://postgis.org/docs/ST_Intersects.html


Are points within 50,000 meters of Kathmandu?

```sql
SELECT
  *,
  ST_Intersects(
    the_geom,
    ST_Buffer(
      CDB_LatLng(
        27.7,
        85.33
      )::geography,
      50000
    )
  )::boolean
FROM
  st_dwithin_examples
```

### ST_Distance

To measure the distance between two points. This wonderful function can be used between points, line strings, and polygons interchangeably.




### ST_MakeLine

ST_MakeLine is pretty fun. Given a series of points, it will create a line between points in a series. ST_MakeLine can be used to create the path that an object follows if you know the order the object visited the points. This can be done as follows.

```sql
SELECT ST_MakeLine(a.the_geom,b.the_geom)
FROM tablename a, tablename b
WHERE a.cartodb_id = b.cartodb_id + 1
```
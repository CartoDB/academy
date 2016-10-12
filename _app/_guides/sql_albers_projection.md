---
title: "Apply the Albers Projection with a SQL Query"
description: Describes how to project your map in CARTO using the Albers projection.
permalink: /courses/guides/apply-the-albers-projection-with-a-sql-query/
redirect_from: https://carto.com/docs/tutorials/albers/
---

# Apply the Albers Projection with a SQL Query

By default, maps created in CARTO use the Web Mercator projection. All maps are projections - a way to represent the "spherical" Earth as a flat representation in a browser. The [Albers projection](http://en.wikipedia.org/wiki/Albers_projection) is a popular map projection for the US because it creates minimal distortions for most of the country.

In CARTO, geometries are stored using the WGS84 projection, which uses `the_geom` column. To show data on a map, the Web Mercator projection makes it easy to quickly transform your data into pixels. Web Mercator versions of your data are pre-stored in a hidden column, called `the_geom_webmercator`. 

This guide describes how to quickly project your map and data with the Albers projection, instead of the default, Web Mercator.

**Download guide resources**

- `cb_2013_us_county_500k`

## Create a Map using US Counties

Create a a map showing all USA counties and their information, by using the _Data Library_ as your resource.

 - From the Data Library, create a map from the _cb_2013_us_county_500k_ dataset

**cheatsheet to Data Library include file**

The map opens in the Builder, displaying polygon geometries for the map layer.

## Change the Basemap

When using a different projection in CARTO other than Web Mercator, you must change the default basemap in order to better visualize state borders. It is recommended to select a color as your basemap. 

- For this guide, select _COLOR_ as the basemap source and select black as the background color.

<span class="wrap-border"><img src="/academy/img/guides/albers_projection/change_basemap.jpg" alt="Change basemap using a color source" /></span>

## Apply the Albers Projection with a SQL Query

The SQL option is available from the CARTO Builder when a map layer is selected. 

- Switch the slider button, located at the bottom of the _DATA_ options, from VALUES to SQL

- Apply the following SQL query:

{% highlight bash %}
SELECT 
  ST_Transform(the_geom, 2163) AS the_geom_webmercator,
  cartodb_id,
  affgeoid,
  cd113fp,
  countyfp,
  geoid,
  statefp
FROM 
  cb_2013_us_county_500k
{% endhighlight %} 

**Tip:** You may need to reposition your map once the SQL query is finished to bring the US back to the center.

<span class="wrap-border"><img src="/academy/img/guides/albers_projection/albers_applied.jpg" alt="Albers projection applied" /></span>

This SQL query applied the [ST_Transform](http://postgis.org/docs/ST_Transform.html) PostGIS function, which returns the geometry with coordinates transformed to the Albers projection. ST_Transform takes `the_geom` column and the ID number for the Spatial Reference System to be used, in this case, the Albers projection, which we know has a SRID of 2163. The hidden column, `the_geom_webmercator`, is updated to the newly transformed Albers geometry.

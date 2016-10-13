---
title: "Projections, the_geom and the_geom_webmercator"
description: Describes how to project your map in CARTO using the Web Mercator projection.
permalink: /courses/guides/projections-the-geom-and-the-geom-webmercator/
redirect_from: https://carto.com/docs/tutorials/albers/
---

# Projections, the_geom and the_geom_webmercator

By default, CARTO stores geospatial data using [`the_geom`](https://carto.com/docs/carto-engine/import-api/importing-geospatial-data/#dataset-basics) column from your dataset. This column displays the latitude and longitude in a single projection, using the WGS84 cartography method. Latitude and longitude describe a point on the closely spherical Earth. However, maps are often made to twist and distort the surface of the world, (in order to make it lie flat on paper, or appear correctly in a web browser), and need to show all the required parts of the world. Changing the map projection helps you store differences in the datasets' geospatial projection. 

A hidden column in your dataset, `the_geom_webmercator`, is used to store data using the [Web Mercator projection](https://en.wikipedia.org/wiki/Web_Mercator), which provide an efficient way for a two-dimensional flat map to be chopped up into seamless pixel map tiles that load quickly into the rectangular shape of your browser. Any time you insert or update geometries in `the_geom` column, the hidden `the_geom_webmercator` column is automatically updated behind the scenes.

This guide describes how to use a SQL query to store data in the `the_geom_webmercator` column. _If you are applying custom SQL queries to distort data on your map, you must include `the_geom_webmercator` in your results._

**Download guide resources**

- `ne_10m_populated_places_simple` - link to .carto file? Projections, the_geom and the_geom_webmercator (on 2016-10-13 at 17.47.24).carto

## View `the_geom_webmercator` Data

Use the SQL query to view the hidden `the_geom_webmercator` column in the table view of your dataset. The SQL option is available from the CARTO Builder when a map layer is selected. 

- Switch the slider button, located at the bottom of the _DATA_ options, from VALUES to SQL

- Apply the following SQL query:

{% highlight bash %}
SELECT the_geom_webmercator
FROM ne_10m_populated_places_simple
{% endhighlight %}

The results display `the_geom_webmercator` column in your dataset. This column does not appear in the table view unless you explicitly request it using this query. The results of the column are empty and your original map points still appear in the map visualization. This is because CARTO is drawing your map with the data in `the_geom_webmercator` column.

- Apply the following SQL query to replace `the_geom_webmercator` with `the_geom` data:

{% highlight bash %}
SELECT
 the_geom
FROM ne_10m_populated_places_simple
{% endhighlight %}

All the points on your map visualization disappear, and you may even get an error that your map could not be rendered, since your query applied empty `the_geom_webmercator` data into the results.

## Transform the `the_geom_` into `the_geom_webmercator`

What good is `the_geom` if you still need to have `the_geom_webmercator`? It is much easier when you are building applications to be thinking in Longitude-Latitude, so querying the database using those values is helpful.

### Query `the_geom_webmercator` Data

Apply the following PostGIS `ST_Transform` function to query `the_geom` data and create results for `the_geom_webmercator` column.

{% highlight bash %}
SELECT ST_Transform(the_geom, 3857)
AS the_geom_webmercator
FROM ne_10m_populated_places_simple
{% endhighlight %}

All your points appear on the map visualization again. To summarize, the `ST_Tranform` function works by:

- Applying the `ST_Transform` function to `the_geom` values
- CARTO identifies the Web Mercator projection using the EPSG:3857 projection
- The SQL query is telling `ST_Transform` to transform the WGS84 `the_geom` data into Web Mercator projections
- The `AS` command in the SQL query names `the_geom_webmercator` column in the result. This tells the map what data to render

## Conversions with `ST_Transform`

To apply a custom operation on `the_geom`, in combination with `ST_Transform`, apply this SQL query to visualize the results:

{% highlight bash %}
SELECT ST_Transform(ST_SnapToGrid(the_geom, 4, 4), 3857)
AS the_geom_webmercator
FROM ne_10m_populated_places_simple
{% endhighlight %}

As a result, all the points on your map visualization have lined up into a neat little grid. The grid is 4 degrees by 4 degrees.

<span class="wrap-border"><img src="/academy/img/guides/the_geom_webmercator/example_output.jpg" alt="Web Mercator projection" /></span>

## Writing `the_geom` Updates

To include these grids of points as real data in your dataset, you can _modify your original data_ in `the_geom` column and update it, by applying the following SQL query.

**Tip:** It is suggested to create a duplicate copy of your dataset prior to modifying it with UPDATE, INSERT or DELETE SQL query statements, if you want to avoid overwriting your original data.

{% highlight bash %}
UPDATE ne_10m_populated_places_simple
SET the_geom = ST_SnapToGrid(the_geom, 4, 4)
{% endhighlight %}

Note that `ST_Transform` is not needed because you are writing the results into `the_geom`, not changing your visualization. The SQL query modifies your original data with the grid projection data.

## Note about Projecting Coordinates

If you are projecting your data in other coordinate systems that are not using lon/lat values, you will need to transform your coordinates to be compatible. If you are unsure what the coordinate conversion is, you can add the [CRS property](http://geojson.org/geojson-spec.html) to your GeoJSON file before uploading to CARTO. CARTO will read the CRS property and automatically convert your coordinates to [EPSG:4326](http://www.spatialreference.org/ref/epsg/4326/) (lon/lat) values. Since the projection file represents the latitude and longitude in `the_geom` column of your dataset, it is highly recommended to verify that your geometries appear correctly, otherwise you may be using a projection file that is not 4326 compatible.

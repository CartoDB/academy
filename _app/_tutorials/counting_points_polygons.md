---
title: "Counting Points in Polygons"
permalink: /courses/tutorials/counting-points-with-polygons/
tweet_text: "Counting points in polygons with the CARTO Builder."
redirect_from: https://carto.com/docs/tutorials/counting_points.html
---

# Counting Points with Polygons

This tutorial describes how to count the number of points that intersect with each polygon. Suppose you have a map of European countries and populated places. One map layer contains polygon geometries (European countries) and one layer contains polygon geometries (populated places). 

If you were applying code, you would create a new column in your European country dataset (polygon) and apply a SQL query to store and visualize the number of populated places (points) in each European country. With the Builder, this is easily applied by adding the _Intersect second layer_ analysis option and by including the results as a widget on your map.

## Create a Multi-Layer Map with Two Geometries

Create a map with two layers, and two different geometries, by using the _Data Library_ as your resource.

1. From _Your datasets_ dashboard, click _DATA LIBRARY_ to view a list of all the available datasets

	<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/datalibrary.jpg" alt="Data Library data" /></span>

2. Search and connect the _European countries_ dataset to your account

	The dataset opens in the table view and displays the name as `ne_adm0_europe`.

2. Click _CREATE MAP_

	<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/create_map_from_dataset.jpg" alt="Create Map from an open dataset in the Builder" /></span>

	The map opens in the Builder, displaying the polygon geometries for the map layer.

3. Add a points layer to the map

	- From the LAYERS section of an open map in the Builder, click _ADD_

	<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/european_country_add_layer.jpg" alt="Add layer" /></span>

	The _Add a new layer_ options appear.

	- Search the _Data Library_ for the `ne_10m_populated_places_simple` dataset

	- Click _ADD LAYER_ to add the new data layer for your map

	The new layer is added to the LAYERS section, a confirmation message appears, and your map visualization refreshes. 

The following image displays a map containing two layers with different geometries. Note that each layer icon displays the geometry type behind the data (point, polygon).

<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/point_polygon_layers.jpg" alt="A map showing points and polygons" /></span>

## Analyze the Map by Intersecting Layers

You can count all the points (populated places) in the polygon (European countries) by applying the _Intersect second layer_ analysis option.

1. Click the _ADD ANALYSIS_ shortcut from the `ne_10m_populated_places_simple` data layer

	<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/add_analysis_shortcut.jpg" alt="Add analysis shortcut from a map layer" /></span>

	The _Add a new Analysis_ options appear.

2. Select _Intersect second layer_

3. Click _ADD ANALYSIS_

	The map layer displays the ANALYSES parameters.

4. For the TARGET LAYER, select the European countries layer `ne_adm0_europe`, and keep the default COUNT operation

5. Click APPLY

	A confirmation dialog appears, indicating the columns that were applied to support the analysis.  Click _NONE_ to return to the map visualization.

The map refreshes and displays only the European countries with point and polygon data.

<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/analysis_applied.jpg" alt="Analysis applied" /></span>

## View the Counted Points

To make it easier to visualize the results, you can add an interactive widget that is embedded on your map, to clearly display the number of points in the polygon. There is a shortcut to add widgets directly from your map layer.

**Note:** Since the analysis was added as part of the populated places layer (points), a data column `point_count` already exists.

1. Navigate to the _DATA_ section of the selected map layer
	
	The DATA section displays a summary of your non-geometry columns from your map layer. This is useful for identifying any other columns from your dataset that might be useful in transforming your map visualization.

2. Click the _Add as a widget_ checkbox for the `point_count` column

	A confirmation message appears and a shortcut to EDIT the details of the widget appears. Optionally, click _EDIT_ to open and manage the widget details.

Since `point_count` is a column that contains numbers as the data type, the widget automatically appears as a _Formula_ type of widget. Formula widgets filter data based on a defined counted number of elements in a row. This is useful for viewing analysis results. You can configure values by a data column, define the operation, and add additional text to define how the widget interacts with the data.

<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/point_count_widget.jpg" alt="Point Count widget" /></span>

**Tip:** Alternatively, if you are a developer with advanced SQL knowledge, you can create a new column in your dataset and store the result with a `ST_Intersects` query. For details, see the [PostGIS ST_Intersects](http://postgis.net/docs/ST_Intersects.html) documentation.

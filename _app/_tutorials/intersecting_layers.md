---
title: "Intersecting Geometry Layers"
description: Describe how to count points in polygons by intersecting layers with the CARTO Builder.
permalink: /courses/tutorials/intersecting-goemetry-layers/
tweet_text: "Counting points in polygons by intersecting layers."
redirect_from: https://carto.com/docs/tutorials/counting_points.html
---

# Intersecting Geometry Layers

This guide describes how to count the number of points that intersect in a polygon. Suppose you have a map of European countries and populated places. One map layer contains polygon geometries (European countries) and one layer contains polygon geometries (populated places).

If you were applying SQL code, you would create a new column in your European country dataset (polygon) and apply a SQL query to store and visualize the number of populated places (points) in each European country. With the Builder, this is easily applied by adding the _Intersect second layer_ analysis option.

The objective of this guide is to:

- Create a map with two layers, by connecting a point and polygon dataset from the CARTO Data Library
- Apply the _Intersect second layer_ analysis option to count all the points in a polygon, and style the analyzed results by value
- Include a _Formula_ widget to display the number of points in the polygon directly on your map

## Creating a Multi-Layer Map with Two Geometries

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

## Analyzing the Map by Intersecting Layers

You can count all the points (populated places) in the polygon (European countries) by applying the _Intersect second layer_ analysis option, and style the results based on the analysis.

1. Click the _ADD ANALYSIS_ shortcut from the `ne_10m_populated_places_simple` data layer

	<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/add_analysis_shortcut.jpg" alt="Add analysis shortcut from a map layer" /></span>

	The _Add a new Analysis_ options appear.

2. Select _Intersect second layer_

3. Click _ADD ANALYSIS_

	The map layer displays the ANALYSES parameters.

4. For the TARGET LAYER, select the European countries layer `ne_adm0_europe`, and keep the default COUNT operation

5. Click APPLY

	A confirmation dialog appears, indicating the columns that were applied to support the analysis.

6. Click STYLE THIS ANALYSIS

	<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/style_this_analysis.jpg" alt="Style Analysis" /></span>

	The STYLE options for the map layer appear, and enable you to apply unique styling based on the analyzed results, which are the `count_vals` and `count_vals_density` columns.

7. Style by Value

	- From the STYLE options, changed the aggregation style to _ANIMATED_, and select the type as _Heatmap_

	This is just an example to represent how you can change your style options. In this case, the ANIMATED aggregation style displays a selected column as an animated visualization, where you can style the different animation options for time-series data. When animated aggregation is selected for your map, it adds the duration as a widget.

	- Click the _Fill_ number to adjust fixed value of the point. You can use the slider bar to select a width, or type a width in the input field

	- Click on the _Fill_ color, and click _BY VALUE_ to select a data column and search for one of the analyzed data columns, `count_vals` or `count_vals_density`

	- Select one of the analyzed columns to style the animated map layer by the analyzed results

		**Tip**: Since the analyzed results contain numbers, you can edit the buckets and quantification for the selected number column. Scroll to view and select a color ramp. Optionally, click _Custom color set_ to customize the selected color ramp with your own hex and RGB colors.

	<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/style_by_value.jpg" alt="Style by value" /></span>

## Viewing the Counted Points

To make it easier to visualize the results, you can add an interactive widget that is embedded on your map, to clearly display the number of points in the polygon. There is a shortcut to add widgets directly from your map layer.

**Note:** Since the analysis was added as part of the populated places layer (points), a data column `point_count` already exists.

1. Navigate to the _DATA_ section of the selected map layer
	
	The DATA section displays a summary of your non-geometry columns from your map layer. This is useful for identifying any other columns from your dataset that might be useful in transforming your map visualization.

2. Click the _Add as a widget_ checkbox for the `point_count` column

	A confirmation message appears and a shortcut to EDIT the details of the widget appears. Optionally, click _EDIT_ to open and manage the widget details.

	**Tip:** Ensure your web browser is maximized in order to see all of your widgets. 

Since `point_count` is a column that contains numbers as the data type, the widget automatically appears as a _Formula_ type of widget. Formula widgets filter data based on a defined counted number of elements in a row. This is useful for viewing analysis results. You can configure values by a data column, define the operation, and add additional text to define how the widget interacts with the data.

<span class="wrap-border"><img src="/academy/img/tutorials/counting_points_polygons/point_count_widget.jpg" alt="Point Count widget" /></span>

**Tip:** Alternatively, if you are a developer with advanced SQL knowledge, you can create a new column in your dataset and store the result with a `ST_Intersects` query. For details, see the [PostGIS ST_Intersects](http://postgis.net/docs/ST_Intersects.html) documentation.

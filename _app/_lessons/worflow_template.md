---
title: "Worflow Template"
permalink: /courses/lessons/workflow/
tweet_text: "???"
lesson_message: "Rewrite workflow complete message..."
---
# Intersecting Geometry Layers

This lesson describes how to count the number of points that intersect in a polygon, by applying the _Intersect second layer_ analysis.

Use Case: Suppose you have a map of European countries and populated places. One map layer contains polygon geometries (European countries) and one layer contains polygon geometries (populated places).

**writer note_csobier:** Design to create some kind of button, or font, or color for Use Case?

<span class="wrap-border"><img src="/academy/img/lessons/next_in_workflow.jpg" alt="Example of workflow navigation" /></span>
**writer note_csobier:** Example of workflow navigation for Design, you can create anything similar. You can skip around to different sections, you are not forced to take a guided course consecutively. Sections in the workflow are high-level, to guide the users towards the end result.

------ Each subsequent section should be a new section in the lesson ---

## Understanding Geometry Layers

Map layers are essential for rendering your visualization. The appearance of map layers is driven by the aggregation style of your data, giving you greater control over configuring how the data is presented. Aggregations are based on your data geometry (point, line, polygons), so not all options may appear when you are styling a map layer.

- For point geometries, you can select the aggregation style of your data. These aggregation styles contain their own CartoCSS property, which you can further customize based on the overall spatial pattern of your map

- Line and Polygon geometries are automatically styled based on simple resolutions and do not contain any additional aggregation options

When adding map layers in the Builder, each layer displays the geometry type behind the data as either a point, line, or polygon. This is important because you can style options by geometry attributes. In some cases, you may need to intersect layers between two different types of geometries.

------ Each subsequent section should be a new section in the lesson ---

## Creating a Multi-Layer Map with Two Geometries

Create a map with two layers, and two different geometries, by using the _Data Library_ as your resource.

Connect the following datasets and create a map:

- `European countries` (polygon data)

- `ne_10m_populated_places_simple` (point data)

The following image displays a map containing two layers with different geometries. Note that each layer icon displays the geometry type behind the data (point, polygon).

<span class="wrap-border"><img src="/academy/img/lessons/intersecting_layers/point_polygon_layers.jpg" alt="A map showing points and polygons" /></span>

**Tip:** If you need help creating this map, follow [this procedure](#procedure).
**writer note_csobier:** Is there a way to expand/collapse content? For example, default appears collapsed. Click on "Procedure" to expand and view the steps below.

1. <a name="procedure"></a>From _Your datasets_ dashboard, click _DATA LIBRARY_ to view a list of all the available datasets

	<span class="wrap-border"><img src="/academy/img/lessons/intersecting_layers/datalibrary.jpg" alt="Data Library data" /></span>

2. Search and connect the _European countries_ dataset to your account

	The dataset opens in the table view and displays the name as `ne_adm0_europe`.

2. Click _CREATE MAP_

	<span class="wrap-border"><img src="/academy/img/lessons/intersecting_layers/create_map_from_dataset.jpg" alt="Create Map from an open dataset in the Builder" /></span>

	The map opens in the Builder, displaying the polygon geometries for the map layer.

3. Add a points layer to the map

	- From the LAYERS section of an open map in the Builder, click _ADD_

	<span class="wrap-border"><img src="/academy/img/lessons/intersecting_layers/european_country_add_layer.jpg" alt="Add layer" /></span>

	The _Add a new layer_ options appear.

	- Search the _Data Library_ for the `ne_10m_populated_places_simple` dataset

	- Click _ADD LAYER_ to add the new data layer for your map

	The new layer is added to the LAYERS section, a confirmation message appears, and your map visualization refreshes. 

------ Each subsequent section should be a new section in the lesson ---

## Analyzing the Map by Intersecting Layers

You can count all the points (populated places) in the polygon (European countries) by applying the _Intersect second layer_ analysis option, and style the results based on the analysis.

1. Click the _ADD ANALYSIS_ shortcut from the `ne_10m_populated_places_simple` data layer

	<span class="wrap-border"><img src="/academy/img/lessons/intersecting_layers/add_analysis_shortcut.jpg" alt="Add analysis shortcut from a map layer" /></span>

	The _Add a new Analysis_ options appear.

2. Select _Intersect second layer_

3. Click _ADD ANALYSIS_

	The map layer displays the ANALYSES parameters.

4. For the TARGET LAYER, select the European countries layer `ne_adm0_europe`, and keep the default COUNT operation

5. Click APPLY

	A confirmation dialog appears, indicating the columns that were applied to support the analysis.

6. Click STYLE THIS ANALYSIS

	<span class="wrap-border"><img src="/academy/img/lessons/intersecting_layers/style_this_analysis.jpg" alt="Style Analysis" /></span>

	The STYLE options for the map layer appear, and enable you to apply unique styling based on the analyzed results, which are the `count_vals` and `count_vals_density` columns.

7. Style by Value

	- From the STYLE options, changed the aggregation style to _ANIMATED_, and select the type as _Heatmap_

	This is just an example to represent how you can change your style options. In this case, the ANIMATED aggregation style displays a selected column as an animated visualization, where you can style the different animation options for time-series data. When animated aggregation is selected for your map, it adds the duration as a widget.

	- Click the _Fill_ number to adjust fixed value of the point. You can use the slider bar to select a width, or type a width in the input field

	- Click on the _Fill_ color, and click _BY VALUE_ to select a data column and search for one of the analyzed data columns, `count_vals` or `count_vals_density`

	- Select one of the analyzed columns to style the animated map layer by the analyzed results

		**Tip**: Since the analyzed results contain numbers, you can edit the buckets and quantification for the selected number column. Scroll to view and select a color ramp. Optionally, click _Custom color set_ to customize the selected color ramp with your own hex and RGB colors.

	<span class="wrap-border"><img src="/academy/img/lessons/intersecting_layers/style_by_value.jpg" alt="Style by value" /></span>

------ Each subsequent section should be a new section in the lesson ---

## Viewing the Counted Points

To make it easier to visualize the results, you can add an interactive widget that is embedded on your map, to clearly display the number of points in the polygon. There is a shortcut to add widgets directly from your map layer.

**Note:** Since the analysis was added as part of the populated places layer (points), a data column `point_count` already exists.

1. Navigate to the _DATA_ section of the selected map layer
	
	The DATA section displays a summary of your non-geometry columns from your map layer. This is useful for identifying any other columns from your dataset that might be useful in transforming your map visualization.

2. Click the _Add as a widget_ checkbox for the `point_count` column

	A confirmation message appears and a shortcut to EDIT the details of the widget appears. Optionally, click _EDIT_ to open and manage the widget details.

	**Tip:** Ensure your web browser is maximized in order to see all of your widgets. 

Since `point_count` is a column that contains numbers as the data type, the widget automatically appears as a _Formula_ type of widget. Formula widgets filter data based on a defined counted number of elements in a row. This is useful for viewing analysis results. You can configure values by a data column, define the operation, and add additional text to define how the widget interacts with the data.

<span class="wrap-border"><img src="/academy/img/lessons/intersecting_layers/point_count_widget.jpg" alt="Point Count widget" /></span>

Now that you understand the workflow, you can use your own data to intersect different types of geometry in CARTO.

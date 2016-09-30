---
title: "Animating Maps with Point Data"
description: Describes how to change the style aggregation option to animate your map layer with the CARTO Builder.
permalink: /courses/guides/animating-maps-with-point-data/
redirect_from: https://carto.com/academy/courses/beginners-course/animated-maps-with-point-data/
---

# Animating Maps with Point Data

This guide describes how to visualize geographic data over time, by applying the _Animated_ aggregation style to animate your map. In order to animate your data, you _must_ have a map layer containing point geometries, and a dataset column containing a timestamp, count, or range of data. Otherwise, you can animate points based on the [`cartodb_id`](https://carto.com/docs/carto-engine/import-api/importing-geospatial-data/#dataset-basics) column.

When the animated style option is selected, you can display the animation as a progression of points, or as an animated heatmap to show different color intensities.

**Download guide resources**

- `ne_10m_populated_places_simple`

## Creating a Map with Point Data

Create a new map and select a dataset that contains point geometries from the Data Library.

1. From _Your maps_ dashboard, click NEW MAP

	The Add datasets options appear.

2. Click _DATA LIBRARY_ to view a list of all the available datasets

	**Tip:** Each dataset icon displays the geometry behind the data as either a point, line, or polygon.

3. Click _Search_ to search the library for `ne_10m_populated_places_simple`

4. Click _CREATE MAP_

	<span class="wrap-border"><img src="/academy/img/guides/animated_maps/add_dataset.jpg" alt="Add datasets dialog" /></span>

	The untitled map opens in the Builder, displaying the point geometries for the map layer.

5. For best practices, double-click on the map name to rename it

	**Tip:** You can also use the Map Name Context Menu to select the _Rename_ option.

	<span class="wrap-border"><img src="/academy/img/guides/animated_maps/simple_points.jpg" alt="Map with simple points" /></span>

	**Note:** Each map layer icon in the Builder displays the geometry type behind the data  as either a point, line, or polygon.

## Animate your Map

The imported populated places dataset displays the geometries as a simple point. The filtered column is counted and appears as a single pattern. To animate the data, style the pop_max column, and select different rendering options for the animation.

**Note:** For point geometries only, you can select the aggregation style of your data. These aggregation styles contain their own CartoCSS property, which you can further customize based on the overall spatial pattern of your map.

1. Click the map layer

	The DATA, ANALYSES, STYLE, POP-UP, and LEGEND options are available for the selected layer. The DATA section appears by default.

2. Click _STYLE_ to access the styling options for the selected map layer

    <span class="wrap-border"><img src="/academy/img/guides/styling/select_style.jpg" alt="Select STYLE for a map layer" /></span>

    A list of style options, based on your point data, appears. Use the scroll bar to view all aggregation options.

	<span class="wrap-border"><img src="/academy/img/guides/animated_maps/scroll_aggregation.jpg" alt="Scroll to see all aggregation options" /></span>

3. Select _ANIMATED_ as the _Aggregation_ style for the map layer

	The _Style_ options refresh, displaying the animation options. By default, the animation type appears by _Points_.

    <span class="wrap-border"><img src="/academy/img/guides/animated_maps/animation_options.jpg" alt="Animation options to see all aggregation options" /></span>

    **Note:**  When _ANIMATED_ aggregation is selected for your layer, it adds the duration as a widget.  

    **Cheat sheet** how to modify and edit widgets.

## Style by Value

From the STYLE options, you can use the FILL option to select the column value that drives the animation.

1. Click the _FILL_ number to adjust fixed value of the point. You can use the slider bar to select a width, or type a width in the input field

2. From the _FILL_ color, click _BY VALUE_ to select a data column from your dataset

	You can style by value and choose the column that contains the categories. You can even customize the color ramps of the category.

**Cheat sheet** to style by colors.

<span class="wrap-border"><img src="/academy/img/guides/animated_maps/edited_animation_options.jpg" alt="Edited animation options" /></span>

**cheat sheet:** For a description of all animation options, see link to animated map options.

## Style by CartoCSS

Optionally, you can apply the same options (and even some custom enhancements) using the CartoCSS code behind the scenes. If you prefer to use CartoCSS syntax to style the animation:

- Switch the slider button, located at the bottom of the _STYLE_ options, from VALUES to CARTOCSS

	The CartoCSS syntax for the animation appears using Torque properties.

	 <span class="wrap-border"><img src="/academy/img/guides/animated_maps/animation_cartocss.jpg" alt="CartoCSS code of animated style options" /></span>

- You can edit or add custom styles with CartoCSS

	**Note:** See [CartoCSS Properties for Torque Style Maps]( https://carto.com/docs/carto-engine/cartocss/properties-for-torque/) for a description and available values for each property.

	The _BY VALUE_ selection of _pop_max_ added the `CDB_Math_Mode(value)` property to the CartoCSS code.

---
title: "Displaying Temporal Data with Heatmaps"
description: Describes how to change the style aggregation options to display a static or animated heatmap in the CARTO Builder.
permalink: /courses/guides/displaying-temporal-data-with-heatmaps/
redirect_from: https://carto.com/docs/tutorials/heatmap/
---

# Displaying Temporal Data with Heatmaps

This guide describes how to visualize point data by a slowly changing dimension of time, as represented by a heatmap. Areas of greater color intensity indicate greater density of data. Temporal data can be displayed as a static heatmap, or as an animated heatmap through the STYLE options in the Builder.

**Download guide resources**

- `ne_10m_populated_places_simple`

## Static Heatmap

A static heatmap displays temporal data by applying a color ramp to represent the intensity of data. You must select a map layer containing point geometries.

- Select _PIXEL_ as the _Aggregation_ style for the selected map layer

	**Note:** For point geometries only, you can select the aggregation style of your data. These aggregation styles contain their own CartoCSS property, which you can further customize based on the overall spatial pattern of your map.

- Style the heatmap by value

	Use the FILL option to select the column value that drives the static pixels of temporal data. When Heatmap is selected, you can only style by value.

	- From the _FILL_ color, click _BY VALUE_ to select a data column that represent your dataset. Heatmaps need a time or date value to represent temporal data.

	<span class="wrap-border"><img src="/academy/img/guides/heatmaps/edit_heatmap_options.jpg" alt="Edit heatmap options" /></span>

	**cheat sheet** for a description of all pixel agg options, see https://carto.com/docs/carto-builder/styling-map-layers/#aggregation-pixel-style-options

**Tip:** To achieve a similar effect with polygon or line map layers, you can style by value and apply the BLENDING options to show different intensities of stati map data.

## Animated Heatmap

If you want the temporal data to appear animated, there is a separate _Aggregation_ style for animation and you can select different options for rendering the animation.

- Select _ANIMATED_ as the _Aggregation_ style for the selected map layer

	The _Style_ options refresh, displaying the animation options. By default, the animation type appears by _Points_.

    **Note:**  When _ANIMATED_ aggregation is selected for your layer, it adds the duration as a widget.  

	**Cheat sheet** how to modify and edit widgets.

- Select _Heatmap_ as the animated TYPE

	The map displays animated temporal data.

    <span class="wrap-border"><img src="/academy/img/guides/heatmaps/heatmap_animation_options.jpg" alt="Heatmap animated options" /></span>

- Style the animated heatmap by value

	Use the FILL option to select the column value that drives the animation. When ANIMATED Heatmap is selected, you can only style by value.

	- From the _FILL_ color, click _BY VALUE_ to select a data column that represent your dataset. Heatmaps need a time or date value to represent temporal data.

	<span class="wrap-border"><img src="/academy/img/guides/heatmaps/edit_animation_options.jpg" alt="Edited animation options" /></span>

**cheat sheet:** For a description of all animation options, see link to animated map options.

## Style by CartoCSS

Optionally, you can apply the same options (and even some custom enhancements) using the CartoCSS code behind the scenes. If you prefer to use CartoCSS syntax to style your map:

- Switch the slider button, located at the bottom of the _STYLE_ options, from VALUES to CARTOCSS

The CartoCSS syntax for the animation appears using Torque properties. You can edit or add custom styles with CartoCSS. See [CartoCSS - Torque Heatmaps](https://carto.com/docs/carto-engine/cartocss/properties-for-torque/#cartocss---torque-heatmaps) for a description and available values for each property.

The _cartodb_id_ column a required CartoCSS property when heatmaps are applied.

## Reverse the Intensity of Data

In some cases, your data may require that you reverse the intensity of how the temporal heatmap appears. For example, suppose you have crime data and you want to display the areas of lower values first. Or perhaps you have data that contains elevation values and you want to display them from low to high.

- By default, color ramps are shown from dark (representing high values) to to light (represented by low values). There also so diverging color ramps to represent categories.

- Click the toggle arrows to switch the color ramp from dark (high values) to light (low values)

<span class="wrap-border"><img src="/academy/img/guides/heatmaps/reverse_color_ramp.jpg" alt="Reverse color ramp to show intensity" /></span>

**Tip:** Toggling the color ramp is also useful if you have a dark background. Reversing the color ramp can help better visualize the results. For details, see [5 CARTOGRAPHIC TIPS FOR YOUR DATA OBSERVATORY MAPS](https://carto.com/blog/cartography-data-extract-value/).

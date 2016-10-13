---
title: "Analysis - Intersect Second Layer"
description: Describe how to count points in polygons by intersecting layers with the CARTO Builder.
permalink: /courses/guides/intersect-second-layer/
redirect_from: https://carto.com/docs/tutorials/counting_points.html
---

# Analysis- Intersect Second Layer

This guide provides an example of how to apply the _Intersect second layer_ analysis option to count the number of points that intersect in a polygon.

If you were applying SQL code, you would have to create a new column in your polygon dataset and apply a SQL query to store and visualize the number of points in each polygon. With the Builder, this is easily applied by adding the _Intersect second layer_ analysis option directly to the map layer.

**Download guide resources**

- `European countries`
- `ne_10m_populated_places_simple`
- link to carto file? Analysis- Intersect Second Layer (on 2016-10-13 at 18.15.44).carto

## Example

 A multi-lalyer map containing two geometries. One map layer contains polygon geometries (European countries) and one layer contains polygon geometries (populated places). Count the number of points that intersect in a polygon.

 <span class="wrap-border"><img src="/academy/img/guides/intersecting_layers/point_polygon_layers.jpg" alt="A map showing points and polygons" /></span>

 - From the `ne_10m_populated_places_simple` data layer, apply the _Intersect second layer_ analysis

	- For the TARGET LAYER, select the European countries layer `ne_adm0_europe`, and keep the default COUNT operation and apply the parameters

### Results

Style the results based on the analysis. Additionally, to make it easier to visualize the results, add an interactive widget that is embedded on your map, to clearly display the number of points in the polygon. There is a shortcut to add widgets directly from your map layer.

- When the analysis confirmation dialog appears, click STYLE THIS ANALYSIS

- From the STYLE options, click on the _Fill_ color, and click _BY VALUE_ to select a data column and search for one of the analyzed data columns, `count_vals` or `count_vals_density`

	**Tip**: Since the analyzed results contain numbers, you can edit the buckets and quantification for the selected number column. Scroll to view and select a color ramp. Optionally, click _Custom color set_ to customize the selected color ramp with your own hex and RGB colors.

**cheatsheet to style by quantification and style by color**

- Navigate to the _DATA_ section of the selected map layer, and click the _Add as a widget_ checkbox for the `point_count` column

	**Note:** Since the analysis was added as part of the populated places layer (points), a data column `point_count` already exists. Since `point_count` is a column that contains numbers as the data type, the widget automatically appears as a _Formula_ type of widget. Formula widgets filter data based on a defined counted number of elements in a row. This is useful for viewing analysis results. You can configure values by a data column, define the operation, and add additional text to define how the widget interacts with the data.

<span class="wrap-border"><img src="/academy/img/guides/intersecting_layers/point_count_widget.jpg" alt="Point Count widget" /></span>

(NEED TO RECAPTURE RESULT IMAGE BASED ON RECOMMENDED CartoCSS STYLING THAT MAMATA RECOMMENDS)

## Cartography Tip

### CartoCSS Styling (if applicable)

## External Resources

- If you are a developer with advanced SQL knowledge, you can create a new column in your dataset and store the result with a `ST_Intersects` query. For details, see the [PostGIS ST_Intersects](http://postgis.net/docs/ST_Intersects.html) documentation.

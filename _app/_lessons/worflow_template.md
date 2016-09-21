---
title: "Worflow Template"
permalink: /courses/lessons/workflow/
tweet_text: "???"
lesson_message: "Rewrite workflow complete message..."
---
# Intersecting Geometry Layers

This lesson describes how to count the number of points that intersect in a polygon, by using the _Intersect second layer_ analysis.

Use Case: Suppose you have a map of European countries and populated places. One map layer contains polygon geometries (European countries) and one layer contains polygon geometries (populated places).

**writer note_csobier:** Design to create some kind of button, or font, or color that highlights the use case?

Once you understand this workflow, you can use your own data to intersect different types of geometry in CARTO.

Example of workflow navigation for Design:
<span class="wrap-border"><img src="/academy/img/lessons/next_in_workflow.jpg" alt="Example of workflow navigation" /></span>

------ Each subsequent section should be a new section in the lesson ---

## Understanding Geometry Layers

Map layers are essential for rendering your visualization. The appearance of map layers is driven by the aggregation style of your data, giving you greater control over configuring how the data is presented. Aggregations are based on your data geometry (point, line, polygons), so not all options may appear when you are styling a map layer.

- For point geometries, you can select the aggregation style of your data. These aggregation styles contain their own CartoCSS property, which you can further customize based on the overall spatial pattern of your map

- Line and Polygon geometries are automatically styled based on simple resolutions and do not contain any additional aggregation options

When adding map layers in the Builder, each layer displays the geometry type behind the data as either a point, line, or polygon. This is important because you can style options by geometry attributes. In some cases, you may need to intersect layers between two different types of geometries.

List of datasets:

------ Each subsequent section should be a new section in the lesson ---

1. Add Map Layers

Steps to create a map with two layers, by connecting a point and polygon dataset from the CARTO Data Library

- Click ADD to add a new layer to your map. The number of layers allowed is based on your account plan
- Click and drag to rearrange the hierarchal order of how layer appear on your map

------ Each subsequent section should be a new section in the lesson ---


- Apply the _Intersect second layer_ analysis option to count all the points in a polygon, and style the analyzed results by value
- Include a _Formula_ widget to display the number of points in the polygon directly on your map


They are not guided courses, there are no pre-reqs. Steps in the workflow are high-level to guide the users towards the end result.
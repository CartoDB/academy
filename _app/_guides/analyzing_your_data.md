---
title: "Analyzing your Data"
description: Describes how to access the ANALYSES options from the CARTO Builder.
permalink: /courses/guides/analyzing-your-data/
redirect_from: https://carto.com/docs/carto-builder/analyzing-your-data/
---

# Analyzing your Data

This guide describes how to access the ANALYSES options from the CARTO Builder, which enable you to analyze your data without having to apply complex SQL code.

**Note:** Behind the scenes, analyses algorithms are collected from [PostgreSQL and PostGIS]({{ site.baseurl }}/faqs/postgresql-and-postgis/) functionality, the [Data Services API]({{ site.baseurl }}/carto-engine/dataservices-api/), [Crankshaft](https://github.com/CartoDB/crankshaft), and the [Data Observatory]({{ site.baseurl }}/carto-engine/data/).

(writer note_csobier: Several sections in this guide can link to the Cheat Sheet section / Other Resources of the right-side of the GUIDE template?)

## Analysis Options

The section describes the analysis options and provides links to any internal or external resources that you can reference about the code or algorithms used to apply the analysis to your data. Analysis options are organized by the following categories:

- **CREATE AND CLEAN** - Generate and create different geometries based on your data, and clean up existing data by filtering or combining common values
- **TRANSFORM** - Transform your geometry using different calculations and data modifications
- **ANALYZE AND PREDICT** - Applies calculated spatial correlations, enabling you to visualize and predict sophisticated spatial analysis

_**Note:** Some analysis options will query and modify your data, and are subject to quota limitations. Only the options that involve data enrichment, or apply [location data services](https://carto.com/location-data-services/), are subject to quota usage. The table below indicates* which analysis options are subject to [quota consumption](#quota-consumption-for-analysis)._

The following analysis options are available:

Analysis Option | Description
--- | ---
*Georeference | Use street addresses, city names, or other location text to generate point geometries<br /><br />*Geocoding by street address consumes quota. See [Geocoding Functions](https://carto.com/docs/carto-engine/dataservices-api/geocoding-functions/).
*Enrich from Data Observatory | Add a new column with contextual demographic and economic measures<br /><br />*[Data Observatory](https://carto.com/docs/carto-engine/data/) functions consume quota
Join columns from 2nd layer | Join columns from a second layer by linking a shared value found in both datasets
Filter by layer | Calculate a direct or weighted centroid based on all rows of a layer or by categories
Filter centroid by geometries | Calculate a direct or weighted centroid based on all rows of a layer or by categoriesexport
Group points into polygons | Aggregate points into polygons, such as convex hulls or bounding boxes
*Create areas of influence | Use travel time (e.g. walking or driving) or distance to calculate areas of influence (AOI) from points<br /><br />*Based on the service provider included with your account plan, AOI may consume quota.
Intersect second layer | Intersect with a second layer and calculate aggregations on the fly
Filter points in polygons | Filter points intersecting your polygons layer, and augment those with your polygons columns
Filter rows by column value | Keep or discard rows according to a custom criteria
Subsample percent of rows | Subsample the rows in a dataset based on a specified percent
Calculate clusters of points | Spatially separate a layer of points into a specified number (N) of groups
Detect outliers and clusters | Use [Moran's I](https://en.wikipedia.org/wiki/Moran%27s_I) to find high (HL) and low (LH) outliers and high (HH) and low (LL) clusters
Predict trends and volatility | Predict probability of upward and downward trends using spatial Markov chains

## Add Analyses to a Map Layer

As map layers are categorized alphabetically (A, B, C, D) in the Builder, you can easily see the chained workflow of analyses that are included as part of each layer (A1, A2, B1, and so on).

_**Note:** There are no particular requirements when adding analyses. This is where you get to put on your analytical thinking cap and explore your data. View our [CARTO Blogs](https://carto.com/blog/tagged/analysis/) for use cases that highlight the benefits of analyzing your data._ This procedure simply describes how to access the analysis options and manage the analysis details.

1. From the LAYERS section of the Builder, click the _ADD ANALYSIS_ shortcut from the map layer

	<span class="wrap-border"><img src="/academy/img/guides/analysis/add_analysis_shortcut.jpg" alt="Add Analylsis from a layer" /></span>

	The _Add a new analysis_ options appear.

2. Select an analysis

	**Note:** Some analysis options may appear grayed out, indicating that it is not applicable to your data.

    <span class="wrap-border"><img src="/academy/img/guides/analysis/analysis_options.jpg" alt="Select an analysis option" /></span>

3. Click _ADD ANALYSIS_

	The Builder automatically displays the ANALYSIS section of the Builder. (Each map layer contains the DATA, ANALYSES, STYLE, POP-UP, and LEGEND options). The ANALYSES section is where you will manage and edit your analyses details.

    <span class="wrap-border"><img src="/academy/img/guides/analysis/analyses_section_for_layer.jpg" alt="ANALYSES section of a Builder" /></span>

4. Select details for your analysis

	Each section of the ANLAYSES workflow is numbered, to guide you through the options. Options vary, depending on the analysis you selected and your data columns.

5. Click _APPLY_ to apply the analysis details

	**Note:** A confirmation message appears and the analyzed results is a [read-only SQL query](/docs/carto-builder/applying-code-in-the-builder/#read-only-sql-code).


6.  Click _STYLE THIS ANALYSIS_ to automatically go to the [STYLE options](/docs/carto-builder/styling-map-layers/) for the map layer and apply unique styling based on the analyzed data column

	<span class="wrap-border"><img src="/academy/img/guides/analysis/analysis_confirmation.jpg" alt="Analysis confirmation dialog" /></span>

7. Click <img src="/academy/img/common/back_navigaton_arrow.jpg" alt="Back navigation arrow" />, next to the layer name at the top of the Builder, to navigate back to the LAYERS section

    You can easily see the chained analysis workflow that is included as part of your map layer (A1, A2, B1, and so on). Repeat this procedure for each map layer that you want to include anlayses for.

    <span class="wrap-border"><img src="/academy/img/guides/analysis/chained_workflow_layer.jpg" alt="Chained workflow for a map layer" /></span>

8. If your map is published, update it to show your analyzed data

	For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps).

## Chaining Multiple Analyses

You can add multiple analysis to a single map layer. Creating a chained workflow of analysis enhances your data even further by enabling you to create, transform, and predict results on one map layer.

1. From the ANALYSES section of the Builder, click the plus sign (+) to add an additional chain to the analysis workflow

	<span class="wrap-border"><img src="/academy/img/guides/analysis/add_workflow.jpg" alt="Click plus to add to workflow" /></span>

	The _Add a new analysis_ options appear.

2. [Add](#add-analyses-to-a-map-layer) another analysis on top of your analyzed data

3. If your map is published, update it to show your data changes

	For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

## Delete an Analysis

This procedure describes how to delete a selected analysis from a chained workflow.

1. From the ANALYSES section of the Builder, select the analysis that you want to delete

	**Tip:** The selected analysis appears in color, other chains in the workflow are grayed out when they are not selected.

2. Click _DELETE_ 

	<span class="wrap-border"><img src="/academy/img/guides/analysis/delete_workflow.jpg" alt="Delete chain from workflow" /></span>

	The selected analysis is deleted from the chain, and the original styling of the map layer appears.

3. If your map is published, update it to show your data changes

	For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

## Create Layer from Analysis

Once an analysis is created, you can use the drag and drop functionality to quickly create a new layer based on an analysis, and apply custom styling based on your analysis. This procedure describes how to auto-create a new map layer from an analysis.

- From the LAYERS section of an open map in the Builder, left-click and drag a selected analysis within a map layer

	<span class="wrap-border"><img src="/academy/img/guides/analysis/move_analysis.jpg" alt="Drag analysis" /></span>

	A confirmation message appears.

	<span class="wrap-border"><img src="/academy/img/guides/analysis/new_layer_analylsis.jpg" alt="New layer created" /></span>

	The new layer is added to the DATA section, and your map visualization refreshes.

	In the following example, note how the new layer (C) was created with the chained analysis (C1), and (A1) appears as part of the new map layer to identify where it came from.

	<span class="wrap-border"><img src="/academy/img/guides/analysis/new_layer_analysis.jpg" alt="New layer shows chains" /></span>

- Optionally, apply additional styling to the new map layer to better differentiate the analyzed data

	**Note:** If you applied styling to an analyzed column, that style is transferred to the new layer.

## Export Analyzed Data

{% include carto-builder/export_data_intro.md %}

**Note:** Most analysis queries generate a read-only cached table of data, and do not actually modify your original dataset. Exporting a read-only analyzed map layer will export the node of cached data. To export the original dataset, delete the analysis and export the map layer.

{% include carto-builder/export_data_procedure.md %}

## Analysis Rules

Note the following tips and behavior when applying analyses to map layers in the Builder.

- Only the analysis that applies to your data is available, so not all options may appear for the selected map layer

- Each section of the ANALYSES options is numbered, to guide you through the workflow. You can add and delete different analysis (chains) as part of one workflow

- If you delete an analysis from a map layer, any unique styling applied to an analysis column is also deleted, and the original stying of your map layer appears

- For some analysis options, the analyzed data is a read-only SQL query that does not alter your dataset. It applies a temporary node of cached data to your table. If you check the original dataset, it has not been modified. This helps with map rendering going forward, as the analyzed data is already cached and improves processing when you are exploring your data

	For example, if a map layer containing an analysis is hidden, the analyzed data is also hidden from your map visualization. Since analyzed data is cached, you can show and hide your layers to view how analyzed data appears on your map.

- If you export a map containing an analysis, the analyzed data is included as a node within the data

- If you have widgets containing analyzed data on your map, interacting with the widget dynamically changes your analysis

	**Note:** If you delete an analysis layer containing widgets, the widget for the analyzed layer is also deleted

- If you have an analysis applied to a published embedded map in an external application, changing your analysis does not dynamically update the embedded map. You will have to [update the published map](/docs/carto-builder/publishing-and-sharing-maps/#updating-a-published-map) to reflect the changes

### Quota Consumption for Analysis

For most analysis options, the results are cached as [read-only SQL queries](/docs/carto-builder/applying-code-in-the-builder/#read-only-sql-code) and do not actually modify your original dataset. However, there are _some_ analysis queries that add calculated results to columns in your dataset, and extra fees may apply. View our [terms and conditions](https://carto.com/terms/), or [contact us,](mailto:sales@carto.com) for details about which options require service fees to your account.

The following quota consumption rules apply for select analysis queries that modify your data:

- Quota consumption is calculated based on the number of requests made on each dataset. **One row of returned data consumes one credit against your account**

	_**Note:** The Builder notifies you before you apply an analysis query that is subject to quota consumption._

	<span class="wrap-border"><img src="/academy/img/guides/analysis/apply_confirmation.jpg" alt="Apply analysis confirmation in the Builder" /></span>

	Note the extra fee amount in the example image is blurred out, as options vary depending on your account plan.

	- For _Georeference_, each row of `the_geom` column is updated based on the analysis. The query includes the calculated results that transformed your data into geometry data (such as countries, provinces, states, cities, postal codes, IP addresses and street addresses)

	- For _Create Areas of Interest_, each row of `the_geom` column is updated based on the analysis. Results include the calculated [isochrone function](/docs/carto-engine/dataservices-api/isoline-functions/#cdbisochronesource-geometry-mode-text-range-integer-options-text) for connecting geometries to a defined area. _**Note:** Consumption rules vary, depending on the analysis parameter selections for the RADIUS and BOUNDARIES_

	- For _Enrich from the Data Observatory_, a new column is added to your dataset based on the analysis. Each row from your dataset includes the calculated [Data Observatory](/docs/carto-engine/data/) function for the applied measurement of data

	- (COMING SOON) For _Routing_, each row of `the_geom` column is updated based on the analysis. The query includes the calculated result for the navigation from a defined start location to a defined end location

- When modifying an applied analysis, refresh your web browser to ensure that CARTO has had a chance to recognize any changes in quota consumption

- An analysis error appears if you have reached the limit of your quota. [Contact us](mailto:sales@carto.com) to discuss options for increasing your quota

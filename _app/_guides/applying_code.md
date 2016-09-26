---
title: "Applying Code in the Builder"
description: Advanced Builder tools enable you to apply code for customizing CARTO Builder features.
permalink: /courses/guides/applying-code-in-the-builder/
redirect_from: https://carto.com/docs/carto-builder/applying-code-in-the-builder/
---

# Applying Code in the Builder

This guide describes how users who are more e more comfortable using code can access the SQL, CartoCSS, and HTML views for a selected map layer. These options are available when you switch your layers view with the code slider button. This section describes how to access these coding tools in the Builder.

## SQL Query

[SQL](https://en.wikipedia.org/wiki/SQL) (Structured Query Language) is how applications request data from a database. The CARTO geospatial database is built on the [PostgreSQL](http://www.postgresql.org/docs/9.1/static/) platform and supports advanced [PostGIS](http://postgis.net/docs/manual-2.0/) capabilities. PostGIS allows you to perform geospatial queries, such as finding data points within a given radius, the area of polygons in your dataset, and so on. You can run a SQL query from a selected dataset, or directly in the Builder.

SQL queries enable you to:

- Request simple queries (*i.e.* "request all records from this dataset"). You can apply an custom SQL query to view specific data
- Request queries that match certain conditions (*i.e.* "request all records in which this field equals a certain value")
- Request more complex queries that combine data from two or more datasets
- Change your map projection by inserting definitions
- SQL queries revise your original data and only display data that matches your request. It is suggested to export, or create a duplicate copy, of your original dataset if you want to save it

**Note:** Advanced developers can use the CARTO Engine [SQL API](https://carto.com/docs/carto-engine/sql-api/) to run queries.

### SQL Query in the Builder

The *SQL* option is available from the CARTO Builder when a map layer is selected. This procedure describes how to run a SQL query in the CARTO Builder.

{% include carto-builder/select_map_steps.md %}

3. Select a map layer

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/select_layer_from_builder.jpg" alt="Select layer from Builder" /></span>

	The selected layer options appear (DATA, ANALYSES, STYLE, POP-UP, LEGEND).

4. From the DATA section, click the slider button from _VALUES_ to _SQL_

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/data_value_sql_slider_button.jpg" alt="Switch from VALUES to SQL" /></span>

	The DATA is displayed as SQL code.

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/data_sql_view.jpg" alt="Viewing data by SQL code" /></span>

5. You can apply SQL queries and undo or redo your changes

	**Tip:** SQL queries are case-sensitive, if you need to reference your dataset to confirm a column name, there is a shortcut to switch between viewing your dataset in a table, or show the map visualization. The table view and map view appear as icons when a map layer is selected. Click to switch between viewing your dataset in a table, or show the map visualization of your data. Since SQL queries only display the data that matches your request, this shortcut is also helpful for viewing your revised dataset.

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/data_sql_view_table.jpg" alt="Viewing your dataset with SQL code" /></span>

6. If your map is published, update it to show your data changes

	For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

**Tip:** See the [SQL and PostGIS in CARTO]({{ site.academy-baseurl }}/courses/04-sql-postgis.html) Map Academy course for more details about querying your data.

### SQL Query in a Dataset

The *SQL* option is also available when you are viewing a selected table from _Your datasets_ dashboard. Click to the slider button to switch between viewing your data by metadata (table) or SQL (opens the SQL query view)

<span class="wrap-border"><img src="/academy/img/guides/applying_code/dataset_sql_query.jpg" alt="dataset sql query" /></span>

### Read-Only SQL Code

If you applied an analysis option to your map, you can view the SQL query that was used to generate the analysis. For example, the following image displays the _Filter rows by column values_ analysis option applied to a map layer, and how viewing the SQL code from the DATA section displays the read-only query that was applied.

<span class="wrap-border"><img src="/academy/img/guides/applying_code/layer_analysis_readonly_sql.jpg" alt="read-only SQL code from an applied anlysis" /></span>

Rules about Read-only SQL Code:

- You cannot edit read-only queries in the Builder. Read-only queries are cached tables, and do not actually modify your original dataset. Think of it as a new, temporary snapshot of data that is stored in the Cloud. If you delete an analysis from a map layer, your original dataset remains intact

- Viewing read-only SQL is useful if you want to reference how the analysis cached your data behind the scenes. It also helps with map rendering going forward, as the analyzed data has already been cached

- Optionally, you can [export the map layer](/docs/carto-builder/analyzing-your-data/#export-analyzed-data) that contains an analysis. Only the queried data will be exported, not the original dataset

**Tip:** See [Analyzing your Data](/docs/carto-builder/analyzing-your-data/) for details about the ANALYSES options.

### SQL for Map Projections

We all know by now that the earth is not flat. Maps, however, are. As 2D representations of the globe, maps are inevitably distorted. The methods used to digitally render the earth are called  [map projections](http://en.wikipedia.org/wiki/Map_projection). Different types of projections are used to represent the earth at various scales. From the continents to a single region or state / province, each projection type must preserve certain spherical properties at the expense of others (such as area, direction, shape, and distance).

The majority of online maps are a variant of the Mercator Projection, commonly referred to as the Web Mercator. **By default, maps created in CARTO use the Web Mercator projection**. You can learn more about [map projections on Wikipedia](http://en.wikipedia.org/wiki/Map_projection), and read about how CARTO handles [projections internally]({{ site.baseurl }}/tutorials/projections/).

Alternatively, you can create non-Mercator maps by applying a SQL query to your maps. This enables you to change the default map projections in your dataset by inserting a projection definition. For examples of how to create non-Mercator maps, see the [_Free Your Maps from Web Mercator_](http://blog.carto.com/free-your-maps-web-mercator/) blogpost, and the [_Using SQL to Project Your Map Using Albers Projection_]({{ site.baseurl }}/tutorials/albers/) tutorial.

_**Note:** A future release of the CARTO Builder will include map projections as an ANALYSES option._

## CartoCSS Syntax

CartoCSS is the syntax language that enables you to customize the style of your map data. You can apply CartoCSS code from the STYLE options of a selected map layer in the CARTO Builder.

{% include carto-builder/select_map_steps.md %}

3. Select a map layer

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/select_layer_from_builder.jpg" alt="Select layer from Builder" /></span>

	The selected layer options appear (DATA, ANALYSES, STYLE, POP-UP, LEGEND).

4. From the STYLE section, click the slider button from _VALUES_ to _CARTOCSS_

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/style_value_cartocss_slider_button.jpg" alt="Switch from VALUES to CartoCSS" /></span>

	The STYLE options are displayed as CartoCSS syntax.

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/style_cartocss_view.jpg" alt="Viewing your styles with CartoCSS syntax" /></span>

5. Enter CartoCSS properties for styling your map

    See [CartoCSS Properties]({{ site.baseurl }}/carto-engine/cartocss/properties/) for a description of the available CartoCSS properties and values.

    **Tip:** When an [aggregation style](/docs/carto-builder/styling-map-layers/#aggstyle) is selected in the STYLE options for a map layer, an additional property appears in your CartoCSS code. This is useful as you can customize the entire aggregation style, using one syntax. 

5. Click *APPLY*

    You are notified if there are any [errors]({{ site.baseurl }}/carto-engine/cartocss/errors/#cartocss-errors) in the CartoCSS code. You can also click the *undo* and *redo* arrow buttons after entering code changes in the Builder.

    <span class="wrap-border"><img src="/academy/img/guides/applying_code/cartocss_undo_redo.jpg" alt="Undo Redo CartoCSS Builder buttons" /></span>

	The Builder refreshes, displaying the CartoCSS styling changes that you applied.

	**Tip:** While you can apply CartoCSS styles to different layers on a map, it is highly recommended that you view the suggested [best practices](https://carto.com/docs/carto-engine/cartocss/best-practices/) for applying CartoCSS syntax more effectively.

6. If your map is published, update it to show your style changes

	For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

## HTML Code

You can view and apply custom HTML code for POP-UP and LEGEND options for a selected map layer.

### POP-UP HTML Code

POP-UPs provide additional interactivity for a published map. A pop-up information window appears when a viewer clicks, or hovers their mouse over, select data on your map. You can create and define custom POP-UP styling with HTML code directly in the Builder

{% include carto-builder/select_map_steps.md %}

3. Select a map layer

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/select_layer_from_builder.jpg" alt="Select layer from Builder" /></span>

	The selected layer options appear (DATA, ANALYSES, STYLE, POP-UP, LEGEND).

4. From the POP-UP section, click the slider button from _VALUES_ to _HTML_

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/popup_html_slider_button.jpg" alt="Switch from POP-UP VALUES to HTML" /></span>

	The POP-UP options are displayed as HTML code.

	<span class="wrap-border"><img src="/academy/img/guides/applying_code/popup_html_view.jpg" alt="Viewing the POP-UP HTML code" /></span>

5. You can edit the layout, write static content, and embed external resources directly in the HTML code

6. Click APPLY to apply your custom HTML code to the POP-UP

	**Tip:** The default CARTO POP-UP styles are predefined in the stylesheet code. Reference the [CSS library](https://github.com/CartoDB/cartodb.js/tree/develop/themes/css/infowindow) for the latest CARTO stylesheet code for POP-UPs. Optionally, you can include your own CSS as part of the stylesheet.

7. If your map is published, update it to show your POP-UP changes

	For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

### LEGEND HTML Code

LEGENDS display symbols and text that describe your map data for a published map. You can create custom legends with HTML code directly in the Builder. _This feature is a work in progress and will appear soon._

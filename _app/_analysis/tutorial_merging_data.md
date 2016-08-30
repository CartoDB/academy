---
title: 'Merging data from two datasets'
permalink: /courses/analysis/merging_datasets/
description: Merge aggregated data from two datasets into a new, third dataset.
time_needed: '20 minutes'
original_source: https://github.com/CartoDB/docs/blob/master/_app/_tutorials/merging_data.md
---

<iframe src="https://documentation.cartodb.com/viz/81d928bc-e9c9-11e2-b5ac-5404a6a683d5/embed_map" width=700 height=520></iframe>

# Merging data from two datasets

It is a common scenario when creating maps that you will want to combine data from two different datasets. A common case is aggregating points into polygons: counting how many events happen in a county, summation or average of a quantity, or max/min values.

If you are comfortable using SQL, you can apply a SQL queries to [join tables](https://carto.com/academy/courses/sql-postgis/joining-data/) or by [inserting](http://www.postgresql.org/docs/9.5/static/sql-insert.html) values into one table from another.

Alternatively, you can use the Builder Analysis _Intersect second layer_, which guides you through the process of merging data directly. This tutorial focuses on the CARTO Builder method for merging data, using the following workflow:

* Connect to two datasets from the CARTO public data library
* Aggregate data from selected interesting geometries. For example, count all the points in a polygon, sum an attribute of all the points in a polygon, and so on
* Merge aggregated data from the two datasets into a new, third dataset

## Getting the data

For this tutorial, we will use two datasets that are available from the CARTO public data library. For this tutorial, we'll use a .carto file to load it into your account, but the datasets are also available in the Data Library.

Grab the .carto file from this page: https://documentation.carto.com/viz/81d928bc-e9c9-11e2-b5ac-5404a6a683d5/public_map

If you haven't worked with .carto files before, read about them in [documentation](TODO: link/to/documentation).

## Merge by Column Join

This is the _Join column by second layer_ analysis

<!-- include text from here? carto-editor/column_join.md -->

To use the same data for the next section of this tutorial, _Merge by Spatial Join_, you can [delete]({{ site.baseurl }}/carto-editor/datasets/#delete-dataset) this merged dataset from your dashboard or merge data on top of this data.

### Merge by Spatial Join

<!-- include text from here? carto-editor/spatial_join.md -->

Congratulations, you successfully merged data in CARTO. Switch to the MAP VIEW to visualize your values. For example, use the [CARTO Sidebar]({{ site.baseurl }}/carto-editor/maps/#carto-sidebar) options to create a Choropleth map with the intersect_count column, and customize and style your map.

<span class="wrap-border"><img src="{{ site.baseurl }}/img/analysis/merging_data/img2.png" alt="cloropeth" /></span>

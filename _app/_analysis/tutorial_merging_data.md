---
layout: tutorials_item
title: 'Merging Data from Two Datasets'
description: Merge aggregated data from two datasets into a new, third dataset.
level: basic
time_needed: '20 minutes'
redirect_from: /tutorials/merging_data.html
embed_url: 'https://documentation.cartodb.com/viz/81d928bc-e9c9-11e2-b5ac-5404a6a683d5/embed_map?title=false&description=false&search=false&shareable=false&cartodb_logo=true&layer_selector=false&scrollwheel=false&sql=&zoom=2&center_lat=20.96143961409684&center_lon=-19.335937499999996&height=300&id=cartodb-1373506565633'
original_source: https://github.com/CartoDB/docs/blob/master/_app/_tutorials/merging_data.md
---

# Summary

It is a common scenario when creating maps that you will want to combine data from two different datasets. If you are comfortable using SQL, you can apply an SQL query for [merging](http://www.postgresql.org/docs/9.5/static/xoper-optimization.html) and [inserting](http://www.postgresql.org/docs/9.5/static/sql-insert.html) data. Alternatively, you can use the Builder Analysis step _Merge with dataset_ option, which guides you through the process of merging data directly through your datasets dashboard. This tutorial focuses on the CARTO Editor method for merging data, using the following workflow:

* Connect to two datasets from the CARTO public data library
* Aggregate data from selected interesting geometries. For example, count all the points in a polygon, sum an attribute of all the points in a polygon, an so on
* Merge aggregated data from the two datasets into a new, third dataset


## Preparing the Data

For this tutorial, we will use two datasets that are available from the CARTO public data library. {% include carto-editor/descrip_datalibrary.md %}

1. From your datasets dashboard, click _Data library_ to view a list of all the available datasets in the data library.

    <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/common/datalibrary.jpg" alt="Data Library data" /></span>

2. Connect to the world borders dataset

    - From the Search field, enter "world borders" and press _Enter_ from your keyboard

        <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/tutorials/merging_data/search_data_library.png" alt="Search data library" /></span>

        The closest matched datasets appear.

        <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/tutorials/merging_data/world_borders_search_results.png" alt="World borders search results" /></span>

    - Select the public dataset, `World borders` and click _Connect Dataset_

        <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/tutorials/merging_data/world_borders_connect_dataset.png" alt="World borders connect dataset" /></span>

    - Once the dataset is connected, it appears in the Data View and displays the sync options. For details, see [Syncing Datasets]({{ site.baseurl }}/carto-editor/datasets/#syncing-datasets).

    - Go back to your dashboard by clicking the return arrow (located before the name of your dataset).

      <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/tutorials/merging_data/world_borders_returnarrow.png" alt="Return to dashboard" /></span>

      The page refreshes and displays a list of your connected datasets from your dashboard. The first dataset, "world_borders" appears in the list.

3. Connect to the populated places dataset

    {% include carto-editor/connect_popplaces.md %}

  - Go back to your dashboard by clicking the return arrow (located before the name of your dataset).

    <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/tutorials/merging_data/pop_places_returnarrow.png" alt="Return to dashboard" /></span>

    The page refreshes and displays the second dataset, "populated_places" in your list of connected datasets.

Now you can merge data between the first and the second dataset.


## Merge Options

This portion of the tutorial describes how to access the _merge with dataset_ options from the CARTO Editor.

### Merge by Column Join

{% include carto-editor/column_join.md %}

To use the same data for the next section of this tutorial, _Merge by Spatial Join_, you can [delete]({{ site.baseurl }}/carto-editor/datasets/#delete-dataset) this merged dataset from your dashboard or merge data on top of this data.

### Merge by Spatial Join

{% include carto-editor/spatial_join.md %}

Congratulations, you successfully merged data in CARTO. Switch to the MAP VIEW to visualize your values. For example, use the [CARTO Sidebar]({{ site.baseurl }}/carto-editor/maps/#carto-sidebar) options to create a Choropleth map with the intersect_count column, and customize and style your map.

<span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/tutorials/merging_data/img2.png" alt="cloropeth" /></span>

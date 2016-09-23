---
title: "Exporting Selected Map Layers"
description: Describes how export a selected map layer for use offline, by your preferred file format.
permalink: /courses/guides/exporting-selected-map-layers/
redirect_from: https://carto.com/docs/carto-builder/managing-your-map/#export-map
---

# Exporting Select Map Layers

This guide describes how to export any of your map layers for use offline, regardless of whether or not an analysis was applied. For example, suppose you are a Business Analyst and you want to export an analyzed map layer into Excel for additional reporting. The _Export data_ option enables you to export the map layer as a _CSV_ file. You can also export a selected map layer using other image and geospatial formats, such as _SHP, KML, GEO JSON,_ and _SVG_.

### Export Data

This procedure describes how to export a selected map layer from an open map, in the Builder.

1. Select the map layer from the Builder

2. Select _Export data_ from the layer name context menu

    <span class="wrap-border"><img src="/academy/img/guides/export_data/export_analyzed_layer.jpg" alt="Export analyzed layer" /></span>

    The Export data options appear.

2. Select the preferred file format  

    <span class="wrap-border"><img src="/academy/img/guides/export_data/export_data_options.jpg" alt="Export data options" /></span>

    The data is downloaded based on your web browser process. Once your data is downloaded, you can retrieve the data file offline.

    <span class="wrap-border"><img src="/academy/img/guides/export_data/downloaded_file.jpg" alt="Example of a map layer file download" /></span>

**Tip:** If you are using the SQL API, you can use your table URL to run a response query and export downloads in different formats. For example, the following sample code shows the *CSV* export format for a SQL API request.

{% highlight bash %}
http://{USERNAME}.cartodb.com/api/v2/sql?format=csv&q=SELECT+*+FROM+tm_world_borders_sim
{% endhighlight %}

For more information about using the SQL API, see the [SQL and PostGIS in CARTO]({{ site.academy-baseurl }}/courses/04-sql-postgis.html) Map Academy course.
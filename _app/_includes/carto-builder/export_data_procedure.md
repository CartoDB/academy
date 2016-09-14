{% comment %}Writer Note_csobier: This include file is being used in the Builder docs:
- Map Layers for Rendering Data (06_map_layers.md)
- Analyzing your Data (09_analyze_your_data.md){% endcomment %}

1. Select the map layer from the Builder

2. Select _Export data_ from the layer name context menu

	<span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/common/export_analyzed_layer.jpg" alt="Export analyzed layer" /></span>

	The Export data options appear.

2. Select the preferred file format  

	<span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/common/export_data_options.jpg" alt="Export data options" /></span>

    The data is downloaded based on your web browser process. Once your data is downloaded, you can retrieve the data file offline.

    <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/common/downloaded_file.jpg" alt="Example of a map layer file download" /></span>

**Tip:** If you are using the SQL API, you can use your table URL to run a response query and export downloads in different formats. For example, the following sample code shows the *CSV* export format for a SQL API request.

{% highlight bash %}
http://{USERNAME}.cartodb.com/api/v2/sql?format=csv&q=SELECT+*+FROM+tm_world_borders_sim
{% endhighlight %}

For more information about using the SQL API, see the [SQL and PostGIS in CARTO]({{ site.academy-baseurl }}/courses/04-sql-postgis.html) Map Academy course.
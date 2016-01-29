---
title: "Intermediate Map Design — Which kind of map should I make?"
redirect_from: /courses/06-intermediate-design/lesson-1.html
permalink: /courses/intermediate-design/which-kind-of-map-should-i-make/
tweet_text: "Step by step is the way to go. I've finished the second map academy design course. Check it out!"
---
# Which kind of map should I make?

Congratulations if you completed our [first design course](/courses/design-for-beginners/)! Otherwise, congrats for finding your way to our second course in map-based data visualization! 

Our first design course taught the basics of designing web maps using filtered data, colors, and labels. You saw [an example](/courses/beginners-course/colors-truth-insights/#why-to-think-about-colors) of how design choices can [completely obscure](/courses/beginners-course/invisible-and-visible-data/#data-how-much-is-too-much) or [clearly communicate](/courses/beginners-course/invisible-and-visible-data/#all-together-now) the information in your dataset. We hope this course inspires you to make beautiful maps, like the one above designed by CartoDB users [Kudos Ltda.](https://gkudos.cartodb.com/maps)

Our Editor's [wizards](http://docs.cartodb.com/cartodb-editor/maps/#wizards) make it easy for you to filter and style your data. With so many types of data, though, which wizard and settings should you use? 

The answer to that question depends on what information you are trying highlight in your data.

Our [Analyzing your Dataset feature](http://docs.cartodb.com/cartodb-editor/datasets/#analyzing-your-dataset) can help you decide. It analyzes your uploaded datasets and makes suggestions of columns to visualize, then gives you a variety of sample maps to choose from. But how should you choose between them, and what if you want to make changes or create a map yourself?

![one-click](/img/course6/lesson1/oneclick.png)

This lesson will help you pick a wizard by outlining when to use each of the diffent map types. We use some ideas found in the book _[Thematic Cartography and Geovisualization](https://books.google.com/books/about/Thematic_Cartography_and_Geovisualizatio.html?id=P_URAQAAIAAJ)_. Check it out for more information.


## A good starting point

There's no exact formula for building a map, but asking yourself these questions can help narrow down design options. Keep the answers in mind as you're learning about each wizard. 

**Do you want your audience to pick out specific or general information from your map?**

For example, do you want the viewers to focus specifically on the magnitudes of San Francisco's most recent earthquakes, or do you want them to compare regions and see that South America has more earthquakes relative to Africa? Does your audience have experience looking at the type of data you're visualizing? Or will they need a more detailed explanation because it's new to them?

**Is your data best represented by points, lines, or polygons?**

Think about whether you're mapping data that's continuous over an area (like county crime rates), or occurs in a discrete location (like crime incidents).
Also consider scale: for instance, if you're planning a small-scale map, will some polygons be too small to see? Read [this page](http://www.gislounge.com/understanding-scale/) for more about scale.

**How is your data measured?**

Is it important for your data to be ranked (quantitative) or categorized without an order (qualitative)? Find out more about how your data can be measured on [the GIS Wiki](http://wiki.gis.com/wiki/index.php/Scale_of_measurement).

**Does your data need to be normalized?**

Do you want to show your data using a total count or a rate? For example, showing which state has the largest number of people is different than showing which state has the highest number of people per square mile. Using raw number totals when comparing polygons of varying size can be misleading. Read [this explanation of normalization](https://books.google.com/books?id=FrUQHIzXK6EC&pg=PT347&lpg=PT347&dq=choropleth+normalization&source=bl&ots=muDZhsb2jT&sig=DbomJnKedQjaKvcQgm_sVqHBt-8&hl=en&sa=X&ved=0CCYQ6AEwAjgKahUKEwje0ee8qaTHAhUCZj4KHRF5CjM#v=onepage&q=choropleth%20normalization&f=false) for more.

**How many attributes should you map?**

There is no one accepted answer for this, but users should be able to see a clear hierarchy between your map's visual elements. This topic was discussed in the [third lesson](/courses/beginners-course/invisible-and-visible-data/#data-how-much-is-too-much) of the beginner design course.

**Do you want to map changes in your data over time?**

Animated maps are possible with CartoDB's [Torque](http://docs.cartodb.com/cartodb-editor.html#map-wizards). With Torque you have the ability to show changes of geographical data over time with data aggregated as you specify.


## Simple Wizard

When you connect a dataset to your CartoDB account, you'll see it's Map View is automatically styled according to our simple wizard. 

![line_layer](/img/course6/lesson1/line_layer.png)

You may notice a pop-up in the lower left that has suggestions for other types of maps. This is the [Analyzing your Dataset feature.](http://docs.cartodb.com/cartodb-editor/datasets/#analyzing-your-dataset) The algorithm that runs behind that pop-up uses many of the same rules-of-thumb we are listing in this lesson.

![one_click_popup](/img/course6/lesson1/popup.png)

In the simple wizard you can change color and other properties of your markers, lines, or polygons. The wizard writes CartoCSS code for you, which is visible if you click on the CSS menu button:

{% highlight scss %}
#your_dataset_name{
  marker-fill-opacity: 0.9;
  marker-line-color: #FFF;
  marker-line-width: 1;
  marker-line-opacity: 1;
  marker-placement: point;
  marker-type: ellipse;
  marker-width: 10;
  marker-fill: #FF6600;
  marker-allow-overlap: true;
}
{% endhighlight %}

Notice that the changes apply universally across a dataset. In this earthquake map below, how can you tell which ones were strongest?

![earthquake_map](/img/course6/lesson1/earthquakes_2.png)

You can't since there are no differences in marker size or color to indicate magnitude. In general, the Simple wizard option works well for visualizations that show location only. But if you also want to show other attributes from the data table, other wizards are a better choice. 

If you find that your location points are too close together to be readable, consider using a cluster or density map instead. Within the Simple wizard, you also have the ability to do color and alpha composite operations, but those will be covered in a later lesson on color.


## Category Wizard

Use the Category wizard when you want to show location and one other qualitative attribute (i.e., categories). In the map below we can identify each of Australia's states because of color differences between the polygons. 

![Australia Categorized by State](/img/course6/lesson1/australia_cat.png)

We can't see any quantitative data though, like which state had the highest number of earthquakes this year, or which is most densely populated. If you want to show differences in your data by rank or scale, try other wizards like bubble or choropleth instead. If you want to add more category colors than the wizard automatically provides, you can do it with CartoCSS. Learn how in [this five-minute lesson](/courses/academy-lite/). The CartoCSS used here is:

{% highlight scss %}
#australia_adm1 {
   polygon-opacity: 0.9;
   line-color: #FFF;
   line-width: 0;
   line-opacity: 1;
}
#australia_adm1[subdivisio="Australian Capital Territory"] {
   polygon-fill: #e7298a;
}
#australia_adm1[subdivisio="New South Wales"] {
   polygon-fill: #e6ab02;
}
#australia_adm1[subdivisio="Northern Territory"] {
   polygon-fill: #66a61e;
}
#australia_adm1[subdivisio="Other Territories"] {
   polygon-fill: #33A02C;
}
#australia_adm1[subdivisio="Queensland"] {
   polygon-fill: #d95f02;
}
#australia_adm1[subdivisio="South Australia"] {
   polygon-fill: #1b9e77;
}
#australia_adm1[subdivisio="Tasmania"] {
   polygon-fill: #7570b3;
}
#australia_adm1[subdivisio="Victoria"] {
   polygon-fill: #666666;
}
#australia_adm1[subdivisio="Western Australia"] {
   polygon-fill: #a6761d;
}
{% endhighlight %}

A good rule-of-thumb for category maps is to keep the number of categories at or below ten. [This palette](http://colorbrewer2.org/?type=qualitative&scheme=Dark2&n=8) for Australia was taken from [Color Brewer](http://colorbrewer2.org/), a great tool for selecting color schemes specifically designed for maps.


## Cluster Wizard

Cluster maps are useful when you're plotting a large amount of point data. Take a look at this map of 2014 storms in the United States:

![Storms in the USA in 2014](/img/course6/lesson1/storms_usa_2014_2.png)

Did the Northeast have more storms than the Midwest? How many storms occurred around Washington, DC? Because of the large number of overlapping points, it's nearly impossible to tell. Our audience can't easily pick out general or specific information from this map.

The Cluster wizard solves this by reducing the number of points. It lays an invisible grid over our map, then creates one marker to symbolize all of the points that fall into each grid cell. Larger markers represent more points, and a marker's number shows how many points it has aggregated. 

You can choose the size of the grid cell by choosing how many buckets your data is divided into in the wizard's pulldown menu. A smaller bucket number means a larger aggregation area, so more points will potentially be included in each grid cell. The grid's pixel size stays the same on zoom. 

Zooming in means a smaller area of your map is included in each grid cell; zooming out means a larger area is included. Notice how points fall into different aggregation grid cells depending on zoom level below.

![cluster_zoom](/img/course6/lesson1/cluster_zoom_3.gif)


## Choropleth Wizard

A choropleth map depicts ranges of number data by color. The choropleth wizard orders your dataset according to a number column's values, then groups the data into buckets (á la histogram). Each bucket gets assigned a color according to the color ramp chosen.

### Quantification

How your data is grouped into buckets depends on how the bucket widths are chosen. Changing this via the Quantification pulldown can dramatically change your map. To decide which to use, it's helpful to look at how your dataset's number column is distributed in the Filters tab. Take a look at this example of the percent of employees working over 50 hours per week, by country:

![filter_1](/img/course6/lesson1/filter.png)

Most of the dataset's number column values are clustered towards the left end of the graph, but notice there is also an outlying value at the far right end. The objective of grouping data into buckets is to put similar values together. 

If we use the **Quantile method** here, it's going to put an equal number of values in each bucket. That means the far right outlying value of 43% is going to fall in the same bucket as the next value to it's left, 29%. Other buckets would have values that aren't as different: for example the first bucket would include values 1% and 5%. If our dataset's values were more evenly distributed on the graph, Quantile could be a good choice because it's easy to understand, and each bucket's data would be equally represented on the map. In this case though it's coloring countries with 43% people working over 50 hours per week exactly the same as countries where only 27% of people are. It's making very different areas on your map look similar.

The **[Heads/Tails method](https://en.wikipedia.org/wiki/Head/tail_Breaks)** is good to use when your dataset has many more low values that appear clustered towards the left edge of the graph (Tails) than high values (Heads). Without it, all of the low-end values would dominate the map. Heads/Tails creates buckets by recursively dividing the range of your data in half. The result is that the values to the left are in narrower buckets, and the values to the right are in increasingly wider buckets.

**Equal Interval classification** means the data values are bucketed according to ranges of equal width. For example 0 - 10, 10 - 20, 20 - 30. In our Work Life Balance map, take a look at the CartoCSS used to group the data, when the map is simplified to only show 3 buckets:

![equal_interval](/img/course6/lesson1/equal_int.png)

For this example we rounded the percent of employees working over 50 hours per week to whole numbers. This CartoCSS is splitting the percent of employees working over 50 hours per week into three groups. Notice the part between brackets. The lowest bucket includes values from 0 to about 14.3. The next bucket includes the next 14.3 values, so it ranges from 14.3 to about 28.6. The highest bucket includes the same 14.3 interval, so it continues the scale from 28.6 to 43.

An advantage of Equal Interval is that the ranges are easily understandable since they are the same size. A disadvantage is that it doesn't take into account how data's distributed across the graph. A lot of data values clustered together can fall in one bucket, while another bucket can contain no values. For example, if our dataset only had countries with less than 14% and more than 30% of employees working over 50 hours per week, the middle bucket would still be visible in the legend even though it contained no values.

**Jenks classification** finds natural breaks in your data. That is, it minimizes the variance within a bucket and maximizes the variance between different buckets. A disadvantage of this method is that the breaks can be hard to understand. An advantage is that outliers get their own categories, so they aren't grouped with dissimilar values. For instance, in the filter example above the value at the graph's right edge would be in it's own group, instead of being bucketed with the "nearest" value to its left.

### Color

Each bucket is assigned a color according to a scheme. Sequential color schemes show rank by changing the lightness and/or saturation or hue of a color. They are good to use when you want to represent one range of low to high values, like in our Work Life Balance map:

![sequential_color](/img/course6/lesson1/seq_color.png)

Generally light colors are understood to mean lower values, and darker, more highly saturated colors represent the highest values. We give you the option to reverse that scale if have other design needs.

If your dataset has a midpoint and you want to emphasize values above or below that point, you should use a diverging color scheme. The map below is colored according to a number column showing the per capita growth rate for each country, compared to the previous year. If the country has a negative value in that column, meaning it's growth decreased, then it's polygon is colored blue. If a country's growth increased it's colored red, and if there was no change in the growth rate from the previous year, it's colored neutral beige. How much of an increase or decrease is indicated by how saturated the reds or blues are.

![divergent_color](/img/course6/lesson1/divergent.png)

When you're making a choropleth map, be aware of these issues:

### Normalization

Choropleths show your audience how much of an attribute each polygon or point's color represents. Which subway stop has more crime? It's a tricky question: technically Station A has twice as many muggings as Station B, but if what you're really trying to show is how safe Station A is compared to Station B then the map below is misleading.

![non_normalized](/img/course6/lesson1/crime_incidents.png)

This map uses raw numbers, so it's showing magnitude rather than concentration. Station A does have more crime incidents than Station B, but many more people travel through Station A than Station B. We can use extremely simplified round numbers to test it: 1000 people travel through Station A, and for the same time period 100 people travel through station B. If 10 crimes occurred during that time in Station A, and 5 crimes occurred in Station B, your chances of getting mugged are greater in Station B. To show our audience which station is safer, we should factor out the difference in the amount of people that travel through by using a rate. Instead of the number of crimes, this map is based on how many crimes occur per person traveling through:

![normalized](/img/course6/lesson1/crime_rate.png)

Rates should also be used for polygon choropleths. For example, Russia has millions more people than Japan, but if you divide each country's population by it's land area in square kilometers, you find that even though Japan is geographically smaller it has a higher number of people per square kilometer. Larger polygons tend to visually dominate a map, so it's important to factor out the difference in polygon sizes by using a rate.

Standardizing your data like this so it can be compared on equal terms is called normalization. Read more about it [here](https://books.google.com/books?id=FrUQHIzXK6EC&pg=PT347&lpg=PT347&dq=choropleth+normalization&source=bl&ots=muDZhsb2jT&sig=DbomJnKedQjaKvcQgm_sVqHBt-8&hl=en&sa=X&ved=0CCYQ6AEwAjgKahUKEwje0ee8qaTHAhUCZj4KHRF5CjM#v=onepage&q=choropleth%20normalization&f=false). If you want to visualize raw counts, the bubble wizard does a better job of representing your data.

### Arbitrary borders

Polygon choropleths depict exact borders even when in reality what you're mapping doesn't end so abruptly. For example, tax rates do change abruptly at state lines, but flu rates don't. Also, enumeration units like counties or census blocks are arbitrary boundaries. When choosing which enumeration units to use, keep in mind that the same data for the same location can have dramatically different values depending on which boundaries you [pick](https://www.e-education.psu.edu/geog486/node/1864). If your data doesn't depend on enumeration unit borders, you might want to use an intensity, density or heatmap instead.

### Uniform density

Polygon choropleths make the distribution of data look uniform, when in fact it could be more or less concentrated in different areas of your polygon. For instance, 90% of a county's population could be living in it's main city, but you wouldn't be able to tell that from a county polygon that's been assigned one population density rate. Even areas without residents, like lakes or parks, are represented as having the same population density value as the main city. Consider using a density map instead if you need to show a more granular distribution of your data.


## Bubble Wizard

Like choropleth maps, bubble maps let your audience compare places by how much of an attribute they have. The Bubble wizard creates proportionately-sized symbol map based on a numbers column in your dataset. Locations with higher numbers have larger circle markers. Switch over to the CartoCSS editor, and notice how the conditional statements are similar to the choropleth wizard's. The bubble wizard changes marker-width instead of polygon-fill though.

These circles can represent areas or exact locations, so this wizard is flexible enough to use whether your dataset includes points or polygons. You can also choose a Quantification method, see more about that above.

An advantage of bubble maps have is that they can represent either raw or normalized numbers. Also, showing magnitude by circle size instead of polygon color means that your information will be communicated clearly even for easily-overlooked small polygons and for people with color blindness. In the choropleth below, Russia is more noticeable than Japan because of it's much larger polygon size. Notice how that dominance disappears when we switch to a bubble map.

![bubble](/img/course6/lesson1/bubble.gif)

One disadvantage to keep in mind is that humans do not generally estimate symbol size very well. For example, is the big dot below 12 or 18 times larger than the small one? How do the areas compare?

![larger_dot](/img/course6/lesson1/larger.png)

Which center dot is larger?

![larger_center](/img/course6/lesson1/larger_center.png)

Both center dots are actually the same size.

People are able to judge shapes more accurately when there are fewer sizes to compare, but enough need to be included to express data differences. Our wizard uses five bubble sizes by default. You can make their range bigger or smaller, but keep in mind that a greater difference in size between bubbles means it's easier to recognize which size category a marker belongs. You can also enable infowindows to tell your audience exactly which value a bubble marker represents.


## Density Wizard

If your map is illegible because it has too many overlapping points, the Density wizard can help communicate it's data more clearly. Use it if you want to show relative location data, for example if more earthquakes occurred in Alaska than Japan. Compared to the first storm map in this lesson, it's much easier to see where the most storms were concentrated in the map below. If you want to visualize other attributes like where the strongest earthquakes occurred, then a choropleth, bubble or category map is a better choice. 

![density](/img/course6/lesson1/storm_density.png)

The Density wizard is an aggregator that works similarly to the cluster wizard: a grid is laid over your map, and one marker is created to represent all of the points that are located in each grid cell. In the Density wizard, these markers are the grid cells. They can be hexagons or rectangles, but their size does not change. Instead, their color does: the more points in a cell, the darker the color (or lighter the color, depending on which color ramp you choose). You can see this defined in the conditional CartoCSS with parameters like this:

{% highlight scss %}
[points_density <= 0.0000045641629054725] { polygon-fill: #BD0026;  }
{% endhighlight %}

The wizard calculates points_density values for you, based on how many buckets you choose.

Like cluster wizard maps, you can change the size of your aggregation grid by choosing how many buckets your data is binned into. The aggregation grid's pixel dimensions don't change on zoom. That means the map area included in each grid cell will change as you zoom in and out, which means a point could fall into a different aggregation cell. If it's important for your dataset's points to keep the same spatial relationship to each other no matter the zoom level, then consider using the Intensity wizard instead.

This “hexbin” or grid map has an advantage over polygon maps. Normally in choropleths, a large polygon's data looks more emphasized just because of size. In this density map, easily overlooked tiny polygons have their data represented equally to large polygons. 

There's a drawback to this format though. Map readers generally recognize a geographic area by it's shape and orientation to other areas. Since the grid format distorts shape and orientation, which geographic area a user's looking at is not as easily understandable. One solution for this is to choose a basemap that uses labels on top of your data layer.

![density_labels](/img/course6/lesson1/density_labels.gif)


## Intensity Wizard

The intensity wizard works with point data. It makes a clutter of points more legible by creating darker, more saturated color areas to show users where points overlap. It does this by using 

{% highlight scss %}
marker-comp-op: multiply;
{% endhighlight %}

inside the layer's CartoCSS. Composite operations are explained in more detail in Lesson 2 of this course!

Like the Density and Cluster wizards it's good for showing relative location data. For example an intensity map of crime incidents can show users if more crime occurred in Madrid than New York, although they wouldn't be able to see other attributes like the type of crime. In the simple wizard map below, it's hard to see where more storms occurred because it's hard to tell if you're looking at an individual point or closely overlapping ones. Switching to the intensity wizard makes it easier to see that more storms occurred just south of Omaha.

![intensity](/img/course6/lesson1/intensity.gif)

The Intensity wizard is a better choice than the Density and Cluster wizards if you need to show your dataset's exact locations, because it doesn't aggregate points. Zooming won't change how your points relate to each other since they're not being aggregated into one grid cell or another. 


## Torque, Torque Category, and Heatmap Wizards

Use the Torque wizards when you want to show how your point data changes over time. These wizards are only available when your dataset includes a date column. Like the cluster wizard, Torque is a spatial aggregator. That means instead of drawing one marker for each point in your dataset, Torque draws one marker representing a few points. Read more about how [spatial aggregation works in Torque](https://github.com/CartoDB/torque/wiki/How-spatial-aggregation-works). You can control the aggregation region size by changing the Resolution option in the Torque wizard. A smaller resolution means that the aggregation happens over a smaller region.

Torque also aggregates by time. It calculates the whole time period from the first to last date/time in your column, and splits that time up into buckets. The number of buckets is the same as the number of steps you choose in the Editor, where one bucket is one animation frame.

![torque](/img/course6/lesson1/torque.gif)

In the Torque wizard you have the option to make Torque cumulative. Users won't be able to pick out specific information from this like how many points appear exactly, but they will generally be able to see how much data appears in a region over time and compare areas. 

Like the category wizard, Torque category colors your points based on a qualitative attribute in your dataset. There's no cumulative option for Torque category. While it's possible to do this with CartoCSS, it's not recommended: the category rendered last in an animation looks like it represents the category that occurred there most over time, but that's not necessarily true. For example, one location can have blue markers for most of the animation, but if at it's last date a red category was dominant, a red marker replaces the blue ones. Users won't be able to tell that area was anything but red, even though blue was the most dominant category for most of the time. You can control this behavior better by changing the composite operation.

![Torque_cat](/img/course6/lesson1/torque_cat.gif)

Heatmaps can be cumulative; use them when you want to show intensity over time. A cumulative Torque map will show points filling a grid cell over time, but like in the map below it becomes hard to tell how density compares from area to area since the markers don't change color or size the more points are located there. 

![cumulative_torque](/img/course6/lesson1/torque_cu.gif)

Heatmaps show that in a better way by using a color gradient instead of a number of points. To get this effect we're using image filters to colorize a semi-transparent gradient image with CartoCSS like this:

{% highlight scss %}
#heatmap_dataset{
  image-filters: colorize-alpha(blue, cyan, lightgreen, yellow , orange, red);
  marker-file: url(http://s3.amazonaws.com/com.cartodb.assets.static/alphamarker.png);
  marker-fill-opacity: 0.4*[value];
  marker-width: 35;
}
{% endhighlight %}

Red indicates that your dataset's points are more densely clustered in that area. They are static by default, but can show how your data changes over time with the "Animated" toggle on. These maps show the same tweets as the map above: 

![heatmap](/img/course6/lesson1/heatmap.gif)

A criticism of rainbow color gradients is that there's no natural perceived order to their colors. In the top color ramp below, it's easier to see that the fifth swatch should come after the second swatch, because we're only slightly changing hue while ordering the colors according to brightness and saturation. Compare that to the variety of hues in a rainbow color scheme. The brightest color (yellow) falls near the middle of the ramp, and less-saturated colors like orange fall between more saturated colors like red and yellow. It takes slightly more time for your users to understand what the color values mean relative to each other in a rainbow color ramp. Generally though, when rainbow heatmaps are used the standard is that blue or purple means a low value and red means a high value.

![rainbow](/img/course6/lesson1/rainbow.png)

Another criticism is that it can be hard to see which color value a location has: is the spot below green or cyan? 

![green_or_cyan](/img/course6/lesson1/green_cyan.png)

Also, the way colors are rendered in an area can cause banding, which visually can look like a boundary that [doesn't really exist.](http://www.mathworks.com/tagteam/81137_92238v00_RainbowColorMap_57312.pdf) For more discussion about designing rainbow maps, check out [this webpage.](https://eagereyes.org/basics/rainbow-color-map)

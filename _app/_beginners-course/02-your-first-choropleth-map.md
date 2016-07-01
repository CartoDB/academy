---
title: "Online Mapping for Beginners — Your First Choropleth Map"
redirect_from: /courses/01-beginners-course/lesson-2.html
permalink: /courses/beginners-course/your-first-choropleth-map/
permalink_next: /courses/beginners-course/thematic-maps-with-point-data/
tweet_text: "Step by step is the way to go. I've finished the second lesson of the map academy. Check it out"
---
# Your First Choropleth Map

To make your first choropleth map, you will be using U.S. county population data. First, copy this link:

{% highlight text %}
https://academy.cartodb.com/d/counties.zip
{% endhighlight %}

If you skipped the Beginners' Course Lesson 1, and have not yet created a visualization or dataset, you will need to navigate to [your datasets dashboard](http://docs.cartodb.com/cartodb-editor/dashboard/#your-datasets-dashboard), and create a new dataset with the [_NEW DATASET_](http://docs.cartodb.com/cartodb-editor/datasets/#connect-dataset) button. 

In the Connect dataset dialog box, paste the link you copied above into the URL input field, click _SUBMIT_ to add the file. 

![Add data from a link]({{ site.baseurl }}/img/course1/lesson2/newtableURL.jpg)

Click _CONNECT DATASET_ to add the URL file. Your data opens in the DATA VIEW. Take a look through the data columns. Note that the `the_geom` column indicates "Polygon" values. This means that the geometry that CartoDB will map is in polygon format.


## Creating a Simple Visualization

In Lesson 1 we gave you a quick intro to creating a visualization. You'll review this here, and then move onto the creation of a more complex visualization.

Navigate to "Map view" to begin formatting your map. The first editable parameter is the basemap; like in Lesson 1, we just kept the default Basemap "Nokia day," but you may select whichever you like.

Next, from the CartoDB sidebar, click on "wizards," represented by the paintbrush icon. Here you can change the polygon fill and stroke.

![Edit polygon fill.]({{ site.baseurl }}/img/course1/lesson2/polygonfill.png)

The Wizards menu also allows you to select different kinds of visualizations, which we will begin to explore in this lesson.


## Adding Interactivity

Since we have interesting data that we would like map viewers to access, we are going to go over how to add interactivity. From the CartoDB sidebar, click on "infowindow," represented by a comment icon. Here you will create the pop-ups that will appear whenever a viewer clicks on a county.

Depending on which columns you have in your dataset, different label options will appear in "infowindow." Each column can have its own label or display, and you can choose which you'd like to show by clicking the toggle buttons to the right of the listed column names. You can also choose from our pre-set designs or create one of your own. For now, we'll toggle on a few fields, and select a design from the dropdown menu.

![Edit polygon stroke.]({{ site.baseurl }}/img/course1/lesson2/infowindow.png)


## Choropleth Mapping

If you would like to display your polygon data differently, a frequently-used and very useful type of map is the choropleth map, which takes numerical data in your dataset and formats your polygons based on this information.

To explore it, return to "wizards" from the CartoDB sidebar and select "Choropleth" from the available visualizaton wizards. 

![Edit polygon stroke.]({{ site.baseurl }}/img/course1/lesson2/choropleth.png)

CartoDB will now automatically choose a data column to display on the map. In our example you can see that it will select the `pop` column to display the populations of U.S. counties. CartoDB will also automatically add a legend that corresponds with what is displayed.

In the column selector you can change the data column that CartoDB maps onto the choropleth map, but remember that only columns with numerical data can be used in such a map. With this particular dataset, you can go ahead and change the column to show `pop_sqkm`, which maps population data per square kilometer. This information represents population density, unlike the `pop` column, which is just a raw number.

In the "choropleth" visualization you can also change the fill colors, county borders, and color opacity, just like you could in the "simple" visualization. Go ahead and play around with these!

As always, once you click "vizualize" in the upper right to publish your map, you can share it using the "share" button that will appear in this button's place. Remember that you can only share published visualizations, not the "Map View" of a dataset.

---
title: "Your First Choropleth Map"
redirect_from: /courses/01-beginners-course/lesson-2.html
permalink: /courses/beginners-course/your-first-choropleth-map/
permalink_next: /courses/beginners-course/thematic-maps-with-point-data/
tweet_text: "Step by step is the way to go. I've finished the second lesson of the map academy. Check it out"
---
# Your First Choropleth Map

To make your first choropleth map, you'll be using U.S. county population data. First, go ahead and copy this link:

{% highlight text %}
http://acdmy.org/d/counties.zip
{% endhighlight %}

Now you should make sure you're on your CartoDB dashboard.  

If you skipped Beginners' Course Lesson 1, and therefore haven't yet created a visualization or tables, you'll automatically be in the "as" section of your dashboard, as you'll see from the upper menu bar. Scroll to the bottom of the page and click on the green button "Create your first table." 

If you've already made a visualization or table and aren't already in the "tables" section of your dashboard, enter it through the upper menu bar, then click "New table" or the "+" icon to the right of your existing table(s). 

In the dialogue box that appears, just paste the link you copied above into the available field, and click "Create table."

![Add data from a link](/img/course1/lesson2/newtableURL.png)

Your data will open up in Data View. There, like we suggested in Beginners' Course Lesson 1, you can take a look through the data columns. Note that this time the `the_geom` column indicates "Polygon" values. This means that the geometry that CartoDB will map is in polygon format.


## Creating a Simple Visualization

In Lesson 1 we gave you a quick intro to creating a visualization. You'll review this here, and then move onto the creation of a more complex visualization.

Go ahead and navigate to "Map view" to begin formatting your map. The first editable parameter is the basemap; like in Lesson 1, we just kept the default Basemap "Nokia day," but you may select whichever you like.

Next, in the right-hand pull-out tray click on "wizards," represented by the paintbrush icon. Here you can change the polygon fill and stroke.

![Edit polygon fill.](/img/course1/lesson2/polygonfill.png)

The Wizards menu also allows you to select different kinds of visualizations, which we will begin to explore in this lesson.


## Adding Interactivity

Since we have interesting data that we would like map viewers to access, we are going to go over how to add interactivity. In the same right-hand pull-out tray where we have been visiting the visualization wizard, click on "infowindow," represented by a comment icon. Here you'll create the pop-ups that will appear whenever a viewer clicks on a county.

Depending on which columns you have in your table, different label options will appear in "infowindow." Each column can have its own label or display, and you can choose which you'd like to show by clicking the toggle buttons to the right of the listed column names. You can also choose from our pre-set designs or create one of your own. For now, we'll toggle on a few fields, and select a design from the dropdown menu.

![Edit polygon stroke.](/img/course1/lesson2/infowindow.png)


## Choropleth Mapping

If you would like to display your polygon data differently, a frequently-used and very useful type of map is the choropleth map, which takes numerical data in your table and formats your polygons based on this information.

To explore it, return to "wizards" in the right-hand pull-out tray and select "Choropleth" from the available visualizaton wizards. 

![Edit polygon stroke.](/img/course1/lesson2/choropleth.png)

CartoDB will now automatically choose a table column to display on the map. In our example you can see that it will select the `pop` column to display the populations of U.S. counties. CartoDB will also automatically add a legend that corresponds with what is displayed.

In the column selector you can change the table column that CartoDB maps onto the choropleth map, but remember that only columns with numerical data can be used in such a map. With this particular table data you can go ahead and change the column to show `pop_sqkm`, which maps population data per square kilometer. This information represents population density, unlike the `pop` column, which is just a raw number.

In the "choropleth" visualization you can also change the fill colors, county borders, and color opacity, just like you could in the "simple" visualization. Go ahead and play around with these!

As always, once you click "vizualize" in the upper right to publish your map, you can share it using the "share" button that will appear in this button's place. Remember that you can only share published visualizations, not the "Map View" of a table.

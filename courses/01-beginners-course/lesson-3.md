---
id: 3
layout: lesson
title:  "Lesson 3"
subtitle: "Thematic Maps with Point Data"
course: "Beginners course"
course_slug: "01-beginners-course"
continue_link: "lesson-4"
tweet_text: "Step by step is the way to go. I've finished the third lesson of the map academy. Check it out"
vizjson: "http://documentation.cartodb.com/api/v2/viz/af43c3ea-bf46-11e3-8153-0edbca4b5057/viz.json"
---

## Thematic Maps with Point Data

<p><iframe src="//player.vimeo.com/video/81054975?byline=0" width="700" height="438" frameborder="0"> </iframe></p>

In this lesson you'll be exploring some other visualization records. To get started, copy the link below, which will allow you to create a map of tornados in the U.S.:

~~~
http://acdmy.org/d/tornadoes.zip
~~~

Navigate to your dashboard, click “New table” or the “+” icon to the right of your existing table(s), and past the URL in the field. Click "Create table" and you're ready to go.

### Know your Data

Let's take a minute to look at the data in the table; it's important to know what we have to visualize it optimally. 

If you want, you can examine the information by opening the CSV file from the link provided with Excel or another spreadsheet software. If you do, you'll see four columns: damage, date, latitude, and longitude.

In "Table" view on CartoDB, you have all of these columns in addition to a few created by us. One such column is called "the_geom," which we have mentioned in previous lessons. This time, "the_geom" contains the two columns in your CSV labeled "latitude" and "longitude" — CartoDB knows how to take these columns and turn them into points.

CartoDB will not, however, automatically convert the _types_ of data in each column. For example, you can see that `damage` is a number, and not a string type of data. (You know this because it has numerical data, not text.) You can also see that `date` was not imported as a date type of data, but as a string. 

It's easy — and important — for you to change the data types, because they affect what kinds of visualizations you can create. Click on the small downward-facing arrow next to "date" to pull down a menu, click on "Change data type..." and select "date." You'll be asked to "Confirm type change," and should click on "Yes, do it."  Below you can see that we're changing the "date" column from a "string" to a "date" data type.

![Changing data type]({{site.baseurl}}/img/course1/lesson3/datatype.png)

Now select the arrow next to the "damage" column and change its data type to "number."

### Making a Thematic Map

As you did in lessons 1 and 2, you'll start by creating a simple visualization. Navigate to "Map view," then select whichever basemap you like; in our example we've changed the map to "CartoDB Flat Blue." Go to the "Visualization wizard" by clicking on the paintbrush icon in the right-hand pull-out tray and note that you're by default on the "simple" visualization.  Now you're ready to play around with modifying the markers.

"Marker Fill" has three elements you can change.  The first represents the overall size of the marker.  The second is the fill color of the marker, and the third element allows you to modify the opacity of the fill color.

"Marker Stroke" also allows you to change three marker elements.  The first controls the thickness of each marker's border, the second their color, and the third the opacity of the markers' border color. 

To make changes to these marker features, just use the up and/or down arrows for smaller modifications, or click on the number values to make more sweeping changes with a slide control. 

To provide you with an example, here is a map where we changed our "Marker Fill" to 9, red, and 0.6, and set our "Marker Stroke" to 4.5, yellow, and 0.2.

### Bubble Map

While the "simple" visualization can be useful in some situations, CartoDB offers many different wizards. Let's start by looking at the Bubble visualization. 

![Bubble map]({{site.baseurl}}/img/course1/lesson3/bubble.png)

When you click on it, CartoDB selects the first column with the needed data type. In this case bubble maps require numerical data, and so CartoDB selects the `damage` column. The map then shows markers with different sizes based on the amount of damage caused by the tornado.

Now you'll change the parameters you are already familiar width (marker radius, fill, and stroke) to clean up the visualization. In our example above we just bumped down the bubble stroke from 1.5 to 1 on top of the "Nokia Day" basemap. You can play with this and the other parameters — like fill and stroke — until you get a visualization you are happy with.

### Intensity Map

Another CartoDB visualization is "intensity," which combines the points on your map to make colorful areas. Those with higher concentrations of points have a darker color than those with a lower concentration. The visualization is based purely on the number of points close to one another, and not on any of the columns in your data.

![Intensity map]({{site.baseurl}}/img/course1/lesson3/intensity.png)

There are fewer parameters to adjust in the "intensity" visualization than in others, but if you play with the sizes of the points you can fine-tune the visualization in a way that works with your dataset.

### Density Map

The final CartoDB visualization we'll take a look at is "density." This visualization creates a gridded system over your data, counts the number of points in each grid cell, and gives each cell a color based on the number of points inside the cell. 

![Density map]({{site.baseurl}}/img/course1/lesson3/density.png)

Unlike other visualizations, here you have the option to change the cell size and method (hexagons or rectangles). In our example, we found that the data is best displayed with smaller cells.

In "density" you can also change the number of buckets, which is the number of tranches that your data is split into. Finally, as with the other visualizations, you can change the stroke, fill and opacity to suit your needs.

###Adding Labels

Thought this dataset isn't ideal for adding labels, let's take a look at how you would do it when you do have a dataset that would benefit from labeling. 

First, select the "simple" visualization. Go to "Label Text" and from there, select the column that contains the text that will be the label. With our tornado dataset, we chose the "damage" column.

![Text labeling]({{site.baseurl}}/img/course1/lesson3/textlabel.png)

There are many parameters that affect how text is displayed — font, halo, offset, overlap, and placement. You can play with the font and halo to see the visual effects these have. The "label overlap" parameter changes whether the labels are allowed to overlap one another or not, and can be set to "true" or "false."

You can turn off the labels by changing "Label Text" to "None."

### Data Filtering

The final thing to start looking at is data filtering. To get started, click the bar graph icon on the right-hand pull-out tray. This will pull up a screen that allows you to select the column whose data you'd like to filter. Once you choose a column, a small graph will appear showing the distribution of the data. There are two sliders on either side that you can move to exclude/include areas of the dataset. The map visualization will change to reflect which range of data you have filtered out, and you can create visualizations with the filters applied.

![Filtering your data]({{site.baseurl}}/img/course1/lesson3/filtering.png)

By looking at the "damage" column of the tornado data you can see that there are many tornados causing only small damage and only a few very damaging tornados.

If you filter by the "date" column, you can see an interesting variance in when tornados occur with higher and lower frequency. The appearance of tornados over time could be an interesting thing to map — it's actually exactly what we will cover in Lesson 4!

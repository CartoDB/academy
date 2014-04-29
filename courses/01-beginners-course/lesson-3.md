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

In Lesson 3, we will be exploring some of the other visualization records. To get started, we will create a table using the data available on the link below, on tornados in the United States:

{% highlight javascript %}
http://acdmy.org/d/tornadoes.zip
{% endhighlight %}

To create the table, copy this link, navigate to your dashboard, click on the "+" button to the right of your exiting tables, and past the URL in the field. Click "create table" and you're ready to go.

### Know your Data

This time, let's take a minute to look at the data that we have in our table. It's important that we know what we have to that we can visualize it well and accurately.

If you want, you can open the CSV file from the link provided with Excel or another spreadsheet software to take a look. If you open it up, you'll see that we have four columns: damage, date, latitude and longitude.

In our Table View on CartoDB, we have all of those columns in addition to a few created by CartoDB. One that is created by CartoDB is a column called "the_geom", which we have mentioned before. This time, "the_geom" was filled by the two columns in our CSV labeled "latitude" and "longitude." CartoDB knows to take these columns and turn them in to points.

CartoDB will not, however, automatically convert the _types_ of data in each column. For example, we see that `damage` is a number, not a string type of data. (We know this because it has numerical data, not text.) We can also see that `date` was not imported as a date type of data.

It's easy - and important - for us to change the data types, because they affect what kinds of visualizations we can create. So right under the column name, we can pull down a dropdown allowing us to change the data type. Below you can see that we're changing the "date" column to a date data type.

![Changing data type]({{site.baseurl}}/img/course1/lesson3/datatype.png)

Now, convert to "number" type the "damage" column too.

### Making a Thematic Map

As we did in lessons 1 and 2, we are going to start by creating a Simple visualization. To do that, go ahead and navigate to the Map View. There, select the Simple type from the Visualization wizard in the right-hand pull-out tray. There you can change the basemap and modify the markers. In our demo, we went with CartoDB Flat Blue as our basemap. We also changed the markers to be smaller (2.5), made them white, and got rid of the marker stroke. As always, you can play with the parameters to create your own design.

### Bubble Map

While the Simple visualization can be useful in some situations, CartoDB offers many different wizards. Let's start by looking at the Bubble visualization.

![Changing data type]({{site.baseurl}}/img/course1/lesson3/bubble.png)

When you click on the Bubble visualization, CartoDB selects the first column with the needed data type. In this case, Bubble maps require numerical data, so that means that CartoDB selects the `damage` column. The map then shows markers with different sizes, where the size is based on the damage caused by the tornado.

We should change the parameters which you are now familiar width (marker radius, fill, and stroke) in order to clean up the visualization. In our demo, we changed the range of radius sizes, so that it was from 1 to 16. You can play with this and the other parameters like fill and stroke until you get a visualization you are happy with.

### Intensity Map

Another CartoDB visualization is the Intensity visualization. The intensity visualization combines the points on your map, and makes colors areas with a higher concentration of points more intensely than those with a lower concentration of points. This visualization is based purely on the number of points close to one another; it is not based on any of the columns in your data.

![Changing data type]({{site.baseurl}}/img/course1/lesson3/intensity.png)

There are fewer parameters to play with in this visualization, but if you play with the sizes of the points, you can fine-tune the visualization in a way that works with your dataset.

### Density Map

The final CartoDB visualization which we'll take a look at is the Density visualization. This visualization creates a gridded system over your data, counts the number of points in each grid cell, and gives the cell a color based on the number of points inside of the cell.

![Changing data type]({{site.baseurl}}/img/course1/lesson3/density.png)

Unlike other visualizations, here you have the option to change the cell size and method (hexagons or rectangles). In our demo, we find that the data is best displayed with smaller cells.

In the Density visualization you can also change the number of buckets, which is the number of tranches that your data is split in to. Finally, as with the other visualizations, you can change the stroke, fill and opacity to suit the needs of your visualization.

###Adding Labels

Thought his dataset isn't ideal for adding labels, let's take a look at how we would do it just in case you have a dataset that would benefit from labeling.

To add labels, you'll need to select the Simple visualization. From there, scroll down to "Label Text" and from there, select the column that contains the text that will be the label. With our tornado dataset, we chose the "damage" column.

![Changing data type]({{site.baseurl}}/img/course1/lesson3/textlabel.png)

There are many parameters that affect the way the text is displayed - font, halo, offset, overlap, and placement. You can play with the font and halo to see the visual effects these have. The "label overlap" parameter changes whether the labels are allowed to overlap one another or not, and can be set to "true" or "false."

You can turn off the labels by changing "Label Text" to "none."

### Data Filtering

One final thing to start looking at is data filtering. To get started, click the Chart icon on the right-hand pull-out tray. This will pull up a screen that allows you to select a column whose data you'd like to filter. Once you choose a column, a small graph will appear, showing the distribution of the data. There are two sliders on either side that you can move to include/exclude areas of the dataset. The map visualization will change to reflect which range of data you have filtered to show, and you can create visualizations with filters applied.

![Changing data type]({{site.baseurl}}/img/course1/lesson3/filtering.png)

In our tornado data, by looking at the "damage" column, we can see that there many tornados causing only a little damage and only a few very damaging tornados.

If we filter by the "date" column, we can see an interesting variance in when tornados occur with higher and lower frequency. This could be an interesting thing to map: the appearance of tornados over time. This is exactly what we will cover in Lesson 4!






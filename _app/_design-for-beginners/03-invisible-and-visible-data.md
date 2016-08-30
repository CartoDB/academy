---
title: "Introduction to Map Design — Invisible and Visible Data"
redirect_from: /courses/02-design-for-beginners/lesson-3.html
permalink: /courses/beginners-course/invisible-and-visible-data/
permalink_next: /courses/beginners-course/placing-your-labels/
tweet_text: "Step by step is the way to go. I've finished the first lesson of the map academy. Check it out"
---
# Invisible and Visible Data

In the last lesson, we talked about how you can use color as a tool to present your data, and to highlight your message. The second tool we're talking about in this course is how to control your data, in order to highlight the message you want to communicate. In well-designed maps and visualizations, you can pack in a lot of complex data and still leave your audience with a clear understanding of what you wish to communicate. However, a lot of data can sometimes become too much data. It can get overwhelming and distracting, perhaps ruining what you are trying to communicate. We can see some of this in our bad map. There's just _too much_.

![Bad map.]({{ site.baseurl }}/img/course2/lesson1/badmap.png)

An important tactic, then, is focusing on the message you wish to convey. Think about what data you need on your map, and which you can go without. Are there other ways you can play with the hierarchy of how data is displayed so that you can communicate a clearer message? Unfortunately, there is no definitive, simple rule for how much data you "need" or "should have." There are, however, some tools in CARTO that will allow you to work with the data you have, highlight important subsets of it, and create a clear communication. Let's get started looking at these tools!


## Zoom-Based Styling

The first tool we will look at is zoom-based styling. Zoom-based styling refers to the ability to change what is displayed on a map, or how it is visualized, based on the zoom-level. Let's start by looking at [Stamen's map tiles](http://maps.stamen.com), which we've mentioned before. As you zoom in and out, you can notice that some features or data (like streets, buildings, or waterways) appear or fade away. While there is a ton of data in the map, it is simplified when you're zoomed out, and made more complex at closer scales, when a viewer is able to process more data. The map never becomes overly complex, but also manages to provide a very data-rich view of a city.

![Zoom-based styling in a Stamen map.]({{ site.baseurl }}/img/course2/lesson3/stamen.gif)

Before we start making changes based on our zoom level, it's important to note that online maps using [Mapnik](http://mapnik.org/) to build the map visualization will default to having marker widths stay the same, regardless of the level of zoom. In order to style your maps based on zoom level in these online maps (including CARTO, OpenStreetMap and MapBox), we'll be using CartoCSS, which we started learning about in our last lesson.

Let's go back to the map you created in the last lesson and reset it to a simple default style. In the table_0_month layer's STYLE tab, click on the FILL color bar again, and click on the SOLID tab. Choose any color you want from the picker. Reset the BLENDING section to none.  

![Reset to simple style.]({{ site.baseurl }}/img/course2/lesson3/style_reset.png)

Now let's start working with zoom-based stying! Click the toggle at the bottom of the layer's style panel to switch to CartoCSS view. Edit the code you see there to reduce the marker size to 5 pixels. That way we can see more of our data points.

We're going to add some new styling so that at different zooms, the size of the marker gets bigger. Here, we want the markers to get bigger the more zoomed in we are. We want to tell CARTO that if the zoom is equal to a certain level, the marker-width should be larger than the original 3. We could also tell CARTO to change marker width at all zoom levels _larger than_ a specified level. Take a look at the last three lines of our code block here.

{% highlight scss %}
#layer {
  marker-line-width: .5;
  marker-line-color: #5b5b5b;
  marker-line-opacity: 1;
  marker-width: 5;
  marker-fill: #ffd400;
  marker-fill-opacity: 1;
  marker-allow-overlap: true;
  [zoom = 4] {marker-width: 8}
  [zoom = 5] {marker-width: 12}
  [zoom > 5] {marker-width: 16}
}
{% endhighlight %}

We can see that CARTO will read this as all markers should have a width value of 5. If the zoom equals 4, the marker width value should be 8. If the zoom equals 5, the marker width value should be 12. Finally, if the zoom is _larger than_ 5, the marker width value should be 16. This means that as we zoom in, the markers become bigger. Go ahead and play around with this to see what kinds of visualizations you can make based on zoom.

![Reset to simple style.]({{ site.baseurl }}/img/course2/lesson3/zoom_based_styles.gif)


## Filter, Filter, Filter

Another tactic that you can use to control how your data is displayed is filtering. By using filters, you can reduce what data is shown on your map. The CARTO Builder provides you with [Widgets](https://carto.com/docs/carto-builder/interactive-map-widgets/) that allow you to filter your data. We will demonstrate Widgets in detail in another lesson, but for now lets use a [Histogram Widget](https://carto.com/docs/carto-builder/interactive-map-widgets/#widget-types) to see how it's filtering helps our map.

Click on the table_0_month layer's DATA tab. As you scroll down the DATA panel, you will see histogram previews of each column's data. These measure the same data as a Histogram Widget made from the same column. However, these DATA panel graphics take into account values for all of your dataset. When you use a Histogram Widget, it is only based on the data shown within the preview map's bounds. The `mag` column histograms illustrate the distribution of earthquakes by severity.

Scroll down to the `mag` column, and click the checkbox that says *Add as a widget.* Notice that Builder added a Histogram Widget to the right side of your map. When Widgets are added using this method, Builder detects the type of information in the column and automatically chooses an appropriate Widget type. Because our `mag` column contains numbers, Builder automatically added the Histogram Widget. Now for example we can see how many earthquakes fall into the bucket of highest severity, or how earthquakes of mid-range severity occurred. 

![Add a Widget from DATA panel.]({{ site.baseurl }}/img/course2/lesson3/addwidget.png)

You can also change the number of buckets by exiting the layer, clicking on the WIDGETS tab, and clicking on the card representing the mag Widget there. Move the Buckets slider to change how many bins the earthquakes are divided into. We're going to leave the default number of buckets in the Histogram Widget settings. Zoom in and out on your map, taking note of how the histogram graphic changes as more or less points are shown within the preview map's bounds.

We can change the Widget's title too, to make it more easily understandable: in the Widget's settings panel, double-click on it's name and edit. You can also change this from the map's WIDGETS panel: click on the vertical ellipses of the Widget you want to change, then click Rename. When you type in the new name and hit Enter or Return on your keyboard, you'll see the name change in the Widget and also in the map's WIDGETS panel. We've renamed ours *Magnitude*.

Now let's use the Widget to filter: click on the graph in the Histogram Widget, then drag the sliders to restrict which portion of the data is visualized on your map. We can filter what data is shown to highlight only these more severe quakes, as you see in the screenshot below.

![Histogram Widget filtering.]({{ site.baseurl }}/img/course2/lesson3/histo-widget.png)


## Using Bubbles

We can also change the sizes of our markers based upon a column we're interested in. For example, if we want markers representing a very intense earthquake (a data point with a high `mag` value) to be bigger than those of less intense earthquakes, we can use a bubble visualization. This creates a size hierarchy based on an attribute of the data. Here, we're interested in the attribute of quake intensity (measured by the column `mag`).

To do this, just click on the FILL number in your layer's STYLE panel, then click BY VALUE and select mag. It's ok to click CLEAR first if you're toggling back from the CartoCSS view. You can play with the largest and smallest sizes to emphasize the variation in sizes. We went ahead and made our marker radius range go from 10 to 45.

You can also change the "Quantification Method" to affect the way that the data is displayed. The Quantification Method basically decides how the data should be cut up in to groups, or bins, and each one is different in how it displays your data. It is great to understand what each of these means in terms of interpreting your data, and you can read more [here](http://blog.cartographica.com/blog/2010/8/16/gis-data-classifications-in-cartographica.html) and [here](http://individual.utoronto.ca/lackner/ggr272/DataClassificationMethods.pdf).

We went with Quantiles, because the distribution of data we're filtering in is relatively even. This way each bucket's data will be equally represented on the map.

![Our Bubble Visualization]({{ site.baseurl }}/img/course2/lesson3/bubbleviz.png)


## All Together, Now!

These tools and tactics that we've covered - changing marker size based on zoom, filtering your data, and changing marker size based on a column of data - can also be combined with one another to highlight patterns. 

Notice that we just applied styles by value, but while a Histogram Widget filter was active. That meant the marker size ranges were being calculated only according to the data that was not filtered out. 

Try clicking CLEAR on your Histogram Widget, and watch how your bubble sizes change once more data is included!

Click and drag on the Histogram Widget again to re-apply your filter. Right now we have a simple visualization which highlights the more intense earthquakes by making their marker bigger. We can improve this visualization even more though. If we change the composite operation to multiply (which we started discussing in Lesson 2), we can also visualize the intensity of the quakes by region. Now, when there are multiple markers in the same area, they will darken. This highlights areas with high concentrations of quakes, as you can see below.

![Our Bubble Visualization]({{ site.baseurl }}/img/course2/lesson3/multiply.png)

When we have a filter applied, and are using a composite operation, we are not overwhelmed by feeling as if there is too much data. Play around with these interactions of size to see what you can come up with.

Ultimately, the goal in styling and filtering based on your data is to show a lot of information, but in such a way that viewers are not overwhelmed. These tools will get you started on doing exactly that!

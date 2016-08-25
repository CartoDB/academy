---
title: "Introduction to Map Design — Colors. Truth & Insights"
redirect_from: /courses/02-design-for-beginners/lesson-2.html
permalink: /courses/beginners-course/colors-truth-insights/
permalink_next: /courses/beginners-course/invisible-and-visible-data/
tweet_text: "Step by step is the way to go. I've finished the first lesson of the map academy. Check it out"
---
# Colors. Truth & Insights

Colors are important, and are challenging to master! Ugly maps, like the one we showed you at the end of the last lesson, are not hard to find. You can probably think of several maps you've seen that make you cringe. At the same time, you can likely think of many beautiful maps. One major component that makes a beautiful map beautiful is the color choices made for that map.

Learning how to pick good colors for your data and basemaps can be challenging, and applying color principles is sometimes hard to do. Selecting good colors for data visualization has it's roots in math and color theory. It can get complex quickly - we won't get in to it now - but it is also very interesting. If you are interested, you can check out a [few](http://www.gretchenpeterson.com/blog/create-color-schemes-in-maps-using-color-theory/) [different](http://datadrivenjournalism.net/resources/colour_theory_and_mapping) [articles](http://blog.visual.ly/subtleties-of-color/) to get started, and feel free to explore more on your own!

For now, we are going to get our feet wet by looking at color in practice.


## Why think about colors?

To get started, go ahead and import the following data set on earthquakes into your account. The easiest way is to _copy the URL_ and _paste_ it into the [field next to the Submit button](https://carto.com/docs/cartodb-editor/datasets/#connect-dataset), then click SUBMIT. If you don't know where to find this [our documentation will show you](https://carto.com/docs/carto-editor/datasets/#datasets).  

{% highlight text %}
https://carto.com/academy/d/1.0_month.csv
{% endhighlight %}

When we pull up the data, what we see is a distribution of dots (representing locations of earthquakes) that is hard to interpret. We know that there are many data points - many earthquakes - but it's hard to identify patterns of distribution and intensity.

![Map View after import.]({{ site.baseurl }}/img/course2/lesson2/dataimport.png)

If you reduce the size of your markers, and tinker around with the marker stroke, you can make the distribution a little bit more clear. However, it's still not a compelling view of the data, and doesn't communicate as much information as the data contains.

This is where color could help us out. Changing marker colors based on an attribute in the data, like earthquake intensity, would give us a richer visualization. This kind of map, where the design is intended to communicate a story about a certain theme in the data, like earthquake intensity, is called a thematic map.

Let's get started with our thematic map! 

![Animated gif of style by value.]({{ site.baseurl }}/img/course2/lesson2/style_by_value.gif)

From inside your dataset, click CREATE MAP. In your map's LAYERS panel, click on the earthquake layer's title to enter into the layer. Now click on the STYLE tab. Click on the color bar in the Fill section. In the color menu, choose the BY VALUE tab. 

Let's go ahead and select the `mag` column to visualize. First, make sure the column type for `mag` is type "number" in data view. You can access the data view by clicking the rectangles button at bottom of your map preview. This column contains data that reflects the intensity of the earthquake. Click the pin icon to switch back to map view. 

Back in the color menu's BY VALUE tab, search for `mag` & select it. If we look at the different color ramps available, we can find one that we think best highlights the most intense earthquakes. We're choosing a sequential ramp, so our colors progress from light to dark. Darker colors indicate earthquakes of higher magnitude. Notice that when we elect to use color in this way, the pattern of intense earthquakes becomes clearer to viewers of our map! Here is one example of how you could style your map:

![Example of a styled map.]({{ site.baseurl }}/img/course2/lesson2/styledmap.png)


## Basic Ideas and Tools

You may have started to wonder why the color ramps that CARTO Builder comes with were selected. In large part, it's because our cartographers and others have done the work and research necessary to identify the colors that work best displaying cartographic data. They've delved deeply into the mathematics of color theory we mentioned earlier, in order to develop tools and color sets that cartographers and data visualization specialists use. One great tool is [Color Brewer](http://colorbrewer2.org/). Using this color tool, you can experiment with different color ramps to see which could work best with your data type, underlying cartography, or even the vision type of your audience.

You are not bound to the color ramps that we pre-selected. You can choose a color ramp that suits your needs and customize your CARTO visualization with this new color ramp. In order to do so, you will need to copy the HEX values (six-character alphanumeric values beginning with "#" that tell the computer exactly which color you need) to use them in CARTO. Check out the screenshot below to see an example of HEX values generated by the Color Brewer tool.

![Hex values to copy.]({{ site.baseurl }}/img/course2/lesson2/hexvalue.jpg)

Once you have these values copied, you can use them to replace the existing color values using the Builder's CartoCSS panel in CARTO. We will explore CartoCSS in much more detail later on, but you can take a look now if you want to get a quick teaser for what is to come. Back in the map layer we just styled, notice a button at the bottom that toggles between VALUES and CARTOCSS. Toggle it to CARTOCSS. You will see a line that specifies our ramp's colors like this:

```
marker-fill: ramp([mag], (#fcde9c , #f58670 , #e34f6f , #d72d7c , #7c1d6f ), quantiles);
```

It's using [Turbo-Carto](https://github.com/CartoDB/turbo-carto) notation. Turbo-Carto is CARTO's custom CartoCSS pre-processor. You can learn more about that [here](https://carto.com/blog/turbo-carto/). To make a quick change to the color ramp though just replace the current marker-fill hex values with the ones you'd like to use instead!

![Hex values to copy.]({{ site.baseurl }}/img/course2/lesson2/customizecss.png)

There are many other resources you can use to help in picking colors. Mapbox has a [number of resources](https://www.mapbox.com/tilemill/docs/guides/tips-for-color/), and Visual.ly has a good [roundup of resources](https://blog.visual.ly/subtleties-of-color-references-and-resources-for-visualization-professionals/) as well.


## Composite Operations

In addition to editing the colors of your markers, you can also edit how the colors of overlapping or intersecting markers interact with one another. This function is called "Blending" in your map layer's STYLE panel.

While we won't dive into this now, take a look at the different options available. Each one offers a unique way of visualizing overlapping points, that could further shape the way that you want to display your data. Below is our earlier map but with the "multiply" operation selected. Notice how the areas with overlapping markers have become darker. You can read our [Composite Operations lesson](https://carto.com/academy/courses/intermediate-design/use-composite-operations/) in the [Intermediate Design course](https://carto.com/academy/courses/intermediate-design/) to learn more about the options available to you.

![Multiply composite operation.]({{ site.baseurl }}/img/course2/lesson2/multiply.png)

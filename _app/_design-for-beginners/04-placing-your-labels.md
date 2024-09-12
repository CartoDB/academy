---
title: "Introduction to Map Design — Thinking About Labels"
redirect_from: /courses/02-design-for-beginners/lesson-4.html
permalink: /courses/beginners-course/placing-your-labels/
tweet_text: "Step by step is the way to go. I've finished the first lesson of the map academy. Check it out"
---
# Thinking About Labels

While they’re not always necessary, labels can be an important part of many maps. Ensuring that they are legible, helpful, and well-designed can be a complex process. Spending some time learning about [typography](http://www.smashingmagazine.com/2010/05/06/50-helpful-typography-tools-and-resources/) in general will help you. We’ll start by talking about placement of labels. There are many other topics to consider, like font face and color, that we won’t get in to now. If you want to know more, you can start by exploring tools like [TypeBrewer](http://www.typebrewer.org/), or by joining some of the [conversations](http://www.cartotalk.com/index.php?showforum=15) the cartographic community is having about map typography.

If we take another look at Stamen's maps, we can see again the positive effects of careful design. They have small and large labels, a carefully made font choice, and considerate placement of labels off to the side, or even hidden.

![Stamen label placement.]({{ site.baseurl }}/img/course2/lesson4/labelsize.png)

If we look back at our ugly map, we can see that one of its biggest problems is where the labels are placed. There is no logic behind where they're placed, nor is there any filtering. They are just randomly placed, and add nothing to the viewer's understanding of the map.

![Bad map.]({{ site.baseurl }}/img/course2/lesson1/badmap.png)

Clearly, adding text to a map in the form of labels is a large consideration, so let's get started.


## Adding our Labels

Let's add labels to the simple version of our map from the last lesson:

![Starter map.]({{ site.baseurl }}/img/course2/lesson4/starter_map.png)

Make sure you are inside your map's table_0_month layer, in it's STYLE panel. Underneath the BLENDING option, you can see a checkbox option to add labels. Once you check the box, you are able to choose one of your layer's columns to base the label text on. In our case, we're interested in `mag`. 

![Adding labels.]({{ site.baseurl }}/img/course2/lesson4/addlabels.gif)

Once you select the `mag` column, you can see that the labels are pretty pointless, like the labels in our ugly map. There are too many of them, and they don't communicate anything to the viewer.

Let's fix this by fine-tuning our CartoCSS. We can go ahead and add rules to _when_ labels appear on the map. Let's say we only want to see the `mag` label for large earthquakes. Click the toggle at the bottom of the layer's STYLE panel to CARTOCSS. Notice that there's a code block specially for labels now: `#layer::labels`. Replace it with the code below, and see if you can decipher what this means:

{% highlight scss %}
#layer::labels {
  [mag>=5.5][zoom>6]{
    text-name: [mag];
    text-face-name: 'DejaVu Sans Book';
    text-size: 21;
    text-fill: #000;
    text-label-position-tolerance: 10;
    text-halo-radius: 1;
    text-halo-fill: #FFF;
    text-dy: -10;
    text-allow-overlap: true;
    text-placement: point;
    text-placement-type: simple;    
  }
}
{% endhighlight %}

In this code block we're telling CARTO to only display the labels when the `mag` is greater than or equal to 5.5, and zoom is larger than 6. That way, we only see the `mag` measurement for the largest earthquakes, and only when we're zoomed in enough for the label to make sense. Notice that we can chain together conditions (like zoom level, or `mag` value) by just including them side-by-side, without characters in between them.

![Adding labels.]({{ site.baseurl }}/img/course2/lesson4/zoomlabels.gif)

We can also describe multiple condition pairs in which we would want the labels to be displayed. For example, we want to see labels when the `mag` is at or above 6 and the zoom is above 6, OR when the `mag` is above 5 and the zoom is above 7. To do that, we just separate condition chains with commas. Our code, then, would look like this:

{% highlight scss %}
#layer::labels {
  [mag>=5.5][zoom>5],
  [mag>=5][zoom>6]{
    text-name: [mag];
    text-face-name: 'DejaVu Sans Book';
    text-size: 21;
    text-fill: #000;
    text-label-position-tolerance: 10;
    text-halo-radius: 1;
    text-halo-fill: #FFF;
    text-dy: -10;
    text-allow-overlap: true;
    text-placement: point;
    text-placement-type: simple;
  }
}
{% endhighlight %}

You can see that we have two pairs of conditions, which, if met, would mean that a label is displayed. In this case, more labels are displayed the more zoomed-in we get. This allows us to preserve readability when we're zoomed out, but include a great deal of data for when we're zoomed in. You can edit other attributes of labels using CartoCSS like this, so feel three to play around! Remember that you can't "break" your map by tinkering with the CSS, and can revert to the standard wizard whenever needed. You can also copy and paste old CartoCSS like we did earlier in this lesson, in order to preserve your work.

Armed with these tools, go forth and build beautifully designed maps!

---
id: 4
layout: lesson
title:  "Lesson 4"
subtitle: "Placing Your Labels"
course: "Design for Beginners"
course_slug: "02-design-for-beginners"
tweet_text: "Step by step is the way to go. I've finished the first lesson of the map academy. Check it out"
vizjson: "http://documentation.cartodb.com/api/v2/viz/e667d364-d5ff-11e3-a78a-0edbca4b5057/viz.json"
---

##Thinking About Labels

While they're not always necessary, labels can be an important part of many maps. Ensuring that they are legibile, helpful, and well-designed can be a complex process. We'll start by talking about placement of labels. There are many other topics to consider, like font face, and color, that we won't get in to now.

If we take another look at Stamen's maps, we can see again the positive effects of careful design. They have small and large labels, a carefully made font choice, and considerate placement of labels off to the side, or even hidden.

![Stamen label placement.]({{site.baseurl}}/img/course2/lesson4/labelsize.png)

If we look back at our ugly map, we can see that one of its biggest problems is where the labels are placed. There is no logic behind where they're placed, nor is there any filtering. They are just randomly placed, and add nothing to the viewer's understanding of the map.

![Bad map.]({{site.baseurl}}/img/course2/lesson1/badmap.png)

Clearly, adding text to a map in the form of labels is a large consideration, so let's get started. 

##Adding our Labels
Before we add our labels, let's copy the styling that we have done with our markers at the end of the last lesson. Just navigate to the CartoCSS panel, select all of the CartoCSS and use Ctrl+C to copy the text. 

Next, go ahead and use the Simple visualization wizard. Near the bottom, you can see the option to add label text based on a column. In our case, we're interested in mmio. Once you select the "mmio" column, you can see that the labels are pretty pointless, like the labels in our ugly map. There are too many of them, and they don't communicate anything to the viewer.

![Adding labels.]({{site.baseurl}}/img/course2/lesson4/addlabels.png)

Let's fix this by fine-tuning our CartoCSS. You'll notice that there's a section formatting the markers, and one formatting the labels. Let's go ahead and replace the section formatting the markers with our copied CartoCSS by deleting it and pasting in the CartoCSS from where we left off in Lesson 3. If you apply the style, you'll see that not much seems to change. The labels are just too obtrusive to allow us to see any of the underlying markers.

To fix this, let's go ahead and add rules to _when_ labels appear on the map. Let's say we only want to see the mmio label for large earthquakes. To do so, we would want to use some of the skills we learned in Lesson 3. We would go ahead and add conditions to the CartoCSS formatting that tell CartoDB to only sometimes display the labels. See if you can decipher the block of code below:

~~~css
#cartodb_query_::labels 
[mmio>=10][zoom>6]
{
  text-name: [mmio];
  text-face-name: 'DejaVu Sans Book';
  text-size: 21;
  text-label-position-tolerance: 10;
  text-fill: #000;
  text-halo-fill: rgba(255,255,255,0.8);
  text-halo-radius: 2	;
  text-dy: 0;
  text-allow-overlap: true;
  text-placement: point;
  text-placement-type: simple;
}
~~~

Here, we're telling CartoDB to only display the labels when the mmio is greater than 10, and zoom is larger than 6. That way, we only see the mmio measurement for the largest earthquakes, and only when we're zoomed in enough for the label to make sense. Notice that we can chain together conditions (like zoom level, or mmio value) by just including them side-by-side, without characters in between them.

We can also describe multiple condition pairs in which we would want the labels to be displayed. For example, we want to see labels when the mmio is above 10 and the zoom is above 6, OR when the mmio is above 8 and the zoom is above 7. To do that, we just separate condition chains with commas. Our code, then, would look like this:

~~~css
#cartodb_query_::labels 
[mmio>=10][zoom>6],
[mmio>=8][zoom>7],
[mmio>=6][zoom>8],
[mmio>=4][zoom>9]
{
  text-name: [mmio];
  text-face-name: 'DejaVu Sans Book';
  text-size: 21;
  text-label-position-tolerance: 10;
  text-fill: #000;
  text-halo-fill: rgba(255,255,255,0.8);
  text-halo-radius: 2	;
  text-dy: 0;
  text-allow-overlap: true;
  text-placement: point;
  text-placement-type: simple;
}
~~~

You can see that we have four pairs of conditions, which, if met, would mean that a label is displayed. In this case, more and more labels are displayed the more zoomed-in we get. This allows us to preserve readability when we're zoomed out, but include a great deal of data for when we're zoomed in. You can edit other attributes of labels using CartoCSS like this, so feel three to play around! Remember that you can't "break" your map by tinkering with the CSS, and can revert to the standard wizard whenever needed. You can also copy and paste old CartoCSS like we did earlier in this lesson, in order to preserve your work. 

Armed with these tools, go forth and build beautifully designed maps!

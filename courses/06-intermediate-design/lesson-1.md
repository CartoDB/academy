---
id: 1
layout: lesson
title:  "Lesson 1"
subtitle: "Which kind of map should I make?"
course: "Intermediate Map Design"
course_slug: "06-intermediate-design"
continue_link:
tweet_text: "Step by step is the way to go. I've finished the second map academy design course. Check it out!"
vizjson: "http://documentation.cartodb.com/api/v2/viz/e667d364-d5ff-11e3-a78a-0edbca4b5057/viz.json"
---

## Which kind of map should I make?

Congratulations, if you completed our last [course](http://academy.cartodb.com/courses/02-design-for-beginners.html) you've learned the basics of how to design digital maps using filtered data, color and labels! You saw an [example](http://academy.cartodb.com/courses/02-design-for-beginners/lesson-2.html#why-to-think-about-colors) of how design choices can [obscure](http://academy.cartodb.com/courses/02-design-for-beginners/lesson-3.html#data-how-much-is-too-much) or [clearly communicate](http://academy.cartodb.com/courses/02-design-for-beginners/lesson-3.html#all-together-now) your dataset’s information.

Our Editor’s [wizards](http://docs.cartodb.com/cartodb-editor.html#map-wizards) make it easy for you to filter and style your data, but which one should you use?
That depends on what you’re trying to make your data illustrate. This lesson will help you pick a wizard by outlining when to use each—and when not to.

### A good starting point

There’s no exact formula for building a map, but asking yourself these questions can help narrow down design options. Keep the answers in mind as you’re learning about each wizard.

1. Do you want your audience to pick out specific information from your map, or general?
For example, do you want them to focus specifically on the magnitudes of San Francisco's most recent earthquakes, or do you want them to generally compare regions and see that South America has more earthquakes relative to Africa? Is your audience the general public, or people who have experience looking at the data you’re visualizing?

2. Is your data best represented by points, lines or polygons?
Think about whether you're mapping data that’s continuous over an area (like state crime rates), or occurs in a discrete location (like crime incidents).
Also consider scale: for instance, if you’re planning a [small-scale map](http://www.gislounge.com/understanding-scale/), will some polygons be too small to see?

3. How is your data measured?
Is it important for your data to be ranked (quantitative) or categorized without a particular order (qualitative)? Check out [this resource](http://wiki.gis.com/wiki/index.php/Scale_of_measurement) for more details about how your data can be measured.

4. Does your data need to be normalized?
Do you want to show your data using raw numbers, or rates? For example, showing which state has the most people is different than showing which state has the most people per square mile. Using raw number totals when comparing polygons of varying size can be misleading, check out [this explanation of normalization](http://www.gsd.harvard.edu/gis/manual/normalize/).

5. How many attributes should you map? 
There is no one [answer for this](http://academy.cartodb.com/courses/02-design-for-beginners/lesson-3.html#data-how-much-is-too-much), but users should be able to see a clear hierarchy between your map’s visual elements.

6. Do you want to map changes in your data over time?
Animated maps are possible with CartoDB's [Torque wizards](http://docs.cartodb.com/cartodb-editor.html#map-wizards).


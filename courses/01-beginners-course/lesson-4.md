---
id: 4
layout: lesson
title:  "Lesson 4"
subtitle: "Animated Maps with Point Data"
course: "Beginners course"
course_slug: "01-beginners-course"
vizjson: "http://documentation.cartodb.com/api/v2/viz/af43c3ea-bf46-11e3-8153-0edbca4b5057/viz.json"
---

#Lesson 4: Animated Maps with Point Data

Lesson 4 will introduce you to Torque, which allows you to visualize data over time. This lesson follows straight from Lesson 3, so make sure you have a visualization with your tornado data to get started. We called our new visualization "Tornados over Time."

Remember that you don't have to overwrite any of the visualizations you made in Lesson 3. You can create a new visualization from the Table View of your tornado data. In CartoDB, you can create as many visualizations as you want from one table, and they'll all exist independently.


##Using Torque

Torque is a visualization that allows you to visualize geographic data over time. You can access it just like you would other Visualization Wizards, from the pull-out tray on the right of your screen, under the Visualization Wizard.

Once you select Torque, you'll notice that the column that CartoDB picked to visualize is the `cartodbid` column. This column is just an arbitrarily assigned ID number that CartoDB uses and assigns based on the order of the data in your spreadsheet. In terms of mapping, it's usually fairly meaning-less, so you will want to change it to which is pretty meaning-less. It's just the order that the data is in in the table. We should go ahead and select the column labeled `date` since that makes the most sense here.

As with the other visualizations, you can change the stroke and fill of the markers. In our demo, we brought the opacity down, and played with the color until we were happy with it. We also removed the marker stroke, but you can change things as you see fit.  

There are new parameters in the Torque visualization as well. Steps is the number of bins that the data is broken up in to when it's visualized. In future lessons, we'll talk about CartoCSS, which gives you more control over steps than the current presets included in the wizard.

You can also change the duration of the visualization, which changes the length of the entire animation from beginning to end.

Finally, you can change the trails setting for your visualization. These are the burst effects that happen after the point first appears, and leave a visual "trail" after the point disappears.

![Changing data type](/img/course1/lesson3/datatype.png)

###Cumulative Data
In the standard Torque visualization, data points disappear after they appear on the map. If you switch the "cumulative" toggle on, points will stay on the map, and build upon each other. Often, it's best to bring down the opacity of your markers when you're using the cumulative visualization so that the effect of points layering over one another is noticable.

Ultimately, it's up to you when to use the cumulative function, and when to allow your points to disappear. When you are highlighting accumulation or intensity over time, the cumulative function may be very helpful. Other times, it may not make sense with your data.

##Publishing Our Maps
Before you publish your map, you may want to add a description to your visualization. You can do this in the top left of your screen, underneath the title of your map. This is a good place to include details on what the data is, or where you found it.

Once you've included that, you can also include it in your shared visualization. To get there, as you know, you can click "Share" in the top right corner of your visualization. In this window you can also change other parameters about your shared map. You can show or hide your title, description, search box and legend (when you have one). You can also enable sharing, and change privacy options depending on your plan. Finally, you can set the zoom level and bounding box that will be the first display when visitors check out your map.

![Edit polygon stroke.](/img/course1/lesson2/sharewindow.png)


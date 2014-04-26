---
id: 2
layout: lesson
title:  "Lesson 2"
subtitle: "Your First Choropleth Map"
course: "Beginners course"
course_slug: "01-beginners-course"
vizjson: "http://documentation.cartodb.com/api/v2/viz/af43c3ea-bf46-11e3-8153-0edbca4b5057/viz.json"
---

#Lesson 2: Your First Choropleth Map

##Creating a Table
To make your first choropleth map, we will be using data on the populations of US counties. Go ahead and copy this link here: http://acdmy.org/d/counties.zip

Navigate to your CartoDB dashboard, and create a new table. If it's your first table, you can scroll down to the bottom of your dashboard and click on the green button reading "Create your First Table." Otherwise, click the "New table" button to the right of your existing tables. In the dialogue box that appears, just paste the link we provided above in the available field and click "Create table."

![Add data from a link](/img/course1/lesson2/newtableURL.png)

Your data will open up in Table View. There, like we discussed in Lesson 1, you can take a look at the data columns you have. Note that this time `the_geom` column has "Polygon" values. This means that the geometry that CartoDB will map is in polygon format.

Next, we'll review creating a simple visualization.

##Creating a Simple Visualization
In lesson 1, we gave you a quick intro to creating a visualization. We'll review this here, and then move on to create a more complex visualization. 

Go ahead and navigate to "Map View" to begin formatting your map. The first parameter which you can edit is the basemap. This time, we selected the CartoDB Dark basemap to highlight our data. Choose whichever you think works best for you.

Next, in the right-hand pull-out tray you can change the polygon color, stroke and opacity, and the polygon stroke and opacity from the Wizards section. 

![Edit polygon fill.](/img/course1/lesson2/polygonfill.png) 
![Edit polygon stroke.](/img/course1/lesson2/polygonstroke.png)

The Wizards menu also allows you to select different kinds of visualizations, which we will begin to explore in this lesson.

###Adding Interactivity
Since we have interesting data in our table, which we want viewers of our map to be able to access, we are going to go over how to add interactivity. In the same right-hand pull-out tray where we have been visiting the Wizard section, let's click on "infowindow." Here, we can create a pop-up that will appear when we click on a county.

Depending on what columns you have in your table, different label options will appear here. Each column can have its own label or display, and you can choose which ones you would like displayed. You can also choose from our pre-set designs or create your own. For now, we'll toggle just a few fields on, and select a design from the dropdown menu.

![Edit polygon stroke.](/img/course1/lesson2/infowindow.png)


##Choropleth Mapping

If you would like to display your polygon data differently, a frequently-used and very useful type of map is the choropleth map. This map takes numerical data in your table, and formats your polygons based upon it. 

To explore it, let's go ahead and select "Choropleth" from our Wizard menu in the right-hand pull-out tray.

![Edit polygon stroke.](/img/course1/lesson2/choropleth.png)

Once you choose this, CartoDB will automatically choose a number column to display. In our example, it will select the `pop` column. CartoDB will also automatically add a legend that corresponds with what is displayed. 

In the column selector, you can change with column of data CartoDB is mapping on to the choropleth map. Remember that only columns which have numerical data can be used in a choropleth map. With our data, we can go ahead and change the column to `pop_sqkm` to map data on population per square kilometer. This information represents population density, unlike the `pop` column which is just a raw number.

In a choropleth wizard, you can change the fill colors, the borders, opacity, just like you could in the Simple visualization. Go ahead and play around with these!

##More on Sharing
Once you're done, you can share a link to your visualization, embed it, and more with the sharing window. To access this, make sure that you're in a visualization, and click "Share" in the top-right of your screen. In the share window, you can also change settings of the public map, which will affect how people can see it. Depending on what plan you have, you can also change the privacy level.

![Edit polygon stroke.](/img/course1/lesson2/sharewindow.png)


---
id: 1
layout: lesson
title:  "Lesson 1"
subtitle: "Making your First Map"
course: "Beginners course"
course_slug: "01-beginners-course"
continue_link: "lesson-2"
tweet_text: "Step by step is the way to go. I've finished the first lesson of the map academy. Check it out"
vizjson: "http://documentation.cartodb.com/api/v2/viz/af43c3ea-bf46-11e3-8153-0edbca4b5057/viz.json"
---

#Lesson 1
## Making your First Map 

Welcome to CartoDB Academy! In this first lesson of Course 1, we will walk you through some steps to make your first map. This is intended to be a quick overview to get to familiar with some of the basics of CartoDB. In subsequent lessons, we'll dive in to some more specifics of mapping with CartoDB.

### Making an Account
Creating an account with CartoDB is quick and easy. You can head over to [our website](https://cartodb.com/), and create a free account in just a few minutes. 

![Create a free account!](/img/lesson1/createaccount.png)

If you're interested in a plan with more data storage or other features, check out a full [list of our plans](http://cartodb.com/pricing/). 

### Creating a Table
Once you have created a table, we'll go ahead and use a dataset in CartoDB's Common Data called "Populated Places." From your CartoDB Dashboard, click on "common data" in the top right. There, find Populated places, and click on the "+" to the right to Copy this dataset to your tables.

![Add Common Data](/img/lesson1/commondata.png)

Once the dataset copies, you will be taken straight to the Table View of your data. Here, you can see the full data in a table. You can take a minute to explore the data, and see what columns you have available to you, and what kinds of data the table contains. 

As you look at the data, take note of the column called `the_geom`. This column contains data needed to display the data on a map. Without values in this column - like the coordinates we have in this dataset - you won't be able to map your data.

![the_geom column](/img/lesson1/the_geom.png)

From here, we can go to Map View, which you can select to the right of Table View, to begin designing our visualization. 

![Table and Map View](/img/lesson1/table_map_view.png)

### Creating a Visualization

In Map View, you're looking at all the same data as in Table View, but now displayed on a map. Here, you can change the design of the map and data to suit your needs.

![Table and Map View](/img/lesson1/mapview.png)

First, we can take a look at the available Basemaps. CartoDB provides many for you to use, including Google Maps basemaps, and some of our own. You can also add your own basemaps, which we'll cover in later courses. 

![Selecting a basemap.](/img/lesson1/basemaps.png)

Once you've selected your basemap - in this case we went with CartoDB Light -  let's take a look at the Wizards in the toolbar on the right. Here, we chose "Category" to visualize the column `adm0cap`, which contains data on whether cities are capital cities or not.

We can also use our own markers. To do so, click on "IMG" next to the color selector in the Visualization Wizard. There, you can select from any of our pre-loaded icons, or upload one of your own. 

![Selecting markers.](/img/lesson1/selectimg.png)
![Selecting markers.](/img/lesson1/markeroptions.png)

At this point, we are still looking at our data in Map View from our Table. This isn't a shareable visualization just yet. To make it one, just click Visualize in the upper right-hand corner. Once you name and create the visualization, you can share it via the "Share" link in the top right of the Visualization screen. 


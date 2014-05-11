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

## Making your First Map

Welcome to CartoDB Academy! In this first lesson in Course 1, we'll walk you through the steps that will help you make your first map. It is intended to give you a quick overview and familiarize you with some of the basics of CartoDB. In subsequent lessons we'll dive into specifics. 

As you work through the Academy, you can follow along with the videos we have included, or take it at your own pace by following the written instructions. It's up to you how you want to learn!

<p><iframe src="//player.vimeo.com/video/81019067?byline=0" width="700" height="438" frameborder="0"></iframe></p>

### Making an Account
Creating an account with CartoDB is quick and easy; you can head over to [our website,](https://cartodb.com/) and create a free account in just a few minutes.

If you're interested in a plan with more data storage or other features, please check out a full [list of CartoDB plans](http://cartodb.com/pricing/).

### Creating a Table
Once you're logged in and on your dashboard, locate the upper menu bar and click on the link called "common data."  Here you'll find the table named "Populated places," and a "+" sign to its right. Click on either to copy the dataset to your tables.

![Add Common Data]({{site.baseurl}}/img/course1/lesson1/commondata.png)

After the file processes and inputs, you will be taken straight to the "Table" view of the data. Here you can see the full data in a table. Take a minute to explore it, see what columns you have available to you, and what kinds of data the table contains.

As you look at the table, take note of the second column from the left called "`the_geom`." It contains information required to display data on a map. Without values in this column — like the coordinates we have in this dataset — you won't be able to map your data.

![the_geom column]({{site.baseurl}}/img/course1/lesson1/the_geom.png)

To the right of "Table" at the top left of the chart, select "Map View" to begin designing your visualization.

![Table and Map View]({{site.baseurl}}/img/course1/lesson1/table_map_view.png)

### Starting with Your Visualization

In "Map view" you're still looking at all the same data as in "Table," but here it has been translated onto a map. You can change the map design and icons representing the data to suit your needs.

![Table and Map View]({{site.baseurl}}/img/course1/lesson1/mapview.png)

First, you can take a look at the available basemaps by clicking the basemap icon below "Map view". We have provided many for you to choose from, including Google Maps basemaps and some of our own. In later courses we'll cover how to add your own custom maps to this list.

![Selecting a basemap.]({{site.baseurl}}/img/course1/lesson1/basemaps.png)

Once you've selected your basemap — in this case we kept the default, "Nokia Day" — go to the toolbar on the right, and click on the paint brush icon to take a look at "Wizards." Here, select "Category" to visualize the table column "`adm0cap`," which contains data about which cities are capitals (represented by "1" in the map key at the bottom-right corner of the map) and which aren't (represented by "NULL").

![Selecting markers.]({{site.baseurl}}/img/course1/lesson1/selectimg.png)

You can also choose your own marker images. To do so, stay in the "Visualization wizard" and locate the "IMG" icons beside the "0" (again, non-capital cities) and "1" (capital cities). Click on either of these "IMG" icons to change the city markers to any one of those that have been pre-loaded, or upload one of your own.

![Selecting markers.]({{site.baseurl}}/img/course1/lesson1/markeroptions.png)

At this point, we are still looking at our data in "Map view" — it isn't a shareable visualization just yet. To make it one, just click "Visualize" in the upper right-hand corner of the page, name it, and click on "Create visualization." Now you're ready to share it via the "Share" link that appears in the top righthand corner of the page.

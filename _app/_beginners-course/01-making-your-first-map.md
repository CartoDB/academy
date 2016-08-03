---
title: "Online Mapping for Beginners — Making your First Map"
redirect_from: /courses/01-beginners-course/lesson-1.html
permalink: /courses/beginners-course/making-your-first-map/
permalink_next: /courses/beginners-course/your-first-choropleth-map/
tweet_text: "Step by step is the way to go. I've finished the first lesson of the map academy. Check it out"
---
# Making your First Map

Welcome to CARTO Academy! In this first lesson in Course 1, we'll walk you through the steps that will help you make your first map. It is intended to give you a quick overview and familiarize you with some of the basics of CARTO. In subsequent lessons we'll dive into specifics.


## Making an Account

Creating an account with CARTO is quick and easy; you can head over to [our website](https://carto.com/signup), and create a free account in just a few minutes.

If you're interested in a plan with more data storage or other features, please check out a full [list of CARTO plans]({{ site.cartodb-baseurl }}/pricing/).


## Creating a Dataset

Once you’re logged in and on your dashboard, click "New Map" in the upper right-hand corner. Next, click "Data Library." This is CARTO’s public library of open data that is a good starting place for many maps you will create. The dataset we will be using is called "Populated Places". Find it by searching for "populated" in the search box on the left. You may see multiple datasets here, but make sure to select the one with a little green book on the top right corner. Clicking on the dataset's name and then clicking "Create Map" will import it into your account.

![Add Common Data]({{ site.baseurl }}/img/course1/lesson1/commondata.gif)

After the file processes and inputs, you will be taken straight to the "Map View" of this dataset. Click on "Data View" to see the full data. Here you can see the full data in a table. Take a minute to explore it, see what columns you have available to you, and what kinds of data the table contains.

As you look at the dataset, take note of the second column from the left called `the_geom`. It contains information required to display data on a map. Without values in this column — like the coordinates we have in this dataset — you won't be able to map your data.

![the_geom column]({{ site.baseurl }}/img/course1/lesson1/the_geom.png)

To the right of "Data View" at the top left of the chart, select "Map View" to begin designing your visualization.

![Data and Map View]({{ site.baseurl }}/img/course1/lesson1/table_map_view.png)


## Starting with Your Visualization

In Map View you're still looking at all the same data as in Data View, but here it has been translated onto a map. You can change the map design and icons representing the data to suit your needs.

![Data and Map View]({{ site.baseurl }}/img/course1/lesson1/mapview.png)

First, you can take a look at the available basemaps by clicking the "Change basemap" button at the bottom left of your map. We have provided many for you to choose from, including our own Positron and Black Matter basemaps made for us with Open Street Map data by Stamen. In later courses, we'll cover how to add your own custom basemaps to this list.

![Selecting a basemap]({{ site.baseurl }}/img/course1/lesson1/basemaps.png)

Once you've selected your basemap — in this case we selected "Nokia Day" — go to the toolbar on the right, and click on the paintbrush icon to take a look at the Visualization Wizard. Once here, select "Category" to visualize the dataset column `adm0cap`, which contains data about which cities are capitals (represented by 1 in the legend at the bottom-right corner of the map) and which aren't (represented by 0).

![Selecting markers.]({{ site.baseurl }}/img/course1/lesson1/selectimg.png)

You can also choose your own marker images. To do so, stay in the "Visualization Wizard" and locate the "IMG" icons beside the "0" (again, non-capital cities) and "1" (capital cities). Click on either of these "IMG" icons to change the city markers to any one of those that have been preloaded, or upload one of your own.

![Selecting markers.]({{ site.baseurl }}/img/course1/lesson1/markeroptions.png)

Now you're ready to share it via the "Share" link that appears in the top right-hand corner of the page.

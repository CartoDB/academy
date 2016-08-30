---
title: "Online Mapping for Beginners — Multilayer Visualizations"
redirect_from: /courses/01-beginners-course/lesson-5.html
permalink: /courses/cartography/Multilayer-Visualizations/
tweet_text: "Step by step is the way to go. I've finished the fifth lesson of the map academy. Check it out"
---
# Multilayer Visualizations

## Importing a data file from Data Library

In this final lesson on exploring multilayer visualizations, we will be talking about creating a two-layer map. We'll be using two data sets from the data library within CARTO - the one on US County subdivisions (called 'cb_2013_cousub_500k') and the other on Tornados in the US (called 'tornado'). Please make sure to search within the data library section to access these in the Data View section of your dashboard.

![Data View]({{ site.baseurl }}/img/cartography/multiviz/data-view.png)

## Importing a Shapefile

If you have a shapefile of the data you want to use, you can also import that in a few simple steps in CARTO. CARTO requires that you create a .zip file containing the .SHP, .DBF, .SHX and .PRJ files, all prefixed with same name (while not required, this is a suggested best practice).
For example, in this case the shapefile `cb_2015_us_county_500k.zip` zip file contains `cb_2015_us_county_500k.shp`, `cb_2015_us_county_500k.dbf`, `cb_2015_us_county_500k.shx`, and `cb_2015_us_county_500k.prj`.

Once you have that ready, just click on the `New Map`, subsequently on the `Connect Dataset` and drag-drop your .zip file into the tab.

![Shapefile]({{ site.baseurl }}/img/cartography/multiviz/ml_13.gif)

For more details on importing shapefiles you can refer to out docs [here](https://carto.com/docs/carto-builder/managing-your-data/#connect-a-dataset)!

## Creating a Two-Layer Map

In order to create a multi-layer visualization, start by creating a visualization from one of the layers you'd like to include. We start with the US Counties dataset in this demo, but you could just as easily start with the Tornados dataset.

![First Layer]({{ site.baseurl }}/img/cartography/multiviz/first-layer.png)

Once you've created your visualization from one dataset, you can add another layer from the `ADD` tab in the `LAYERS` row on the main left tab. The `ADD` tab takes you back to the Data View dashboard and you can add the second layer from the Data Library by searching the relevant term. In our case, it was the tornado layer.


![Second Layer]({{ site.baseurl }}/img/cartography/multiviz/second-layer.png)


## Styling with Multiple Layers

Styling your map visualizations when you have multiple layers of data functions the same as if you had only one layer. Each layer can be styled independently of the others. It is important to remember, however, that the order of the layers reflects the order in which they rendered or displayed. So if you have one fully opaque layer over another one, you may be unable to see the data under the opaque layer. Also, if you have infowindows enabled for both layers, only the top layer’s infowindows will show in areas where the bottom layer is covered by the top layer.

![Styling]({{ site.baseurl }}/img/cartography/multiviz/ml_3.gif)

You can continue to play around with the visualization settings on both layers, and use the things you've learned in the previous lessons to create a good-looking visualization to share with the world! Multilayer visualizations are particularly helpful in designing maps with custom base-layers and analysis maps with juxtaposing layers. Checkout an example below!

 <iframe width='100%' height='520' frameborder='0' src='https://team.carto.com/u/mehak-carto/builder/25896f98-6df3-11e6-a21d-0ecd1babdde5/embed' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

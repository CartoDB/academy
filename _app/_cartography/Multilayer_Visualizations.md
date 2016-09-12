---
title: "Online Mapping for Beginners — Multilayer Visualizations"
redirect_from: /courses/01-beginners-course/lesson-5.html
permalink: /courses/cartography/Multilayer-Visualizations/
tweet_text: "Step by step is the way to go. I have finished the fifth lesson of The Map Academy."
---
# Multilayer Visualizations

In this final lesson {% comment %}writer note_csobier: link to course.{% endcomment %} on exploring multilayer visualizations, create a map with multiple layers.

{% comment %}writer note_csobier: This content used to tutorial, is that tutorial being deprecated in place of this lesson? Please advise.{% endcomment %}

The objective of this lesson is:

- Connect public datasets from the CARTO Data Library to your account
- Import an additional layer containing Shapefile data
- Create and style your map based on the hierarchal order of the two map layers

This lesson is intended for all CARTO Builder users.

## Importing a Data File from the Data Library

Import the following datasets to your account.

1. From _Your datasets_ dashboard, click _Data Library_

2. Search for the following two datasets

	- US County subdivisions 'cb_2013_cousub_500k'

	- Tornados in the US 'tornado'

3. Connect each dataset to your account

![Data View]({{ site.baseurl }}/img/cartography/multiviz/data-view.png)

{% comment %}writer note_csobier: All images must be 700px wide, and be .jpg's. Please follow all the Image Rules and markdown requirements stated here: [https://github.com/CartoDB/docs/wiki/Documentation-Style-Guide#doc-images](https://github.com/CartoDB/docs/wiki/Documentation-Style-Guide#doc-images){% endcomment %}

## Importing a Shapefile

If you have a shapefile of data that you want to include with your map, you can also import it into CARTO with the _Connect Dataset_ options. 

**Note:** CARTO recommends that you create a .zip file containing the .SHP, .DBF, .SHX and .PRJ files, all prefixed with same name (while not required, this is a suggested best practice).

For example, for this lesson, the shapefile `cb_2015_us_county_500k.zip` zip file contains `cb_2015_us_county_500k.shp`, `cb_2015_us_county_500k.dbf`, `cb_2015_us_county_500k.shx`, and `cb_2015_us_county_500k.prj`.

{% comment %}writer note_csobier: Are users supposed to download that from CARTO? Where are they getting the shapefile source file? Also need to determine if users are doing this from Your datasets or Your maps dashboard, as the procedure is slightly different.{% endcomment %}

1. From _Your datasets_ dashboard, click _NEW DATASET_

2. Drag and drop the shapefile zip file `cb_2015_us_county_500k.zip` into the Connect Dataset window

	The dataset opens in the Table View.

3. Click _CREATE MAP_ to create map from this datasett

![Shapefile]({{ site.baseurl }}/img/cartography/multiviz/ml_13.gif)

## Creating a Two-Layer Map

All of the required data for this lesson is connected to your account. Create a multi-layer visualization by adding two datasets to one map. This creates a map with multiple map layers.

{% comment %}writer note_csobier: Since this is a lesson, give them direction as to what layer to start with, even if it is flexible. I took a guess here.{% endcomment %}

1. From _Your datasets_ dashboard, open the US Counties dataset 'cb_2013_cousub_500k'

2. Click _NEW MAP_

	The map opens in the CARTO Builder and displays the Basemap and Layer(s) for the selected map.

3. Rename the map to "Multilayer"

	![First Layer]({{ site.baseurl }}/img/cartography/multiviz/first-layer.png)

4. Add the second layer

	- From the LAYERS section, click ADD

		The _Add a new layer_ options appear.

	- Select 'tornado'

	- Click _ADD LAYER_

	_Tornado_ appears as the second map layer.

	![Second Layer]({{ site.baseurl }}/img/cartography/multiviz/second-layer.png)

## Styling with Multiple Layers

When you have multiple layers, each map layer can be styled independently of the others. It is important to remember, however, that the order of the layers reflects the order in which they rendered or displayed. 

**Note:** When styling a map with multiple layers, the order of the layers reflects the order in which they are visualized. You may need to adjust the styling for each layer to accommodate conflicting features. For example, suppose you have one fully opaque layer over another one, you may be unable to view the data under the opaque layer. Additionally, if you have pop-ups enabled for both layers, only the top layer pop-up is displayed in areas where the bottom layer covered (by the top layer).

1. Select a map layer

2. Click _STYLE_ to apply unique styling options for the map layer

3. Click the back navigation arrow, next to the layer name at the top of the Builder, to navigate back to the LAYERS section

4. Select the next map layer and click _STYLE_

5. Click and drag to reorder your map layers in the Builder

	Explore changing styling options again and view how the visualization changes for both layers.

	![Styling]({{ site.baseurl }}/img/cartography/multiviz/ml_3.gif)

Multilayer visualizations are particularly useful when designing maps with custom base-layers and analysis maps with juxtaposing layers.

 <iframe width='100%' height='520' frameborder='0' src='https://team.carto.com/u/mehak-carto/builder/25896f98-6df3-11e6-a21d-0ecd1babdde5/embed' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

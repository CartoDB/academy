---
title: "Learn the Basic CARTO Builder Workflow"
permalink: /courses/lessons/learn-the-basic-carto-builder-workflow/
---

# Learn the Basic CARTO Builder Workflow

placeholder image

## Introduction

This tutorial provides a real-world example to help you learn the basic workflow of creating a map in the CARTO Builder. Specifically, you will learn how to identify areas where pedestrians and drivers are most at risk in the Bronx borough of New York City. We will make a multi-layer map that shows decision makers where to concentrate transportation planning resources based on the amount of accidents. You will see how to import motor vehicle accident data, then georeference it to make it appear on your map.

Analysis Options:

- Georeference
- Intersect second layer
- Enrich from Data Observatory (TBD)?

START TUTORIAL

------ Each subsequent section should be a new section in the tutorial ---

##  Learn Where to Concentrate Resources by Identifying At-Risk Areas

placeholder gif

### Real World Challenge

**Where are the most motor vehicle accidents in the Bronx?**

To know where to spend city budget money on planning projects and infrastructure improvements, it is helpful to visualize accident locations in order to identify patterns in where they occur.

### The Solution

**Import data, georeference it, and analyze it to identify actual accident locations**

Apply the basic CARTO Builder workflow to import data, georeference it, and analyze it further. Use the CARTO interface to import data without type or content guessing, then use Builder's analysis tools to georeference accident data. Aggregate those locations by postal code, to see where the most accidents occur.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## Import your Data

New York City provides open data about motor vehicle accidents that we can import. Uploading data to your CARTO account is the first step in any CARTO map workflow. 

![step1](https://cloud.githubusercontent.com/assets/1779444/19362277/21f9faf8-9154-11e6-9305-1a1ee8d2aa40.gif)

[Download .CARTO]

- https://team.carto.com/u/stephaniemongon/dataset/bronx_mv_collisions
- https://team.carto.com/u/stephaniemongon/dataset/zcta_bronx
- //original sources: // https://nycopendata.socrata.com/api/views/h9gi-nx95/rows.csv?accessType=DOWNLOAD // http://www2.census.gov/geo/tiger/GENZ2015/shp/cb_2015_us_zcta510_500k.zip

1. Download a .carto file for this tutorial

	This original resource for this dataset is from [NYC Open Data portal](https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95), but we have selected and cleaned a smaller subset of it for you to use in this tutorial. You can [download this .carto file].

2. Import the .carto file that has been saved locally on our computer

	**Note:** For this example, de-select the _Let CARTO automatically guess data types and content on import_ checkbox. This indicates that all of your columns will be imported as strings (text), even if they contain numbers, dates, or boolean values.

	This is useful when you want to import numbers that have leading zeroes, for example some postal codes. If type guessing is enabled, the postal code column would import as numbers and any leading zeroes would drop off. With the type/content guessing box un-checked, the postal codes will import as strings, and keep zeroes as first characters.

	**Tip:** An important part of any Builder workflow is to double-check that your data is in one of these supported formats before importing it to CARTO. 

	**Cheat Sheet** Quick Data Import

	**Cheat Sheet** to supported file formats.

	A new map with one layer is created, and is named after the dataset we just imported.

3. Rename the map to _Bronx Accidents_ by double-clicking on the title and editing its text

When data is imported with type and content guessing turned off (or if your data does not contain latitude and longitude columns), the map does not contain any geometries and appears empty. The next step in the Builder workflow is to get the data layer to appear using georeferencing.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## Georeference your Data

Georeferencing is the process CARTO uses to calculate geometries for your dataset. Georeferencing populates `the_geom` and `the_geom_webmercator` columns in your map layer, which are used to generate points, lines, or polygon geometries on your map.

CARTO accepts latitude and longitude, city names, country names, administrative regions, postal codes, IP addresses, and street addresses as georeferencing input. 
![step2](https://cloud.githubusercontent.com/assets/1779444/19362615/59d7d782-9155-11e6-85d1-a368532953f5.gif) 

1. View the map layer dataset

	- Click on the map layer and view the table view

	- Scroll through the columns in the dataset, you will see that this dataset contains latitude, longitude, zip code, and street names

		How do we know which georeference option to select? As part of this workflow, determine what kind of geometry you want in your final map, and what data you have available. In this case, we want to visualize points for each accident location. We also want to use postal code areas to aggregate these accidents.

2. Change the data type of the _latitude_ column to _number_

	**Cheat sheet** Change data type

3. Click the ANALYSES section for the map layer and add the _Georeference_ analysis

	The analysis parameters appear.

	- Keep the default map layer as the INPUT
	- Select the TYPE as _Lon/Lat_ columns
	- Apply your datasets latitude and longitude columns

	The result displays a lot of points on your map!

4. Add a widget to filter them by year, or zoom into a specific area to see them more clearly

5. Hide the _bronx_mv_collisions_ data

	Since we want to show decision-makers where to concentrate their budget, a choropleth map showing where accident rates are higher would be more beneficial. We can keep this points layer for reference, in case any of our viewers want to see exact location details, but for now hide the map layer.

6. Turn off the _bronx_mv_collisions_ layer on your map visualization

	To give your audience the ability to view or hide this map layer, turn off the _LAYER SELECTOR_ from the Map Options.

	**Cheat sheet** Map Options

**Tip:** One of the great features of CARTO Builder is that you can re-georeference any dataset without overwriting existing geometry. We know that we want our final map to show postal code polygons. Since we have a zip_code column in the _bronx_mv_collisions_ dataset, we could create a second map layer from it, and add another georeferencing analysis using Postal Code as the TYPE.

However, that is actually not a good choice for this use case since this dataset contains many rows of accidents that have the same zip_code number. Georeferencing calculates `the_geom` column value for every row in the dataset. That means we would have the exact same postal code polygon added to each accident row with a certain postal code number. The result would display a lot of overlapping polygons that add unnecessary size to our dataset, and take up data storage space in our account.

For best practices, it is more efficient to use this dataset with US Census Zip Code Tabulation areas. _Note that CARTO uses [ZCTA's](https://carto.com/docs/faqs/datasets-and-data/#why-does-carto-use-census-bureau-zctas-and-not-usps-zip-codes-for-postal-codes) instead of zip codes, even if you are georeferencing by Postal Codes._ We have already separated out Bronx ZCTA's for you in this dataset, but you can get the full dataset [here](http://www2.census.gov/geo/tiger/GENZ2015/shp/cb_2015_us_zcta510_500k.zip).

This gives us the opportunity to try out multi-layer maps in the next step.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## Create a Multi-Layer Map

The current map only displays one layer, _bronx_mv_collisions_. Add the _Bronx ZCTA's_ discussed in the previous step.

![step3](https://cloud.githubusercontent.com/assets/1779444/19362693/a6c74a6e-9155-11e6-9b47-3bd57525171b.gif)

1. Download the _Bronx ZCTA's_ from [this link] and import it as a second layer
	
	Notice that the new data layer is added on top of your first map layer, and labeled _B_. Its name also appears in the LAYER SELECTOR on the map view.

2. Rearrange the order of your map layers to change how the data is rendered

	Click and drag layer _B_ underneath layer _A_. 

Now we can see all of the data that we need, and can apply an analysis to visualize accident concentrations in the next step.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## Analyze your Data (**THIS STEP TBD**)

Apply the _Enrich from Data Observatory_ analysis to get commuters by car/truck/van for each ZCTA.

![step4](https://cloud.githubusercontent.com/assets/1779444/19363944/13f81bb4-915a-11e6-8425-56e0a0423a76.gif)

The map displays a layer of accident points, and a layer of postal code polygons, but how do we use them to analyze accident data? The next step in the Builder workflow is to choose an analysis method that is most  appropriate for what you want to illustrate. We want to figure out where the most motor vehicle accidents happen in the Bronx. Apply the _Intersect second layer_ analysis to get a count of how many accidents happen in each zip code.

1. Add the _Intersect second layer_ analysis for the polygon map layer (zcta_bronx)

	The analysis parameters appear.

	- Keep the default _zcta_bronx_ map layer as the source
	- Choose _A1_ georeference layer as the TARGET. This indicates that CARTO will use an intersection between the polygons and the points from the georeferencing analysis applied earlier
	- Select _COUNT_ as the OPERATION measure

		**Note:** These options provide different methods you can use to aggregate the points intersecting each polygon. _COUNT_ shows the total number of accidents for each postal code area. This is different than _SUM_, which adds together values inside a column you choose, instead of counting how many values exist.

	**Tip** This analysis is running PostgreSQL and PostGIS calculations behind the scenes. 

2. When the analysis has completed, view the table view of your map layer

	- View the `count_vals` calculated results

		When the analysis has completed, view the table view of your map layer. Notice that CARTO has automatically added a column as a result of the analysis `count_vals`. This column contains the total number of accidents for each postal code polygon.

		//We could use these to make a choropleth map, but best practices say we should normalize our choropleth to get a more accurate representation of accident rates. The best metric to normalize by is up to you, depending on what you want to show in your map. For example, we could use Data Observatory to find out how many car, truck and van commuters live in each postal code polygon area. Then we could divide the number of accidents for each polygon by the number of commuters to get a rate of motor vehicle accidents per commuter.//

	- View the `count_vals_density` calculated results

		This column values are the result of dividing the accident counts by polygon area.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## Style your Map

Choropleth maps are great for showing which areas have more or less of an attribute at a glance. Create a Choropleth map to show where Bronx motor vehicle accident rates are higher.

![step5](https://cloud.githubusercontent.com/assets/1779444/19363944/13f81bb4-915a-11e6-8425-56e0a0423a76.gif)

- Click _STYLE_ from the _zcta_bronx_ map layer

- From the FILL color, choose _BY VALUE and select the `count_vals_density` column 

- Select _7_ as the number of buckets

	**Cheat Sheet: Style by quantification.

- Choose any color palette. We recommend using a sequential one, where colors progress from light to dark

Publish the analysis results as part of the last step in the workflow.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## Share Your Map

Now that we have applied our analyses to pick out the most useful information from our data, we can publish and share this map with our colleagues.

![step6](https://cloud.githubusercontent.com/assets/1779444/19363507/c52db7e2-9158-11e6-9e30-f906ea7f9860.gif)
)

[Final [.carto file]() for reference.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

### Want to Learn More?

Related Reading: (TBD before publish)

- Quota consumption rules? (still being determined
- Other Tutorials or Guides?
- // Importing Guide? // Georeferencing Guide? // Normalization Guide? // Analyses overview Guide? Or else just Intersect Second Layer analysis guide? // Publishing Guide? // Quantification Guide?

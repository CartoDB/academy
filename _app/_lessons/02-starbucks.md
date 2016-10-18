---
title: "Learn How to Optimize a Marketing Campaign by Targeting High Traffic Stores"
permalink: /courses/lessons/learn-how-to-optimize-a-marketing-campaign-by-targeting-high-traffic-stores/
---

# Learn How to Optimize a Marketing Campaign by Targeting High Traffic Stores

placeholder image

## Introduction

Learn how to visualize new retail opportunities in New York City by building a real world map application. Use the Builder to analyze Starbucks stores located near busy NYC subways to identify Starbucks locations that receive the most foot traffic, and would be good candidates for a promotional marketing campaign.

Analysis Options:

- Create areas of influence
- Filter points in polygons

START TUTORIAL

------ Each subsequent section should be a new section in the tutorial ---

## Why Analyze your Location Data?

Understanding how to leverage your location-based intelligence into something that you can visualize enables you to gain key insights about your data that you may have otherwise missed.

CARTO Builder not only enables you to enrich your map visualizations with location-based data, but also comes bundled with a wealth of analysis options to extract hidden insights from your data.

### Real World Challenge

**Which Starbucks stores receive the most foot traffic?**

A common business problem is identifying new opportunities in reaching customers by location. This could mean everything from identifying new locations for retail stores, to identifying stores that reach the most customers, and could be a good target of promotional campaigns or testing of new products.

### The Solution

**Identify Starbucks stores located near busy New York City subways**

The CARTO Builder, _Create areas of influence_ analysis option, allows you to calculate the amount of travel time required by foot, or car, to reach a certain distance. By applying the _Create areas of influence_ analysis to our New York City subway locations, we can identify Starbucks locations located within 100 meters of a NYC subway. The result identifies Starbucks locations that potentially receive the greatest foot traffic.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## Create a Multi-Layer Map

Using public data available on Starbucks locations in NYC, CARTO created the basic map for this lesson. It contains a multi-layer map with two layers, the first layer displays New York City subway locations.

![step1](https://cloud.githubusercontent.com/assets/1779444/19423826/2bf9b304-93f2-11e6-9e89-9d34ec1aa8fc.gif)

[Download .CARTO]

- https://team.carto.com/u/stephaniemongon/dataset/starbucks_orig
- https://team.carto.com/u/stephaniemongon/dataset/nyc_subway_entrance_orig

**Building the Map**

1. Import the .carto file

	The map opens in the CARTO Builder. Since the subway dataset included latitude and longitude values, it automatically imported with coordinate data in _the_geom_ column. That is what makes points render in the Map View.

2. Add the NYC subway layer to the map

	- Download *starbucks.csv* to your computer
	- Drag and drop it to your _Connect dataset_ options

3. Rename your map

	Whenever a new map is created in CARTO, it is untitled. It is recommended to rename your map to help manage your maps. Double-click on the title and edit the text of the map  name. For this example, use _Retail Opportunities_ as the map name.

Now that the map is set up, analyze the data.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## How Close am I to the Subway Station?

![step2](https://cloud.githubusercontent.com/assets/1779444/19423851/578b1a58-93f2-11e6-8202-881d0b81b681.gif)

We know that we want to find Starbucks locations that are close to subway entrances, to target commuters that could potentially stop for coffee on their way to work. How do we define what 'close' means, and how can we show it on our map?

We can do this with an _Areas of influence_ analysis. This allows us pick a certain distance from a subway entrance, and draw a circle around each station using that distance as a radius. Any Starbucks within this area is considered 'close' to a subway station. This is the same as using [PostgreSQL](https://www.postgresql.org/) and [PostGIS](http://www.postgis.net/) to create a [buffer](http://www.postgis.org/docs/ST_Buffer.html), but CARTO enables us do it with the click of a button, instead of writing code.

1. Toggle off the Starbucks layer (to hide) and show the just the NYC subway layer

2. From the nyc_subway_entrance map layer, click the _ADD ANALYSIS_ shortcut

3. Click on _Create areas of influence_ to transform the subway points into circle polygons

	The analysis parameters appear.

4. Select the analysis parameters

	- Keep the default, *A0*, as the INPUT source layer for this analysis, since our subway points are what we want to transform

		**Tip:** The nyc_subway_layer is labeled _A_ in the LAYERS section. Its original geometry is technically labeled _A0_. Since this is the first analysis being added to the subway layer, it is labeled _A1_. These labels enable you to easily chain analysis workflows to map layers.

	- Define the buffer area TYPE as _Units_, enter _400_ meters for the radius, and keep the _Intact_ option (which indicates that if any of our areas of influence overlap, they will be kept as separate polygons instead of blended into one) 

		**Note:** Alternatively, you can choose *Time* and define a walking distance from the subway station in minutes. Instead of a circle, you would transform your points into an [isoline polygon](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwig9_Wpz-DPAhWDND4KHR-zDYwQFgghMAE&url=https%3A%2F%2Fcarto.com%2Fblog%2Fbend-time-and-distance-isolines-to-your-business-needs%2F&usg=AFQjCNFDJUH59VAP9KHIC25BBhVG_6buJw&sig2=AzP8TnylnKR7eG2VM1R3wg). 

Now that we can see the analyzed results, we can filter the area where we want to search for Starbucks stores.

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## Filter Map to Visualize a Target Area

![step3](https://cloud.githubusercontent.com/assets/1779444/19423858/6ce2683e-93f2-11e6-8d11-725f19281f0b.gif)

1. Show the Starbucks layer again

	A lot of Starbucks points fall within the areas of influence we just created, but there are also many that do not. What is the easiest way to find only Starbucks stores inside these areas of interest? 

	You could write SQL queries for that, but it is much more efficient to use another CARTO analysis, _Filter points in polygons_

2. Add a second analysis workflow to the Starbucks map layer and add the _Filter points in polygons_ analysis
	
	This time, the analysis is labeled _A2_, as it is the second analysis in your workflow. From the analysis parameters, keep the default layer source as _A1_, because we want to use the polygons we calculated in the A1 analysis, instead of the original A0 point geometry. 

	- Click in the TARGET LAYER field, and choose your Starbucks layer _B0_

3. Create a new layer from the analysis results by clicking and dragging the _A1 AOI_ analysis into a new layer

	**CHEAT SHEET** create new layer from analysis

	The new layer is labeled as _C_. Note that the _A_ layer is not showing all subway points, since we transformed it to only show the subway entrances located within our areas of influence. They are covered by our polygons, so change the order of layers in order to visualize these points.

4. Click and drag layer C (nyc_subway_entrance_, with the filter points in polygons analysis applied) over layer A (nyc_subway_entrance), the polygon AOI layer

The map displays only the subway stations we want to target with our marketing campaign. Take some time to consider the map's cartography and apply some styling so that we can publish this map. 

CONTINUE

------ Each subsequent section should be a new section in the tutorial ---

## Share your Map

![step4](https://cloud.githubusercontent.com/assets/1779444/19423869/854ba624-93f2-11e6-8f4b-7f97676fc6aa.gif)

Now that we have applied our analyses to pick out the most useful information from our data, we can publish and share this map with our colleagues.

[Final [.carto file]() for reference.

### Want to Learn More?

Related Reading: (TBD before publish)

- Quota consumption rules? (still being determined
- Other Tutorials or Guides?
- Importing Guide?

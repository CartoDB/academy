---
title: "Builder Introduction — Visualization Part 2: Styling"
permalink: /courses/builder-intro/builder-viz-p2-styling/
tweet_text: "Have 5 min free to learn map design with CARTO Builder? Check out Visualization Part 2: Styling. @CARTO"
lesson_message: "Congratulations! You’ve completed the introduction to the Builder Styling!"
---

**MAYBE SPLIT THIS LESSON INTO TWO** 
 
 
## Visualization: Part 2: Styling

![vid_splash]({{ site.baseurl }}/img/builder-intro/lesson1/0-vid-splash.png)

### Layer options: ![](layer options styling)

Let's take a look at how we style data in our maps. When you bring a layer in to CARTO it will be assigned a default style. But often you'll want to custom style your map to best represent your data cartographically. 

<!--![screenshot fill 0:23](screenshot fill 0:23)-->
## Fill color
Often one of the first things you'll modify is the color of your data. There's several ways to change the color of the layer in your map. You may change the layer's opacity, it's RGB or Hex color, its size, and with many more settings. There's many ways to style layers, learn more about all the ways of styling map layers from our documentation section on [Styling Map Layers](https://carto.com/docs/carto-builder/styling-map-layers/)

In CARTO Builder, Choropleth and Category maps, which apply a style based on a table column's value, can be created within in the **Style** settings by styling **BY VALUE**. 

## Choropleth
When you style a map by value, you can define the number of buckets, which represent three distinct buckets which contain a specific range of your data. You can style your color by value and also style the **size** of your point layers by values. The size of your points will be drawn proportionally to the points value in relation to the other values in your data layer and to the smallest and largest size values. 

## Category
The CARTO platform will automatically detect if your data type in your column is categorical rather than numeric and will style your data layer be caterory very quickly. 

## CartoCSS 

CartoCSS is still available and present in the Builder and will allow the user to modify anything that is built using the Wizard. 

## Aggregate

If you wanted to overlay a grid over your data and summarize the data that coincides with the grid cell and symbolize according to that summary count of point features, you could do that with the **Aggregation** settings. The grid squares can be sized differently and you can describe the point layer using different descriptive statistics by setting the **VALUE**. This aggregation method can also use a Hex Grid and other administrative units, such as state or province. 

## Heatmaps

Heatmaps are also available in the CARTO Builder, which show the concentration of certain features by pixe and are dynamically rendered by the zoom level.  Learn more in our Doc's section about [Aggregation Pixel Style Options](https://carto.com/docs/carto-builder/styling-map-layers/#aggregation-pixel-style-options).
 
## Animated
		
Another very popular feature is temporal animation. This **ANIMATED** visualization feature, formerly referred to as Torque, will display your data in a temporal sequence either based on a Datetime field or a column value. There's several settings to modify and style your Animated map settings. Learn more in our Doc's section about [Animated Options](https://carto.com/docs/carto-builder/styling-map-layers/#animated-options).
		
## Pop-Up

The ability to click or hover over a feature and display that feature's attribute information in a layer is available in the **POP-UP** menu. You can set the size and color of the POP-UP display. If you want to display the information from specific columns or all the columns. 
		
		
	
		
	 	


---
title: "Builder Introduction — Visualization Part 3: Widgets"
permalink: /courses/builder-intro/builder-viz-p3-widgets/
tweet_text: "Have 5 min free to learn about the new CARTO Builder? Check out Visualization Part 3: Widgets. @CARTO"
lesson_message: "Congratulations! You’ve completed the introduction to the Builder Widgets!"
---

# Quick Start: Visualization: Part 3: Widgets

<!-- add: ![vid_splash]({{ site.baseurl }}/img/builder-intro/lesson3/0-vid-splash.png) -->

Some of CARTO Builder's most powerful features are customizable widgets. Widgets let you quickly explore your data in-depth. They let your viewers explore it too, since widgets are shared with your map when it's published. 

## What's a widget?
Widgets are interactive tools that let you explore your data in-depth, quickly and easily. You can use widgets to filter multiple columns of your data at the same time, and even pair those with analyses. You can also use widgets to show changes over time. More than one widget can be added to a map. There are four types: Category, Histogram, Formula, Time-Series. This lesson will show you how to use a Category widget with an analysis. For more details on our other widgets, check out [their documentation](https://carto.com/docs/carto-builder/interactive-map-widgets/).

## How do I add a widget?
When you open your map in Builder, you will be on the Layers panel by default. Click on WIDGETS in the top menu bar, then click Add Widget. You are able to choose the widget type in the next page.

<!-- add an gif highlighting WIDGETS/Add widget -->

You can also add a widget by clicking into one of your map's layers, clicking on the Data tab, then checking the box next to the column you need. This method selects the widget type for you based on they column's data type. For example, if your column contains string values, Builder will automatically create a Category widget for you.

<!-- add an gif highlighting Layer/Data/column checkbox widget -->

## The Category Widget
After clicking Add Widget, make sure Category is selected in the Add new widgets page.

The Category Widget lets you illustrate qualitative information from one of your dataset's columns. Since qualitative maps show categories without hierarchy, you must choose a string (text) type column from your dataset for this widget. The Add new widgets interface shows your columns as cards, with checkboxes. In this example we're choosing the *customer_segment* column from this map's *customers* layer.

Once you click Continue, the customer_segments Category Widget will be added in a panel to the right of your map. Builder has automatically identified the unique values in the customer_segments column: Corporate, Home Office, Small Business, and Consumer. By default, the numbers you see next to each category name are a count of how many values are in each category. You can change this though, along with category styles! 

## Customization
To customize the widget edit the Data section that's currently visible at the left of your map, in the Data panel. We're changing the title to *Customer Segment*. Instead of counting how many customers are in each category type, we can choose another method of aggregation: SUM. Sum adds values together instead of counting how many exist. 

<!-- add an gif highlighting the widget parameters panel -->

This is more useful in our case if we change the column we're basing this aggregation on to *spend*. The number-type spend column contains how much money each customer spends. If we keep the widget VALUE as customer_segment, change AGGREGATION to SUM, and change AGGREGATION COLUMN to spend, Builder will add up how much money is spent in total for each customer segment category.

## Filtering
Now that we've configured the Category Widget to show the info we need, we can use it to filter what appears on the map. For example, when we click on CORPORATE, you'll see that all map markers disappear except for ones representing Corporate customers. You can select more than one category at a time.

## Using widgets with analyses
We can add an analysis to our map by returning to the Layers panel, and clicking on ADD ANALYSIS in the customers layer. For this demo we are using an analysis that detects outliers and clusters within the *spend* column. This analysis clusters your data into groups, and then compares all of the points within each group. It shows you what a customer's *spend* value means relative to its neighbors.

For example, if you apply the widget, it creates a column called *quads*. We can style our map by value, and choose this *quads* column. The result will show HH, HL, LH, and LL values. HH indicates concentrations of high spending; LL indicates low spending. HL shows outliers: high spending surrounded by low-spending neighbors. LH shows the opposite kind of outlier: low spending surrounded by high-spending neighbors.

<!-- add screenshot of map with style by value menu panel open so you can see HL LL etc -->

## Widgets affect each other!
We can also use this analysis-created *quads* column with other widgets if we want. In this case we're creating a new Category widget with it. Notice what happens when we select out only Corporate customers using our first Category widget: the outliers and clusters analysis re-runs. When it's finished the style by value is re-applied. Now our map is only showing point markers that represent Corporate customers. The marker neighbors have been re-calculated, so now we are looking at new concentrations of high and low spending, and new high-low/low-high spending outliers. If we wanted to, we could select out one category from this second widget: for example, we could click on HL, and create a map that shows an interesting pattern of Corporate customers that over-spend compared to their neighbors.

<!-- add side-by-side screenshot of map colored by LL, HH etc - showing before/after filtering for Corporate only -->

To learn more about the advantages of CARTO Builder, check out our other lessons on its UI, Styling, Publishing, and Analysis.


---
title: "Interactive Map Widgets"
description: Describes how to add interactive widgets for viewing your map data.
permalink: /courses/guides/interactive-map-widgets/
redirect_from: https://carto.com/docs/carto-builder/managing-your-map/#export-map
---

# Interactive Map Widgets

This guide describes how to include [interactive](#widget-behavior) dashboards that are embedded directly on your published visualization. Widgets do not modify your original data, they simply allow the map viewer to explore your map by selecting targeted filters of interest. Viewers can even apply temporary auto styling from the widget, to better visualize their selected results. 

Widgets also enable you to quickly visualize subsets of data that you might want to further analyze. Multiple widgets interact with one another and dynamically change to represent your selections.

## Widget Types

You can include different types of widgets to filter your map, and apply multiple widgets. The following table describes the available widget type and their function.

Widget Type | Description
--- | ---
Category | Filters by selected string columns from your data. You can configure values by an aggregated data column, define the operation, and define the operation column
Histogram | Filters data spread out over a select range. You can configure values by a data column and define the number of [buckets](/docs/carto-builder/styling-map-layers/#style-by-quantification)
Formula | Filters data based on a defined counted number of elements in a row. This is useful for viewing analysis results. You can configure values by a data column, define the operation, and add additional text to define how the widget interacts with the data
Time-series | Filters data by a range of time, based on a specified time series column. You can configure values by a data column and define the number of [buckets](/docs/carto-builder/styling-map-layers/#style-by-quantification)

## Add Widgets

This procedure describes how to add interactive widgets for viewing your map data. You can add and manage widgets directly from the WIDGETS section.

1. From an open map in the Builder, click _WIDGETS_
	
	<span class="wrap-border"><img src="/academy/img/guides/widgets/switch_to_widgets.jpg" alt="Switch to the Widgets view" /></span>

	The WIDGETS view appears, where you can add and manage widgets.

2. To add your first widget, click _ADD WIDGET_

	<span class="wrap-border"><img src="/academy/img/guides/widgets/no_widgets.jpg" alt="First time add widgets" /></span>

	The _Add new widgets_ options appear.

3. Select the type of widget category from the _Add new widgets_ toolbar

	<span class="wrap-border"><img src="/academy/img/guides/widgets/add_new_widgets_toolbar.jpg" alt="Select widget type from Add new widgets toolbar" /></span>

4. Select the column(s) to include for the widget

	**Note:** If you have multiple map layers, the widget options display columns for all your map layers and any sublayers that might contain analyses, as indicated by the layer letter and number (i.e., A0, A1, B0, B1). Any common column names will display options for both layers, as shown in the following example.

	<span class="wrap-border"><img src="/academy/img/guides/widgets/select_layers.jpg" alt="Select column from multiple layers for a widget" /></span>

5. Click _CONTINUE_

	The selected widget(s) appear on your map, and the widget section displays the Type, Data, and Behavior options for the widget.

	<span class="wrap-border"><img src="/academy/img/guides/widgets/widget_added.jpg" alt="Widget added" /></span>

	**Tip:** If you are adding multiple widgets, the options for the first widget appears.

6. Modify any of your widget details

	Each section of the WIDGET options are numbered, to guide you through the workflow. The following widget options are available:

	Widget Options | Description
	--- | ---
	Type | Contains the type of selected widget. These are the same widget types and columns that appeared on the _Add new widgets_ window, (_Category_, _Histogram_, _Formula_, or _Time-series_).<br /><br />**Tip:** Use the scroll bar to navigate through the available [Type](#widget-types) options
	Data | The available data options are driven by selected widget type. You can select the aggregation column, operation method, buckets, and so on
	Behavior | Contains options to control how the [widget behavior](#widget-behavior) interacts with your visualization. Options vary depending on the widget type.<br /><br />- **DYNAMIC**, indicates that the data (and analysis, if applicable) will dynamically change when a selection is made from the widget. This is the default option `YES`. When DYNAMIC is set to `NO`, your data remains static and does not update based on filters<br /><br />- **DEFINE HOW YOUR WIDGET INTERACTS WITH THE DATA**, appears for _Formula_ widgets only. It allows you to enter optional text to display underneath a formula widget. The text appears as you type it<br/><br/><img src="/academy/img/guides/widgets/formula_text.jpg" alt="Include formula text" />

	**Tip:** You can rename the title of the widget from the [Manage Widget](#manage-widgets) options.

7. Click <img src="/academy/img/common/back_navigaton_arrow.jpg" alt="Back navigation arrow" />, next to the widget name at the top of the Builder, to navigate back to the WIDGET section

8. To include additional widgets, click _ADD_

	The _Add new widgets_ dialog opens, from which you can add more widgets.

9. If your map is published, update it to show your widget changes

    For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

### Widget Shortcuts

In some areas of the CARTO Builder, there are shortcuts to add a widget. These shortcuts are specific to adding the widget, you will still have to manage and style them through the WIDGETS section.

- From the [DATA](/docs/carto-builder/map-layers-for-rendering-data/#data) section of a selected map layer, click the _Add as a widget_ checkbox to automatically create an interactive map widget. A confirmation message appears and a shortcut to _EDIT_ the details of the widget appears. Click _EDIT_ to open the widget from the WIDGETS section of the Builder.

	<span class="wrap-border"><img src="/academy/img/common/data_add_as_a_widget.jpg" alt="Add as a widget shortcut" /></span>

- From the STYLE section of a selected map layer, click [ANIMATED](/docs/carto-builder/styling-map-layers/#animated-options) as the AGGREGATION style for your data. Your visualization is animated and displays the time and date as a widget, which can then be customized and styled from the WIDGETS section

	<span class="wrap-border"><img src="/academy/img/common/animated.jpg" alt="Animated style options in the Builder" /></span>

	_**Note:** The ANIMATED aggregation option only appears when your data contains point geometries._

## Manage Widgets

Once widgets are created, there are many ways that you can manage them from the WIDGETS section of the Builder.

_**Note:** Widget management options appear on the left-hand side of the Builder, as part of the map management options (LAYERS, ELEMENTS, WIDGETS)._

- Click and drag to rearrange the order of how widgets appear on your map

- Click the _ADD_ button to add more widgets to the WIDGETS section
- To delete a widget, click the _Delete_ option from the widget name context menu

	<span class="wrap-border"><img src="/academy/img/guides/widgets/delete_widget.jpg" alt="Click x to delete widget" /></span>

- To change the title of the widget on the dashboard, click _Rename_ from the widget name context menu. You can also double-click on a widget name to rename it

## Widget Behavior

Once a widget is added, you can use it to interact with the map data. This section describes the behavior of the widgets and how the map visualization responds. 

_**Note:** The actual published widget appears on the right-hand side of the visualization (or underneath, if it is a time-series widget), and appear for all map viewers._

- **Auto style** - Click **Auto style** to apply a new temporary color ramp to the widget data. This is useful for better visualizing the widget results 

	<span class="wrap-border"><img src="/academy/img/guides/widgets/before_after_autostyle.jpg" alt="Click auto style for widgets" /></span>

- **Lock/unlock** - For category widgets, when you click a single selection, you can lock the widget to only show that option. Once locked, you can quickly unlock and/or show ALL selections again

	<span class="wrap-border"><img src="/academy/img/guides/widgets/category_lock.jpg" alt="Click to lock a category widget" /></span>

- **Search in categories** - For category widgets, click _SEARCH IN # CATEGORIES_ to enter a search term. This is useful for narrowing down search results in the widget, and for selecting multiple categories. Click _CANCEL_ to return to the widget

	<span class="wrap-border"><img src="/academy/img/guides/widgets/category_search.jpg" alt="Click search options" /></span>

- **Select a bucket, or range of data** - For histogram widgets, click directly on a bucket (the number of buckets is defined in the Widget/Data options). You can also select a range of buckets by clicking and dragging the edge of the buckets to change the range of selected data.

	<span class="wrap-border"><img src="/academy/img/guides/widgets/histogram_drag.jpg" alt="Select buckets, or range of buckets, from histogram widget" /></span>

	**Note:** Once a selection is made from a histogram widget, you can _CLEAR_ the selection, or click _ZOOM_ to zoom into the targeted area and filter deeper into the zoomed location

- **Play/Pause**, or select range of time - For a time-series widget, if your map is animated, you can select the play/pause option for the widget. Otherwise, you can select a range of time, and/or clear the selection

	<span class="wrap-border"><img src="/academy/img/guides/widgets/time_series_widget.jpg" alt="Time-series widget behavior" /></span>

- The widget context menu contains additional options to _Toggle_ the widget (show/hide the widget details) on your dashboard. In some cases, this context menu also includes an additional option to show totals for a histogram widget

	<span class="wrap-border"><img src="/academy/img/guides/widgets/widget_context_menu.jpg" alt="Widget context menu" /></span>

## Widget Rules

Note the following rules that apply when using widgets in CARTO.

- Widgets are a visualization filter that you can toggle on an off, and do not actually modify your data. If you are filtering a column that has an analysis applied to the map layer, the analysis is recalculated behind the scenes, without modifying the original data

- If you [export a map](/docs/carto-builder/managing-your-map/#export-map) as a .carto file, the widgets are automatically included as part of the visualization. _Note that any applied auto styling colors are not saved. This is intentional by design, as auto styling is strictly a viewer method to better visualize their selected results_

	**Tip:** Similarly, if you applied widget auto styling and published your map, the temporary auto styling colors do not appear on your published map. Viewers see the default map styling of your map layer, and no widget filters are applied. This is the intended design.

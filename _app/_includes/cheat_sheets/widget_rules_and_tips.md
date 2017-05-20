## Widget Rules and Tips

Note the following rules that apply when using widgets in CARTO.

- Widgets are a visualization filter that you can toggle on an off, and do not actually modify your data. If you are filtering a column that has an analysis applied to the map layer, the analysis is recalculated behind the scenes, without modifying the original data

- If you [export a map](/docs/carto-builder/managing-your-map/#export-map) as a .carto file, the widgets are automatically included as part of the visualization. _Note that any applied auto styling colors are not saved. This is intentional by design, as auto styling is strictly a viewer method to better visualize their selected results_

	**Tip:** Similarly, if you applied widget auto styling and published your map, the temporary auto styling colors do not appear on your published map. Viewers see the default map styling of your map layer, and no widget filters are applied. This is the intended design.

## Widget Tips

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

## Manage Widgets

Once widgets are created, there are many ways that you can manage them from the WIDGETS section of the Builder.

_**Note:** Widget management options appear on the left-hand side of the Builder, as part of the map management options (LAYERS, ELEMENTS, WIDGETS)._

- Click and drag to rearrange the order of how widgets appear on your map

- Click the _ADD_ button to add more widgets to the WIDGETS section
- To delete a widget, click the _Delete_ option from the widget name context menu

	<span class="wrap-border"><img src="/academy/img/guides/widgets/delete_widget.jpg" alt="Click x to delete widget" /></span>

- To change the title of the widget on the dashboard, click _Rename_ from the widget name context menu. You can also double-click on a widget name to rename it

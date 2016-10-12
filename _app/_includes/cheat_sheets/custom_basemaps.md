## Adding a Custom Basemap

You can import a custom basemap from XYZ, Mapbox, WMS/WMTS, TileJSON, and NASA. These external basemaps sources need to be hosted online and available to the public.

### Select the Basemap Source and Add Style

When you open a map in CARTO, the map opens in the Builder and displays the Basemap and Layer(s) for the selected map. The map layers and map background are required for rendering data.

- Click on the default basemap name to view the basemap options

	**Note about Basemap Labels:** Some basemaps contain basemap labels, which are not editable. These labels are part of the selected basemap styling. Basemap labels appear as a separate map layer, and will always appear as the first map layer. You cannot reorder where the basemap (and the corresponding basemap label, if applicable) appears in the LAYER section of the Builder. This is intentional by design, so that your map visualization is rendered correctly.

- Use the scroll bar to navigate through the available basemap _Source_ options
	
	CARTO includes a selection of basemap sources from CARTO, Stamen, and HERE. These provided basemaps are not editable, you cannot customize features from these preset basemap options.

- For custom basemaps, select the source as XYZ, Mapbox, WMS/WMTS, or TileJSON and add the style by inserting the URL from the resource

	**Tip:** When NASA is the selected source, select a date from which you want a global basemap and indicate Day (a day map changes based on the day selected) or Night.

 Once you add a basemap to your account, you can use the basemap in any visualization in CARTO.
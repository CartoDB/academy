## Point Aggregation Options

The following aggregation styles are available for map layers containing point geometries.

- NONE - Displays all geometries as a simple point. There are no other aggregation styles applied to interpret your data. All columns are counted and appear as a single pattern

	**Aggregated CartoCSS Property** - None, no aggregated CartoCSS property is added to your map. Style your map based on individual geometry attributes

- SQUARES - Displays your data pattern in squares, based on an amount of data contained within each unit. You can configure the pixel size of the square, and apply the data operation for how the data is aggregated (COUNT, SUM, AVG, MAX, MIX). Square patterns contain a more compact grid and a lower number of grid edges

	**CartoCSS Property** - The `agg_value` CartoCSS property is added and contains a unique color ramp to differentiate the styled pattern applied to your map

- HEXBINS - Displays your data in hexagon patterns, based on an amount of data contained within each bin. Hexbins contain more volume per grid than square units, and show a larger area of connected areas, since they are slightly curved. You can configure the size of the hexbin, and apply the operation for how the data is aggregated (COUNT, SUM, AVG, MAX, MIX)

	**CartoCSS Property** - The `agg_value` CartoCSS property is added and contains a unique color ramp to differentiate the binned structure applied to your map. Hexbins are useful if you are visualizing large datasets

- ADM. REGIONS - Counts and displays a number of points in a polygon, and displays the results as polygon boundaries defined by different administrative levels or regions. See [Data Observatory](/docs/carto-engine/data/overview/#boundary-data) for details about public boundary data

	**CartoCSS Property** - None, this aggregated style is a work in progress and does not contain an aggregated property at the time    

- ANIMATED - Displays a selected column as an animated visualization, where you can style the different animation options for time-series data

	**CartoCSS Property** - See [CartoCSS Properties for Torque Style Maps](https://carto.com/docs/carto-engine/cartocss/properties-for-torque/#cartocss-properties-for-torque-style-maps) for specific animated properties

- PIXEL - Displays static temporal heatmap data. Areas of greater color intensity indicate a larger density of data

	**CartoCSS Property** - See [CartoCSS - Torque Heatmaps](https://carto.com/docs/carto-engine/cartocss/properties-for-torque/#cartocss---torque-heatmaps) for specific Torque heatmap properties
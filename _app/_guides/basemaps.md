---
title: "Basemaps for Map Backgrounds"
description: Describes the available basemaps options from the CARTO Builder.
permalink: /courses/guides/basemaps-for-map-backgrounds/
redirect_from: https://carto.com/docs/carto-builder/basemaps-for-map-backgrounds/
---

# Basemaps for Map Backgrounds

This guide describes how you can apply the map background required for rendering data. A basemap is a graphical representation of the world, showing natural and cultural features such as water bodies, topography, park areas, points of interest, geopolitical borders, roads, streets, and sometimes buildings. CARTO provides you with a selection of basemap options and providers (such as Stamen or Here). You may import your own custom basemap (from Mapbox, an XYZ tileset (e.g. Stamen maps or WMS), or use a solid background color, repeating image, or pattern. With the basemap selector, you can focus on an aesthetically pleasing way of visualizing your map background.

## Basemap Options

The following basemap options are available in the CARTO Builder.

Basemap Options | Description
--- | ---
Packaged basemaps | Include a selection of basemap sources from CARTO, Stamen, and HERE<br /><br />**Note:** The provided basemaps are not editable, you cannot customize features from these preset basemap options. You can, however, import an external URL basemap or create your own custom basemap.
Custom basemaps | Create your own custom basemap styles using HTML code
Color basemaps | Add a custom solid color with the _COLOR_ option. Click to change the map background color
TILEJSON | Insert your TileJSON URL to be used as the basemap
Mapbox basemaps | Mapbox provided basemap options. This feature is a work in progress and will appear soon
WMS/WMTS | A WMS, or Web Map Service, enables you to connect to online generated map images by a map server using data from a GIS database
Using an image as a basemap | This feature is a work in progress and will appear soon

## Changing your Basemap

This procedure describes how to access and change the basemap options in the CARTO Builder.

1. Click *Your maps* from your dashboard drop-down menu  

    <span class="wrap-border"><img src="/academy/img/common/your_maps.jpg" alt="Select Your Maps from Dashboard" /></span>

    The page refreshes, displaying a list of your maps.

2. Select the name of the map to view, or click the Edit icon on a map

    <span class="wrap-border"><img src="/academy/img/guides/basemaps/basemap_select_map.jpg" alt="Select Map" /></span>

    The map opens in the CARTO Builder and displays the Basemap and Layer(s) for the selected map.

3. Click on the Basemap name

    <span class="wrap-border"><img src="/academy/img/guides/basemaps/select_basemap.jpg" alt="Select basemap from LAYERS" /></span>

    **Note about Basemap Labels:** Some basemaps contain basemap labels, which are not editable. These labels are part of the selected basemap styling. Basemap labels appear as a separate map layer, and will always appear as the first map layer. You cannot reorder where the basemap (and the corresponding basemap label, if applicable) appears in the LAYER section of the Builder. This is intentional by design, so that your map visualization is rendered correctly.

4.  View the default basemap settings

    <span class="wrap-border"><img src="/academy/img/guides/basemaps/default_basemap.jpg" alt="View default basemap from LAYERS" /></span>

 5. Change basemap options by selecting the _Source_ and _Style_

    **Tip:** Use the scroll bar to navigate through the available _Source_ options.

    <span class="wrap-border"><img src="/academy/img/guides/basemaps/basemap_option.jpg" alt="Changing basemap options default basemap from LAYERS" /></span>

    The Builder refreshes when basemaps _Styles_ are selected.

6. Click <img src="/academy/img/common/back_navigaton_arrow.jpg" alt="Back navigation arrow" />, next to the layer name at the top of the Builder, to navigate back to the LAYERS section

    The Builder indicates your changed basemap as part of the map details.

    <span class="wrap-border"><img src="/academy/img/guides/basemaps/updated_basemap.jpg" alt="Changed basemap for map" /></span>

7. If your map is published, update it to show your basemap changes

    For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

## Current Limitations

Custom basemap options are not available. You will only have access to our packaged basemaps (CARTO, Stamen, HERE). Once the final production version of the Builder is released, all of the custom basemap features will be available.

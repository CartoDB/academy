---
title: "Adding Map Layers"
description: Describes how to view and add map layers in the CARTO Builder.
permalink: /courses/guides/adding-map-layers/
redirect_from: https://carto.com/docs/carto-builder/map-layers-for-rendering-data/#add-a-new-layer
---

# Adding Map Layers

This guide describes how to view and add map layers in the Builder. The maximum number of layers per map depends on your CARTO account. All account plans contain at least eight layers. Please [contact us](mailto:sales@carto.com) if you need a custom number of map layers for your account.

Opening a map displays the LAYERS, ELEMENTS, and WIDGETS for the selected map. The LAYERS section appears by default, displaying the basemap and map data layer(s) that are the backbone for rendering your visualization.

## Layer Tips 

(writer note_csobier: This is the link to the Cheat Sheet section of the right-side of the GUIDE template?)

The following features are available for map layers in the Builder.

- Layers are created alphabetically (A, B, C, D and so on) and each layer displays a unique color

- Each layer icon displays the geometry type behind the data as either point, line, or polygon

- Layers are rendered from bottom to top, with basemaps being the bottom layer

- You can easily rename each map layer to better represent steps in your workflow. The connected dataset name still appears as part of the layer description details

- Show or Hide a map layer from your visualization by clicking the eyeball icon. All map layers are displayed by default. See [this table](/docs/carto-builder/dashboard/#carto-builder) for a description of the CARTO Builder features

- Click _ADD_ to [add a new layer](#add-layer) to your map. The number of layers allowed is based on your account plan

- Click and drag to rearrange the hierarchal order of how layer appear on your map

	**Note:** You cannot reorder where the basemap (and the corresponding basemap label, if applicable) appears in the LAYER section of the Builder. This is intentional by design, so that your visualization appears correctly. For details about changing your basemap options, see [Basemaps](/docs/carto-builder/basemaps-for-map-backgrounds).

- Each layer contains additional subsections (A1, A2, B1, B2, and so on), and displays the connected dataset for the map layer, enabling you to managing your data from each map layer

- If any analysis options are applied to your data, it is indicated in the map layer. You can automatically create a new layer based on an analysis but clicking and dragging it to move it out of a layer

- When you click on a map layer, the DATA, ANALYSES, STYLE, POP-UP, and LEGEND options are available for the selected layer

## Add a New Layer

If you need to show multiple layers to differentiate hierarchies in your map, add a new layer from the LAYERS section of the Builder. 

1. From the LAYERS section of an open map in the Builder, click _ADD_

    <span class="wrap-border"><img src="/academy/img/guides/adding_layers/add_layer_button.jpg" alt="Add a new layer button" /></span>

    The _Add a new layer_ options appear.

2. Select the dataset that you want to add as a new layer

    <span class="wrap-border"><img src="/academy/img/guides/adding_layers/add_a_new_layer.jpg" alt="Add a new layer options" /></span>

    **Tip:** Click [Connect dataset]({{ site.baseurl }}/carto-editor/datasets/#connect-dataset) to open view the connect dataset options, select from your existing datasets from your [datasets dashboard]({{ site.baseurl }}/carto-editor/datasets/#datasets), select from the [Data library]({{ site.baseurl }}/carto-editor/datasets/#data-library), or add an [empty layer]({{ site.baseurl }}/carto-editor/datasets/#create-an-empty-dataset).

3. Click _ADD LAYER_ to add the new data layer for your map

    The new layer is added to the DATA section, a confirmation message appears, and your map visualization refreshes.

    <span class="wrap-border"><img src="/academy/img/guides/adding_layers/new_layer_appears.jpg" alt="New layer added to DATA section" /></span>

4. Click and drag to reorder your map layers in the Builder (this is only applicable if you need to adjust the hierarchal order of how layers are rendered)

    **Note:** When styling a map with multiple layers, the order of the layers reflects the order in which they are visualized. You may need to adjust the styling for each layer to accommodate conflicting features. For example, suppose you have one fully opaque layer over another one, you may be unable to view the data under the opaque layer. Additionally, if you have pop-ups enabled for both layers, only the top layer pop-up is displayed in areas where the bottom layer covered (by the top layer).

5. Click the new layer to open the layer options (DATA, ANALYSIS, STYLE, POP-UP, LEGEND) and style it independently

6. If your map is published, update it to show your data changes

    For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

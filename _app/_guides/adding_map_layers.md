---
title: "Adding Map Layers"
description: Describes how to import data with the CARTO Builder and connect datasets to your account.
permalink: /courses/guides/adding-map-layers/
redirect_from: https://carto.com/docs/carto-builder/map-layers-for-rendering-data/#add-a-new-layer
---

# Adding Map Layers

This guide describes how to view and add map layers in the Builder. If you need to show multiple layers to differentiate hierarchies in your map, you can add layers from the LAYERS section of the Builder. The maximum number of layers per map depends on your CARTO account. All account plans contain at least eight layers. Please [contact us](mailto:sales@carto.com) if you need a custom number of map layers for your account.

The objective of this guide is to:

- Learn about all the _Connect dataset_ options in the Builder
- Review the supported geospatial data formats
- Access the public datasets in the Data Library, from the Connect dataset options
- Create an empty dataset and build your own columns and rows of data, and learn how to change the column type for your data

<span class="wrap-border"><img src="/academy/img/guides/connecting_data/connect_dataset.jpg" alt="Connect Dataset" /></span>

## Add a New Layer

If you need to show multiple layers to differentiate hierarchies in your map, you can add layers from the LAYERS section of the Builder. The maximum number of layers per map depends on your CARTO account. All account plans contain at least eight layers. Please [contact us](mailto:sales@carto.com) if you need a custom number of map layers for your account.

1. From the LAYERS section of an open map in the Builder, click _ADD_

    <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/carto-builder/map_layers/add_layer_button.jpg" alt="Add a new layer button" /></span>

    The _Add a new layer_ options appear.

2. Select the dataset that you want to add as a new layer

    <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/carto-builder/map_layers/add_a_new_layer.jpg" alt="Add a new layer options" /></span>

    **Tip:** Click [Connect dataset]({{ site.baseurl }}/carto-editor/datasets/#connect-dataset) to open view the connect dataset options, select from your existing datasets from your [datasets dashboard]({{ site.baseurl }}/carto-editor/datasets/#datasets), select from the [Data library]({{ site.baseurl }}/carto-editor/datasets/#data-library), or add an [empty layer]({{ site.baseurl }}/carto-editor/datasets/#create-an-empty-dataset).

3. Click _ADD LAYER_ to add the new data layer for your map

    The new layer is added to the DATA section, a confirmation message appears, and your map visualization refreshes.

    <span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/carto-builder/map_layers/new_layer_appears.jpg" alt="New layer added to DATA section" /></span>

4. Click and drag to reorder your map layers in the Builder (this is only applicable if you need to adjust the hierarchal order of how layers are rendered)

    **Note:** When styling a map with multiple layers, the order of the layers reflects the order in which they are visualized. You may need to adjust the styling for each layer to accommodate conflicting features. For example, suppose you have one fully opaque layer over another one, you may be unable to view the data under the opaque layer. Additionally, if you have pop-ups enabled for both layers, only the top layer pop-up is displayed in areas where the bottom layer covered (by the top layer).

5. Click the new layer to open the layer options (DATA, ANALYSIS, STYLE, POP-UP, LEGEND) and style it independently

6. If your map is published, update it to show your data changes

    For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

## Map Layer Tips

Opening a map displays the LAYERS, ELEMENTS, and WIDGETS for the selected map. The LAYERS section appears by default, displaying the basemap and map data layer(s) that are the backbone for rendering your visualization.

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

**Note:** When styling a map with multiple layers, the order of the layers reflects the order in which they are visualized. You may need to adjust the styling for each layer to accommodate conflicting features. For example, suppose you have one fully opaque layer over another one, you may be unable to view the data under the opaque layer. Additionally, if you have pop-ups enabled for both layers, only the top layer pop-up is displayed in areas where the bottom layer covered (by the top layer).

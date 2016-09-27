---
title: "Styling Map Layers"
description: Describes the map styling options in the CARTO Builder.
permalink: /courses/guides/styling-map-layers/
redirect_from: https://carto.com/docs/carto-builder/styling-map-layers/
---

# Styling Map Layers

This guide describes how apply map styling based on an aggregation style, and define options by geometry attributes or by a column value in your dataset. 

### Selecting Style Options

Note the following tips when styling map layers in the Builder.

- Each section of the STYLE options is numbered, to guide you through the workflow

- Aggregations are based on your data geometry (point, line, polygons), so not all options may appear when you are styling a map layer

  - For point geometries, you can select the [aggregation](#aggstyle) style of your data. These aggregation styles contain their own CartoCSS property, which you can further customize based on the overall spatial pattern of your map

  - Line and Polygon geometries are automatically styled based on simple resolutions and do not contain any additional aggregation options 

- You can style options by geometry attributes, or by a column value. When selecting a column value, the resulting style options vary- depending on the data type (number, string, date, boolean) of the column you selected

- You can rename each layer to make it more intuitive. You can also hide other layers and focus on styling one layer at a time

- The order of the layers reflects the order in which they are visualized. You may need to adjust the styling for each layer to accommodate conflicting features. For example, suppose you have one fully opaque layer over another one, you may be unable to view the data under the opaque layer. Additionally, if you have pop-ups enabled for multiple layers, only the top layer pop-up is displayed in areas where the bottom layer covered (by the top layer)

## Style Point Layers

A point is an exact location based on coordinates, and is represented by a single dot on the map. Points do not have a defined width or dimension. You can define how these dimensions are interpolated with the aggregation options. 

This procedure describes how to access and edit the STYLE options when the selected map layer contains point geometries. Your map visualization automatically displays the style options as they are applied.

{% include carto-builder/select_map_steps.md %}

3. Select the point map layer that you want to apply styling to

    <span class="wrap-border"><img src="/academy/img/guides/styling/select_point_layer_from_builder.jpg" alt="Select point layer from Builder" /></span>

    The DATA, ANALYSES, STYLE, POP-UP, and LEGEND options are available for the selected layer. The DATA section appears by default.

4. Click _STYLE_ to access the styling options for the selected map layer

    <span class="wrap-border"><img src="/academy/img/guides/styling/select_style.jpg" alt="Select STYLE for a map layer" /></span>

    A list of style options, based on your data, appears. 

5. Select the _Aggregation_ style for the map layer

    **Tip:** Use the scroll bar to view all aggregation options.

    <span class="wrap-border"><img src="/academy/img/guides/styling/style_overview.jpg" alt="Overview of STYLE options" /></span>

    <a name="aggstyle"></a>The following aggregation styles are available for point geometries:

    Aggregation Style | Description
    --- | ---
    NONE | Displays all geometries as a simple point. There are no other aggregation styles applied to interpret your data. All columns are counted and appear as a single pattern<br /><br />**Aggregated CartoCSS Property** - None, no aggregated CartoCSS property is added to your map. Style your map based on individual geometry attributes
    SQUARES | Displays your data pattern in squares, based on an amount of data contained within each unit. You can configure the pixel size of the square, and apply the data operation for how the data is aggregated (COUNT, SUM, AVG, MAX, MIX). Square patterns contain a more compact grid and a lower number of grid edges<br /><br />**CartoCSS Property** - The `agg_value` CartoCSS property is added and contains a unique color ramp to differentiate the styled pattern applied to your map
    HEXBINS | Displays your data in hexagon patterns, based on an amount of data contained within each bin. Hexbins contain more volume per grid than square units, and show a larger area of connected areas, since they are slightly curved. You can configure the size of the hexbin, and apply the operation for how the data is aggregated (COUNT, SUM, AVG, MAX, MIX).<br /><br />**CartoCSS Property** - The `agg_value` CartoCSS property is added and contains a unique color ramp to differentiate the binned structure applied to your map. Hexbins are useful if you are visualizing large datasets
    ADM. REGIONS | Counts and displays a number of points in a polygon, and displays the results as polygon boundaries defined by different administrative levels or regions. See [Data Observatory](/docs/carto-engine/data/overview/#boundary-data) for details about public boundary data<br /><br />**CartoCSS Property** - None, this aggregated style is a work in progress and does not contain an aggregated property at the time    
    ANIMATED | Displays a selected column as an animated visualization, where you can style the different animation options for time-series data.<br /><br />**CartoCSS Property** - See [CartoCSS Properties for Torque Style Maps](https://carto.com/docs/carto-engine/cartocss/properties-for-torque/#cartocss-properties-for-torque-style-maps) for specific animated properties
    PIXEL | Displays static temporal heatmap data. Areas of greater color intensity indicate a larger density of data<br /><br />**CartoCSS Property** - See [CartoCSS - Torque Heatmaps](https://carto.com/docs/carto-engine/cartocss/properties-for-torque/#cartocss---torque-heatmaps) for specific Torque heatmap properties

6. When applicable, select the _Aggregation Options_

    _Aggregation Options_ appear for SQUARES, HEXBINS, AND ADM REGION. You can define the pixel size for the pattern, and select the operation used to interpret your data

    <span class="wrap-border"><img src="/academy/img/guides/styling/aggregation_options.jpg" alt="Aggregations Options" /></span>

7. Style options by geometry, or by column values
    
    Options vary, depending on your data. See the style options based on the aggregation selected ([NONE](#aggregation-none-style-options), [SQUARES](#aggregation-squares-style-options), [HEXBINS](#aggregation-hexbins-style-options), [ADM REGIONS](#aggregation-adm-region-style-options), [PIXEL](#aggregation-pixel-style-options)).

    **Tip:** You can double-click the undo and redo arrow buttons after applying style options, located at the bottom of the STYLE section of the Builder.

    <span class="wrap-border"><img src="/academy/img/guides/styling/undo_redo_buttons.jpg" alt="Undo Redo arrow buttons for style changes" /></span>

8. Optionally, click the slider button to view the style options as CartoCSS syntax

    See [CartoCSS Syntax](https://carto.com/docs/carto-engine/cartocss/) for details on how to apply custom styles with CartoCSS.

9. Click <img src="/academy/img/common/back_navigaton_arrow.jpg" alt="Back navigation arrow" />, next to the layer name at the top of the Builder, to navigate back to the LAYERS section

10. If your map is published, update it to show your style edits

    For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

### Aggregation (NONE) Style Options

Displays all geometries as a simple point. There are no other aggregation styles applied to interpret your data. All columns are counted and appear as a single pattern. No aggregated CartoCSS property is added to your map. Style your map based on individual geometry attributes.

<span class="wrap-border"><img src="/academy/img/guides/styling/none_agg_style.jpg" alt="Aggregation is none" /></span>

The following point styles can be edited.

NONE Aggregation Style Options | Description
--- | ---
FILL | Contains the fill color and opacity. You can select fill color by attribute or by column value
  | **Fill color by solid value** -  Click on the fill color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and change the fill opacity<br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
  | **Fill color by column value** - Click on the fill color to view the solid color values, then click _BY VALUE_ to select a data column<br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder<br /><br>**Note:** If a number column is selected, you can edit the [buckets and quantification](#style-by-quantification) for the selected column
STROKE | Contains the width, color, and opacity for the sides of the point. _POINT stroke options can only be selected by fixed and solid values_<br /><br>
  | **Stroke size by fixed value** - Click on the stroke number to view the fixed values. You can use the slider bar to select a width, or type a width in the input field<br /><br><img src="/academy/img/guides/styling/polygon_stroke_size.jpg" alt="Point stroke size by fixed value" />
  | **Stroke color by solid value** - Click on the stroke color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and change the stroke opacity<br /><br><img src="/academy/img/guides/styling/polygon_stroke_color.jpg" alt="Point stroke color by fixed value" /><br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
BLENDING | Edit how the colors of overlapping geometries interact with one another. See [CartoCSS Composite Operations](https://carto.com/docs/carto-engine/cartocss/composite-operations/) for a description of composite operation effects
LABELS | Enable labels to appear on your map, and control how the labels are styled. See [Label Styles](#label-styles) for details

### Aggregation (SQUARES) Style Options

Displays your data pattern in squares, based on an amount of data contained within each unit. You can configure the pixel size of the square, and apply the data operation for how the data is aggregated (COUNT, SUM, AVG, MAX, MIX). Square patterns contain a more compact grid and a lower number of grid edges.

<span class="wrap-border"><img src="/academy/img/guides/styling/square_agg_style.jpg" alt="Square aggregation style" /></span>

The following square aggregation options can be edited.

SQUARE Aggregation Style Options | Description
--- | ---
SIZE | Indicates the size of the square that generates the edges of the pattern
OPERATION | Indicates the type of operator applied to the aggregation of your data columns. _COUNT_ is the default operation.<br /><br />If you select any other operator (SUM, AVG, MAX, MIN):<br /><br />- Select a corresponding column to aggregate for the results<br /><br />- You may also have to adjust the _SIZE_ attribute, based on the indicated range of values
FILL | Contains the fill color and opacity. You can select fill options by attribute or by the aggregated value
  | **Fill color by solid value** -  Click on the fill color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and change the fill opacity<br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
  | **Fill color by aggregated value** - Click on the fill color to view the aggregated color value. The aggregated style contains an assigned color ramp. You can select a different color ramp for this aggregated property, or you can create a _Custom color set_ for the aggregated value<br /><br><img src="/academy/img/guides/styling/hexabin_color_agg.jpg" alt="Hexbin color by aggregated value" /><br /><br>**Note:** You can change the [buckets and quantification](#style-by-quantification) for the selected aggregated style
STROKE | Contains the width, color, and opacity for the sides of the square. _SQUARE stroke options can only be selected by fixed and solid values_<br /><br>
  | **Stroke size by fixed value** - Click on the stroke number to view the fixed values. You can use the slider bar to select a width, or type a width in the input field<br /><br><img src="/academy/img/guides/styling/polygon_stroke_size.jpg" alt="Point stroke size by fixed value" />
  | **Stroke color by solid value** - Click on the stroke color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and change the stroke opacity<br /><br><img src="/academy/img/guides/styling/polygon_stroke_color.jpg" alt="Point stroke color by fixed value" /><br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
BLENDING | Edit how the colors of overlapping geometries interact with one another. See [CartoCSS Composite Operations](https://carto.com/docs/carto-engine/cartocss/composite-operations/) for a description of composite operation effects
LABELS | Enable labels to appear on your map, and control how the labels are styled. See [Label Styles](#label-styles) for details

**Tip:** The `agg_by_value` CartoCSS property is added and contains a unique color ramp to differentiate the styled pattern applied to your map.

### Aggregation (HEXBINS) Style Options

Displays your data in hexagon patterns, based on an amount of data contained within each bin. Hexbins contain more volume per grid than square units, and show a larger area of connected areas, since they are slightly curved. You can configure the size of the hexbin, and apply the operation for how the data is aggregated (COUNT, SUM, AVG, MAX, MIX). Hexbins are useful if you are visualizing large datasets.

<span class="wrap-border"><img src="/academy/img/guides/styling/hexabin_agg_style.jpg" alt="Hexbin aggregation style" /></span>

The following hexbin aggregation options can be edited.

HEXBIN Aggregation Style Options | Description
--- | ---
SIZE | Indicates the size of the hexbin that generates the edges of the pattern
OPERATION | Indicates the type of operator applied to the aggregation of your data columns. _COUNT_ is the default operation.<br /><br />If you select any other operator (SUM, AVG, MAX, MIN):<br /><br />- Select a corresponding column to aggregate for the results<br /><br />- You may also have to adjust the _SIZE_ attribute, based on the indicated range of values
FILL | Contains the fill color and opacity. You can select fill options by attribute or by the aggregated value
  | **Fill color by solid value** -  Click on the fill color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and change the fill opacity<br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
  | **Fill color by aggregated value** - Click on the fill color to view the aggregated color value. The aggregated style contains an assigned color ramp. You can select a different color ramp for this aggregated property, or you can create a _Custom color set_ for the aggregated value<br /><br><img src="/academy/img/guides/styling/hexabin_color_agg.jpg" alt="Hexbin color by aggregated value" /><br /><br>**Note:** You can change the [buckets and quantification](#style-by-quantification) for the selected aggregated style
STROKE | Contains the width, color, and opacity for the sides of the hexbin. _HEXBINS stroke options can only be selected by fixed and solid values_<br /><br>
  | **Stroke size by fixed value** - Click on the stroke number to view the fixed values. You can use the slider bar to select a width, or type a width in the input field<br /><br><img src="/academy/img/guides/styling/polygon_stroke_size.jpg" alt="Polygon stroke size by fixed value" />
  | **Stroke color by solid value** - Click on the stroke color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and change the stroke opacity<br /><br><img src="/academy/img/guides/styling/polygon_stroke_color.jpg" alt="Polygon stroke color by fixed value" /><br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
BLENDING | Edit how the colors of overlapping geometries interact with one another. See [CartoCSS Composite Operations](https://carto.com/docs/carto-engine/cartocss/composite-operations/) for a description of composite operation effects
LABELS | Enable labels to appear on your map, and control how the labels are styled. See [Label Styles](#label-styles) for details

**Tip:** The `agg_by_value` CartoCSS property is added and contains a unique color ramp to differentiate the binned structure applied to your map.

### Aggregation (ADM REGION) Style Options

Counts and displays a number of points in a polygon, and displays the results as polygon boundaries defined by different administrative levels or regions. See [Data Observatory](/docs/carto-engine/data/overview/#boundary-data) for details about public boundary data.

<span class="wrap-border"><img src="/academy/img/guides/styling/adm_region_agg_style.jpg" alt="ADM REGION aggregation style" /></span>

The following adm region aggregation options can be edited.

ADM REGION Aggregation Style Options | Description
--- | ---
ADMIN. LEVEL | Select the administrative level by countries or provinces
OPERATION | Indicates the type of operator applied to the aggregation of your data columns. _COUNT_ is the default operation.<br /><br />If you select any other operator (SUM, AVG, MAX, MIN):<br /><br />- Select a corresponding column to aggregate for the results<br /><br />- You may also have to adjust the _SIZE_ attribute, based on the indicated range of values
FILL | Contains the fill color and opacity. You can select fill options by attribute or by the aggregated value
  | **Fill color by solid value** -  Click on the fill color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and change the fill opacity<br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
  | **Fill color by aggregated value** - Click on the fill color to view the aggregated color value. The aggregated style contains an assigned color ramp. You can select a different color ramp for this aggregated property, or you can create a _Custom color set_ for the aggregated value<br /><br><img src="/academy/img/guides/styling/adm_region_color.jpg" alt="Adm region color by aggregated value" />
STROKE | Contains the width, color, and opacity for the borders of the admin region. _ADM REGION stroke options can only be selected by fixed and solid values_<br /><br>
  | **Stroke size by fixed value** - Click on the stroke number to view the fixed values. You can use the slider bar to select a width, or type a width in the input field<br /><br><img src="/academy/img/guides/styling/polygon_stroke_size.jpg" alt="point stroke size by fixed value" />
  | **Stroke color by solid value** - Click on the stroke color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and change the stroke opacity<br /><br><img src="/academy/img/guides/styling/polygon_stroke_color.jpg" alt="point stroke color by fixed value" /><br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
BLENDING | Edit how the colors of overlapping geometries interact with one another. See [CartoCSS Composite Operations](https://carto.com/docs/carto-engine/cartocss/composite-operations/) for a description of composite operation effects
LABELS | Enable labels to appear on your map, and control how the labels are styled. See [Label Styles](#label-styles) for details

**Tip:** This aggregated style is a work in progress and does not contain an aggregated property at this time.

### Aggregation (ANIMATED) Style Options

Displays a selected column as an animated visualization, where you can style the different rendering options for time-series data.

<span class="wrap-border"><img src="/academy/img/guides/styling/animated_agg_style.jpg" alt="Animated aggregation style" /></span>

The following animated aggregation options can be edited. For unique CartoCSS animated properties, see [CartoCSS Properties for Torque Style Maps](https://carto.com/docs/carto-engine/cartocss/properties-for-torque/#cartocss-properties-for-torque-style-maps).

ANIMATED Aggregation Style Options | Description
--- | ---
TYPE | Select to display the animation by points, or as a animated heatmap<br /><br>**Note:** Animated heatmap is different that a static heatmap, which is represented by the [PIXEL](#aggregation-pixel-style-options) aggregation style
FILL | Contains the fill size and fill color for the animated point. Fill options can be selected by a fixed value or by a column value
STROKE | Contains the width, color, and opacity for the animated point. You can only select stroke options by a fixed value
BLENDING | Edit how the colors of overlapping geometries interact with one another. See [CartoCSS Composite Operations](https://carto.com/docs/carto-engine/cartocss/composite-operations/) for a description of composite operation effects
COLUMN | Select the date column to act as the animated data on your map. This column must contain either _Date_ or _Number_ column data (so long as it reflects the passage of time)
OVERLAP | Shows or hides overlapping data aggregations of past data. If set to `None`, linear data aggregation is applied, where no traces of past data appears. `Accum` show past data points cumulatively
DURATION | Set the total number of seconds for your map visualization
STEPS | Edit the number of animation groupings. Fewer steps creates a more step-by-step or choppy data animation with more data in each “step.” A greater number of steps appears smoother. This correlates to whether your data is being displayed by day, week, month, etc.
TRAILS | Display a trail effect as your data points fade away from your map. Select a value between 0-5. `5` displays a longer trail whereas `0` does not display any trail. This appears as ‘frame-offset’ in the [CartoCSS Torque syntax](/docs/carto-engine/cartocss/properties-for-torque/#frame-offset-number)
RESOLUTION | Creates a grid of your data and aggregates data to each cell of that grid. The resolution parameter determines the width and height of each cell. Larger numbers display larger grids of data

**Note:** When animated aggregation is selected for your map, it adds the duration as a [widget](/docs/carto-builder/interactive-map-widgets/).

### Aggregation (PIXEL) Style Options

Displays static temporal heatmap data. Areas of greater color intensity indicate a larger density of data.

<span class="wrap-border"><img src="/academy/img/guides/styling/pixel_agg_style.jpg" alt="Pixel aggregation style" /></span>

The following pixel aggregation options can be edited. For unique CartoCSS pixel properties, see [CartoCSS - Torque Heatmaps](https://carto.com/docs/carto-engine/cartocss/properties-for-torque/#cartocss---torque-heatmaps).


PIXEL Aggregation Style Options | Description
--- | ---
FILL | Contains the fill size and fill color for the point. _Fill size can only selected by a fixed value, and fill color can only be selected by the aggregated value_<br /><br>
 | **Fill size by fixed value** - Click on the fill number to view the fixed values. You can use the slider bar to select a width, or type a width in the input field<br /><br><img src="/academy/img/guides/styling/point_size_fixed.jpg" alt="pixel fill size" />
| **Fill color by aggregated value** - Click on the fill color to view the aggregated color value. When aggregation is PIXEL, the `points_agg` CartoCSS property is added, and contains an assigned color ramp. You can select a different color ramp for this aggregated property, or you can create a _Custom color set_ for the aggregated value<br><img src="/academy/img/guides/styling/point_agg_value.jpg" alt="Color point by aggregation value" /><br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder<br /><br>**Note:** You can edit the [buckets and quantification](#style-by-quantification) for the aggregated style
RESOLUTION | The resolution parameter determines the size of each cell for the aggregated pixel. Larger numbers display larger grids of data. Click the slider button to lower or raise the resolution value

**Tip:** See [CartoCSS - Torque Heatmaps](https://carto.com/docs/carto-engine/cartocss/properties-for-torque/#cartocss---torque-heatmaps) for specific Torque heatmap properties.

## Style Line Layers

A line is a set a coordinates that displays as a straight, linear geometry. A line displays infinite length, but has no defined width or height. You can style the line width, line color, and line opacity attributes.

This procedure describes how to access and edit the STYLE options when the selected map layer contains line geometries. Your map visualization automatically displays the style options as they are applied.

{% include carto-builder/select_map_steps.md %}

3. Select the line map layer that you want to apply styling to

    <span class="wrap-border"><img src="/academy/img/guides/styling/select_line_layer.jpg" alt="Select line layer from Builder" /></span>

    The DATA, ANALYSES, STYLE, POP-UP, and LEGEND options are available for the selected layer. The DATA section appears by default.

4. Click _STYLE_ to access the styling options for the selected map layer

    <span class="wrap-border"><img src="/academy/img/guides/styling/select_style.jpg" alt="Select STYLE for a map layer" /></span>

    A list of style options, based on your data, appears. 

5. Style the line options by geometry, or by column values

    **Note:** All columns from your data are counted and appear as a single line geometry, no other aggregations methods apply.
    
    <span class="wrap-border"><img src="/academy/img/guides/styling/line_style_options.jpg" alt="Line style options" /></span>

    The following style options are available for line geometries:

    Line Style Options | Description
    --- | ---
    STROKE | Contains the line width, line color, and line opacity for the line. You can select stroke options by attribute or by column value
     | **Stroke size by fixed value** - Click on the stroke number to view the fixed values. You can use the slider bar to select a width, or type a width in the input field<br /><br>/academy/img/guides/styling/line_stroke_size.jpg" alt="Stroke size by fixed value" />
     | **Stroke size by column value** - Click on the stroke number to view the fixed values<br /><br>- Click _BY VALUE_ and select a data column. _Only columns that contain number data will appear from the list_<br /><br> - Once a column is selected, you can select the minimum and maximum width with the slider bar, or by typing a value in the input field<br /><br><img src="/academy/img/guides/styling/line_stroke_size_column.jpg" alt="Stroke size by column value" /><br /><br>**Tip:** You can edit the [quantification](#style-by-quantification) method for the selected column
     | **Stroke color by solid value** - Click on the stroke color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and edit the stroke opacity<br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder.
     | **Stroke color by column value** - Click on the stroke color to view the solid color values, then click _BY VALUE_ and select a data column<br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder.<br /><br>**Note:** If a number column is selected, you can edit the [buckets and quantification](#style-by-quantification) for the selected number column
    BLENDING | Edit how the colors of overlapping geometries interact with one another. See [CartoCSS Composite Operations](https://carto.com/docs/carto-engine/cartocss/composite-operations/) for a description of composite operation effects
    LABELS | Enable labels to appear on your map, and control how the labels are styled. See [Label Styles](#label-styles) for details

    **Tip:** You can double-click the undo and redo arrow buttons after applying style options, located at the bottom of the STYLE section of the Builder.

    <span class="wrap-border"><img src="/academy/img/guides/styling/undo_redo_buttons.jpg" alt="Undo Redo arrow buttons for style changes" /></span>

6. Optionally, click the slider button to view the style options as CartoCSS syntax

    See [CartoCSS Syntax](https://carto.com/docs/carto-engine/cartocss/) for details on how to apply custom styles with CartoCSS.

7. Click <img src="/academy/img/common/back_navigaton_arrow.jpg" alt="Back navigation arrow" />, next to the layer name at the top of the Builder, to navigate back to the LAYERS section

8. If your map is published, update it to show your style edits

    For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

## Style Polygon Layers

A polygon is a set of coordinates that displays a shape with connected edges, around an interior body. You can style the body of the polygon and the sides of the polygon.

This procedure describes how to access and edit the STYLE options when the selected map layer contains polygon geometries. Your map visualization automatically displays the style options as they are applied.

{% include carto-builder/select_map_steps.md %}

3. Select the polygon map layer that you want to apply styling to

    <span class="wrap-border"><img src="/academy/img/guides/styling/select_polygon_layer.jpg" alt="Select polygon layer from Builder" /></span>

    The DATA, ANALYSES, STYLE, POP-UP, and LEGEND options are available for the selected layer. The DATA section appears by default.

4. Click _STYLE_ to access the styling options for the selected map layer

    <span class="wrap-border"><img src="/academy/img/guides/styling/select_style.jpg" alt="Select STYLE for a map layer" /></span>

    A list of style options, based on your data, appears. 

5. Style the polygon options by geometry, or by column values

    **Note:** All columns from your data are counted and appear as a single polygon geometry, no other aggregation styles apply.
    
    <span class="wrap-border"><img src="/academy/img/guides/styling/polygon_style_options.jpg" alt="Polygon style options" /></span>

    The following style options are available for polygon geometries:

    Polygon Style Options | Description
    --- | ---
    FILL | Contains the polygon fill color and opacity. You can select fill options by attribute or by column value
     | **Fill color by solid value** -  Click on the fill color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and edit the fill opacity<br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
     | **Fill color by column value** - Click on the fill color to view the solid color values, then click _BY VALUE_ to select a data column<br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder<br /><br>**Note:** If a number column is selected, you can edit the [buckets and quantification](#style-by-quantification) for the selected column
   STROKE | Contains the line width, line color, and line opacity for the sides of the polygon. _Polygon stroke options can only be selected by fixed and solid values_<br /><br>**Stroke size by fixed value** - Click on the stroke number to view the fixed values. You can use the slider bar to select a width, or type a width in the input field<br /><br><img src="/academy/img/guides/styling/polygon_stroke_size.jpg" alt="Polygon stroke size by fixed value" />
     | **Stroke color by solid value** - Click on the stroke color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and edit the stroke opacity<br /><br><img src="/academy/img/guides/styling/polygon_stroke_color.jpg" alt="Polygon stroke color by fixed value" /><br /><br>**Tip:** See [Style by Color](#style-by-color) for details about styling colors in the Builder
    BLENDING | Edit how the colors of overlapping geometries interact with one another. See [CartoCSS Composite Operations](https://carto.com/docs/carto-engine/cartocss/composite-operations/) for a description of composite operation effects.
    LABELS | Enable labels to appear on your map, and control how the labels are styled. See [Label Styles](#label-styles) for details
    
    **Tip:** You can double-click the undo and redo arrow buttons after applying style options, located at the bottom of the STYLE section of the Builder.

    <span class="wrap-border"><img src="/academy/img/guides/styling/undo_redo_buttons.jpg" alt="Undo Redo arrow buttons for style changes" /></span>

6. Optionally, click the slider button to view the style options as CartoCSS syntax

    See [CartoCSS Syntax](https://carto.com/docs/carto-engine/cartocss/) for details on how to apply custom styles with CartoCSS.

7. Click <img src="/academy/img/common/back_navigaton_arrow.jpg" alt="Back navigation arrow" />, next to the layer name at the top of the Builder, to navigate back to the LAYERS section

8. If your map is published, update it to show your style edits

    For more details about the publishing behavior, see [Publishing and Sharing Maps](/docs/carto-builder/publishing-and-sharing-maps/).

## Label Styles

When the _LABELS_ option is enabled from the STYLE options of a selected map layer, there are additional options to style how labels appear on your map. 

_**Note**: The LABELS? option appears for all geometries and aggregation styles, with the exception of point data with PIXEL aggregation._

<span class="wrap-border"><img src="/academy/img/guides/styling/labels.jpg" alt="Label style options in the Builder" /></span>

The following animation options are available:

Label Option | Description
--- | ---
COLUMN | Select the column to act as a map label
FONT | Select the label font. See a list of the [supported fonts](#supported-fonts)
SIZE/COLOR | Select the size and color of the label. See the FILL style description for how to access the size and color options
HALO | Edit the color and width of the text shadow. This is helpful for increasing readability
OFFSET | Edit how far the label text sits from the geometry. Positive values display the label below the marker, negative values display the label above the marker. If set to `0`, the geometry appears directly under the corresponding label
OVERLAP | Shows or hides overlapping labels. If set to `false`, it does not allow labels to overlap, and overlapping labels are hidden
PLACEMENT | Controls the placement of the label:<br /><br>- point (places labels on top of points)<br /><br>- line (is placed along multiple lines or border, repeatedly)<br /><br>- vertex (is placed on the vertexes of points, repeatedly)<br /><br>- interior (is placed in the interior, inside a point (or polygon). The label remains in place, even if the center is outside of the geometry)

### Supported Fonts

The following fonts are supported for map labels.

<span class="wrap-border"><img src="/academy/img/guides/styling/fonts.jpg" alt="Support label fonts in the Builder" /></span> 

_**Note:** To avoid errors, you **must** select a COLUMN name before switching fonts._

The following font families, and weights for each font family, are supported in the Builder.

- **Open Sans**  
Light, Regular, Semibold, Bold, Extrabold, Light Italic, Italic, Semibold Italic, Bold Italic, Extrabold Italic

- **DejaVu Sans**  
ExtraLight, Book, Oblique, Bold, Bold Oblique, Condensed, Condensed Oblique, Condensed Bold, Condensed Bold Oblique

- **DejaVu Serif**  
Book, Italic, Bold, Bold Italic, Condensed, Condensed Italic, Condensed Bold, Condensed Bold Italic

- **Lato**  
Hairline,  Hairline Italic, Light, Light Italic, Regular, Italic, Bold, Bold Italic, Black, Black Italic

- **Graduate**  
Regular

- **Gravitas One**  
Regular

- **Old Standard TT**  
Regular, Italic, Bold

- **unifont**  
Medium

**Tip:** You can apply the `text-face-name: 'string'` property with [CartoCSS syntax](/docs/carto-engine/cartocss/properties/#text-face-name-string).

## Style by Color

When color options appear, you can apply colors by attributes or by a column value. When selecting a column value, the resulting style options vary- depending on the data type (number, string, date, boolean) of the column you selected. This section displays some examples of how the color selection process works.

**Note:** Color selection options appear for FILL and STROKE fields in the STYLE section of the Builder. Note that some options may not appear, depending on your geometry. See Style by [Point](#style-point-layers), [Line](#style-line-layers), or [Polygon](#style-polygon-layers) for details about which options appear based on your data.

- **Color by solid attributes** - Click on the color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and edit the opacity. The following example image displays how to select color by solid attributes.

    <span class="wrap-border"><img src="/academy/img/guides/styling/stroke_color_fixed.jpg" alt="Stroke color by fixed value" /></span> 
    
- **Color by column value** - Click on the color to view the solid color values and switch to _BY VALUE_, to select a data column

    - If a _number_ column is selected, scroll to view and select a color ramp. Optionally, click _Custom color set_ to customize the selected color ramp with your own hex and RGB colors

      <span class="wrap-border"><img src="/academy/img/guides/styling/stroke_color_columns.jpg" alt="Stroke color by column" /></span> 

    **Tip:** You can edit the [buckets and quantification](#style-by-quantification) for the selected number column

    - If a _string_ or _boolean_ column is selected, a list of available values appears, and you can customize the color for the selected value

      <span class="wrap-border"><img src="/academy/img/guides/styling/stroke_color_by_string.jpg" alt="Stroke color by string column" /></span> 

**Tip:** For more information about applying color to data, see the related _Map Academy_ lesson about how [_Color palettes tell a story_](https://carto.com/academy/courses/intermediate-design/choose-colors-2/).

## Style by Quantification

Choose the way that data is divided into "buckets" to display groups of data. The higher the number of buckets, the more granular the data. See [GIS Data Classifications in Cartographica](http://blog.cartographica.com/blog/2010/8/16/gis-data-classifications-in-cartographica.html) for more information and data quantification. The objective of grouping data into buckets is to put similar values together.

Each bucket is assigned a [color palette](#style-by-color). You can edit the number of buckets and the quantification method for a value, and modify the selected color palette or create your own custom color set.

The following quantification options are available through the Builder STYLE options, when styling options by column values.

Quantification Methods | Description
--- | ---
Quantile | Creates each group with an equal number of discrete units. The discrete units are gathered from the distinct possible values of your data
Jenks | Increases the standard deviation between each group of data while decreasing the standard deviation within each group. In other words, it increases the similarity within a given group in conjunction with the differences from each of the other groups. The Jenks method shuffles data across each group until it detects an optimization
Equal interval | Calculates the range of your data, and divides the total, into equally-sized subranges for your desired number of groups
Heads/Tails | Creates a break-point at the mean of your data, removes all data below the break-point, and creates the next break-point from the data above the first break-point. It repeats the break process until either a single value is left above the break-point, or if it reaches the desired number of breaks

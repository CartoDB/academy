## Style by Color

When color options appear, you can apply colors by attributes or by a column value. When selecting a column value, the resulting style options vary- depending on the data type (number, string, date, boolean) of the column you selected. This section displays some examples of how the color selection process works.

**Note:** Color selection options appear for FILL and STROKE fields in the STYLE section of the Builder. Note that some options may not appear, depending on your geometry. See Style by Point, Line, or Polygon for details about which options appear based on your data.

- **Color by solid attributes** - Click on the color to view the solid color values. You can choose the color family and select a color by clicking your mouse anywhere within the color viewer. You can also type in the hex or RGB color code and edit the opacity. The following example image displays how to select color by solid attributes.

    <span class="wrap-border"><img src="/academy/img/guides/styling/stroke_color_fixed.jpg" alt="Stroke color by fixed value" /></span> 
    
- **Color by column value** - Click on the color to view the solid color values and switch to _BY VALUE_, to select a data column

    - If a _number_ column is selected, scroll to view and select a color ramp. Optionally, click _Custom color set_ to customize the selected color ramp with your own hex and RGB colors

      <span class="wrap-border"><img src="/academy/img/guides/styling/stroke_color_columns.jpg" alt="Stroke color by column" /></span> 

    **Tip:** You can edit the [buckets and quantification](#style-by-quantification) for the selected number column

    - If a _string_ or _boolean_ column is selected, a list of available values appears, and you can customize the color for the selected value

      <span class="wrap-border"><img src="/academy/img/guides/styling/stroke_color_by_string.jpg" alt="Stroke color by string column" /></span> 

**Tip:** For more information about applying color to data, see the related _Map Academy_ lesson about how [_Color palettes tell a story_](https://carto.com/academy/courses/intermediate-design/choose-colors-2/).

- Reverse the color ramp. By default, color ramps are shown from dark (representing high values) to to light (represented by low values). There also so diverging color ramps to represent categories. Click the toggle arrows to switch the color ramp from dark (high values) to light (low values)

	<span class="wrap-border"><img src="/academy/img/guides/heatmaps/reverse_color_ramp.jpg" alt="Reverse color ramp to show intensity" /></span>

	**Tip:** Toggling the color ramp is also useful if you have a dark background. Reversing the color ramp can help better visualize the results. For details, see [5 CARTOGRAPHIC TIPS FOR YOUR DATA OBSERVATORY MAPS](https://carto.com/blog/cartography-data-extract-value/).

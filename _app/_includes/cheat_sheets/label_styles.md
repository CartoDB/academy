## Label Styles

When the _LABELS_ option is enabled from the STYLE options of a selected map layer, there are additional options to style how labels appear on your map. 

_**Note**: The LABELS? option appears for all geometries and aggregation styles, with the exception of point data with PIXEL aggregation._

<span class="wrap-border"><img src="/academy/img/guides/styling/labels.jpg" alt="Label style options in the Builder" /></span>

The following label options are available:

- COLUMN - Select the column to act as a map label

- FONT - Select the label font. See a list of the [supported fonts](#supported-fonts)

- SIZE/COLOR - Select the size and color of the label. See the FILL style description for how to access the size and color options

- HALO - Edit the color and width of the text shadow. This is helpful for increasing readability

- OFFSET - Edit how far the label text sits from the geometry. Positive values display the label below the marker, negative values display the label above the marker. If set to `0`, the geometry appears directly under the corresponding label

- OVERLAP - Shows or hides overlapping labels. If set to `false`, it does not allow labels to overlap, and overlapping labels are hidden

- PLACEMENT - Controls the placement of the label:

	- point (places labels on top of points)
	- line (is placed along multiple lines or border, repeatedly)
	- vertex (is placed on the vertexes of points, repeatedly)
	- interior (is placed in the interior, inside a point (or polygon). The label remains in place, even if the center is outside of the geometry)

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
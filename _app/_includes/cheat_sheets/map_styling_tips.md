## Map Styling Tips

Note the following tips when styling map layers in the Builder.

- Each section of the STYLE options is numbered, to guide you through the workflow

- Aggregations are based on your data geometry (point, line, polygons), so not all options may appear when you are styling a map layer

  - For point geometries, you can select the [aggregation](#aggstyle) style of your data. These aggregation styles contain their own CartoCSS property, which you can further customize based on the overall spatial pattern of your map

  - Line and Polygon geometries are automatically styled based on simple resolutions and do not contain any additional aggregation options 

- You can style options by geometry attributes, or by a column value. When selecting a column value, the resulting style options vary- depending on the data type (number, string, date, boolean) of the column you selected

- You can rename each layer to make it more intuitive. You can also hide other layers and focus on styling one layer at a time

- The order of the layers reflects the order in which they are visualized. You may need to adjust the styling for each layer to accommodate conflicting features. For example, suppose you have one fully opaque layer over another one, you may be unable to view the data under the opaque layer. Additionally, if you have pop-ups enabled for multiple layers, only the top layer pop-up is displayed in areas where the bottom layer covered (by the top layer)
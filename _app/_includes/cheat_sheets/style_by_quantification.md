## Style by Quantification

Choose the way that data is divided into "buckets" to display groups of data. The higher the number of buckets, the more granular the data. See [GIS Data Classifications in Cartographica](http://blog.cartographica.com/blog/2010/8/16/gis-data-classifications-in-cartographica.html) for more information and data quantification. The objective of grouping data into buckets is to put similar values together.

Each bucket is assigned a [color palette](#style-by-color). You can edit the number of buckets and the quantification method for a value, and modify the selected color palette or create your own custom color set.

The following quantification options are available through the Builder STYLE options, when styling options by column values.

- Quantile - Creates each group with an equal number of discrete units. The discrete units are gathered from the distinct possible values of your data

- Jenks - Increases the standard deviation between each group of data while decreasing the standard deviation within each group. In other words, it increases the similarity within a given group in conjunction with the differences from each of the other groups. The Jenks method shuffles data across each group until it detects an optimization

- Equal interval - Calculates the range of your data, and divides the total, into equally-sized subranges for your desired number of groups

- Heads/Tails - Creates a break-point at the mean of your data, removes all data below the break-point, and creates the next break-point from the data above the first break-point. It repeats the break process until either a single value is 
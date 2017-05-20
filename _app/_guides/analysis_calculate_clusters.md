---
title: "Analysis - Calculate Clusters of Points"
description: Describes how to spatially separate a layer of points into a specified number (N) of groups with the CARTO Builder.
permalink: /courses/guides/calculate-clusters-of-points/
---

# Analysis - Calculate Clusters of Points

This guide describes how to find natural groupings of points based on their proximity to one another. The analysis partitions each point into a group, so that the point lies closer to the center of each group than the center of any other group.

This analysis produces a new column, `cluster_no` (cluster number). Each row of your dataset will be classified from 0 to n-1, where n is the number of clusters that were chosen in the Builder.

In its determination of closeness, this method uses ["as the crow flies"](https://en.wikipedia.org/wiki/As_the_crow_flies) distances, instead of using an underlying transit network.

## Example

To determine store locations, this analysis demonstrates the grouping of proximal points based on the classification given through _Calculate cluster of points_.

<iframe width="100%" height="520" frameborder="0" src="https://team.carto.com/u/mamataakella/builder/b67e8336-7aae-11e6-a52b-0e233c30368f/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

### Results

The results of this analysis show distinct regions in the city of Portland. The centers of these regions, which can be found by using the Centroid Analysis, represent locations that by distance are the optimal position for a store to service all of the points classified by that cluster number.

## Cartography Tip

Since this method classifies each point by which cluster number if falls into, a qualitative color palette is applied, where each output point is assigned a unique color based on the `category` attribute.

### CartoCSS Styling

The following CartoCSS code can be applied in the Builder, as a best practice for styling _Calculate clusters to points_ data.

{% highlight scss %}
#layer {
marker-width: 7;
 	marker-fill: ramp([cluster_no], cartocolor(Pastel), category(6));
	marker-line-width: 1;
	marker-line-color: #555;
	marker-line-opacity: 1;
	marker-allow-overlap: true;
}
{% endhighlight %}

## External Resources

- [ClusterWithin](http://postgis.net/docs/manual-2.2/ST_ClusterWithin.html) in PostGIS
- [DBSCAN](http://postgis.net/docs/manual-dev/ST_ClusterDBSCAN.html) in PostGIS
- [k-means](http://postgis.net/docs/manual-dev/ST_ClusterKMeans.html) in PostGIS

	**Tip:** k-means is a statistical clustering technique which aims to find k means, (in this case mean latitude and longitude) for the n data points in a dataset.

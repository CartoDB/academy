---
title: "Analysis - Detect Outliers and Clusters"
description: Describes how to use Moran's I to find high (HL) and low (LH) outliers, and high (HH) and low (LL) clusters, with the CARTO Builder.
permalink: /courses/guides/detect-outliers-and-clusters/
---

# Analysis - Detect Outliers and Clusters

This guide describes how to analyze your dataset to find regions where high or low attribute values are clustered, and where high/low values are adjacent to low/high values. It also indicates if the clusters are statistically significant (not due to chance). This technique looks for these correlations by looking at a geography's attribute value, and the values in its geographical neighborhood, as compared to the entire dataset.

This analysis is primarily used as an exploratory data analysis tool to uncover statistically significant patterns in data. It often is used to build inferences about the underlying data and is usually a stepping-off point for more in-depth analysis, such as regression.

## Example

The _Detect outliers and clusters_ analysis finds:

- Areas where there are regions of high tweet activity (dark red color)
- Regions of low tweet activity (dark blue color)
- Light blue color indicates low tweet activity in areas with high activity (outliers)
- Light red color indicates high tweet activity in areas with low activity (outliers)

<iframe width="100%" height="520" frameborder="0" src="<<<<<<<<<<<<<<" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

<span class="wrap-border"><img src="/academy/img/guides/detect_outliers/example.jpg" alt="Example of Detect outliers and clusters analysis map" /></span>

**NEED IMAGE FROM MAMATA- placeholder is a static image from the research google doc**

### Results

The _quads_ and _significance_ are the most important results of the _Detect outliers and clusters_ analysis, that are added to your dataset.

- Column quads take any of the following: `HH`, `LL`, `HL`, and `LH`. The interpretation of these is as follows: 

	- The first letter is the geography compared to the entire dataset (i.e., is it high compared to the dataset's average)
	- The second letter is how the average of the neighbors of the geography compare to the entire dataset

	For example, if a county has a value of 10, its neighbors have an average of 6, and the dataset as a whole has an average of 2, then the classification would be `HH`.

- Significance measures whether the pattern of values in the geography could be better attributed by random chance. The higher the significance value, the more clustering appears. The lower the significance value, more random distributions are considered

	- In general, if all of the values were randomly distributed, there would not be significant spatial patterns
	- If there is an underlying process driving the distribution of values (e.g., economic patterns which drive median income), then areas will likely be highlighted as having significant features

## Cartography Tip

The color palette has been ramped according to the significance level in this analysis, based on the quadrant results, `HH`, `LL`, `HL`, and `LH`.

### CartoCSS Styling

The following CartoCSS code can be applied in the Builder, as a best practice for styling _Detect outliers and clusters_ data.

{% highlight scss %}
#layer {
  	polygon-fill: ramp([quads], (#ac4166,#df749d,#6ba3d9,#3c6ea9), ("HH", "HL", "LH", "LL"));
  	polygon-opacity: 0.9;
  	polygon-gamma: 0.5;
  	line-width: 0.5;
  	line-color: #FFF;
  	line-opacity: 0.25;
}
{% endhighlight %}

## External Resources

- [PySal Local Moran's I](https://pysal.readthedocs.io/en/v1.11.0/users/tutorials/autocorrelation.html#local-moran-s-i)

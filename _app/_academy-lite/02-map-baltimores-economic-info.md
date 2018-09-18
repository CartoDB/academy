---
title: "Academy Lite — Using the Data Observatory to Map Baltimore's Economic Data"
permalink: /courses/academy-lite/data-observatory-baltimore-economy/
lesson_message: "Congratulations! You've mapped Baltimore's economic data in CARTO using the Data Observatory!"
---

## Baltimore Economic Data through the Data Observatory

<iframe width="100%" height="520" frameborder="0" src="https://public.carto.com/builer/543510f6-7e25-4958-bfe6-25b69325a54b/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

In this Academy Lite lesson, we will learn how to create a map of economic data for the City of Baltimore in a small number of steps by using CARTO's [Data Observatory](https://carto.com/data-observatory/). If you want to go the extra mile and create a dashboard like above, checkout [DeepInsights.js](https://github.com/CartoDB/deep-insights.js).

### Get our boundaries

Create an empty table, rename it to `baltimore_economic_data`.

To get boundaries, we can find out our options by looking in the [Data Observatory catalog](https://cartodb.github.io/bigmetadata/observatory.pdf) or using the [`OBS_GetAvailableBoundaries`](https://carto.com/docs/cartodb-platform/data/discovery-functions/#obsgetavailableboundariespointgeometry) function.

For this map, we will choose `us.census.tiger.census_tract_clipped` to get Cenus tracts which are water-clipped. We can use [`OBS_GetBoundariesByPointAndRadius`](https://carto.com/docs/cartodb-platform/data/boundary-functions/#obsgetboundariesbypointandradiuspoint-geometry-radius-numeric-boundaryid-text) and filter by Baltimore's FIPS (24510), which is the state FIPS (25) plus the county FIPS (510).

This query inserts all of the boundaries into your new table, and stores the GEOIDs of the Census tracts in the column `name`.

{% highlight sql %}
INSERT INTO baltimore_economic_data(the_geom, name)
SELECT *
FROM OBS_GetBoundariesByPointAndRadius(
  CDB_LatLng(39.2904,-76.6122),
  10000 * 1.609,
  'us.census.tiger.census_tract_clipped'
) As m(the_geom, geoid)
WHERE geoid LIKE '24510%'
{% endhighlight %}

### Find the data we want

To find data we're interested in, we can use the discovery function `OBS_Search()`. Since we are building up a dataset of economic indicators for the City of Baltimore, an important first measure is the [GINI Index](https://en.wikipedia.org/wiki/Gini_coefficient), a basic measure of income inequality.

Search for 'gini' using the function `OBS_Search()` like this:

{% highlight sql %}
SELECT *
FROM OBS_Search('gini')
{% endhighlight %}

The temporary output looks like this:

![SELECT * FROM OBS_Search('gini')]({{ site.baseurl }}/img/course5/data-observatory-baltimore/obs_search_with_gini_index.png)

Copy the id of the index you want. In our case, gini corresponds to `us.census.acs.B19083001`.

### Filling in that data to our table

Create a new **NUMERIC** column called `gini_index`, then run this query to fill it with GINI measures from the US Census:
{% highlight sql %}
UPDATE baltimore_economic_data
SET gini_index = OBS_GetMeasure(ST_PointOnSurface(the_geom), 'us.census.acs.B19083001','area','us.census.tiger.census_tract')
{% endhighlight %}

### Searching for more data

Adding more by searching for income:

{% highlight sql %}
SELECT *
FROM OBS_Search('income')
{% endhighlight %}

I'll choose the following:

#### Per Capita Income

Add new NUMERIC column called `per_capita_income`:

{% highlight sql %}
UPDATE baltimore_economic_data
SET per_capita_income = OBS_GetMeasure(ST_PointOnSurface(the_geom), 'us.census.acs.B19301001','area','us.census.tiger.census_tract')
{% endhighlight %}

#### Percent Income Spent on Rent

Add new NUMERIC column called `percent_income_on_rent`:

{% highlight sql %}
UPDATE baltimore_economic_data
SET percent_income_on_rent = OBS_GetMeasure(ST_PointOnSurface(the_geom), 'us.census.acs.B25071001','area','us.census.tiger.census_tract')
{% endhighlight %}

#### Median Household Income

Add new NUMERIC column called `median_household_income`:

{% highlight sql %}
UPDATE baltimore_economic_data
SET median_household_income = OBS_GetMeasure(ST_PointOnSurface(the_geom), 'us.census.acs.B19013001','area','us.census.tiger.census_tract')
{% endhighlight %}

Once all of those measures are added to your table, you're ready to start visualizing your data! I choose the following CartoCSS to style my map:

{% highlight less %}
@1: #123f5a;
@2: #2b6c7f;
@3: #559c9e;
@4: #8eccb9;
@5: #d2fbd4;

#baltimore_economic_data{
  polygon-fill: @5;
  polygon-opacity: 0.9;
  line-color: lighten(@5, 10);
  line-width: 0.5;
  line-opacity: 1;

  [ percent_income_on_rent <= 50] {
     polygon-fill: @1;
     line-color: lighten(@1, 10);
  }
  [ percent_income_on_rent <= 40.4] {
     polygon-fill: @2;
     line-color: lighten(@2, 10);
  }
  [ percent_income_on_rent <= 36.3] {
     polygon-fill: @3;
     line-color: lighten(@3, 10);
  }
  [ percent_income_on_rent <= 32.3] {
     polygon-fill: @4;
     line-color: lighten(@4, 10);
  }
  [ percent_income_on_rent <= 27.8] {
     polygon-fill: @5;
     line-color: lighten(@5, 10);
  }
  [ percent_income_on_rent = null ] {
      polygon-fill: #c3c3c3;
      line-color: lighten(#c3c3c3, 10);
  }
}
{% endhighlight %}

Checkout other [Map Academy courses](https://carto.com/academy/) to get more mapping skills. Read more about the Data Observatory in [documentation](https://carto.com/docs/cartodb-platform/data/).

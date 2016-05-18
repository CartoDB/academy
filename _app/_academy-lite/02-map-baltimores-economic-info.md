---
title: "Academy Lite — Using the Data Observatory to Map Baltimore's Economic Data"
permalink: /courses/academy-lite/data-observatory-baltimore-economy/
lesson_message: "Congratulations! You've mapped Baltimore's economic data in CartoDB using the Data Observatory!"
---

## Baltimore Economic Data through the Data Observatory

<iframe width="100%" height="520" frameborder="0" src="https://team.cartodb.com/u/eschbacher/editor/2ebfd01c-1d2f-11e6-85b7-0e31c9be1b51/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

In this Academy Lite lesson, we will learn how to create a map of economic data for the City of Baltimore in a small number of steps. If you want to go the extra mile and create a dashboard like above, checkout [DeepInsights.js](https://github.com/CartoDB/deep-insights.js).

### Get our boundaries

Create an empty table, rename it to `baltimore_economic_data`.

Get Boundaries, filter by Baltimore's FIPS (24510)

{% highlight sql %}
INSERT INTO baltimore_economic_data(the_geom, name)
SELECT *
FROM OBS_GetBoundariesByPointAndRadius(
  CDB_LatLng(39.2904,-76.6122),
  25000 * 1.609,
  'us.census.tiger.census_tract_clipped'
) As m(the_geom, geoid)
WHERE geoid LIKE '24510%'
{% endhighlight %}

### Find the data we want

Search for 'gini' using the function `OBS_Search()` like this:
{% highlight sql %}
SELECT *
FROM OBS_Search('gini')
{% endhighlight %}

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

Add new NUMERIC column called `per_capita_income`:

{% highlight sql %}
UPDATE baltimore_economic_data
SET per_capita_income = OBS_GetMeasure(ST_PointOnSurface(the_geom), 'us.census.acs.B19301001','area','us.census.tiger.census_tract')
{% endhighlight %}

Add new NUMERIC column called `percent_income_on_rent`:

{% highlight sql %}
UPDATE baltimore_economic_data
SET percent_income_on_rent = OBS_GetMeasure(ST_PointOnSurface(the_geom), 'us.census.acs.B25071001','area','us.census.tiger.census_tract')
{% endhighlight %}

Add new NUMERIC column called `median_household_income`:

{% highlight sql %}
UPDATE baltimore_economic_data
SET median_household_income = OBS_GetMeasure(ST_PointOnSurface(the_geom), 'us.census.acs.B19013001','area','us.census.tiger.census_tract')
{% endhighlight %}

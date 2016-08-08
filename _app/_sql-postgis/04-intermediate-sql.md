---
title: "SQL and PostGIS in CARTO — Intermediate SQL"
permalink: /courses/sql-postgis/intermediate-sql/
tweet_text: "I just mapped 311 Rat Complaints!"
lesson_message: "Nice work mapping 311 Rat Complaints using Intermediate SQL!"
---
# Intermediate SQL

### 311 Complaints about Rats
The source of the data used is [NYC's Open Data](https://data.cityofnewyork.us/Social-Services/Rat-Sightings/3q43-55fe)

We can import it more easily via [CartoDB's cached infrastructure](http://eschbacher.cartodb.com/api/v2/sql?q=SELECT%20the_geom,unique_key,created_date,closed_date,agency,agency_name,complaint_type,descriptor,location_type,incident_zip,incident_address,street_name,address_type,city,status,due_date,resolution_action_updated_date,latitude,longitude,borough,community_board%20FROM%20nyc_rat_sightings&format=csv&filename=nyc_rat_sightings)

## Getting Help

The internet is full of people who have had the same problems as you! Use their experince to solve your problems!

**Google foo**

If I want some date to string functions, I search:

```text
postgresql string date
```

Aggregate functions:

```text
postgresql aggregate functions
```

**Always know your version()**

Find your PostgreSQL version:

{% highlight sql %}
SELECT version()
{% endhighlight %}

**StackExchange**

* [Queries and Database questions](http://dba.stackexchange.com/)
* [Geospatial database questions](http://gis.stackexchange.com/)

**Learning resources**

[CartoDB's Map/Data Academy](http://academy.cartodb.com/courses/sql-postgis/)

[Codecademy](https://www.codecademy.com/learn/learn-sql)

**Other resources**

If you don't have your own PostgreSQL instance set up, [SQLFiddle](http://sqlfiddle.com/) is a great place to try out queries. You can even share them with other people.
http://sqlfiddle.com/

## Explore the data using SQL

First, let's see how many rat sightings were reported:

{% highlight sql %}
SELECT count(*)
FROM nyc_rat_sightings
{% endhighlight %}

| count |
|-------|
| 70576 |

We see that there are 70,576 complaints about rats (or we assume they're all complaints).

`count(*)` gives a count of the number of rows. If we want to find out how many rat sightings have a valid position (i.e., `the_geom` is not null), then we can do `count(the_geom)`, like this:

{% highlight sql %}
SELECT
  count(the_geom) As num_sightings_with_location,
  count(*)        As num_sightings
FROM
  nyc_rat_sightings
{% endhighlight %}

(Here we are giving each column an alias using `As new_name` after we define the operation. Also notice that we can liberally use whitespace to reformat for readability.)

|  num_sightings_with_location  | num_sightings |
|--------------------------|--------------------|
|          70576               |     70131 |

Notice that the numbers are different. We can check with a `WHERE` condition to see if we get 70576 - 70131 = 445:

{% highlight sql %}
SELECT
  count(*),
  CASE WHEN count(*) = 445 THEN '\o/' ELSE ':(' END As result
FROM
  nyc_rat_sightings
WHERE
  the_geom IS NULL
{% endhighlight %}

Result:

| count | result |
|-------|--------|
|  445  |   \o/  |

## Exploring time

Now that we know the number of sightings (~70k), how many is that per year?

We can use the aggregate functions `max` and `min` on the date columns to find out!

{% highlight sql %}
SELECT
  max(created_date),
  min(created_date)
FROM nyc_rat_sightings
{% endhighlight %}

|          max           |          min    |
|---------------------|----------------------------|
| 12/31/2015 12:00:00 AM |  01/01/2010 02:15:27 PM |

So we see that this dataset covers 2010 through 2015 sightings -- six complete years but is strangely tied to beginning and end of the year. Upon closer investigation, we have dates in 2016.

But notice that `created_date` is a **string**! Postgres supports some fancy operations on `date` types, so we should probably convert to the `timestamp` format. CartoDB has an easy type converter built-in, but if you want to be careful over how it's converted, you may want to use a PostgreSQL function like [`to_timestamp`](http://www.postgresql.org/docs/9.3/static/functions-formatting.html) like this:

{% highlight sql %}
-- Create a new column of type timestamp
ALTER TABLE nyc_rat_sightings
ADD COLUMN created_date_timestamp TIMESTAMP;

-- Fill in string -> timestamp converted values
UPDATE nyc_rat_sightings
SET created_date_timestamp = to_timestamp(created_date, 'MM/DD/YYYY HH12:MI:SS AM')
WHERE created_date IS NOT NULL AND created_date <> '';
{% endhighlight %}

That's the safe way to do it because you don't alter the original column. If you want to live on the edge and alter the column type in place, you can run this:

{% highlight sql %}
ALTER TABLE
  nyc_rat_sightings
ALTER COLUMN
  created_date TYPE TIMESTAMP USING to_timestamp(created_date,'MM/DD/YYYY HH12:MI:SS AM')
WHERE created_date IS NOT NULL AND created_date <> ''
{% endhighlight %}

Let's try finding the max/min times again:

{% highlight sql %}
SELECT
  max(created_date_timestamp),
  min(created_date_timestamp)
FROM nyc_rat_sightings
{% endhighlight %}

|            max      |           min       |
|----------------------|----------------------|
| 2016-01-10T01:55:47Z | 2010-01-01T08:29:58Z |

Now we have the real max min from the data set, not the dates alphabetically.


We can also use these max/min values to find the number of days in the range:

{% highlight sql %}
SELECT
  max(created_date_timestamp) - min(created_date_timestamp) As num_days
FROM
  nyc_rat_sightings
{% endhighlight %}

| num_days |
|----------|
|   2200   |

## Finding which borough has the largest number of rat sightings

All of the aggregate functions used so far have acted on the entire table... What if we want to look at aggregates over groups, such as which borough the sighting was in? We use the SQL clause `GROUP BY`!

{% highlight sql %}
SELECT borough, count(*)
FROM nyc_rat_sightings
GROUP BY borough
{% endhighlight %}

Result:

|count|borough|
|-------|----------|
|23302|BROOKLYN|
|18953|MANHATTAN|
|14501|BRONX|
|10242|QUEENS|
|3577|STATEN ISLAND|
|1|Unspecified|


Notice after the `SELECT` that we need to either include the column(s) which appear in the GROUP BY, or use an aggregate function over the other column(s). For example, this would fail because `community_board` isn't in an aggregate or the `GROUP BY`:

{% highlight sql %}
SELECT
  borough,
  count(*),
  community_board
FROM
  nyc_rat_sightings
GROUP BY
  borough
{% endhighlight %}

If you wanted to aggregate over a string as well, you could do [`string_agg`](http://www.postgresql.org/docs/9.3/static/functions-aggregate.html).

BUT, if you want groups within groups, you can specify multiple columns in the GROUP BY. This gives you counts

## Working with dates and time

Dates can be tricky to work with but thankfully PostgreSQL has a number of functions that can help us out. The two most useful of which are `date_part` and `date_trunc`.

`date_part` allows you to grab part of the date. For example, the year, the month, the day of the week, etc. Let's say we wanted to know how many rats where sighted on Mondays (day number 1 in PostgreSQL -- the number of days starts at Sunday):

{% highlight sql %}
SELECT
    count(*)
FROM
    nyc_rat_sightings
WHERE
    date_part('dow', created_date_timestamp) = 1
{% endhighlight %}

Or let's say you wanted to know how many rat sightings for each hour of the day there where you could use `date_part('hour', created_date_timestamp)`

{% highlight sql %}
SELECT
    date_part('hour', created_date_timestamp) as hour,
    count(*) as count_per_hour
FROM
    nyc_rat_sightings
GROUP BY
    date_part('hour', created_date_timestamp)
ORDER BY
    hour
{% endhighlight %}

Finally, we can use `date_trunc` to truncate a date to a given precision. So for example let's say we wanted to create counts for rat sightings by hour each day, we could do:

{% highlight sql %}
SELECT
    date_trunc('hour', created_date_timestamp) as time,
    count(*) as count_per_hour
FROM
    nyc_rat_sightings
GROUP BY
    date_trunc('hour', created_date_timestamp)
ORDER BY
    date_trunc('hour', created_date_timestamp)
{% endhighlight %}

For a full list of functions that can be used with dates and times check out the [documentation](http://www.postgresql.org/docs/9.3/static/functions-datetime.html).


## Working with Strings

Just like dates SQL has a number of functions for matching and working with strings. The simplest of which is to concatenate strings. Lets say we wanted to create a full address from the table, we currenlty have it spread out over the incident_address, borough and city fields. Lets smoosh these in to one field with the parts of the address joined by the character '/' using the || operator in PostgreSQL


{% highlight sql %}
SELECT
  incident_address || ' / ' || borough || ' / ' || city AS full_address
FROM
  nyc_rat_sightings
{% endhighlight %}

We can use WHERE to match on strings like we have already seen but we dont have to match to the exact string. Lets try and get all of the sightings in places where famalies live. In the Location_type column we have entries like "1-2 Family Dwelling" or "3+ Family Apt. Building". To get all of them we could make a list of strings that indicate a family lives there or we can simple us the like
operator

{% highlight sql %}
SELECT * FROM nyc_rat_sightings
WHERE location_type LIKE '%Family%'
{% endhighlight %}

The LIKE command allows you to write a string with wildcards. A _  matches any one character and  %  matches any number of characters, so '%Family%' matches any string with 'Family' in it at any point. This is really powerful to get more info on pattern matching check out the [docs](http://www.postgresql.org/docs/8.3/static/functions-matching.html).

Finally lets aggregate by the number of people dwelling in the buiilding. This is contained at the start of the string '1-2 Family Dwelling' so how do we get at it? Well we can split strings using the
split_part function

{% highlight sql %}
SELECT split_part(location_type, ' ', 1)
FROM nyc_rat_sightings
WHERE location_type LIKE '%Family%'
{% endhighlight %}

Split part takes a string to split on, what to split it with ' ' and which part of the split to return. Finally lets aggregate


{% highlight sql %}
SELECT
  split_part(location_type, ' ', 1) as occupancy,
  count(*) as rat_num
FROM
  nyc_rat_sightings
WHERE
  location_type LIKE '%Family%'
GROUP BY
  split_part(location_type, ' ', 1)
{% endhighlight %}
Awesome so we now see that for family homes with 1-2 people there where 15,166 sightings and for 3+ there where 33875.

| occupancy | rat_num |
|-----------|---------|
|    1-2    |  15166  |
|    3+     |  33875  |


For more info on string functions in PostgreSQL check out the [documentation](http://www.postgresql.org/docs/9.3/static/functions-string.html).

## Visualize the number of rat complaints in each borough

Let's use our `GROUP BY`s to look at how boroughs compare. Let's do the normal group by, but this time find the center of the complaints in each borough (a kind of center of mass of complaints).

{% highlight sql %}
SELECT
  min(cartodb_id) As cartodb_id,
  count(*) As num_sightings,
  ST_Transform(ST_Centroid(ST_Collect(the_geom)),3857) As the_geom_webmercator,
  borough
FROM
  nyc_rat_sighting
GROUP BY
  borough
{% endhighlight %}

Some of the magic happening here is in the PostGIS function [`ST_Centroid`](http://postgis.net/docs/ST_Centroid.html), which calculates the 'center of mass' of the geometry into a latitude/longitude point. The aggregate function that allows us to use `the_geom` is [`ST_Collect()`](http://postgis.net/docs/ST_Centroid.html).

We can visualize this in CartoDB by making a 'bubble map' that sizes the marker by an attribute, such as the number of sightings. But we can do more.

## Exploring time and space

Now that we have some summary information about rats and boroughs, let's go farther!

What about breaking them out by borough _and_ year? This way we can see trends in complaint data.

One thing we need ahead of time is the center of all the boroughs that we used in the last query. Since this will change year by year, we should use one for all years so they are neatly stacked.

{% highlight sql %}
-- Find centers of sightings by borough (all years)
WITH centers As (
  SELECT
    ST_Transform(ST_Centroid(ST_Collect(the_geom)),3857) As borough_centers,
    borough
  FROM
    nyc_rat_sightings
  GROUP BY
    borough
)

-- grab all of the values we need
SELECT
  min(n.cartodb_id) As cartodb_id,
  n.borough As borough,
  count(*) As num_sightings,
  date_part('year', created_date_timestamp) As year,
  150.0 * sqrt(count(*) / 6000.0) As symbol_size,
  c.borough_centers As the_geom_webmercator
FROM
  nyc_rat_sightings As n
 JOIN
  centers As c
 ON c.borough = n.borough
GROUP BY
  n.borough,
  date_part('year', created_date_timestamp),
  c.borough_centers
ORDER BY
  num_sightings DESC
{% endhighlight %}

Proportional symbol maps symbolize attributes by having the marker have an area proportional to a quantity -- in our case that's number of complaints. In our case, we know roughly that the max number of complaints in any of the boroughs is around 6000, so we normalize all years by that number and then take the square root (since area is proportional to r^2).

Now we can make a category map off of the `year` column, and then do a rough proportional symbol map off of the number of complaints. Here's a good styling for that (with help from our colleague Mamata):

{% highlight css %}
/** Proportional symbol styling */

@1: #75445C;
@2: #AF6458;
@3: #D5A75B;
@4: #D5C155;
@5: #736F4C;
@6: #5b788e;
@7: #4C4E8F;

Map {
    buffer-size: 255;
}

#nyc_rat_sightings {
   marker-fill-opacity: 1;
   marker-line-color: #FFF;
   marker-line-width: 0;
   marker-line-opacity: 1;
   marker-placement: point;
   marker-type: ellipse;
   marker-width: [symbol_size];
   marker-allow-overlap: true;
   [zoom=8]{marker-width: [symbol_size]*0.25;}
   [zoom=9]{marker-width: [symbol_size]*0.5;}
   [zoom=11]{marker-width: [symbol_size]*2;}
   [zoom=12]{marker-width: [symbol_size]*4;}
   [zoom=13]{marker-width: [symbol_size]*8;}
}

#nyc_rat_sightings[year=2010] {
   marker-fill: @1;
}
#nyc_rat_sightings[year=2011] {
   marker-fill: @2;
}
#nyc_rat_sightings[year=2012] {
   marker-fill: @3;
}
#nyc_rat_sightings[year=2013] {
   marker-fill: @4;
}
#nyc_rat_sightings[year=2014] {
   marker-fill: @5;
}
#nyc_rat_sightings[year=2015] {
   marker-fill: @6;
}
#nyc_rat_sightings[year=2016] {
   marker-fill: @7;
}
{% endhighlight %}

If you want to make way better proportional symbol maps, check out [this blogpost](http://blog.cartodb.com/proportional-symbol-maps/) by our colleague Mamata Akella.

[![](http://i.imgur.com/WBNqKls.png)](https://team.cartodb.com/u/eschbacher/viz/09fcb7e0-b948-11e5-a80a-0ea31932ec1d/embed_map)

Check out the [final map](https://team.cartodb.com/u/eschbacher/viz/09fcb7e0-b948-11e5-a80a-0ea31932ec1d/embed_map "Proportional symbol map visualizing the number of reported rat sightings").

## Resources

* [CartoDB's Map Academy](http://academy.cartodb.com/courses/sql-postgis/)
* [PostgreSQL documentation (the good stuff)](http://www.postgresql.org/docs/9.5/static/)
* [PostGIS documentation](http://postgis.net)
* [DBA StackExchange](http://dba.stackexchange.com)
* [GIS StackExchange](http://gis.stackexchange.com)

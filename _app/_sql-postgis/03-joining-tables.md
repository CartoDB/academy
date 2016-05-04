---
title: "SQL and PostGIS in CartoDB — JOINs in SQL and PostGIS"
redirect_from: /courses/04-sql-postgis/lesson-3.html
permalink: /courses/sql-postgis/joining-data/
---
# JOINs in SQL and PostGIS

Joining data in CartoDB is a very common task. Not all joins are equal though, and the one you use is going to depend a lot on your data and what you want to create. This lesson will walk you through some common `JOIN` methods in CartoDB. In each section, we will show you how to join the data using SQL on-the-fly, and then show you how to write the result of a join into your table.

## Join two tables by a shared value in each row

This is the type of join you perform when you have a value (such as, country ISO codes) in two tables and you want to match rows from one table (e.g. `iso_code='USA'`) to the same value in a second table (e.g. `iso='USA'`). The column name does not matter, just the content!

### table_1

cartodb_id | the_geom | iso_code
--- | --- | ---
1 | Polygon... | USA
2 | Polygon... | BRA
3 | Polygon... | BEL
4 | Polygon... | GAB

### table_2

cartodb_id | iso | population
--- | --- | ---
1 | PBRA | 302
2 | USA | 188
3 | GAB | 99
4 | BEL | 876

The above tables display a good example of matching values for joining data. Suppose that you have some polygons for your world borders stored in `table_1`, but you have already uploaded a separate CSV (`table_2`) with a value that you need for your map. Run the following JOIN command:

{% highlight sql %}
SELECT table_1.the_geom,table_1.iso_code,table_2.population
FROM table_1, table_2
WHERE table_1.iso_code = table_2.iso
{% endhighlight %}

Notice that it does not matter that the column values in the two tables are different, (`iso_code` versus `iso`), we were still able to join the data. From the CartoDB Editor DATA VIEW, you can now use _Merge with dataset_ from the Edit drop-down menu to create a new dataset with this data. Otherwise, we can write it into the first table with the following steps:

1. From the DATA VIEW, create a new column in `table_1`, called 'population', and make it of type 'number'. You can do this by clicking the drop down arrow at the top of any column and selecting _Add new column_

2. Check in `table_2` and be sure that under the population column, the type is `Number`. If it says `String`, change it

3. Click `String`, ensure it is a `Number` type, and accept the warning

4. Run this SQL query:

{% highlight sql %}
UPDATE table_1
SET population = table_2.population
FROM table_2
WHERE table_1.iso_code = table_2.iso
{% endhighlight %}

**Note:** There is another variation that does the same action, and it might be simpler to write:

{% highlight sql %}
UPDATE table_1 as t1
SET population = (
  SELECT population
  FROM table_2
  WHERE iso = t1.iso_code
  LIMIT 1
)
{% endhighlight %}

The second example is a subquery, so for each row of `table_1`, it runs the query inside the parentheses. You will notice some neat tricks in this example query:

- `t1` is used as an alias for `table_1`, so we do not have to write the full name multiple times.
- `LIMIT` indicates that the second query only gives back one result per row, otherwise we might receive an error if the second table contains multiple values for some countries. **Note:** Depending on your data, it may not be good to add a `LIMIT` because you will want to somehow combine all the resulting rows into one answer. If that is your case, keep reading!


## Join two tables by aggregating the shared values in a second table

Suppose you have many values in a second table, and you want to get some collection of their values with a shared column match from the first table. We will use a function (`SUM`, `AVG`, `MIN`, `MAX`, etc.) to aggregate all values in the second table.

### table_1

cartodb_id | the_geom | iso_code
--- | --- | ---
1 | Polygon... | USA
2 | Polygon... | BRA
3 | Polygon... | BEL
4 | Polygon... | GAB

### table_2

cartodb_id | iso | day | total
--- | --- | ---
1 | BRA | m | 4
2 | BRA | m | 5
3 | BRA | w | 2
4 | USA | m | 2
5 | USA | f | 1

Using this example data, get the sum of all totals in each country, using the following SQL query:

{% highlight sql %}
SELECT
  table_1.the_geom,
  table_1.iso_code,
  SUM(table_2.total) as total
FROM table_1, table_2
WHERE table_1.iso_code = table_2.iso
GROUP BY table_1.iso_code, table_2.iso
{% endhighlight %}

The biggest change now is the use of the `GROUP BY` method. This collapses all rows that have a shared 'iso' value, and then using `SUM` it sums up all the values in total from those collapsed rows! Nice, right? Now, lets add a column to `table_1` called `total` and make it numeric. Now to do the update version of the query:

{% highlight sql %}
UPDATE table_1 as t1
SET total =  (
  SELECT SUM(total)
  FROM table_2
  WHERE iso = t1.iso_code
  GROUP BY iso
)
{% endhighlight %}

Pretty simple. We can do this all day long! [Here](http://www.postgresql.org/docs/9.3/static/functions-aggregate.html) are some other types of aggregate functions that you might be interested in.


## Join two tables by geospatial intersection!

One of the most exciting joins is done by using geospatial intersections. If you have a set of points in one table, and a set of state polygons with `iso_codes` in a second, you could use a geospatial intersection to give each point an ISO code based, on the state they fall in. We can also combine `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, and all other aggregate functions too! Here is some example data:

### table_1

cartodb_id | the_geom | iso_code
--- | --- | ---
1 | Polygon... | USA
2 | Polygon... | BRA
3 | Polygon... | BEL
4 | Polygon... | GAB

### table_2

cartodb_id | the_geom
--- | --- | ---
1 | -58.299992, -33.989619
2 | -56.709986, -34.349959
3 | -56.48602, -30.415987
4 | -57.599957, -30.259614

Let's say we just want to know the total number of points from `table_2` that fall in `table_1`. Easy, let's see the SQL:

{% highlight sql %}
SELECT table_1.the_geom,table_1.iso_code,COUNT(*) as count
FROM table_1, table_2
WHERE ST_Intersects(table_1.the_geom, table_2.the_geom)
GROUP BY table_1.the_geom, table_1.iso_code
{% endhighlight %}

The `ST_Intersects` function is one of the most used commands. Let's run it again, but insert the result into a new column. Start by adding a column to `table_1`, called `total`, and make it numeric. Next, run:

{% highlight sql %}
UPDATE table_1 as t1
SET total =  (
  SELECT COUNT(*)
  FROM table_2
  WHERE ST_Intersects(the_geom, t1.the_geom)
)
{% endhighlight %}

Nifty, right? You can now use this in combination with `SUM`, `AVG`, `MAX`, and so on, to get the values you need from one table into the next.

**Note:** You may not want to join two tables by geospatial interaction for a map you build on Leaflet, it may be better to join two tables dynamically, as described in the next section. 

## Join two tables dynamically

You may not always want to write the result into `table_1`, instead, you may want to query data live from the browser based on something the user is doing. In this case, use the `SELECT` statements. If you are rendering a map with the results, you need to include `the_geom_webmercator` as part of your query. This is CartoDB's hidden reprojection of `the_geom` that makes the final map speedy. Here is the same example (from join two tables by geospatical interaction), modified to include the `the_geom_webmercator` to join the tables dynamically instead:

{% highlight sql %}
SELECT
  table_1.the_geom,
  table_1.iso_code,
  COUNT(*) as count,
  table_1.the_geom_webmercator
FROM table_1, table_2
WHERE ST_Intersects(table_1.the_geom, table_2.the_geom)
GROUP BY table_1.the_geom, table_1.iso_code
{% endhighlight %}


## Join two real datasets

Now, let's run through an example using a couple of real datasets. 

1. Start by getting two datasets ready in your CartoDB account. 

    - Go to your datasets dashboard
    - Click _Data library_
    - Search for the dataset called 'World Rivers' and click _Connect dataset_. This loads the data and opens the DATA VIEW with the resulting table 
    - Click _MAP VIEW_ to see that it is a basic map of some of the worlds large rivers. This comes from [Natural Earth Data](http://naturalearthdata.com). Take note of the dataset/table name that was created, `table_50m_rivers_lake_cen`

2. Repeat the process importing a different table from the _Data library_. 

    - Go back to your datasets dashboard by clicking the _back link_ in the upper left
    - This time, import the 'World Borders' dataset from the Data library
    - When the table finishes loading, click _MAP VIEW_, to see that it is a dataset of all country borders. 

Let's join the rivers with the countries, so that we can make a choropleth of the total length of big rivers in countries around the world. Of course, our map is going to ignore all the little rivers not included in our dataset, but this is just an example!

### Joining the data

From inside your country borders table, create a new column to hold some numerical data. 

1. In the _Data View_, click the drop down arrow beside any regular column name and click _Add new column_

    <p class="wrap-border"><img src="{{ '/img/course4/lesson3/img1.png' | prepend: site.baseurl }}" alt="creating column" /></p>

2. In the options, add `big_rivers` as the column and select `Number` as the type

3. Click _Create column_

### Join through a SELECT statement

Now, let's do a `SELECT` to see the data joined:

{% highlight sql %}
SELECT
  tm_world_borders_s.cartodb_id,
  COUNT(table_50m_rivers_lake_cen.cartodb_id)
FROM tm_world_borders_s, table_50m_rivers_lake_cen
WHERE ST_Intersects(
  tm_world_borders_s.the_geom,
  table_50m_rivers_lake_cen.the_geom)
GROUP BY tm_world_borders_s.cartodb_id
{% endhighlight %}

In the above query, we are counting all the rivers that intersect a country. Be sure that your world borders table is named `tm_world_borders_s`. We `GROUP BY` the country name, so that as a result we get country name and a count of big rivers. Great!

### Updating a table using a JOIN

Now, let's run a similar query, but write the numeric value to the column we created earlier, `big_rivers`. Run the following:

{% highlight sql %}
UPDATE tm_world_borders_s wb
SET big_rivers = (
  SELECT COUNT(table_50m_rivers_lake_cen.cartodb_id)
  FROM table_50m_rivers_lake_cen
  WHERE ST_Intersects(
    the_geom,
    table_50m_rivers_lake_cen.the_geom
  ))
{% endhighlight %}

In the above query, we are running `UPDATE` to our new column `big_rivers`, but running a nested query that selects the count of all rivers that intersect it. We use an alias for the name of our world borders table name, `wb`. You can see that the alias is then used when we run the `ST_Intersects` function, indicating that for every row in the wb table, we count the rivers that intersect the country geometry. We can now check that the column shows the number of rivers that each country intersects with:

<p class="wrap-border"><img src="{{ '/img/course4/lesson3/img2.png' | prepend: site.baseurl }}" alt="number of rivers" /></p>

### Mapping the results

1. Go back to the _MAP VIEW_ to see your world borders table

2. Click _wizards_ from the CartoDB sidebar

3. Select _Choropleth_ as the map style. 

    Additional choropleth options appear.

4. Select `big_rivers` for the Column field and customize the look and feel of the map

<p class="wrap-border"><img src="{{ '/img/course4/lesson3/img3.png' | prepend: site.baseurl }}" alt="cloropeth" /></p>

The map displays which countries have the most rivers passed through (based on our dataset).

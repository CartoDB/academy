---
title: "Quick SQL Tricks"
redirect_from: 
permalink: /courses/sql-postgis/
---
# Quick SQL Tricks

CartoDB is built on a database called [PostgreSQL](https://www.postgresql.org/docs/9.4/static/index.html). The SQL part of that means structured query language, which is a powerful and popular language for analyzing tables of data. This reference guide provides several SQL queries you can easily use as part of your data analysis workflow. If you are new to SQL, first review lesson one of this series, [SQL and PostGIS in CartoDB Editor](01-intro-to-sql-and-postgis.md).

## Basic Math Queries

A selection of queries to help you with a few basic mathematical operations on your dataset! View more [aggregate functions](https://www.postgresql.org/docs/9.4/static/functions-aggregate.html).

### Count Data

Running a [count](https://www.postgresql.org/docs/9.4/static/functions-aggregate.html) of your data can be helpful to determine if your dataset contains null data, or to make sure your dataset has the correct amount of data.

Example One
{% highlight sql %}
SELECT COUNT(*) 
FROM 
  tablename
{% endhighlight %}

Example Two
{% highlight sql %}
SELECT COUNT(*) 
FROM 
  tablename 
WHERE 
  columnname is null
{% endhighlight %}

### Find the Maximum Value of All Columns

Locate the largest value of your dataset using [max](https://www.postgresql.org/docs/9.4/static/functions-aggregate.html).

{% highlight sql %}
SELECT 
  cartodb_id, 
  the_geom, 
  count, 
  date, 
  latitude, 
  longitude, 
  newcolumn, 
  the_geom_webmercator 
FROM 
  table_name
WHERE 
  count=(SELECT MAX(count) FROM table_name)
{% endhighlight %}

### Normalize Data

Normalize your data, this can be helpful with the Torque visualization style that expects data in the range of 0-255. View more [mathematical operations](https://www.postgresql.org/docs/9.4/static/functions-math.html).

{% highlight sql %}
UPDATE 
  tablename 
SET 
  normedcolumn = datacolumn*255/360
{% endhighlight %}

### Round data

Showing numerical data as part of an infowindow? Round your number column for easy viewing. View more [mathematical operations](https://www.postgresql.org/docs/9.4/static/functions-math.html).

{% highlight sql %}
SELECT 
  round(count::numeric, 2) 
FROM 
  tablename  
{% endhighlight %}

## Formatting Your Data

Format your data in order to display a more user-friendly format using the Postgres method ```to_char```. View all the [data type formatting functions](https://www.postgresql.org/docs/9.5/static/functions-formatting.html).

### Format date to string

{% highlight sql %}
UPDATE 
  tablename
SET 
  date = to_char(datecol, 'YYYY-MM-DD')
{% endhighlight %}

### Format number as US currency

{% highlight sql %}
UPDATE tablename 
set columnname = to_char(column_to_convert, 'FM$999,999,999,990D00') 
{% endhighlight %}

## Date and Time

Postgres accepts date and time in many [formats](https://www.postgresql.org/docs/9.4/static/datatype-datetime.html). Postgres also offers many [date and time functions](https://www.postgresql.org/docs/9.4/static/functions-datetime.html) for dealing with date and time types. 

### Select by date part

{% highlight sql %}
SELECT * FROM table
WHERE date_part('day', timestamp)=3 --> Selects every 3rd day
AND date_part('month' timestamp)=5 --> Selects May dates
-- 'year', 'hour', 'minute', 'second' also work
{% endhighlight %}

### Convert Year String to Timestamp

If you have a dataset with a year value and no additional time information, the year column can be converted to a postgres timestamp using ```to_timestamp```. However, when using a year date for a Torque map, your animation may lack fluidity. View more information [here](https://www.postgresql.org/docs/9.5/static/functions-formatting.html).

{% highlight sql %}
UPDATE 
  tablename 
SET 
  yearColumn = to_timestamp(yr_compl,'YYYY')
{% endhighlight %}

## Updating Your Dataset

Postgres offers many convenience methods for updating a dataset including appending data and deleting data.

### Insert Into

If you need to combine datasets, append rows from one table into another table using [INSERT INTO](https://www.postgresql.org/docs/9.4/static/sql-insert.html).

{% highlight sql %}
INSERT INTO table2 (column, column, ...)
SELECT (column, column, ...) FROM table1
{% endhighlight %}

### Delete Data

[Delete](https://www.postgresql.org/docs/9.5/static/dml-delete.html) null data from a table, which can affect analysis and visualization.

{% highlight sql %}
DELETE 
FROM 
  table_name
WHERE 
  the_geom_webmercator is null
{% endhighlight %}

## Selecting Data

There are many ways to slice and dice your data in order to [SELECT](https://www.postgresql.org/docs/current/static/sql-select.html) a subset of data.

### Select data that matches a string descriptor

Learn more about pattern matching in Postgres [here](https://www.postgresql.org/docs/9.4/static/functions-matching.html).

{% highlight sql %}
SELECT * 
FROM 
  tablename 
WHERE 
  descriptor LIKE 'Noise: Construction Before/After Hours (NM1)%'
{% endhighlight %}

### Select null data

{% highlight sql %}
SELECT * 
FROM 
  tablename 
WHERE 
  the_geom_webmercator is null
{% endhighlight %}

### Sort Data

[Sorting data](https://www.postgresql.org/docs/9.4/static/queries-order.html) is helpful if you need the most recent data.

{% highlight sql %}
SELECT 
  columntosort
FROM 
  tablename
ORDER BY 
  columntosort DESC
{% endhighlight %}
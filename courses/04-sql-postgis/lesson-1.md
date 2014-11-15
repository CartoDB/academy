---
id: 1
layout: lesson
title:  "Lesson 1"
subtitle: "Intro to SQL and PostGIS"
course: "SQL and PostGIS in CartoDB"
course_slug: "04-sql-postgis"
continue_link: "lesson-2"
tweet_text: ""
vizjson: ""
---

## Learning SQL through the CartoDB Editor

CartoDB is built on a database called PostgreSQL. The SQL part of that means _structured query language_, which is a powerful and popular language for analyzing tables of data. It is based on mathematics called relational algebra which has a solid foundation. 

In this lesson, we will be using CartoDB to discover some of the basic features of SQL and introduce the geospatial extension called PostGIS. PostGIS allows you to perform geospatial queries such as finding all data points that are within a given radius, the area of polygons in your table, and much more.

Let's get started exploring SQL by working with our familiar dataset on earthquakes. You can easily import it into your account by clicking on *Common Data*, then *Physical datasets*, and finally *Realtime earthquakes*.

![Common Data]({{site.baseurl}}/img/course4/lesson1/commondata.png)

After your data is successfully imported, inspect the columns you have in your table. Each column has a unique name, and the columns of data are imported as one of five types: 

+ number -- 1, 3.1415, -179.3, etc. using [double precision floats](http://www.postgresql.org/docs/9.1/static/datatype-numeric.html)
+ string -- a string of characters, e.g., "California"
+ [boolean](http://en.wikipedia.org/wiki/Boolean_data_type) -- true or false
+ [date](http://www.postgresql.org/docs/8.2/static/functions-formatting.html) -- 
+ geometry -- associates your data with geographical coordinates

In addition, a cell without data entered will be shown as `null`. Notice also that rows represent unique entries defined by their `cartodb_id`.

## SELECT, *, and FROM

Once you have finished inspecting your data, click on the tab on the right labeled `SQL`. This gives you a view of a basic SQL statement. If you're unfamiliar with the sidebar, check out the documentation [here](http://docs.cartodb.com/cartodb-editor.html#cartodb-sidebar).

Notice the words in the text editor:

+ SELECT -- choose the columns specified after SELECT
+ *** -- a wildcard that means all columns in table
+ FROM -- this is needed to specify from which table the data is pulled

Using the above list as a guide, the statement in the SQL tab, `SELECT * FROM all_day`, reads: "Select all columns from the table all_day." If you were not interested in having all of the data in your table, you could write a comma separated list of the columns you are interested in instead. For instance, if you only care about the location (`the_geom`), the magnitude (`mag`), and where the earthquake occurred (`place`), then your SQL statement would read as:

{% highlight sql %}
SELECT the_geom, mag, place
FROM all_day
{% endhighlight %}

When you run this query by clicking the button "Apply query", or typing CMD+S (Mac)/CTRL+S (PC), you are presented with the option "create table from query" that allows you to create a new table from your SQL statement. If you choose this, you create a new data table that can be used independently of the current one. If you instead want to revert to having all the columns that you previously imported, clicking "clear view" returns your SQL statement to `SELECT * FROM all_day` and you see all of your data in the table again.

_Pro Tip:_ If you want to rename a column when you do the above procedure, you would write: `column_name AS new_name`. If you wanted to change `mag`, you would put `mag AS magnitude` into your SELECT statement. The AS keyword gives the old column name a new alias.

## Filters show us WHERE...

Still in the Data View, check out the tab below the SQL tab, the one that has a bar graph. This is our Filters tab.

Filters in CartoDB are an excellent way to explore your data because they help you analyze the contents of columns by showing, depending on the characteristics of the data in the column, the unique entries, a histogram of the data distribution, or the range in values of another column. For instance, it may not be obvious to expect that _quarry_ and _quarry-blast_ are entries alongside _earthquakes_ in the `type` column.

Start by exploring the options available when you apply the filters to your data. Look specifically at different collections of data and how you are presented with varying methods for filtering them.

![Filters]({{site.baseurl}}/img/course4/lesson1/filters.png)

Things to notice:

+ Filtering by `place` only lets you search for strings because of the large number of unique entries
+ Filtering by `type` gives you a list of a few values because there are only a few unique entries
+ Filtering by `time` allows you to select a range in time
+ Filtering by `gap` gives you a histogram of the values in that column

Behind the scenes, these filters are setting up SQL statements that are run against our data. Remove all of the filters by clicking the grey &times; in the top right of each window's pane, but keep the filter for `type`. Now switch to the SQL tab to see what your filtering produces for a SQL statement.

![Filters]({{site.baseurl}}/img/course4/lesson1/filters-sql.png)

Outline
- Which data?
- Using filters to explore some of the SQL commands CartoDB uses
    - Discover common operators (=, <, >, <> or !=, ILIKE, IN, NOT IN) by looking at different data types
    - Multiple conditions using OR or AND
- SELECT/PROJECT 

## Structure of a query

{% highlight sql %}
SELECT columns
FROM table_name
WHERE conditions
{% endhighlight %}

## the_geom, the_geom_webmercator

We'll focus on two special columns in CartoDB. The first is `the_geom`, which is where your geospatial data is stored. This is a required column for your maps to work. If your data does not have latitude and longitude, or other complicated geospatial objects such as lines, polygons, etc., then you could try [georefrencing](http://docs.cartodb.com/tutorials/how_to_georeference.html). 

## ORDER BY, LIMIT

## Basic PostGIS
Table of nodes to table of edges?

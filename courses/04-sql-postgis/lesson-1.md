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
+ string -- a string of characters, e.g., "Socotra archipelago"
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

Our basic format for a SQL statement is:

{% highlight sql %}
SELECT columns
FROM table_name
{% endhighlight %}

_Pro Tip:_ If you want to rename a column when you create a new table from query, you would write: `column_name AS new_name`. If you wanted to change `mag`, you would put `mag AS magnitude` into your SELECT statement. The AS keyword gives the old column name a new alias.

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

Behind the scenes, these filters are setting up SQL statements that are run against our data. Change the sliders, enter search terms, etc., to see how the data table changes in response to your filtering.

Once you've finished exploring your data with filters, remove all of the filters by clicking the grey circle with a **&times;** in the top right of each window's pane. Then re-add the filter for `type`, deselect all entries except _earthquake_ and _quarry_, and switch to the SQL tab to see what your filtering produces for a SQL statement. As you will see, filters show us the WHERE clause that allows you to select rows based on criteria you set. In this case, the WHERE clause chooses all columns that have either "earthquake" or "quarry" in the `type` column. That is, a row is only chosen if `type` matches "earthquake" or "quarry". We could easily flip this condition around by placing the NOT keyword before IN.

Delete all of the text _after_ WHERE, and type `cartodb_id = 4`. Once you finish typing, apply the query and inspect the results. As you will see, all records that do not have a `cartodb_id` of 4 disappear from view. You can apply other conditions, such as `cartodb_id > 2` or even on-the-fly calculations such as `cartodb_id * 2 > 4`.

Switch back to the Filters tab and add an additional filter. This time choose `depth`, then select a range and switch back to the SQL tab. We can discover that we can use the following inequalities:  

+ `>` for greater than
+ `<` for less than
+ `>=` for greater than or equal to
+ `<=` for less than or equal to
+ `<>` or `!=` for not equal to

We also discover that we can chain conditions together using the AND keyword. In the case of our `depth` filter, you have the following format: 

    (depth <= val1 AND depth >= val2)
    
If you add another filter you can see that they are all chained together to give a very nuanced selection of your data. The OR keyword is another option for having multiple conditions.

The final condition we will discover through our filters can be found by filtering `place`. Clear all filters except for `place`. Type in "California" and then switch to the SQL tab. You will see a new keyword ILIKE that does basic regular expression matching that is _case-insensitive_. LIKE is case-sensitive. The wildcard in this case is the percent symbol (%). Placed at the front of the string, '%California' matches all strings that end in "California". Placed at the end, 'California%' matches all strings that begin with "California". Placed on both ends as produced by the filter, it matches all strings that contain "California".

![Multiple conditions in the WHERE clause]({{site.baseurl}}/img/course4/lesson1/filters-sql.png)

Now we have a larger view of what a query can look like:

{% highlight sql %}
SELECT columns
FROM table_name
WHERE column_name operator value
{% endhighlight %}

### Outline

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

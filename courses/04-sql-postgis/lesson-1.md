---
id: 1
layout: lesson
title:  "Lesson 1"
subtitle: "Basic SQL and PostGIS"
course: "SQL and PostGIS in CartoDB"
course_slug: "04-sql-postgis"
continue_link: "lesson-2"
tweet_text: ""
vizjson: ""
---

## Learning SQL through the CartoDB Editor
SQL is a powerful language for analyzing data.

Using just the CartoDB Editor, you will be able to explore many of the features of the language. 

Let's start out with our familiar dataset on earthquakes. You can easily import it into your account by going to Common Data.

![Common Data]({{baseurl}}/img/course4/lesson1/commondata.png)

Start by exploring the options available when you apply the filters to your data. Look specifically at different types of data: strings, numbers, time, and boolean. 

![Filters]({{baseurl}}/img/course4/lesson1/filters.png)

Filters are excellent ways to explore your data because they help you analyze the contents of columns by showing the number of unique entries for some columns, a histogram for others, or the range in values of a column. For instance, it may be hard to discover that _quarry_ and _quarry-blast_ are entries in our data table.

Behind the scenes, these filters are setting up SQL statements that are run against our data. Now switch to the SQL tab to see what your filtering produces for a SQL statement.

![Filters]({{baseurl}}/img/course4/lesson1/filters-sql.png)

Things to notice:

+ Filtering by `place` only lets you search for strings
+ Filtering by `type` gives you a list of a few values
+ Filtering by `time` allows you to set a range in time

Outline
- Which data?
- Using filters to explore some of the SQL commands CartoDB uses
    - Discover common operators (=, <, >, <> or !=, ILIKE, IN, NOT IN) by looking at different data types
    - Multiple conditions using OR or AND
- SELECT/PROJECT 

## `the_geom`, `the_geom_webmercator`


## ORDER BY, LIMIT

## Basic PostGIS
Table of nodes to table of edges?

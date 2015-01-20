---
id: 2
layout: lesson
title:  "Lesson 2"
subtitle: "PostGIS in CartoDB"
course: "SQL and PostGIS in CartoDB"
course_slug: "04-sql-postgis"
continue_link: "lesson-3"
tweet_text: ""
vizjson: "http://documentation.cartodb.com/api/v2/viz/07a3e3bc-6df7-11e4-b5a6-0e9d821ea90d/viz.json"
---

## PostGIS in CartoDB

CartoDB is built on top of PostgreSQL, a powerful database.


### ST_Buffer

As the name suggests, `ST_Buffer` takes a geometry as an argument and returns a geometry with a corridor around it by the specified unit.

**Function definition**
```sql
geometry ST_Buffer(geometry g1, float radius_of_buffer)
```



**See also**
Basic ST_Buffer usage in the CartoDB tutorial [_Drawing a circle from a point and radius_](http://docs.cartodb.com/tutorials/circle_point_radius.html).


### ST_DWithin

Documentation:
http://postgis.net/docs/ST_DWithin.html

`ST_Buffer` works great with `ST_DWithin`.

Given a polygon, you can use ST_DWithin to find out how many points are in the polygon.


```sql
UPDATE 
  st_dwithin_examples
SET 
  the_geom = CDB_LatLng(random()*10 + 27.7000,random()*10 + 85.3333)
```


Show points within 25km of Kathmandu

```sql
SELECT *,
  ST_DWithin(
    the_geom::geography,
	CDB_LatLng(27.7,85.33)::geography,
	25000
  )::boolean AS is_within
FROM 
  st_dwithin_examples
```  

### ST_Intersects

Documentation:
http://postgis.org/docs/ST_Intersects.html


Are points within 50,000 meters of Kathmandu?

```sql
SELECT 
  *, 
  ST_Intersects(
    the_geom,
    ST_Buffer(
      CDB_LatLng(
        27.7,
        85.33
      )::geography,
      50000
    )
  )::boolean
FROM 
  st_dwithin_examples
```




### ST_Distance

To measure the distance between two points.


### ST_Clip


### ST_MakeLine
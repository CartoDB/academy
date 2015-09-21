---
id: 2
layout: lesson
title:  "Visualizing bird tracking data"
subtitle: "An introduction to using CartoDB for tracking data"
course: "Community Contributions"
course_slug: "07-community"
continue_link:
tweet_text: "Step by step is the way to go. I've finished the second map academy design course. Check it out!"
vizjson: "https://inbo.cartodb.com/u/lifewatch/api/v2/viz/775ba7bc-b1fe-11e4-97bd-0e853d047bba/viz.json"
---

## Lesson information

<div class="Lesson-info">
    <p>This tutorial was written by Peter Desmet for <a href="http://lifewatch.inbo.be/">LifeWatch INBO</a> and is being released under the <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> license. It <a href="http://lifewatch.inbo.be/blog/posts/cartodb-tracking-data-tutorial.html">originally appeared</a> on the <a href="http://lifewatch.inbo.be/blog/">LifeWatch INBO blog</a> on September 1, 2015.</p>

    <p><a href="https://twitter.com/peterdesmet">Peter</a> is an open data and visualization geek working as team coordinator at <a href="http://lifewatch.inbo.be/">LifeWatch INBO</a>. He's been working in biodiversity informatics since 2006. His recent projects involve bird tracking and weather radars. He also makes amazing data visualizations, such as the <a href="https://inbo.cartodb.com/u/lifewatch/viz/775ba7bc-b1fe-11e4-97bd-0e853d047bba/public_map">one in the banner</a>.</p>
</div>


## An introduction to using CartoDB for tracking data

We have been using [CartoDB for bird tracking data](http://lifewatch.inbo.be/blog/tag/cartodb.html) for a while now and are very happy to see that we have inspired others to do the [same](http://birdmapsuk.blogspot.com/2015/06/gulls-part-two.html), including for [other species](http://blog.cartodb.com/fisher/). To introduce even more people to this great tool for animal tracking data, I was invited to give a hands-on course at two workshops[^1]. Rather than handing the course material to the participants of these workshops only, I decided to publish it here on this blog, so anyone can use it.

[^1]: The [Animal Movement Analysis Summer Course](http://horizon.science.uva.nl/scge2015-wiki/doku.php) organized by the [Institute for Biodiversity and Ecosystem Dynamics](http://ibed.uva.nl/) on July 10 and the [LifeWatch GIS and WebGis workshop](http://biodiversity.be/conference2015/workshops/) organized by the Université catholique de Louvain and the INBO on September 16.

## Introduction

[CartoDB](http://cartodb.com) is a tool to explore, analyze and visualize geospatial data online. In my opinion, it's like Gmail or GitHub: one of the best software tools ever. CartoDB is used in a [wide area of domains](https://cartodb.com/gallery) and has [great documentation](http://docs.cartodb.com/), but in this tutorial I'll focus on how it can be used for exploring and visualizing animal tracking data. Since [we are tracking birds](http://lifewatch.inbo.be/blog/tag/bird-tracking.html), I'll use our open data of Lesser Black-backed Gulls in the examples, but the methods can be applied to other animal tracking data as well (I hope). This tutorial is by no means meant to be exhaustive: it's a step by step guide to get you started and hopefully inspire you to do cool things with your own data.

Note: If you want to follow along with this tutorial, you'll at least need to do the actions in **bold**, all the rest in optional.

## Create an account

**Go to <https://cartodb.com/signup> to create an account**, if you haven't got one already. Free accounts allow you to upload 50MB of data, but keep in mind that all your data and maps will be public[^2].

[^2]: They are public in the sense that they can be discovered on your public profile, for which one needs to know your user name.

## Login

1. Once logged in, you see your private dashboard. This is where you (and only you) can upload data, create maps and manage your account.
2. CartoDB will display contextual help messages to get you to know the tool. For an overview, see [the documentation on the CartoDB editor](http://docs.cartodb.com/).
3. At the top, you can toggle between your `Maps` and `Datasets`.
4. You also have a public profile (`https://user.cartodb.com/maps`). All datasets you upload and maps you create, will be visible there.

## Upload data

For this tutorial, well use [our open bird tracking data]({filename}bird-tracking-data-published.md). To make it easier to follow along with a free CartoDB account, you can [download a subset of the data (2.1MB)]({filename}/files/bird_tracking.zip), containing migration data for three gulls. If you want to know how that subset was created, here's the SQL query I used:

{% highlight sql %}
SELECT
    t.the_geom_webmercator,
    t.altitude,
    t.date_time,
    t.device_info_serial,
    t.direction,
    t.latitude,
    t.longitude,
    |/(t.x_speed^2 + t.y_speed^2) AS speed_2d,
    d.bird_name
FROM bird_tracking t
    LEFT JOIN bird_tracking_devices d
    ON t.device_info_serial = d.device_info_serial
WHERE
    t.userflag IS FALSE
    AND t.date_time >= '2013-08-15'
    AND t.date_time < '2014-05-01'
    AND d.bird_name IN (
        'Eric',
        'Nico',
        'Sanne'
    )
ORDER BY
    d.bird_name,
    t.date_time
{% endhighlight %}

1. **Download [this zipped bird tracking csv file]({filename}/files/bird_tracking.zip).**
2. **Go to your datasets dashboard.**
3. **Upload the file** by dragging it to your browser window. CartoDB recognizes [multiple files formats](http://docs.cartodb.com/cartodb-editor.html#supported-file-formats).

## Data view

1. CartoDB is powered by PostgreSQL & PostGIS and has created a database table from your file and done some automatic interpretation of the data types. Some additional columns have been created as well, such as `cartodb_id`.
2. Geospatial data are interpreted automatically in `the_geom`. This interpretation assumes the geodetic datum to be `WGS84`. `the_geom` supports points, lines and polygons, but only one type per dataset.
3. Click the arrow next to field name to manipulate columns, such as sorting, renaming, deleting or changing data types.
4. Most of the functionality is in the collapsed toolbar on the right, such as merging datasets, adding rows or columns, and filters.
5. Filters are great for exploring the data. **Try out the filter for altitude.**

    ![Filters]({{site.baseurl}}/img/course7/lesson2/cartodb-filters.png)

6. Filters are actually just SQL, a much more powerful language to select, aggregate or update your data. CartoDB supports all PostgreSQL and PostGIS SQL functions.
7. Click `SQL` in the toolbar and **try this SQL** to get some statistics about the scope of the dataset:

{% highlight sql %}
SELECT
    count(*) AS occurrences,
    min(date_time) AS min_date_time,
    max(date_time) AS max_date_time,
    count(distinct device_info_serial) AS individuals
FROM bird_tracking
{% endhighlight %}

8. From the `Edit` menu in the top right you can export any query you make, in multiple file formats[^3]. This is useful if you want to convert geospatial data from one file format to another, but don't have the tools on your computer to do so.
9. **Click `Clear view`** to remove any applied SQL.
 
## Create your first map

1. **Click `Visualize`** in the top right to create your first map.
2. Once created, click the title `bird_tracking1` and rename it to `My first map`[^3].
3. **Click `Map view`**.
4. You can change the background map by clicking `Change basemap` in the bottom right[^4]. `Positron` is a good default basemap, but there are many other options available and even more via `Yours` (including daily cloud cover maps from NASA). Note that for the `Positron` and `Dark matter` basemaps, city labels will be [positioned on top of your data](http://blog.cartodb.com/let-your-labels-shine/), making them more readable. Choose `Positron (labels below)` to turn this off or `Positron (lite)` to have no labels at all.
5. Click `Options` in the bottom right to select the map interaction options you want to provide to the visitors of your map, such as `Zoom controls` or a `Fullscreen` button.
6. The map view also provides a toolbar on the right, where you'll recognize the same `SQL` and `Filters` features from the data view.
7. **Click `Wizards`** in the toolbar to see a plethora of visualization options. These are all explained in the [CartoDB documentation](http://docs.cartodb.com/cartodb-editor.html#map-wizards).
8. **Try `Intensity`** with the following options to get a sense of the distribution of occurrences:

    ![Intensity map]({{site.baseurl}}/img/course7/lesson2/cartodb-intensity.png)

9. **Try `Choropleth`** with the following options to see the relative altitude distribution (see the [documentation](http://docs.cartodb.com/cartodb-editor.html#choropleth) to learn more about the different quantification methods):

    ![Choropleth map]({{site.baseurl}}/img/course7/lesson2/cartodb-choropleth.png)

10. Just like the filters are powered by SQL, the wizards are powered by CartoCSS, which you can use to fine-tune your map[^5]. **Click `CSS`** in the toolbar to discover how the quantification buckets (in this case `Quantile`) are defined:

{% highlight css %}
/** choropleth visualization */

#bird_tracking{
    marker-fill-opacity: 0.8;
    marker-line-color: #FFF;
    marker-line-width: 0.5;
    marker-line-opacity: 1;
    marker-width: 7;
    marker-fill: #F2D2D3;
    marker-allow-overlap: true;
}
#bird_tracking [ altitude <= 6965] {
    marker-fill: #C1373C;
}
#bird_tracking [ altitude <= 634] {
    marker-fill: #CC4E52;
}
#bird_tracking [ altitude <= 338.5] {
    marker-fill: #D4686C;
}
#bird_tracking [ altitude <= 66.5] {
    marker-fill: #EBB7B9;
}
#bird_tracking [ altitude <= -205.5] {
    marker-fill: #F2D2D3;
}
{% endhighlight %}

[^3]: Maps can have spaces and punctuation in their name, dataset names (which are actually PostgreSQL database tables) use lowercase and underscores.
[^4]: You'll have to dismiss the [cool](http://blog.cartodb.com/one-click-mapping/), but somewhat obtrusive `Analyzing dataset` pop-up.
[^5]: If you want to edit the CSS, it's best to always start from a wizard and set most of the options there first. Once you start editing the CSS, changes to the wizard options are no longer applied. You can only reset this by choosing another visualization from the wizard, which will override all CSS changes.

## Create a map of migration speed

1. We want to save our previous work and create another map. **Click `Edit > Duplicate map` and name it `Where does gull Nico rest?`**.
2. **Add a `WHERE` clause to the SQL** to only select gull Nico between specific dates:

{% highlight sql %}
SELECT * 
FROM bird_tracking
WHERE
    bird_name = 'Nico'
    AND date_time >= '2013-08-15'
    AND date_time < '2014-01-01'
{% endhighlight %}

3. We want to visualize the travel speed of gull Nico. The best way to start is to **create a `Choropleth` map**, with the following options:

    ![Start from a choropleth map]({{site.baseurl}}/img/course7/lesson2/cartodb-migration-speed-1.png)

4. Most of the dots are red and the story does not come across yet. Let's dive into the CSS to **fine-tune the map**. We basically set all dots to green, except where the speed is below 2m/s, which we show larger and in red:

{% highlight css %}
/** choropleth visualization */

#bird_tracking{
    marker-fill-opacity: 0.8;
    marker-line-color: #FFF;
    marker-line-width: 0.5;
    marker-line-opacity: 1;
    marker-width: 6;
    marker-fill: #1a9850;
    marker-allow-overlap: true;
}
#bird_tracking [ speed_2d < 2] {
    marker-fill: #d73027;
    marker-width: 10;
    marker-line-width: 1;
}
{% endhighlight %}

5. **Click `Legends`** in the toolbar to manually set what to be shown in the legend (using template `Custom`):

    ![Update the legend]({{site.baseurl}}/img/course7/lesson2/cartodb-migration-speed-2.png)

6. Click a point and chose `Select fields` to **create an info window**.

    ![Define info windows]({{site.baseurl}}/img/course7/lesson2/cartodb-migration-speed-3.png)

7. **Describe your map** by clicking `Edit metadata...` in the top left.
8. **Share your map** by clicking `Publish` in the top right. The dialog box provides you with a link to the map or the code to embed it in a web page. `CartoDB.js` is for advanced use in apps.
9. **Copy the link and paste it in a new browser tab** to verify the info windows are working and the bounding box makes sense, i.e. are the interesting part of the data visible? Anything you update in your map (including zoom level and bounding box) will affect the public map (reload the page to see the changes).
10. Researchers often ask if they can export the map[^6]. That's not the goal of CartoDB (which is creating online, interactive maps), but you can create a screenshot by clicking `Export Image` in the top left. Unedited, it's probably not fit for publication in a journal (e.g. the scale and indication of north are missing, which you could add manually), but luckily the default basemaps are already open data (required by some journals). You just need to credit [OpenStreetMap](http://www.openstreetmap.org/copyright).

[^6]: In addition to the data, which you can export from the `Edit` menu in the top right (see also step 8 of the `Data view` section of this tutorial).

The [final map](https://inbo.cartodb.com/u/lifewatch/viz/7ad8e926-2644-11e5-9890-0e4fddd5de28/public_map):

<iframe width="100%" height="500" frameborder="0" src="https://inbo.cartodb.com/u/lifewatch/viz/7ad8e926-2644-11e5-9890-0e4fddd5de28/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

## Create a map of tracks per month

1. **Duplicate your map and name it `Tracks per month`**.
2. This time we want to string the occurrences together as lines: one line per individual (with the occurrences sorted by date), per month. **This can be done in the SQL**. See the [PostgreSQL documentation](http://www.postgresql.org/docs/9.4/static/functions-datetime.html) for date functions. `the_geom_webmercator` is a geospatial field that is calculated by CartoDB in the background based on `the_geom` and is used for the actual display on the map. Since we're defining a new geospatial field (i.e. a line), we have to explicitly include it.

{% highlight sql %}
SELECT
    ST_MakeLine(the_geom_webmercator ORDER BY date_time ASC) AS the_geom_webmercator,
    extract(month from date_time) AS month,
    bird_name
FROM bird_tracking
WHERE
    date_time > '2013-08-15'
    AND date_time < '2014-01-01'
GROUP BY
    bird_name,
    month
{% endhighlight %}

3. We want to display each month in a different colour, so **start with a `Choropleth` map**, with the following options:

    ![Start from a choropleth map]({{site.baseurl}}/img/course7/lesson2/cartodb-month-tracks-1.png)

4. We will also include labels (start doing this in the `Choropleth` options), so you can still see which track belongs to which individual. **Fine-tune the map in the CSS** (note that I've changed the months to integers):

{% highlight css %}
/** choropleth visualization */

#bird_tracking{
  polygon-opacity: 0;
  line-color: #FFFFCC;
  line-width: 1.5;
  line-opacity: 0.8;
}

#bird_tracking::labels {
  text-name: [bird_name];
  text-face-name: 'Lato Bold';
  text-size: 12;
  text-label-position-tolerance: 10;
  text-fill: #000;
  text-halo-fill: #FFF;
  text-halo-radius: 2;
  text-dy: -10;
  text-allow-overlap: false;
  text-placement: line;
  text-placement-type: simple;
}

#bird_tracking [ month <= 12] {
   line-color: #253494;
}
#bird_tracking [ month <= 11] {
   line-color: #2C7FB8;
}
#bird_tracking [ month <= 10] {
   line-color: #41B6C4;
}
#bird_tracking [ month <= 9] {
   line-color: #A1DAB4;
}
#bird_tracking [ month <= 8] {
   line-color: #FFFFCC;
}
{% endhighlight %}

5. **Update the legend**:

    ![Update the legend]({{site.baseurl}}/img/course7/lesson2/cartodb-month-tracks-2.png)

6. To provide some more context, let's annotate the map. In the top right, **click `Add Element > Add annotation item` and indicate summer and winter locations**. The position of an annotation element is linked to a location on the map (though placement can be a bit difficult) and you can define between which zoom levels to show it, to avoid cluttering:

    ![Add annotations]({{site.baseurl}}/img/course7/lesson2/cartodb-month-tracks-3.png)

7. Finally, **update the description** in `Edit metadata...` and **publish your map**.

The [final map](https://inbo.cartodb.com/u/lifewatch/viz/3f607d1c-264b-11e5-9d8b-0e018d66dc29/public_map):

<iframe width="100%" height="500" frameborder="0" src="https://inbo.cartodb.com/u/lifewatch/viz/3f607d1c-264b-11e5-9d8b-0e018d66dc29/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

## Create an animated map

1. **Duplicate** your map and **name it** `Migration in time`.
2. This time, we'll add a map on top of the previous one. **Click** `+` on the right hand side to add a new layer and **choose the same table** `bird_tracking`.
3. **Apply the same time constraints** in the SQL:

{% highlight sql %}
SELECT * 
FROM bird_tracking
WHERE
    date_time > '2013-08-15'
    AND date_time < '2014-01-01'
{% endhighlight %}

4. From the `Wizards`, **choose `Torque cat`**[^7], with the following options. The `Time Column` should always be your date.

    ![Torque category options]({{site.baseurl}}/img/course7/lesson2/cartodb-torque-1.png)

    ![Torque category options]({{site.baseurl}}/img/course7/lesson2/cartodb-torque-2.png)

5. The final CSS looks like this:

{% highlight css %}
/** torque_cat visualization */

Map {
-torque-frame-count:256;
-torque-animation-duration:30;
-torque-time-attribute:"date_time";
-torque-aggregation-function:"CDB_Math_Mode(torque_category)";
-torque-resolution:1;
-torque-data-aggregation:linear;
}

#bird_tracking{
    comp-op: source-over;
    marker-fill-opacity: 0.9;
    marker-line-color: #FFF;
    marker-line-width: 0;
    marker-line-opacity: 1;
    marker-type: ellipse;
    marker-width: 3;
    marker-fill: #FF6600;
}
#bird_tracking[frame-offset=1] {
    marker-width:5;
    marker-fill-opacity:0.45; 
}
#bird_tracking[frame-offset=2] {
    marker-width:7;
    marker-fill-opacity:0.225; 
}
#bird_tracking[value=1] {
    marker-fill: #B81609;
}
#bird_tracking[value=2] {
    marker-fill: #FFA300;
}
#bird_tracking[value=3] {
    marker-fill: #A53ED5;
}
{% endhighlight %}

6. **Update the legend**, **remove the `bird_name` labels** from the other layer (they are no longer required) and **publish your map**.

[^7]: You can add many layers to a map, but only one Torque layer (= one animated layer). That is because CartoDB cannot guarantee that multiple Torque layers will use the same time scale and speed (which is something the user defines), so it wouldn't make sense to play those at the same time. If you want to animate the same data, but with different colours for a certain attribute (e.g. individual), use the `Torque cat` like we did here. This works best if you don't use too many categories.

The [final map](https://inbo.cartodb.com/u/lifewatch/viz/4eb8fcee-40fe-11e5-bfaa-0e9d821ea90d/public_map):

<iframe width="100%" height="500" frameborder="0" src="https://inbo.cartodb.com/u/lifewatch/viz/4eb8fcee-40fe-11e5-bfaa-0e9d821ea90d/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

## Go forth and start mapping

And there you have it. I hope this tutorial helped you to get a better idea of what you can do with CartoDB and that you're inspired to use it for your own tracking data. Please share your maps or any feedback you have regarding this tutorial in the comments below.

For inspiration and tutorials, see:

* [Our blog posts on CartoDB](http://lifewatch.inbo.be/blog/tag/cartodb.html), including more specific tutorials and things we've built.
* [Our CartoDB maps](https://inbo.cartodb.com/u/lifewatch/maps), mostly using bird tracking data.
* [CartoDB map gallery](https://cartodb.com/gallery/): the cream of the crop of CartoDB maps.
* [CartoDB academy](http://academy.cartodb.com/): step by step tutorials on how to create maps in CartoDB.
* [CartoDB documentation](http://docs.cartodb.com/): if you want to know more about all the features.


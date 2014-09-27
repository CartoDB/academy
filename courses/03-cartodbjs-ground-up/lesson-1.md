---
id: 1
layout: lesson
title:  "Lesson 1"
subtitle: "createVis vs. createLayer"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
continue_link: "lesson-2"
tweet_text: "I just created some vis! Working my way through cartodb.js from the ground up. #CartoDB"
vizjson: "http://andye.cartodb.com/api/v2/viz/19de0ce2-3deb-11e4-b07b-0edbca4b5057/viz.json"
---

## _Create Visualization_ vs. _Create Layer_

### Viz JSON, nice to meet you.

Up to this point, all of the methods for displaying maps to the world have involved the first two sharing methods you've seen in the sharing panel (see below). The first, "Get the link," creates a shortened URL that points to your map in your account on CartoDB's website. The second, "Embed it," gives you the HTML for an `iframe` that you can drop into your custom web page. The third option, CartoDB.js, will be our jumping off point for this course on CartoDB.js.

![Share panel]({{site.baseurl}}/img/course3/lesson1/share-panel.png)

You can download this file and inspect it with your favorite text editor, or view it in your browser if you have a JSON viewer. For this lesson, we will be using the viz JSON for a multi-layer map similiar to the one created at the end of [Course 1]({{site.baseurl}}/courses/01-beginners-course/lesson-5.html). Download the viz JSON [here](http://andye.cartodb.com/api/v2/viz/19de0ce2-3deb-11e4-b07b-0edbca4b5057/viz.json). If you're unfamiliar with the JSON file format, check out the [official site](http://json.org/) or [Wikipedia](http://en.wikipedia.org/wiki/JSON) for a lot more information. 

There's a lot of metadata in this file. Browsing through all the possibilities shows you how much power you have to customize your maps in the CartoDB Editor. Review the documentation for CartoDB Editor [here](http://docs.cartodb.com/cartodb-editor.html) to explore what some of these JSON entries allow you to do in your maps.

![Screenshot of viz JSON]({{site.baseurl}}/img/course3/lesson1/json-view.png)

If you find the top-most level called `layers`, you see that it's an array of two objects. The first object's `options` have type "Tiled" and a name of "CartoDB Flat Blue." This layer corresponds to the base layer map of our visualization. If you try changing the base map in CartoDB Editor, you'll see the information in this layer change accordingly. Make note of other options included in this options object as they will come up again later.

The next object down in the `layers` array contains information about the data that was loaded into the map and visualized. The first entry, `type`, tells you that this is a group of layers. Under options, you see some of the information that's used by the CartoDB.js API to retrieve information from the servers. The majority of this second object in the `layers` array is taken up by `layer_definition`. In our case, we have two layers to our map (there are two objects in the `layers` array that's under `layer_definition`).

The first, buried under options, has a `layer_name` of `us_counties` comes from our [dataset](http://acdmy.org/d/counties.zip) titled `us_counties`, has [GeoJSON](http://geojson.org/) MultiPolygon geometry types of every United States county. The second comes from a [dataset](http://acdmy.org/d/tornadoes.zip
) that is made up of GeoJson Points on tornados in the United States. Other important info to pick out:

- `sql: "..."` tells you the SQL statement used with each data set (defaults to `select * from dataset`)
- `visible: true` means it'll display by default
- `cartocss: "..."` tells you the styling of the map
- `interactivity: "column1, column2, ..."` tells you the info that is click/hover enabled

### Create Visualization versus Create Layer
 
In CartoDB, there are two main methods to bring your maps into custom webpages.

### Create Vis
The most basic way to display your map involves a call to ```cartodb.createVis(div_id, viz_json_url)``` in your webpage using a simple call:

``` js
    window.onload = function() {
        var viz-json = 'https://your_account_name.cartodb.com/link/to/your/viz/json';
        cartodb.createVis('map', viz-json);
    }
```

The documentation for `cartodb.createVis` is found [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#visualization).




### Create Layer

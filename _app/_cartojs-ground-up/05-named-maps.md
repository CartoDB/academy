---
title: 'CARTO.js from the ground up - Named Maps'
permalink: /courses/cartojs-ground-up/named-maps/
lesson_message: "Congrats on finishing Named Maps!"
---
<iframe width="100%" height="520" frameborder="0" src="{{ site.baseurl }}/t/03-cartodbjs-ground-up/lesson-5/named-maps-example.html" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

## Summary

_Named Maps_ allow you to make public maps out of private data. Unlike other maps created through our APIs, Named Maps need to be pre-configured; you set the SQL and CartoCSS ahead of time on the server, not in the browser as in normal CARTO.js usage. Updates to and deletions of the map need to be run with future authenticated API calls. On the surface, Named Maps look the same as other maps created through CARTO.js, but if you inspect how your browser interacts with the server, you will see that it only pulls the information that you pre-configure so you can control which data remains private.

If you're a developer who is working with data to which you don't own the license or for which you don't have the license to distribute publicly, or if you want to protect your data from misuse and modification, this tutorial is for you.

**This tutorial only works for users with paid accounts.** Check out [our plans]({{ site.carto-baseurl }}/pricing) for upgrade options.

**Note:** There is a limit of 4,096 Named Maps allowed per account. If you need to create more Named Maps, it is recommended to use a single Named Map and change the variables using placeholders, instead of uploading multiple [Named Map MapConfigs]({{ site.baseurl }}/carto-engine/maps-api/mapconfig/#named-map-layer-options).

#### Lesson goal

By the end of this lesson, you will be able to create a public map with private data that has user interaction enabled on select columns of your dataset. The map at the top of this page is an example of the Named Map we will be creating.

There are four main steps:

1. Loading data, making your dataset private
2. Constructing a config file, sending it to the server
3. Creating Named Maps
4. Managing Named Maps

#### Objectives

1. Create a Named Map that allows for user interaction with infowindows that show pre-selected data from your dataset
2. Manage Named Maps (create, update, list, and delete)

#### Data

For this tutorial we are going to use the Populated Places dataset from [Natural Earth](http://www.naturalearthdata.com). The Populated Places dataset is available from the CARTO Data library. For details about how to connect to a public dataset, see [Data library]({{ site.baseurl }}/carto-editor/datasets/#data-library).

#### HTML Template

[HTML template](https://github.com/CartoDB/cartodb.js/blob/gh-pages/examples/tutorials/named-maps-template.html) used in this tutorial.

#### Tools

- [curl commandline utility](http://curl.haxx.se/) -- installed by default on most Linux and OS X machines, accessible through [Cygwin](https://www.cygwin.com/) on PCs<br /><br />_**Tip:** If you are running cURL commands through a PC console, note that Windows only supports double quotes "" for cURL commands._
- [POSTMAN REST client](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en) -- a Chrome extension that allows for easy API calls

#### Documentation

Named Maps are part of CARTO's [Maps API]({{ site.baseurl }}/carto-engine/maps-api/named-maps/).


## Loading data, making dataset private

To get started, we'll be using the _Populated Places_ data found in Common Data. Copy the following link and import it into your account:

{% highlight html %}
https://common-data.carto.com/api/v2/sql?q=select%20*%20from%20ne_10m_populated_places_simple&filename=named_map_tutorial_table&format=shp
{% endhighlight %}

Not sure how to import your data? You can import using the [Editor]({{ site.baseurl }}/carto-editor/) or the [Import API]({{ site.baseurl }}/carto-engine/import-api/).

Once the data is imported, set it to "private" (see [Dataset Privacy Settings]({{ site.baseurl }}/carto-editor/datasets/#dataset-privacy) for more information). Also make sure that the dataset name is `named_map_tutorial_table`. You can change the name of your dataset by clicking on the dataset name in the upper left-hand corner and entering the new name.


## Constructing a config file, sending it to the server

Now that we have a private dataset to work from, we will style the data in the [Editor]({{ site.baseurl }}/carto-editor/) and copy the [CartoCSS](https://www.mapbox.com/tilemill/docs/manual/cartodb/) code to use for the configuration file we will send to the server to setup the Named Map. You can use any style you would like, but I am using the following settings.

<span class="wrap-border"><img src="{{ site.baseurl }}/img/course3/lesson5/img1.png" alt="map stylings used for named map" /></span>

By clicking [CartoCSS]({{ site.baseurl }}/carto-editor/maps/#cartocss) from the CARTO sidebar, you can see the stylings that you chose by using the Map layer wizard.

Now open a text editor and paste the following text into it. Notice the CartoCSS corresponds to what was done in the Editor above. Name the file `config.json`.

{% highlight javascript %}{
  "version": "0.0.1",
  "name": "namedmap_tutorial",
  "auth": {
    "method": "open"
  },
  "layergroup": {
    "layers": [{
      "type": "cartodb",
      "options": {
        "cartocss_version": "2.1.1",
        "cartocss": "#named_map_tutorial_table{ marker-fill-opacity: 0.5; marker-line-color: #FFF; marker-line-width: 0; marker-line-opacity: 1; marker-placement: point; marker-type: ellipse; marker-width: 10; marker-fill: #FFCC00; marker-allow-overlap: true; marker-comp-op: multiply; }",
        "sql": "SELECT * FROM named_map_tutorial_table",
        "interactivity": ["cartodb_id", "name", "pop_max"]
      }
    }]
  }
}
{% endhighlight %}

If you're familiar with the `cartodb.createLayer(...)` method from CARTO.js, this JSON object will [look somewhat familiar]({{ site.baseurl }}/carto-engine/carto-js/getting-started/#creating-visualizations-at-runtime). A layer source JSON object was also discussed in the [Map Academy course on CARTO.js]({{ site.academy-baseurl}}/courses/cartojs-ground-up/creating-basic-map-apps/#adding-multiple-layers-from-different-visualizations).

A major difference between what was previously seen in createLayer and the object above is the presence of the `"name"` key. This is where the term "Named Maps" comes from. The name of your map can be changed to whatever you want, but here we will just use `namedmap_tutorial`.

**Before moving on,** make sure that:

- there is a dataset in your account named `named_map_tutorial_table`
- the dataset is set to "private"
- you have a file named `config.json` with the JSON object above in it

Now that we have our private dataset and a config file that says how we want that data to be visualized, we need to send the information to the server. Make sure you have your API key on hand. You can get your API key through your [account dashboard]({{ site.baseurl }}/carto-engine/sql-api/authentication/#api-key).

Using the command line tool [curl](http://curl.haxx.se/), we create the map using an authenticated call. Scroll horizontally to see the full command. _Make sure that your working directory in your terminal is the same place where you stored `config.json`_.

{% highlight bash %}
curl -X POST 'https://{username}.carto.com/api/v1/map/named?api_key={api_key}' -H 'Content-Type: application/json' -d @config.json
{% endhighlight %}

For instance, your API call might look like this:
{% highlight bash %}
curl -X POST 'https://documentation.carto.com/api/v1/map/named?api_key=01a418d3a45d1137699a4ee05297cb92aecce3f4' -H 'Content-Type: application/json' -d @config.json
{% endhighlight %}

**Tip:** If you are running cURL commands through a PC console, note that Windows only supports double quotes "" for cURL commands.

A successful call will result in the following response from the server:

{% highlight javascript %}
{
  "template_id":"namedmap_tutorial"
}
{% endhighlight %}

This indicates that your map has been successfully created. The name after the : symbol is referred to as the `template_name`.

Now we have the information from the server response needed to construct our public maps out of the private dataset `named_map_tutorial_table`.


## Creating Named Maps

Having already created a Named Map, we will now look at how to use the CARTO.js library to bring the map's tiles to a webpage.

To create a basic version that has a basemap and interactivity on the data layer, we will use [createLayer]({{ site.baseurl }}/carto-engine/carto-js/api-methods/#cartodbcreatelayer) along with the [Leaflet library](http://leafletjs.com) similar to what was done in the [second Map Academy lesson]({{site.academy-baseurl }}/courses/cartojs-ground-up/creating-basic-map-apps/) on CARTO.js.

This is the recommended way to use Named Maps because the maps are instantiated on the fly so you do not need to worry about temporal URLs.

To get started, start with the [HTML template](https://github.com/CartoDB/academy/blob/master/_app/t/03-cartodbjs-ground-up/lesson-5/named-maps-template.html) again, and place the following code between the `<script>` tags:

{% highlight javascript %}function main() {
  // create leaflet map
  var map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false,
    center: [0, 0],
    zoomControl: true,
    zoom: 3
   });

  // add a base layer
  L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Stamen'
  }).addTo(map);

  // add CARTO layer with one sublayer
  cartodb.createLayer(map, {
    user_name: '{your_user_name}',
    type: 'namedmap',
    named_map: {
      name: "namedmap_tutorial",
      layers: [{
        layer_name: "t",
        interactivity: "cartodb_id, name, pop_max"
       }]
     }
    })
    .addTo(map)
    .done(function(layer) {
      layer.getSubLayer(0).setInteraction(true);

      // on mouseover
      layer.getSubLayer(0).on('featureOver', function(e, pos, pixel, data) {
        // print data to console log
        console.log("Event #" + data.cartodb_id + ", name " + data.name + ", max population: " + data.pop_max);
      });

      // show infowindows on click
      cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['cartodb_id','name', 'pop_max']);
    });
}

window.onload = main;
{% endhighlight %}

The only information you need to replace is the `user_name` value. Other than that, the layer source object already contains the name for map we created. Save the file and open it in your browser (File > Open...). It should look like the map at the <a href="#">top of this tutorial</a> and the code is [here](https://github.com/CartoDB/academy/blob/master/_app/t/03-cartodbjs-ground-up/lesson-5/named-maps-example.html).


## Managing Named Maps

Named Maps can be created, instantiated, updated, and deleted. You can also list the Named Maps already created in your account. We already covered creating and instantiating a Named Map, so now we will look at the remaining options.

#### List Named Maps

{% highlight bash %}
curl -X GET 'https://{username}.carto.com/api/v1/map/named?api_key={api_key}'
{% endhighlight %}

**Tip:** If you are running cURL commands through a PC console, note that Windows only supports double quotes "" for cURL commands.

#### Example response

{% highlight javascript %}
{
  "template_ids": [
    "tpl_729c017e_4c48_11e5_b9h0_0e018d66dc29",
    "tpl_2348efa4a2_gf96_11e5_9986_0e674067d321",
    "tpl_b805972c_6c5e_11e5_a7e0_0e5db1731f59",
    ]
}
{% endhighlight %}

#### Updating Named Maps

You can update a map as easily as you can create one. Just run the following command with the new config file.

{% highlight bash %}
curl -X PUT \
  'https://{username}.carto.com/api/v1/map/named/{template_name}?api_key={api_key}' \
  -H 'Content-Type: application/json' \
  -d @new_config.json
{% endhighlight %}

**Tip:** If you are running cURL commands through a PC console, note that Windows only supports double quotes "" for cURL commands.

The command above is useful if you later want to update your map with a different CartoCSS style or SQL statement.

Copy your previous configuration file into a new file called `new_config.json`. Now change your `cartocss` key to the following instead, but use all other options previously used.

{% highlight scss %}
#named_map_tutorial_table{ marker-fill-opacity: 0.5; marker-line-color: #c994c7; marker-line-width: 0; marker-line-opacity: 1; marker-placement: point; marker-type: ellipse; marker-width: 10; marker-fill: #dd1c77; marker-allow-overlap: true; marker-comp-op: multiply; }
{% endhighlight %}

Send your new config file to the server to update your map.

#### Deleting Named Maps

{% highlight bash %}
curl -X DELETE 'https://{username}.carto.com/api/v1/map/named/{template_name}?api_key={api_key}'
{% endhighlight %}

**Tip:** If you are running cURL commands through a PC console, note that Windows only supports double quotes "" for cURL commands.

## Summary

#### Files used in this tutorial
1. [HTML template](https://github.com/CartoDB/academy/blob/master/_app/t/03-cartodbjs-ground-up/lesson-5/named-maps-template.html)
2. [Named Map example](https://github.com/CartoDB/academy/blob/master/_app/t/03-cartodbjs-ground-up/lesson-5/named-maps-example.html)


## Moving forward

#### See also

- Named Maps documentation is in the [Maps API documentation page]({{ site.baseurl }}/carto-engine/maps-api.html)
- [Anonymous Maps]({{ site.baseurl }}/carto-engine/maps-api/anonymous-maps/) are a similar type of map, but not from private data
- Take your Named Maps further with [CARTO.js's]({{ site.baseurl }}/carto-engine/carto-js/) related methods:

    1. [layer.setAuthToken()]({{ site.baseurl }}/carto-engine/carto-js/api-methods/#layersetauthtokenauthtoken)
    2. [layer.setParams()]({{ site.baseurl }}/carto-engine/carto-js/api-methods/#layersetparamskey-value)

- Need more info about CARTO.js? Check out the [docs]({{ site.baseurl }}/carto-engine/carto-js/), [tutorials]({{ site.baseurl }}/tutorials/), and [Map Academy lessons]({{ site.academy-baseurl }}/courses/cartojs-ground-up/)
- More info about [curl](http://curl.haxx.se/)

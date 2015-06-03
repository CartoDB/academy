---
id: 5
layout: lesson
title:  "Lesson 5"
subtitle: "Infowindow Customization"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
tweet_text: ""
vizjson: "http://documentation.cartodb.com/api/v2/viz/f5f2e48c-7c07-11e4-949c-0e4fddd5de28/viz.json"
---

## Infowindow Bonanza

Infowindows are an important part of data visualizations. CartoDB aims to making them easy to use and customize. In this lesson we present a range of options for creating infowindows and hovers to allow you to bring out the potential of your map app.

If you want to preview the end products, see them here:

1. Infowindows via viz.json: [source code](exmaple) and [live example](alkjsd)
2. Infowindows from cartodb.js: [source code](example) and [live example](aljsdf)
3. Hovers using callback objects: [source code](example) and [live example](lajklsdf)

### CartoDB Editor &amp; the Basics of Interaction

The CartoDB Editor provides several packaged infowindow templates. The magic happens in the HTML that it generates in each case. As you toggle on more columns, more `<h2>` and `<p>` elements are added to the code.

![infowindow dialog explainer](/img/course3/lesson5/infowindow-explainer.png)

After you configure your infowindow to your liking, checkout the custom HTML box on the upper right by clicking on the <span style="color: #57B0F4; font-weight: bold;"></></span> symbol in the upper right.

From that customization, you'll see the HTML something like the following:

![html template]()

This is an HTML template in the format of a [mustache template](https://mustache.github.io/)! Mustache templates are awesome, and allow for flexible HTML output on variable input data. We'll explain the basics of mustaches here, but read more at [their page](https://mustache.github.io/) if you need more. Specifically helpful is the [JavaScript variation](https://github.com/janl/mustache.js).

What's below is basically an if-else statement on whether `repo` exists/is `true` or is `null`/`false`. If it's true, it will display `name`, otherwise it will display "No repos :(." As you can see, you can put in HTML elements so that once the template is processed, it will be rendered in HTML. Pretty snazzy.

{% highlight html %}
{% raw %}
{{#repo}}
  <b>{{name}}</b>
{{/repo}}
{{^repo}}
  No repos :(
{{/repo}}
{% endraw %}
{% endhighlight %}

You may have noticed that these templates work with JSON packets, not SQL tables. CartoDB.js uses the SQL API to return the data associated with the object that the user interacts with by doing a query on the `cartodb_id` of that row. The data in that row for the requested columns is returned as a JSON packet. A sample response if you configure interactivity with columns `repo`, `name`, `description`, `url`, and `webpage`:

{% highlight js %}
{
    "repo": "CartoDB/academy",
    "name": "Map Academy",
    "description": "CartoDB's open source repository of web mapping lesson",
    "url": "http://github.com/CartoDB/academy",
    "webpage": "http://academy.cartodb.com/"
}
{% endhighlight %}

All of that is done behind the scenes with the maps you make in the CartoDB Editor.

### From the Editor to the viz.json

The easiest way to use custom infowindows or hovers in CartoDB.js is by configuring them through the CartoDB Editor, grabbing the viz.json URL, and then using createVis or createLayer to make a map. The interaction you define through the Editor will carry through to your custom JavaScript map.

For this first part, import this dataset of otter mentions in Instagram photos:

{% highlight html %}
http://blahblahblah.instagrammmmmmmmminggggggg
{% endhighlight %}

Make a map and customize the infowindow template to the following:

{% highlight html %}
{% raw %}
<div class="cartodb-popup v2">
  <a href="#close" class="cartodb-popup-close-button close">x</a>
  <div class="cartodb-popup-content-wrapper">
    <div class="cartodb-popup-content">
      <h4>Otters</h4>
      {{#imageurl}}
      <img src="{{imageurl}}" />
      {{/imageurl}}
      {{^imageurl}}
      <p>No image for this otter sighting</p>
      {{/imageurl}}
      <h4>Otter Information</h4>
      <p>{{otter_info}}</p>
    </div>
  </div>
  <div class="cartodb-popup-tip-container"></div>
</div>
{% endraw %}
{% endhighlight %}


Once that dataset is in your account, we can use CartoDB.js to build a map that has the same infowindows. All you have to do is include the following code between the `<script>` tags in your HTML template:

{% highlight javascript %}
var vizjson = 'viz.json url'; // <-- grab this from the "Share" option while in the CartoDB Editor
cartodb.createVis('map',visjson);
{% endhighlight %}

You can programmatically control the columns displayed by using:

{% highlight javascript %}
layers[0].getSubLayer(0).setInteractivity('cartodb_id, otter_info, imageurl');
{% endhighlight %}

or turn on/off interaction with

{% highlight javascript %}
layers[0].getSubLayer(0).setInteraction(true);
{% endhighlight %}



### Medium

You can also programmatically create infowindows and hovers by 

{% highlight javascript %}
cdb.vis.Vis.addInfowindow(map_object, sublayer, array_of_columns, options);
{% endhighlight %}

Where `map_object` is the Leaflet or Google Maps map object, `sublayer` is the sublayer you want to be associated with the click or hover event, `array_of_columns` is a JavaScript array of column names (as strings). `options` is a JSON object with the following structure:

{% highlight javascript %}
{
    infowindowTemplate: 'infowindow_string',
    templateType: 'mustache',
    triggerEvent: 'featureClick',
    cursorInteraction: true
}
{% endhighlight %}

The hover window, called a Tooltip under the hood, can be accessed through:

{% highlight javascript %}
cdb.vis.Vis.addTooltip(map_object, sublayer, arr_of_cols, options);
{% endhighlight %}

https://github.com/CartoDB/training/blob/gh-pages/workshops_map.html#L107

All can be used with named maps as well (link to tutorial or webinar) as long as the interaction columns are defined in the configuration when the map is created.

### Hard

Using callback objects, etc.

Code here:
http://bl.ocks.org/ohasselblad/a0e06de1f6f1597c096b
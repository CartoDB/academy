---
id: 2
layout: lesson
title:  "Lesson 2"
subtitle: "Creating basic map apps"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
continue_link: "lesson-3"
tweet_text: "Lesson 2 from CartoDB.js from the ground up is coming soon!"
vizjson: "http://andye.cartodb.com/api/v2/viz/19de0ce2-3deb-11e4-b07b-0edbca4b5057/viz.json"
---

## Creating basic map apps -- Coming Soon

### Exploring the methods of CartoDB.js

If you take a look through the [documentation of CartoDB.js](http://docs.cartodb.com/cartodb-platform/cartodb-js.html), there are a lot of methods that you can use to boost power of your maps.

We saw in Lesson 1 that we can pull our map from CartoDB by using createVis and createLayer.

To begin, we'll be using the same template we used in Lesson 1. Download/copy it from [this link]({{site.baseurl}}/t/). We will also use a new viz.json. Grab it [here](#viz_json_link). 

We'll start working with createVis. Our goal is to do stuff after the map has loaded. To do this, we need to listen for when the map has been loaded and applied to our web page. We can use the JavaScript method `.done()` acting on createVis as below.

Paste the following snippet into the template and save it as `lesson-2-on-done.html`.

{% highlight javascript %}

window.onload = function () {
    var vizjson = 'link to viz.json file';
    cartodb.createVis('map',vizjson)
    .done({
        alert("Congrats, your map has initialized.");
    
    })

}

{% endhighlight %}
---
title: "Google Map Driving Directions Visualization"
permalink: /courses/cartojs-and-external-apis/google-driving-directions/
tweet_text: "Combine Google Driving Directions and CARTO.js @cartoDB"
lesson_message: "Congrats on mashing up Google Driving Directions and CARTO!"
redirect_from: /courses/cartodbjs-and-external-apis/google-driving-directions/
---

# Google Map Driving Directions Visualization

<iframe width="100%" height="520" frameborder="0" src="https://carto.com/academy/t/07-cartojs-and-external-apis/lesson-2/index.html" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

## Summary
This lesson describes how to use CARTO, the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) and [Google Directions Service](https://developers.google.com/maps/documentation/javascript/directions) to create an interactive map that generates a driving direction route from a clicked point to a destination point.

This lesson is for users who are familiar with JavaScript, and have already mastered the basics of creating a map with CARTO.js. If you are not familiar with CARTO.js, view the [CARTO.js documentation](https://carto.com/docs/carto-engine/carto-js/), and the [CARTO.js Map Academy course](https://carto.com/academy/courses/cartojs-ground-up/).

## The Data

We will be using a dataset of locations of public schools in San Francisco, California. The final map will use Google's Directions API to generate a driving direction route to San Francisco’s [Exploratorium museum](http://www.exploratorium.edu/), from any public school location the user clicks on the map.

If you want to work from your own account, [import this data](https://documentation.carto.com/tables/schools_public_pt/public), style it to your liking, and grab the viz.json file for later. Alternatively, you can use the viz.json files provided below, as an example.

## Resources

* [Google Developers Console Help](https://developers.google.com/console/help/new)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Google Directions Service](https://developers.google.com/maps/documentation/javascript/directions)
* [Lesson 2 viz.JSON](https://documentation.carto.com/api/v2/viz/4a885510-d6fb-11e4-aedb-0e4fddd5de28/viz.json): `https://documentation.carto.com/api/v2/viz/4a885510-d6fb-11e4-aedb-0e4fddd5de28/viz.json`

## Google's Terms of Service

When using Google's APIs, you agree to abide by their [Terms of Service](https://developers.google.com/maps/terms). Also refer to Google Maps JavaScript API documentation on [Usage Limits and Billing](https://developers.google.com/maps/documentation/javascript/usage). Keep in mind that Google's Direction API has [usage limits](https://developers.google.com/maps/documentation/directions/#Limits) on the number of directions requests that can be made using the API. In addition, the Directions data must be used in conjunction with a Google map. For complete details on usage, refer to the [Maps API Terms of Service License Restrictions](https://developers.google.com/maps/terms#10-license-restrictions).


## Getting Started

First, copy the HTML example code stored [here](https://github.com/CartoDB/academy/blob/master/_app/t/07-cartojs-and-external-apis/lesson-2/template.html) to a file in the text editor of your choice.  We will be adding code to this file throughout the lesson.

In order to use Google’s APIs, you will need a Google account, and to register your project in the [Google Developers Console](https://console.developers.google.com/).

Once you have created a Google account and are logged in to the [Google Developers Console](https://console.developers.google.com/), you will need to create a new project, enable the Google Maps JavaScript API for your new project, and grab your API key from the Credentials section of your Google Project dashboard. For detailed steps, check out [Google's documentation on how to activate APIs](https://developers.google.com/console/help/new/#activatingapis) following steps 1-3, and Google's documentation on [Credentials](https://developers.google.com/console/help/new/#credentials-access-security-and-identity) and [API Keys](https://developers.google.com/console/help/new/#api-keys). For the purposes of this tutorial, a Browser API key will work with the HTML example code.

Once you have your API key, refer to the html file you copied earlier. The Google maps library is included in the HTML document after the style tags within the body of the page.

{% highlight html %}
<body>
<div id="map"></div>

<!-- include google maps library -->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=APIKEY"></script>

<!-- include cartodb.js library -->
<script src="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js"></script>
{% endhighlight %}

Within the script tag for the google maps library, replace “APIKEY” with your API key.

## Creating the Map

Let’s walk through our starter code HTML file.

Within the head tag of the body, we have included a link to the CARTO CSS stylesheet and some basic CSS styles for our map to render it as full screen.

{% highlight html %}
<link rel="stylesheet" href="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css" />
<style>
  html, body, #map {
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
{% endhighlight %}

Within the body of the page, we have an empty div element with an id of “map,” which we will use to append our map to the DOM. We also include a link to CARTO.js and the Google Maps library. We will be writing the code for our map within a function called main().

{% highlight javascript %}
    <div id="map"></div>

    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=APIKEY"></script>

    <!-- include cartodb.js library -->
   <script src="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js"></script>

    <script>

    function main() {

    }

    window.onload = main;

    </script>
{% endhighlight %}

Now that we are familiar with our starter file, let's start adding code to create our map! Within the script tags in the body of the file, we need to add code to setup a Google road basemap that we will center over San Francisco at a zoom level of 13 in the function main(). Here's the full code:

{% highlight javascript %}
<script>
function main() {

     // Map center
     var myLatlng = new google.maps.LatLng(37.753, -122.433);

     // Map options
     var myOptions = {
          zoom: 13,
          center: myLatlng,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    // Render basemap
    map = new google.maps.Map(document.getElementById("map"), myOptions);

window.onload = main;
</script>
{% endhighlight %}

Next, we will setup the Google Directions service in order to later render directions using Google's Directions API. We create a Google DirectionsService object which will receive our directions request and return directions. Additionally, we use a Google DirectionsRenderer object to render the results. We also add the coordinates of the Exploratorium location as a Google Lat/Lng Object Literal, we will use the location of the Exploratorium as our destination when calculating directions. Add this code beneath the Google basemap code:

{% highlight javascript %}
<script>
function main() {

      // Create services for later rendering of directions
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
          directionsDisplay.setMap(map);

      // The location of the Exploratorium
      var exploratorium = new google.maps.LatLng(37.801434, -122.397561);

window.onload = main;
</script>
{% endhighlight %}

Grab your viz.json link, or use [this link](https://documentation.carto.com/api/v2/viz/4a885510-d6fb-11e4-aedb-0e4fddd5de28/viz.json). We will load our viz.json layer using the [CARTO.js method createLayer](https://carto.com/docs/cartodb-platform/cartodb-js/api-methods/#cartodbcreatelayermap-layersource--options--callback). We use the [CARTO.js method getSubLayer()](https://carto.com/docs/cartodb-platform/cartodb-js/api-methods/#sublayersetlayerdefinition), which provides access to the SQL and CSS of our map layer. We then enable interaction for the layer using the [CARTO.js sublayer method setInteraction()](https://carto.com/docs/cartodb-platform/cartodb-js/api-methods/#sublayersetinteractivitycartodbid-name-) which will enable [CARTO.js events](https://carto.com/docs/cartodb-platform/cartodb-js/events/) like [featureClick](https://carto.com/docs/cartodb-platform/cartodb-js/events/#layerfeatureclickevent-latlng-pos-data-layerindex). This will allow us to add mouse events like mouseover or click events.

{% highlight javascript %}
<script>

      // Our CARTO visualization
      var vizjson_url = "https://documentation.carto.com/api/v2/viz/4a885510-d6fb-11e4-aedb-0e4fddd5de28/viz.json";

      cartodb.createLayer(map, vizjson_url)
        .addTo(map)
        .done(function(layers) {

            var subLayer = layers.getSubLayer(0);

            subLayer.setInteraction(true); // Interaction for the layer must be enabled

            // Setup our event when an object is clicked
            layers.on('featureClick', function(e, latlng, pos, data){
              // the location of the clicked school
              var school = new google.maps.LatLng(latlng[0], latlng[1]);

            });
        });
      }
window.onload = main;
</script>
{% endhighlight %}

You can check that you have correctly added your map layer by navigating to a web browser to run your HTML file, or by loading up a [Python SimpeHTTPServer](https://docs.python.org/2/library/simplehttpserver.html).

The [featureClick](https://carto.com/docs/cartodb-platform/cartodb-js/events/#layerfeatureclickevent-latlng-pos-data-layerindex) event allows us to access the latitude and longitude data of our point data. When the user clicks on a point on our map, we grab the latitude and longitude coordinates for that point and store in a variable called "school."

In order to generate driving directions, we must send a request to the Google Directions Service using the `route()` method. Our request includes the origin of our trip, which we will need to set to the clicked school, our destination which we need to set as the Exploratorium coordinates, and our [Travel Mode](https://developers.google.com/maps/documentation/javascript/directions#TravelModes). In this case, we want driving directions although Google provides other travel modes including bicycling and walking. Add a request object to your code:

{% highlight html %}
<script>  
    // our DirectionsRequest
    var request = {
        origin : school,
        destination : exploratorium,
        travelMode : google.maps.TravelMode.DRIVING
    };
</script>
{% endhighlight %}

We pass our request to the Google `DirectionsService` object to generate the directions.

{% highlight html %}
<script>
    // use route method to generate directions
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        }
    });
</script>
{% endhighlight %}

Earlier in our code, we set directionsDisplay to draw on our map using setMap(), which will draw the route once it is generated by the Google Directions API:

{% highlight javascript %}
<script>
  directionsDisplay.setMap(map);
</script>
{% endhighlight %}

That's it! Here is the complete code for generating driving directions using the Google Maps API and CARTO, make sure to add your Google API key:

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <title>Driving directions to clicked point | CARTO.js</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <link rel="shortcut icon" href="https://carto.com/favicon.ico" />
    <link rel="stylesheet" href="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css" />

    <style>
      html, body, #map {
        height: 100%;
        padding: 0;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>

    <!-- include google maps library -->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDxv5iwj5VZ4rjHvmhQrSSkMDFj1eBj9Js"></script>

    <!-- include cartodb.js library -->
    <script src="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js"></script>

    <script>
      var map;
      function main() {

        // Map center
        var myLatlng = new google.maps.LatLng(37.753, -122.433);
        var myOptions = {
          zoom: 13,
          center: myLatlng,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        // Render basemap
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        // Create services for later rendering of directions
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

        // The location of the Exploratorium
        var exploratorium = new google.maps.LatLng(37.801434, -122.397561);

        // Our CARTO visualization
        var vizjson_url = "https://documentation.carto.com/api/v2/viz/4a885510-d6fb-11e4-aedb-0e4fddd5de28/viz.json";

        cartodb.createLayer(map, vizjson_url)
        .addTo(map)
        .done(function(layers) {

            var subLayer = layers.getSubLayer(0);

            subLayer.setInteraction(true); // Interaction for that layer must be enabled

            // Setup our event when an object is clicked
            layers.on('featureClick', function(e, latlng, pos, data){
              // the location of the clicked school
              var school = new google.maps.LatLng(latlng[0], latlng[1]);
              // our DirectionsRequest
              var request = {
                  origin : school,
                  destination : exploratorium,
                  travelMode : google.maps.TravelMode.DRIVING
              };
              // use route method to generate directions
              directionsService.route(request, function(response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {
                      directionsDisplay.setDirections(response);
                  }
              });
            });
        });
      }
      window.onload = main;
    </script>
  </body>
</html>
{% endhighlight %}

## Resources
* [CARTO.js documentation](https://carto.com/docs/cartodb-platform/cartodb-js/)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Google Directions Service](https://developers.google.com/maps/documentation/javascript/directions)

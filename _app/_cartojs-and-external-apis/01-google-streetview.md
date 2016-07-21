---
title: "Google Street View Infowindow Map Visualization"
permalink: /courses/cartojs-and-external-apis/google-streetview/
permalink_next: /courses/cartojs-and-external-apis/google-driving-directions/
tweet_text: "Combine Google Streetview and CARTO.js @CARTO"
lesson_message: "Congrats on mashing up Streeview and CARTO!"
---

# Google Street View Infowindow Map Visualization

<iframe width="100%" height="520" frameborder="0" src="https://carto.com/academy/t/07-cartojs-and-external-apis/lesson-1/index.html" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

## Summary
This tutorial will show you how to create a simple CARTO map visualization of locations with click infowindows that display a Google Street View Panorama of the location. The visualization uses a CARTO dataset, a CARTO basemap, the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) and the [Google Street View Service](https://developers.google.com/maps/documentation/javascript/streetview?hl=en). The tutorial walks through creating a pop-up information window that appears over selected points when clicking on the point.

This tutorial is for users who are familiar with JavaScript, and have already mastered the basics of creating a map with CARTO.js. If you are not familiar with CARTO.js, view the [CARTO.js documentation](https://carto.com/docs/carto-engine/carto-js/), the [CARTO.js Map Academy course](https://carto.com/academy/courses/cartojs-ground-up/), and the [CARTO.js tutorial](https://carto.com/docs/tutorials/create_map_cartodbjs).

## The Data

This tutorial uses a CARTO dataset of locations listed as part of an article on [amazing street view places by Mental Floss](http://mentalfloss.com/article/51904/16-amazing-places-visit-google-street-view). If you want to work from your own account, [import the data](https://documentation.carto.com/tables/amazingstreetviews), style it to your liking, and grab the viz.json file for later. Alternatively, you can use the viz.json file we list below as an example.


## Resources

* [Google Developers Console Help](https://developers.google.com/console/help/new)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Google Street View Service](https://developers.google.com/maps/documentation/javascript/streetview?hl=en)
* [Amazing Street Views viz.json](https://documentation.carto.com/api/v2/viz/d482b58a-a432-11e5-a413-0ecd1babdde5/viz.json)

## Google's Terms of Service

When using Google's APIs, you agree to abide by their [Terms of Service](https://developers.google.com/maps/terms). Also refer to Google Maps JavaScript API documentation on [Usage Limits and Billing](https://developers.google.com/maps/documentation/javascript/usage).


## Getting Started

First, copy the HTML starter code stored [here](https://github.com/CartoDB/academy/blob/master/_app/t/07-cartojs-and-external-apis/lesson-1/template.html) to a file in the text editor of your choice. We will be adding code to this file throughout the tutorial.

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

Within the head tag of the body, we have included a link to the CARTO CSS stylesheet, some basic CSS styles for our map to render it as full screen, as well as styles specifying the size of our infowindow.

{% highlight html %}
<link rel="stylesheet" href="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css" />
<style>
  html, body, #map {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .cartodb-popup-content-wrapper {
    height: 375px;
  }
  .cartodb-popup-content {
    height: 375px;   
  }
  #infowindow_template {
    width: 550px;
  }
  div.cartodb-popup.v2 {
    width: 550px  !important;
    height: 375px;
   }
   #panorama {
    width: 100%;
    height: 350px;
    }
</style>
{% endhighlight %}

Within the body of the page, we have an empty div element with an id of “map,” which we will use to append our map to the DOM.

{% highlight html %}
<div id="map"></div>
{% endhighlight %}

Now that we are familiar with our starter code, let's add additional code to create our map. Grab your viz.json link, or use [this link](https://documentation.carto.com/api/v2/viz/d482b58a-a432-11e5-a413-0ecd1babdde5/viz.json). Within the script tags in the body of the file, we need to add some additional code to setup a Leaflet map with a center of (0,0) and a zoom level of 2 in the function main(). We also add a basemap using Leaflet and our viz.json layer using the [CARTO.js createLayer() method](https://carto.com/docs/cartodb-platform/cartodb-js/api-methods/#cartodbcreatelayermap-layersource--options--callback). Here's the full code:

{% highlight javascript %}
<script>
function main() {

 var map = new L.Map('map', {
          center: [0,0],
          zoom: 2
        });

        L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
          attribution: ''
        }).addTo(map);

        cartodb.createLayer(map, 'https://documentation.carto.com/api/v2/viz/d482b58a-a432-11e5-a413-0ecd1babdde5/viz.json')
        .addTo(map)
        .done(function(layer) {

        });
       }
  window.onload = main;
</script>
{% endhighlight %}

Check that you have correctly added your map by navigating to a web browser to run your HTML file, or by loading up a [Python SimpeHTTPServer](https://docs.python.org/2/library/simplehttpserver.html).

Now that we have created our map, our next step is to create the CARTO infowindows. This will be a two step process in which we setup interactivity so that infowindows can be enabled in our JavaScript done function, and add an HTML template for our infowindows. Let's start by adding our infowindow HTML template code! Add the following script to your HTML file beneath <div id="map"></div> within the body of the file.

{% highlight html %}
<script type="infowindow/html" id="infowindow_template">
  <div class="cartodb-popup v2">
    <a href="#close" class="cartodb-popup-close-button close">x</a>
     <div class="cartodb-popup-content-wrapper">
       <div class="cartodb-popup-header">
        <div id="panorama"></div>
       </div>
       <div class="cartodb-popup-content">
         <h4>{{content.data.name}}</h4>
       </div>
     </div>
     <div class="cartodb-popup-tip-container"></div>
  </div>
</script>
{% endhighlight %}

Within our infowindow HTML template is a `div` with an id of "panorama". This div will be used later to append our Google Street View Panorama to the DOM once the panorama is generated. We also include a `h4` element and use [mustache templates](https://mustache.github.io/) to grab data from our table for the name of each Street View location. The infowindow template includes div elements that have CSS styles that correspond to styles setup in our CARTO stylesheet to style the display of the infowindow.

Now that we have added our infowindow template, we need to enable the infowindow interactivity in our JavaScript. Within the `.done` callback function in our JavaScript, add the following code:

{% highlight javascript %}
<script>
        .done(function(layer) {
          var sublayer = layer.getSubLayer(0);
          sublayer.setInteraction(true);

          cartodb.vis.Vis.addInfowindow(map, sublayer, ['cartodb_id', 'lat', 'lon', 'name'],{
            infowindowTemplate: $('#infowindow_template').html(),
            templateType: 'mustache'
          });

         layer.on('featureClick', function(e, latlng, pos, data, layerIndex){     
            var sv = new google.maps.StreetViewService();
            var myLatLng = new google.maps.LatLng(data.lat, data.lon);
            sv.getPanorama({location: myLatLng, radius: 50}, processSVData);
        });

</script>
{% endhighlight %}

Let's break the above code down further:

1. We use the [CARTO.js method getSubLayer()](https://carto.com/docs/cartodb-platform/cartodb-js/api-methods/#sublayersetlayerdefinition) in order to access the SQL and CartoCSS of our map layer.
1. We then enable interaction for the layer using the CARTO.js sublayer method [setInteraction()](https://carto.com/docs/cartodb-platform/cartodb-js/api-methods/#sublayersetinteractivitycartodbid-name-) which will enable [CARTO.js events](https://carto.com/docs/cartodb-platform/cartodb-js/events/) like [featureClick](https://carto.com/docs/cartodb-platform/cartodb-js/events/#layerfeatureclickevent-latlng-pos-data-layerindex). This will allow us to add events like mouseover or click events.


{% highlight html %}
<script>
    var sublayer = layer.getSubLayer(0);
    sublayer.setInteraction(true);
</script>
{% endhighlight %}

We then add a click infowindow to our map using the CARTO.js [`cartodb.vis.Vis.addInfowindow()` method](https://carto.com/docs/carto-platform/carto-js/ui-functions/#cartodbvisvisaddinfowindowmap-layer-fields--options). The method takes our map object, CARTO layer (or sublayer), and an array of column names for which interactivity will be enabled (the columns in our dataset that we need to access as part of our infowindow setup). Within our dataset are two columns that store our latitude and longitude coordinates separately called `lat` and `lon`. We also have a column called `name`, which stores titles for each Street View location. We pass our `infowindowTemplate` as a parameter, and setup the `templateType` as a mustache template. The method returns an [infowindow object](https://carto.com/docs/carto-platform/carto-js/ui-functions/#cartodbvisvisaddinfowindowmap-layer-fields--options)!

{% highlight html %}
<script>
    cartodb.vis.Vis.addInfowindow(map, sublayer, ['cartodb_id', 'lat', 'lon', 'name'],{
      infowindowTemplate: $('#infowindow_template').html(),
      templateType: 'mustache'
    });
</script>
{% endhighlight %}

We set up our custom [featureClick](https://carto.com/docs/cartodb-platform/cartodb-js/events/#layerfeatureclickevent-latlng-pos-data-layerindex) event so we can access our latitude and longitude data. When the user clicks on a point on our map, we grab the latitude and longitude coordinates for that point from our `lat` and `lon` columns in our CartoDB dataset and pass the coordinates to the Google Street View Service to make our request for the location panorama. We use the `StreetViewService` object to make a `StreetViewLocationRequest` using our latitude and longitude values. The `getPanorama()` function needs a callback function (`processSVData`) to execute upon retrieval of a result from the StreetView Service. If the response from StreetView Service is positive, we will be able to generate our panorama. If the result is negative, an error message will be logged to the console.


{% highlight html %}
<script>  
layer.on('featureClick', function(e, latlng, pos, data, layerIndex){
    var sv = new google.maps.StreetViewService();
    var myLatLng = new google.maps.LatLng(data.lat, data.lon);
    sv.getPanorama({location: myLatLng, radius: 50}, processSVData);
});
</script>
{% endhighlight %}

We pass our location data and the StreetView Service status to the `processSVData()` callback function. If the StreetViewStatus is positive, we can create our panorama! We select the `#panorama` div from our infowindow template to append our panorama to the DOM, use the StreetViewService method `setPosition` to set the location for the panorama, and specify no close button for the panorama. If the StreetViewStatus is negative and there is no Street View data for the location, we log an error message to the console.  

{% highlight html %}
<script>
    function processSVData(data, status) {

      if (status === google.maps.StreetViewStatus.OK) {
        console.log('creating panorama');
        var panorama;
        panorama = new google.maps.StreetViewPanorama(document.querySelector("#panorama"));
        panorama.setPosition(data.location.latLng);
        panorama.setPov(({
          heading: 265,
          pitch: 0
        }));
        panorama.setEnableCloseButton(false);
        panorama.setVisible(true);
      } else {
        console.error('Street View data not found for this location.');
      }
    }
</script>
{% endhighlight %}

That's it! Here is the complete code for setting up the infowindow, make sure to add your Google API key for it to work:

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <title>Google Street View</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" href="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css" />

    <style>
      html, body, #map {
        height: 100%;
        padding: 0;
        margin: 0;
      }
      .cartodb-popup-content-wrapper {
       height: 375px;
      }
      .cartodb-popup-content {
       height: 375px;   
      }
      #infowindow_template {
          width: 550px;
      }
      div.cartodb-popup.v2 {
        width: 550px  !important;
        height: 375px;
      }
      #panorama {
        width: 100%;
        height: 350px;
      }
    </style>

  </head>
  <body>
    <div id="map"></div>

    <script type="infowindow/html" id="infowindow_template">
      <div class="cartodb-popup v2">
        <a href="#close" class="cartodb-popup-close-button close">x</a>
         <div class="cartodb-popup-content-wrapper">
           <div class="cartodb-popup-header">
            <div id="panorama"></div>
           </div>
           <div class="cartodb-popup-content">
             <h4>{{content.data.name}}</h4>
           </div>
         </div>
         <div class="cartodb-popup-tip-container"></div>
      </div>
      </script>

    <!-- include google maps library -->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=APIKEY"></script>

    <!-- include cartodb.js library -->
    <script src="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js"></script>

    <script>
      function main() {

        var map = new L.Map('map', {
          center: [0,0],
          zoom: 2
        });

        L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
          attribution: ''
        }).addTo(map);

        cartodb.createLayer(map, 'https://documentation.carto.com/api/v2/viz/d482b58a-a432-11e5-a413-0ecd1babdde5/viz.json')
        .addTo(map)
        .done(function(layer) {

          var sublayer = layer.getSubLayer(0);
          sublayer.setInteraction(true);

          cartodb.vis.Vis.addInfowindow(map, sublayer, ['cartodb_id', 'lat', 'lon', 'name'],{
            infowindowTemplate: $('#infowindow_template').html(),
            templateType: 'mustache'
          });

         layer.on('featureClick', function(e, latlng, pos, data, layerIndex){     
            var sv = new google.maps.StreetViewService();
            var myLatLng = new google.maps.LatLng(data.lat, data.lon);
            sv.getPanorama({location: myLatLng, radius: 50}, processSVData);
          });

          function processSVData(data, status) {

            if (status === google.maps.StreetViewStatus.OK) {
                  console.log('creating panorama');
                  var panorama;
                  panorama = new google.maps.StreetViewPanorama(document.querySelector("#panorama"));
                  panorama.setPosition(data.location.latLng);
                  panorama.setPov(({
                    heading: 265,
                    pitch: 0
                  }));
                 panorama.setEnableCloseButton(false);
                panorama.setVisible(true);
            } else {
              console.error('Street View data not found for this location.');
            }
          }
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
* [Google Street View Service](https://developers.google.com/maps/documentation/javascript/streetview?hl=en)

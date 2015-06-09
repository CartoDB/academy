---
id: 1
layout: lesson
title:  "Lesson 1"
subtitle: "CartoCSS"
course: "Academy Lite"
course_slug: "05-academy-lite"
tweet_text: "Have 5 min free to learn map design? Check out our CartoCSS Basics."
lesson_message: "Congratulations! You’ve completed Lesson 1, and know how to style your maps with code now!"
vizjson: "https://documentation.cartodb.com/api/v2_1/viz/800cd86a-0ec2-11e5-88c1-0e018d66dc29/viz.json"
---

## Learn to style your maps with CartoCSS

<p><iframe src="//player.vimeo.com/video/120176143" width="700" height="393" frameborder="0"> </iframe></p>

In this lesson, we will give you a five minute overview of CartoCSS basics, which you can use to style your maps.

**Our goal with this lesson:**
Use CartoCSS to create custom styles for map polygons based on dataset categories.

By the end of this lesson, you will be able to make this map:

<iframe width='100%' height='520' frameborder='0' src='https://documentation.cartodb.com/viz/800cd86a-0ec2-11e5-88c1-0e018d66dc29/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

### Cascading Style Sheets for maps

Cascading Style Sheet code, or CSS, contains a selector that specifies the HTML element you’re applying style to, a property of that element that you’re going to change the style of, and a value that defines what you want the property to look like.

{% highlight css %}
selector {
  property: value;
}
{% endhighlight %}

CartoCSS is CSS specifically for map elements. Selectors are typically the HTML id name of a map layer, but they can also be other elements: 

{% highlight css %}
Map {
  marker-fill: #ffcc00;
}
{% endhighlight %}

In this lesson we’re targeting a map layer created from our “Null Island Election Districts” dataset, so our selector is #null_Island_el_dist.

**Where does CartoCSS code go?**

Any CSS code is placed in between style elements in the head of an HTML document:

{% highlight css %}
<style>
  html, body {
    padding: 0;
    margin: 0;
  }
  #cartodb-map {
    width: 100%;
    height: 100%;
    background: black;
  }
</style>
{% endhighlight %}

Or it can be placed in a separate .css document that gets imported into your HTML document with a line like this:

{% highlight html %}
<link rel="stylesheet" type="text/css" href="css/my-cartocss.css">
{% endhighlight %}

In our CartoDB interface, you can click on the CSS menu button and write code into the [CartoCSS editor panel](http://docs.cartodb.com/cartodb-editor.html#cartocss).

### CartoCSS properties and values

**CartoDB's default CartoCSS**
When you import a dataset into your CartoDB account and check it's Map View, you will see styling already applied to your data. CartoDB's default CartoCSS defines color, opacity, and line-width for polygons, point markers and/or lines. It’s values include color defined with [hexadecimal code](http://www.htmlgoodies.com/tutorials/colors/article.php/3478951), opacity values ranging from 0 (fully transparent) to 1 (fully opaque), and line width for stroke measured in pixels.

{% highlight css %}
#null_Island_el_dist {
  polygon-fill: #FF5C00;
  polygon-opacity: 0.7;
  line-color: #FFFFFF;
  line-width: 0.5;
  line-opacity: 1;
}
{% endhighlight %}

**Other CartoCSS properties**
A list of CartoCSS properties can be found [here](https://github.com/mapbox/carto/blob/master/docs/latest.md), including line-dasharray. The first number value for the line-dasharray property is dash width. The second is the width of the space between dashes. You can use more than one pair of dash width & space width numbers.

{% highlight css %}
#null_Island_el_dist {
  polygon-fill: #FF5C00;
  polygon-opacity: 0.7;
  line-color: #FFFFFF;
  line-width: 0.5;
  line-opacity: 1;
  line-dasharray: 10, 5, 2, 5, 2, 5;
}
{% endhighlight %}

### Styling a map by category
You can have your CartoCSS style rules apply to only a subset of your data. To do that use brackets containing a column name from your dataset, and only the column value you would like the style to apply to.

{% highlight css %}
#null_island_el_dist [winning_party = 'Nada']{
  polygon-fill: #FFA300;
}
{% endhighlight %}

### Using images with CartoCSS
Another CartoCSS property example is polygon-pattern-file. This property takes an image url for its value, because it is used to fill your polygon with a tiled picture. You can change the image fill opacity using the polygon-pattern-opacity property. If less than maximum opacity is used in addition to a polygon-fill color, the color will show up beneath the image fill layer. 

{% highlight css %}
#null_island_el_dist{
  polygon-opacity: 0.7;
  line-color: #FFFFFF;
  line-width: 0.5;
  line-opacity: 1;
  line-dasharray: 10, 5;
  polygon-pattern-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stephaniemongon/assets/20150607041630diag-w.png);
  polygon-pattern-opacity: .3;
}
{% endhighlight %}

### Learn More

Congratulations, you've completed a basic introduction to styling maps with CartoCSS! To learn more, check out our [Introduction to Map Design Map Academy](http://academy.cartodb.com/courses/02-design-for-beginners.html) course, or some of our other [tutorials](http://docs.cartodb.com/tutorials/conditional_styling.html).

### Reference

CartoCSS properties mentioned in this lesson:

+ [marker-fill](https://github.com/mapbox/carto/blob/master/docs/latest.md#marker-fill-color)
+ [polygon-fill](https://github.com/mapbox/carto/blob/master/docs/latest.md#polygon-fill-color)
+ [polygon-opacity](https://github.com/mapbox/carto/blob/master/docs/latest.md#polygon-opacity-float)
+ [line-color](https://github.com/mapbox/carto/blob/master/docs/latest.md#line-color-color)
+ [line-width](https://github.com/mapbox/carto/blob/master/docs/latest.md#line-width-float)
+ [line-opacity](https://github.com/mapbox/carto/blob/master/docs/latest.md#line-opacity-float)
+ [line-dasharray](https://github.com/mapbox/carto/blob/master/docs/latest.md#line-dasharray-numbers)
+ [polygon-pattern-file](https://github.com/mapbox/carto/blob/master/docs/latest.md#polygon-pattern-file-uri)
+ [polygon-pattern-opacity](https://github.com/mapbox/carto/blob/master/docs/latest.md#polygon-pattern-opacity-float)

**See also**

* Create an [intensity map](http://docs.cartodb.com/tutorials/intensity_map.html) from point data with CartoCSS. 
* Create a [choropleth map](http://docs.cartodb.com/tutorials/electoral_map.html) of election results.

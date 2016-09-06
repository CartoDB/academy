---
title: "Academy Lite — CartoCSS"
redirect_from: /courses/05-academy-lite/lesson-1.html
permalink: /courses/academy-lite/cartocss/
tweet_text: "Have 5 min free to learn map design? Check out our CartoCSS Basics. @cartoDB"
lesson_message: "Congratulations! You’ve completed CartoCSS in minutes, and know how to style your maps with code now!"
---
# Learn to Style Your Maps with CartoCSS

<p><iframe src="//player.vimeo.com/video/130347084" width="700" height="393" frameborder="0"> </iframe></p>

In this lesson, we will give you a five minute overview of CartoCSS basics, which you can use to style your maps.

**Our goal with this lesson:** Use CartoCSS to create custom styles for map polygons based on dataset categories.

By the end of this lesson, you will be able to make this map:

<iframe width='100%' height='520' frameborder='0' src='https://documentation.carto.com/viz/800cd86a-0ec2-11e5-88c1-0e018d66dc29/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>


## Cascading Style Sheets for Maps

CartoCSS is very similar in structure to _Cascading Style Sheet code_, or CSS. The code contains a selector that specifies the HTML element you’re applying style to, a property of that element that you’re going to change the style of, and a value that defines what you want the property to look like.

{% highlight scss %}
selector {
  property: value;
}
{% endhighlight %}

CartoCSS allows you to control styles specifically for map elements. Selectors are typically the name of the dataset you are visualizing on a map, but they can also be other elements:

{% highlight scss %}
Map {
  marker-fill: #ffcc00;
}
{% endhighlight %}

In this lesson we’re targeting a map layer created from our “Null Island Election Districts” dataset, so our selector is `#null_Island_el_dist`.

**Where does CartoCSS code go?**

In our CARTO interface, you can click on the CSS menu button and write code into the [CartoCSS editor panel](https://carto.com/docs/cartodb-editor/maps/#cartocss). If you're using HTML and CARTO.js to build your map, you can also write CartoCSS into your code using [these methods](/courses/cartojs-ground-up/basic-interactivity/#cartocss-strings-in-javascript).


## CartoCSS Properties and Values

**CARTO's default CartoCSS**

When you import a dataset into your CARTO account and check it's _Map View_, you will see styling already applied to your data. CARTO's default CartoCSS defines color, opacity, and line-width for polygons, point markers, and/or lines. It’s values include color defined with [hexadecimal code](http://www.htmlgoodies.com/tutorials/colors/article.php/3478951), opacity values ranging from 0 (fully transparent) to 1 (fully opaque), and line width for stroke measured in pixels.

{% highlight scss %}
#null_Island_el_dist {
  polygon-fill: #FF5C00;
  polygon-opacity: 0.7;
  line-color: #FFFFFF;
  line-width: 0.5;
  line-opacity: 1;
}
{% endhighlight %}

**Other CartoCSS properties**

A list of CartoCSS properties can be found [here](https://carto.com/docs/cartodb-platform/cartocss/properties/), including `line-dasharray`. The first number value for the `line-dasharray` property is dash width. The second is the width of the space between dashes. You can use more than one pair of dash width and space width numbers.

{% highlight scss %}
#null_Island_el_dist {
  polygon-fill: #FF5C00;
  polygon-opacity: 0.7;
  line-color: #FFFFFF;
  line-width: 0.5;
  line-opacity: 1;
  line-dasharray: 10, 5, 2, 5, 2, 5;
}
{% endhighlight %}


## Styling a map by category

You can have your CartoCSS style rules apply to only a subset of your data. To do that use brackets containing a column name from your dataset, and only the column value you would like the style to apply to.

{% highlight scss %}
#null_island_el_dist [winning_party = 'Nada']{
  polygon-fill: #FFA300;
}
{% endhighlight %}

We also used the CartoCSS below for labels.

{% highlight scss %}
#null_island_el_dist::labels {
  text-name: [district];
  text-face-name:'Open Sans Semibold';
  text-size: 17;
  text-label-position-tolerance: 10;
  text-fill: #a43b08;
  text-dy: 0;
  text-allow-overlap: true;
  text-placement: point;
  text-placement-type: simple;
  text-character-spacing: 2;
  text-halo-radius: 6;
}

#null_island_el_dist::labels [zoom <= 12]{
  text-size: 10;
  text-halo-radius: 3;
}

#null_island_el_dist::labels [winning_party = 'Nix'] {
  text-halo-fill: #ee8c8d;
}

#null_island_el_dist::labels [winning_party = 'Nada'] {
  text-halo-fill: #f5d089;
}

#null_island_el_dist::labels [district = 'District 1'] {
  text-dy: -10;
}

#null_island_el_dist::labels [district = 'District 6'] {
  text-dy: -5;
}
{% endhighlight %}


## Using images with CartoCSS

Another CartoCSS property example is polygon-pattern-file. This property takes an image url for its value, because it is used to fill your polygon with a tiled picture. You can change the image fill opacity using the polygon-pattern-opacity property. If less than maximum opacity is used in addition to a polygon-fill color, the color will show up beneath the image fill layer.

{% highlight scss %}
#null_island_el_dist{
  polygon-opacity: 0.7;
  line-color: #FFFFFF;
  line-width: 0.5;
  line-opacity: 1;
  line-dasharray: 10, 5;
  polygon-pattern-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stephaniemongon/assets/20150607041630diag-w.png);
  polygon-pattern-opacity: 0.3;
}
{% endhighlight %}


## Learn More

Congratulations, you've completed a basic introduction to styling maps with CartoCSS! To learn more, check out our [Introduction to Map Design Map Academy](/courses/design-for-beginners/) course, or some of our other [tutorials](https://carto.com/docs/tutorials/conditional_styling/). See some other ways to use CartoCSS by looking at our [courses on CARTO.js](/courses/cartojs-ground-up/basic-interactivity/).


## Reference

CartoCSS properties mentioned in this lesson:

+ [marker-fill](https://carto.com/docs/cartodb-platform/cartocss/properties/#marker-fill-color)
+ [polygon-fill](https://carto.com/docs/cartodb-platform/cartocss/properties/#polygon-fill-color)
+ [polygon-opacity](https://carto.com/docs/cartodb-platform/cartocss/properties/#polygon-opacity-float)
+ [line-color](https://carto.com/docs/cartodb-platform/cartocss/properties/#line-color-color)
+ [line-width](https://carto.com/docs/cartodb-platform/cartocss/properties/#line-width-float)
+ [line-opacity](https://carto.com/docs/cartodb-platform/cartocss/properties/#line-opacity-float)
+ [line-dasharray](https://carto.com/docs/cartodb-platform/cartocss/properties/#line-dasharray-numbers)
+ [polygon-pattern-file](https://carto.com/docs/cartodb-platform/cartocss/properties/#polygon-pattern-file-uri)
+ [polygon-pattern-opacity](https://carto.com/docs/cartodb-platform/cartocss/properties/#polygon-pattern-opacity-float)

Read more about [null island](http://en.wikipedia.org/wiki/Null_Island).

**See also**

* Create an [intensity map](https://carto.com/docs/tutorials/intensity_map/) from point data with CartoCSS.
* Create a [choropleth map](https://carto.com/docs/tutorials/electoral_map/) of election results.
* Take a conditional styling [tutorial](https://carto.com/docs/tutorials/conditional_styling/).

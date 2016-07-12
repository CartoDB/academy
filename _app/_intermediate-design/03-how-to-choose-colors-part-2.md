---
title:  "How to Choose Map Colors, Part 2"
permalink: /courses/intermediate-design/choose-colors-2/
tweet_text: "Step by step is the way to go. I've finished the second map academy design course. Check it out!"
---

## Color palettes tell a story

In the [last lesson](https://academy.carto.com/courses/intermediate-design/choose-colors-1/) we learned that colors affect each other in our visual perception. These color relationships also have meaning. For example, check out this choropleth map made by CARTO users [The International Federation of Red Cross and Red Crescent Societies:](http://www.ifrc.org/)

<iframe width="100%" height="520" frameborder="0" src="https://nlrc.carto.com/u/redcross-sims/viz/e70ac940-fd43-11e4-9243-0e853d047bba/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

They're using a light-to-dark sequential color scheme based on [ColorBrewer.](http://colorbrewer2.org/) It gives us enough information to figure out which areas in Nepal received more tarpaulins in a glance.

Complete color palettes tell the story of your data. There are two main kinds: qualitative and quantitative. Read on to learn which type to use for your map!

## Qualitative color palettes
Qualitative color palettes show categories. Use them when you need to show data that doesn't have numerical hierarchy. [LifeWatch INBO](http://lifewatch.inbo.be/) uses a qualitative palette well in this map:
  
<iframe width="100%" height="520" frameborder="0" src="https://inbo.carto.com/u/lifewatch/viz/6a22a626-c509-11e5-8ec2-0e674067d321/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

There aren't any numerical attributes illustrated on this map, like length of migration route or how long each took. The point of this map is to demonstrate which route belongs to each bird. It's easy for viewers to pick out each route because of the [contrast between hues.](https://academy.carto.com/courses/intermediate-design/choose-colors-1/#color-relationships)

#### Make your own
The CARTO Builder's Formula Widget gives you a 5-color qualitative palette by default if you are coloring by category. If your data has more than 5 categories, our system automatically groups the rest into an 'Other' category and colors them gray. We give you 10 default categories with the 11th as gray if you are styling a Builder map's layer by Value in a column, or using the Editor's [Category Wizard.](https://carto.com/academy/courses/intermediate-design/which-kind-of-map-should-i-make/#category-wizard) You can pick your own colors though! 

You should aim for hues that are not [analagous](https://academy.carto.com/courses/intermediate-design/choose-colors-1/#color-relationships), because if they are too visually similar your audience will have a harder time differentiating them. Like in this map:

<iframe width="100%" height="520" frameborder="0" src="https://documentation.carto.com/viz/6b5f40ea-d27d-45d9-82ba-43060fdf65a6/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

Notice how the different tornado routes are easier to identify in this map:

<iframe width="100%" height="520" frameborder="0" src="https://documentation.carto.com/viz/290789dd-a68a-426a-95de-8b9b990ac72b/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

In fact if you have more than 12 categories it gets hard to choose colors that contrast enough. At that point we recommend grouping your data into fewer categories.

For a real challenge try to make a perceptual color palette! Some colors will appear more prominent even if you keep saturation and value the same for all your palette hues. That's because some colors are inherently brighter in our perception. For example in the rainbow palette below, <span style="color: #FF0000;">red</span> stands out more than <span style="color: #3fbbba;">cyan</span>.

![uneven_rainbow]({{site.baseurl}}/img/course6/lesson3/uneven_rainbow.png)

Perceptual quantitative palettes take this into account. In perceptual palettes hue, saturation, and value are adjusted so that one color doesn't look more dominant than another. This is valuable because one category's data won't be emphasized over another in your map. This perceptual example is more visually even:

![perceptual_rainbow]({{site.baseurl}}/img/course6/lesson3/perceptual_rainbow.png)

This is where your color adjustment skills from the [last lesson](https://academy.carto.com/courses/intermediate-design/choose-colors-1/) come in handy!

## Quantitative color palettes
Use quantitative palettes if you're trying to show rank in your data. There are two kinds: sequential and divergent.  

### Sequential palettes
You can use sequential palettes to show order by specific amounts, like in the choropleth at the beginning of this lesson. You can also use them to illustrate ordinal data, like in this map by CARTO users [AppGeo](http://www.appgeo.com/) showing *more* and *less* coyote complaints.

<iframe width="100%" height="520" frameborder="0" src="https://appgeo.carto.com/u/roverland/viz/6dc0b1f2-ef75-11e4-a378-0e49835281d6/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

#### Make your own
CARTO gives you a choice of light-to-dark or dark-to-light sequential palettes. Generally lighter colors are understood as *less* and darker colors as *more*. You can reverse that if you're using a dark basemap and want your *more* values to stand out most. Make sure to use a legend.

You can also create your own palettes in CARTO! Enter the colors you want in your map's swatch color pickers or CartoCSS code. 

Since there are no exact rules for adjusting color to get the best palette, it requires experimentation and using your own judgement. There are guidelines though! According to [Cynthia Brewer](http://colorbrewer2.org/learnmore/schemes_full.html) changes in lightness should be the most prominent difference across sequential palette colors. A good starting point is to pick one color and incrementally change it's [value](https://academy.carto.com/courses/intermediate-design/choose-colors-1/#hue-saturation-and-value) for each swatch, while keeping hue and saturation the same.

A quick CartoCSS trick for this is **lighten**—or **darken** if you're starting with a light color.

{% highlight css %}
lighten(#006D2C, 10%);
{% endhighlight %}

We used both in this map of Valencia, with data taken from [the Data Observatory:](https://cartodb.github.io/bigmetadata/tags.spain/tags.boundary.html)

<iframe width="100%" height="520" frameborder="0" src="https://documentation.carto.com/viz/4e6a659c-b42c-43e3-98e2-f2df1c034711/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

Notice we used a variable in this map's code below, `@grn`. It makes editing more efficient. CartoCSS variables must be prepended with an @ symbol.

{% highlight css %}
@grn: #4c9b82;

#valencia_rented_dwellings{
  polygon-fill: #444444;
  polygon-opacity: 1;
  line-color: #444444;
  line-width: .8;
  line-opacity: 1;
  line-comp-op: overlay;
}
#valencia_rented_dwellings [ pct_of_total_dwellings_rented <= 47.3333333333333] {
   polygon-fill: darken(@grn, 20%);
}
#valencia_rented_dwellings [ pct_of_total_dwellings_rented <= 20.1834862385321] {
   polygon-fill: darken(@grn, 10%);
}
#valencia_rented_dwellings [ pct_of_total_dwellings_rented <= 13.5802469135802] {
   polygon-fill: @grn;
}
#valencia_rented_dwellings [ pct_of_total_dwellings_rented <= 9.2896174863388] {
   polygon-fill: lighten(@grn, 10%);
}
#valencia_rented_dwellings [ pct_of_total_dwellings_rented <= 5.55555555555556] {
   polygon-fill: lighten(@grn, 20%);
}
{% endhighlight %} 

Explore other color-generating shortcuts with [these](https://carto.com/docs/carto-engine/cartocss/properties/#color) CartoCSS parameters!

You should aim for equal value differences between sequential palette colors. The change in brightness between our map's last two legend swatches looks more dramatic than between the first two:

![valencia_lighten]({{site.baseurl}}/img/course6/lesson3/valencia_lighten.png)

You can check value (lightness) numbers for each swatch with tools like this [browser extension](https://chrome.google.com/webstore/detail/eye-dropper/hmdcmlfkchdmnmnmheododdhjedfccka/related?hl=en). Then you can adjust those numbers in your [preferred color picker tool](http://mashable.com/2013/01/15/color-scheme-tools/#LpxUevvRxZqb), and paste the output color's hex code into your map's CartoCSS or swatch color picker. For example we edited the palette above so the value changed by 15 between each swatch:

![valencia_value_15]({{site.baseurl}}/img/course6/lesson3/valencia_value_15.png)

It's easier to see the difference between polygons now. To make our swatches stand out from each other even more though we can adjust the saturation, and hue. CARTO already has a default <span style="color: #006625;">green</span> sequential palette that works better:

![cdb_seq_green]({{site.baseurl}}/img/course6/lesson3/cdb_seq_green.png)

This palette is better because it's colors make it easier to differentiate our map's polygons at a glance. Compare the map above to this one:

<iframe width="100%" height="520" frameborder="0" src="https://documentation.carto.com/viz/6d142c66-23e8-4bac-930c-edb9de107baf/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

### Divergent palettes
Use a divergent palette when you want to highlight a natural midpoint in your data, for example when you are mapping temperature and have values above and below zero degrees. Divergent palettes show two opposing hues radiating out from a neutral midpoint color. They are often used for [election maps.](https://gist.github.com/ohasselblad/03a1c707ffafffbbd277) Here's a different kind of example showing the male vs. female percentage of total population in Spanish census tracts:

<iframe width="100%" height="520" frameborder="0" src="https://documentation.carto.com/viz/84bce9f8-c7f1-45a9-82ef-258c2eb5f802/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

#### Make your own
A divergent palette is basically two sequential palettes. To pick the edge colors let's start with one hue, and use CartoCSS [spin](https://carto.com/docs/carto-engine/cartocss/properties/#color) to get an opposing hue from across the color wheel.

![itten_color_wheel]({{site.baseurl}}/img/course6/lesson3/color_wheel_itten.png)

We're starting with <span style="color: #FF0000;">red</span>. If we spin by 180 degrees we get the color with maximum contrast from our starting hue: <span style="color: #006625;">green</span>.

{% highlight css %}
spin(#da0057, 180);
{% endhighlight %}

![red_green]({{site.baseurl}}/img/course6/lesson3/red_green.png)

We want to avoid pure red/pure green combinations for our colorblind users though, so instead we can spin by more degrees. This gives us <span style="color: #2167AB;">blue</span>:

{% highlight css %}
spin(#da0057, 225);
{% endhighlight %}

![red_blue]({{site.baseurl}}/img/course6/lesson3/red_blue.png)

It's ok to spin by more or less than 180 degrees since the opposing hues don't need to have maximum contrast. Just try to avoid neighboring wheel colors.

Now we can pick a neutral color, and use [mix](https://carto.com/docs/carto-engine/cartocss/properties/#color) to find palette swatches between it and the <span style="color: #FF0000;">red</span> end of our palette. Our neutral is light gray, `#ccc`. This mix yields a color that has a higher percentage of <span style="color: #FF0000;">red</span> than gray: 

{% highlight css %}
mix(#da0057, #ccc, 66%);
{% endhighlight %}

![red_66]({{site.baseurl}}/img/course6/lesson3/red_66.png)

This mix uses less <span style="color: #FF0000;">red</span>:

{% highlight css %}
mix(#da0057, #ccc, 33%);
{% endhighlight %}

![red_full]({{site.baseurl}}/img/course6/lesson3/red_full.png)

With a [color picker](https://chrome.google.com/webstore/detail/eye-dropper/hmdcmlfkchdmnmnmheododdhjedfccka/related?hl=en) we can find the hex value for our <span style="color: #2167AB;">blue</span> spin result. Then we can use it with mix for the <span style="color: #2167AB;">blue</span> side of our palette:

{% highlight css %}
mix(#2279e9, #ccc, 33%);
{% endhighlight %}

![blue_33]({{site.baseurl}}/img/course6/lesson3/blue_33.png)

{% highlight css %}
mix(#2279e9, #ccc, 66%);
{% endhighlight %}

![blue_full]({{site.baseurl}}/img/course6/lesson3/blue_full.png)

Here's our whole sequential palette so far.

![rb_divergent]({{site.baseurl}}/img/course6/lesson3/rb_divergent.png)

This palette works, but we can make it even easier to see differences between polygons using this if we tweak hue, saturation and value as mentioned in the sequential palette section above. That's already been done for the default CARTO palette used in the map above. 

Notice we can even make the original <span style="color: #2167AB;">blue</span> hue closer to <span style="color: #006625;">green</span>. For color-blind viewers the resulting <span style="color: #009392;">teal</span> color is still distinguishable from the toned-down <span style="color: #FF0000;">red</span> at the other end.

![divergent_default]({{site.baseurl}}/img/course6/lesson3/divergent_default.png)

Congratulations, you've just learned a lot about cartographic color palettes and some CartoCSS tricks! Here is a color picker tool to help you quickly preview color palettes, designed by [one of CARTO's Solutions Engineers](https://github.com/AbelVM). You can also edit hex colors in it to customize them:

<a href="http://cartodb.github.io/labs-colorscales/">![abel_picker]({{site.baseurl}}/img/course6/lesson3/abel_picker.png)</a>

We also have a feature called [Turbo-Carto](https://github.com/CartoDB/turbo-carto) that provides color ramps for you, and makes writing CartoCSS conditions even easier. It calculates choropleth bins for you, so you can filter a dataset and have the bins/palette colors automatically change as needed. Learn more about it [here.](https://blog.carto.com/turbo-carto/)

{% highlight css %}
/* Creating a color ramp with Turbo Carto */
marker-fill: ramp([your_column_name], colorbrewer(Greens));
/* Changing symbol sizes with Turbo Carto */
marker-width: ramp([your_column_name], 4, 18, 6 jenks));
/* Where 4 is the minimum size, 18 the max size, 6, the number of buckets, and jenks the quantification method */
{% endhighlight %}

Learn to refine your maps with even more advanced CartoCSS in our [next lesson on composite operations](https://academy.carto.com/courses/intermediate-design/use-composite-operations/).
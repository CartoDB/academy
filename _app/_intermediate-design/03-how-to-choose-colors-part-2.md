---
title:  "How to Choose Map Colors, Part 2"
permalink: /courses/intermediate-design/choose-colors-2/
tweet_text: "Step by step is the way to go. I've finished the second map academy design course. Check it out!"
---

## Color palettes tell a story

In the last lesson we learned that colors affect each other in our visual perception. These color relationships also have meaning. For example, check out this choropleth map made by CartoDB users [GIS People:](http://www.gispeople.com.au/)

<iframe width="100%" height="520" frameborder="0" src="https://gisp.cartodb.com/u/gispeople/viz/07a48aae-3982-11e5-ad92-0e853d047bba/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

We can tell that the red-colored Gold Coast City Council spends more on staff than the yellow-colored Toowoomba Regional Council because it's polygon is darker. The light to dark sequential color scheme here gives us enough information to figure out which council areas spend the most on staff in a glance.

Complete color palettes tell the story of your data. There are two main kinds: qualitative and quantitative. Read on to learn which type to use for your map!

## Qualitative color palettes
Qualitative color palettes show categories. Use them when you need to show data that doesn't have numerical hierarchy. [LifeWatch INBO](http://lifewatch.inbo.be/) uses a qualitative palette well in this map:
  
<iframe width="100%" height="520" frameborder="0" src="https://inbo.cartodb.com/u/lifewatch/viz/6a22a626-c509-11e5-8ec2-0e674067d321/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

There aren't any numerical attributes illustrated on this map, like length of migration route or how long each took. The point of this map is to demonstrate which route belongs to each bird. It's easy for viewers to pick out each route because of the [contrast between hues.](link to last lesson itten wheel)

#### Make your own
CartoDB's Category Wizard gives you a 10-color qualitative palette by default. If your data has more than 10 categories, our system automatically groups the rest into an 'Other' category and colors them gray. You can pick your own colors though! 

You should aim for hues that are not [analagous,](link to last lesson) because if they are too visually similar your audience will have a harder time differentiating them. Like in this map:

<iframe width="100%" height="520" frameborder="0" src="https://team.cartodb.com/u/stephaniemongon/viz/e72f1f40-3260-11e6-b082-0e3ff518bd15/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

Notice how the different tornado routes are easier to identify in this map:

<iframe width="100%" height="520" frameborder="0" src="https://team.cartodb.com/u/stephaniemongon/viz/d4ed8b56-325f-11e6-ae44-0ecd1babdde5/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

In fact if you have more than 12 categories it gets hard to choose colors that contrast enough. At that point we recommend grouping your data into fewer categories.

For a real challenge try to make a perceptual color palette! Some colors will appear more prominent even if you keep saturation and value the same for all your palette hues. That's because some colors are inherently brighter in our perception. For example in the rainbow palette below, red stands out more than cyan.

![uneven_rainbow]({{site.baseurl}}/img/course6/lesson3/uneven_rainbow.png)

Perceptual quantitative palettes take this into account. In perceptual palettes hue, saturation, and value are adjusted so that one color doesn't look more dominant than another. This is valuable because one category's data won't be emphasized over another in your map. This perceptual example is more visually even:

<!-- placeholder: replace w/new palettes -->
![perceptual_rainbow]({{site.baseurl}}/img/course6/lesson3/perceptual_rainbow.png)

This is where your color adjustment skills from the last lesson come in handy!

## Quantitative color palettes
Use quantitative palettes if you're trying to show rank in your data. There are two kinds: sequential and divergent.  

### Sequential palettes
You can use sequential palettes to show order by specific amounts, like in the choropleth at the beginning of this lesson. You can also use them to illustrate ordinal data, like this map from [Cardinal data]() showing **more than** and **less than**.

#### Make your own
CartoDB's choropleth wizard gives you a choice of light-to-dark or dark-to-light sequential palettes. Generally lighter colors are understood as *less* and darker colors as *more*. You can reverse that if you're using a dark basemap and want your *more* values to stand out most. Make sure to use a legend.

You can also create your own palettes in CartoDB! Enter the colors you want in your map's swatch color pickers or CartoCSS code. 

Since there are no exact rules for adjusting color to get the best palette, it requires experimentation and using your own judgement. There are guidelines though! According to [Cynthia Brewer](http://colorbrewer2.org/learnmore/schemes_full.html) changes in lightness should be the most prominent difference across sequential palette colors. A good starting point is to pick one color and incrementally change it's [value](link to last lesson) for each swatch, while keeping hue and saturation the same.

A quick CartoCSS trick for this is **lighten**—or **darken** if you're starting with a light color.

{% highlight css %}
lighten(#ace, 10%);
{% endhighlight %}

<!-- valencia with cartocss panel open showing lighten -->

Explore other color-generating shortcuts with [these](https://docs.cartodb.com/cartodb-platform/cartocss/properties/) CartoCSS parameters!

You should aim for equal value differences between sequential palette colors. The change in brightness between our map's last two legend swatches looks more dramatic than between the first two.

<!-- uneven lightness legend up close -->

You can check value (lightness) numbers for each swatch with tools like this [browser extension](https://chrome.google.com/webstore/detail/eye-dropper/hmdcmlfkchdmnmnmheododdhjedfccka/related?hl=en). Then you can adjust those numbers in your [preferred color picker tool,]() and paste the output color's hex code into your map's CartoCSS or swatch color picker. For example we edited the palette above so the value changed by 15 between each swatch:

<!-- even lightness legend up close -->

It's easier to see the difference between polygons now, but to make our swatches stand out from each other even more we can tweak the saturation, and even hue. CartoDB already has a default close to ours that works better, based on [ColorBrewer](http://colorbrewer2.org/):

![cdb_seq_green]({{site.baseurl}}/img/course6/lesson3/cdb_seq_green.png)

<!-- 3 up of valencia maps with each color palette -->

### Divergent palettes
Use a divergent palette when you want to highlight a natural midpoint in your data, for example when you are mapping temperature and have values above and below zero degrees. Divergent palettes show two opposing hues radiating out from a neutral midpoint color. Here's an example from CartoDB users []():


#### Make your own
A divergent palette is basically two sequential palettes. To pick the edge colors let's start with one hue, and use CartoCSS [spin](https://docs.cartodb.com/cartodb-platform/cartocss/properties/#color) to get an opposing hue from across the color wheel.

![itten_color_wheel]({{site.baseurl}}/img/course6/lesson3/color_wheel_itten.png)

We're starting with red. If we spin by 180 degrees we get the color with maximum contrast from our starting hue: green.

{% highlight css %}
spin(#da0057, 180);
{% endhighlight %}

![red_green]({{site.baseurl}}/img/course6/lesson3/red_green.png)

We want to avoid red/green combinations for our colorblind users though, so instead we can spin by more degrees. This gives us blue:

{% highlight css %}
spin(#da0057, 225);
{% endhighlight %}

![red_blue]({{site.baseurl}}/img/course6/lesson3/red_blue.png)

It's ok to spin by more or less than 180 degrees since the opposing hues don't need to have maximum contrast. Just try to avoid neighboring wheel colors.

Now we can pick a neutral color, and use [mix](https://docs.cartodb.com/cartodb-platform/cartocss/properties/#color) to find palette swatches between it and the red end of our palette. Our neutral is light gray, #ccc. This mix yields a color that has a higher percentage of red than gray: 

{% highlight css %}
mix(#da0057, #ccc, 66%);
{% endhighlight %}

![red_66]({{site.baseurl}}/img/course6/lesson3/red_66.png)

This mix uses less red:

{% highlight css %}
mix(#da0057, #ccc, 33%);
{% endhighlight %}

![red_full]({{site.baseurl}}/img/course6/lesson3/red_full.png)

With a [color picker](https://chrome.google.com/webstore/detail/eye-dropper/hmdcmlfkchdmnmnmheododdhjedfccka/related?hl=en) we can find the hex value for our blue spin result. Then we can use it with mix for the blue side of our palette:

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

It needs some hue, saturation and value tweaking mentioned in the sequential palette section above. That's already been done for one of our default CartoDB palettes!

![cdb_rb_divergent]({{site.baseurl}}/img/course6/lesson3/cdb_rb_divergent.png)

Now we can use it to show how much city populations are above or below the poverty line:

<!-- divergent map -->

Congratulations, you've just learned a lot about cartographic color palettes and some CartoCSS tricks! Here is a color picker tool to help you make your own.

<!-- abel's picker -->

Learn to refine your maps with even more advanced CartoCSS in our next lesson on composite operations.


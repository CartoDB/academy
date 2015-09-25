---
id: 4
layout: lesson
title:  "Lesson 4"
subtitle: "How do I use Composite Operations?"
course: "Intermediate Map Design"
course_slug: "06-intermediate-design"
continue_link:
tweet_text: "Step by step is the way to go. I've finished the second map academy design course. Check it out!"
vizjson: "https://documentation.cartodb.com/api/v2/viz/4e76d67c-4d31-11e5-9963-0e853d047bba/viz.json"
---

## What are Composite Operations?

In the last lesson we saw how colors are used to explain your map's data. We learned about contrast, which is used well in this [London crime incident map](https://data.police.uk/) to make markers stand out against the basemap:

![london-crime-incidents]({{site.baseurl}}/img/course6/lesson4/london_crime_incidents.png)

This dataset has a lot of overlapping markers though. The default marker strokes show us that overlaps exist, but because a solid fill color is used with markers of this size it's unclear how many are overlapping. That makes it harder for our map readers to compare areas and get a sense of which has more crime incidents.

We can use color in an even better way to fix this though. Look what happens when we choose **multiply** from the simple wizard's composite operation pulldown menu:

![multiply-anim]({{site.baseurl}}/img/course6/lesson4/multiply_anim.gif)

The areas of greatest density stand out easily because they've become red. In the first map above overlapping colors were kept separate, like laying one piece of opaque colored paper on top of another. In the second map the overlapping parts effect each other. Hue, saturation and brightness change in the denser areas based on a blend of color information from each overlapping layer. 

Composite operations are blending modes for your map layers. They fall into two main categories: color and [alpha](https://msdn.microsoft.com/en-us/library/windows/desktop/dd183352(v=vs.85).aspx), and can be applied to all non-basemap elements in your map by adding a line like this to your CartoCSS code:

{% highlight css %}
comp-op: multiply;
{% endhighlight %}

Comp-ops can also be applied to different elements individually, like markers, polygons, lines or text: 

{% highlight css %}
marker-comp-op: multiply;
polygon-comp-op: color-burn;
text-comp-op: screen;
{% endhighlight %}

The layer (or text) that you choose the composite operation in is called the source. It's composite operation is applied to each layer beneath, which are called destination layers. In CartoDB the source layer itself needs to have a color fill, but it's composite operations apply to destination layers with color or texture fills, even raster ones. In this lesson we will be applying composite operations to a marker source layer, that's on top of one destination layer containing lines and another destination layer containing a polygon with raster fill.

[Mapnik](https://github.com/mapnik/mapnik/wiki/Compositing) gives us over 30 composite operations to choose from. You can use any of these in your map's custom CartoCSS panel, but many of our wizards also give you menu options for the most popular ones. This lesson explains what they do.

## Color Composite Operations

### Multiply

Multiply literally multiplies the color of the top layer by the color of each layer beneath, which usually means overlapping areas become darker. 

A layer's color is made of a mix of red, green and blue color channels. Each channel is assigned a percentage decimal value from 0 to 1. If all channels had a 0 value the color would be completely black; if they all had a value of 1 the color would be completely white. Multiply takes these channel numbers for one layer and multiplies them with the channel numbers of another. Your colors will often get darker because multiplying two decimal numbers together gives you a smaller decimal, which is therefore closer to 0 (black). Multiplying 1 (white) by another value will give you that other value, so the area where white mixes with another color will become that other color. Multiplying any color by 0 (black) will always render black. You can picture it like layering colored sheets of cellophane over one another; white disappears, black stays black. Use this when you want to darken overlapping areas in your map.

![multiply]({{site.baseurl}}/img/course6/lesson4/multiply.png)

Choosing multiply from the Simple Wizard's composite operation menu, like in the animation above, adds this to our map's CartoCSS:

{% highlight css %}
marker-comp-op: multiply;
{% endhighlight %}

### Screen

Like multiply, screen multiplies the overlapping areas. Unlike multiply, it subtracts the color channel numbers from 1 to invert them. This makes the overlapping areas brighter. If white is used, it won't change appearance. Black areas will disappear. Use this when you want to lighten overlapping areas in your map.

{% highlight css %}
marker-comp-op: screen;
{% endhighlight %}

![screen]({{site.baseurl}}/img/course6/lesson4/screen.png)

### Overlay

Overlay is a color blend mode that combines multiply and screen composite operations. Black appears as dark as it originally is in it's layer; white appears as bright as it originally is in it's layer. How purely other colors are rendered depends on how close they are to white or black. The closer a color is in value to a midtone gray, the less it will appear. Use this when you want to show both light and dark in your overlapping layers, for example if you're using a textured polygon fill and want the highlights and shadows to appear through another layer. Notice in the example below how the gray areas take on the color of the source layer.

{% highlight css %}
marker-comp-op: overlay;
{% endhighlight %}

![overlay]({{site.baseurl}}/img/course6/lesson4/overlay.png)

### Darken

Darken has a similar effect to multiply, but is more extreme. As it applies the color from the source layer to the destination layers, it compares each to find the darkest-colored pixels and keeps those. In the example below, we chose the **darken** composite operation in the top circle layer. Notice how only the hillshade shadows and black line show through from the destination layers, because all other elements have lighter-colored pixels than the circle. All pixel colors that are lighter than the top circle take on the circle's color. Use this when you want a darken effect that shows original color in the darkest areas of overlap, or when you want less detail than is shown in multiply.

{% highlight css %}
marker-comp-op: darken;
{% endhighlight %}

![darken]({{site.baseurl}}/img/course6/lesson4/darken.png)

### Lighten

Lighten works the same way as darken, but inversely. The lightest-colored pixels from each layer are kept, and if pixels are darker than the source layer they source layer color replaces them. This can be useful when you want to change the color of your overlapping area's shadows.

{% highlight css %}
marker-comp-op: lighten;
{% endhighlight %}

![lighten]({{site.baseurl}}/img/course6/lesson4/lighten.png)

### Color-Dodge

The Color-dodge color blend mode is similar to Screen. It inverts the source layer color and decreases the contrast between the source and destination layers. The overall effect is more extreme than screen's. Your elements become much brighter (except if your source layer is black). Darker areas are tinted towards the source color. Use this when you want to have a major lightening effect with extreme contrast between your layers, without much detail showing.

{% highlight css %}
marker-comp-op: color-dodge;
{% endhighlight %}

![color-dodge]({{site.baseurl}}/img/course6/lesson4/color-dodge.png)

### Color-Burn

Color-burn works similarly to color-dodge, but has a darkening effect. It increases the contrast between source and destination layers, with lighter pixels in your overlapping area tinted towards the source color. Use this when you want a darkening effect with more contrast than multiply or darken.

{% highlight css %}
marker-comp-op: color-burn;
{% endhighlight %}

![color-burn]({{site.baseurl}}/img/course6/lesson4/color-burn.png)

### Soft Light

Soft Light isn't one of the choices in the wizard Composite Operation pulldown. You can still use it! Just click over to the Custom CartoCSS panel and add this into the default CartoCSS code block:

{% highlight css %}
marker-comp-op: soft-light;
{% endhighlight %}

![soft-light]({{site.baseurl}}/img/course6/lesson4/soft-light.png)

Soft Light will either screen or multiply the destination layer colors, depending on the color of the source layer. If the source color is darker than 50% gray, the multiply effect will be used. If it's lighter than 50%, then screen will be used. Hard-light's effects are not applied as strongly as multiply's or screen's though, so the resulting colors are less extremely tinted. Usually darks won't be pure black and highlights won't be pure white.

### Hard Light

Hard Light is another color comp-op that you can use with CartoCSS:

{% highlight css %}
marker-comp-op: hard-light;
{% endhighlight %}

It works similarly to soft light, but is more extreme. Instead of using screen and multiply it uses color-dodge and color-burn, although not applied as strongly as with those comp-ops.

![hard-light]({{site.baseurl}}/img/course6/lesson4/hard-light.png)

### Plus

The plus composite operation adds the color channel values of the source with the destination's. Visually it adds the source's color to the darkest parts of the destination, and brightens the lighter parts, but tinted towards the source color. If you add a source color where red is the dominant color channel to the destination's red green and blue color channels, the dominant color in the result will be red. The overall effect is brighter than color-dodge. Lighter source colors effect the destination layer more than dark ones. A black source layer will have no effect; a white one will paint the whole destination layer white in the area of overlap. 

{% highlight css %}
marker-comp-op: plus;
{% endhighlight %}

![plus]({{site.baseurl}}/img/course6/lesson4/plus.png)

### Minus

Minus works the same way as plus, but instead of adding the color channel values it subracts them. For example, if your source layer is mostly red, it will subract this from the destination layers so the overall color is mostly blue and green. This darkens the destination layer more extremely than color-burn, and is also more tinted towards the source color.

{% highlight css %}
marker-comp-op: minus;
{% endhighlight %}

![minus]({{site.baseurl}}/img/course6/lesson4/minus.png)

### Difference

The difference blending mode compares the source to the destination layers and finds the brightest color areas for each color channel. If the source has the brighter channel value, it's subtracted from the destination layer's channel. If the destination has the brighter channel value, it's subtracted from the source. Using pure white inverts the colors it's blending with; black has no effect. In areas where the colors being compared are very close in value, the result is black.

{% highlight css %}
marker-comp-op: difference;
{% endhighlight %}

![difference]({{site.baseurl}}/img/course6/lesson4/difference.png)

### Exclusion

Exclusion is extremely similar to difference, but less extreme. In areas where the colors being compared are very close in value, the result is lighter than black. For example, notice the gray areas where the circle is the same color as the layers beneath in this map:

{% highlight css %}
marker-comp-op: exclusion;
{% endhighlight %}

![exclusion]({{site.baseurl}}/img/course6/lesson4/exclusion.png)

### Hue

Hue keeps the color brightness and saturation levels of the destination layers, but renders a result with the same hue as the source layer.

{% highlight css %}
marker-comp-op: hue;
{% endhighlight %}

![hue]({{site.baseurl}}/img/course6/lesson4/hue.png)

### Saturation

Saturation keeps the hue and brightness levels of the destination layers, but renders a result with the same level of saturation as the source layer. If you're using white in the source layer, there will be less saturation in the result. Black will render the highest level of saturation. Color half way between them, gray, will not have an effect. 

{% highlight css %}
marker-comp-op: saturation;
{% endhighlight %}

![saturation]({{site.baseurl}}/img/course6/lesson4/saturation.png)

### Color

Color keeps the source layer's hue and saturation levels, but renders a result with the brightness of the destination layers.

{% highlight css %}
marker-comp-op: color;
{% endhighlight %}

![color]({{site.baseurl}}/img/course6/lesson4/color.png)

### Value

Value keeps the brightness levels of the source, but renders a result with the hue and saturation levels of the destination layers.

{% highlight css %}
marker-comp-op: value;
{% endhighlight %}

![value]({{site.baseurl}}/img/course6/lesson4/value.png)

### Grain-Extract

Grain-extract subtracts destination layer color channel values from the source layer, and then adds 128. When used with textured destination layers, the overall visual effect shows the destination layers texture in the source layer overlap area, but with a brightened film-negative effect.

{% highlight css %}
marker-comp-op: grain-extract;
{% endhighlight %}

![grain-extract]({{site.baseurl}}/img/course6/lesson4/grain-extract.png)

### Grain-Merge

Grain-merge is the opposite of grain-extract. It adds the source and destination layer color channel values together, then subtracts 128. When used with textured destination layers, the overall visual effect shows the destination layers texture in the source layer overlap area, but with colors tinted towards the source layer's.

{% highlight css %}
marker-comp-op: grain-merge;
{% endhighlight %}

![grain-merge]({{site.baseurl}}/img/course6/lesson4/grain-merge.png)

### Invert

Invert turns each RGB channel color into its opposite. Areas that look black originally will turn white, areas that look red will turn green, blues will turn orange, yellows will turn purple. Unlike invert-rgb though, this also inverts saturation and brightness values.

Subtracts color channel value from 255 for destination layers.

{% highlight css %}
marker-comp-op: invert;
{% endhighlight %}

![invert]({{site.baseurl}}/img/course6/lesson4/invert.png)

### Invert-RGB

Invert-rgb also inverts color channel colors, but then tints them towards the source color.

{% highlight css %}
marker-comp-op: invert-rgb;
{% endhighlight %}

![invert-rgb]({{site.baseurl}}/img/course6/lesson4/invert-rgb.png)

### Contrast

Contrast magnifies the difference between the dark and light areas of your overlapping layers. If the source layer color is lighter than 50% gray, the destination layers will show through the source layer with decreased contrast. If the source is darker than 50% gray, the destination layers will show through the source layer with increased contrast. Besides making lighter areas brighter and darker areas darker, this has the visual effect of erasing fine detail.

{% highlight css %}
marker-comp-op: contrast;
{% endhighlight %}

![contrast]({{site.baseurl}}/img/course6/lesson4/contrast.png)

## Alpha Composite Operations

Alpha composite operations work combine different levels of source transparency with destination layers. These are useful for masking parts of one layer with another.

### Src

Src is an alpha composite operation that keeps the full transparency of the source layer. Whether the source layer is above or below layers using other composite operations, it will show through completely opaque.

{% highlight css %}
marker-comp-op: src;
{% endhighlight %}

![src]({{site.baseurl}}/img/course6/lesson4/src.png)

### Dst

Dst is an alpha composite operation that keeps the full transparency of the destination layers. The source layer becomes invisible in areas where it's overlapping with the destination layers.

{% highlight css %}
marker-comp-op: dst;
{% endhighlight %}

![dst]({{site.baseurl}}/img/course6/lesson4/dst.png)

### Src-over

Src-over keeps the full transparency of both the source and destination layers. The visual effect is that the source layer shows on top of all layers involved in the overlap area.

{% highlight css %}
marker-comp-op: src-over;
{% endhighlight %}

![src-over]({{site.baseurl}}/img/course6/lesson4/src-over.png)

### Src-in

Src-in only shows the part of the source layer that intersects with the destination layer.

{% highlight css %}
marker-comp-op: src-in;
{% endhighlight %}

![src-in]({{site.baseurl}}/img/course6/lesson4/src-in.png)

### Src-out

Src-out only shows the part of the source layer that does not with the destination layer.

{% highlight css %}
marker-comp-op: src-out;
{% endhighlight %}

![src-out]({{site.baseurl}}/img/course6/lesson4/src-out.png)

### Src-atop

Src-atop only shows the part of the source layer that intersect with the destination.

{% highlight css %}
marker-comp-op: src-atop;
{% endhighlight %}

![src-atop]({{site.baseurl}}/img/course6/lesson4/src-atop.png)

### Dst-over

Dst-over also keeps the full transparency of the source and destination layers, but it's effect is that the source is shown beneath all destination layers.

{% highlight css %}
marker-comp-op: dst-over;
{% endhighlight %}

![dst-over]({{site.baseurl}}/img/course6/lesson4/dst-over.png)

### Dst-in

Dst-in only shows the part of the destination layer that overlap with the source layer. 

{% highlight css %}
marker-comp-op: dst-in;
{% endhighlight %}

![dst-in]({{site.baseurl}}/img/course6/lesson4/dst-in.png)

### Dst-out

Dst-out only shows the part of the destination layer that does not overlap with the source layer.

{% highlight css %}
marker-comp-op: dst-out;
{% endhighlight %}

![dst-out]({{site.baseurl}}/img/course6/lesson4/dst-out.png)

### Dst-atop

Dst-atop shows the destination layers on top of the source layer, in the places where they overlap.

{% highlight css %}
marker-comp-op: dst-atop;
{% endhighlight %}

![dst-atop]({{site.baseurl}}/img/course6/lesson4/dst-atop.png)

### Xor

Xor shows both the source and destination layers, but only the parts that do not overlap each other.

{% highlight css %}
marker-comp-op: xor;
{% endhighlight %}

![xor]({{site.baseurl}}/img/course6/lesson4/xor.png)

### Clear

The clear composite operation acts as an eraser. It makes all pixels transparent in the area where source and destination layers overlap. 

{% highlight css %}
marker-comp-op: clear;
{% endhighlight %}

![clear]({{site.baseurl}}/img/course6/lesson4/clear.png)


*[Contains public sector information licensed under the Open Government Licence v3.0.](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)
* Null Island topography taken from USGS National Map. [Map services and data available from U.S. Geological Survey, National Geospatial Program.](http://viewer.nationalmap.gov/basic/?basemap=b1&category=ned,nedsrc&title=3DEP%20View)
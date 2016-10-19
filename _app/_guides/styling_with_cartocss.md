---
title: "Advanced Styling with CartoCSS"
description: Describes how to ...
permalink: /courses/guides/advanced-styling-with-cartocss/
---

# Advanced Styling with CartoCSS (WIP - on hold until CartoCSS docs is updated first)

CartoCSS is the syntax language that enables you to customize the style of your map data. You can easily toggle between the style options and the CartoCSS code behind the scenes of your map.

This guide describes how to apply some custom CartoCSS features, such as using your own custom brand colors and symbols, rotating symbols and text labels on your map, and even rotating your entire map. These are only a few advanced CartoCSS features. See [CartoCSS Properties](https://carto.com/docs/carto-engine/cartocss/properties/) for a description of all the available CartoCSS properties and values that can be applied using CartoCSS in the Builder.

**Download guide resources**

- .carto file

## Custom Colors and Symbols

Suppose you have a specific brand color and icon that you want to use to represent on your map. As long as you have access the color and the image, you can use CartoCSS to apply....

The CartoCSS option appears as a slider button, located at the bottom of the STYLE options for a selected layer. You can switch to display the STYLE options as VALUES or CARTOCSS code

## Rotating Symbols



{% highlight scss %}
{% endhighlight %}

## Custom Label Placement ?

## Line dash array

## Map Rotation

## TurboCARTO?

## CartoCSS Tips

When an [aggregation style](https://carto.com/docs/carto-builder/styling-map-layers/#aggstyle) is selected in the STYLE options for a map layer, an additional property appears in your CartoCSS code. This is useful as you can customize the entire aggregation style, using one syntax. 

You are notified if there are any [errors](https://carto.com/carto-engine/cartocss/errors/#cartocss-errors) in the CartoCSS code. You can also click the *undo* and *redo* arrow buttons after entering code changes in the Builder.

<span class="wrap-border"><img src="{{ site.baseurl }}/img/layout/carto-builder/applying_code/cartocss_undo_redo.jpg" alt="Undo Redo CartoCSS Builder buttons" /></span>

**Tip:** While you can apply CartoCSS styles to different layers on a map, it is highly recommended that you view the suggested [best practices](https://carto.com/docs/carto-engine/cartocss/best-practices/) for applying CartoCSS syntax more effectively.

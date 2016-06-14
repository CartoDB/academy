---
title:  "How to Choose Map Colors, Part 2"
permalink: /courses/intermediate-design/choose-colors-2/
tweet_text: "Step by step is the way to go. I've finished the second map academy design course. Check it out!"
---

## Color palettes tell a story

In the last lesson we learned that colors affect each other in our visual perception. These color relationships also have meaning. For example, check out this choropleth map made by CartoDB users ...

We can tell that the red-colored ... spends more on ... than the ... because it's polygon is darker. The light to dark sequential color scheme here gives us enough information to figure out which council areas spend the most on staff in a glance.

Complete color palettes tell the story of your data. There are two main kinds: qualitative and quantitative. Read on to learn which type to use for your map!

## Qualitative color palettes
Qualitative color palettes show categories. Use them when you need to show data that doesn't have numerical hierarchy. ... uses a qualitative palette well in this map:

...

There aren't any numerical attributes illustrated on this map, like length of ... route or how long each took. The point of this map is to demonstrate which route belongs to each .... It's easy for viewers to pick out each route because of the [contrast between hues.](link to last lesson)

### Choosing your own qualitative palette
CartoDB's Category Wizard gives you a 10-color qualitative palette by default. If your data has more than 10 categories, our system automatically groups the rest into an 'Other' category and colors them gray. You can pick your own colors though! You should aim for hues that are not [analagous,](link to last lesson) because if they are too visually similar your audience will have a harder time differentiating them. Like in this map:

<iframe width="100%" height="520" frameborder="0" src="https://team.cartodb.com/u/stephaniemongon/viz/e72f1f40-3260-11e6-b082-0e3ff518bd15/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

Notice how the different tornado routes are easier to see in this map:

<iframe width="100%" height="520" frameborder="0" src="https://team.cartodb.com/u/stephaniemongon/viz/d4ed8b56-325f-11e6-ae44-0ecd1babdde5/embed_map" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

In fact if you have more than 12 categories it gets hard to choose colors that contrast enough. At that point we recommend grouping your data into fewer categories.

For a real challenge try to make a perceptual color palette! If you keep saturation and value the same for all of the hues in your palette, some colors will appear more prominent anyway. That's because some colors are inherently brighter in our perception. For example in the rainbow palette below, red stands out more than cyan.

<!-- placeholder: replace w/new palettes modified for non-perceptual -->
![rainbow_palette]({{site.baseurl}}/img/course6/lesson3/rainbow_brighter.png)

Perceptual quantitative palettes take this into account. In perceptual palettes hue, saturation, and value are adjusted so that one color doesn't look more prominent than another. This is valuable because one category's data won't be emphasized over another for your map. This perceptual example is more visually even:

<!-- placeholder: replace w/new palettes -->
![perceptual_rainbow]({{site.baseurl}}/img/course6/lesson3/rainbow_brighter.png)

This is where your color adjustment skills from the last lesson come in handy!

## Quantitative color palettes
Use quantitative palettes if you're trying to show rank in your data. There are two kinds: sequential and divergent. You can use sequential palettes to show order by specific amounts, or even just "more than" and "less than". Use a divergent palette when you want to highlight a natural midpoint in your data, for example when you are mapping temperature and have values above and below zero degrees.

### Sequential palettes
---
id: 3
layout: lesson
title:  "Lesson 5"
subtitle: "Infowindow Customization"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
continue_link: "lesson-5"
tweet_text: ""
vizjson: "http://documentation.cartodb.com/api/v2/viz/f5f2e48c-7c07-11e4-949c-0e4fddd5de28/viz.json"
---

## Infowindow Bonanza

### Easy

Editor &amp; viz.json

The easiest way to use custom infowindows or hovers in CartoDB.js is by configuring them through the CartoDB Editor, grabbing the viz.json URL, and using createVis or createLayer. The interaction you define through the Editor will carry through to your custom JavaScript map.

For this first part, import 

### Medium

cdb.vis.Vis.addInfowindow()...
https://github.com/CartoDB/training/blob/gh-pages/workshops_map.html#L107

Default template, etc.

Mustache templates

All can be used with named maps as well (link to tutorial or webinar).

### Hard

Using callback objects, etc.

Code here:
http://bl.ocks.org/ohasselblad/a0e06de1f6f1597c096b
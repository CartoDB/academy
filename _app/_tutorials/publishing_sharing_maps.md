---
title: "Publishing and Sharing Maps"
description: Describes how to share CARTO maps and manage your publishing options with the CARTO Builder.
permalink: /courses/tutorials/publishing-sharing-maps/
tweet_text: "Describes how to share maps with CARTO."
redirect_from: https://carto.com/docs/carto-builder/publishing-and-sharing-maps/
embed_url: 'https://documentation.cartodb.com/viz/de9b05e8-8a0d-11e5-b315-0ea31932ec1d/embed_map'
---

# Publishing and Sharing Maps

This guide is intended for beginners who are getting started using the CARTO Builder. It describes the basic functionality for how to prepare your map (and data) for publishing, and how to manage your [publish options](#publish-options) when you edit your map. It also includes the [attribution requirements](#attribution-requirements) that you must include with a published map.

The objective of this guide is to:

- Prepare your map for publishing, and select the visible map options that you want to show or hide on your published map
- Ensure copyright attributes are included in your map
- Review the publishing rules
- Learn the available publish options
- Publish an unpublished map
- Update a published map
- Share a published map

## Prepare for Publishing

Before you publish your map, ensure that you select the privacy settings for the map, and add the map metadata that appears for your published map. The privacy setting appears as a shortcut underneath the map name, and the map metadata option is available from the map name context menu. 

<span class="wrap-border"><img src="/academy/img/tutorials/publishing/privacy_shortcut.jpg" alt="Map Privacy shortcut" /></span>

You should also set the privacy settings for the data in each map layer. When a map layer is selected in the Builder, there is a link to open each dataset in a separate tab, where you can edit the dataset privacy and metadata.

<span class="wrap-border"><img src="/academy/img/tutorials/publishing/shortcut_to_dataset.jpg" alt="Shortcut to dataset" /></span>

### Map Options

You can control which components are visible on your map. Click the _Map Options_ button from the CARTO Toolbar to show or hide visible map components for your published map. 

<span class="wrap-border"><img src="/academy/img/tutorials/publishing/map_options.jpg" alt="Map Options" /></span>

The following map options are available:

Map Option | Description
--- | ---
SEARCH BOX | Displays a search option on the map, enabling the viewer to move the map based on a search location<br/><br/>**Tip:** This function does not search through your dataset, it queries location by CARTO's default location data service providers, which varies, depending on your account plan. [Contact Sales](mailto:sales@carto.com) if you have questions about your location data service providers<br /><br />- Click the magnifying glass and enter a named place<br/><br/><img src="/academy/img/tutorials/publishing/search_location.jpg" alt="Search by location" /><br /><br />- The map moves to the matched location (based on the service provider), and automatically updates the zoom level accordingly. If there is a direct matched result, it moves to the matched location and displays a marker.<br/><br/>**Note:** Searching by location moves your map. If you want to go back to your previous location, you will have to search for your original location
ZOOM CONTROLS | Enables viewers to zoom in (+), or zoom out (-), of the map. If not enabled, viewers can only see the default level of the map visualization<br /><br />**Note:** To set the default zoom level from an open map in the Builder:<br/><br/>- Increase or decrease to the desired zoom level<br/><br/><img src="/academy/img/tutorials/publishing/zoom_controls.jpg" alt="Zoom controls" /><br/><br/>- [Update](#updating-a-published-map) your published map. The initial map displays at the default zoom level you specified<br/><br/>**Tip:** There is a zoom box keyboard shortcut to zoom to a targeted area on your map. Press and hold _shift_, while dragging, to display the zoom box selector. The visualization refreshes to the zoomed area<br/><br/><img src="/academy/img/tutorials/publishing/zoom_box.jpg" alt="Zoom box shortcut" />
FULLSCREEN | Enables you to display the map in fullscreen mode
CARTO LOGO | Enables you to include or hide the CARTO logo on your map<br /><br />**Note:** This feature is only available for **paid** accounts that include the _Removable brand_ feature, which allows you to remove the CARTO logo from your maps. [Contact Sales](mailto:sales@carto.com) if you are interested in this feature.
LAYER SELECTOR | Enables you to display the visible layers on the map
SCROLL WHEEL ZOOM | Displays the ability to zoom with the scroll wheel of your mouse<br /><br />**Note:** This option is only active when viewing your published map, not from within the Builder. 

## Attribution Requirements

Regardless of your CARTO account plan, you must include proper attributions whenever you publish or share your map. Attributions represent the data sources used in your map, which may have copyright protections.

**Tip:** Map attributions are specific to the data that you are displaying in your map, it is not related to CARTO branding (which is removable for certain account plans). For more details about the removable brand feature, see [How do I remove the CARTO logo from my map?](https://carto.com/docs/faqs/maps/#how-do-i-remove-the-carto-logo-from-my-map)

There are several methods of defining map attributions.

Attribution Method | Requirement
--- | ---
Automatic Attributions | When you choose a basemap with the CARTO Builder, map attributions are automatically included.<br /><br />When you export an image, or export a map, with the CARTO Builder, map attributions are automatically included.<br /><br />When you use [CARTO.js](https://carto.com/docs/carto-engine/carto-js/) to create a map, map attributions are automatically included.<br /><br />_**Note:** Do not remove any automatic attributions._
Dataset Attributions | When you are using third-party data for your maps, you may need to provide attributions about the data sources. To add attributions to a dataset, Edit the _Dataset Metadata_.
Print Attributions | When you are printing CARTO maps, be sure map attributions are included. For details, see [How to print maps in CARTO?](https://carto.com/docs/faqs/sharing-maps/#how-to-print-maps-in-carto)

**Tip:** For more information about how CARTO defines map attributions, see [Attributions](https://carto.com/attributions/).

## Publishing Rules

In order for your map to appear live, you must publish your map. All maps are "unpublished" by default, regardless of your privacy settings. Once your map is published, a timestamp is captured for your published map. 

If you apply any edits to your map, these changes are **not** updated dynamically. You must continuously update your map. This is intentional by design, allowing the original map builder to control when their maps are updated and shared. Some of the benefits of the publishing feature include:

- Prevents any unwanted edits to your original shared map
- Allows you to visualize and test map styling changes before updating your published maps
- Captures your map at a given published time. Suppose you have a published embedded map, you can delete layers, widgets, and apply other map styling, while keeping your published map intact

These features ensure that your published maps remain stable, and give you complete control over any updates that you wish to share. 

**Note:** The publishing options do not apply to synced datasets. [Synced data](/academy/courses/tutorials/syncing-real-time-data-with-carto/) from published maps will continue to update dynamically.

## Publish Options

The following publishing options are available in the CARTO Builder. See the subsequent procedures for how to access these publishing options during your map workflow.

Publishing Options | Description
--- | ---
Get the link | Provides a URL to the map, as it appears in your CARTO public profile. You can copy and paste this link anywhere where you want to share your map (email, social media, blog posts)
Embed it | Provides HTML code to embed the map and customize any of your iframe parameters. You can also get a simple URL directly from the Embed it option.<br /><br />**Tip:** Embedding a map is useful for publishing interactive maps of your data on your website or blog. For example, you can insert CARTO maps by including the iframe in the HTML code editor of WordPress, Joomla, and Drupal. Additionally, you can embed an iframe with the [Embedly API](https://carto.com/docs/faqs/sharing-maps/#can-i-embed-a-carto-iframe-with-embedly).
CARTO.js | Provides a URL to your viz.json file, which is required if you are using the CARTO JavaScript library to publish maps in an external application<br /><br />**Tip:** For details about CARTO.js, view the [related documentation](https://carto.com/docs/carto-engine/carto-js/).<br /><br />_**Note:** If you are using the early access version of the Builder, see the current [limitations](https://carto.com//docs/carto-builder/faqs/#limitations)._
CARTO Mobile SDK | Provides a URL to the mobile viz.json file, which is required if you are using the [CARTO Mobile SDK](https://cartodb.com/mobile/) to publish custom maps for Android, iOS, and Windows platforms

## Publishing an Unpublished Map

This procedure describes how to use the Builder to publish your map for the first time.

{% include carto-builder/select_map_steps.md %}

3. Click _SHARE_ to open the publishing options

    <span class="wrap-border"><img src="/academy/img/tutorials/publishing/unpublished.jpg" alt="Unpublished in the Builder" /></span>

    The publishing options appear disabled, and it is indicated that your map has not been published.

    <span class="wrap-border"><img src="/academy/img/tutorials/publishing/first_time_publish.jpg" alt="First time publishing with the Builder" /></span>

    **Note:** If you are publishing a private map, the _Get the link_ and _Embed it_ options are disabled. You can only use viz.json links for your applications.

4. Optionally, there is a shortcut to change your map privacy directly from the publishing options

    <span class="wrap-border"><img src="/academy/img/tutorials/publishing/change_privacy_from_publishing.jpg" alt="Change map privacy from publishing options" /></span>

5. Click _PUBLISH_

    The publishing options are activated and display URL links that you can copy for the publishing option of your choice. Additionally, the publishing dialog displays the timestamp of when the map was published. If you have a public map, it will be live as of the published time.

    <span class="wrap-border"><img src="/academy/img/tutorials/publishing/publishing_options_copy.jpg" alt="Copy the publishing option of your choice" /></span>

6. Click _DONE_ to close the publishing options and return to the Builder

    The map includes a timestamp of the last time it was published.

    <span class="wrap-border"><img src="/academy/img/tutorials/publishing/published_time_on_map.jpg" alt="Displays the published time on a map" /></span>

## Updating a Published Map

This procedure assumes that you are in the process of applying edits to a published map.

1. Once you make any change that modifies your original map, the Builder indicates that there are unpublished changes

    <span class="wrap-border"><img src="/academy/img/tutorials/publishing/edited_map.jpg" alt="Edited map displays unpublished status" /></span>

2. Click _SHARE_ to open the Publish options to update your map

    It displays the last time your map was updated.

    <span class="wrap-border"><img src="/academy/img/tutorials/publishing/update_publish.jpg" alt="Update published map" /></span>

3. Click _UPDATE_ to update the timestamp and refresh the URL links

4. Copy the link for the publishing option of your choice

5. Click _DONE_ to close the publishing options

    The Builder displays the update timestamp underneath the map name.

**Repeat this procedure each time you need to update a shared map.**

## Sharing Published Maps

When a map is published, click the caret button from the toolbar to expand the social media sharing options, as shown in the following embedded map.

<span class="wrap-border"><img src="/academy/img/tutorials/publishing/view_published.jpg" alt="View an embedded publish map" /></span>

You can share the map on Twitter and Facebook. The map metadata name and description also appears, along with the map builder name. Click the caret button again to collapse the sharing shortcuts.

<span class="wrap-border"><img src="/academy/img/tutorials/publishing/sharing_options.jpg" alt="Expand sharing options on a published map" /></span>

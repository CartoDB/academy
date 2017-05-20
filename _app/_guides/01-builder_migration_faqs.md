---
title: CARTO Builder Migration FAQs
title_meta: CARTO Builder — Frequently Asked Questions
description: Frequently Asked Questions about the migration of CARTO Editor to CARTO Builder.
permalink: /courses/guides/carto-builder-migration-faqs/
---
# CARTO Builder Migration FAQs

This guide contains frequently asked questions to help you learn about the migration of the CARTO Editor to the CARTO Builder. Please [contact us](mailto:sales@carto.com) if you have any additional questions or concerns.

## What is CARTO Builder? 

[CARTO Builder](https://carto.com/builder) is our new, drag and drop map application and is replacing the CARTO Editor. Migration from the CARTO Editor to the CARTO Builder is proceeding over the next several months.

## Is the Builder open-source?

Yes, as our default map application, CARTO continues to provide an open-source tool. You can access the [open-source repository](https://github.com/CartoDB/cartodb) for our product on GitHub.

## What are the pre-requisites to use the CARTO Builder? 

None, access to the CARTO Builder is automatically enabled for you by our Administrators.

- Early access to the CARTO Builder begins on July 7, 2016
- For all user accounts, the CARTO Editor will be migrated to the CARTO Builder in phases, over the next several months

## Can I still access my old maps?

Yes, all legacy maps that were created in the Editor are forward compatible and will automatically open in the CARTO Builder. Some exceptions apply to those who are using the [early access version](#can-i-use-carto-editor-and-carto-builder-at-the-same-time) of the Builder.

## How can I get early access to the CARTO Builder?

If you are so excited to try the CARTO Builder and simply cannot wait until it is enabled for your account, you can fill out this [_Early Access Registration Form_](http://go.carto.com/request-beta-access). Your request will be sent to our administrators. 

**Note:** The early access version of the CARTO Builder is subject to frequent updates, as we continue to enhance the functionality for the final Production release.

## I am an existing user, how can I start using the CARTO Builder?

Existing users do not need to upgrade, or do anything differently, to access the CARTO Builder. 

- You will receive an email when the CARTO Builder has been enabled for your account
- Log into CARTO with your existing username and password
- From _Your maps_ dashboard, click on any map or create a new map

All of your existing data, and applied stying, will appear in the CARTO Builder. Existing users who are interested in early access should complete the _Early Access Registration Form_, as described in the previous question. 

**Tip:** See [this FAQ](#where-can-i-find-the-former-editor-features-in-the-builder) if you need help locating the former Editor features in the Builder.

## I am a new user and just signed-up, can I start using the CARTO Builder?

No, if you are a new user that signed-up for CARTO on, or after July 7, 2016, you will only have access to the CARTO Editor. All users, existing and new, will be given access to the CARTO Builder in phases, over the next several months.

## Can I use CARTO Editor and CARTO Builder at the same time?

No, once the CARTO Builder is enabled for your account, it is the default map application.

<a name="exception"></a>**Exception:** If you have been given early access to the CARTO Builder, you may [contact the Builder Support team](mailto:builder-support@carto.com) if you encounter any issues. We will enable access to the CARTO Editor if needed, ensuring that you will not experience any workflow blockers during the early access phase.

_**WARNING:**  By design, some Builder features are not supported in the Editor, and features may not display correctly if you are switching between tools during the early access phase. For best practices, it is highly recommended that you exclusively use the Builder to edit and build maps once it is enabled for your account._

## Can I choose to use the CARTO Editor instead?

No, the CARTO Editor is currently in the process of being deprecated. All of the [Editor features](#where-can-i-find-the-former-editor-features-in-the-builder), and additional advanced functionality, is available through the CARTO Builder. Once the CARTO Builder is enabled for your account, the CARTO Editor is no longer available. _[Exceptions](#exception) apply for early access users_.

## What new features are available in the CARTO Builder?

The following new features are available for all account plans in the CARTO Builder:

- **ANALYSES**- Analyze your data without having to apply SQL code. While you can still access SQL query tools in the Builder, the graphical user interface guides you through the process of applying analysis to discover key insights about your location data

	**Note:** Access to the Data Observatory through the ANALYSES options, but may [consume quota](#are-there-any-features-in-the-carto-builder-that-affect-quotas-or-other-geocoding-credits-for-the-user-account).

- **Improved Caching of Data** - Any applied data modifications are cached and are dynamically processed, resulting in faster map rendering and better efficiency when you are exploring your data

- **WIDGETS** - Include interactive dashboards that are embedded directly on your published map. Widgets do not modify your original data, they simply allow the viewer to explore your map by selecting filtered areas of interest

- **STYLING** - Apply map styling based on an aggregation style, and define options by geometry attributes or by a column value. This enables a wider audience of participants to style location-based data without having to be a cartography expert, as you can use your data columns to style your visualization

- **Enhanced Publishing Options** - Additional publishing options allow the original map builder to control when their maps are updated and shared. This enables you to manage any shared maps, and prevent any unwanted edits to your published map. It also allows you to test map styling changes before updating your published maps

	**Note:** The publishing options do not apply to synced datasets. Synced data from published maps will continue to update dynamically.

- **Builder and Viewer Access** - Defined user roles enable Builders to create, edit, and manage their published maps. All users are map Builders by default. [Enterprise accounts](https://carto.com/docs/carto-enterprise/enterprise-roles/) can define Builder (write-access) and Viewer (read-only) user roles directly within their organization

## Are there any features in the CARTO Builder that affect quotas, or other geocoding credits, for the user account?

Yes, _some_ ANALYSES options will query and modify your data layers, and are subject to quota limitations.

**Tip:** Not all analysis options affect quota usage. It only applies to the options that involve data enrichment or location data services. Each analysis option is described in the Builder, and indicates which ones are subject to quota limitations.

## Are there any examples of how to use the CARTO Builder?

When the Builder is enabled for your account, you will receive an activation email that contains a link to a short video tutorial. Otherwise, see the CARTO Builder Documentation in [The Map Academy](https://carto.com/academy/).

{% comment %}writer note_csobier: commenting out- developer apis not supported for Builder yet. 
## I am a developer using the CARTO Engine APIs, are there any code changes related to the CARTO Builder?

Yes, the CARTO.js library and API functions are changing to support CARTO Builder functionality. Updated libraries and documentation will be provided as it becomes available in Production._**Note:** See the known [limitations](#limitations) about CARTO.js._
{% endcomment %}

## Can I sync real-time data with the Builder?

If you have applied sync settings for your dataset, you can sync your data every hour, day, week, or month. Optionally, you can force a manual synchronization up to every 15 minutes by using the [Import API Sync Tables](https://carto.com/docs/carto-engine/import-api/sync-tables/) feature.

## Where can I find the former Editor features in the Builder?

The following table lists the CARTO Editor feature and where to find it in the CARTO Builder.

CARTO Editor feature | Where to find it in the CARTO Builder
--- | ---
[Add Layer](https://carto.com/docs/carto-editor/maps/#add-layer) | Appears in the _LAYERS_ view. Select _ADD_ to open the Add layer options<br/><br/><img src="/academy/img/guides/migration_faqs/add_layers.jpg" alt="ADD layer button from the LAYERS view of the CARTO Builder" /><br/><br/>The LAYERS view displays the top-level hierarchy of how assets appear on your map. Map layers can be reordered from top to bottom
[Basemaps](https://carto.com/docs/carto-editor/maps/#basemaps) | As a requirement, each map is created with a default basemap. This basemap appears in the _LAYERS_ view along with any of the map data layers<br/><br/>- Click on the Basemap name to view or edit the source, style, and basemap options<br/><br/><img src="/academy/img/guides/migration_faqs/access_basemap.jpg" alt="Basemap options from LAYERS view of the CARTO Builder" /><br/><br/>**Note:** You cannot reorder how the basemap (and the corresponding basemap label, if applicable) appear.
[DATA VIEW / MAP VIEW](https://carto.com/docs/carto-editor/datasets/#viewing-datasets) | The DATA VIEW and MAP VIEW appear as icons when a map layer is selected. Click to switch between viewing your dataset in a table, or show the map visualization of your data<br/><br/><img src="/academy/img/guides/migration_faqs/data_tableview_mapview_buttons.jpg" alt="TABLE VIEW and MAP VIEW buttons from as selected map layer" />
[Edit Dataset Options](/docs/carto-editor/datasets/#edit-dataset-options) (Georeference, Duplicate dataset, Merge with dataset, Change privacy, Lock dataset, Delete this dataset) | Most of the dataset management options appear under the Dataset Name context menu<br/><br/>- The _Georeference_ and _Merge with dataset_ options now appear as _ANALYSES_ options
[Map Privacy](https://carto.com/docs/carto-editor/maps/#map-privacy) | Displays the privacy value as a button underneath the map name. Click to change the privacy option for the map<br/><br/><img src="/academy/img/guides/migration_faqs/builder_privacy_button.jpg" alt="Privacy button from the CARTO Builder" />
[Map Metadata](https://carto.com/docs/carto-editor/maps/#map-metadata) | The _Edit metadata_ option is available from the map name context menu<br/><br/><img src="/academy/img/guides/migration_faqs/map_name_context_menu.jpg" alt="Edit metadata option from the CARTO Builder" />
[SQL](https://carto.com/docs/carto-editor/maps/#sql) | Appears as a slider button, located at the bottom of the _DATA_ options for a selected layer. You can switch to display the DATA options as VALUES or SQL code<br/><br/><img src="/academy/img/guides/migration_faqs/data_sql_button.jpg" alt="SQL slider button from the DATA section of the LAYERS view" />
[Wizards](https://carto.com/docs/carto-editor/maps/#carto-sidebar)| Renamed and appears as the _STYLE_ options for a selected layer. The options that appear are dependent on your data<br/><br/><img src="/academy/img/guides/migration_faqs/layers_style.jpg" alt="STYLE section of the LAYERS view" /><br/><br/>**Tip:** Most of the former Wizard options (Quantification, Buckets, etc.) now appear as part of the STYLE _Fill_ options, where you can select visualization changes BY VALUES.<img src="/academy/img/guides/migration_faqs/style_fill_options.jpg" alt="STYLE Fill options BY VALUE" />
[CartoCSS](https://carto.com/docs/carto-editor/maps/#cartocss) | Appears as a slider button, located at the bottom of the STYLE options for a selected layer. You can switch to display the STYLE options as VALUES or CARTOCSS code<br/><br/><img src="/academy/img/guides/migration_faqs/style_cartocss_button.jpg" alt="CARTOCSS slider button from the STYLE section for a selected layer" />
[Infowindow](https://carto.com/docs/carto-editor/maps/#infowindows) | Renamed and appears as the _POP-UP_ information window options for a selected layer<br/><br/><img src="/academy/img/guides/migration_faqs/layers_popup.jpg" alt="POP-UP section of the LAYERS view" />
[Legends](https://carto.com/docs/carto-editor/maps/#legends) | Appears when a map layer is selected. Select a style for your legend or create your own legend
[Filters](https://carto.com/docs/carto-editor/maps/#filters) | Appears as options from the _Add a new analysis_ window and is shown as part of the ANALYSES workflow<br/><br/><img src="/academy/img/guides/migration_faqs/analyses_filter.jpg" alt="Filter from the ANALYSES options" /><br/><br/>**Tip:** Filters apply a SQL query to your data. You can view this read-only SQL code from the DATA section of a selected map layer
[Display map options]https://carto.com/docs/carto-editor/maps/#displaying-map-options) (fixed title, fixed description, search box, share options, zoom controls, scroll wheel zoom, layer selector, legends, fullscreen, CARTO logo) | All the display map options are now available from the CARTO Builder toolbar
[Edit map options](https://carto.com/docs/carto-editor/maps/#edit-map-options) (Export layer, Georeference layer, Dataset from query, Duplicate map, Export map, Change privacy, Lock map, Delete map) | - The _Export layer_ feature now appears as _Export data_ from the layer name context menu. Click to view the export data options for the selected dataset layer<br/><br/><img src="/academy/img/guides/migration_faqs/layer_name_context_menu.jpg" alt="Export data from layer name context menu" /><br/><br/>- _Dataset from query_ now appears as a drag and drop feature from the LAYERS section. You can create a new layer based on the analysis results.<br/><br/>- _Lock map_, there is a shortcut to lock a selected map from _Your maps_ dashboard<br/><br/>-Geocoding options now appear as part of [ANALYSES](/docs/carto-builder/analyzing-your-data/) options in the Builder<br/><br/>-The _Export map_ option is available from the map name context menu<br/><br/><img src="/academy/img/guides/migration_faqs/map_name_context_menu.jpg" alt="Export visualization from context menu" /><br/><br/>- _Delete map_ is also available from the map name context menu
[Map toolbar](https://carto.com/docs/carto-editor/maps/#map-toolbar) options (Add Element, Preview Map, Export Image) | - All of the _Add Element_ options will appear under its own section in the Builder<br/><br/>-_Export as image_ is still a work in progress and will be available soon
[Publish and Share Options](https://carto.com/docs/carto-editor/maps/#publish-and-share-your-map) | Appears as a SHARE button, located on the bottom of the LAYERS section in the Builder<br/><br/><img src="/academy/img/guides/migration_faqs/layers_share_button.jpg" alt="SHARE button from the CARTO Builder" /><br/><br/>**Tip:** New behavior requires that you update your map from the SHARE options after editing your map. **Previously published maps will not update dynamically.** This step is intentional by design, so that map viewers cannot change any of your original published maps. This is also useful as it allows you test different data and styling changes without disrupting your published map. The SHARE options indicate when the map was last published

### Deprecated Features

The following CARTO Editor features are no longer available, or were replaced with different functionality, in the CARTO Builder.

CARTO Editor feature | Replaced Functionality in the CARTO Builder
--- | ---
[Map Types](https://carto.com/docs/carto-editor/maps/#wizards) | The map types from the CARTO Editor _Wizards_ no longer exist by name. Case Studies indicated that most users customized our default map types to include more features<br/><br/>While the names of our map types no longer exist, the actual aggregation and values behind those map types are featured as STYLE options in the CARTO Builder - offering you greater flexibility to enhance the individual style features on your map. For example, if your map contains time-series data for point geometries, _ANIMATED_ appears as an AGGREGATION option from the STYLE section, enabling you to create Torque animation. Additionally, the _PIXEL_ aggregation option allows you to create a Torque heatmap.<br/><br/>**Tip:** If you switch the STYLE view to CartoCSS- the legacy map style name still appears as the visualization title.
[Composite Operations](https://carto.com/docs/carto-engine/cartocss/composite-operations/) | Renamed and appears as _BLENDING_ options in the CARTO Builder
[Preview Map](https://carto.com/docs/carto-editor/maps/#preview-map) | When a dataset is open, you can click _Preview_ to see how the visualization would appear and create the map. The Builder automatically displays a preview of the desktop version of your map and we are currently developing our Mobile SDK, for previewing mobile maps.

### Limitations

The following _temporary_ limitations appear in the CARTO Builder during the early access phase. Once the Builder is completely migrated, all of these options will be available and enhanced. 

CARTO Editor feature | Limited Functionality in the Early Access version of CARTO Builder
--- | ---
[External Basemaps](https://carto.com/docs/carto-editor/maps/#including-an-external-basemap) | Custom basemap options are not available. You will only have access to our prepackaged basemaps (CARTO, Stamen, HERE). Once the Builder is completely migrated, all of the custom basemap features, and advanced functionality, will be available
[Add Elements](https://carto.com/docs/carto-editor/maps/#add-element) | The former Editor Map Toolbar _Add Elements_ are currently a work in progress and will appear soon
[Add Feature](https://carto.com/docs/carto-editor/maps/#add-feature) (add points, add lines, add polygons) | These features are a work in progress and will appear soon
[CARTO.js](https://carto.com/docs/carto-engine/carto-js/) | The current version of CARTO.js is not compatible with the early access version of the Builder. _If you have a dependency on using CARTO.js, use the Editor with the existing CARTO.js library._<br/><br/>**Note:** An updated CARTO.js library (version 4.0) is being developed to support all the new Builder functionality, and will be available soon.

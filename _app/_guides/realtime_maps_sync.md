---
title: "Syncing Real-Time Data"
description: Describes how to sync real-time data with the CARTO Builder.
permalink: /courses/guides/syncing-real-time-data/
tweet_text: "Sync real-time data with the CARTO Builder."
redirect_from: https://carto.com/docs/tutorials/realtime_maps_sync/
---

# Syncing Real-Time Data

This tutorial describes how to access, connect, and manage real-time data in your CARTO account. This lesson is intended for all CARTO users who want to sync their data dynamically with the CARTO Builder.

The objective of this guide is to:

- Understand what synced data is
- Learn how to connect and sync data from _Your datasets_ dashboard
- Sync data directly from a map layer in the Builder
- Review the syncing data rules

## What is Synced Data?

Suppose you have a dataset from the National Weather Service that contains real-time rain data. You can use the sync options to sync your data to the connected dataset every hour, day, week, or month. 

If you are using synced data in a published map, you do not have to manually update the data. The data automatically refreshes at the selected sync interval, and recreates your table with the latest data. There are several scenarios when you might need to sync a connected dataset:

- If your map is connected to a dynamic dataset from the CARTO Data Library, sync options map appear

- For some account plans, you can also sync your datasets to external connected resources, such as Google Drive, Dropbox, Box, and so on

You can manage the frequency of your synced options from _Your datasets_ dashboard, or directly from a map layer in the Builder.

<span class="wrap-border"><img src="/academy/img/tutorials/realtime_maps_sync/sync_dataset_options.jpg" alt="Synced dataset options" /></span>

**Tip:** When connecting to a dataset from the Data Library, some public datasets contain dynamic updates and enable you to select options for syncing with the connected data.

## Syncing a Dataset

Once a synced dataset is connected, the sync status appears as part of your dataset. The following image displays the sync tooltip from a connected dataset in the datasets dashboard.

<span class="wrap-border"><img src="/academy/img/tutorials/realtime_maps_sync/synced_dataset_tooltip.jpg" alt="Synced Dataset tooltip from Your datasets dashboard" /></span>

To edit the sync options from _Your datasets_ dashboard:

1. Select a synced dataset

    The dataset opens in the table view and displays the last time the dataset was synced.

2. Click _view options_ next the synced timestamp

    <span class="wrap-border"><img src="/academy/img/tutorials/realtime_maps_sync/view_options_dataset.jpg" alt="Synced view options from a selected dataset" /></span>

    The _Sync dataset options_  appear.

3. Change the frequency from the _Sync My Data_ options

4. Click _SAVE SETTINGS_ to close the sync dataset options

### Syncing to an External URL or Dataset

If you are connecting a dataset to external connected resource, or an external URL data file, the sync options appear when during the connect dataset process, as shown in the example image.

<span class="wrap-border"><img src="/academy/img/tutorials/realtime_maps_sync/external_sync_my_data.jpg" alt="Connect data sync my data" /></span>

You can modify the frequency of these sync options anytime after connecting the dataset.

## Sync Data from a Map Layer

The following procedure describes how you can access the sync options for a connected dataset directly from a map layer in the Builder.

1. From the Builder, select a map layer that contains synced data (or add a new layer) containing synced data)

    The Builder displays the last time the dataset was synced, directly above the layer name.

2. Click _view options_ next the synced timestamp

    <span class="wrap-border"><img src="/academy/img/tutorials/realtime_maps_sync/sync_from_builder.jpg" alt="Synced view options from a selected map layer" /></span>

    The _Sync dataset options_  appear.

3. Change the frequency from the _Sync My Data_ options

4. Click _SAVE SETTINGS_ to close the sync dataset options

## Sync Data Rules

Note the following tips and behavior when syncing real-time data to a connected dataset in the Builder.

- To automatically geocode synced data, ensure your connected dataset contains either a country column, a latitude column and a separate longitude column, or a column of IP addresses

- Synced tables can only be edited while disconnected from its datasource. The _Duplicate dataset_, _Lock dataset_, and _Delete dataset_ options are not available from the layer name context menu

	**Note:** Alternatively, you can apply a SQL query to manipulate the dataset while it is connected. For example, you can write a SQL statement that changes the column data type from string to number

- You can create synced tables through the CARTO Builder, or through the Import API. 

	**Tip:** If you are a developer using the Import API, you can force a manual synchronization up to every 15 minutes by using the [Sync Tables](https://carto.com/docs/carto-engine/import-api/sync-tables/) feature.

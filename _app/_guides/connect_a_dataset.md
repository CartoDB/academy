---
title: "Connecting Data"
description: Describes how to import data with the CARTO Builder and connect datasets to your account.
permalink: /courses/guides/connecting-data/
redirect_from: https://carto.com/docs/carto-builder/managing-your-data/#connect-a-dataset
---

# Connecting Data

This guide describes how to import data with the CARTO Builder and connect datasets to your account. You can import data from a local file (or public URL), connect to an external dataset, use the public Data Library, or create an empty dataset.

The objective of this guide is to:

- Learn about all the _Connect dataset_ options in the Builder
- Review the supported geospatial data formats
- Access the public datasets in the Data Library, from the Connect dataset options
- Create an empty dataset and build your own columns and rows of data, and learn how to change the column type for your data

## Connect a Dataset

You can import data from a local file (or public URL), connect to an external dataset, or create an empty dataset. 

1. The _Connect Dataset_ options can be accessed from _Your datasets_ dashboard, or directly from the Builder when adding a new map layer

    - From _Your datasets_ dashboard, click _NEW DATASET_

        <span class="wrap-border"><img src="/academy/img/common/new_dataset_button.jpg" alt="NEW DATASET Button Dataset" /></span>

        The _Connect dataset_ options appear.

        <span class="wrap-border"><img src="/academy/img/guides/connecting_data/connect_dataset.jpg" alt="Connect Dataset" /></span>

    - From the [_Add a new layer_](https://carto.com/docs/carto-builder/map-layers-for-rendering-data/#add-a-new-layer) options in the CARTO Builder, click _CONNECT DATASET_ to view the connect dataset shortcuts

        <span class="wrap-border"><img src="/academy/img/guides/connecting_data/add_new_layer_connect.jpg" alt="Connect Dataset options from Add new Layer options" /></span>

2. Click the type of dataset you want to connect to

    **Tip:** Use the arrow buttons to scroll for more options.

    <span class="wrap-border"><img src="/academy/img/guides/connecting_data/connect_dataset_arrows.jpg" alt="View more options on Connect Dataset dialog" /></span>

    The following connect dataset options are available.

    Connect Dataset | Description
    --- | ---
    Data file | Drag and drop a file directly onto the Connect dataset dialog to add it, or click _BROWSE_ to select a local file to upload. You can also enter and submit a public URL to upload data from<br /><br />**Tip:** See a list of [Supported Geospatial Data Formats](#supported-geospatial-data-formats).
    Google Drive | Connect a dataset by [syncing](#sync-data) to an external Google Drive<br /><br/>- Prerequisite: [Contact CARTO](mailto:sales@carto.com) to enable this external service for your account. Once enabled, select the Google Drive _Connect to external data sources_ option, available from [your account](https://carto.com/docs/carto-editor/your-account/#account) settings<br /><br/>- Once you allow access to your account, you can connect to your Google Drive through the connect dataset options
    Dropbox | Connect to a dataset by [syncing](#sync-data) to a external Dropbox. Select _Dropbox_ to view which file formats are available (CSV, XLS)<br /><br/>- Prerequisite: [Contact CARTO](mailto:sales@carto.com) to enable this external service for your account. Once enabled, select the Dropbox _Connect to external data sources_ option, available from [your account](https://carto.com/docs/carto-editor/your-account/#account) settings<br /><br/>- Once you allow access to your account, you can connect to your Dropbox through the connect dataset options
    Box | Connect a dataset by syncing to external [box](https://app.box.com/login) files. Select _Box_ to view which file formats are available (CSV, XLS). You can access your Box account, upload secure files and content, and [sync your datasets](#sync-data)<br /><br/>- Prerequisite: [Contact CARTO](mailto:sales@carto.com) to enable this external service for your account. Once enabled, select the Box _Connect to external data sources_ option, available from [your account](https://carto.com/docs/carto-editor/your-account/#account) settings<br /><br/>- Once you allow access to your account, you can connect to your Box account through the connect dataset options<br /><br/>**Tip:** There is known issue when requesting parallel Box imports; the first import may fail and the second succeeds. This is due to the access and request tokens from the Box connector. CARTO is aware of this and is working to improve this behavior. For best practices, import one Box file at a time to avoid errors. <br /><br />Additionally, it may take some time for your new Box files to appear in the CARTO import list, due to [Box Search API latency](http://stackoverflow.com/questions/24270427/is-there-a-delay-when-using-the-box-com-search-api) issues.
    Twitter | Connect to a Twitter datasource by enabling the Twitter Connector. [Contact CARTO](mailto:sales@carto.com) to enable this external service for your account.<br /><br />For details, see [Connecting Twitter Data to a CARTO Dataset](https://carto.com/docs/tutorials/connect_twitter_datasource/).
    MailChimp | Connect to external MailChimp campaigns with the MailChimp connector. [Contact CARTO](mailto:sales@carto.com) to enable this external service for your account.<br /><br />Once enabled, you can access your MailChimp account and create maps and datasets based on the data stored from your mailing lists
    <span id="arcgis">ArcGIS Server&trade;</span> | Import your data from an ArcGIS Server&trade; instance by submitting your ArcGIS Server table URL<br /><br />**Note:** Ensure that you are using ArcGIS Server&trade; version 10.1 or higher.
    Salesforce | Connect to your Salesforce data by enabling the [Birdseye Salesforce Connector](http://blog.carto.com/birdseye-salesforce-connector/) and import your data from a Salesforce URL. [Contact CARTO](mailto:sales@carto.com) to enable this external service for your account

    _**Note:** For any external services, you must [contact CARTO](mailto:sales@carto.com) to enable these connectors for your account. Once your external connectors have been enabled for your account, connect your external service and link it to your account._

3. For any external datasources, click *Connect* from the the _Connect to external data sources_ section of your account options

    **Tip:** Ensure that your web browser pop-up blocker is disabled when connecting.

    <span class="wrap-border"><img src="/academy/img/guides/connecting_data/connect_external.jpg" alt="Connect external services from Account settings" /></span>

    After your external connectors are enabled and connected, the connect dataset options allow you to import external data and activates the _CONNECT DATASET_ button.

4. Click _CONNECT DATASET_

    There is a shortcut to set the dataset privacy option next to the CONNECT DATASET button. By default, your dataset is private. Click the icon to [toggle](#dataset-privacy) between public and private, before connecting your dataset.

    <span class="wrap-border"><img src="/academy/img/guides/connecting_data/connect_dataset_button.jpg" alt="Connect Dataset button from Connect dataset options" /></span>

    **Tip:** For details about the _Let CARTO automatically guess data types and content on imports_ behavior, see [Import Guessing](https://carto.com/docs/carto-engine/import-api/importing-geospatial-data/#import-guessing) for details.

Your data (or external dataset) is imported and connected (to your datasets dashboard, or added as a new layer in your map). If your import fails, see [Import Errors](https://carto.com/docs/carto-engine/import-api/import-errors/) for a list of known errors and solutions.

### Syncing an External Dataset

If you are connecting a dataset to external connected resource, the sync options appear when during the connect dataset process, as shown in the example image.

<span class="wrap-border"><img src="/academy/img/guides/connecting_data/external_sync_my_data.jpg" alt="Connect data sync my data" /></span>

You can modify the frequency of these [sync options](#sync-data) anytime after connecting the dataset.

## Supported Geospatial Data Formats

CARTO supports a large number of data types and file formats. For details about the type of data that you can import, see [Supported Geospatial Data Format](https://carto.com/docs/carto-engine/import-api/importing-geospatial-data/#supported-geospatial-data-formats).

**Tip:** It is highly recommended that you compress your files before importing them. CARTO supports .ZIP and .GZ (which includes .TAR.GZ and .TGZ) for compressing and archiving files.

If you are importing a non-supported file type, the import will fail. See [Import Errors](https://carto.com/docs/carto-engine/import-api/import-errors/) for a list of known error codes and solutions.

## Data Library

The CARTO Data Library, available from your datasets dashboard, provides a list of public data libraries. You can connect to these public datasets and create a map. Examples of data in the Data Library include World Borders, European Countries, Urban Areas, and Populated Places.

- From _Your datasets_ dashboard, click _DATA LIBRARY_ to view a list of all the available datasets

  <span class="wrap-border"><img src="/academy/img/common/datalibrary.jpg" alt="Data Library data" /></span>

  **Tip** Scroll to the bottom of the Data Library to navigate to other pages.

    <span class="wrap-border"><img src="/academy/img/common/data_library_pages.jpg" alt="Scroll through Data Library pages" /></span>

- From a selected public dataset, click *Connect dataset* or *create map* to add it to your dashboard. 

  <span class="wrap-border"><img src="/academy/img/guides/connecting_data/datalibrary_connect.jpg" alt="Connect dataset from Data Library" /></span>

    _If a dataset icon is colored red, this indicates that you cannot connect to the dataset since you do not have enough allocated quota to store the data._

  <span class="wrap-border"><img src="/academy/img/guides/connecting_data/red_quota.jpg" alt="Datasets over quota limit" /></span>

**Tip:** When connecting to a dataset from the Data Library, some public datasets contain dynamic updates and enable you to select options for syncing with the connected data.

## Create an Empty Dataset

If you prefer to create a new dataset from scratch, you can use the Connect Dataset option to create an empty dataset. You can add metadata by adding rows and columns manually or you can apply a SQL query to create data. 

1. The _Empty Dataset_ options can be accessed from _Your datasets_ dashboard, or directly from the Builder when adding a new map layer

    - From _Your datasets_ dashboard, click _NEW DATASET_

        <span class="wrap-border"><img src="/academy/img/common/new_dataset_button.jpg" alt="NEW DATASET Button Dataset" /></span>

        The _Connect dataset_ options appear. Click _CREATE EMPTY DATASET_

        <span class="wrap-border"><img src="/academy/img/guides/connecting_data/create_empty_dataset.jpg" alt="Create empty dataset" /></span>

        An empty dataset containing the default CARTO columns and indexes are created and formatted.

        <span class="wrap-border"><img src="/academy/img/guides/connecting_data/empty_dataset_ui.jpg" alt="Connect Dataset options from Add new Layer options" /></span>

    - From the _Add a new layer_ options in the CARTO Builder, click _ADD AN EMPTY LAYER_ to create an empty dataset

        <span class="wrap-border"><img src="/academy/img/guides/connecting_data/add_an_empty_layer.jpg" alt="Add an empty layer from the Builder" /></span>

        A new empty layer is added to the Builder. From the selected layer, select the connected dataset link to open the empty dataset in a new browser tab. The empty dataset contains the default CARTO columns and indexes.

        <span class="wrap-border"><img src="/academy/img/guides/connecting_data/empty_dataset_new_tab.jpg" alt="Open empty connected dataset from the Builder" /></span>

    You can edit the dataset name, add rows and columns, export the data, apply data using a SQL query, and create a map from the data.

2. Click ADD ROW and ADD COLUMN to create your metadata

    - The column context menu enables you to rename the column, change the data type of the column, delete the column, and so on

        <span class="wrap-border"><img src="/academy/img/guides/connecting_data/column_context_menu.jpg" alt="column context menu" /></span>

    - You can double-click in a row to add a value. The row context menu also enables you to edit the cell value, add, copy, or delete the row

        <span class="wrap-border"><img src="/academy/img/guides/connecting_data/row_context_menu.jpg" alt="row context menu" /></span>

3. Alternatively, click to the [_SQL_](https://carto.com/docs/carto-builder/applying-code-in-the-builder/#sql-query-in-a-dataset) slider button to switch between viewing your data by metadata (table) or SQL (opens the SQL query view)

### Change Data Type

When you upload your data to CARTO, it automatically assigns a data type to your column, such as string, number, date, or boolean. Certain map options are rendered based on the defined data type. It is good practice to confirm that the correct data type is assigned to the column. For example, suppose you want a map to animate time-series data, confirm that the connected dataset contains a _Date_ column for this visualization.

**Tip:** This feature is especially useful since you can [style map layers by column values](https://carto.com/docs/carto-builder/styling-map-layers/#selecting-style-options) in the CARTO Builder. The resulting style options vary, depending on the data type of the column you selected.

- From the table view of a dataset, select _Change data type_ from any column context menu

- Use the scroll bar to select from the available options (Number, String, Date, Boolean)

    <span class="wrap-border"><img src="/academy/img/guides/connecting_data/change_data_type.jpg" alt="Visualizations" /></span>

    **Note:** Some options may not be available, based on your data.

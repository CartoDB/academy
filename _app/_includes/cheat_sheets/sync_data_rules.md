## Sync Data Rules

Note the following tips and behavior when syncing real-time data to a connected dataset in the Builder.

- To automatically geocode synced data, ensure your connected dataset contains either a country column, a latitude column and a separate longitude column, or a column of IP addresses

- Synced tables can only be edited while disconnected from its datasource. The _Duplicate dataset_, _Lock dataset_, and _Delete dataset_ options are not available from the layer name context menu

	**Note:** Alternatively, you can apply a SQL query to manipulate the dataset while it is connected. For example, you can write a SQL statement that changes the column data type from string to number

- You can create synced tables through the CARTO Builder, or through the Import API. 

	**Tip:** If you are a developer using the Import API, you can force a manual synchronization up to every 15 minutes by using the [Sync Tables](https://carto.com/docs/carto-engine/import-api/sync-tables/) feature.
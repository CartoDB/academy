## Exporting CARTO Maps

The *Export map* option enables you to download a map, and the connected dataset(s), as a [.carto file](https://carto.com/docs/carto-engine/import-api/importing-geospatial-data/#supported-geospatial-data-formats). This .carto file includes the dataset and visualization definition, which contains any SQL queries, CartoCSS, basemaps, attributions, metadata, and styling that was applied to a map.

- From a selected map in the Builder, select the *Export map* option from the map name context menu

    **Tip:** You can also access this option by clicking the export icon from any CARTO Public Profile map.

The map, and connected data, is exported to your Downloads folder as a .carto file. See the [rules](#exportingimporting-carto-files) about what is exported.

    **Note:** The _Ready to Download_ dialog will appear if you do not have pop-ups enabled for CARTO. Allow pop-ups from CARTO in your web browser to begin the download and export process.

You can import a .carto file with the CARTO Builder. This is useful if you are sharing maps with team members, exported a public map from someone's CARTO's Public Profile page, or if you are migrating maps to another account. From the Connect Dataset options, select _Data file_ to browse to, or drag your downloaded .carto file.

### Exporting Rules

Privacy settings are enforced when exporting a .carto file. The following rules apply:

- When exporting a viewed map, the map and data privacy settings are inherited in the .carto file. You will only be able to export what the map owner shared with you, everything else is excluded from the .carto file
    - For Private and Password protected maps, only the owner can export
        
        **Note:** If you are the map owner with access to all data, be mindful that if you share your .carto file, it is considered open source and anyone that you share the .carto file with will be able to view your data.

    - For With Link and Public maps, everyone who has access to the link, or public map, can export
    - For [Enterprise users](https://carto.com/docs/carto-enterprise/users/#share-with-your-colleagues), you can export private maps that have been shared with you

- If you have a map with multiple layers, all accessible layers of your map will be exported. Any layers that you do not have access to will be excluded from the .carto file

_**Note:** Once a .carto file is created, the privacy settings no longer apply and anyone with access to that .carto file will be able to see the layers and data contained in the file._

### Importing Rules

Before importing a .carto file, see the exporting rules above to see what is included or excluded.

- Importing a .carto file is like an open source file. You will be able to import everything from a shared .carto file. Be mindful about sharing your .carto files if you are concerned about private data

    _**Note:** If the map owner shared a Private (or With Link) map that contains Private data, the data and map will be public when it is imported._
    
- Importing .carto files containing map and datasets with the same name as existing maps and datasets:
    - If the .carto file contains a map with the same name as an existing map, a duplicate map is created
    - If the .carto file contains a dataset with the same name as an existing dataset, it will generate a new dataset with a number suffix to avoid overwriting data. For example, if `my_table` is an existing dataset in your account, importing a .carto file with a dataset named "my_table", is imported as `my_table_1`. However, the map included as part of the .carto file will use the original dataset `my_table`, not `my_table_1`. As an alternative, you can rename the dataset to a unique name before exporting
- When importing a .carto file, you will only be allowed to import the number of layers allowed for your account plan. For example, if someone is sharing a .carto file and has more layers enabled for their account, you will only be able to import the first eight layers to your account

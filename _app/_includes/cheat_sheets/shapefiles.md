A shapefile is the ESRI created format for transferring geographic data. Shapefiles are collections of three or more associated files that come together to represent vector features, such as points, lines, and polygons, each with descriptive attributes for an area, such as "name" or "temperature". When imported into CARTO, these attributes comprise your dataset. You can import shapefiles with the Connect Dataset options. Additionally, you can export any dataset and save as the shapefile (SHP) file format.

## Required Files for Shapefile Import

CARTO suggests that you create a .ZIP file containing the .SHP, .DBF, .SHX and .PRJ files, all prefixed with same name. 

- **.SHP**  
  This file contains the primary geographic reference data and records of various shape types included, such as points, polygons, or multipatches

- **.DBF**  
  The dBase format stores attributes for each shape, and its size cannot exceed 2GB

- **.SHX**  
  The shapefile index format does what its name suggests, which is to organize the records of a shapefile for reference

- **.PRJ**  
  The projection format is essential because it contains coordinate system and projection information. As a plain text file, it describes your data using markup language, which allows it to sync with many applications

**Note:** Projection files are not mandatory for importing, but should be considered as part of your data. If projection files are mislabeled or missing from your zip file, CARTO automatically creates and appends the default standard spatial reference format [(SRID, 4326.prj)](http://www.spatialreference.org/ref/epsg/4326/) to a projection file, in order to avoid import errors. Since the projection file represents the latitude and longitude in `the_geom` column of your dataset, it is highly recommended to verify that your geometries appear correctly, otherwise you may be using a projection file that is not 4326 compatible.

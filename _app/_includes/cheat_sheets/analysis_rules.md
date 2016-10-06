# Analysis Rules

Note the following tips and behavior when applying analyses to map layers in the Builder.

- Only the analysis that applies to your data is available, so not all options may appear for the selected map layer

- Each section of the ANALYSES options is numbered, to guide you through the workflow. You can add and delete different analysis (chains) as part of one workflow

- If you delete an analysis from a map layer, any unique styling applied to an analysis column is also deleted, and the original stying of your map layer appears

- For some analysis options, the analyzed data is a read-only SQL query that does not alter your dataset. It applies a temporary node of cached data to your table. If you check the original dataset, it has not been modified. This helps with map rendering going forward, as the analyzed data is already cached and improves processing when you are exploring your data

	For example, if a map layer containing an analysis is hidden, the analyzed data is also hidden from your map visualization. Since analyzed data is cached, you can show and hide your layers to view how analyzed data appears on your map.

- If you export a map containing an analysis, the analyzed data is included as a node within the data

- If you have widgets containing analyzed data on your map, interacting with the widget dynamically changes your analysis

	**Note:** If you delete an analysis layer containing widgets, the widget for the analyzed layer is also deleted

- If you have an analysis applied to a published embedded map in an external application, changing your analysis does not dynamically update the embedded map. You will have to [update the published map](/docs/carto-builder/publishing-and-sharing-maps/#updating-a-published-map) to reflect the changes

### Quota Consumption for Analysis

For most analysis options, the results are cached as [read-only SQL queries](/docs/carto-builder/applying-code-in-the-builder/#read-only-sql-code) and do not actually modify your original dataset. However, there are _some_ analysis queries that add calculated results to columns in your dataset, and extra fees may apply. View our [terms and conditions](https://carto.com/terms/), or [contact us,](mailto:sales@carto.com) for details about which options require service fees to your account.

The following quota consumption rules apply for select analysis queries that modify your data:

- Quota consumption is calculated based on the number of requests made on each dataset. **One row of returned data consumes one credit against your account**

	_**Note:** The Builder notifies you before you apply an analysis query that is subject to quota consumption._

	<span class="wrap-border"><img src="/academy/img/guides/analysis/apply_confirmation.jpg" alt="Apply analysis confirmation in the Builder" /></span>

	Note the extra fee amount in the example image is blurred out, as options vary depending on your account plan.

	- For _Georeference_, each row of `the_geom` column is updated based on the analysis. The query includes the calculated results that transformed your data into geometry data (such as countries, provinces, states, cities, postal codes, IP addresses and street addresses)

	- For _Create Areas of Interest_, each row of `the_geom` column is updated based on the analysis. Results include the calculated [isochrone function](/docs/carto-engine/dataservices-api/isoline-functions/#cdbisochronesource-geometry-mode-text-range-integer-options-text) for connecting geometries to a defined area. _**Note:** Consumption rules vary, depending on the analysis parameter selections for the RADIUS and BOUNDARIES_

	- For _Enrich from the Data Observatory_, a new column is added to your dataset based on the analysis. Each row from your dataset includes the calculated [Data Observatory](/docs/carto-engine/data/) function for the applied measurement of data

	- (COMING SOON) For _Routing_, each row of `the_geom` column is updated based on the analysis. The query includes the calculated result for the navigation from a defined start location to a defined end location

- When modifying an applied analysis, refresh your web browser to ensure that CARTO has had a chance to recognize any changes in quota consumption

- An analysis error appears if you have reached the limit of your quota. [Contact us](mailto:sales@carto.com) to discuss options for increasing your quota

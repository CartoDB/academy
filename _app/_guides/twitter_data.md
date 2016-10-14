---
title: "Connecting Twitter Data to a CARTO Dataset"
description: Describes how to project your map in CARTO using the Albers projection.
permalink: /courses/guides/connecting-twitter-data-to-a-carto-dataset/
redirect_from: https://carto.com/docs/tutorials/connect_twitter_datasource/
---

# Connecting Twitter Data to a CARTO Dataset

This guide explains how to connect your external Twitter data to a dataset. CARTO has broker access to [Twitter Firehose](https://dev.twitter.com/streaming/reference/get/statuses/firehose), which enables us to provide official Twitter data through CARTO. You can enable the Twitter Connector for your account so that you can connect external Twitter data to a dataset and create a map.

**Download guide resources**

- `dataset_name?` - link to .carto file? 

### Enabling the Twitter Connector

_Twitter_ is available from the _Connect dataset_ options when you are importing a dataset, or adding a map layer in CARTO. Selecting Twitter as your external service indicates that you must enable the Twitter Connector before connecting your dataset. _This initial step requires that you contact CARTO for assistance._

Once the Twitter Connector is enabled for your account, a CARTO sales representative sends you a confirmation email. This indicates that tweets are enabled for your account and you can continue the process of [connecting](#connecting-twitter-data-to-a-dataset) a dataset to Twitter.

### Connecting Twitter Data to a Dataset

After the Twitter Connector has been enabled by your account representative, select _Twitter_ from the _Connect dataset_ options again and connect the dataset. The following options enable you to enter different trend options for your Twitter data.

Twitter Trend Options | Description
--- | ---
Category 1-4 | Represents search terms for different hashtags or keywords separated by commas. You can enter up to four search terms using the Category fields
From / to | Displays the from and to time range for your requested data. By default, it is set to search for the last 30 days<br /><br />Depending on your account settings, you can click the calendar icon to open the calendar and select a different date range. Additionally, you can indicate the hour and minute for the selected date range<br /><br />**Note:** The `postedtime` must specify the hour and minute for [UTC timezone offsetting](https://en.wikipedia.org/wiki/UTC_offset)
Use | Displays the amount of Twitter credits allocated to your account. You can use the slider to increase or decrease the percentage of credits to use<br /><br />**Note:** You can [contact CARTO](mailto:sales@carto.com) to update your Twitter credits at any time.

**Tip:** Note the following [tips and tricks](#tips-and-tricks-for-using-twitter-data) when entering category search terms and selecting Twitter trends.

**Note:** While CARTO can retrieve geotagged tweets, we cannot retrieve data when the Twitter post has not specified a location element. For example, the Twitter user must explicitly turn on their location, or indicate their location in their profile location field.

_Approximately 5% of tweets typically contain geolocation elements. However, CARTO has applied geo-enrichment enhancements to our code, increasing the Twitter search results up to 15% to 20%._

### Twitter API Data Options

There are several TWitter API's that CARTO can provide broker access to. Your account representative can help you select the appropriate type of data plan when you are [enabling the Twitter connector](#enabling-the-twitter-connector).

- **Search API**: The Search API is implemented by default when enabling the Twitter Connector. It allows you to pull geolocated Twitter data from the past 30 days. Once a search is executed, the tweets are imported directly to your CARTO account so that you can customize your map directly from the Map View of your dashboard.

- **Streaming**: CARTO has access to Twitter's streaming API, enabling you to retrieve up-to-the-minute search results. This feature involves an additional charge. Contact [Sales](mailto:sales@carto.com) for details about using Streaming Twitter data.

- **Historical API**: The Historical API returns older search results of tweets, beyond 30 days. It can retrieve data as far back as 2006. This feature involves an additional charge. Contact [Sales](mailto:sales@carto.com) for details about using Historical Twitter data.

**Note:** CARTO is developing a feature to support real time tweets, which automatically updates your map when live tweets are posted. This feature is a work in progress. Optionally, there is a developer hack that you can use as a workaround for this feature. Contact [Sales](mailto:sales@carto.com) for more information about how to implement this script.

### Understanding Twitter Data

After connecting to a Twitter dataset, unique columns are available from your dataset view. The following list displays the most important Twitter information. You may need this information in order to filter or plot Twitter data points.

Parameter | Description
--- | ---
id | Tweet id
verb | Lets you know if a tweet has been directly posted or if it's a retweet
link | Direct link to the tweet
body | Content of the tweet
postedtime | Time at which the tweet was posted, in UTC format
favoritescount | Number of times the tweet has been favored
twitter_lang | Language of the tweet
retweetcount | Number of times the tweet has been retweeted
actor_link | Direct URL to user profile
actor_displayname | Name of the user
actor_image | Direct URL to a minimized version of the avatar
actor_summary | Description of the Twitter user
actor_languages | Language configured by the Twitter user
actor_verified | Flag for verified users
generator_displayname | Client from which the tweet was sent
geo | Information of the geolocated tweet
category_name | Number of the category described in the search
category_terms | Terms which have been searched inside the corresponding category

In addition to the more important parameters listed above, you can also obtain the following Twitter data for your maps by searching for these columns in your connected Twitter dataset: `objecttype`, `twitter_filter_level`, `actor_objecttype`, `actor_id`, `actor_postedtime`, `actor_links`, `actor_location`, `actor_utcoffset`, `actor_preferredusername`, `actor_twittertimezone`, `actor_friendscount`, `actor_followerscount`, `actor_listedcount`, `actor_statusescount`, `generator_link`, `provider_objecttype`, `provider_displayname`, `provider_link`, `inreplyto_link`, `twitter_entities`, `object_objecttype`, `object_id`, `object_summary`, `object_postedtime`, `object_link`, `location_objecttype`, `location_displayname`, `location_link`, `location_geo`, `location_streetaddress` and `location_name`.

### Querying Twitter Data

Once your tweets dataset is connected, the following insights may help you manage and query your Twitter data. The SQL option is available from the CARTO Builder when a map layer is selected. 

- Switch the slider button, located at the bottom of the _DATA_ options, from VALUES to SQL

**Simple Query Examples**

"Which tweets have been written by a famous (verified) person?". Apply an SQL query to the `actor_verified` column. This process is similar to generating the following query:

"Which tweets have generated the largest number of retweets?"

{% highlight bash %}
SELECT * FROM dataset_twitter ORDER BY retweetcount DESC
{% endhighlight %}

Creating a simple category map gives you a better analysis about your Twitter data. You can use the column `twitter_lang` to compare tweet languages with their locations, or you can use the `postedtime` column to perform a dynamic Torque map.

<span class="wrap-border"><img src="/academy/img/guides/twitter/style_by_twitter_value.jpg" alt="Style BY VALUE using Twitter data" /></span>

**More Advanced Query Examples**

Imagine you have two categories, one is "Vector", the second is "Raster". What if you want to know which tweets are saying "Vector yes", or "Vector no"? Apply the following SQL query:

{% highlight bash %}
SELECT * FROM dataset_twitter WHERE body ilike ‘%yes%’ AND category_name = 1
{% endhighlight %}

Or, correspondingly, for “Vector no”:

{% highlight bash %}
SELECT * FROM dataset_twitter WHERE body ilike ‘%no%’ AND category_name = 1
{% endhighlight %}

Suppose you want to create two new categories in your dataset based on the obtained results. One will be for those results that say "Vector yes", the other one will be for “Vector no”. Just apply the previous queries, but this time, include some some updates in the dataset.

The following query searches all the tweets which include "Vector yes" and update the category to be '3'.

{% highlight bash %}
UPDATE dataset_twitter SET category_name = 3 where body ilike ‘%yes%’ AND category_name = 1
{% endhighlight %}

In the same way, build category number 4 to “Vector no”:

{% highlight bash %}
UPDATE dataset_twitter SET category_name = 4 where body ilike ‘%no%’ AND category_name = 1
{% endhighlight %}

If the results are not so obvious, you can add a new constraint and create a new category which searches "yes" and "no" in the same tweet, as shown with the query below:

{% highlight bash %}
UPDATE dataset_twitter SET category_name = 5 where body ilike ‘%no%’ AND body ilike ‘%yes%’ AND category_name = 1
{% endhighlight %}

Following this approach with the "Raster" option, running a query creates several categories that enables you to analyze if a tweet is supporting a specific topic or search term. If you need more advanced queries beyond these examples, CARTO supports advanced PostgreSQL capabilities so that you can insert more advanced queries on the text of tweets.

**Tip:** It is suggested to create a duplicate copy of your dataset prior to modifying it with UPDATE, INSERT or DELETE SQL query statements, in order to avoid overwriting your original data.

### Tips and Tricks for Using Twitter Data

Note the following tips an tricks when using twitter data for your maps.

#### Twitter Categories and Search Terms

-  You can enter OR as an alternative to using the comma. For example, "santa, xmas" is the same as "santa OR xmas"
-  Spaces before and after commas are removed
-  Enter commas between multi-sentence words as a best practice. For example, if you enter a multi-word search term, such as "cars, bikes motorbikes, planes", the category is parsed as three search terms. Not "cars, bikes, motorbikes, planes"
-  Use Singular and plural search terms. For example, "car" does not match tweets with the plural of "cars". Add both the singular and plural forms of the word to match both search results
-  Search terms are not case-sensitive. For example, "Cars" is the same as "cars" and "CARS"
-  The maximum number of search terms per category is 29
-  You can search by hashtags or account names. For example, "gis, @carto, #mapping"

#### Twitter Credits

-  Ensure that you select the right time frame that suits your needs. You can save on Twitter credits by not importing extra data
-  Enterprise multi-accounts share the same organization-wide pool of Twitter credits
-  If you run out of credits, the the search stops and returns all the tweets that the system was able to retrieve up until the credits were used

#### Retrieving Twitter Data

- Once the search starts you cannot stop the import. Be mindful to avoid broad search terms. For example, "love" may retrieve hundreds of thousands, or even millions, of geolocalized tweets

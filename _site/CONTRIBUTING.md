# Contributing to Map Academy
This is an intro guide to creating a lesson on **Academy**, CartoDB's suite of courses broken down into lessons that aim to give a comprehensive overview of basic skills needed to make awesome online maps. 

The guide closely follows the [Blog Post Guidelines](https://github.com/CartoDB/blog/wiki/Blog-post-guidelines) by @andrewxhill.

The guide has 4 parts:

* Structuring 
* Styling
* Logistics (posting, pushing)
* Testing

![Academy_Lesson](https://raw.githubusercontent.com/auremoser/images/master/carto-academy.jpg)

## I. STRUCTURING

### General goals
For a general guide to structuring your post, see this [example here](https://github.com/CartoDB/academy/blob/master/courses/03-cartodbjs-ground-up/lesson-3.md).

### Lesson objectives

* Clearly lay out objectives at the beginning of lessons, with some bulleted items that the student will learn/glean
* 


### Data management

* Adhere to good data management strategies
    * Encourage use of metadata form (see the [Source citing section](#source-citing))
    * Use of units in legends/hovers
    * Ensure that data units are understandable from the source, and if not, are annotated in the lesson, with any necessary transformations applied prior to importing into the Map Academy data library (located in /d/)
    
### Source citing

* Proper attribution of data is important, make sure to cite your data source and copy it to `/d/` to ensure persistent accessibility.
* We encourage you to author a ["See Also"](http://www.macwright.org/2015/01/12/see-also.html) section to accompany your post. Add it to the beginning of the lesson if it's short and the references are necessary prior to continuing, add it to the end if there are many references or follow up material that would extend your resources. Attribution and development history is important, nice, and reputable.
* Try to include at least the bold, more if possible:
    * Author
    * **Title**
    * **Year of Publication/Last Update**
    * Edition or version
    * **Access info** (URL or persistant identifier)
* For more on data citing, check out [this datacite guide](https://www.datacite.org/services/cite-your-data.html) and/or [this libray guide](http://libguides.lib.msu.edu/citedata).

### Geo/cultural bias
* Aim to be global and highlight stories that are interesting and/or underrepresented. Although it's easy to focus on the U.S./NYC, strive to find data from other, international data sources.
* Here are some data sources that might be of use/worth exploring if you're stumped:
	* [CartoDB Data Portal--link needed]()
	* [CartoDB Data Services/APIs--link needed]() 
	* [European Open Data Portal](https://open-data.europa.eu/en/data/)
	* [Cern Open Data](http://opendata.cern.ch/?ln=en)
	* [Open Geo Data Portal](http://opengeoportal.org/)
	* [Swedish GeoData](https://www.geodata.se/en/)
	* [Tufts GeoData](http://geodata.tufts.edu/)

![Academy-structure](https://raw.githubusercontent.com/auremoser/images/master/carto-academy-x.jpg)

## II. STYLING
### Layout structure
* Try to break your lesson into fewer than six subsections
* Write meaningful headers that are consistent with other Academy posts so that returning users know how it will work
* If possible, provide a "suggested time for completion" at the top, after the "Objective " for the lesson
* Provide a "Level" for the lesson (`Basic`/`Medium`/`Advanced`) and if one of the latter two, link to prerequisite lessons
* Conclude the post with a paragraph about how to give feedback on the lesson:


    "Have suggestions on how to improve this lesson? Find typos or broken links?  Open an [issue](https://github.com/CartoDB/academy/issues) in the [academy repository](https://github.com/CartoDB/docs) or fork the repo and submit a pull request. Not familiar with GitHub? Check out [this StackExchange thread](http://stackoverflow.com/questions/3748272/introduction-to-git-and-practical-usage-patterns) for resources on how to get going."

### The header

All blog posts must start with a **header**. The header is the list that falls between a line with three dashes, "---". 

Course Header:

```yaml
---
layout: course
title: "CartoDB.js"
id: "03-cartodbjs-ground-up"
subtitle: From the ground up
categories: Medium
tag: design
time: 1 hour
description_short: Take advantage of the flexibiltity of cartodb.js to create custom webpages.
description_long: This introduction to CartoDB.js from the ground up will take you through the common uses of the library. You'll start out by pulling your maps from CartoDB with only a few lines of code. Later you'll customize your maps with JavaScript, interact with the data, add custom SQL queries, integrate other features, and much more.
prerequisite:
    - Intermediate experience coding in HTML and JavaScript
    - Experience creating multi-layer visualizations in CartoDB
    - Reliable Internet access
    - A modern browser like Chrome, Firefox, or Safari
    - A desire to learn!
published: true
vizjson: "http://documentation.cartodb.com/api/v2/viz/23f2abd6-481b-11e4-8fb1-0e4fddd5de28/viz.json"
mailchimp_id: 62856bf9d1
---
```

Lesson Header:
```
---
id: 3
layout: lesson
title:  "Lesson 3"
subtitle: "Basic interactivity"
course: "CartoDB.js from the Ground Up"
course_slug: "03-cartodbjs-ground-up"
tweet_text: "I'm learning how to use SQL and CartoCSS in @cartoDB's JavaScript API"
vizjson: "http://documentation.cartodb.com/api/v2/viz/f5f2e48c-7c07-11e4-949c-0e4fddd5de28/viz.json"
---
```

The **title**, **subtitle**, and **course** objects display on the website. Add a lesson to a Course sequence by assigning it to a **course** object; populate the **tweet_text** to provide a pre-fab tweet for participants.

 The **course_slug** lets you choose the default url extension (format: ID-title where ID is ##).  

### Text highlighting
* **Column names**: are enclosed in an '`'
* **Table names**: are enclosed in between '`'

### Images
To ensure that images display full width, they need to be resized to a width of 700px. After resizing, process them with [ImageOptim](https://imageoptim.com/) to ensure the page loads quickly. Images are embedded using a markdown as follows:

```
![image description](/img/05-lol-cats-in-cartodb/lesson-1/lol-cat-map.png)
```

### Embedded Maps

Embedded maps use the `iframe` from the CartoDB Editor. Just paste it in.

```
<iframe width='100%' height='520' frameborder='0' src='http://team.cartodb.com/u/eschbacher/viz/7e6815f4-b794-11e4-a4dd-0e853d047bba/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
```

If you want to customize the center (lat/long), zoom, disable scroll wheel zoom, etc., you can add the following to the URL:

```
.../embed_map?center=[32,10]&zoom=4&scrollWheelZoom=false
````

These are based off of the [options](http://leafletjs.com/reference.html#map-options) given by Leaflet.

### Block Quotes
You can include nicely formatted quotes in your post by wrapping them in the blockquote tag. They are really useful for adding quickly tweetable quotes to your post (including the tweet link)

```
{% highlight text %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eros magna, dapibus quis libero ut, ornare suscipit ex. Phasellus quis aliquam leo. Donec efficitur ultricies scelerisque. Mauris mollis eros ex, quis efficitur ligula cursus at. Nullam varius nibh ac ultricies ornare. Cras viverra interdum est eu interdum. Vestibulum commodo id eros et tincidunt. Aenean non velit efficitur, tempor arcu a, suscipit enim.
{% endhighlight}
```

###Code examples
The blog platform can display code examples with nicely highlighted code if you wrap your code in a special tag. The format starts like {% highlight html %} for HTML examples, {% highlight sql %} for SQL examples, or most other languages you can imagine by just swapping out the language name...

```
{% highlight html %}
SELECT * FROM bigfoot LIMIT 10
{% endhighlight %}
```

Code blocks are enclosed like this:
```
{% highlight javascript %}
var map = new L.Map('map');
cartodb.createLayer('map',vizjson)
  .addTo(map);
{% endhighlight %}
```
###General Pointers
* Use bullet points
* Link to resources and documentation when they are mentioned (ex: createLayer, CartoCSS, SQL API, etc.)
* Demonstrate with screencaps where possible, maximum amount of images to break up text and show/tell the process

## III. LOGISTICS
### Naming
The landing page for a course (made of multiple lessons) are saved in the `/courses` folder and are named for number of their number in the series and their title in the [Academy repo](https://github.com/CartoDB/academy).

Example:
```
/courses/03-cartodbjs-ground-up.md
```

The format is yyyy-mm-dd-title.md.

Lessons are in the directory of the same name in the folder where all of these pages are located. Lessons are numbered sequentially:

```text
/courses/03-cartodbjs-ground-up/lesson-2.md
```

### Git-ing your lesson up
1. Always start on `master` (if you're not sure which branch you're on, run `git checkout master` to get back)
2. Create a branch named after your lesson, something like `jsLesson2` ([how to](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches))
3. Add all your files to your git repo in the appropriate directories
4. Edit and commit as necessary
5. Push entire branch to Github (`git push origin branchName`)
6. Issue a Pull Request ([how to](https://help.github.com/articles/creating-a-pull-request/)) and ask appropriate people to review

## IV. TESTING
### Goals
* Ensure that your post has been QA'd and approved by at least 1 or 2 other users and yourself before submitting a pull request.

### Things to test
* When your post is in draft mode, assign a user by @'ing them on GitHub to test your post:
	* All links go to the proper places
	* The end product is reproducible
	* Test browsers or include caveat about browser issues, i.e., "This assumes usage of Chrome/Safari, notes about other browser support are not included"
	* Ensure that example data used in the lesson is in the Academy repository, even if there are links to outside sources
	
### Metadata to check
* Test that data's metadata is properly entered and cited in the post:
	* Source
    * License
    * All columns are described
    * Anomalous columns are eliminated before import, or noted as unusable
    
### Submitting issues
* Submit issues [on GitHub](https://github.com/CartoDB/academy/issues), tag the author by @'ing him/her for verification.

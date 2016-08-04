---
title: "Builder Introduction - Analysis"
permalink: /courses/builder-intro/analysis/
permalink_next: /courses/builder-intro/sharing/
tweet_text: ""
lesson_message: "Nice work analyzing map data on the web :)"
---

# Intro to Analysis in CARTO Builder

![vid_splash]({{ site.baseurl }}/img/builder-intro/lesson1/0-vid-splash.png)

Analysis in CARTO Builder allows you to create analysis workflows from one or more datasets that update even if the underlying data changes. It's one of the most powerful features of the Builder, and is a part that will be growing quickly as more analysis methods are added.

In this Introduction to Analysis, you will learn how to build basic analysis workflows from data you have in your CARTO account.

## Layers and Analysis

Each layer starts out as a dataset in your account and is given an ID of a letter from the Latin alphabet (A, B, C, ...). An analysis requires an input layer (one or more of these letters) and parameters for the analysis. The output is a new dataset dependent on the first.

The new, transformed dataset can have new columns, transformed geometries, or be entirely different. This information is communicated to you after an analysis is applied.

Analyses can be chained as a workflow, and the individual analysis steps are given IDs that represent their history. For example, **B2** is the output of an analysis applied to **B1**, which is the output of an analysis applied to layer **B** (sometimes referred to as **B0**, the base dataset).

Let's look at how the analysis workflow looks in the Builder.

## Creating an Analysis Step

Using the Store Locations dataset, we can find the area that represents a 300 second (5 minute) drive from a specific point. We need to select the following settings:

* **TYPE**: Time
* **BY**: car
* **TIME (SECONDS)**: 300
* **TRACTS**: 1
* **BOUNDARIES**: Intact

This will create areas from the points in our original dataset (**B0**) that take **300 seconds** or less **time** to travel from by **car**. The Tracts option lets you choose the number of intermediate values between 0 and the number of seconds you choose, while Boundaries lets you get the individual boundaries or all merged as one. **_double check this information_**

## Pulling out an Analysis Step

After applying an analysis, we oftentimes want to add more context to highlight the results of the analysis along with the original data used. In the case of the Drive Time example used here, it would be helpful to see the Drive Time polygons underneath the point locations of the stores.

To do this, all we need to do is click and drag the new analysis output -- B1 in our case -- and pull it into the layer list to create a new layer. The result is another layer in the list which is a duplicate of the layer we just created. The layer we drag the analysis from resets to the original dataset (Layer B).

Now we have a map that shows a drive time analysis layered with the locations of the stores the analysis pulls from. If we wanted to do further analysis off of the Drive Time we would just click the **`+`** in the Workflow menu and choose another step.

## Wrapping Up

Nice work on completing your first analysis! Doing this analysis is quick and easy. We went from data to results in just a few minutes -- all with no coding required.

Now that we have a result, let's look at how to share that with the world in our next lesson on Publishing!

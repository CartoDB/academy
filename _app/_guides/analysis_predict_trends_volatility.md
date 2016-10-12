---
title: "Analysis - Predict Trends and Volatility"
description: Describes how to predict probability of upward and downward trends using spatial Markov chains, with the CARTO Builder.
permalink: /courses/guides/predict-trends-and-volatility/
---

# Analysis - Predict Trends and Volatility

This guide describes how the _Predict trends and volatility_ analysis (also known as Spatial Markov analysis), looks at a sequence of events, and analyzes the tendency of an event to be followed by another. This analysis generates a sequence of random but related events, from points dispersed equally in time and context. 

The data suitable for this analysis are "dependent random events", where the likelihood of the event occurring in future is dependent on what happened last (dependent and mutually exclusive events). **You must select at least two input columns, where each column should contain values for a time period.** 

## Example

For this example, the _Predict trends and volatility_ analysis predicts trends on data on per capita income, observed annually from 1929 to 2010 for the lower 48 US states. 

<iframe width="100%" height="520" frameborder="0" src="https://team.carto.com/u/mehak-carto/builder/81bfd32c-7543-11e6-b62d-0ee66e2c9693/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

<span class="wrap-border"><img src="/academy/img/guides/predict_trends/example.jpg" alt="Example of Predict trends and volatility analysis map" /></span>

**NEED final IMAGE FROM MAMATA- placeholder is a static image from the research google doc**
**reviewer note from Mehak: recreate image to show diverging ramp on the trend column.**

### Results

The important outputs of this analysis are the trend columns that are added to your dataset (`trend`, `trend_up`, `trend_down`) and `volatility`. 

- Trends define the statistics of probability distribution. Since the system changes randomly, it is generally impossible to predict with certainty the state of a Markov chain at a given point in the future. However, the statistical properties of the system's future can be predicted. In many applications, it is these statistical properties that are important

  The changes of state of the event-series are called transitions, and the probabilities associated with various state-changes are called transition probabilities. The set of all states and transition probabilities completely characterizes a Markov chain. By convention, we assume all possible states and transitions have been included in the definition of the processes, so there is always a next state. This transition of the sum of probabilities trending up (relative to the unit index of that probability) is given in the `trend up`, the trend downwards in `trend_down` and the overall trend (with the direction signified by preceding signs) by `trend`.

- Volatility is the degree of variation of the event series data over time, measured by the standard deviation of probabilities within the trends

## Cartography Tip

This analysis is based on the probability and statistics theory of markov chains which is a stochastic process that satisfies ‘markov property’. Markov property is defined as the process that satisfies the ability to predict the future of the process based on its current state, as well as on the process’s history. Within this, we explore the discrete-time Markov chain which transitions from one state to another, and probability distribution predictions of the next state can be made based on the current state of the process.

## External Resources

- [Markov chain geostatistics](http://gis.geog.uconn.edu/weidong/Markov_chain_spatial_statistics.htm)

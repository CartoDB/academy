# Commands

There are many commands available to help you build and test sites. Here are a few highlights to get started with.


## Retrieve documentation

Since the documentation for every component of CartoDB is distributed among each repository we need to pull them first before building the actual site. You can do this executing the following script:

```
./docs_build.sh
```


## Run locally

```
grunt serve
```

This will have Jekyll build the site, run a static server to listen on port 9001 (which you can now reach at [http://localhost:9001/](http://localhost:9001/)), and watch for changes to site files. Every change will cause Jekyll to rebuild the affected files.

Also, you can run the docs locally as if it was on staging with `grunt serve --target=staging`


## Build & Optimize

```
grunt build
```

Build and optimize the current site, ready for deployment. This includes image, script, stylesheet and HTML optimization and minification.

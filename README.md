# Map Academy

The Map Academy is an online resource to learn all things digital maps, data visualization, and geospatial analysis. We'll go on publishing courses to tackle different challenges in online mapping, from introductory courses to advanced ones. It's an open project in which anyone can contribute.

The Map Academy website is built on top of Jekyll, a simple content management system for static sites.

[More about the Map Academy](/about/)


## How to install

In order to run Academy locally, install [bundler](http://bundler.io/) and [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm). Once these are installed run the following:

```
npm install -g grunt-cli
bundle install
bower install
```

## Develop

When working on a new feature, we recommend forking and creating a new branch from `master`. After committing your changes open a Pull Request to initiate discussion.

To run the Map Academy locally, run:

```
grunt serve
```

This will generate your site using Jekyll, run a local serve, and open a browser window for you at `localhost:9000`. 

You can continue to edit your lesson files and grunt will detect any changes you make and regenerate the site for you.

## Contributing

To contribute just check the instructions in [CONTRIBUTING.md](https://github.com/CartoDB/academy/blob/master/CONTRIBUTING.md)


## Deploy

Once the Pull Request has been reviewed _and the branch passes the tests_, it can be merged to the master branch for deployment.

Then, you can type:

```
grunt build
```

With the production configuraion to deploy the static files.


## More info

* http://jekyllrb.com/
* https://guides.github.com/introduction/flow/

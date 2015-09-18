# Map Academy

The Map Academy is an online resource to learn all things digital maps and visualizations. We'll go on publishing courses to tackle different challenges in online mapping, from introductory courses to advanced ones. Its an open project in which anyone can contribute.

The Map Academy website is built on top of Jekyll, a simple content management system for static sites.

[More about the Map Academy](http://academy.cartodb.com/about.html)


## How to install

In order to install Jekyll make sure you have Ruby and Compass installed.

```
gem install jekyll
gem install compass
```


## Develop

When working on a new feature, we recommend forking and creating a new branch from `master`. After commiting your changes open a Pull request to initiate discussion.

We use Compass to organize and work with stylesheets.

To compile the project's sass files into css:

```
compass compile
```

To watch the project for changes and compile whenever it does:

```
compass watch
```

This would be solved once we migrate to `2.0` (see [TODO](#TODO))


### Working with Jekyll

To start the server type the next command in your shell:

```
jekyll serve -w
```

And access normally in your browser to the next address:

http://0.0.0.0:4000

The site normally has a static page, a layout, a js and a css per section (default, course, lesson). Courses are filled dynamically from the child pages, lessons.


## Contributing

To contribute just check the instructions in [CONTRIBUTING.md](https://github.com/CartoDB/academy/blob/master/CONTRIBUTING.md)


## Deploy

Once the Pull Request has been reviewed _and the branch passes the tests_, it can be merged to the master branch for deployment.

Then, you can type:

```
jekyll build --config _config-production.yml
```

With the production configuraion to deploy the static files.

## TODO

* Migrate to Jekyll 2.0


## More info

* http://jekyllrb.com/
* http://compass-style.org/
* https://guides.github.com/introduction/flow/

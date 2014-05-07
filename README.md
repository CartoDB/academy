# Map Academy

The Map Academy is an online resource to learn all things digital maps and visualizations. We'll go on publishing courses to tackle different challenges in online mapping, from introductory courses to advanced ones. Its an open project in which anyone can contribute. 

[More about the Map Academy](http://0.0.0.0:4000/about.html)

## How to install

The Map Academy uses Jekyll as the CMS. You can build it locally in your computer easily. This are the steps required:

```
gem install jekyll
gem install compass

compass watch
jekyll serve -w
```

## Deploy

```
jekyll build --config _config-production.yml
```

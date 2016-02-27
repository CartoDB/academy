# Installation

Install the dependencies if you don't already have them.


## Dependencies

The dependencies are:

* [Ruby](https://www.ruby-lang.org/)
* [Node.js](https://nodejs.org)
* [Grunt](http://gruntjs.com/)
* [Bower](http://bower.io/)
* [gulp.js](http://gulpjs.com)


1. Install [XCode Command Line Tools](https://developer.apple.com/xcode/downloads/)  
1. Install [Homebrew](http://brew.sh/)  
  * `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
1. Install [nodejs.org](https://nodejs.org/) 0.10.x  
  * `brew install node`
1. Install [ruby-install](https://github.com/postmodern/ruby-install)  
  * `brew install ruby-install`
1. Install [Ruby](https://www.ruby-lang.org/)  
  * `ruby-install ruby 2.4.0`
1. Install [chruby](https://github.com/postmodern/chruby)
  * `brew install chruby`

  Add the following to the ~/.bashrc or ~/.zshrc file:

  * `source /usr/local/share/chruby/chruby.sh`

1. Install [bundler](http://bundler.io)
  * `gem install bundle`
1. Set Ruby version to 2.3.0  
  * `echo '2.3.0' > .ruby-version`
1. Install [RubyGems](https://rubygems.org/) dependencies ([Jekyll](http://jekyllrb.com/)(http://jekyllrb.com/))  
  * `bundle install`
1. Install the [Grunt CLI](http://gruntjs.com/)  
  * `npm install -g grunt-cli`
1. Install [Bower](http://bower.io/)  
  * `npm install -g bower`
1. Install [npm](https://www.npmjs.org) dependencies  
  * `npm install`
1. Install [Bower](http://bower.io/) dependencies  
  * `bower install`

That's it! You should now have everything needed to use The Map Academy website.


## Getting the code

Once you have all of the dependencies installed, you only need to [get the code](https://github.com/CartoDB/academy/).


## Running the site

You may want to get used to some of the [COMMANDS](COMMANDS.md) available.

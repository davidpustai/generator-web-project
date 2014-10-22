# Web project generator [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

My simple [Yeoman](http://yeoman.io) generator.


## I'm using

 * [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)
 * [normalize.css](https://github.com/necolas/normalize.css)
 * [Modernizr](https://github.com/Modernizr/Modernizr)
 * [jQuery](https://github.com/jquery/jquery)


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

This package can't be installed by npm yet. To install generator-web-project clone this repository simply using `git clone git@github.com:davidpustai/generator-web-project.git` and than run:

```
$ npm link
```

<!---
To install generator-web-project from npm, run:

```
$ npm install -g generator-web-project
```
-->

Finally, initiate the generator:

```
$ yo web-project
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## Grunt commands

 * `grunt [default]` - *use for development*
	* compiles and prefixes scss
	* runs local server (with live reload) at `localhost:8000`
	* watches for changes

 * `grunt build` - *use when publishnig, compiles everything to `dist` folder*
 	* compiles, prefixes, concats and minifies scss
 	* minifies media queries
 	* concats and minifies javascript
 	* minifies html
 	* copies favicons, browserconfigs etc.
 	* runs local server at `localhost:8000`
 	* makes everything avaliable for production in `dist` folder


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
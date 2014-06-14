# <%= htmlTitle %> [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Including
 * [Zurb Foundation 5](http://foundation.zurb.com/)
 * [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)
 * [normalize.css](https://github.com/necolas/normalize.css)
 * [Modernizr](https://github.com/Modernizr/Modernizr)
 * [jQuery](https://github.com/jquery/jquery)

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

***
Generated via [Yeoman](http://yeoman.io) with [this generator](https://github.com/davidpustai/generator-web-project).
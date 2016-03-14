# <%= htmlTitle %> [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Using
 * [HTML5 Boilerplate](https://html5boilerplate.com/)
 * [normalize.css](https://necolas.github.io/normalize.css/)
 * [Modernizr](https://modernizr.com/)
 * [jQuery](https://jquery.com/)
 * [SASS](http://sass-lang.com/)

## Supports
All modern browsers including IE 8+.

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
 * `grunt serve` - *use for production build review*
 	* builds the project with `build` task
 	* runs local server at `localhost:8000`

## Linting
We are linting with [Stylelint](http://stylelint.io/).
```
stylelint assets/scss/**/*.scss --syntax scss
```

***
Generated via [Yeoman](http://yeoman.io) with [generator-web-project](https://github.com/davidpustai/generator-web-project).
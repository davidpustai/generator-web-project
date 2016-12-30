# TODO


## General stuff
* add IE8 question to generator and generate IE8 stuff only when wanted
* javascript linting (ESLint)
* add assets processing graphic into readme
* add changelog for generated project
* automated build (and test) via Travis CI
* linting automation via Grunt/npm
* lint code in generator
* lint HTML
* humans.txt + rel attr
* Grunt -> Gulp
* image sprite implementation
* list in npm
* ask for GA key, warn when compiling into dist without it
* generate sitemap.xml


## NEEDS FIXING
* change dev & dist directories permissions, so you don't accidentaly overwrite your code
* source maps copying & generation
* dev watch -> copy img, fonts, templates


## Typography
* vertical rhythm solution and tools for testing ([why](http://zellwk.com/blog/why-vertical-rhythms/) and [how](https://scotch.io/tutorials/aesthetic-sass-3-typography-and-vertical-rhythm	) or [like this?](https://matejlatin.github.io/Gutenberg/))
* make body font size 1em instead of a px value
* add guide for unit using


## File system
* move favicons into img directory
* move configs like `.htaccess`, `crossdomain.xml` and `robots.txt` into src folder and copy them with Grunt (only keep project configs in root)
* group by components rather than technology (ecss)


## Documentation
* comment files, instead of having them in style guide
* connect to style guide (or move style guide to docs?)
* add style guide english translation
* remove redundant info from README


## SCSS
* no variables in helpers (base.scss), make it default
* lint SCSS settings files
* make sizes, colors & font-weights settings sass maps, add get mixins (color(), size())
* better `bp()` mixin (with min and max parameters - http://sass-mq.github.io/sass-mq/ ?)


## JS
* Modernizr grunt task
* load modernizr asynchronously out of IE8
* js helpers into some foundation
* rename plugins.js to helpers or something
* link to get_media_query snippet in `_media.scss` and `@mixin js-media-helpers` declaration


## Optimalization
* critical CSS solution (single file we inline on build? https://github.com/filamentgroup/grunt-criticalcss?)
* lazy load [images](http://developer.telerik.com/featured/lazy-loading-images-on-the-web/)
* lazy load fonts (check [webfontloader](https://github.com/typekit/webfontloader) and [css-tricks article](https://css-tricks.com/loading-web-fonts-with-the-web-font-loader/))
* uncss, class names minification
* performance test task - psi, colorguard
* check svgmin options
* picturefill + http://vimeo.com/92794354 (img/original -> img/scaled)
* drop loadCSS once most of generator's supported browsers implement `[rel="preload"]`


## older IE support
* support IE desktops https://github.com/jtangelder/grunt-stripmq, https://github.com/robinpokorny/grunt-legacssy

# TODO


## NEEDS FIXING
* critical CSS solution (single file we inline on build? https://github.com/filamentgroup/grunt-criticalcss?)
* JS breakpoint sharing conflicts if JS is loaded before CSS -> critical CSS
* source maps copying & generation, strip on dist


## General stuff
* Grunt -> Gulp
* drop IE8 support + solve the rest + custom GA implementation, browserslist
* GTM support
* mustache_renderer, cache busting (only if htaccess avaliable)
* remove defer from main.js
* editorconfig do readme
* [Yarn](https://yarnpkg.com/lang/en/)
* `bump.sh`
* list in npm/yarn
* 404 meta order
* 404 link to homepage
* 404 templating
* ask for project name along with HTML title (use it for slug etc.)
* use [accesslint.js](https://github.com/accesslint/accesslint.js)
* add assets processing graphic into readme or moduling for better understanding
* automated build (and test) via Travis CI
* handlebars? or other layouting
* humans.txt + rel attr
* Webpack
* image sprite implementation
* ask for GA key, warn when compiling into dist without it
* automated testing for generator and projects
* generate sitemap.xml
* code linting, when there is time (it is not yet)


## Typography
* vertical rhythm solution and tools for testing ([why](http://zellwk.com/blog/why-vertical-rhythms/) and [how](https://scotch.io/tutorials/aesthetic-sass-3-typography-and-vertical-rhythm	) or [like this?](https://matejlatin.github.io/Gutenberg/))
* make body font size 1em instead of a px value
* add guide for unit using


## File system
* src directory for all sources, only configs in root
* move configs like `.htaccess`, `browserconfig.xml` and `robots.txt` into src folder and copy them with Grunt (only keep project configs in root)
* group by components rather than technology (ecss)


## SCSS
* no variables in helpers (base.scss), make it default
* make sizes, colors & font-weights settings sass maps, add get mixins (color(), size())
* better `bp()` mixin (with min and max parameters - http://sass-mq.github.io/sass-mq/ ?)


## JS
* Modernizr grunt task
* load modernizr asynchronously out of IE8
* link to get_media_query snippet in `_media.scss` and `@mixin js-media-helpers` declaration


## Optimalization
* use grunt concurrent for all tasks since you can specify synchronous tasks as well
* font subseting and optimalization via grunt
* lazy load [images](http://developer.telerik.com/featured/lazy-loading-images-on-the-web/)
* lazy load fonts (check [webfontloader](https://github.com/typekit/webfontloader) and [css-tricks article](https://css-tricks.com/loading-web-fonts-with-the-web-font-loader/))
* uncss, class names minification
* performance test task - psi, colorguard
* check svgmin options
* picturefill + http://vimeo.com/92794354 (img/original -> img/scaled)
* drop loadCSS once most of generator's supported browsers implement `[rel="preload"]`


## older IE support
* support IE desktops https://github.com/jtangelder/grunt-stripmq, https://github.com/robinpokorny/grunt-legacssy

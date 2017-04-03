# TODO


## NEEDS FIXING
* JS breakpoint sharing conflicts if JS is loaded before CSS -> critical CSS


## General stuff
* use browserslist (drop IE8 support, update the rest, custom GA implementation)
* GTM support
* remove defer from main.js
* editorconfig do readme
* [Yarn](https://yarnpkg.com/lang/en/)
* `bump.sh`
* 404 link to homepage
* 404 templating
* ask for project name along with HTML title (use it for slug etc.)
* critical CSS solution
* use [accesslint.js](https://github.com/accesslint/accesslint.js)
* automated build (and test) via Travis CI
* handlebars? or other layouting
* humans.txt + rel attr
* Webpack
* ask for GA key, warn when compiling into dist without it
* automated testing for generator and projects
* generate sitemap.xml
* source maps copying & generation, strip on dist
* code linting, when there is time (it is not yet)


## Typography
* vertical rhythm solution and tools for testing ([why](http://zellwk.com/blog/why-vertical-rhythms/) and [how](https://scotch.io/tutorials/aesthetic-sass-3-typography-and-vertical-rhythm	) or [like this?](https://matejlatin.github.io/Gutenberg/))
* make body font size 1em instead of a px value
* add guide for unit using


## File system
* src directory for all sources, only configs in root
* move configs like `.htaccess`, `browserconfig.xml` and `robots.txt` into src folder and copy them with Gulp (only keep project configs in root)
* group by components rather than technology (ecss)


## SCSS
* no variables in helpers (base.scss), make it default
* make sizes, colors & font-weights settings sass maps, add get mixins (color(), size())
* better `bp()` mixin (with min and max parameters - http://sass-mq.github.io/sass-mq/ ?)


## JS
* Modernizr gulp task
* load modernizr asynchronously out of IE8
* link to get_media_query snippet in `_media.scss` and `@mixin js-media-helpers` declaration


## Optimalization
* font subseting and optimalization via gulp
* lazy load [images](http://developer.telerik.com/featured/lazy-loading-images-on-the-web/)
* lazy load fonts (check [webfontloader](https://github.com/typekit/webfontloader) and [css-tricks article](https://css-tricks.com/loading-web-fonts-with-the-web-font-loader/))
* uncss, class names minification
* performance test task - psi, colorguard
* picturefill + http://vimeo.com/92794354 (img/original -> img/scaled)

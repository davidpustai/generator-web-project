# TODO


## NEEDS FIXING
* `.visuallyhidden` class (https://github.com/h5bp/html5-boilerplate/commit/a9a271c999fac6a3fa9afe8a522b9c9716895b47)
* JS breakpoint sharing conflicts if JS is loaded before CSS -> critical CSS


## General stuff
* upgrade `.htaccess` + bower/npm
* use browserslist (custom GA implementation)
  * 'last 2 versions', 'ie >= 9', '> 1%' (h5bp)
* test & release 1.0.0
* [migrate away from bower](https://bower.io/blog/2017/how-to-migrate-away-from-bower/)
* manifest.json
  * https://github.com/h5bp/html5-boilerplate/commit/bc2710e047f801645b758189287f7b58991ca497
  * https://github.com/h5bp/html5-boilerplate/commit/0dd2a6670268090de6eabdddfa81b6df8477f21b
* upgrade to Gulp 4
  * rewrite Gulpfile with ES6 (https://css-tricks.com/using-es2017-async-functions/)
  * remove `runSequence` and more
* twig
  * handlebars? or other layouting
* [reset.css](https://scotch.io/tutorials/a-look-at-bootstrap-4s-new-reset-rebootcss)
* critical CSS solution (https://github.com/addyosmani/critical, https://github.com/filamentgroup/criticalCSS, https://nystudio107.com/blog/implementing-critical-css)
* [jQuery SRI automation](https://github.com/h5bp/html5-boilerplate/commit/76baba6a166f533a69a4905503d6c85c1c57396d) ([update](https://github.com/h5bp/html5-boilerplate/commit/7523c41733841bf87f5c3ec1c479e4cc82ef2ad5))
* fix gulp watch and cache and reloading
* ask for project name along with HTML title (use it for slug etc.)
* automated build (and test) via Travis CI
* humans.txt + rel attr
* ask for GA key, warn when compiling into dist without it
* automated testing for generator and projects (include lighthouse)
* generate sitemap.xml
* source maps copying & generation, strip on dist
* code linting, when there is time (it is not yet)
* documentation (see h5bp docs)


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
* Babel
* [Encoding data in CSS](http://ofcodeandcolor.com/2017/04/02/encoding-data-in-css/)
* link to get_media_query snippet in `_media.scss` and `@mixin js-media-helpers` declaration


## Optimalization
* font subseting and optimalization via gulp
* lazy load [images](http://developer.telerik.com/featured/lazy-loading-images-on-the-web/)
* lazy load fonts (check [webfontloader](https://github.com/typekit/webfontloader) and [css-tricks article](https://css-tricks.com/loading-web-fonts-with-the-web-font-loader/))
* uncss, class names minification
* performance test task - psi, colorguard
* picturefill + http://vimeo.com/92794354 (img/original -> img/scaled)


## Automation
* [accessibility](https://github.com/github/accessibilityjs)
* use [accesslint.js](https://github.com/accesslint/accesslint.js)
* https://www.cypress.io/features/

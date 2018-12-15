# TODO

## General stuff
* npm vulnerabilities
* https://twitter.com/justmarkup/status/974581638637142016
* test & release 1.0.0
* [migrate away from bower](https://bower.io/blog/2017/how-to-migrate-away-from-bower/)
* manifest.json
  * https://github.com/h5bp/html5-boilerplate/commit/bc2710e047f801645b758189287f7b58991ca497
  * https://github.com/h5bp/html5-boilerplate/commit/0dd2a6670268090de6eabdddfa81b6df8477f21b
* https://alistapart.com/article/the-slow-death-of-internet-explorer-and-future-of-progressive-enhancement?utm_source=CSS-Weekly&utm_campaign=Issue-316&utm_medium=email
* [dark mode support](https://paulmillr.com/posts/using-dark-mode-in-css/?utm_source=CSS-Weekly&utm_campaign=Issue-337&utm_medium=email)
* browserslist
  * custom GA implementation
  * region question in generator
* [reset.css](https://scotch.io/tutorials/a-look-at-bootstrap-4s-new-reset-rebootcss)
* sitemap.xml and robots.txt integration
* critical CSS solution (https://github.com/addyosmani/critical, https://github.com/filamentgroup/criticalCSS, https://nystudio107.com/blog/implementing-critical-css)
  * use loadCSS
* automated build (and test) via Travis CI
* humans.txt + rel attr
* ask for GA key, warn when compiling into dist without it
* automated testing for generator and projects (include lighthouse)
* source maps copying & generation, strip on dist
* documentation (see h5bp docs)


## Typography
* vertical rhythm solution and tools for testing ([why](http://zellwk.com/blog/why-vertical-rhythms/) and [how](https://scotch.io/tutorials/aesthetic-sass-3-typography-and-vertical-rhythm	) or [like this?](https://matejlatin.github.io/Gutenberg/))
* make body font size 1em instead of a px value
* add guide for unit using


## File system
* group by components rather than technology (ecss)


## SCSS
* make sizes, colors & font-weights settings sass maps, add get mixins (color(), size())
* better `bp()` mixin (with min and max parameters - http://sass-mq.github.io/sass-mq/ ?)


## JS
* Babel
* remove jQuery
* [Encoding data in CSS](http://ofcodeandcolor.com/2017/04/02/encoding-data-in-css/)
* link to get_media_query snippet in `_media.scss` and `@mixin js-media-helpers` declaration


## Optimalization
* [image optimization](https://dougsillars.com/2018/05/21/state-of-the-web-top-image-optimization-strategies/)
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

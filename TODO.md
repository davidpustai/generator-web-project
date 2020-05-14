# TODO

## General stuff
* https://github.com/h5bp/server-configs-apache/releases/tag/4.0.0 -> přesunout do devops a odkázat se na ně
* https://css-tricks.com/emergency-website-kit/ (at least the sw.js)
* https://medium.com/full-human/purgecss-2-0-c0e812e6c4f6
* [front-end testing](https://www.javascriptjanuary.com/blog/getting-started-with-front-end-testing)
* [hanging quotation](https://css-tricks.com/quoting-in-html-quotations-citations-and-blockquotes/)
* https://gist.github.com/tilap/31167027ddee8acbf0e7
* https://css-tricks.com/having-a-little-fun-with-custom-focus-styles/
* progressive jpg, png...
* use Dartsass instead of Nodesass => sass modules
* check if `defer` on main.js doesn't slow the page performance
* update browser support, ask for country of deployment with "global" option
* svg sprites & macro
* https://every-layout.dev/blog/multi-column-manipulation/?utm_source=CSS-Weekly&utm_campaign=Issue-373&utm_medium=email
* lazy load [images](http://developer.telerik.com/featured/lazy-loading-images-on-the-web/) [without reflow](https://css-tricks.com/preventing-content-reflow-from-lazy-loaded-images/)
	* for now `loading="lazy"` might be enough
* [Gherking](https://blog.juliobiason.me/thoughts/things-i-learnt-the-hard-way/)
* https://betterwebtype.com/articles/2019/06/16/5-keys-to-accessible-web-typography/
* https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/
* HTML title as variable for layout & 404
* separate copy fonts and only call that one on watch
* https://webhint.io/
* https://css-tricks.com/introducing-sass-modules/?utm_source=CSS-Weekly&utm_campaign=Issue-382&utm_medium=email
* test & release 1.0.0
* [migrate away from bower](https://bower.io/blog/2017/how-to-migrate-away-from-bower/)
* site.webmanifest (h5bp)
* inline CSS if < ~ 15/20kB
* ensure use of H/2
* force https redirects by default in htaccess
* [self-host static assets](https://csswizardry.com/2019/05/self-host-your-static-assets/)
* realfavicongenerator via gulp instead of premade favicons, browserconfig etc.
* https://alistapart.com/article/the-slow-death-of-internet-explorer-and-future-of-progressive-enhancement?utm_source=CSS-Weekly&utm_campaign=Issue-316&utm_medium=email
* [dark mode support](https://paulmillr.com/posts/using-dark-mode-in-css/?utm_source=CSS-Weekly&utm_campaign=Issue-337&utm_medium=email)
  * https://dev.wgao19.cc/2019-05-04__sun-moon-blending-mode/?utm_source=CSS-Weekly&utm_campaign=Issue-366&utm_medium=email
* browserslist
  * region question in generator
* [reset.css](https://scotch.io/tutorials/a-look-at-bootstrap-4s-new-reset-rebootcss)
* sitemap.xml and robots.txt integration
* critical CSS solution (https://github.com/addyosmani/critical, https://github.com/filamentgroup/criticalCSS, https://nystudio107.com/blog/implementing-critical-css)
  * https://www.filamentgroup.com/lab/load-css-simpler/
* automated build (and test) via Travis CI
* security.txt
* humans.txt + rel attr
* automated testing for generator and projects (include lighthouse)
* source maps copying & generation, strip on dist
* documentation (see h5bp docs)
- service workers
	- https://philipwalton.com/articles/smaller-html-payloads-with-service-workers/


## Typography
* vertical rhythm solution and tools for testing ([why](http://zellwk.com/blog/why-vertical-rhythms/) and [how](https://scotch.io/tutorials/aesthetic-sass-3-typography-and-vertical-rhythm	) or [like this?](https://matejlatin.github.io/Gutenberg/))


## File system
* group by components rather than technology (ecss)
* https://medium.com/@elad/css-architecture-folders-files-structure-f92b40c78d0b


## SCSS
* [make sizes, colors & font-weights settings sass maps, add get mixins (color(), size())](https://www.viget.com/articles/maps-math-and-magic-build-a-flexible-variable-system-in-sass/)
* better `bp()` mixin (with min and max parameters - http://sass-mq.github.io/sass-mq/ ?)


## JS
* module bundler (or replace Gulp with Webpack, if it can do all we do via Gulp)
* [Encoding data in CSS](http://ofcodeandcolor.com/2017/04/02/encoding-data-in-css/)
* link to get_media_query snippet in `_media.scss` and `@mixin js-media-helpers` declaration


## Optimalization
* [image optimization](https://dougsillars.com/2018/05/21/state-of-the-web-top-image-optimization-strategies/)
* font subseting and optimalization via gulp
* lazy load fonts (check [webfontloader](https://github.com/typekit/webfontloader) and [css-tricks article](https://css-tricks.com/loading-web-fonts-with-the-web-font-loader/))
* uncss, class names minification
* performance test task - psi, colorguard
* picturefill + http://vimeo.com/92794354 (img/original -> img/scaled)


## Automation
* [accessibility](https://github.com/github/accessibilityjs)
* use [accesslint.js](https://github.com/accesslint/accesslint.js)
* https://www.cypress.io/features/

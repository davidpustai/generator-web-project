# TODO

## General
- Github workflows
	- Dependabot
		- https://github.com/h5bp/main.css/commit/3978d8f50d75de868c904058650275e4f2c4f6ac
		- https://github.com/h5bp/html5-boilerplate/blob/main/.github/dependabot.yml
		- https://github.com/h5bp/html5-boilerplate/blob/a479681283a795ef29c4317d796cef8b24c88f3d/.github/workflows/dependency-review.yml
	- https://github.com/h5bp/html5-boilerplate/blob/main/.github/workflows/codeql-analysis.yml
	- taks for checking outdated packages
- gulp -> Vite
- replace imagemin-webp with https://www.npmjs.com/package/imagemin-avif
- [custom focus style](https://css-tricks.com/having-a-little-fun-with-custom-focus-styles/)
	- https://daverupert.com/2024/01/focus-visible-love/
- https://github.com/sindresorhus/modern-normalize
- better inline svg (icon) macro => pass alt => display as title and remove aria-hidden
- generator translation to i18n directory
- merge gulp tasks (e. g. concat) simillarly to img task
- [colorguard](https://github.com/SlexAxton/css-colorguard#programmatic)
- https://www.npmjs.com/package/autoreload-gulp
- force https redirects by default in htaccess
- update README
	- Contributing
	- Changelog
	- License
- ensure use of H/2
- sitemap.xml generation (https://www.sitemaps.org/protocol.html)
- perf budget check in gulp
- https://css-tricks.com/emergency-website-kit/ (at least the sw.js)
- browserslist by region (question in generator)
- site.webmanifest
- security.txt
- humans.txt + rel attr
- service workers
	- https://philipwalton.com/articles/smaller-html-payloads-with-service-workers/
- dark mode support
	- https://paulmillr.com/posts/using-dark-mode-in-css/?utm_source=CSS-Weekly&utm_campaign=Issue-337&utm_medium=email
	- https://dev.wgao19.cc/2019-05-04__sun-moon-blending-mode/?utm_source=CSS-Weekly&utm_campaign=Issue-366&utm_medium=email
	- CSS variables

## Images
- gulp-squoosh + gulp-svgo
- [image optimization](https://dougsillars.com/2018/05/21/state-of-the-web-top-image-optimization-strategies/)
- [automatic RIM](https://www.npmjs.com/package/gulp-responsive)
- SVG icons caching? sprite?

## CSS
- [Gutenberg](https://matejlatin.github.io/Gutenberg/)
- [PurgeCSS](https://medium.com/full-human/purgecss-2-0-c0e812e6c4f6)
- [hanging quotation](https://css-tricks.com/quoting-in-html-quotations-citations-and-blockquotes/)
- check: don’t use pure black or white, only near-black and near-white
- https://www.npmjs.com/search?ranking=popularity&q=keywords%3Apostcss-plugin

## JS
- Vite
- Astro option

## File system
- group by components rather than technology

## Fonts
- fluid typography - clamp(1rem, 0.45vw + 0.91rem, 1.31rem);
- lazy load fonts (check [webfontloader](https://github.com/typekit/webfontloader) and [css-tricks article](https://css-tricks.com/loading-web-fonts-with-the-web-font-loader/))
- [a11y font face](https://material.io/blog/atkinson-hyperlegible-design)

## Automation
- automated build test via CI
- automated testing for generator and projects (include lighthouse)
- [accessibility](https://github.com/github/accessibilityjs)
- [accesslint.js](https://github.com/accesslint/accesslint.js)
- [front-end testing](https://www.javascriptjanuary.com/blog/getting-started-with-front-end-testing)
- [Cypress.io](https://www.cypress.io/features/)
- Gherking ("Given that the system is in a certain state, When something happens, then this is expected")

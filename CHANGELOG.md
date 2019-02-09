# Change Log

## [Unreleased]
### Added
- HTML title to 404 page

### Changed
- moved source files into the `src` directory
- Mustache for Twig templating
- upgrade to `apache-server-configs` v3.1.0
- upgrade normalize.css to v8.0.1

### Removed
- Google Analytics, [you probably don't need them for every site](https://www.smashingmagazine.com/2019/01/save-planet-improving-website-performance/#what-are-you-analyzing)


## [0.15.0] - 2018-12-04
### Added
- browserslist

### Changed
- load CSS synchronously
- upgrade normalize.css to v8.0.0
- upgrade jQuery to v3.3.1
- upgrade Gulp to v4.0.0
- update `devDependencies`
- ugrade to `apache-server-configs` v3.0.0 and fetch it via npm (requires Apache version > 2.3)
- generate jQuery SRI hash on the go

### Removed
- IE8 and Android 3 support
- Modernizr
- `clip-path` from `.visuallyhidden` class ([source](https://github.com/h5bp/html5-boilerplate/commit/24d1a3287d8603c06709d74e7f5b2194cbee3b08))
- **support for non-Active LTS releases of Node.js (require Node.js 8.x or higher)**
- some redundant SCSS variables
- FastClick library

### Fixed
- sass errors killing watch
- different dev and dist styles due to media queries reordering


## [0.14.0] - 2018-02-09
### Added
- disallow certain robots from crawling content
- link to homepage from 404 error page

### Changed
- update `devDependencies`
- upgrade jQuery to v3.2.1
- fetch local jQuery version via bower
- don't shrink viewport to fit (Safari - https://stackoverflow.com/questions/33767533/what-does-the-shrink-to-fit-viewport-meta-attribute-do)

### Fixed
- `cursor: pointer` should be used only for links (https://www.w3.org/TR/CSS21/ui.html#propdef-cursor)
- `::first-letter` in print style can cause incorrect rendering in Chrome (https://github.com/h5bp/html5-boilerplate/commit/efa3db1cd02fad442693b986f5e7d47bf7ea6f5e)


## [0.13.0] - 2017-09-01
### Added
- assets revisioning (static cache busting)
- build automation via Gulp
- `svg` favicon copying
- Mustache templating
- `clip-path` as PE to `.visuallyhidden` class

### Changed
- when minifying HTML whitespace, always keep at least one space
- updated Modernizr to v3.5.0
- update normalize.css to 7.0.0
- update `devDependencies`
- update `.gitattributes` for Web Projects
- update browsehappy to https instead of http
- disallow 404.html in robots.txt
- use absolute paths for assets loading to work in subdirectories

### Removed
- build automation via Grunt
- source maps generation
- `.jpeg` image copying, use `.jpg`
- `processhtml` task
- GA deferring

### Fixed
- paralel revisioning might overwrite each others manifests instead of merging them


## [0.12.0] - 2017-04-03
### Fixed
- typo "project are" -> "project is"
- wrong order of meta tags in head
- print style for `pre` element
- print style for IE11 ([h5bp](https://github.com/h5bp/html5-boilerplate/commit/9c98cfaffb305bbcc9dd31f3be04ffa8506d0095))
- when a visually hidden element is focused, it will become visible

### Added
- WOFF2 font format support (copying)
- note security improvement for old IE users
- improved accessibility and documentation for `.visuallyhidden` class
- jQuery Subresource Integrity
- changelog for generated project

### Changed
- updated loadCSS to v1.2.1
- update normalize.css to 6.0.0
- don't copy `bower_components` in development enviroment, use grunt concat instead
- move favicons (favicon, apple-touch-icon, windows tiles) into `assets/img/favicons` and copy it to root when compiling to keep project root clean
- better structurize generator filesystem
- page templates are now stored in `templates/pages`
- update jQuery to v3.1.1
- display `.browserupgrade` message to IE9 users
- update `devDependencies`, require grunt ~1.0.0
- link to localized browser upgrade website (`cs`)
- don't copy robots.txt in development enviroment
- default `line-height` to `1.5` for better perceivability (following WCAG 2.0 Checklist 1.4.8)
- update loadCSS to v1.3.1
- improved README
- font-weight variable `$fw-normal` to `$fw-default`, "normal" could be confused with the CSS font-weight value "noramal"
- inherit `box-sizing` from `html` for easier usage of plugins that change it
- move base type and colors sepcification from `html` to `body`
- unified bower.json & package.json formating and dependency sorting
- headings are always just a bit bigger than general text
- no margins on headings

### Removed
- Sublime Text config files ignoring, use global gitignore instead
- Sublime Text project generation option, use `subl .` after generating and save it manualy
- SVG, TTF & EOT font formats support (copying)
- `max-width: 100%` for printed images ([reason](https://github.com/h5bp/html5-boilerplate/commit/a90685e01d261d2b9bd160c8f014dc20ad8e6749))
- `crossdomain.xml`


## [0.11.0] - 2016-12-30
### Fixed
- copy jQuery in development enviroment, until now we copy only compiled javascript
- copy windows tiles and browserconfig.xml to generated project

### Changed
- updated grunt-htmlmin to v1.5.0
- use fixed version for bower components instead of "latest"
- upgraded to jQuery v3.0.0 for non-IE8 browsers
- default `line-height` to `1.15` (following normalize.css)
- update normalize.css to v5.0.0

### Added
- pointer cursor on buttons (removed from normalize.css in v4.1.0)
- default cursor on disabled elements (removed from normalize.css in v4.1.0)
- headings are always just a bit bigger than body copy

### Removed
- local Stylelint installation
- the `S` selector wrapper, use jQuery's `$` instead
- the `rem-calc` SCSS function, use full (or halfs/quarters) `rem`s (or `em`s) to keep some sort of vertical rhythm or `px` for exact values (borders etc.)
- the `convert-to-rem` SCSS function
- SCSS linting with Stylelint


## [0.10.2] - 2016-04-26
### Fixed
- forgoten TODO and duplicity cleanup in Gruntfile


## [0.10.1] - 2016-04-19
### Fixed
- synchronize generator and generated project editorconfig

### Changed
- insert final new line at the end of files
- generalize YAML files formating in editorconfig

### Removed
- image sprites support


## [0.10.0] - 2016-04-18
### Fixed
- broken build process (`htmlmin`)

### Changed
- **require Node.js v5.x**
- bump htmlmin version
- move comment about generator version from Gruntfile to README
- moved assets including into Gruntfile instead of processing the HTML with `grunt-usemin`, all new files should be now included in the `concat` task according to the comments

### Added
- asynchronous loading of `main.js` and `main.css`

### Removed
- `grunt-usemin`


## [0.9.0] - 2016-03-24
### Added
- change log
- SCSS linting with Stylelint
- several new `grunt-htmlmin` options including `lint`
- normalize line endings via .gitattributes
- center `img` verticaly by default
- separate SCSS `organisms` from `components` (and create related directory)

### Changed
- dead `grunt-combine-media-queries` plugin for up to date `grunt-combine-mq`
- editorconfig whitespace style for `.travis.yml` and `package.json`
- bump devDependencies
- simplify the Google Analytics snippet using `async` & `defer`
- `browsehappy` class to `browser-upgrade`
- default `line-height` to `1.4`
- merge `_h5bp.scss` into `_base.scss`
- clean up and structurize [TODO.md](TODO.md)

### Removed
- input `placeholder` mixin
- google maps canvas image size hack
- selection color setting
- `body`'s `position: relative;`
- several `body` css specifications (`font-weight`, `font-style`, `cursor`)
- `-ms-interpolation-mode: bicubic;` for IE7 support
- default full-width `select` style
- `scss/vendor` directory

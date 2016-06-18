# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log follows standards by [Keep a CHANGELOG](http://keepachangelog.com/).

## [Unreleased]
### Changed
- updated Stylelint to v6.1.1
- bump htmlmin version
- use fixed version for bower components instead of "latest"
- upgraded to jQuery v3.0.0 for non-IE8 browsers

### Added
- pointer cursor on buttons (removed from normalize.css in v4.1.0)
- default cursor on disabled elements (removed from normalize.css in v4.1.0)
- several SCSS linting changes
	- limit maxmimal selector specificity to 2 classes and 1 type selector
	- disallow (unescaped) newlines in strings
	- lowercase type selectors, at-rule names, function names, properties, pseudo classes, pseudo elements, units, value keywords
	- require reason comment if disabling linting
	- check for suspicious contrast issues
	- require a newline after the semicolon of at-rules
	- disallow property values that are ignored due to another property value in the same rule
	- disallow adjacent empty lines within functions
	- disallow unknown units
	- disallow whitespace on the inside of the brackets within attribute selectors and on the inside of the parentheses within pseudo-class selectors
	- disallow redundant values in shorthand properties
	- disallow newline between blockless at-rules

### Removed
- local Stylelint installation
- the `S` selector wrapper, use jQuery's `$` instead


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

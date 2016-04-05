# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log follows standards by [Keep a CHANGELOG](http://keepachangelog.com/).

## [Unreleased]
### Changed
- bump htmlmin version

## [0.9.0] - 2016-03-24
### Added
- change log
- SCSS linting with Stylelint
- several new `grunt-htmlmin` options including `lint`
- normalize line endings via .gitattributes
- center `img` verticaly by default
- separate SCSS `organisms` from `components` (and create related directory)

## Changed
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

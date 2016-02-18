# TODO

* move favicons into img directory
* h5bp and base rules pruning
* rename plugins.js to helpers or something
* comment files, instead of having them in style guide
* JSCS & CSScomb (code style checkers)
* connect to style guide and add guide english translation
* group by components rather than technology (ecss)
* better `bp()` mixin (with min and max parameters - `http://sass-mq.github.io/sass-mq/` ?)
* components -> atoms, molecules, organisms
* grunt combine-media-queries
* grunt-spritesmith
* source maps copying & generation
* dev watch -> copy img, fonts, templates
* base -> layout
* get_media_query
* config.rb add_import_path not working
* cleaner project file system (e. g. icons copy from assets into dev/dist, don't keep them in root)
* https://github.com/filamentgroup/grunt-criticalcss + loadJS & loadCSS
* lazy load images and fonts
* list in npm
* static versions for bower, packages?
* sitemap.xml
* use Travis CI
* js helpers into some foundation
* performance test task - psi, colorguard
* latest jQuery? (3.0 Compact asap it comes out?)
* better file system (folders inside scss etc.)
* picturefill + http://vimeo.com/92794354 (img/original -> img/scaled)
* humans.txt + rel attr
* uncss, class names minification
* GA (https://github.com/dciccale/grunt-processhtml) + ask for key
* open sublime when ready
* check svgmin options
* Grunt -> Gulp

## README (both!)
* update grunt commands info
* file system
* add using -> grunt plugins + colorguard into grunt commands, mention sprites


##  HTML rewrites, processing, templating
* group header js & css for ie8


## older IE support
* support IE desktops https://github.com/jtangelder/grunt-stripmq, http://robin.medvedi.eu/mobile-first-and-ie8-solution-introducing-grunt-legacssy/
* separate print styles and add media element for IE8- (https://github.com/bpscott/breakup)
* print.scss, ie.scss (if supported)

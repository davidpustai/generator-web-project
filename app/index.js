/*
 * TODO:
 *  - add stuff from development of portfolio, tljc, ravensengineering
 *
 *  - debug baseline grid
 *  - mixins
 *  - možnost setings složek
 *  - open sublime when ready
 *  - scss do složek
 *  - normalize-scss + config
 *  - better bower includes (eg. fastclick)
 *  - jquery CDN fallback
 *  - modernizr custom build/CDN
 *  - globbing
 *  - do I need to include normalize, h5bp, foundation & compass resets?
 *  - separate settings into settings folder inside sass folder (add sass globbing)
 *  - separate print styles and add media element for IE8-
 *  - print.scss, ie.scss (if supported)
 *  - features - mp, fontello
 *  - support IE desktops https://github.com/jtangelder/grunt-stripmq, http://robin.medvedi.eu/mobile-first-and-ie8-solution-introducing-grunt-legacssy/
 *  - uncss, class names minification
 *  - README - grunt commands, file system
 *  - humans.txt - rel attr, humans.txt, button possibility, http://humanstxt.org/Im-human.html
 *  - https://github.com/gruntjs/grunt-contrib-bump
 *  - rev
 *  - GA
 *  - git initialization
 *  - Gruntfile.js - open
 *  - use https://github.com/buildingblocks/grunt-combine-media-queries to minify media queries to one
 *  - dploy settings at generating (dploy?)
 *
 */

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var WebProjectGenerator = module.exports = function WebProjectGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WebProjectGenerator, yeoman.generators.Base);

WebProjectGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Foundation5 with Compass and HTML5 Boilerplate are prepared!');

  var prompts = [{
		type: 'confirm',
		name: 'localizeCZ',
		message: 'Would you like to use Czech?',
		default: false
	}, {
		type: 'confirm',
		name: 'createSublimeTextProjectFile',
		message: 'Create Sublime Text project file?',
		default: true
	}, {
		name: 'htmlTitle',
		message: 'Your HTML <title>?',
		default: this.appname
	}/*, {
		type: 'checkbox',
		name: 'features',
		message: 'What more would you like?',
		choices: [{
			name: 'Magnific Popup',
			value: 'includeMagnificPopup',
			checked: true
		}, {
			name: 'Fontello Fonts',
			value: 'includeFontello',
			checked: true
		}]
	}, {
		type: 'confirm',
		name: 'includeOpenSans',
		message: 'Would you like to include Open Sans as default font?',
		default: true
	}*/];

  this.prompt(prompts, function (answers) {
	var features = answers.features;

	function hasFeature(feat) { return features.indexOf(feat) !== -1; }

	// // manually deal with the response, get back and store the results.
	// // we change a bit this way of doing to automatically do this in the self.prompt() method.
	this.language = answers.localizeCZ ? 'cs' : 'en';
	this.createSublimeTextProjectFile = answers.createSublimeTextProjectFile;
	this.htmlTitle = answers.htmlTitle;
	// this.includeMagnificPopup = hasFeature('includeMagnificPopup');
	// this.includeFontello = hasFeature('includeFontello');
	// this.includeOpenSans = hasFeature('includeOpenSans');

	cb();
  }.bind(this));
};

WebProjectGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

WebProjectGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

WebProjectGenerator.prototype.SassConfig = function SassConfig() {
  this.copy('config.rb', 'config.rb');
};

WebProjectGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

WebProjectGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

WebProjectGenerator.prototype.editor = function editor() {
  this.copy('editorconfig', '.editorconfig');
  if (this.createSublimeTextProjectFile)
	this.template('project.sublime-project', this._.slugify(this.appname)+'.sublime-project');
};

WebProjectGenerator.prototype.assets = function assets() {
  this.mkdir('assets');
  this.mkdir('assets/font');
  this.mkdir('assets/img');
  this.mkdir('assets/js');
  this.mkdir('assets/sass');
};

WebProjectGenerator.prototype.files = function files() {
  this.copy('404_'+this.language+'.html', '404.html');

  this.copy('favicon.ico', 'favicon.ico');
  this.copy('apple-touch-icon-precomposed.png', 'apple-touch-icon-precomposed.png');

  this.copy('htaccess', '.htaccess');
  this.copy('robots.txt', 'robots.txt');
  this.copy('crossdomain.xml', 'crossdomain.xml')

  this.template('normalize-settings.scss','sass/_normalize-settings.scss');
  this.template('settings.scss','sass/_settings.scss');
  this.copy('h5bp.scss','sass/_h5bp.scss');
  this.copy('foundation.scss','sass/_foundation.scss');
  this.copy('main.scss','sass/main.scss');

  this.copy('main.js', 'js/main.js');
  this.copy('plugins.js', 'js/plugins.js');
};

WebProjectGenerator.prototype.index = function index() {

  this.copy('index.html', 'index.html');
};

WebProjectGenerator.prototype.install = function () {
  var done = this.async();
  this.installDependencies({
	callback: done
  });
};
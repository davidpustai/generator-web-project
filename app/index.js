/*
 * TODO:
 *  - separate print styles and add media element for IE8-
 *  - ask for title - package, bower, index
 *  - features - mp, fontello, opensans (other fonts -> text input, check foundation if it already doesn't the work)
 *  - uncss, class names minification
 *  - rev, htmlmin
 *  - humans.txt
 *  - subgenerators for adding features later
 *  - GA
 *  - print.scss, ie.scss
 *  - Gruntfile.js - open
 *  - use https://github.com/buildingblocks/grunt-combine-media-queries to minify media queries to one
 *  - create bump-version.sh
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
  console.log('Foundation5 with Compass and HTML5Boilerplate are prepared!');

  var prompts = [{
  		name: 'IEsupport',
  		message: 'Last version of IE you want to support?',
  		default: 6
	}, {
		type: 'confirm',
		name: 'localizeCZ',
		message: 'Would you like to use Czech?',
		default: false
	}, {
		type: 'confirm',
		name: 'createSublimeTextProjectFile',
		message: 'Create Sublime Text project file?',
		default: true
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
    this.IEsupport = answers.IEsupport;
    this.language = answers.localizeCZ ? 'cs' : 'en';
    this.createSublimeTextProjectFile = answers.createSublimeTextProjectFile;
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

WebProjectGenerator.prototype.fs = function fs() {
  this.mkdir('css');
  this.mkdir('font');
  this.mkdir('img');
  this.mkdir('js');
  this.mkdir('sass');
};

WebProjectGenerator.prototype.files = function files() {
  this.copy('404_'+this.language+'.html', '404.html');

  this.copy('favicon.ico', 'favicon.ico');
  this.copy('apple-touch-icon-precomposed.png', 'apple-touch-icon-precomposed.png');

  this.copy('htaccess', '.htaccess');
  this.copy('robots.txt', 'robots.txt');
  this.copy('crossdomain.xml', 'crossdomain.xml')

  this.template('normalize-settings.scss','sass/_normalize-settings.scss');
  this.copy('settings.scss','sass/_settings.scss');
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
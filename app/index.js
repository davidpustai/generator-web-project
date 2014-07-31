/*
 * TODO:
 *  - breakpint mixin (http://codepen.io/chriscoyier/blog/codepens-css)
 *  - better generator file system
 *  - GULP
 *  - https://github.com/yeoman/grunt-usemin#blockreplacements for
 *  - picturefill + http://vimeo.com/92794354 (img/original -> img/scaled)
 *  - make imagemin work
 *  - Modernizr CDN
 *  - visuallyhidden -> vh? (+ remove unneccessary/unused classes)
 *  - humans.txt + rel attr
 *  - uncss, class names minification
 *  - GA (https://github.com/dciccale/grunt-processhtml, https://github.com/changer/grunt-targethtml) + ask for key
 *    - new task ("dploy"/"production"), because of build is sometimes being used for testing final product (don't wanna analyze this :))
 *  - modernizr custom build/CDN
 *  - do I need to include normalize, h5bp, foundation & compass resets?
 *  - support IE desktops https://github.com/jtangelder/grunt-stripmq, http://robin.medvedi.eu/mobile-first-and-ie8-solution-introducing-grunt-legacssy/
 *  - separate print styles and add media element for IE8-
 *  - print.scss, ie.scss (if supported)
 *  - git initialization
 *  - README - file system (to both READMEs)
 *  - open sublime when ready
 *  - check svgmin options
 *
 */

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var file = yeoman.file;


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
		name: 'language',
		message: 'Which language would you like to use? (ISO abbreviation)',
		default: 'en'
	}, {
		type: 'confirm',
		name: 'createSublimeTextProjectFile',
		message: 'Create Sublime Text project file?',
		default: true
	}, {
		name: 'htmlTitle',
		message: 'Your HTML <title>?',
		default: this.appname
	}];

	this.prompt(prompts, function (answers) {
		// // manually deal with the response, get back and store the results.
		// // we change a bit this way of doing to automatically do this in the self.prompt() method.
		this.language = answers.language;
		this.createSublimeTextProjectFile = answers.createSublimeTextProjectFile;
		this.htmlTitle = answers.htmlTitle;

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
	if (this.createSublimeTextProjectFile) {
		this.template('project.sublime-project', this._.slugify(this.appname) + '.sublime-project');
	}
};

WebProjectGenerator.prototype.assets = function assets() {
	this.mkdir('assets');
	this.mkdir('assets/font');
	this.mkdir('assets/img');
	this.mkdir('assets/js');
	this.mkdir('assets/scss');

	this.mkdir('assets/scss/components');
	this.mkdir('assets/scss/helpers');
	this.mkdir('assets/scss/layout');
	this.mkdir('assets/scss/settings');
	this.mkdir('assets/scss/vendor');
};

WebProjectGenerator.prototype.files = function files() {
	this.template('_README.md', 'README.md');

	if (file.exists(this.src._base + '/404_' + this.language + '.html')) {
		this.copy('404_' + this.language + '.html', '404.html');
	}
	else {
		console.log('There is not 404.html error page in your choosen language, I\'m including english version.');
		this.copy('404_en.html', '404.html');
	}

	this.copy('favicon.ico', 'favicon.ico');
	this.copy('apple-touch-icon-precomposed.png', 'apple-touch-icon-precomposed.png');

	this.copy('htaccess', '.htaccess');
	this.copy('robots.txt', 'robots.txt');
	this.copy('crossdomain.xml', 'crossdomain.xml');

	this.copy('main.scss', 'assets/scss/main.scss');
	this.copy('ie8.scss', 'assets/scss/ie8.scss');
	this.copy('settings.scss', 'assets/scss/settings/_foundation.scss');
	this.copy('h5bp.scss', 'assets/scss/vendor/_h5bp.scss');
	this.copy('foundation.scss', 'assets/scss/vendor/_foundation.scss');
	this.copy('mixins.scss', 'assets/scss/helpers/_mixins.scss');

	this.copy('z-index-settings.scss', 'assets/scss/settings/_z-index.scss');
	this.copy('z-index-helper.scss', 'assets/scss/helpers/_z-index.scss');

	this.copy('main.js', 'assets/js/main.js');
	this.copy('plugins.js', 'assets/js/plugins.js');
	this.copy('jquery-2.1.0.js', 'assets/js/jquery.js'); // for dev CDN fallback, for production compiled by grunt from bower_components
	this.copy('jquery-1.8.0.js', 'assets/js/jquery-1.8.0.js');
	this.copy('selectivizr-1.0.3b.js', 'assets/js/selectivizr-1.0.3b.js');
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
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
	console.log('Project generated. Let\'s get to work!');

	var prompts = [{
		name: 'language',
		message: 'Which language would you like to use? (ISO abbreviation)',
		default: 'en'
	}, {
		name: 'htmlTitle',
		message: 'Descriptive and informative page title (HTML `<title>`)?', // WCAG 2.0 Checklist 1.4.8
		default: this.appname
	}];

	this.prompt(prompts, function (answers) {
		// // manually deal with the response, get back and store the results.
		// // we change a bit this way of doing to automatically do this in the self.prompt() method.
		this.language = answers.language;
		this.htmlTitle = answers.htmlTitle;

		cb();
	}.bind(this));
};

WebProjectGenerator.prototype.projectfiles = function projectfiles() {
	this.template('_README.md', 'README.md');

	this.copy('CHANGELOG.md', 'CHANGELOG.md');

	this.copy('configs/project/gitignore',		'.gitignore');
	this.copy('configs/project/gitattributes',	'.gitattributes');
	this.copy('configs/project/editorconfig',	'.editorconfig');
	this.copy('configs/project/bowerrc',		'.bowerrc');

	this.template('_package.json',	'package.json');
	this.template('_bower.json',	'bower.json');

	this.template('gulpfile.js');
};

WebProjectGenerator.prototype.dirs = function dirs() {
	this.mkdir('templates');

	this.mkdir('assets');

	this.mkdir('assets/font');

	this.mkdir('assets/img');
	this.mkdir('assets/img/favicons');

	this.mkdir('assets/js');
	this.mkdir('assets/js/components');

	this.mkdir('assets/scss');
	this.mkdir('assets/scss/components');
	this.mkdir('assets/scss/organisms');
	this.mkdir('assets/scss/helpers');
	this.mkdir('assets/scss/settings');
};

WebProjectGenerator.prototype.webfiles = function webfiles() {
	this.copy('configs/web/htaccess',			'.htaccess');
	this.copy('configs/web/robots.txt',			'robots.txt');
	this.copy('configs/web/browserconfig.xml',	'browserconfig.xml');

	this.copy('templates/partials/head-global.html',	'templates/partials/head-global.html');
	this.copy('templates/partials/scripts.html',		'templates/partials/scripts.html');

	this.copy('templates/pages/index.html', 'templates/pages/index.html');

	if (file.exists(this.src._base + '/templates/pages/404/404_' + this.language + '.html')) {
		this.copy('templates/pages/404/404_' + this.language + '.html', 'templates/pages/404.html');
	}
	else {
		console.log('There is not 404.html error page in your choosen language, I\'m including english version.');
		this.copy('templates/pages/404/404_en.html', 'templates/templates/pages/404.html');
	}

	this.copy('assets/img/favicons/favicon.ico',			'assets/img/favicons/favicon.ico');
	this.copy('assets/img/favicons/apple-touch-icon.png',	'assets/img/favicons/apple-touch-icon.png');
	this.copy('assets/img/favicons/tile.png',				'assets/img/favicons/tile.png');
	this.copy('assets/img/favicons/tile-wide.png',			'assets/img/favicons/tile-wide.png');

	this.copy('assets/scss/main.scss', 'assets/scss/main.scss');

	this.copy('assets/scss/settings/sizes.scss',	'assets/scss/settings/_sizes.scss');
	this.copy('assets/scss/settings/media.scss',	'assets/scss/settings/_media.scss');
	this.copy('assets/scss/settings/colors.scss',	'assets/scss/settings/_colors.scss');
	this.copy('assets/scss/settings/type.scss',		'assets/scss/settings/_type.scss');
	this.copy('assets/scss/settings/z-index.scss',	'assets/scss/settings/_z-index.scss');

	this.copy('assets/scss/helpers/functions.scss',			'assets/scss/helpers/_functions.scss');
	this.copy('assets/scss/helpers/mixins.scss',			'assets/scss/helpers/_mixins.scss');
	this.copy('assets/scss/helpers/visuallyhidden.scss',	'assets/scss/helpers/_visuallyhidden.scss');
	this.copy('assets/scss/helpers/base.scss',				'assets/scss/helpers/_base.scss');
	this.copy('assets/scss/helpers/shame.scss',				'assets/scss/helpers/_shame.scss');

	this.copy('assets/js/main.js',						'assets/js/main.js');
	this.copy('assets/js/plugins.js',					'assets/js/plugins.js');
	this.copy('assets/js/vendor/jquery-1.8.0.min.js',		'assets/js/vendor/jquery-1.8.0.min.js');
	this.copy('assets/js/vendor/modernizr.js',			'assets/js/vendor/modernizr.js');
	this.copy('assets/js/vendor/selectivizr-1.0.3b.js',	'assets/js/vendor/selectivizr-1.0.3b.js');
};

WebProjectGenerator.prototype.install = function () {
	var done = this.async();

	this.installDependencies({
		callback: done
	});
};

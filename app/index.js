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
	this.mkdir('src/templates');

	this.mkdir('src/assets');

	this.mkdir('src/assets/font');

	this.mkdir('src/assets/img');

	this.mkdir('src/assets/js');
	this.mkdir('src/assets/js/components');

	this.mkdir('src/assets/scss');
	this.mkdir('src/assets/scss/components');
	this.mkdir('src/assets/scss/organisms');
	this.mkdir('src/assets/scss/helpers');
	this.mkdir('src/assets/scss/settings');
};

WebProjectGenerator.prototype.webfiles = function webfiles() {
	this.copy('configs/web/robots.txt',			'src/robots.txt');
	this.copy('configs/web/browserconfig.xml',	'src/browserconfig.xml');

	this.copy('templates/layouts/base.twig', 'src/templates/layouts/base.twig');

	this.copy('templates/pages/index.twig', 'src/templates/pages/index.twig');

	if (file.exists(this.src._base + '/templates/pages/404/404_' + this.language + '.twig')) {
		this.copy('templates/pages/404/404_' + this.language + '.twig', 'src/templates/pages/404.twig');
	}
	else {
		console.log('There is not a 404 error page in your choosen language, I\'m including english version.');
		this.copy('templates/pages/404/404_en.twig', 'src/templates/templates/pages/404.twig');
	}

	this.copy('assets/img/favicons/favicon.ico',			'src/favicon.ico');
	this.copy('assets/img/favicons/apple-touch-icon.png',	'src/apple-touch-icon.png');
	this.copy('assets/img/favicons/tile.png',				'src/tile.png');
	this.copy('assets/img/favicons/tile-wide.png',			'src/tile-wide.png');

	this.copy('assets/scss/main.scss', 'src/assets/scss/main.scss');

	this.copy('assets/scss/settings/sizes.scss',	'src/assets/scss/settings/_sizes.scss');
	this.copy('assets/scss/settings/media.scss',	'src/assets/scss/settings/_media.scss');
	this.copy('assets/scss/settings/colors.scss',	'src/assets/scss/settings/_colors.scss');
	this.copy('assets/scss/settings/type.scss',		'src/assets/scss/settings/_type.scss');
	this.copy('assets/scss/settings/z-index.scss',	'src/assets/scss/settings/_z-index.scss');

	this.copy('assets/scss/helpers/functions.scss',	'src/assets/scss/helpers/_functions.scss');
	this.copy('assets/scss/helpers/mixins.scss',	'src/assets/scss/helpers/_mixins.scss');
	this.copy('assets/scss/helpers/sr-only.scss',	'src/assets/scss/helpers/_sr-only.scss');
	this.copy('assets/scss/helpers/base.scss',		'src/assets/scss/helpers/_base.scss');
	this.copy('assets/scss/helpers/shame.scss',		'src/assets/scss/helpers/_shame.scss');

	this.copy('assets/js/main.js',						'src/assets/js/main.js');
	this.copy('assets/js/plugins.js',					'src/assets/js/plugins.js');
};

WebProjectGenerator.prototype.install = function () {
	var done = this.async();

	this.installDependencies({
		callback: done
	});
};

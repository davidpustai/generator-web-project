'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
_.extend(Generator.prototype, require('yeoman-generator/lib/actions/install'));
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify');

module.exports = class extends Generator {

	async prompting() {
		// Have Yeoman greet the user.
		this.log(
			yosay(
				`Welcome to the ${chalk.red('Generator Web Project')}!`
			)
		);

		this.answers = await this.prompt([
			{
				type: 'input',
				name: 'lang',
				message: 'Which spoken language will be the website created for? (will be used as the root `lang` attribute)',
				default: 'en'
			}, {
				type: 'input',
				name: 'title',
				message: 'Descriptive and informative page title (will be used as the `title` element)?'
			}
		]);
	}

	projectFiles() {
		this._copy('configs/project/editorconfig', '.editorconfig');
		this._copy('configs/project/gitattributes', '.gitattributes');
		this._copy('configs/project/gitignore', '.gitignore');
		this._copy('configs/project/postcss.config.js', 'postcss.config.cjs');
		this._copy('CHANGELOG.md', 'CHANGELOG.md');
		this._copy('gulpfile.js', 'gulpfile.js');
		this._template('_package.json', 'package.json');
		this._template('_README.md', 'README.md');
	}

	dirs() {
		this._mkdir('src/assets/font');
		this._mkdir('src/assets/img');
		this._mkdir('src/assets/img/icons');
		this._mkdir('src/assets/js');
		this._mkdir('src/assets/js/helpers');
		this._mkdir('src/assets/js/components');
		this._mkdir('src/assets/scss');
		this._mkdir('src/assets/scss/components');
		this._mkdir('src/assets/scss/helpers');
		this._mkdir('src/assets/scss/organisms');
		this._mkdir('src/assets/scss/settings');
		this._mkdir('src/templates');
	}

	webFiles() {
		this._template('configs/web/_site.webmanifest', 'src/site.webmanifest');
		this._copy('configs/web/robots.txt', 'src/robots.txt');
		this._copy('assets/img/favicons/android-chrome-192x192.png', 'src/android-chrome-192x192.png');
		this._copy('assets/img/favicons/android-chrome-512x512.png', 'src/android-chrome-512x512.png');
		this._copy('assets/img/favicons/apple-touch-icon.png', 'src/apple-touch-icon.png');
		this._copy('assets/img/favicons/favicon.ico', 'src/favicon.ico');
		this._copy('assets/img/favicons/favicon.svg', 'src/favicon.svg');
		this._copy('assets/js/app.js', 'src/assets/js/app.js');
		this._copy('assets/js/helpers/icons.js', 'src/assets/js/helpers/icons.js');
		this._copy('assets/scss/style.scss', 'src/assets/scss/style.scss');
		this._copy('assets/scss/components/a11y-skip-to.scss', 'src/assets/scss/components/_a11y-skip-to.scss');
		this._copy('assets/scss/helpers/base.scss', 'src/assets/scss/helpers/_base.scss');
		this._copy('assets/scss/helpers/z-index.scss', 'src/assets/scss/helpers/_z-index.scss');
		this._copy('assets/scss/helpers/shame.scss', 'src/assets/scss/helpers/_shame.scss');
		this._copy('assets/scss/helpers/visually-hidden.scss', 'src/assets/scss/helpers/_visually-hidden.scss');
		this._copy('assets/scss/settings/colors.scss', 'src/assets/scss/settings/_colors.scss');
		this._copy('assets/scss/settings/breakpoints.scss', 'src/assets/scss/settings/_breakpoints.scss');
		this._copy('assets/scss/settings/sizes.scss', 'src/assets/scss/settings/_sizes.scss');
		this._copy('assets/scss/settings/z-index.scss', 'src/assets/scss/settings/_z-index.scss');
		this._template('templates/layouts/base.twig', 'src/templates/layouts/base.twig');
		this._template('templates/pages/index.twig', 'src/templates/pages/index.twig');
		this._template('templates/pages/404.twig', 'src/templates/pages/404.twig');
	}

	install() {
		this.npmInstall();
	}

	_template(src, dest) {
		this.fs.copyTpl(
			this.templatePath(src),
			this.destinationPath(dest),
			{
				...this.answers,
				appName: slugify(path.basename(path.resolve()), {
					lower: true,
					strict: true
				}),
				pkg: this.fs.readJSON(
					path.join(this.sourceRoot(), '../../../package.json')
				)
			}
		);
	}

	_copy(src, dest) {
		this.fs.copyTpl(
			this.templatePath(src),
			this.destinationPath(dest)
		);
	}

	_mkdir(dest) {
		fs.mkdirSync(
			this.destinationPath(dest),
			{ recursive: true }
		);
	}

};

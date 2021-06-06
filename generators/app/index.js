'use strict';
const Generator = require('yeoman-generator');
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
		this._copy('configs/project/bowerrc', '.bowerrc');
		this._copy('configs/project/editorconfig', '.editorconfig');
		this._copy('configs/project/gitattributes', '.gitattributes');
		this._copy('configs/project/gitignore', '.gitignore');
		this._template('_bower.json', 'bower.json');
		this._copy('CHANGELOG.md', 'CHANGELOG.md');
		this._copy('gulpfile.js', 'gulpfile.js');
		this._template('_package.json', 'package.json');
		this._template('_README.md', 'README.md');
	}

	dirs() {
		this._mkdir('src/assets/font');
		this._mkdir('src/assets/img');
		this._mkdir('src/assets/js');
		this._mkdir('src/assets/js/components');
		this._mkdir('src/assets/scss');
		this._mkdir('src/assets/scss/components');
		this._mkdir('src/assets/scss/helpers');
		this._mkdir('src/assets/scss/organisms');
		this._mkdir('src/assets/scss/settings');
		this._mkdir('src/templates');
	}

	webFiles() {
		this._copy('configs/web/browserconfig.xml', 'src/browserconfig.xml');
		this._copy('configs/web/robots.txt', 'src/robots.txt');
		this._copy('assets/img/favicons/apple-touch-icon.png', 'src/apple-touch-icon.png');
		this._copy('assets/img/favicons/favicon.ico', 'src/favicon.ico');
		this._copy('assets/img/favicons/tile.png', 'src/tile.png');
		this._copy('assets/img/favicons/tile-wide.png', 'src/tile-wide.png');
		this._copy('assets/js/main.js', 'src/assets/js/main.js');
		this._copy('assets/js/plugins.js', 'src/assets/js/plugins.js');
		this._copy('assets/scss/main.scss', 'src/assets/scss/main.scss');
		this._copy('assets/scss/helpers/base.scss', 'src/assets/scss/helpers/_base.scss');
		this._copy('assets/scss/helpers/z-index.scss', 'src/assets/scss/helpers/_z-index.scss');
		this._copy('assets/scss/helpers/shame.scss', 'src/assets/scss/helpers/_shame.scss');
		this._copy('assets/scss/helpers/sr-only.scss', 'src/assets/scss/helpers/_sr-only.scss');
		this._copy('assets/scss/settings/colors.scss', 'src/assets/scss/settings/_colors.scss');
		this._copy('assets/scss/settings/breakpoints.scss', 'src/assets/scss/settings/_breakpoints.scss');
		this._copy('assets/scss/settings/sizes.scss', 'src/assets/scss/settings/_sizes.scss');
		this._copy('assets/scss/settings/z-index.scss', 'src/assets/scss/settings/_z-index.scss');
		this._template('templates/layouts/base.twig', 'src/templates/layouts/base.twig');
		this._copy('templates/pages/index.twig', 'src/templates/pages/index.twig');
		if (this.fs.exists(this.templatePath('templates/pages/404/404_'+this.answers.lang+'.twig'))) {
			this._template('templates/pages/404/404_'+this.answers.lang+'.twig', 'src/templates/pages/404.twig');
		} else {
			this.log('There is not a 404 error page in your choosen language, I\'m including english version.');
			this._template('templates/pages/404/404_en.twig', 'src/templates/templates/pages/404.twig');
		}
	}

	install() {
		this.npmInstall();
		this.bowerInstall();
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

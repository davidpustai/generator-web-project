/*
 * TODO:
 *  - humans.txt
 *  - Gruntfile.js - serve:open and livereload
 *  - features
 *  - sublime path
 *  - rev, htmlmin
 *  - ask for title
 *  - GA
 *  - uncss, function and class names minification
 *  - subgenerators for adding features later
 *  - localization
 *  - test main.scss imports and if normalize and h5bp needed
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

  var prompts = [/*{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Magnific Popup',
      value: 'includeMagnificPopup',
      checked: false
    }, {
      name: 'Fontello Fonts',
      value: 'includeFontello',
      checked: false
    }, {
      type: 'confirm',
      name: 'includeOpenSans',
      message: 'Would you like to include Open Sans as default font?',
      default: true
    }]
  }*/];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    // // manually deal with the response, get back and store the results.
    // // we change a bit this way of doing to automatically do this in the self.prompt() method.
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

WebProjectGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

WebProjectGenerator.prototype.bower = function bower() {
  this.copy('bowerrc.json', 'bowerrc.json');
  this.template('_bower.json', 'bower.json');
};

WebProjectGenerator.prototype.editor = function editor() {
  this.copy('editorconfig', '.editorconfig');
  //this.template('project.sublime-project', this.name+'.sublime-project');
};

WebProjectGenerator.prototype.fs = function fs() {
  this.mkdir('css');
  this.mkdir('font');
  this.mkdir('img');
  this.mkdir('js');
  this.mkdir('sass');
};

WebProjectGenerator.prototype.files = function files() {
  this.copy('404.html', '404.html');

  this.copy('favicon.ico', 'favicon.ico');
  this.copy('apple-touch-icon-precomposed.png', 'apple-touch-icon-precomposed.png');

  this.copy('htaccess', '.htaccess');
  this.copy('robots.txt', 'robots.txt');
  this.copy('crossdomain.xml', 'crossdomain.xml')

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
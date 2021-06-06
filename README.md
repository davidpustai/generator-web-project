# Web project generator

> [Yeoman](http://yeoman.io) generator for creating static websites. Includes some front-end goodies and automated processing.

### Using
 * parts of [HTML5 Boilerplate](https://html5boilerplate.com/)
 * [normalize.css](https://necolas.github.io/normalize.css/)
 * [SASS](http://sass-lang.com/) with Dart Sass
 * [Gulp](https://gulpjs.com/)
 * [Twig](https://twig.symfony.com/)
 * [Babel](https://babeljs.io/)

## Installation

First, install [Yeoman](http://yeoman.io) using [npm](https://www.npmjs.com/) (assuming you have pre-installed [node.js](https://nodejs.org/)).
```bash
npm install -g yo
```

This package isn't listed in npm, so you need to clone it and link it to your local npm manualy:
```bash
git clone git@github.com:davidpustai/generator-web-project.git
cd generator-web-project
npm link
```

Finally, generate your new project:
```bash
yo web-project
```

## Contributions

Feel free to fork and open pull requests. For now development happens on `master` branch only.

When releasing
* update version in `package.json`
* rename `[Unreleased]` section in `CHANGELOG.md` to `[<version>] <date-of-release>`
* create new `[Unreleased]` section at the top
* `git add . && git commit -m v<version-number>`
* `git tag -a v<version-number>`
* `git push && git push --tags`


## Changelog

In separate file [CHANGELOG.md](CHANGELOG.md). Please [keep a CHANGELOG](http://keepachangelog.com/).

This project adheres to [Semantic Versioning](http://semver.org/).


## License

MIT © [David Pustai](david@pustai.cz)

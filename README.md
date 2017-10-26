# Web project generator

> [Yeoman](http://yeoman.io) generator for creating static websites. Includes some front-end goodies and automated processing.


### Using
 * parts of [HTML5 Boilerplate](https://html5boilerplate.com/)
 * [normalize.css](https://necolas.github.io/normalize.css/)
 * [Modernizr](https://modernizr.com/)
 * [jQuery](https://jquery.com/) via CDN with [SRI Hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) and a local fallback
 * [SASS](http://sass-lang.com/)
 * [Gulp](https://gulpjs.com/)


## Supports

All modern browsers including IE 8+.


## Getting Started

First of all you will need [Yeoman](http://yeoman.io):

```
npm install -g yo
```

This package can't be installed by npm yet, so you will need to clone it and link it to your local npm manualy:

```
git clone git@github.com:davidpustai/generator-web-project.git
cd generator-web-project
npm link
```

Finally, initiate the generator:

```
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

[MIT License](https://en.wikipedia.org/wiki/MIT_License)


## Author

David Pustai – david.pustai@gmail.com

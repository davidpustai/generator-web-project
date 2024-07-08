# <%= title %>

## Using
- parts of [HTML5 Boilerplate](https://html5boilerplate.com/)
- [normalize.css](https://necolas.github.io/normalize.css/)
- [SASS](http://sass-lang.com/) with Dart Sass
- [Gulp](https://gulpjs.com/)
- [Twig](https://twig.symfony.com/)
- [Cypress](https://cypress.io/) for E2E testing

## Getting started
First install dependencies:
```
npm install
```

And let's start working (more about gulp commands below):
```
npm run dev
```

## CLI commands
- `npm run dev` - *use for development, compiles into `dev` directory*
	- compiles and prefixes scss
	- runs local server (with live reload) at `localhost:8000`
	- watches for changes
- `npm run build` - *use when deploying, compiles into `dist` directory*
 	- compiles, prefixes, concats and minifies scss
 	- concats and minifies javascript
 	- templates html with Twig and minifies it
 	- copies favicons and configs to root
 	- revisions assets to bust caches
 	- runs local server at `localhost:8000`
 	- makes everything avaliable for production in `dist` folder
- `npm run serve` - *use for production build review*
 	- builds the project with `build` task
 	- runs local server at `localhost:8000`

## Icons
SVG icons placed in `/src/assets/img/icons` are available for inline use in templates under the `icons` object. Dashes in filenames are replaced with underscords. E. g.:
```
{{ icons.chevron_down }}
```

To use an icon inline in JS, import the `helpers/icons.js` file and use the `icon` function:
```
icon('chevron-down');
```

## Testing
1. Set up your env in `cypress.env.json` according to the example in `cypress.env.json.example`.
2. Build assets and start the test server: `npm run serve`
3. Run the tests with `npx cypress run` or `npx cypress open`.

You can learn more about watch commands and the Cypress Studio in [Cypress Documentation](https://docs.cypress.io/).

## Contributions
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


***
Based on [generator-web-project](https://github.com/davidpustai/generator-web-project) <%= pkg.version %>.

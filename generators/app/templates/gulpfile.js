import gulp from 'gulp'
import concat from 'gulp-concat'
import connect from 'gulp-connect'
import { deleteAsync } from 'del'
import fs from 'fs'
import htmlmin from 'gulp-htmlmin'
import gulpIf from 'gulp-if'
import imagemin from 'gulp-imagemin'
import svgo from 'imagemin-svgo'
import webp from 'imagemin-webp'
import optipng from 'imagemin-optipng'
import path from 'path'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import rev from 'gulp-rev'
import revReplace from 'gulp-rev-replace'
import terser from 'gulp-terser'
import twig from 'gulp-twig'
import postcss from 'gulp-postcss'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
const sass = gulpSass(dartSass)

// ===============================================================
// PLUGIN SETTINGS SHARED ACCROSS MULTIPLE TASKS
// ===============================================================
const revManifestsBase = '.tmp/rev-manifests'

// ===============================================================
// ENVIROMENT VARIABLES
// ===============================================================
let ENV = 'dist'
let DEST = 'dist'

const setEnvDev = () => {
	return new Promise((resolve, reject) => {
		ENV = 'dev'
		resolve()
	})
}

const setDestDev = () => {
	return new Promise((resolve, reject) => {
		DEST = 'dev'
		resolve()
	})
}

// ===============================================================
// CLEAN
// ===============================================================
// Empty directories to start fresh.
const clean = () => deleteAsync(['.tmp', 'dev', 'dist'])

// ===============================================================
// CSS PROCESSING
// ===============================================================
const css = () => {
	const stream = gulp.src('src/assets/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({
			loadPaths: [
				'node_modules',
				'src/assets/scss'
			]
		}).on('error', sass.logError))
		.pipe(postcss())

	if ( ENV == 'dist' ) {
		return stream
			.pipe(rev())
			.pipe(gulp.dest(`${DEST}/assets/css`))
			.pipe(rev.manifest(`${revManifestsBase}/css.json`, {
				base: revManifestsBase
			}))
			.pipe(gulp.dest(revManifestsBase))
	} else {
		return stream
			.pipe(gulp.dest(`${DEST}/assets/css`))
			.pipe(connect.reload())
	}
}

// ===============================================================
// CONCAT JS
// ===============================================================
const concatJSApp = () => {
	return gulp.src([
			'src/assets/js/app.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('.tmp/js/concated'))
}

const concatJS = gulp.parallel(
	concatJSApp
)

// ===============================================================
// JS PROCESSING
// ===============================================================
const processJS = () => {
	const stream = gulp.src('.tmp/js/concated/**/*.js')

	if ( ENV == 'dist' ) {
		return stream
			.pipe(terser())
			.pipe(rev())
			.pipe(gulp.dest(`${DEST}/assets/js`))
			.pipe(rev.manifest(`${revManifestsBase}/js.json`, {
				base: revManifestsBase
			}))
			.pipe(gulp.dest(revManifestsBase))
	} else {
		return stream
			.pipe(gulp.dest(`${DEST}/assets/js`))
			.pipe(connect.reload())
	}
}

// ===============================================================
// MAIN JS TASK
// ===============================================================
const js = gulp.series(concatJS, processJS)

// ===============================================================
// IMAGE PROCESSING
// ===============================================================
const svgoOptions = {
	plugins: [{
		name: 'preset-default',
		params: {
			overrides: {
				removeViewBox: false
			}
		}
	}]
}

const img = async () => {
	await new Promise((resolve, reject) => {
		gulp.src([
				'src/assets/img/**/*.svg',
				'!src/assets/img/icons/**/*.svg'
			])
			.pipe(gulpIf(ENV == 'dist', imagemin([svgo(svgoOptions)])))
			.pipe(gulp.dest(`${DEST}/assets/img`))
			.pipe(connect.reload())
			.on('end', resolve)
	})
	await new Promise((resolve, reject) => {
		gulp.src(['src/assets/img/**/*.{webp,jpg,png}'])
			.pipe(imagemin([webp()]))
			.pipe(rename(p => { p.extname = '.webp' }))
			.pipe(gulp.dest(`${DEST}/assets/img`))
			.pipe(connect.reload())
			.on('end', resolve)
	})
}

const icons = () => {
	return gulp.src('src/assets/img/icons/**/*.svg')
		.pipe(gulpIf(ENV == 'dist', imagemin([
				svgo({
					plugins: [{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false
							}
						}
					}, {
						name: 'addAttributesToSVGElement',
						params: {
							attributes: [{
								'aria-hidden': 'true'
							}, {
								'focusable': 'false'
							}]
						}
					}]
				})
			])))
		.pipe(gulp.dest(`${DEST}/assets/img/icons`))
		.pipe(connect.reload())
}

const favicon = () => {
	return gulp.src('src/*.{png,svg}')
		.pipe(gulpIf(ENV == 'dist', imagemin([
			svgo(svgoOptions),
			optipng()
		])))
		.pipe(gulp.dest(DEST))
}

// ===============================================================
// COPY FILES
// ===============================================================
const copy = () => {
	return gulp.src([
			'src/site.webmanifest',
			'src/robots.txt',
			'src/*.ico',
			'src/assets/font/**/*.{woff,woff2}',
			'!src/assets/font/original/**/*'
		], {
			base: 'src'
		})
		.pipe(gulp.dest(DEST))
		.pipe(connect.reload())
}

// ===============================================================
// HTML PROCESSING
// ===============================================================
const html = () => {
	return gulp.src('src/templates/pages/**/*.twig')
		.pipe(twig({
			data: {
				icons: () => {
					let result = {}
					const dir = path.resolve(`${DEST}/assets/img/icons`)
					for (const file of fs.readdirSync(dir).filter(file => file.endsWith('.svg'))) {
						result[path.parse(file).name.replace('-', '_')] = fs.readFileSync(dir+'/'+file)
					}
					return result
				}
			},
			errorLogToConsole: true,
			extname: '.html'
		}))
		.pipe(gulpIf(ENV == 'dist', revReplace({
			canonicalUris: false,
			replaceInExtensions: ['.html'],
			manifest: gulp.src(`${revManifestsBase}/*.json`)
		})))
		.pipe(gulpIf(ENV == 'dist', htmlmin({
			collapseBooleanAttributes: true,
			collapseInlineTagWhitespace: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
			decodeEntities: true,
			minifyCSS: true,
			minifyJS: true,
			processConditionalComments: true,
			quoteCharacter: '"',
			removeAttributeQuotes: true,
			removeComments: true,
			removeOptionalTags: true,
			removeRedundantAttributes: false,
			removeScriptTypeAttributes: true,
			useShortDoctype: true
		})))
		.pipe(gulp.dest(DEST))
		.pipe(connect.reload())
}

// ===============================================================
// SERVER
// ===============================================================
// Run a local server at http://localhost:8000.
const runServer = () => new Promise((resolve, reject) => {
	connect.server({
		root: DEST,
		host: '0.0.0.0',
		port: 8000,
		livereload: true
	})
	resolve()
})

// ===============================================================
// BUILD
// ===============================================================
const build = gulp.series(
	clean,
	gulp.parallel(
		// process HTML after CSS & JS are revisioned and icons are preprocessed
		gulp.series(
			gulp.parallel(css, js, icons),
			html
		),
		img,
		favicon,
		copy
	)
)

// ===============================================================
// SERVE
// ===============================================================
const serve = gulp.series(build, runServer)

// ===============================================================
// DEVELOPMENT TASKS
// ===============================================================
const watchFiles = () => new Promise((resolve, reject) => {
	gulp.watch('src/assets/scss/**/*.scss', css)
	gulp.watch('src/assets/js/**/*.js', js)
	gulp.watch(['src/assets/img/**/*.{jpg,webp,png,svg}', '!src/assets/img/icons/**/*.svg'], img)
	gulp.watch('src/assets/img/icons/**/*.svg', gulp.parallel(icons, html))
	gulp.watch(['src/assets/font/**/*.{woff,woff2}', '!src/assets/font/original/**/*'], copy)
	gulp.watch('src/templates/**/*.twig', html)
	resolve()
})

const defaultTasks = gulp.series(
	setEnvDev,
	setDestDev,
	clean,
	gulp.parallel(css, js, img, icons, favicon, copy),
	// process HTML after icons are preprocessed
	html,
	runServer,
	watchFiles
)

// ===============================================================
// EXPORT TASKS FOR CLI
// ===============================================================
export {
	build,
	serve,
	defaultTasks as default
}

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
const del = require('del');
const sass = require('gulp-sass')(require('sass'));

// ===============================================================
// PLUGIN SETTINGS SHARED ACCROSS MULTIPLE TASKS
// ===============================================================
const revManifestsBase = '.tmp/rev-manifests';

// ===============================================================
// ENVIROMENT VARIABLES
// ===============================================================
let ENV = 'dist';
let DEST = 'dist';

const setEnvDev = () => new Promise((resolve, reject) => {
							ENV = 'dev';
							resolve();
						});

const setDestDev = () => new Promise((resolve, reject) => {
							DEST = 'dev';
							resolve();
						});

// ===============================================================
// CLEAN
// ===============================================================
// Empty directories to start fresh.
const clean = () => del(['.tmp', 'dev', 'dist']);

// ===============================================================
// SCSS -> CSS
// ===============================================================
const scss = () => gulp.src('src/assets/scss/*.scss')
					.pipe($.plumber())
					.pipe(sass({
						includePaths: ['src/assets/scss'],
						precision: 6
					}).on('error', sass.logError))
					.pipe(gulp.dest('.tmp/css/compiled'));

// ===============================================================
// CONCAT CSS
// ===============================================================
// Source should be compiled CSS (.tmp/css/copmiled), resp. vendor CSS.
const concatCSS = () => gulp.src([
							'node_modules/normalize.css/normalize.css',
							'.tmp/css/compiled/main.css'
						])
						.pipe($.concat('main.css'))
						.pipe(gulp.dest('.tmp/css/concated'));

// ===============================================================
// CSS PROCESSING
// ===============================================================
const processCSS = () => {
	const stream = gulp.src('.tmp/css/concated/**/*.css')
					.pipe($.autoprefixer());

	if ( ENV == 'dist' ) {
		return stream
			.pipe($.cleanCss())
			.pipe($.rev())
			.pipe(gulp.dest(DEST + '/assets/css'))
			.pipe($.rev.manifest(revManifestsBase + '/css.json', {
				base: revManifestsBase
			}))
			.pipe(gulp.dest(revManifestsBase));
	}
	else {
		return stream
			.pipe(gulp.dest(DEST + '/assets/css'))
			.pipe($.connect.reload());
	}
};

// ===============================================================
// MAIN CSS TASK
// ===============================================================
const css = gulp.series(scss, concatCSS, processCSS);

// ===============================================================
// CONCAT JS
// ===============================================================
const concatJSMain = () => gulp.src([
								'src/assets/js/plugins.js',
								'src/assets/js/main.js'
							])
							.pipe($.concat('main.js'))
							.pipe(gulp.dest('.tmp/js/concated'));

const concatJS = gulp.parallel(
	concatJSMain
);

// ===============================================================
// JS PROCESSING
// ===============================================================
const processJS = () => {
	const stream = gulp.src('.tmp/js/concated/**/*.js');

	if ( ENV == 'dist' ) {
		return stream
			.pipe($.babel({
				presets: ['@babel/preset-env']
			}))
			.pipe($.uglify())
			.pipe($.rev())
			.pipe(gulp.dest(DEST + '/assets/js'))
			.pipe($.rev.manifest(revManifestsBase + '/js.json', {
				base: revManifestsBase
			}))
			.pipe(gulp.dest(revManifestsBase));
	}
	else {
		return stream
			.pipe(gulp.dest(DEST + '/assets/js'))
			.pipe($.connect.reload());
	}
};

// ===============================================================
// MAIN JS TASK
// ===============================================================
const js = gulp.series(concatJS, processJS);

// ===============================================================
// IMAGE PROCESSING
// ===============================================================
const img = () => gulp.src('src/assets/img/**/*.{gif,jpg,png,svg}')
					.pipe($.if(ENV == 'dist', $.imagemin()))
					.pipe(gulp.dest(DEST + '/assets/img'))
					.pipe($.connect.reload());

const favicon = () => {
	return gulp.src('src/*.{png,svg}')
		.pipe($.if(ENV == 'dist', $.imagemin()))
		.pipe(gulp.dest(DEST));
}

// ===============================================================
// COPY FILES
// ===============================================================
const copyMisc = () => gulp.src([
							'src/site.webmanifest',
							'src/robots.txt',
							'src/*.ico',
							'src/assets/font/**/*.{woff,woff2}',
							'!src/assets/font/original/**/*'
						], {
							base: 'src'
						})
						.pipe(gulp.dest(DEST))
						.pipe($.connect.reload());

const copyModules = () => gulp.src([
								'node_modules/apache-server-configs/dist/.htaccess'
							])
							.pipe(gulp.dest(DEST));

const copy = gulp.parallel(
	copyMisc,
	copyModules
);

// ===============================================================
// HTML PROCESSING
// ===============================================================
const html = () => {
	return gulp.src('src/templates/pages/**/*.twig')
		.pipe($.twig({
			data: {},
			errorLogToConsole: true,
			extname: '.html'
		}))
		.pipe($.if(ENV == 'dist', $.revReplace({
			canonicalUris: false,
			replaceInExtensions: ['.html'],
			manifest: gulp.src(revManifestsBase + '/*.json')
		})))
		.pipe($.if(ENV == 'dist', $.htmlmin({
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
		.pipe($.connect.reload());
};

// ===============================================================
// SERVER
// ===============================================================
// Run a local server at http://localhost:8000.
const connect = () => new Promise((resolve, reject) => {
	$.connect.server({
		root: DEST,
		port: 8000,
		livereload: true
	});
	resolve();
});

// ===============================================================
// BUILD
// ===============================================================
const build = gulp.series(
	clean,
	gulp.parallel(
		// process HTML after CSS & JS are revisioned
		gulp.series(
			gulp.parallel(css, js),
			html
		),
		img,
		favicon,
		copy
	)
);

// ===============================================================
// SERVE
// ===============================================================
const serve = gulp.series(build, connect);

// ===============================================================
// DEVELOPMENT TASKS
// ===============================================================
const watchFiles = () => new Promise((resolve, reject) => {
	gulp.watch('src/assets/scss/**/*.scss', css);
	gulp.watch('src/assets/js/**/*.js', js);
	gulp.watch(['src/assets/img/**/*.{gif,jpg,png,svg}'], img);
	gulp.watch(['src/assets/font/**/*.{woff,woff2}', '!src/assets/font/original/**/*'], copy);
	gulp.watch('src/templates/**/*.twig', html);
	resolve();
});

const defaultTasks = gulp.series(
	setEnvDev,
	setDestDev,
	clean,
	gulp.parallel(css, js, img, favicon, copy, html),
	connect,
	watchFiles
);

// ===============================================================
// EXPORT TASKS FOR CLI
// ===============================================================
module.exports = {
	build: build,
	connect: connect,
	serve: serve,
	default: defaultTasks
};

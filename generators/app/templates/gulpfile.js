import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import cleanCss from 'gulp-clean-css';
import concat from 'gulp-concat';
import connect from 'gulp-connect';
import del from 'del';
import htmlmin from 'gulp-htmlmin';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import twig from 'gulp-twig';
import uglify from 'gulp-uglify';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
const sass = gulpSass(dartSass);

// ===============================================================
// PLUGIN SETTINGS SHARED ACCROSS MULTIPLE TASKS
// ===============================================================
const revManifestsBase = '.tmp/rev-manifests';

// ===============================================================
// ENVIROMENT VARIABLES
// ===============================================================
let ENV = 'dist';
let DEST = 'dist';

const setEnvDev = () => {
	return new Promise((resolve, reject) => {
		ENV = 'dev';
		resolve();
	});
};

const setDestDev = () => {
	return new Promise((resolve, reject) => {
		DEST = 'dev';
		resolve();
	});
};

// ===============================================================
// CLEAN
// ===============================================================
// Empty directories to start fresh.
const clean = () => del(['.tmp', 'dev', 'dist']);

// ===============================================================
// SCSS -> CSS
// ===============================================================
const scss = () => {
	return gulp.src('src/assets/scss/*.scss')
		.pipe(plumber())
		.pipe(sass({
			includePaths: ['src/assets/scss'],
			precision: 6
		}).on('error', sass.logError))
		.pipe(gulp.dest('.tmp/css/compiled'));
};

// ===============================================================
// CONCAT CSS
// ===============================================================
// Source should be compiled CSS (.tmp/css/copmiled), resp. vendor CSS.
const concatCSS = () => {
	return gulp.src([
			'node_modules/normalize.css/normalize.css',
			'.tmp/css/compiled/main.css'
		])
		.pipe(concat('main.css'))
		.pipe(gulp.dest('.tmp/css/concated'));
};

// ===============================================================
// CSS PROCESSING
// ===============================================================
const processCSS = () => {
	const stream = gulp.src('.tmp/css/concated/**/*.css')
					.pipe(autoprefixer());

	if ( ENV == 'dist' ) {
		return stream
			.pipe(cleanCss())
			.pipe(rev())
			.pipe(gulp.dest(DEST + '/assets/css'))
			.pipe(rev.manifest(revManifestsBase + '/css.json', {
				base: revManifestsBase
			}))
			.pipe(gulp.dest(revManifestsBase));
	} else {
		return stream
			.pipe(gulp.dest(DEST + '/assets/css'))
			.pipe(connect.reload());
	}
};

// ===============================================================
// MAIN CSS TASK
// ===============================================================
const css = gulp.series(scss, concatCSS, processCSS);

// ===============================================================
// CONCAT JS
// ===============================================================
const concatJSMain = () => {
	return gulp.src([
			'src/assets/js/plugins.js',
			'src/assets/js/main.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('.tmp/js/concated'));
};

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
			.pipe(babel({
				presets: ['@babel/preset-env']
			}))
			.pipe(uglify())
			.pipe(rev())
			.pipe(gulp.dest(DEST + '/assets/js'))
			.pipe(rev.manifest(revManifestsBase + '/js.json', {
				base: revManifestsBase
			}))
			.pipe(gulp.dest(revManifestsBase));
	} else {
		return stream
			.pipe(gulp.dest(DEST + '/assets/js'))
			.pipe(connect.reload());
	}
};

// ===============================================================
// MAIN JS TASK
// ===============================================================
const js = gulp.series(concatJS, processJS);

// ===============================================================
// IMAGE PROCESSING
// ===============================================================
const img = () => {
	return gulp.src('src/assets/img/**/*.{gif,jpg,png,svg}')
		.pipe(gulpIf(ENV == 'dist', imagemin()))
		.pipe(gulp.dest(DEST + '/assets/img'))
		.pipe(connect.reload());
};

const favicon = () => {
	return gulp.src('src/*.{png,svg}')
		.pipe(gulpIf(ENV == 'dist', imagemin()))
		.pipe(gulp.dest(DEST));
}

// ===============================================================
// COPY FILES
// ===============================================================
const copyMisc = () => {
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
		.pipe(connect.reload());
};

const copyModules = () => {
	return gulp.src([
			'node_modules/apache-server-configs/dist/.htaccess'
		])
		.pipe(gulp.dest(DEST));
};

const copy = gulp.parallel(
	copyMisc,
	copyModules
);

// ===============================================================
// HTML PROCESSING
// ===============================================================
const html = () => {
	return gulp.src('src/templates/pages/**/*.twig')
		.pipe(twig({
			data: {},
			errorLogToConsole: true,
			extname: '.html'
		}))
		.pipe(gulpIf(ENV == 'dist', revReplace({
			canonicalUris: false,
			replaceInExtensions: ['.html'],
			manifest: gulp.src(revManifestsBase + '/*.json')
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
		.pipe(connect.reload());
};

// ===============================================================
// SERVER
// ===============================================================
// Run a local server at http://localhost:8000.
const runServer = () => new Promise((resolve, reject) => {
	connect.server({
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
const serve = gulp.series(build, runServer);

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
	runServer,
	watchFiles
);

// ===============================================================
// EXPORT TASKS FOR CLI
// ===============================================================
export {
	build,
	runServer as connect,
	serve,
	defaultTasks as default
};

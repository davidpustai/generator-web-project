var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	runSequence = require('run-sequence'),
	del = require('del'),
	$ = gulpLoadPlugins();

// ===============================================================
// PLUGIN SETTINGS SHARED ACCROSS MULTIPLE TASKS
// ===============================================================
var revManifest = {
		file: 'rev-manifest.json',
		base: '.tmp'
	};

// ===============================================================
// ENVIROMENT VARIABLES
// ===============================================================
var ENV = 'dist',
	DEST = 'dist';

// ===============================================================
// CLEAN
// ===============================================================
// Empty directories to start fresh.
gulp.task('clean', function() {
	return del(['.tmp', 'dev', 'dist']);
});

// ===============================================================
// SCSS -> CSS
// ===============================================================
gulp.task('sass', function() {
	return gulp.src('assets/scss/*.scss')
		.pipe($.sass({
			includePaths: ['assets/scss', 'bower_components'],
			precision: 6
		}).on('error', $.sass.logError))
		.pipe(gulp.dest('.tmp/css/compiled'));
});

// ===============================================================
// CONCAT CSS
// ===============================================================
// Source should be compiled CSS (.tmp/css/copmiled), resp. vendor CSS (bower_components resp. assets/vendor/css).
gulp.task('concat:css', ['sass'], function() {
	return gulp.src([
			'bower_components/normalize.css/normalize.css',
			'.tmp/css/compiled/main.css'
		])
		.pipe($.concat('main.css'))
		.pipe(gulp.dest('.tmp/css/concated'));
});

// ===============================================================
// CSS PROCESSING
// ===============================================================
gulp.task('css', ['concat:css'], function() {
	var stream = gulp.src('.tmp/css/concated/**/*.css')
		.pipe($.autoprefixer({
			browsers: ['last 2 version', 'ie >= 8', 'Android 3'] // add Android 3 for Android 4.3- gradients
		}));

	if ( ENV == 'dist' ) {
		return stream
			.pipe($.combineMq())
			.pipe($.cleanCss())
			.pipe($.rev())
			.pipe(gulp.dest(DEST + '/assets/css'))
			.pipe($.rev.manifest(revManifest.base + '/' + revManifest.file, {
				base: revManifest.base,
				merge: true
			}))
			.pipe(gulp.dest('.tmp'));
	}
	else {
		return stream
			.pipe(gulp.dest(DEST + '/assets/css'))
			.pipe($.connect.reload());
	}
});

// ===============================================================
// CONCAT JS
// ===============================================================
gulp.task('concat:js', [
	'concat:js:modernizr',
	'concat:js:ie8Head',
	'concat:js:main',
	'concat:js:ie8Body'
]);

gulp.task('concat:js:modernizr', function() {
	return gulp.src([
			'assets/js/vendor/modernizr.js'
		])
		.pipe($.concat('modernizr.js'))
		.pipe(gulp.dest('.tmp/js/concated/vendor'));
});

gulp.task('concat:js:ie8Head', function() {
	return gulp.src([
			'assets/js/vendor/selectivizr-1.0.3b.js',
			'bower_components/respond/dest/respond.min.js'
		])
		.pipe($.concat('ie8-head.js'))
		.pipe(gulp.dest('.tmp/js/concated'));
});

gulp.task('concat:js:main', function() {
	return gulp.src([
			'assets/js/plugins.js',
			'bower_components/loadcss/src/loadCSS.js',
			'bower_components/loadcss/src/cssrelpreload.js',
			'bower_components/fastclick/lib/fastclick.js',
			'assets/js/main.js'
		])
		.pipe($.concat('main.js'))
		.pipe(gulp.dest('.tmp/js/concated'));
});

gulp.task('concat:js:ie8Body', function() {
	return gulp.src([
			'bower_components/REM-unit-polyfill/js/rem.min.js'
		])
		.pipe($.concat('ie8-body.js'))
		.pipe(gulp.dest('.tmp/js/concated'));
});

// ===============================================================
// JS PROCESSING
// ===============================================================
gulp.task('js', ['concat:js'], function() {
	var stream = gulp.src('.tmp/js/concated/**/*.js');

	if ( ENV == 'dist' ) {
		return stream
			.pipe($.uglify({
				ie8: true
			}))
			.pipe($.rev())
			.pipe(gulp.dest(DEST + '/assets/js'))
			.pipe($.rev.manifest(revManifest.base + '/' + revManifest.file, {
				base: revManifest.base,
				merge: true
			}))
			.pipe(gulp.dest('.tmp'));
	}
	else {
		return stream
			.pipe(gulp.dest(DEST + '/assets/js'))
			.pipe($.connect.reload());
	}
});

// ===============================================================
// IMAGE PROCESSING
// ===============================================================
gulp.task('img', function() {
	return gulp.src([
			'assets/img/**/*.{gif,jpg,png,svg}',
			'!assets/img/favicons/**/*'
		])
		.pipe($.if(ENV == 'dist', $.imagemin()))
		.pipe(gulp.dest(DEST + '/assets/img'))
		.pipe($.connect.reload());
});

// ===============================================================
// COPY FILES
// ===============================================================
gulp.task('copy', [
	'copy:misc',
	'copy:icons'
]);

gulp.task('copy:misc', function() {
	return gulp.src([
			'.htaccess',
			'robots.txt',
			'browserconfig.xml',
			'assets/font/**/*.{woff,woff2}',
			'!assets/font/original/**/*',
			'assets/js/vendor/jquery-1.8.0.js',
			'assets/js/vendor/jquery-3.1.1.js'
		], {
			base: '.'
		})
		.pipe(gulp.dest(DEST))
		.pipe($.connect.reload());
});

gulp.task('copy:icons', function() {
	return gulp.src([
			'assets/img/favicons/**/*.{ico,png,svg}'
		])
		.pipe(gulp.dest(DEST))
		.pipe($.connect.reload());
});

// ===============================================================
// HTML PROCESSING
// ===============================================================
// Run after CSS & JS are revisioned.
gulp.task('html', ['css', 'js'], function() {
	var manifest = gulp.src(revManifest.base + '/' + revManifest.file);

	return gulp.src('templates/pages/**/*.html')
		.pipe($.mustache({}, {
			extension: '.html'
		}))
		.pipe($.if(ENV == 'dist', $.revReplace({
			canonicalUris: false,
			replaceInExtensions: ['.html'],
			manifest: manifest
		})))
		.pipe($.if(ENV == 'dist', $.htmlmin({
			processConditionalComments: true,
			removeComments: true,
			removeCommentsFromCDATA: true,
			removeCDATASectionsFromCDATA: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
			collapseInlineTagWhitespace: true,
			collapseBooleanAttributes: true,
			removeTagWhitespace: true,
			removeAttributeQuotes: true,
			removeRedundantAttributes: true,
			useShortDoctype: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeOptionalTags: true,
			decodeEntities: true,
			minifyJS: true,
			minifyCSS: true,
			quoteCharacter: '"'
		})))
		.pipe(gulp.dest(DEST))
		.pipe($.connect.reload());
});

// ===============================================================
// SERVER
// ===============================================================
// Run a local server at http://localhost:8000.
gulp.task('connect', function() {
	$.connect.server({
		root: DEST,
		port: 8000,
		livereload: true
	});
});

// ===============================================================
// BUILD
// ===============================================================
gulp.task('build', function() {
	// Wait for clean to finish before running anything else.
	runSequence('clean', ['css', 'js', 'img', 'copy', 'html']);
});

// ===============================================================
// SERVE
// ===============================================================
gulp.task('serve', ['build', 'connect']);

// ===============================================================
// DEVELOP
// ===============================================================
gulp.task('default', function() {
	ENV = 'dev';
	DEST = 'dev';

	// Wait for clean to finish before running anything else.
	runSequence('clean', ['css', 'js', 'img', 'copy', 'html'], 'connect');

	gulp.watch('assets/scss/**/*.scss', ['css']);
	gulp.watch('assets/js/**/*.js', ['js']);
	gulp.watch(['assets/img/**/*.{gif,jpg,png,svg}', '!assets/img/favicons/**/*'], ['img']);
	gulp.watch(['assets/font/**/*.{woff,woff2}', '!assets/font/original/**/*'], ['copy']);
	gulp.watch(['templates/**/*.html'], ['html']);
});

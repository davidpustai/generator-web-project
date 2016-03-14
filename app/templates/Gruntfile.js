// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {

	// Project configuration
	grunt.initConfig({
		// ===============================================================
		// WATCH
		// ===============================================================
		// Watches files for changes and runs tasks based on the changed files
		watch: {
			sass: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer:dev'],
				options: {
					spawn: false,
					interrupt: true
				}
			},
			copy: {
				files: [
					'bower_components/**/*',
					'assets/img/**/*.{gif,jpeg,jpg,png,svg}',
					'assets/js/**/*.js'
				],
				tasks: 'newer:copy:dev'
			},
			processhtml: {
				files: ['templates/**/*.html'],
				tasks: 'processhtml:dev'
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'templates/**/*.html',
					'assets/scss/**/*.scss',
					//'assets/css/*.css',
					'assets/img/**/*.{gif,jpeg,jpg,png,svg}',
					'assets/js/**/*.js'
				]
			}
		},

		// ===============================================================
		// SERVER
		// ===============================================================
		// The actual grunt server settings
		connect: {
			options: {
				port: 8000,
				livereload: 35729,
				hostname: '0.0.0.0',
				//open: true
			},
			dev: {
				options: {
					base: 'dev'
				}
			},
			dist: {
				options: {
					base: 'dist',
					livereload: false,
					keepalive: true
				}
			}
		},

		// ===============================================================
		// CLEAN
		// ===============================================================
		// Empties folders to start fresh
		clean: {
			all: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'dev',
						'dist'
					]
				}]
			}
		},

		// ===============================================================
		// CSS
		// ===============================================================
		// Compiles Sass to CSS
		sass: {
			options: {
				includePaths: [
					'assets/scss',
					'bower_components'
				],
				sourceMap: true
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/scss',
					src: '*.scss',
					dest: '.tmp',
					ext: '.css'
				}]
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie >= 8', 'Android 3'] // add Android 3 for Android 4.3- gradients
			},
			dev: {
				files: [{
					expand: true,
					cwd: '.tmp',
					src: '**/*.css',
					dest: 'dev/assets/css'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp',
					src: '**/*.css',
					dest: '.tmp/prefixed'
				}]
			}
		},

		cssmin: {
			options: {
				sourceMap: true
			}
		},

		// Combine media queris
		combine_mq: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/prefixed',
					src: '**/*.css',
					// this weird path is for usemin, which grabs the path from html link src atribute
					dest: '.tmp/cmq/assets/css'
				}]
			}
		},

		// ===============================================================
		// JS
		// ===============================================================
		uglify: {
			options: {
				squeeze: {dead_code: false},
				codegen: {quote_keys: true}
			}
		},

		// ===============================================================
		// USEMIN - CSS + JS + HTML rewrites
		// ===============================================================
		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: 'dist',
				root: [
						'.tmp/cmq',	// for css
						'.'			// for other assets
					]
			},
			html: 'dist/index.html'
		},
		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			/*options: {
				assetsDirs: ['assets']
			},*/
			html: ['dist/*.html']
		},
		// Create source maps when concatenating
		concat: {
			options: {
				sourceMap: true
			}
		},

		// ===============================================================
		// IMAGES
		// ===============================================================
		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/img',
					src: [
						'**/*.{gif,jpeg,jpg,png}',
						// don't copy the original sprite files
						'!sprites/**/*.png'
					],
					dest: 'dist/assets/img'
				}, {
					// copy final sprites
					expand: true,
					cwd: '.tmp/sprites',
					src: [ '**/*.png' ],
					dest: 'dist/assets/img/sprites'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/img',
					src: '**/*.svg',
					dest: 'dist/assets/img'
				}]
			}
		},

		// ===============================================================
		// HTML
		// ===============================================================
		// Processes HTML templates in /templates (not in subdirectories!)
		processhtml: {
			options: {
				commentMarker: 'process', // to prevent colision with grunt-usemin
				includeBase: 'templates',
				recursive: true
			},
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'templates',
					dest: 'dist',
					src: ['*.html']
				}]
			},
			dev: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'templates',
					dest: 'dev',
					src: ['*.html']
				}]
			}
		},
		// Minifies HTML
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeCDATASectionsFromCDATA: true,
					collapseWhitespace: true,
					collapseInlineTagWhitespace: true,
					collapseBooleanAttributes: true,
					removeTagWhitespace: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeScriptTypeAttributes: true,
					removeOptionalTags: true,
					lint: true,
					minifyJS: true,
					minifyCSS: true,
					quoteCharacter: '"'
				},
				files: [{
					expand: true,
					cwd: 'dist',
					src: '*.html',
					dest: 'dist'
				}]
			}
		},

		// ===============================================================
		// FONTS, CONFIGS, ICONS, ETC.
		// ===============================================================
		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '.',
					dest: 'dist',
					src: [
						'*.{ico,png,txt,xml}',
						'.htaccess',
						'assets/font/**/*.{svg,ttf,eot,woff}',
						'assets/js/vendor/jquery-1.8.0.js',
						'assets/js/vendor/jquery-2.2.0.js'
					]
				}]
			},
			dev: {
				files: [{
					expand: true,
					dot: true,
					cwd: '.',
					dest: 'dev',
					src: [
						'*.{ico,png,txt,xml}',
						'assets/font/**/*.{svg,ttf,eot,woff}',
						// no need to minify assets every time (in development), just copy them at the begining
						// bower
							'bower_components/**/*',
						// images
							'assets/img/**/*.{gif,jpeg,jpg,png}',
							// don't copy the original sprite files
							'!assets/img/sprites/**/*.png',
							'assets/img/**/*.svg',
						// scripts
							'assets/js/**/*.js'
					]
				}]
			}
		},

	// ===============================================================
	// TASKS
	// ===============================================================

		// Run some tasks in parallel to speed up build process
		concurrent: {
			dist: [
				'sass',
				'imagemin:dist',
				'svgmin:dist',
				'copy:dist',
				'processhtml:dist'
			],
			dev: [
				'sass',
				'copy:dev',
				'processhtml:dev'
			]
		}
	});

	// Load grunt tasks automaticly
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean:all',
		'concurrent:dev',
		'autoprefixer:dev',
		'connect:dev',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:all',
		'concurrent:dist',
		'autoprefixer:dist',
		'combine_mq',
		'useminPrepare', // must be after css is processed, so it can look up the path of final files
		'concat',
		'cssmin',
		'uglify',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('serve', [
		'build',
		'connect:dist'
	]);
};

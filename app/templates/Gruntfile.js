'use strict';

module.exports = function (grunt) {

	// Project configuration
	grunt.initConfig({
		// ===============================================================
		// WATCH
		// ===============================================================
		// Watches files for changes and runs tasks based on the changed files
		watch: {
			// concat, copy:dev (no need to further process)
			sass: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['sass', 'concat:css', 'autoprefixer:dev'],
				options: {
					spawn: false,
					interrupt: true
				}
			},
			js: {
				files: ['assets/js/**/*.js'],
				tasks: ['concat:js', 'newer:copy:dev']
			},
			copy: {
				files: [
					// copy
						'bower_components/**/*',
						'assets/font/**/*.{svg,ttf,eot,woff}',
					// images
						'assets/img/**/*.{gif,jpeg,jpg,png,svg}'
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
		// SCSS -> CSS
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
					dest: '.tmp/css',
					ext: '.css'
				}]
			}
		},

		// ===============================================================
		// CONCAT - JS & CSS
		// ===============================================================
		concat: {
			options: {
				sourceMap: true
			},
			// Here goes all new files
			// JS: { assets/js (resp. bower_components) -> .tmp/concat/js }
			js: {
				files: [
					{
						dest: '.tmp/concat/js/vendor/modernizr.js',
						src: [
							'assets/js/vendor/modernizr.js'
						]
					}, {
						dest: '.tmp/concat/js/ie8-head.js',
						src: [
							'assets/js/vendor/selectivizr-1.0.3b.js',
							'bower_components/respond/dest/respond.min.js'
						]
					},	{
						dest: '.tmp/concat/js/main.js',
						src: [
							'assets/js/plugins.js',
							'bower_components/loadcss/src/loadCSS.js',
							'bower_components/loadcss/src/cssrelpreload.js',
							'bower_components/fastclick/lib/fastclick.js',

							'assets/js/main.js'
						]
					}, {
						dest: '.tmp/concat/js/ie8-body.js',
						src: [
							'bower_components/REM-unit-polyfill/js/rem.min.js'
						]
					}
				]
			},
			// CSS: { .tmp/css (see the note below) -> .tmp/concat/css }
			// source should be only from SCSS compiled file (.tmp/css), resp. vendor CSS (bower_components resp. assets/vendor/css)
			css: {
				files: [
					{
						dest: '.tmp/concat/css/main.css',
						src: [
							'bower_components/normalize.css/normalize.css',
							'.tmp/css/main.css'
						]
					}
				]
			}
		},

		// ===============================================================
		// Further CSS processing
		// ===============================================================
		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie >= 8', 'Android 3'] // add Android 3 for Android 4.3- gradients
			},
			dev: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/css',
					src: '**/*.css',
					dest: 'dev/assets/css' // skiping further processing (cmq, cssmin)
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/css',
					src: '**/*.css',
					dest: '.tmp/prefixed'
				}]
			}
		},

		// Combine media queris
		combine_mq: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/prefixed',
					src: '**/*.css',
					dest: '.tmp/cmq'
				}]
			}
		},

		// Minify final CSS
		cssmin: {
			options: {
				sourceMap: true
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/cmq',
					src: '**/*.css',
					dest: 'dist/assets/css'
				}]
			}
		},

		// ===============================================================
		// JS
		// ===============================================================
		uglify: {
			options: {
				squeeze: {dead_code: false},
				codegen: {quote_keys: true},
				sourceMap: true,
				sourceMapIn: function(src) {
					return src + '.map';
				}
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/js',
					src: '**/*.js',
					dest: 'dist/assets/js'
				}]
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
						'**/*.{gif,jpeg,jpg,png}'
					],
					dest: 'dist/assets/img'
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
				commentMarker: 'process',
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
					processConditionalComments: true,
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
					decodeEntities: true,
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
						'assets/js/vendor/jquery-3.0.0.js'
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
							'assets/img/**/*.{gif,jpeg,jpg,png,svg}'
					]
				}, {
					expand: true,
					dot: true,
					cwd: '.tmp/concat/js',
					dest: 'dev/assets/js',
					src: [
						'**/*.{js,map}' // skiping uglify
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
				'autoprefixer:dist',
				'imagemin:dist',
				'svgmin:dist',
				'uglify:dist',
				'processhtml:dist',
				'copy:dist'
			],
			dev: [
				'autoprefixer:dev',
				'processhtml:dev',
				'copy:dev'
					// replaces
					// 		* imagemin
					// 		* svgmin
					// 		* uglify
				// skips
				//		* combine_mq
				//		* cssmin
				//		* htmlmin
			]
		}
	});

	// Load grunt tasks automaticly
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean:all',
		'sass',
		'concat',
		'concurrent:dev',
		'connect:dev',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:all',
		'sass',
		'concat',
		'concurrent:dist',
		'combine_mq',
		'cssmin',
		'htmlmin'
	]);

	grunt.registerTask('serve', [
		'build',
		'connect:dist'
	]);
};

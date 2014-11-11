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
			compass: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['compass', 'autoprefixer:dev'],
				options: {
					spawn: false,
					interrupt: true
				}
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'*.html',
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
					base: '.'
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
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'dist/*',
						'!dist/.git*'
					]
				}]
			},
			dev: '.tmp'
		},

		// ===============================================================
		// CSS
		// ===============================================================
		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			dist: {
				options: {
					sassDir: 'assets/scss',
					cssDir: '.tmp',
					noLineComments: true
				}
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
					dest: 'assets/css'
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

		// Combine media queris
		cmq: {
			dist: {
				files: {
					'assets/css': ['.tmp/prefixed/**/*.css']
				}
			}
		},

		// ===============================================================
		// JS
		// ===============================================================
		uglify: {
			options: {
				squeeze: {dead_code: false},
				codegen: {quote_keys: true}
			},
			jquery: {
				src: 'assets/js/jquery-2.1.0.js',
				dest: 'dist/assets/js/jquery-2.1.0.js'
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
				dest: 'dist'
			},
			html: 'index.html'
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			/*options: {
				assetsDirs: ['assets']
			},*/
			html: ['dist/*.html']
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
						// don't copy the original sprite files, only the sprites themself
						'!sprites/**/*.png',
						'sprites/*.png'
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
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeCDATASectionsFromCDATA: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					minifyJS: true,
					minifyCSS: true
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
		// FONTS, HTML, ETC
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
						'*.html',
						'assets/font/**/*.{svg,ttf,eot,woff}',
						'assets/js/jquery-1.8.0.js'
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
				'compass',
				'imagemin',
				'svgmin',
				'copy:dist'
			]
		}
	});

	// Load grunt tasks automaticly
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean:dev',
		'compass',
		'autoprefixer:dev',
		'connect:dev',
		'watch'
	]);

	grunt.registerTask('serve', [
		'build',
		'connect:dist'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer:dist',
		'cmq',
		'concat',
		'cssmin',
		'uglify',
		'usemin',
		'htmlmin'
	]);
};

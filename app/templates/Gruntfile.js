// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Project configuration
	grunt.initConfig({

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			compass: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['compass', 'autoprefixer'],
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
					//'assets/scss/**/*.scss',
					'assets/css/*.css',
					'assets/img/**/*.{gif,jpeg,jpg,png,svg}',
					'assets/js/**/*.js'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 8000,
				livereload: 35729,
				hostname: '0.0.0.0',
				open: true
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
			server: '.tmp'
		},

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
				browsers: ['last 2 version', 'ie >= 8']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp',
					src: '**/*.css',
					dest: 'assets/css'
				}]
			}
		},

		/*uncss: {
			dist: {
				options: {
					//stylesheets: ['assets/css/main.css']
				},
				files: {
					'css/tidy.css': ['*.html']
				}
			}
		},*/

		uglify: {
			options: {
				mangle: {toplevel: true},
				squeeze: {dead_code: false},
				codegen: {quote_keys: true}
			},
			jquery: {
				src: 'bower_components/jquery/dist/jquery.min.js',
				dest: 'dist/assets/js/jquery.js'
			}
		},

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

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/img',
					src: '**/*.{gif,jpeg,jpg,png}',
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
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: 'dist',
					src: '*.html',
					dest: 'dist'
				}]
			}
		},

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
						'assets/font/**/*.{svg,ttf,eot,woff}'
					]
				}]
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			dist: [
				'compass',
				'imagemin',
				'svgmin'
			]
		}
	});

	// Load grunt tasks automaticly
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean:server',
		'compass',
		'autoprefixer',
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
		'autoprefixer',
		//uncss,
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		'usemin',
		'htmlmin'
	]);
};

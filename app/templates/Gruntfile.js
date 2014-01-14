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
                files: ['sass/*.scss'],
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
                    'sass/*.scss',
                    //'css/*.css',
                    'img/*.{gif,jpeg,jpg,png,svg}',
                    'js/*.js'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 8000,
                livereload: 35729,
                hostname: 'localhost'
            },
            dev: {
                options: {
                    base: '.',
                    //open: true
                }
            },
            dist: {
                options: {
                    //open: true,
                    base: 'dist',
                    livereload: false
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
                    sassDir: 'sass',
                    cssDir: '.tmp',
                    noLineComments: true
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie >= 6']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp',
                    src: '*.css',
                    dest: 'css'
                }]
            }
        },

        uglify: {
            options: {
                mangle: {toplevel: true},
                squeeze: {dead_code: false},
                codegen: {quote_keys: true}
            }
        },

        // Automatically inject Bower components into the HTML file
        // 'bower-install': {
        //     app: {
        //         html: '/index.html',
        //         ignorePath: '/'
        //     }
        // },

        // Renames files for browser caching purposes
        // rev: {
        //     dist: {
        //         files: {
        //             src: [
        //                 '/scripts/{,*/}*.js',
        //                 '/styles/{,*/}*.css',
        //                 '/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
        //                 '/styles/fonts/{,*/}*.*'
        //             ]
        //         }
        //     }
        // },

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
                 assetsDirs: ['dist']
             },*/
             html: ['dist/*.html']/*,
             css: ['dist/css/*.css']*/
         },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: '*.{gif,jpeg,jpg,png}',
                    dest: 'dist/img'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: '*.svg',
                    dest: 'dist/img'
                }]
            }
        },
        // htmlmin: {
        //     dist: {
        //         options: {
        //             collapseBooleanAttributes: true,
        //             collapseWhitespace: true,
        //             removeAttributeQuotes: true,
        //             removeCommentsFromCDATA: true,
        //             removeEmptyAttributes: true,
        //             removeOptionalTags: true,
        //             removeRedundantAttributes: true,
        //             useShortDoctype: true
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: 'dist',
        //             src: '{,*/}*.html',
        //             dest: 'dist'
        //         }]
        //     }
        // },

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
                        'font/*.{svg,ttf,eot,woff}'
                    ]
                }]
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        // modernizr: {
        //     devFile: '/bower_components/modernizr/modernizr.js',
        //     outputFile: '/bower_components/modernizr/modernizr.js',
        //     files: [
        //         '/scripts/{,*/}*.js',
        //         '/styles/{,*/}*.css',
        //         '!/scripts/vendor/*'
        //     ],
        //     uglify: true
        // },

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
        'connect:dist:keepalive'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        //'modernizr',
        //'rev',
        'usemin',
        //'htmlmin'
    ]);
};

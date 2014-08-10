module.exports = function( grunt ) {

  // Project configuration.
  grunt.initConfig( {
    pkg: grunt.file.readJSON( 'package.json' ),

    clean: [ 'dist' ],

    // minify all js (except require.js) and save it to 'frontend/public/dist/main.min.js'
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "client/js/main.js",
          baseUrl: "client/js",
          name: "app",
          include: [ 'main' ],
          optimize: "uglify",
          out: 'dist/js/app.min.js'
        }
      }
    },

    uglify: {
      dist: {
        files: [ {
          expand: true,
          cwd: 'dist/js',
          src: '**/*.js',
          dest: 'dist/js'
        } ]
      }
    },

    cssmin: {
      combine: {
        files: {
          'dist/css/app.min.css': [ 'client/css/*.css' ]
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        flatten: true,
        src: [ 'client/fonts/**' ],
        dest: 'dist/fonts/',
        filter: 'isFile'
      },

      images: {
        expand: true,
        flatten: true,
        src: [ 'frontend/public/images/**' ],
        dest: 'frontend/public/dist/images/',
        filter: 'isFile'
      },

      html: {
        expand: true,
        flatten: true,
        src: [ 'client/index.html' ],
        dest: 'dist',
        filter: 'isFile'
      },

      requirejs: {
        expand: true,
        flatten: true,
        src: [ 'client/js/libs/require.js' ],
        dest: 'dist/js/',
        filter: 'isFile'
      }
    },

    strip: {
      main: {
        src: 'dist/js/app.min.js',
        dest: 'dist/js/app.min.js'
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    }

  } );

  // Optimize RequireJS projects using r.js
  grunt.loadNpmTasks( 'grunt-contrib-requirejs' );

  // Compress CSS files
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

  // Copy files and folders.
  grunt.loadNpmTasks( 'grunt-contrib-copy' );

  // Strip JavaScript nodes (like console.*) out of your source code
  grunt.loadNpmTasks( 'grunt-strip' );

  // Minify HTML
  grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );

  // Minify files with UglifyJS
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );

  // Clean files and folders
  grunt.loadNpmTasks( 'grunt-contrib-clean' );

  // Tasks
  grunt.registerTask( 'prod', [ 'clean', 'requirejs', 'copy', 'uglify', 'htmlmin', 'cssmin', 'strip' ] );

};
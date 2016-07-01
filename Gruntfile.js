'use strict'

module.exports = function (grunt) {
  require('time-grunt')(grunt)
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  })

  var env = grunt.option('target') || 'development'

  var config = {
    app: '_app',
    tmp: '.tmp',
    dist: '_site',
    subfolder: '/academy',
    aws: grunt.file.readJSON('grunt-aws.' + env + '.json')
  }

  grunt.initConfig({
    config: config,

    // put your credentials and save
    // grunt-aws.development.json to grunt-aws.staging.json and grunt-aws.production.json
    aws_s3: {
      options: {
        differential: true,
        displayChangesOnly: true,
        accessKeyId: '<%= config.aws.accessKeyId %>',
        secretAccessKey: '<%= config.aws.secretAccessKey %>',
        bucket: '<%= config.aws.bucket %>',
        uploadConcurrency: 5
      },
      clean: {
        options: {
          // Doesn't actually delete but shows log
          debug: true
        },
        files: [
          { dest: '/', action: 'delete' }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/',
          src: [
            '**/*.{html,xml}',
            '{d,t}/**/*',
            '*.{ico,png}'
          ],
          dest: '/'
        }]
      },
      assets: {
        options: {
          params: {
            'CacheControl': 'max-age=31536000, public',
            'Expires': new Date(Date.now() + 31536000 * 1000)
          },
          gzipRename: 'ext'
        },
        gzip: true,
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/',
          src: [
            'css/{,*/}*.gz',
            'js/{,*/}*.gz',
            'img/**/*.{gif,jpeg,jpg,png,svg}',
            'fonts/{,*/}*.{eot,woff,woff2,ttf,svg}'
          ],
          dest: '/'
        }]
      },
      robots: {
        src: 'robots.' + env + '.txt',
        dest: '/robots.txt'
      }
    },

    watch: {
      babel: {
        files: [
          '<%= config.app %>/_js/{,*/}*.js',
          '!<%= config.app %>/_js/vendor/*.js'
        ],
        tasks: ['babel:dist']
      },
      js: {
        files: ['<%= config.app %>/_js/vendor/*.js'],
        tasks: ['copy:dist']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      html: {
        files: [
          '<%= config.app %>/**/*.{html,md}',
          '<%= config.app %>/img/**/*.{gif,jpeg,jpg,png,svg}',
          '<%= config.app %>/fonts/{,*/}*.{eot,woff,woff2,ttf,svg}'
        ],
        tasks: ['shell:development', 'sass:server', 'postcss']
      },
      sass: {
        files: ['<%= config.app %>/_scss/{,*/}*.scss'],
        tasks: ['sass:server', 'postcss']
      }
    },

    shell: {
      development: {
        command: 'bundle exec jekyll build --incremental'
      },
      staging: {
        command: 'bundle exec jekyll build --config _config.yml,_config-prod.yml,_config-staging.yml'
      },
      production: {
        command: 'bundle exec jekyll build --config _config.yml,_config-prod.yml'
      },
      htmlproof: {
        command: 'htmlproof ./_site'
      }
    },

    browserSync: {
      options: {
        notify: false,
        background: true
      },
      livereload: {
        options: {
          files: [
            '<%= config.app %>/{,*/}*.{html,md}',
            '.tmp<%= config.subfolder %>/css/{,*/}*.css',
            '<%= config.app %>/img/{,*/}*',
            '.tmp<%= config.subfolder %>/js/{,*/}*.js'
          ],
          port: 9000,
          server: {
            baseDir: [config.tmp, config.dist],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      dist: {
        options: {
          background: false,
          server: '<%= config.dist %>'
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      }
    },

    eslint: {
      target: [
        'Gruntfile.js',
        '<%= config.app %>/_js/{,*/}*.js',
        '!<%= config.app %>/_js/vendor/*'
      ]
    },

    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/_js',
          src: [
            '{,*/}*.js',
            '!vendor/*.js'
          ],
          dest: '<%= config.tmp %><%= config.subfolder %>/js',
          ext: '.js'
        }]
      }
    },

    sass: {
      options: {
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapContents: true,
        includePaths: ['.']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/_scss/',
          src: ['*.scss'],
          dest: '<%= config.tmp %><%= config.subfolder %>/css',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/_scss/',
          src: ['*.scss'],
          dest: '<%= config.tmp %><%= config.subfolder %>/css',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
          })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },

    filerev: {
      dist: {
        src: [
          '<%= config.dist %><%= config.subfolder %>/js/{,*/}*.js',
          '<%= config.dist %><%= config.subfolder %>/css/{,*/}*.css',
          '<%= config.dist %><%= config.subfolder %>/img/**/*.*',
          '<%= config.dist %><%= config.subfolder %>/fonts/{,*/}*.*'
        ]
      }
    },

    useminPrepare: {
      options: {
        dest: '<%= config.dist %><%= config.subfolder %>'
      },
      html: '<%= config.dist %><%= config.subfolder %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %><%= config.subfolder %>',
          '<%= config.dist %><%= config.subfolder %>/css',
          '<%= config.dist %><%= config.subfolder %>/img'
        ],
        patterns: {
          html: [
            [/(img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the html to reference revved images'],
            [/(css\/.*?\.css)/gm, 'Update the html to reference revved stylesheets'],
            [/(js\/.*?\.js)/gm, 'Update the html to reference revved scripts']
          ]
        },
        blockReplacements: {
          css: function (block) {
            if (env === 'staging' || env === 'production') {
              return '<link rel="stylesheet" href="' + config.subfolder + block.dest + '">'
            } else {
              return '<link rel="stylesheet" href="' + block.dest + '">'
            }
          },
          js: function (block) {
            if (env === 'staging' || env === 'production') {
              return '<script src="' + config.subfolder + block.dest + '"></script>'
            } else {
              return '<script src="' + block.dest + '"></script>'
            }
          }
        }
      },
      html: ['<%= config.dist %><%= config.subfolder %>/**/*.html'],
      css: ['<%= config.dist %><%= config.subfolder %>/css/{,*/}*.css']
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %><%= config.subfolder %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %><%= config.subfolder %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %><%= config.subfolder %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %><%= config.subfolder %>'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/_js',
          dest: '<%= config.tmp %><%= config.subfolder %>/js/',
          src: 'vendor/*.js'
        }]
      }
    },

    // modernizr: {
    //   dist: {
    //     devFile: 'bower_components/modernizr/modernizr.js',
    //     outputFile: '<%= config.dist %><%= config.subfolder %>/scripts/vendor/modernizr.js',
    //     files: {
    //       src: [
    //         '<%= config.dist %><%= config.subfolder %>/js/{,*/}*.js',
    //         '<%= config.dist %><%= config.subfolder %>/css/{,*/}*.css',
    //         '!<%= config.dist %><%= config.subfolder %>/js/vendor/*'
    //       ]
    //     },
    //     uglify: true
    //   }
    // },

    concurrent: {
      server: [
        'babel:dist',
        'sass:server'
      ],
      dist: [
        'babel',
        'sass'
        // 'imagemin',
        // 'svgmin'
      ]
    },

    compress: {
      dist: {
        options: {
          mode: 'gzip',
          level: 9
        },
        files: [{
          expand: true,
          src: ['<%= config.dist %><%= config.subfolder %>/css/*.css'],
          ext: '.css.gz',
          extDot: 'last'
        }, {
          expand: true,
          src: ['<%= config.dist %><%= config.subfolder %>/js/{,*/}*.js'],
          ext: '.js.gz',
          extDot: 'last'
        }]
      }
    }
  })

  grunt.registerTask('serve', 'start the server and preview your app', function (target) {
    if (env === 'staging' || env === 'production') {
      return grunt.task.run(['deploy', 'browserSync:dist'])
    }

    grunt.task.run([
      'clean',
      'shell:development',
      'concurrent:server',
      'copy:dist',
      // 'postcss',
      'browserSync:livereload',
      'watch'
    ])
  })

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.')
    grunt.task.run([target ? ('serve:' + target) : 'serve'])
  })

  grunt.registerTask('build', [
    'clean',
    'shell:' + env,
    'useminPrepare',
    'concurrent:dist',
    'copy:dist',
    'postcss',
    'concat',
    'cssmin',
    'uglify',
    // 'modernizr',
    'filerev',
    'usemin'
  ])

  grunt.registerTask('deploy', function () {
    if (env === 'staging' || env === 'production') {
      grunt.task.run([
        'build',
        'htmlmin',
        'compress',
        'aws_s3:dist',
        'aws_s3:assets',
        'aws_s3:robots'
      ])
    } else {
      grunt.log.warn('The `deploy` task needs a target option. Use `deploy --target=ENV`')
    }
  })

  grunt.registerTask('default', [
    'newer:eslint',
    'build'
  ])
}

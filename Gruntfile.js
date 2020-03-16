module.exports = function (grunt) {
    grunt.initConfig({
      htmlmin: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        target: {
          files: {
            'dist/index.html': 'dist/index.html'
          }
        }
      },
      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'dist/css/style.min.css': 'src/css/*.css'
          }
        }
      },
      uglify: {
        release:{
          files:{
            'dist/js/index.min.js': 'src/js/index.js'
          }
        }
      },
      copy: {
        html: {
          src: 'src/index.html',
          dest: 'dist/index.html'
        },
        images: {
          expand: true,
          cwd: 'src',
          src: 'images/*.*',
          dest: 'dist/'
        }
      },
      useminPrepare: {
        html: 'index.html',
        options: {
          dest: 'dist'
        }
      },
      usemin: {
        html: ['dist/index.html']
      },
    });
  
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
  
    grunt.registerTask('release', ['copy', 'useminPrepare', 'usemin','uglify', 'cssmin', 'htmlmin']);
  };
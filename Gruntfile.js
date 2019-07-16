module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    },
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: './src/js',
          src: ['*.js', '!*.min.js'],
          dest: 'dist/',
          ext: '.min.js'
        }]
      },
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
        '<%= pkg.homepage ? "* " + pkg.homepage : "" %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.map(pkg.licenses, "type").join(", ") %>*/\n'
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: './src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['uglify', 'cssmin']);
  grunt.registerTask('default', ['test', 'build']);
};
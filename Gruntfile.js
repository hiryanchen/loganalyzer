module.exports = function(grunt) {

  require('google-closure-compiler').grunt(grunt);

  grunt.initConfig({
    'closure-compiler': {
      my_target: {
        files: {
          'dist/log_analyzer_test.min.js': ['src/js/**/*.js']
        },
        options: {
          compilation_level: 'SIMPLE',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          // create_source_map: 'dist/log_analyzer_test.min.js.map',
          // output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=log_analyzer_test.min.js.map'
          output_wrapper: '(function(){\n%output%\n}).call(this)'
        }
      }
    }
  });

  // Project configuration.
  // grunt.initConfig({
  //   pkg: grunt.file.readJSON('package.json'),
  //   uglify: {
  //    options: {
  //      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  //    },
  //    build: {
  //      src: 'src/<%= pkg.name %>.js',
  //      dest: 'build/<%= pkg.name %>.min.js'
  //    }
  //  }
  //});

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', 'closure-compiler');
};

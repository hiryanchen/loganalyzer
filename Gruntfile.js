module.exports = function(grunt) {

  require('google-closure-compiler').grunt(grunt);

  grunt.initConfig({
    'closure-compiler': {
      my_target: {
        files: {
          'dest/output.min.js': ['src/js/**/*.js']
        },
        options: {
          compilation_level: 'SIMPLE',
          language_in: 'ECMASCRIPT5_STRICT',
          create_source_map: 'dest/output.min.js.map',
          output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=output.min.js.map'
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

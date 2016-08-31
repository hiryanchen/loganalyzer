/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util');

var closureCompiler = require('google-closure-compiler').gulp();
 
gulp.task('default', function () {
  return gulp.src('./src/js/**/*.js', {base: './'})
      .pipe(closureCompiler({
          compilation_level: 'SIMPLE',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          // process_common_js_modules: true,
          // externs: '../node.js-closure-compiler-externs/fs.js',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'log_analyzer_test.min.js'
        })).on('error', gutil.log)
      .pipe(gulp.dest('./dist/'));
});

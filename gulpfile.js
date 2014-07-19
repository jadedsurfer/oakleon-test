var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var jasmine = require('gulp-jasmine');
var run = require('gulp-run');

//gulp.task('test', function(){
//  return gulp.src('test/test.js')
//    .pipe(jasmine());
//});

gulp.task('test', function(){
  run('npm test').exec(function(err){
    if (!err) {
      run('gulp dist').exec(function(err){
        console.log('done!');
      });
    }
  });
});

gulp.task('dist', function(){
  return browserify({entries: './src/index.js'})
    .transform('reactify')
    .bundle({ debug: true })
    .pipe(source('deps.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
  var watcher = gulp.watch('./src/**', ['test']);
  watcher.on('change', function(event){
    console.log('File '+event.path+' was '+event.type+', running tasks...');
  })
});


gulp.task('default', ['dist']);

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pump = require('pump');
var jade = require('gulp-jade');

gulp.task('watch', ['browserSync', 'sass', 'jade'], function (){
  gulp.watch('resources/scss/*.scss', ['sass']);
  gulp.watch('resources/*.jade', ['jade']);
  gulp.watch('public/*.html', browserSync.reload);
});

gulp.task('sass', function(e){
  pump([
    gulp.src('resources/scss/*.scss'),
    sass(),
    gulp.dest('public/css'),
  	browserSync.stream()
  ], e);
});

gulp.task('jade', function(e){
  pump([
    gulp.src('resources/*.jade'),
    jade({
      locals: {},
    }),
    gulp.dest('public/'),
  	browserSync.stream()
  ], e);
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})

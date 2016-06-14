var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var del = require('del');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

// *************************************
// GULP BUILD
// *************************************
gulp.task('build', ['clean'], function() {
  gulp.start('jade', 'sass', 'image', 'script');
});

// ***********************************
// GULP JADE
// ***********************************
gulp.task('jade', function() {
  return gulp.src(['src/*.jade', '!src/_*.jade'])
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// ***********************************
// GULP SASS
// ***********************************
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

// ***********************************
// GULP IMAGE
// ***********************************
gulp.task('image', function() {
  gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

// ***********************************
// GULP SCRIPT
// ***********************************
gulp.task('script', function() {
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// ***********************************
// ClEAN
// ***********************************
gulp.task('clean', function() {
  return del(['dist/**/*']);
});

// ***********************************
// GULP CONNECT
// ***********************************
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// *************************************
// GULP WATCH
// *************************************
gulp.task('watch', function() {
  gulp.watch('src/*.jade', ['jade']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['script']);
});

// *************************************
// GULP
// *************************************
gulp.task('default', ['watch', 'connect']);






























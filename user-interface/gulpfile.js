//-------------------------------------------------------------------------------
// Gulpfile
//-------------------------------------------------------------------------------

var gulp = require('gulp');


// Plugins
//-------------------------------------------------------------------------------

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


// Styles
//-------------------------------------------------------------------------------

gulp.task('styles', function() {
   return gulp
      .src('scss/**/*.scss')
      .pipe(sass({includePaths: ['_/scss/'], outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('css'))
      .pipe(reload({stream: true}));
});


// Scripts
//-------------------------------------------------------------------------------

gulp.task('scripts', function() {
   return gulp
      .src('js/app.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(rename('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('js'))
      .pipe(reload({stream: true}));
});


// BrowserSync
//-------------------------------------------------------------------------------

gulp.task('serve', ['styles', 'scripts'], function() {
    browserSync.init({
        server: './'
    });

    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
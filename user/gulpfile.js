/**
*
*Create by @Ireth | 28032016
*
**/
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-ruby-sass');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var fs = require('fs');


var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('browserify-serve', function(){   
  
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./js/'));
});
gulp.task('browserify', function(){   
  
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('jshint', function () {
  return gulp.src(['js/**/*.js', '!js/bundle.js'])
    //.pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
    //.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('css', function () {
  return gulp.src(
      'sass/main.scss'
    )
    //.pipe($.changed('css', {extension: '.scss'}))
    .pipe(sass()
      .on('error', console.error.bind(console))
    )
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/css'))
    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest('css/'))
    .pipe($.size({title: 'css'}));
});
gulp.task('css-serve', function () {
  return gulp.src(
      'sass/main.scss'
    )
    //.pipe($.changed('css', {extension: '.scss'}))
    .pipe(sass({
        compass:true
      })
      .on('error', console.error.bind(console))
    )
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('css/site/'))
    .pipe($.size({title: 'css'}));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['browserify-serve', 'css-serve'], function () {
  gulp.watch(['sass/**/*.{scss,css}'], ['css-serve']);
  gulp.watch(['js/*.js', 'js/**/*.js'], ['browserify-serve', 'jshint']);
  
});

gulp.task('default', ['clean'], function (cb) {
  runSequence('css', ['browserify', 'images'], cb);
});

gulp.task('clear', function (done) {
  return $.cache.clearAll(done);
});

try { require('require-dir')('tasks'); } catch (err) {}


var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    bourbon = require("node-bourbon").includePaths,
    neat = require("node-neat").includePaths;

//Paths
var paths = {
    html: '**/*.html',
    scss: 'scss/**/*.scss',
    js: 'js/*.js'
};


//dev tasks---------------------------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync.init({
      server: {
        baseDir: './'
      }
    });
});


// Run SCSS tasks
gulp.task('styles', function() {
  return gulp.src(paths.scss)
    .pipe(sass({
      'sourcemap=none': true,
      includePaths: bourbon,
      includePaths: neat
    }))
    .pipe(autoprefixer('last 10 versions', 'ie 10'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
        stream: true
    }));
});


//Run Template tasks
gulp.task('html', function() {
    return gulp.src(paths.html)
    .pipe(browserSync.reload({
        stream:true
    }));
});


//Run js tasks
gulp.task('js', function() {
    return gulp.src(paths.js)
    .pipe(browserSync.reload({
        stream:true
    }));
});


//Watch files in /dev
gulp.task('watch', ['browserSync'], function() {
    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.js, ['js']);
});


gulp.task('default', function (callback) {
    runSequence(['html', 'styles', 'js', 'browserSync', 'watch'], callback);
});

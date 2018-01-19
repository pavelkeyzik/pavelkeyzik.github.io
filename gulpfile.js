var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat')
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create()
    LessAutoprefix = require('less-plugin-autoprefix')
    autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] })
    cssmin = require('gulp-cssmin')
    rename = require('gulp-rename');

gulp.task('less', function() {
    return gulp.src('./styles/less/*.less')
        .pipe(less({
            plugins: [ autoprefix ]
        }))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./styles/'))
        .pipe(browserSync.stream());
});

gulp.task('server', ['less'], function() {

    browserSync.init({
        server: './'
    });

    gulp.watch('./styles/less/*.less', ['less']);
    gulp.watch('*.html').on('change', browserSync.reload)

});

gulp.task('default', ['less']);
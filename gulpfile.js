// Include gulp
var gulp = require('gulp');
var gutil = require('gulp-util');

// Include nunjucks
var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('nunjucks', function() {
    return gulp.src('src/emails/**/*.nunjucks')
        .pipe(
            nunjucksRender({
                path: ['src/templates/', 'build/css/**']
            })
            .on('error', gutil.log)
        )
        .pipe(gulp.dest('build/'));
});

// SASS
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');
var postcssProcessors = [
    autoprefixer( { browsers: ['last 2 versions', 'ie > 10'] } )
]

gulp.task('sassInline', function(callback) {
    return gulp.src('src/sass/**/inline.scss')
        .pipe(
           postcss(postcssProcessors, {syntax: scss})
        )
        .pipe(
            sass({ outputStyle: 'expanded' })
            .on('error', gutil.log)
        )
        .pipe(gulp.dest('build/css/'));
});

//inline css
var inlineCss = require('gulp-inline-css');

gulp.task('inlinecss', ['sassInline', 'nunjucks'], function() {
    return gulp.src('build/**/*.html')
        .pipe(
            inlineCss({
                applyStyleTags: false,
                removeStyleTags: false
            })
            .on('error', gutil.log)
        )
        .pipe(gulp.dest('build/'));
});

// Connect
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        port: 8000
    });
});


// Watch
var filesToWatch = [
    'src/sass/**/*.scss',
    'src/emails/**/*.nunjucks',
    'src/templates/**/*.nunjucks'
]

gulp.task('watch', function() {
    gulp.watch(filesToWatch,['nunjucks', 'inlinecss']);
});

// Default
gulp.task('default', ['connect', 'nunjucks', 'inlinecss', 'watch']);

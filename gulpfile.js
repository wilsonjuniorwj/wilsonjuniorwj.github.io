var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css');
    rename = require("gulp-rename");
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin');;

/**
 * HTML Task
 */
gulp.task('minify-html', function() {
    gulp.src(['src/html/index.html', 'src/html/confirmation.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./'));
});

/**
 * Css Task
 */
gulp.task('minify-css', function () {
    gulp.src(['src/css/home.css', 'src/css/confirmation.css'])
        .pipe(plumber())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

/**
 * Javascript Task
 */
gulp.task('minify-js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Configure the browserSync task
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
})

/**
 * Watch stylus files for changes & recompile
 * Watch html files & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('src/html/**/*.html', ['minify-html']);
    gulp.watch('src/css/**/*.css', ['minify-css']);
    gulp.watch('src/js/**/*.js', ['minify-js']);
});

/**
 * Default task, running just `gulp` will compile the stylus,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['minify-html', 'minify-css', 'minify-js', 'browser-sync', 'watch']);

// build to deploy
gulp.task('build', ['minify-html', 'minify-css', 'minify-js']);
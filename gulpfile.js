const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass');

const paths = {
    scripts: [
        'js/utils.js',
        'js/main.js'
    ],
    injectedScripts: [
        'js/utils.js',
        'js/injected.js'
    ],
    styles: [
        'css/main.scss'
    ]
};

gulp.task('default', ['build']);

gulp.task('compile-styles', () => {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});

gulp.task('compile-scripts', () => {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        browsers: ['last 4 chrome versions']
                    }
                }],
                // ['minify'],
            ]
        }))
        .pipe(concat('js/main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('compile-injected', () => {
    return gulp.src(paths.injectedScripts)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        browsers: ['last 4 chrome versions']
                    }
                }],
                // ['minify'],
            ]
        }))
        .pipe(concat('js/injected.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('build', ['compile-styles', 'compile-scripts', 'compile-injected']);
gulp.task('sass', ['compile-styles']);
gulp.task('js', ['compile-scripts', 'compile-injected']);

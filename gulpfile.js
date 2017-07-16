const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const inject = require('gulp-inject');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


const cacheFix = Math.random().toString(36).substring(7);

const files = { in: {
        styles: './src/css/styles.css',
        js: [
            './node_modules/modernizr/bin/modernizr'
        ]
    },
    out: {
        styles: `./dist/${cacheFix}.css`
    }
}

//Inject development dependencies to index
gulp.task('idd', ['sass'], () => {
    const target = gulp.src("./index.html");
    const sources = gulp.src(files.in.styles);
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'))
})

gulp.task('clean-css', () => {
    return gulp.src('src/css/styles.css')
        .pipe(clean())
})

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie10',
            inline: ['local']
        }))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream({
            match: '**/*.css'
        }));
});

gulp.task('browserSync', ['sass'], () => {
    var filesToWatch = [
        'src/sass/**/*.scss',
        "index.html",
        "src/js/**/*.js"
    ]

    browserSync.init(filesToWatch, {
        server: true,
        injectChanges: true
    });
})

gulp.task('serve', ['sass', 'browserSync'], function () {



    gulp.watch('src/sass/**/*.scss', ['sass']);
    // gulp.watch("index.html").on('change', browserSync.reload);
    // gulp.watch("src/js/**/*.js").on('change', browserSync.reload);
});
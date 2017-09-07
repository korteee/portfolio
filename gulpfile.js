const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const inject = require('gulp-inject');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const replace = require('gulp-replace');



const files = { in: {
        styles: './src/css/styles.css',
        js: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/jquery-mousewheel/jquery.mousewheel.js',
            './node_modules/jquery-touchswipe/jquery.touchSwipe.min.js',
            './node_modules/iscroll/build/iscroll.js',,
            './node_modules/babel-polyfill/dist/polyfill.min.js',
            './src/js/*'
        ],
        assets: ['./src/fonts/**', './src/img/**']
    },
    out: {
        styles: `./dist/styles.css`,
        js: `./dist/scripts.js`,
        assets: `./dist`
    }
}



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
        .pipe(gulp.dest('./src/css'))
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
    gulp.watch("index.html").on('change', browserSync.reload);
    gulp.watch("src/js/**/*.js", ['idd']);
});

gulp.task('scripts', function () {

    gulp.src(files.in.js)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist'));
})

gulp.task('styles', ['sass'], function () {

    gulp.src(files.in.styles)
        .pipe(replace('../fonts', './fonts'))
        .pipe(replace('../img', './img'))
        .pipe(gulp.dest('./dist'))

})

gulp.task('copy-assets', function () {
    gulp.src(files.in.assets, {
            base: './src'
        })
        .pipe(gulp.dest(files.out.assets));
})

//Inject development dependencies to index
gulp.task('idd', ['sass'], () => {
    const target = gulp.src("./index.html");
    const sources = gulp.src([files.in.styles].concat(files.in.js));
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'))
})


//Inject production dependencies
gulp.task('ipd', function () {
    const target = gulp.src("./index.html");

    console.log([files.out.js].concat(files.out.styles))
    const sources = gulp.src([files.out.js].concat(files.out.styles));
    return target.pipe(inject(sources, {
            relative: true
        }))
        .pipe(gulp.dest('./'))
})

gulp.task('clean-dist', function () {
    gulp.src('./dist')
        .pipe(clean());
})


gulp.task('build', function () {
    runSequence('clean-dist', 'styles', 'scripts', 'copy-assets', 'ipd')
})
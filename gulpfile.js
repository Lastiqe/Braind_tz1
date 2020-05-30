const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify-es').default
const imagemin = require('gulp-imagemin');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

//build

gulp.task('clean', () => {
    return del(['build/*'])
})


gulp.task('build_html', () => {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'))
})

gulp.task('build_css', () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({ lelvel: 2 }))
        .pipe(gulp.dest('./build/css'))
})

gulp.task('build_js', () => {
    return gulp.src('./src/js/scripts.js')
        .pipe(sourcemaps.init())
        .pipe(uglify({ toplevel: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js'))
})

gulp.task('build_imgs', () => {
    return gulp.src('./src/img/**/*')
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(gulp.dest('./build/img'))
})
//dev
gulp.task('sass:watch', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js:watch', () => {
    return gulp.src('./src/js/**/parts')
        .pipe(browserSync.reload({ stream: true }))
})
gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(browserSync.reload({ stream: true }))
})
gulp.task('js', () => {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./src/js'))
})

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:watch'))
    gulp.watch('./src/*.html', gulp.parallel('html'))
    gulp.watch('./src/js/parts/**/*.js', gulp.series('js', gulp.parallel('js:watch')))
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});



//scripts
gulp.task('run_dev', gulp.parallel('browser-sync', 'watch'))
gulp.task('run_build', gulp.series('clean', gulp.parallel('build_html', 'build_css', 'build_js', 'build_imgs')))



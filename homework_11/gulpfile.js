const gulp = require("gulp");
const browserify = require("browserify");
const watchify = require("watchify");
const tsify = require("tsify");
const fancyLog = require("fancy-log");
const source = require("vinyl-source-stream");
const sass = require('gulp-sass')(require('sass'));

const path = {
   pages: ["./src/*.html"]
}

gulp.task("sass", function () {
   return gulp.src("./src/scss/*.scss")
       .pipe(sass())
       .pipe(sass().on("error", sass.logError))
       .pipe(gulp.dest("./dist"));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/scss/*.scss', gulp.series('sass'));
});

gulp.task("copy-html", function () {
    return gulp.src(path.pages)
        .pipe(gulp.dest("./dist"));
});

const watchedBrowserify = watchify(browserify({
        basedir: '.',
        entries: ["./src/main.ts"],
        cache: {},
        debug: true, // Включаем отладку
        packageCache: {}
    }).plugin(tsify)
)

const bundle = () => watchedBrowserify
        .bundle()
        .on('error', fancyLog)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("./dist"));

gulp.task("default", bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on('log', fancyLog);
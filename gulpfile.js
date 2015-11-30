/**
 * Created by Alexandre on 10/5/2015.
 */

var browserify = require("browserify"),
    gulp = require("gulp"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    babelify= require("babelify"),
    util = require("gulp-util"),
    sourcemaps = require("gulp-sourcemaps"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    watch = require("gulp-watch"),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync").create(),
    //livereload = require('gulp-livereload'),
    es6 = "es6/",
    es5 = "es5/";

/*gulp.task('babel', function() {
 // place code for your default task here
 return gulp.src(es6 + "*.jsx")
 .pipe(sourcemaps.init())
 .pipe(babel())
 //.pipe(rename({ extname: '.js' }))
 .pipe(concat("helpers.js"))
 .pipe(sourcemaps.write("."))
 .pipe(gulp.dest(es5));
 });*/

gulp.task("javascript", function () {
    // set up the browserify instance on a task basis
    return browserify({
        entries: es6 + "main.jsx",
        debug: true,
        extensions: [".jsx"]
    })
        .transform(babelify, {presets: ["es2015"]})
        .bundle()
        .pipe(source('helpers.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .on("error", util.log)
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(es5))
        .pipe(browserSync.stream())
        /*.pipe(livereload({
            reloadPage: "./index.html",
            start: true
        }))*/;
});

/*gulp.task('build', function() {
 browserify('./main.js', { debug: true })
 .add(require.resolve('babel/polyfill'))
 .transform(babelify)
 .bundle()
 .on('error', util.log.bind(util, 'Browserify Error'))
 .pipe(source('main.js'))
 .pipe(buffer())
 .pipe(sourcemaps.init({loadMaps: true}))
 .pipe(uglify({ mangle: false }))
 .pipe(sourcemaps.write('./'))
 .pipe(gulp.dest(es5));
 });*/

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    /*gulp.task('watch', function(){
        //livereload.listen();
        gulp.watch(es6 + "*.jsx", ['javascript']);
    });*/

    gulp.watch("es6/*.jsx", ["javascript"]);

    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./" + es5 + "*.js").on("change", browserSync.reload);
});




gulp.task("default", ["browser-sync"]);
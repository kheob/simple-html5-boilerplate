"use strict";

import gulp from "gulp";
import browserSync from "browser-sync";
import useref from "gulp-useref";
import uglify from "gulp-uglify";
import gulpIf from "gulp-if";
import browserify from "browserify";
import source from "vinyl-source-stream";
import cssnano from "gulp-cssnano";
import imagemin from "gulp-imagemin";
import del from "del";
import runSequence from "run-sequence";


//
// Helper Tasks
//


// BrowserSync
gulp.task("browserSync", () => {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

// Transpile ES2015
gulp.task("transpile", () => {
    return browserify("src/js/app.js")
        .transform("babelify")
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Optimise JS and CSS
gulp.task("useref", () => {
    return gulp.src("src/*.html")
        .pipe(useref())
        .pipe(gulpIf("*.js", uglify()))
        .pipe(gulpIf("*.css", cssnano()))
        .pipe(gulp.dest("dist"));
});

// Optimise Images
gulp.task("images", () => {
    return gulp.src("src/images/**/*.+(png|jpg|jpeg|gif|svg)")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
});

// Clean dist Directory
gulp.task("clean:dist", () => {
    return del.sync("dist");
});

// Clean bundle.js File
gulp.task("clean:bundle", () => {
    return del.sync("src/js/bundle.js");
});

// Clean Tasks
gulp.task("clean", ["clean:dist", "clean:bundle"]);


//
// Main Tasks
//


// Build
gulp.task("build", () => {
    runSequence("clean", "transpile", ["useref", "images"]);
});

// Watchers
gulp.task("watch", ["browserSync", "transpile"], () => {
    gulp.watch("src/js/app.js", ["transpile"]);
    gulp.watch("src/**/!(*app.js)", browserSync.reload);
});

// Default
gulp.task("default", ["watch"]);
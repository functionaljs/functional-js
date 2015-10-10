var gulp = require("gulp");
var rename = require("gulp-rename");
var jshint = require("gulp-jshint");
var jasmine = require("gulp-jasmine");
var uglify = require("gulp-uglify");
var header = require("gulp-header");

var pkg = require("./package.json");

var banner = "/*!\n    " +
    "<%= pkg.name %> (v<%= pkg.version %>)\n    " +
    "(c) <%= pkg.author %>\n" +
    "*/\n";

gulp.task("jshint", function () {
    return gulp
        .src("*.js,!functional.min.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("jasmine", function () {
    return gulp.src("spec.js")
        .pipe(jasmine());
});

gulp.task("uglify", function () {
    return gulp
        .src("functional.js")
        .pipe(rename("functional.min.js"))
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest("."));
});

gulp.task("test", ["jshint", "jasmine", "uglify"]);

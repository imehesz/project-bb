var gulp = require("gulp");
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require("gulp-sass");
var sourceMaps = require("gulp-sourcemaps");
var serverFactory = require('spa-server');

gulp.task('webserver', function () {
  var server = serverFactory.create({
    path: './target',
    port: 8000,
    fallback: {}
  });

  server.start();
});

gulp.task("sass", function(){
    gulp.src("app/css/style.scss")
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("target/"));
});

gulp.task("modules", function(){
    browserify({
      entries: "app/app.es6.js",
      debug: true
    }).
    transform(babelify).
    bundle().
    pipe(source("app.js")).
    pipe(gulp.dest("target/"));
});

gulp.task("copyIndex", function(){
    gulp.src(["app/index.html"])
    .pipe(gulp.dest("target/"));
});

gulp.task("copyLibs", function(){
  gulp.src(["app/libs/**/*"])
  .pipe(gulp.dest("target/libs"));
});

gulp.task("copyData", function(){
  gulp.src(["app/data/**/*"])
  .pipe(gulp.dest("target/data"));
});

gulp.task("watchJs", function(){
  gulp.watch(["app/app.es6.js", "app/modules/**/*.js", "app/css/**/*.scss", "app/index.html"], ["build"]);
});

gulp.task("build", ["modules","sass", "copyIndex", "copyLibs", "copyData"]);
gulp.task("default", ["build","watchJs","webserver"]);

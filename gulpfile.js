var gulp = require("gulp");
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require("gulp-sass");
var sourceMaps = require("gulp-sourcemaps");
var serverFactory = require('spa-server');
var shell = require("gulp-shell");

// DEV
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
    .pipe(gulp.dest("target/css/"));
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
    gulp.src(["app/index.html", "app/config.js"])
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

// PROD
gulp.task("depIndex", function(){
    gulp.src(["app/index.html", "app/config.js"])
    .pipe(gulp.dest("deploy/"));
});

gulp.task("depCopyLibs", function(){
  gulp.src(["app/libs/**/*"])
  .pipe(gulp.dest("deploy/libs"));
});

gulp.task("depModules", function(){
    browserify({
      entries: "app/app.es6.js",
      debug: false
    }).
    transform(babelify).
    bundle().
    pipe(source("app.js")).
    pipe(gulp.dest("deploy/"));
});

gulp.task("depSass", function(){
    gulp.src("app/css/style.scss")
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest("deploy/css/"));
});

gulp.task("depRsync", shell.task([
  "rsync -a deploy/ [SERVER/HERE/with/folder]",
  "rm -rf deploy"
]));

gulp.task("deploy", ["depModules", "depSass", "depIndex", "depCopyLibs", "depRsync"]);
gulp.task("build", ["modules","sass", "copyIndex", "copyLibs" ]);
gulp.task("default", ["build","watchJs","webserver"]);

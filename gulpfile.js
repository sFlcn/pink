const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();

// html

const minifyHtml = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
}

// Scripts

const minifyScripts = () => {
  return gulp.src("source/js/script.js")
    .pipe(sourcemaps.init())
    .pipe(terser({
      toplevel: "true"
    }))
    .pipe(rename("script.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.minifyScripts = minifyScripts;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Images

const opimizeImages = () => {
  return gulp.src([
    "source/img/**/*.{jpg,png,svg}",
    "!source/img/sprite/**/*",
    "!source/img/hi-res/**/*"
  ])
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest("build/img"));
}

exports.opimizeImages = opimizeImages;

// WebP

const createWebp = () => {
  return gulp.src([
    "source/img/**/*.{jpg,png}",
    "!source/img/hi-res/**/*"
  ])
    .pipe(webp({quality: 85}))
    .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

// Sprite

const createSvgSprite = () => {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore())
    .pipe(rename("pink_sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.createSvgSprite = createSvgSprite;

// Copy

const copyResources = () => {
  return gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/icons/*",
    "source/img/**/*.{jpg,png,svg}",
    "!source/img/sprite/**/*"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
}

exports.copyResources = copyResources;

// Clean

const clean = () => {
  return del("build");
}

// Server

const server = (done) => {
  let myBrowser = "";
  if (process.argv.length > 2) {
    myBrowser = process.argv[2].slice(2);
  }
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
    browser: myBrowser,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(minifyScripts));
  gulp.watch("source/*.html", gulp.series(minifyHtml, reload));
}

// BUILD

const build = gulp.series(
  clean,
  gulp.parallel(
    copyResources,
    styles,
    minifyHtml,
    minifyScripts,
    createSvgSprite,
    opimizeImages,
    createWebp
  )
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  gulp.parallel(
    copyResources,
    styles,
    minifyHtml,
    minifyScripts,
    createSvgSprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);

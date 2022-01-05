import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';
import sync from 'browser-sync';

// html

const minifyHtml = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('build'))
    .pipe(sync.stream());
}

// Scripts

const minifyScripts = () => {
  return gulp.src('source/js/script.js')
    .pipe(terser({
      toplevel: 'true'
    }))
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream());
}

// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(sync.stream());
}

// Images

const opimizeImages = () => {
  return gulp.src([
    'source/img/**/*.{jpg,png}',
    '!source/img/hi-res/**/*'
  ])
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

// WebP

const createWebp = () => {
  return gulp.src([
    'source/img/**/*.{jpg,png}',
    '!source/img/hi-res/**/*'
  ])
    .pipe(squoosh({
      webp: {quality: 85},
    }))
    .pipe(gulp.dest('build/img'));
}

// SVG

const opimizeSvg = () => {
  return gulp.src([
    'source/img/**/*.svg',
    '!source/img/sprite/**/*',
  ])
  .pipe(svgmin({
    plugins: [
      {removeViewBox: false},
      {cleanupIDs: false}
    ]
  }))
  .pipe(gulp.dest('build/img'));
}

// Sprite

const createSvgSprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgstore())
    .pipe(rename('pink_sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Copy

const copyResources = () => {
  return gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/data/*',
    'source/icons/*',
    'source/img/**/*.{jpg,png,svg}',
    '!source/img/sprite/**/*'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
}

// Clean

const clean = () => {
  return del('build');
}

// Server

const server = (done) => {
  let myBrowser = '';
  if (process.argv.length > 2) {
    myBrowser = process.argv[2].slice(2);
  }
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: myBrowser,
  });
  done();
}

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(minifyScripts));
  gulp.watch('source/*.html', gulp.series(minifyHtml, reload));
}

// BUILD

export const build = gulp.series(
  clean,
  gulp.parallel(
    copyResources,
    styles,
    minifyHtml,
    minifyScripts,
    opimizeImages,
    opimizeSvg,
    createSvgSprite,
    createWebp
  )
);

// Default

export default gulp.series(
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

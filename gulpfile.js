const { src, dest, series, watch } = require('gulp');

const webpackStream = require('webpack-stream');
const vinylNamed = require('vinyl-named');
const rename = require("gulp-rename");
const htmlMin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const image = require('gulp-image');
const sourceMaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');
const plumber = require('gulp-plumber');
const ttfconvertToWoff = require('gulp-ttf2woff');
const ttfconvertToWoff2 = require('gulp-ttftowoff2');
const gulpif = require('gulp-if');

let isProd = true;
const isDev = !isProd;
const isOnlineBrowserSync = true;

const webpackConfig = {
  mode: isProd ? 'production' : 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },

  devtool: (isDev) ? 'source-map' : false,
};

const cleanAll = () => {
  return del(['dist'])
};

const cleanHTML = () => {
  return del(['dist/*.html'])
};

const cleanCss = () => {
  return del(['dist/styles'])
};

const cleanImg = () => {
  return del([
    'dist/images/**/*.jpg',
    'dist/images/**/*.png',
    'dist/images/**/*.jpeg',
    'dist/img/**/*.svg',
  ])
};

const cleanJS = () => {
  return del([
    'dist/**/*.js',
    'dist/**/*.js.map',
  ])
};

const html = () => {
  return src('src/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(gulpif(isProd, htmlMin({ collapseWhitespace: true })))
    .pipe(dest('dist'))
    .pipe(gulpif(isDev, browserSync.stream()));
};


const css = () => {
  return src('src/styles/main.scss')
    .pipe(gulpif(isDev, sourceMaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(isProd, autoprefixer({
      cascade: false
    })))
    .pipe(rename('style.css'))
    .pipe(gulpif(isDev, sourceMaps.write()))
    .pipe(gulpif(isProd, csso()))
    .pipe(dest('dist'))
    .pipe(gulpif(isDev, browserSync.stream()));
};

const img = () => {
  return src([
    'src/img/**/*.png',
    'src/img/**/*.jpeg',
    'src/img/**/*.jpg',
    'src/img/**/*.svg',
  ])
    .pipe(gulpif(isProd, image()))
    .pipe(dest('dist/img'))
    .pipe(gulpif(isDev, browserSync.stream()));
};

const fonts = async () => {
  series(ttfToWoff, ttfToWoff2)
}

const ttfToWoff = () => {
  src('src/fonts/*')
    .pipe(ttfconvertToWoff())
    .pipe(dest('dist/fonts'))
    .pipe(gulpif(isDev, browserSync.stream()));
}

const ttfToWoff2 = () => {
  src('src/fonts/*')
    .pipe(ttfconvertToWoff2())
    .pipe(dest('dist/fonts'))
    .pipe(gulpif(isDev, browserSync.stream()));
}

const js = () => {
  return src('src/scripts/*.js')
    .pipe(plumber())
    .pipe(vinylNamed())
    .pipe(webpackStream(webpackConfig))
    .pipe(dest('dist/'))
    .pipe(gulpif(isDev, browserSync.stream()));
}

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: "dist"
    },
    online: isOnlineBrowserSync
  });
}

const test = (cb) => {
  isProd = false;
  cb(series(cleanAll, fonts, img, html, css, js, watcher));
  console.log(isProd);
}

watch('src/**/*.html', series(cleanHTML, html));
watch('src/styles/**/*.scss', series(cleanCss, css));
watch('src/scripts/**/*', series(cleanJS, js));
watch('src/img/**/*', series(cleanImg, img));

exports.test = test;

exports.html = html;
exports.css = css;
exports.img = img;
exports.fonts = fonts;
exports.js = js;
exports.clean = cleanAll;

exports.watch = watcher;

exports.default = series(cleanAll, fonts, img, html, css, js, watcher);


'use strict';

/**
 * Constants/variables
 */
const gulp          = require('gulp');
const concat        = require('gulp-concat');
const rename        = require('gulp-rename');
const sass          = require('gulp-sass');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const sourcemaps    = require('gulp-sourcemaps');
const imageResize   = require('gulp-image-resize');
const autoprefixer  = require('gulp-autoprefixer');

// Sass paths
const sassFiles = 'sass';
/*const sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];*/

// Vendor script paths
/*const jsFilesVendor = [
  'assets/js/vendor/jquery.js',
  'assets/js/vendor/foundation.js',
  'assets/js/vendor/motion-ui.js',
  'assets/js/vendor/jquery-plugin-responsivedom.js',
  'assets/js/vendor/simple-jekyll-search.js'
]
  , jsDestVendor  = 'assets/js';*/

// Custom script paths
const jsFiles = 'a/j/src/**/*.js'
    , jsDest  = 'a/j';

const imagePath = 'a/i';
// define the hero image sizes for resizing
const sectionImageSizes = [768, 1200, 2880];
// Image resize tasks array (needs to be a variable--gets overwritten in iteration below)
var resizeSectionImageTasks = [];

/**
 * Sass tasks
 */
// ======================================================================
gulp.task('sass', function() {
  return gulp.src(sassFiles + '/style.scss')
    //.pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    //.pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'ie >= 10',
        'last 3 iOS versions'
      ]
    }))
    .pipe(gulp.dest('a/c'));
});

/**
 * JavaScript tasks
 */
// ======================================================================
/*gulp.task('scripts:vendor', function() {  
  return gulp.src(jsFilesVendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(jsDestVendor))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDestVendor));
});*/

gulp.task('scripts:custom', function() {  
  return gulp.src(jsFiles)
    .pipe(concat('site.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('site.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

/**
 * Image tasks
 */
// ======================================================================
// Run imagemin on source images
gulp.task('image:min', () =>
  gulp.src(imagePath + '/src/**/*.{jpg,png,gif}')
  .pipe(imagemin())
  .pipe(gulp.dest(imagePath))
);

// run resize on source images
sectionImageSizes.forEach(function (size) {
  var resizeSectionImageTask = 'resize_' + size;

  gulp.task(resizeSectionImageTask, function() {
    return gulp.src(imagePath + '/src/hero/**/*.jpg')
      .pipe(imageResize({
         width:  size,
         upscale: false
       }))
      .pipe(rename(function (path) {
        path.basename += '-' + size
      }))
      .pipe(gulp.dest(imagePath + '/src/hero'))
  });
  resizeSectionImageTasks.push(resizeSectionImageTask);
});
gulp.task('image:resize', resizeSectionImageTasks);

/**
 * Miscellaneous tasks
 */
// ======================================================================

/**
 * Default task
 */
// ======================================================================
gulp.task('default', ['sass', 'scripts:custom'], function() {
  gulp.watch([sassFiles + '/**/*.scss'], ['sass']);
  gulp.watch([jsFiles], ['scripts:custom']);
});

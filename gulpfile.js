"use strict";

const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/assets/scss/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("src/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task(
    'serve',
    gulp.series(['sass'], function() {
      browserSync.init({
        server: './src',
      });
  
      gulp.watch(['src/assets/scss/*.scss'], gulp.parallel(['sass']));
      gulp.watch(['src/*html']).on('change', browserSync.reload);
    })
  );

// Default Task
gulp.task('default', gulp.series(['serve']));
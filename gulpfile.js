// 引入 gulp
var gulp = require ('gulp');

// 引入组件
var jshint = require ('gulp-jshint');
var sass = require ('gulp-sass');
var concat = require ('gulp-concat');
var uglify = require ('gulp-uglify');
var rename = require ('gulp-rename');

/*
* gulp只有五个方法： task，run，watch，src，和dest
* */

// 1 Lint任务：检查脚本（报错或警告等）
gulp.task ('lint', function () {
  gulp.src ('.src/js/*.js')
    .pipe (jshint ())
    .pipe (jshint.reporter ('default'));
});

// 2 Sass任务：编译Sass
gulp.task ('sass', function () {
  gulp.src ('./src/scss/*.scss')
    .pipe (sass ())
    .pipe (gulp.dest ('./css'));
});

// 3 Scripts任务：合并，压缩文件
gulp.task ('scripts', function () {
  gulp.src ('./src/js/*.js')
    .pipe (concat ('all.js'))
    .pipe (gulp.dest ('./dist'))
    .pipe (rename ('all.min.js'))
    .pipe (uglify ())
    .pipe (gulp.dest ('./dist'));
});

// 4 Default任务
gulp.task ('default', function () {
  console.log ('hello world');

  // 构建与运行
  gulp.run ('lint', 'sass', 'scripts');

  // 监听文件变化
  gulp.watch ('./js/*.js', function () {
    gulp.run ('lint', 'sass', 'scripts');
  });
});

var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var forEach = require('gulp-foreach');
var exec = require('gulp-exec');
var log = require('fancy-log');
//var config = require('gulp-config');


//Source Directory
var srcDir = './src';
//Release Directory
var rlsDir = './release';

gulp.task('clean', function (cb) {
    del.sync(['./release/**']);
    cb();
});

gulp.task('build', function () {
    return gulp.src(`${srcDir}/**/*.azcli`, { sourcemaps: true })
        .pipe(rename({
            extname: ".sh"
        }))
        .pipe(gulp.dest(rlsDir))
});

gulp.task(`azcheck`, function (cb) {
    exec(`az -v`)
    cb();
});

gulp.task('create', function (cb) {

    var options = {
        continueOnError: false,
        pipeStdout: false,
    };
    var reportOptions = {
        err: true,
        stderr: true,
        stdout: true
    };

    return gulp.src(`${rlsDir}/**/*create*.sh`)
        .pipe(exec(file => `sh ${file.path} `), options)
        .pipe(exec.reporter(reportOptions));
});

gulp.task('delete', function () {
    var options = {
        continueOnError: false,
        pipeStdout: false,
    };
    var reportOptions = {
        err: true,
        stderr: true,
        stdout: true
    };

    return gulp.src(`${rlsDir}/**/*delete*.sh`)
        .pipe(exec(file => `sh ${file.path} `), options)
        .pipe(exec.reporter(reportOptions));
});

gulp.task('default', gulp.series('clean', 'build'), function (cb) {
    cb();
});
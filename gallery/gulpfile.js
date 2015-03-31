var gulp = require('gulp'),
    watch = require('gulp-watch');
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: '',
        livereload: true
    })
})

gulp.task('html', function() {
    gulp.src('./index.html')
        .pipe(connect.reload())
})

gulp.task('watch', function() {
    gulp.watch(['./index.html', './main.css'], ['html']);
})

// gulp.task('html', function() {
//     gulp.src('./*.html')
//         .pipe(connect.reload());
// })

gulp.task('default', ['connect', 'watch']);
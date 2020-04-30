//Stores gulp modules within variable
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    prefixer = require('gulp-autoprefixer');
// Fundamental structure of gulp tasks
// gulp.task('task-name', function(){
// 	// Do Something
// });

// Error logging
function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

// Scripts tasks
// Ulifies JS
gulp.task('scripts', async function(){
	gulp.src('app/js/*.js')
		.pipe(uglify())
		.on('error', console.error.bind(console))
		.pipe(gulp.dest('dist/js'))
		.pipe(livereload());
});

// Sass to css
gulp.task('sass', async function(){
	//Get the scss file
	gulp.src('app/scss/*.scss')
		.pipe(sass({
			style: 'expanded'
		}))
		.on('error', console.error.bind(console))
		// .on('error', errorLog)
		.pipe(prefixer('last 2 versions'))
		.pipe(gulp.dest('dist/css'))
		.pipe(livereload());
});


// Minifies images
// compresses image to reduce file size
gulp.task('image', async function(){
	gulp.src('app/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

// Watch task
// Watches JS for changes
// Watches for SCSS changes
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('app/js/*.js', gulp.series('scripts'));
	gulp.watch('app/scss/*.scss', gulp.series('sass'));
	gulp.watch('app/img/*', gulp.series('image'));
});

// Default Task
gulp.task('default', gulp.series('scripts', 'sass', 'image' , 'watch'));




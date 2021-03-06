const gulp = require('gulp');
const sass = require('gulp-sass');							//sass
const browserSync = require('browser-sync').create();		//runtime watcher and changer
const clean = require('gulp-clean');						//cleaner product directory "dev"
const cleanCSS = require('gulp-clean-css');					//CSS minifier
const sourcemaps = require('gulp-sourcemaps');				//SCSS navigation in Chrome inspector
const imagemin = require('gulp-imagemin');					//Img minify
const rename = require("gulp-rename");						//rename files after minify
const concat = require('gulp-concat');						//concat for js
const terser = require('gulp-terser');						//minify for js
const autoprefixer = require('gulp-autoprefixer');			//cross-browser compatibility css
const babel = require('gulp-babel');						//cross-browser compatibility js

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require("babelify");
const merge = require('merge-stream');
const glob = require('glob');
const path = require('path');

const fontsFiles = [										//составляем массив переменних с все файлов шрифтов, для переноса в папку разработки
    './src/fonts/**.eot',
    './src/fonts/**.ttf',
    './src/fonts/**.woff',
    './src/fonts/**.otf'
];


function cleandev() {										//модуль отчистки папки перед каждой расспаковкой
    return gulp.src('./dist', {read: false})
        .pipe(clean())
}

function img() {											//модуль переноса картинок
    return gulp.src('./src/img/*.png')
        .pipe(gulp.dest('./dist/img'))
}

function buildhtml () {										//Copy index.html to dir "dev"
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}


function buildhtmls () {										//Copy index.html to dir "dev"
    return gulp.src('./src/html/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}
function buildJson () {
    return gulp.src('./src/*.json')
        .pipe(gulp.dest('dist/data'))
        .pipe(browserSync.stream());

}
function fonts () {											//Copy fonts to dir "dev"
    return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('./dist/webfonts'))
}

// function scripts () {
//     return gulp.src('src/js/*.js')
//         .pipe(babel({											//babel
//             presets: ['@babel/env']
//         }))
//         .pipe(terser({											//terser
//             toplevel: true
//         }))														//minify js
//         // .pipe(concat('all.js'))									//concat all js files
//         .pipe(rename(function (path) {							// function of rename extname for .css
//             path.extname = ".min.js";
//         }))
//         .pipe(gulp.dest('./dist/js'))
//         .pipe(browserSync.stream());
// }

function scripts() {
    const files = glob.sync('./src/js/*.js');

    return merge(files.map(file => {
        return browserify({
            entries: file,
            debug: true
        })
            .transform(babelify.configure({
                presets: ['@babel/preset-env']
            }))
            .bundle()
            .on('error', function (err) {
                console.log(`Error: ${ err.message }`);
                this.emit('end');
            })
            .pipe(source(path.basename(file, '.js') + '.min.js'))
            .pipe(gulp.dest('dist/js'));
    }));
}

function forSass() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS({level: 2}))								// minifyCSS after sourcemaps and sass
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],								// для браузеров которые использует 0.1%
            cascade: false
        }))
        .pipe(rename(function (path) {							// function of rename extname for .css
            path.extname = ".min.css";
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({											// инструмент для live reload
        server: {
            baseDir: "./dist"
        },
        tunnel: true
    });


    gulp.watch('./src/scss/**/*.scss', forSass);				// ставим watcher для слежения за изменениями в файлах
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./src/*.html', buildhtml);
    gulp.watch('./src/html/*.html', buildhtmls);
}

gulp.task('cleandev', cleandev);
gulp.task('buildJson',buildJson)
gulp.task('img', img);
gulp.task('buildHtml', buildhtml);
gulp.task('buildHtmls', buildhtmls);
gulp.task('scripts', scripts);
gulp.task('sass', forSass);
gulp.task('watch', watch);
gulp.task('fonts', fonts);
gulp.task('build', gulp.series('cleandev', gulp.series(buildJson,img, buildhtml, buildhtmls, fonts, scripts, forSass)));
gulp.task('dev', gulp.series('build', watch));
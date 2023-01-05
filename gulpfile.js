const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
//sourcemaps
//const sourcemaps = require('gulp-sourcemaps');

//Imagenes
//const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css(done) {
    src("src/scss/**/*.scss")          /*Identifica El  Archivo*/
        .pipe(plumber())
        .pipe(sass())                /*Aplica SASS /lo compila*/
        //.pipe( postcss([ autoprefixer(), cssnano()]))
        .pipe(dest("build/css"));   /*Almacena en el disco */
    done(); //Callback que avisa a gulp cuando llegamos al final 
}

//  function Imagenes(done) {
//     const opciones = {
//         optimizationLevel: 3
//     }
//     src('src/img/**/*.{png,jpg}')
//         .pipe(cache(imagemin(opciones)))
//         .pipe(dest('build/img'))
//     done();
// }


function versionWebp(done) {

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function javascripts(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));
    done();
}



function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascripts);
    done();
}


exports.css = css;
exports.js = javascripts;
//Para aligerar imagenes: exports.Imagenes = Imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, javascripts, dev);

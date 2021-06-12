let { src, dest } = require('gulp');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const scss = require('gulp-dart-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const del = require('del');
const browsersync = require('browser-sync').create();

let project_folder = 'dist';
let source_folder = 'src';
let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/',
    },
    src: {
        html: source_folder + '/*.html',
        css: source_folder + '/scss/style.scss',
        js: source_folder + '/js/script.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,wepb}',
        fonts: source_folder + '/fonts/*.ttf',
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,wepb}',
    },
    clean: './' + project_folder + '/',
};

// *TODO: fix gulp tasks
//*                 HTML
const html = () => {
    return src(path.src.html)
        .pipe(
            htmlmin({
                collapseWhitespace: true, // удаляем все переносы
                removeComments: true, // удаляем все комментарии
            })
        )
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
};
//*                         Styles
const styles = () => {
    return src(path.src.css)
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(autoprefixer())
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
};
//                      *JavaScript
const scripts = () => {
    return src(path.src.js)
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
};
//*                       Images
const images = () => {
    return src(path.src.img)
        .pipe(
            imagemin([
                imagemin.optipng({ optimizationLevel: 3 }),
                imageminJpegtran({ progressive: true }),
            ])
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
};
//*                     Server
const server = () => {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/',
            port: 3000,
            notify: false,
        },
    });
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], styles);
    gulp.watch([path.watch.js], scripts);
    gulp.watch([path.watch.img], images);
};
//*                     Clean Project
const clean = () => {
    return del(path.clean);
};
exports.default = gulp.series(
    clean,
    gulp.parallel(html, styles, scripts, images),
    server
);

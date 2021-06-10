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
let { src, dest } = require('gulp');
const gulp = require('gulp');
const babel = require('gulp-babel');
const scss = require('gulp-dart-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browsersync = require('browser-sync').create();
// *TODO: fix gulp tasks
function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}
function css() {
    return src(path.src.css)
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(gcmq())
        .pipe(cleanCSS({ level: 2 }))
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}
function js() {
    return src(path.src.js)
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}
function images() {
    return src(path.src.img)
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: false }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ]),
            { verbose: true }
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}
function watch() {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/',
            port: 3000,
            notify: false,
        },
    });
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}
function clean() {
    return del(path.clean);
}
const dev = gulp.parallel(html, css, js, images);
exports.default = gulp.series(clean, dev, watch);

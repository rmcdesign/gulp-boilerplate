// Instructions

// install node which will also install npm
// then install all dev dependencies with: npm install

// config
var html_src = './src/*.html',
    scss_source = './src/scss/**/*.scss',
    css_dest = './dist/css',
    js_src = './src/js',
    js_dest = './dist/js',
    server_port = 3000;

// load node packages
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    postcss = require('gulp-postcss'),
    watch = require( 'gulp-watch' ),
    gulpSass = require( 'gulp-sass' ),
    jshint = require( 'gulp-jshint' ),
    stylish = require( 'jshint-stylish' ),
    simplifyify = require('simplifyify'),
    browserSync = require('browser-sync').create();

gulp.task('html', function() {
    return gulp.src(html_src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// compile sass and apply PostCSS plugins - vendor prefix, minify and optimise media queries
gulp.task('scss', function() {

    return gulp.src(scss_source)
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(postcss([
            require('autoprefixer')({
                browsers: ['last 5 versions', '> 2%', 'ie >= 9']
            }),
            require('cssnano')({
                zindex: false
            }),
            require('css-mqpacker')({
                sort: true
            })
        ]))
        .pipe(gulp.dest(css_dest))
        .pipe(browserSync.stream());
});

gulp.task( 'watch', function() {
    browserSync.init({
        notify: false,
        port: server_port,
        server: "./dist"
    });
    gulp.watch( scss_source, [ 'scss' ] );
    gulp.watch( js_src + '/**/*.js', [ 'scripts' ] );
    gulp.watch( html_src, [ 'html' ] );
} );

// lint javascript source files with es6 syntax
gulp.task("lintjs", function() {
    gulp.src("./src/js/*.js")
        .pipe( jshint({
            'esversion':  6
        }))
        .pipe( jshint.reporter(stylish));
});

gulp.task("scripts",  ['lintjs'], function(done) {
    simplifyify(js_src + '/scripts.js',
        {
            outfile: js_dest,
            debug: true,
            minify: true,
            bundle: false
        })
        .on("end", function(msg) {
            // Finished successfully!
            console.log('built: ' + msg.outputFile);
            browserSync.reload();
            done();
        })
        .on("error", function(err) {
            // Something went wrong
            done(err);
        });
});

// default task can be run with just 'gulp'
gulp.task( 'default', [ 'html','scss','scripts', 'watch' ], function() {
    console.log('running');
} );
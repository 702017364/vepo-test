import gulp from 'gulp';
import BrowserSyncClass from 'browser-sync';
import sass from 'gulp-sass';
import NodeSass from 'node-sass';
import minimist from 'minimist';
import concat from 'gulp-concat';

const browserSync = BrowserSyncClass.create();
sass.compiler = NodeSass;

const dev = !minimist(process.argv.slice(2)).production;

dev && require('./node/websocket');

const comileStyle = () => {
  return gulp
    .src('styles/**/*')
    .pipe(sass({ 
        outputStyle: 'expanded',
      }).on('error', sass.logError))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./'));
};

gulp.task('default', gulp.series([
  comileStyle,
  gulp.parallel([
    () => {
      browserSync.init({
        server: {
          baseDir: './',
      }});
      return gulp
        .watch([
          'index.*',
          'src/**/*',
          'static/**/*',
        ])
        .on('change', () => browserSync.reload());
    },
    () => gulp.watch(['styles/**/*'], gulp.series(comileStyle))
  ]),
]));
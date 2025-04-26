import gulp from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import { existsSync } from 'fs';
import log from 'fancy-log';
import browserSync from 'browser-sync';

const compiledSass = gulpSass(sass);
const server = browserSync.create();

// Пути к файлам
const paths = {
  styles: {
    src: 'src/css/**/*.scss',
    dest: 'app/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'app/js/'
  },
  images: {
    src: 'src/img/**/*.{jpg,jpeg,png,gif,svg}',
    dest: 'app/img/'
  },
  html: {
    src: 'app/**/*.html'
  }
};

// Задача для запуска сервера
function serve(done) {
  server.init({
    server: {
      baseDir: './app' // Указываем корневую папку
    },
    notify: false // Отключаем уведомления в браузере
  });
  done();
}

// Перезагрузка браузера
function reload(done) {
  server.reload();
  done();
}

// Проверка изображений
function checkImages() {
  const hasImages = existsSync('src/img') && gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest)).on('data', () => {});
  if (!hasImages) {
    log('⚠️ Папка src/img пуста или не существует. Пропускаем оптимизацию изображений.');
    return Promise.resolve();
  }
  return optimizeImages();
}

// Оптимизация изображений
function optimizeImages() {
  return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(server.stream())
    .on('end', () => log('✅ Изображения оптимизированы!'));
}

// Компиляция SCSS в CSS
function compileStyles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(compiledSass().on('error', compiledSass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream()); // Обновляем CSS без перезагрузки
}

// Обработка JavaScript
function processScripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .on('end', server.reload); // Перезагружаем браузер после JS
}

// Наблюдение за изменениями
function watchFiles() {
  gulp.watch(paths.styles.src, compileStyles);
  gulp.watch(paths.scripts.src, processScripts);
  gulp.watch(paths.images.src, checkImages);
  gulp.watch(paths.html.src, reload); // Перезагрузка при изменении HTML
}

// Основные задачи
const build = gulp.parallel(compileStyles, processScripts, checkImages);
const watch = gulp.series(build, serve, watchFiles);

// Экспорт задач
export { compileStyles as styles };
export { processScripts as scripts };
export { optimizeImages as images };
export { serve, reload };
export default watch;

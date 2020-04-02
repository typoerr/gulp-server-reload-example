const path = require('path')
const gulp = require('gulp')
const del = require('del')
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')

const tsconfig = path.resolve(__dirname, 'tsconfig.json')
const tsProject = ts.createProject(tsconfig)

function buildTS() {
  return gulp
    .src('./src/**/*.ts') //
    .pipe(tsProject())
    .pipe(gulp.dest('./dist'))
}

function clean(done) {
  return del(['./dist'], done)
}

function serve(done) {
  return nodemon({
    // script: './src/index.ts',
    exec: 'ts-node -r tsconfig-paths/register ./src/index.ts',
    watch: ['./src/**/*.ts'],
    ext: 'ts',
    ignore: ['./test/*', './src/**/*.test.ts'],
    done,
  })
}

/* ------------------------------------------------------ */
/*                          task                          */
/* ------------------------------------------------------ */
exports['build:ts'] = buildTS
exports.watch = () => gulp.watch('./src/**/*.ts', { ignoreInitial: false }, buildTS)
exports.clean = clean
exports.serve = serve

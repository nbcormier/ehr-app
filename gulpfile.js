var gulp = require('gulp-help')(require('gulp'));

//plug-ins
var rename = require('gulp-rename');
var exec = require('gulp-exec');
var argv = require('yargs').argv;
var map = require('vinyl-map');


function build(){

  return gulp
          .src(['**/*.html','!wordpress','!wordpress/**','!lib/**'])
          .pipe(map(function(code,filename){
            console.log(filename);
            //console.log(code.toString());
          }));
}
var description = 'Build entire project.';
var deps = [];
var flags = {
  'dev' : 'removes mod_rewrite rules, circumvents document server',
  'pre-prod' : 'uses document server and mod_write'
};

gulp.task('build', description, deps, build, {options: flags});
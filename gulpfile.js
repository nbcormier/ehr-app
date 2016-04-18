var gulp = require('gulp-help')(require('gulp'));

//plug-ins
var rename = require('gulp-rename');
var exec = require('gulp-exec');
var argv = require('yargs').argv;
var map = require('vinyl-map');
var del = require('del');
const fs = require('fs');
var ifFileExists = require('is-there');
/*
what is done (with errors who's solution was 'install this plug in')
with no explanation. Stack traces don't point to client code causing issues
, just lib code making finding src of problem a hours-long exercise

somthing as simple as condtionally copying file takes 20 lines and
external dependencies.

domain specific package file, dealing with npm quirks like is 
dep global or local, undeclared deps, no interactive debugging environment

need async plugin to simply check for file existence
check [this](http://stackoverflow.com/questions/4482686/check-synchronously-if-file-directory-exists-in-node-js)
for an idea of the madness that is nodejs

most build programs offer cli's. so why not use a scripting language
, which is built for automating interactions between cli tools?

Maybe node has value in deployment and operations, but I've yet to
see a compelling case in development. It's easy to run 'npm install'
until something doesn't work the way it should, which form my experience 
is pretty often. IF you are a core node programmer and can hack your
way around a node stacktrace, then maybe it works out. 

Node dev tools are over-complicated tools to largely solved problems
For anyone coming up in the age where node is touted as the best and often
only way to solve these problems, it appears to be worth the slog. For 
people who know how to use existing scripting languages or shells, it
is an in-efficient way to reinvent very old wheels.
*/
function build(){
  
  return gulp
          .src(['**/*.html','!wordpress','!wordpress/**','!lib/**'])
          .pipe(map(function(code,filename){
            //console.log(filename);
            //console.log(code.toString());
          }));
          
}

function copyHtaccess(){
    var stream = null;
    /*
    ifFileExists('.htaccess', function(ans){
        if(ans == true){
          fs.unlinkSync('.htaccess', { dot: true });
        }
      });
     */ 
    if(argv.dev == true){
      stream = gulp
        .src('./assets/.htaccess-dev', { dot: true })
        .pipe(rename('.htaccess'))
        .pipe(gulp.dest('.'));
    }else if(argv.preProd == true){

      stream = gulp
        .src('./assets/.htaccess-preprod', { dot: true })
        .pipe(rename('.htaccess'))
        .pipe(gulp.dest('.'));
    }
    
    return stream;
}

var description = 'Build entire project.';
var deps = ['htaccess'];
var flags = {
  'dev' : 'removes mod_rewrite rules, circumvents document server',
  'pre-prod' : 'uses document server and mod_write'
};
gulp.task('htaccess', copyHtaccess);
gulp.task('build', description, deps, build, {options: flags});
var glob = require('globby');
var argv = require('yargs').argv;
var ig = (argv.i === true || typeof argv.i === 'undefined') ? '' : argv.i.split(',');
var find = (argv._[0] === true || typeof argv._[0] === 'undefined') ? '' : argv._[0].split(',');
//console.log(argv._[0]);
//console.log(ig);
console.log(glob.sync(find,{ignore : ig}));
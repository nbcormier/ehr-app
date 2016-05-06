<?php
/*
this should be called by gulp build and contents from build should
be copied out to root to avoid issues with Angular not bootstrapping 
b/c base tag 
*/

require_once('lib/Autoloader.php');
use Webmozart\Glob\Glob;
use Webmozart\PathUtil\Path;

$shortopts = '';
$longopts = array('dev','preprod');

$parsed = getopt($shortopts, $longopts);

function htaccess($args){
	if(isset($args['dev'])){
		copy('assets/.htaccess-dev','.htaccess');
	}else if(isset($args['preprod'])){
		copy('assets/.htaccess-preprod','.htaccess');
	}
}
//php glob
//$glob = Path::makeAbsolute('templates/**/*.html', getcwd());
//$paths = Glob::glob($glob); 

$match = '"**/*.html,**/authorization.json"';
$ignore = '"wordpress/**","lib/**","node_modules/**","src/**","report/**","bower_components/**","my-src/**"';
$matches = shell_exec ('node glob ' . $match  . ' -i ' . $ignore );
echo $matches;
htaccess($parsed);
if(!empty($matches)){
	
	//decode fails on single quote values
	//we are going to use matches from glob as URI's, node alwyas 
	//uses forwards slashes so we replace those with valid separators
	$dc = array_map(function($v){
		return str_replace('/', DIRECTORY_SEPARATOR, $v);
	},json_decode(str_replace("'",'"',$matches)));
	
	//print_r($dc);
	
	//get path of authorization file
	//array_values resets matches indexes to 0
	$auth_path = array_values(array_filter($dc, 
		function($v){
			return strpos($v,'authorization.json') !== false;
			}
		));

	if(count($auth_path) > 0){
		$authorizationsObj = file_get_contents($auth_path[0]);
		$authorizationsObj = json_decode($authorizationsObj, true);
		if(!isset($authorizationsObj['authorizations'])){
			die('ERROR: Malformed authorization file > missing \'authorizations\'.');
		}
		$authorizations = $authorizationsObj['authorizations'];
		$unatorizedFile = $authorizationsObj['unauthorized_file'];
		
		$cmd = 'php wordpress/lib/wp-api.php "update_option" "mkdo_rcbr_default_redirect" "'.$unatorizedFile.'"';
		
		$out = shell_exec($cmd);
		echo $cmd . PHP_EOL . PHP_EOL;
		echo $out . PHP_EOL . PHP_EOL;
		
		foreach($dc as $rel){
			
			//skip authorization file
			if(strpos($rel,'authorization.json') !== false)
				continue;
			
			$filename = basename($rel);
			$ext = '.' . pathinfo($rel, PATHINFO_EXTENSION );
			 if(isset($authorizations[$filename])){
				 //can't pass stringified auth array so make it comma-sep list
				 //reassembled to code in push.php using explode
				 $auths = implode(',',$authorizations[$filename]);
				 
				 $sansBuildDir = str_replace('build' . DIRECTORY_SEPARATOR ,'',str_replace($ext,'',$rel));
				//TODO: batch these execs. we load WP deps on each call - should only happen once. 
				$cmd = sprintf('php wordpress/lib/push.php "%s" "%s" < "%s"', $sansBuildDir, $auths, getCwd().DIRECTORY_SEPARATOR.$rel);
					$out = shell_exec($cmd);
					echo $cmd . PHP_EOL . PHP_EOL;
					echo $out . PHP_EOL . PHP_EOL;
			 }else{
				 echo $filename . ' skipped: no authorization entry.' . PHP_EOL;
			 }
			
		}
		
		//print_r($authorizations);
	}else{
		die('ERROR: Failed to find autorization file');
	}

	
}else{
	die('ERROR: Glob failed');
}

//echo json_encode($stdout);
?>
<?php


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
$ignore = '"wordpress/**","lib/**","node_modules/**"';
$matches = shell_exec ('node glob ' . $match  . ' -i ' . $ignore );

//htaccess($parsed);
if(!empty($matches)){
	//decode fails on single quote values
	print_r(json_decode(str_replace("'",'"',$matches)););
	
	//get path of authorization file
	//array_values resets matches indexes to 0
	$auth_path = array_values(array_filter($dc, 
		function($v){
			return strpos($v,'authorization.json') !== false;
			}
		));

	if(count($auth_path) > 0){
		$authorizations = file_get_contents($auth_path[0]);
		$authorizations = json_decode($authorizations, true);
		print_r($authorizations);
	}else{
		die('ERROR: Failed to find autorization file');
	}

	
}else{
	die('ERROR: Glob failed');
}

//echo json_encode($stdout);
?>
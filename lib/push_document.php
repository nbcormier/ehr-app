<?php
//php push_doc.php "filename" < "filename"
require_once(  dirname(dirname( __FILE__ ))  . '/wp-load.php' );
$post = array();
//$post_id = wp_insert_post(); 
$contents = "";
while($line = fgets(STDIN)){
    $contents .= $line;
}

$post['post_content'] = $contents;
//$filename = pathinfo($argv[1], PATHINFO_FILENAME); 
$post['post_title'] = str_replace(DIRECTORY_SEPARATOR, "-", $argv[1]);
print_r($post);
echo $contents;
?>
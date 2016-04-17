<?php
$filename = "";
$role = ""; //filename-allow-{{roles}}
//all page default to private, unless 'allow-public'
//post_status : private

//$id = wp_insert_post( $post, $wp_error );
//use id to check meta

//a:6:{i:0;s:13:"administrator";i:1;s:6:"author";i:2;s:11:"contributor";i:4;s:6:"editor";i:6;s:10:"subscriber";i:8;s:6:"public";}
//a:9:{i:0;s:13:"administrator";i:1;s:6:"author";i:2;s:11:"contributor";i:3;s:6:"doctor";i:4;s:6:"editor";i:5;s:7:"manager";i:6;s:10:"subscriber";i:7;s:10:"technician";i:8;s:6:"public";}
$roles = array('administrator','doctor','manager','technician','public');
//insert into wp_postmeta using post id, meta_key = _mkdo_rcbr_roles,
//remove roles from $roles and serialize before inserting into meta_value field.
//check if meta exists
//get_post_meta ( int $post_id, string $key = '', bool $single = false )
//add_post_meta($post_id, $meta_key, $meta_value, $unique);
//update_post_meta($post_id, $meta_key, $meta_value, $prev_value);
//OR we can just use 'meta_input' (array) during call to inset_post
/*
gulp task that set mode - _dev_ takes out mod_write rules that will
make requests to html files fetch from doc server

_pre-prod_ mode will turn on rewrite ruls and insert/update html files
to doc server. also should watch for changes on html files and update
modified files

*/
?>
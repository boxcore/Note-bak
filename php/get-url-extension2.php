<?php
function get_ext1($file_name){
	return strrchr($file_name, '.');
}

function get_ext2($file_name){
	return substr($file_name, strrpos($file_name, '.'));
}

function get_ext3($file_name){
	return array_pop(explode('.', $file_name));
}

function get_ext4($file_name){
	$p = pathinfo($file_name);
	return $p['extension'];
}

function get_ext5($file_name){
	return strrev(substr(strrev($file_name), 0, strpos(strrev($file_name), '.')));
}

$url = "http://www.baidu.com/dir/dir/filename.php&id=2#frag";
$uri = "dir/finame.php";

// echo get_ext1($url);
// echo "<br>";
// echo get_ext2($uri);
// echo "<br>";
// echo $rest = substr($uri, -3);
// echo $rest = substr($uri, -3, 1);
// echo substr($name, $doname);
echo strpos($uri, '.');

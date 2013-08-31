<?php
/**
 *
 *
 */
$a = '/a/b/c/d/e.php';
$b = '/a/b/12/22/33.php';
echo getpathinfo($a, $b);
function getpathinfo($a, $b){
	$a1 = explode("/", $a);
	$b1 = explode("/", $b);
	$pathinfo='';
	for($i=1; $i<=count($b1); $i++){
		$pathinfo .= $a1[$i] == $b1[$i] ? '../' : $b1[$i].'/';
	}
	return $pathinfo;
}
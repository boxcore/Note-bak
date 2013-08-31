<?php
/**
 * 字母大小写转换
 *
 */

function diversion($str){
	$arr = explode('_', $str);
	foreach($arr as $val){
		$res.= ucfirst($val);
	}
	return $res;
}

// function diversion2($str){
// 	$arr = ex
// }

echo diversion('open_the_door');
echo "<br>";
$s1 = ucwords("open the door for you");
// echo str_replace($s1," ","");
$re = "/\s/";
$rs = '';
echo preg_replace("/\s/",'',$s1);
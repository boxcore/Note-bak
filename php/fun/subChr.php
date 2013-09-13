<?php
header('content-type:text/html; charset=utf8');
$str = 'abad打发打发打发打发的首发阿萨德发,短发二二三四dfdfdfdf非法阿德法打发打发';
function genLeng($str, $leng){
	$getRl = mb_strlen($str,'utf8');
	if ($leng >= $getRl ){
		return $str;
	} else {
		$tmp = mb_substr($str, 0, $leng, 'utf8');
		return $tmp.'...';
	}
}

/**
 * 统计字符
 *
 */
function countstr( $str ) {
	$a = strlen($str);
	$b = mb_strlen($str,'utf8');	//总字符长度
	$zw = ($a - $b) /2;	//中文总数
	$en = $b - $zw;		//英文总数
	return $b;
}




echo genLeng($str, 10);
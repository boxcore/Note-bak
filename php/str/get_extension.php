<?php
/**
 *	获取url扩展名的n个方法
 *
 *
 */

//方法一	适用于没带参数的链接
function get_ext1($uri){
	return strrchr($uri, '.');
}

//方法二	
function get_ext2($uri){
	return substr($uri, strrpos($uri, '.'));
}

//方法三	
function get_ext3($uri){
	return array_pop(explode('.', $uri));
}

//方法四	
function get_ext4($uri){
	$p = pathinfo($uri);
	return $p['extension'];
}

//方法五	
function get_ext5($uri){
	return strrev(substr(strrev($uri), 0, strpos(strrev($uri), '.')));
}

//calculate
$a[1] = "http://www.baidu.com/x/aa/dc/in.php?id=1&name=user1&pass=fff#main";
$a[2] = "../fdfdf/fdfdfd/dfdf/sss.txt";
$a[3] = '/inf/test/me.jpg';

foreach($a as $uri){
	for($j=1; $j<6; $j++){
		//可变函数
		$fun = "get_ext".$j;
		echo $fun($uri);
		echo "<br>";
	}
	echo "<hr>";
}
<?php
header('content-type:text/html; charset=utf8');
//设计取出a的概览是10，b的取出概率是30，c的取出概率是60.
// $v = rand(1,100);
switch($v = rand(1,100)){
	case $v <= 10:
		echo 'a';
		break;
	case $v > 10 && $v <= 40:
		echo "b";
		break;
	case $v > 40 && $v <= 100:
		echo 'c';
		break;
}
echo "<br>$v<hr>方法二：<br>";

//抽奖系统 设置一等奖1名，二等奖2名，三等级10名 现在随机取抽奖项
// $arr = range(1,10000);  //生成数组
// print_r($arr);

// 8是一等奖  4，5是二等奖 2000~2010是三等奖项
$a = array(8);
$b = array(4,5);
$c = range(1,3);

function getPrice($a,$b,$c){
	switch($v = rand(1,10)){
		case in_array($v, $a):
			echo '一等奖';
			break;
		case in_array($v, $b):
			echo '二等奖';
			break;
		case in_array($v, $c):
			echo '三等奖';
			break;
		default:
			echo '鼓励奖';
			break;
	}
	echo "<br>$v";
}

function checkValue($v){
	fopen('price.txt', 'a+')
}

getPrice($a, $b, $c);



<?php
/**
 * 字符串下标运算题目
 *
 */

// $arr[1][0]="123456";
// $arr[2]="abcdef";
$arr[1]="123456";   //指定为字符串
$arr[1][2]="QoXO";  //只取一个Q 到arr[1]的下标2
$arr[1][3]="PoXO";	//只取一个P 到arr[1]的下标3
echo "<pre>";
print_r($arr[1]);
echo "<hr>";
print_r($arr[1][2]);
echo "<hr>";
print_r($arr[1][3]);
<?php  
// 二分法查找  
function binarysearch($arr, $value, $start = 0, $end = NULL) {  
    if($end == NULL) $end = count($arr) - 1;  
    $index = floor(($start+$end)/2);  
    $base = $arr[$index];  
    if($value < $base) return binarysearch($arr, $value, $start, $index-1);  
    else if($value > $base) return binarysearch($arr, $value, $index+1, $end);  
    else return $index;  
}  
  
$arr = array(1, 3, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20);  
$value = 8;  
echo binarysearch($arr, $value); 
####这是修改的二分发，努力学习吧！
<?php

// 选择排序(递归实现)  
function selectsort2($arr, $start = 0) {  
    if(($count = count($arr)) == $start + 1) return $arr;  
    $new = array();  
    $min = $arr[$start];  
    $min_index = $start;  
    for($i=$start+1; $i<$count-1; $i++) {  
        if($arr[$i] < $min) {  
            $min = $arr[$i];  
            $min_index = $i;  
        }  
    }  
    if($arr[$start] != $min) list($arr[$start], $arr[$min_index]) = array($arr[$min_index], $arr[$start]);  
    return selectsort($arr, $start + 1);  
}  
$arr = array(9,3,11,23,90,99,12,34,22,87,32);  
print_r(selectsort($arr));  
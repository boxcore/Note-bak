<?php
/**
 * 快速排序法
 */
function quicksort($arr){
    if($count = count($arr) <=1) return $arr;
    $base = $arr[0];
    $left = $right = array();
    for($i=1; $i<count($arr); $i++){
        if($arr[$i] <= $base) $left[] = $arr[$i];
        else $right[] =$arr[$i];
    }
    $left = quicksort($left);
    $right = quicksort($right);
    return array_merge($left, array($base), $right);
}

print_r(quicksort(array(1,2,3,8,6,5,3,2)));
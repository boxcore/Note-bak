<?php
/**
 * 快速排序法 2
 *
 */
$list = array(85, 24, 63, 45,55, 17, 31, 96, 50);
 
print_r(qsort($list));
 
function qsort($arr) {
    $len = count($arr);
 
    if($len <=1 ) return $arr;
 
    $left = $right = array();
    $mid_index = floor($len/2);
    $mid_value = $arr[$mid_index];
 
    for($i=0;$i<$len;$i++){
        if($i==$mid_index)continue;
 
        //seperate elements by 'mid_value'
        if($arr[$i] < $mid_value){
            $left[] = $arr[$i];
        }else{
            $right[] = $arr[$i];
        }
    }
 
    return array_merge(qsort($left),(array)$mid_value,qsort($right));
}
#######output#########
#Array ( [0] => 17 [1] => 24 [2] => 31 [3] => 45 [4] => 50 [5] => 55 [6] => 63 [7] => 85 [8] => 96 )
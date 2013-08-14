<?php
// 快速排序  
function quicksort($arr) {  
    if(($count = count($arr)) <= 1 ) return $arr;  
    $base = $arr[0];  
    $left = $right = array();  
    for($i=1; $i<$count; $i++) {  
        if($arr[$i] <= $base) $left[] = $arr[$i];  
        else $right[] = $arr[$i];  
    }  
    $left = quicksort($left);  
    $right = quicksort($right);  
    return array_merge($left, array($base), $right);  
}  
  
echo join(',', quicksort(array(1,3,23,5,234,65,6))); 

?>
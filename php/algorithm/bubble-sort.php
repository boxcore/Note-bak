<?php
// 冒泡排序  
function bubblesort($arr) {
    for($i=0,$j=count($arr); $i<$j; $i++) {
        for($k=$j-1; $k>$i; $k--) {
            if ($arr[$k] < $arr[$k-1]){
            	list($arr[$k-1], $arr[$k]) = array($arr[$k], $arr[$k-1]);
            }
        }
    }
    return $arr;
}
  
$arr = array(1,4,14,3,56,23,435,2,234,2,33,23,123);
print_r(bubblesort($arr));

?>
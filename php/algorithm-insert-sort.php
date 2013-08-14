<?php
// 插入排序  
function insertsort($arr) {  
    for($i=1, $j=count($arr); $i<$j; $i++) {  
        $k = $i;  
        while($k > 0 && $arr[$k-1] > $arr[$k]) {  
            list($arr[$k], $arr[$k-1]) = array($arr[$k-1], $arr[$k]);  
            $k--;  
        }  
    }  
    return $arr;  
}  
  
$array=array(10,8,7,5,1,2,3,4);  
print_r(insertsort($array));

?>
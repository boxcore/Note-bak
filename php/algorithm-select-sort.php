<?php
// 选择排序, (非递归)  
function selectsort($arr) {  
    for($i=0, $j=count($arr); $i<=$j; $i++) {  
        $min = $i;  
        $temp = $arr[$i];  
        for($k=$i+1; $k<$j; $k++) {  
            if($temp > $arr[$k]) {  
                $min = $k;  
                $temp = $arr[$k];  
            }  
        }   
        if($min != $i) list($arr[$min], $arr[$i]) = array($arr[$i], $arr[$min]);  
    }  
    return $arr;  
}  
  
$arr = array(9,3,11,23,90,99,12,34,22,87,32);  
print_r(selectsort($arr)); 
?>
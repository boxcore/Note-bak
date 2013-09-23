<?php
/**
 * 冒泡排序法
 */
function bubblesort($arr){
    $tot = count($arr);
    for($i=0; $i<$tot-1; $i++){
        for($j=$i+1; $j<$tot; $j++){
            if($arr[$i]>$arr[$j]){
                // 方法一：
                // $tmp = $arr[$i];
                // $arr[$i] = $arr[$j];
                // $arr[$j] = $tmp;

                //方法二：
                list($arr[$i], $arr[$j]) = array($arr[$j], $arr[$i]);
            }
        }
    }
    return $arr;
}

print_r(bubblesort(array(99,6,1,5,3,5)));
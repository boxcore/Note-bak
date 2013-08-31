<?php  
  
/** 
 * 归并排序 （合并排序【台湾】；）
 * 描述：归并排序（Merge sort，台湾译作：合并排序）是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
 * from: http://zh.wikipedia.org/zh-cn/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F
 */  
$lista = array(3,8,4);
$listb = array(5,6,2);
 
print_r(mergeSort($lista, $listb));
 
function mergeSort($la,$lb) {
    //sort two sub-lists
    sort($la);
    sort($lb);
 
    $final = array();
    //keep looping while the two lists both have elements
    while($la && $lb){
        //compare the first two values,choose the smaller one and insert to 'final'
        if($la[0]<=$lb[0]){
            $final[] = array_shift($la);
        }else{
            $final[] = array_shift($lb);
        }
    }
 
    return array_merge($final,$la,$lb);
}

#######output#########
#Array ( [0] => 2 [1] => 3 [2] => 4 [3] => 5 [4] => 6 [5] => 8 )
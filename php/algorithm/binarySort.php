<?php  
  
/** 
 * 二分法
 * 描述：
 * from: 
 */  
function binarySearch($a, $val){  
    $low = 0;
    $high= count($a) - 1;
    while($low <= $high){
        $mid = intval(($low+$high)/2);
        if($a[$mid] == $val) return $mid;
        if($a[$mid] > $val){
            $high = $mid - 1;
        }else{
            $low = $mid + 1;
        }
    }
    return -1;
}
####### output #########
#
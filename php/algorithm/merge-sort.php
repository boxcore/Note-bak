<?php  
  
/** 
 * 归并排序 （合并排序【台湾】；）
 * 描述：归并排序（Merge sort，台湾译作：合并排序）是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
 */  
function guiSort( $arr )  
{  
    // 计算数组里的个数, 如果只有一个成员, 直接返回  
    $count = count( $arr );  
    if( $count <= 1 )  
    {
        return $arr;  
    }
  
    //如果成员很多, 那么对左边 归并, 对右边归并  
    $mid = floor( $count / 2 );  
    $left = guiSort( array_slice( $arr, 0, $mid ) );  
    $right = guiSort( array_slice( $arr, $mid ) );  
  
    // 左半数组的大小, 右半数组的大小  
    $leftLen = count( $left );  
    $rightLen = count( $right );  
  
    //返回值保存的变量  
    $ret = array();  
    $li = 0;  
    $ri = 0;  
  
    while( 1 )  
    {  
        // 如果左边全合并了, 则退出循环  
        if( $li >= $leftLen )  
        {  
            $flag = 'left';  
            break;  
        }  
        // 如果右边全合并了, 则退出循环  
        if( $ri >= $rightLen )  
        {  
            $flag = 'right';  
            break;  
        }  
  
        //如果左边的数小, 则左边加入返回数组  
        if( $left[ $li ] <= $right[ $ri ] )  
        {  
            $ret[] = $left[ $li ];  
            $li ++;  
        } else  
        {  
            $ret[] = $right[ $ri ];  
            $ri ++;  
        }  
  
    }  
  
    if( $flag == 'left' )  
    {  
        //如果首先合并完的是左边, 则把右数组剩余的都加到返回数组  
        $ret = array_merge( $ret, array_slice( $right, $ri ) );  
    } elseif( $flag == 'right' )  
    {  
        $ret = array_merge( $ret, array_slice( $left, $li ));  
    }  
  
    return $ret;  
}  
  
  
// 测试代码  
$arr = range( 1, 100 );  
shuffle( $arr );  
var_dump( $arr );  
$res = guiSort( $arr );  
var_dump( $res );
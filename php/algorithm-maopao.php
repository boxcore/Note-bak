<?php
/**
 * PHP中的冒泡排序法使用
 * 
 */
header("content-type:text/html; charset=utf8");
// 预先声明一个数组
$arr = array (12,45,28,30,88,67);
echo "原数组";
print_r($arr);
echo "<br/>";
//冒泡排序
function maopao($arr){
    // 进行第一层遍历
    for($i=0, $k=count($arr); $i<$k; $i++) {
        // 进行第二层遍历 将数组中每一个元素都与外层元素比较
        // 这里的i+1意思是外层遍历当前元素往后的

        for ($j=$i+1; $j<$k; $j++){
            // 内外层两个数比较
                if($arr[$i]<$arr[$j]){
                // 先把其中一个数组赋值给临时变量
                    $temp = $arr[$j];
                // 交换位置
                $arr[$j] = $arr[$i];
                // 再从临时变量中赋值回来
                $arr[$i] = $temp;
                print_r($arr);
        echo "<hr>";
            }
        }
    }
    // 返回排序后的数组
    return $arr;
}
 
// 直接打印排序后的数组
echo '排序后';
print_r(maopao($arr));
 
?>
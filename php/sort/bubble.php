<?php
/**
 *	冒泡算法
 *	@author boxcore
 *	@param $arr array 需要排序的数组
 *
 */
function bubblesort($arr){
	$tot = count($arr);
	for($i=0; $i<$tot-1; $i++){
		for($j=$i+1; $j<$tot; $j++){
			if($arr[$j] > $arr[$i]){
				$tmp = $arr[$i];
				$arr[$i] = $arr[$j];
				$arr[$j] = $tmp;

				echo $i,$j;
				print_r($arr);
				echo "<hr>";

			}
		}
	}
	return $arr;
}

print_r(bubblesort(array(1,2,3,4,8,6,7)));
/**
原理说明：

冒泡排序算法的运作如下：
比较相邻的元素。如果第一个比第二个大，就交换他们两个。
对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
针对所有的元素重复以上的步骤，除了最后一个。
持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

**/

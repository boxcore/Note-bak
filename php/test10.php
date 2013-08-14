<?php
//我写的冒泡法
function bubblesort($arr){
	$tot = count($arr);
	for($i=0; $i<$tot-1; $i++){
		for($j=$i+1; $j<$tot; $j++){
			if($arr[$j] > $arr[$i]){
				$tmp = $arr[$i];
				$arr[$i] = $arr[$j];
				$arr[$j] = $tmp;
				echo "<pre>";
				echo $i,$j;
				print_r($arr);
				echo "<pre><hr>";

			}
		}
	}
	return $arr;
}

print_r(bubblesort(array(1,2,3,4,8,6,7)));
?>

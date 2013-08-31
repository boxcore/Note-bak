<?php
//algorithm

//一群猴子排成一圈，按1，2，…，n依次编号。然后从第1只开始数，数到第m只,把它踢出圈，从它后面再开始数，再数到第m只，在把它踢出去…，如此不停的进行下去，直到最后只剩下一只猴子为止，那只猴子就叫做大王。要求编程模拟此过程，输入m、n, 输出最后那个大王的编号。用程序模拟该过程。
header("Content-Type:text/html; charset=utf8");
function king($n, $m) {

	$monkey = range(1, $n);//模拟建立一个连续数组
	$i = 0;
	// print_r($monkey);
	while(count($monkey) > 1) {
		print_r($monkey);
		echo "<br>";
		$i += 1; // 开始查数
		$head = array_shift($monkey); //直接一个一个出列最前面的猴子
		if($i % $m != 0) {
			array_push($monkey, $head); // 如果没数到m或m的倍数,则把该猴放回尾部去.
		} //否则就抛弃掉了
		
	}
	echo "<hr>";
	return $monkey[0];
}
echo '剩余',king(5, 4),'号猴子';
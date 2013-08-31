<?php
/**
 * 判断IP是否在指定的范围之间
 *
 *
 */
// $ip = ip2long($_SERVER['REMODE_ADDR']);
$ip = ip2long('192.168.1.123');
$start = ip2long("192.168.1.100");
$end = ip2long("192.168.1.150");
if($ip > $start && $ip < $end){
	echo "Yes";
} else {
	echo "No";
}
echo "<br>";
echo $start,$ip,$end;
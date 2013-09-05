<?php
//请将2维数组按照name的长度进行重新排序，按照顺序将id赋值(从1开始)
$Tarray = array(
	array('id' => 0, 'name' => '123833'),
	array('id' => 0, 'name' => 'aaa'),
	array('id' => 0, 'name' => 'albabaababa'),
	array('id' => 0, 'name' => '12356'),
	array('id' => 0, 'name' => '123abc')
);

//方法一：
// $arr = array();
// foreach($Tarray as $k=>$v){
// 	$arr[$k] = strlen($v['name']);
// }
// natsort($arr);
// $arr1 = array();
// $i = 0;
// foreach($arr as $k=>$v){
// 	$arr1[$i]['id'] = $v;
// 	$arr1[$i]['name'] = $Tarray[$k]['name'];
// 	$i++;
// }
// echo "<pre>";
// print_r($arr1);
// echo "</pre>";

//方法二：
foreach($Tarray as $key=>$value) {
	$long[$key] = strlen($value['name']);
}
//$Tarray放最后一个参数,也就是最后一个数组按照第一个参数的顺序进行排序
array_multisort($long, SORT_ASC, $Tarray);
$i = 1;
foreach($Tarray as &$value) {
	$value['id'] = $i;
	$i++;
}
echo "<pre>";
print_r($Tarray);
echo "</pre>";
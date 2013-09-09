<?php
header('content-type:text/html; charset=utf8');

/**
 * array_values — 返回数组中所有的值
 * array array_values ( array $input )
 *
 */
$arr = array('aa' => 12,'bb' => 23,'cc' => 34,'o' => 56, 67, 76, 'tw', 'ch');
echo "array_values返回数组中值的部分<pre>";
print_r(array_values($arr));
echo '</pre>';
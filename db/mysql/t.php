<?php

// array_filter($arr, 'ftz'){

// }
// function ftz($var){

// }

print_r(array_filter(array(1,0,33)));
echo "<hr>";
$sql = 'SELECT a.`id`, b.`push_time` FROM `article` AS a, `article_push` AS b WHERE ( a.`id` = b.`article_id` ) AND ( b.`push_time` <= "'. date('Y-m-d H:i:s', time()) .'")   ORDER BY `id` DESC limit 0,2' ;
echo $sql;



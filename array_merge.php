<?php

$a = array('a'=>1, 'b'=>2, 'c'=>'abc');
$b = array('ac'=>1, 'bc'=>2, 'cc'=>'adbc');
$c = array();
$d = '';

$arr = array_merge($a, $d);
print_r($arr);
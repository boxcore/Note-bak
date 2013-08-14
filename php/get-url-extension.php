<?php
/**
 * 截取url的字符串 获取扩展名
 * 
 *
 */
$url = "http://www.baiduc.com/dir/index.php?id=123&name=user&pass=12333#testid";
//method 1
$str = pathinfo($url);
echo array_shift(explode("?", $str['extension']));
echo "<hr>";

// method 2
$str2 = parse_url($url);
echo array_pop(explode(".", $str2['path']));
echo "<hr>";

//method3
$str3 = array_pop(explode(".", $url));
echo array_shift(explode("?", $str3));

// //method 4
echo "<hr>";
// echo basename($url);


// echo realpath("./");
// echo "<hr>";

// echo dirname($url);
// echo "<hr>";

// echo '<hr>'.$url;
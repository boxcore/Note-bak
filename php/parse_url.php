<?php
// parse 获取链接的后缀名
$url = "http://www.baiduc.com/dir/doc/index.php?id=123&name=user#testid";
$str = parse_url($url);
print_r($str);


echo "<hr>方法一：";
//获取后缀名
echo array_pop(explode('.', $str['path']));
// $str = explode("?",$str);


##################################
# Array ( [scheme] => http [host] => www.baiduc.com [path] => /dir/doc/index.php [query] => id=123&name=user [fragment] => testid )
#
<?php
// pathinfo 获取链接的后缀名
header("Content-type:text/html; charset=utf8");
$url = "http://www.baiduc.com/dir/index.php?id=123&name=user&pass=12333#testid";
$str = pathinfo($url);


echo '<hr>打印parse_url(http://www.baiduc.com/dir/doc/index.php?id=123&name=user#testid)：<br>';
echo "<pre>";
print_r($str);
echo "</pre>";

echo "<hr>";
//获取后缀名
$str = $str['extension'];
$str = explode("?",$str);
echo $str[0];

##################################
# 打印内容：
# Array ( 
# [dirname] => http://www.baiduc.com/dir
# [basename] => index.php?id=123&name=user&pass=12333#testid 
# [extension] => php?id=123&name=user&pass=12333#testid 
# [filename] => index )
#
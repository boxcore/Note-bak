<?php
header('content-type:text/html; charset=utf-8');
echo 'phpredis sample:<br />';

error_reporting(E_ALL);
ini_set('display_errors','ON');

//已经启用了php-redis扩展，因此这里可以直接使用Redis对象了
$redis = new Redis();
//进行连接
$redis->connect('127.0.0.1',6379);

//这里开始使用redis的功能，就是设置一下
$redis->set('name1', '黄春泽');
$redis->set('name2', 'huangchunze');

echo "通过get方法获取到键的值：<br>"
	.$redis->get('name1')."<br>"
	.$redis->get('name2');
?>
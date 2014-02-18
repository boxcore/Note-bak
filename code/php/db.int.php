<?php
header('Content-Type:text/html; charset=utf-8');
// 数据库连接
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '123456');
define('DB_NAME', 'xinwenda');

//数据库连接
$link = mysql_connect('localhost', 'root', '123456');
if( !$link ){
    die('Counld not connect: ' . mysql_error());
}

// 获取编码
$charset = mysql_client_encoding($link);
// echo $charset;

// 选择数据库
mysql_select_db('xinwenda');

$sql = 'select * from `xwd_city` where id>=100';
$result = mysql_query($sql);

/**
 * 批量转汉字为拼音
 */
//include('pinyin.fn.php');
//while($row=mysql_fetch_array($result)){
//    $mark = Pinyin($row['name'],'utf8');
//    mysql_query("update `xwd_city` set mark = '{$mark}' where id = {$row['id']} ");
//
//}


mysql_close($link);
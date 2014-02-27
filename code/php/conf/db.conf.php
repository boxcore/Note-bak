<?php
header('Content-Type:text/html; charset=utf-8');
// 数据库连接
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '123456');
define('DB_NAME', 'xinwenda');

//数据库连接
$link = mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD);
if( !$link ){
    die('Counld not connect: ' . mysql_error());
}

// 获取编码
$GLOBALS['app']['db']['charset'] = mysql_client_encoding($link);
// echo $charset;

// 选择默认数据库
mysql_select_db(DB_NAME);

$sql = 'select * from `xwd_city` where id>=100';
$result = mysql_query($sql);


/**
 * mysql常用demo （注释状态）
 */
// 



// mysql 关闭句饼
// mysql_close($link);
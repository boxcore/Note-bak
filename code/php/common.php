<?php
define('BASE_DIR', dirname(__FILE__).'/' );  //结果：/home/www/code/php + /

// 引入全局公共变量
require_once BASE_DIR . 'conf/db.conf.php';
require_once BASE_DIR . 'conf/url.conf.php';

//
require BASE_DIR . 'funcs/app.fn.php';


// print_r($GLOBALS['app']);

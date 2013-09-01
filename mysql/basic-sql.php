<?php
	/**
	 * mysql简单操作
	 *
	 *
	 */
	header("content-type:text/html; charset=utf8");
	error_reporting(E_PARSE);	//只报告语法错误
	$link = mysql_connect('localhost', 'root', 'abc654321');
	// 判断数据库链接情况
	if (!$link){
		die('Could not connect: '. mysql_error());
	} else {
		echo 'Connected successfully<br>';
	}

	mysql_select_db("boxcore");
	mysql_query('set names utf8');

	date_default_timezone_set("Asia/Shanghai");	//设置上海时区
	$rows = mysql_fetch_assoc(mysql_query('select * from books'));
	print_r($rows);

	mysql_close();
	var_dump($link);
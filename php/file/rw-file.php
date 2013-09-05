<?php
/**
 * 创建和读取文件 fopen方法和file_get_contents 方法
 *
 *
 */
header("content-type:text/html; charset=utf8");
$str = date('Y-m-d H:i:s',time())."++++ \n";
$handle = fopen("hello.txt", 'a+');
fwrite($handle, $str);

file_put_contents('text.txt',date('Y-m-d H:i:s',time())."++++ \n",FILE_APPEND); //如果文件不存在，将自动创建并写入内容

if(file_exists('hello.txt')){
	echo "exists:";
	print_r(fileinode('hello.txt'));

	echo "<hr>使用fopen+fread读取文件：<br>";
	$con = fopen("hello.txt", 'rb');
	echo fread($con, filesize('hello.txt'));	//需要统计总大小才可读取指定大小内容

	echo "<hr>使用file_get_contents读取：<br>";
	echo  nl2br(file_get_contents('hello.txt'));

	fclose($con);

} else {
	echo "not exists!";
	print_r(fileinode('hello.txt'));
}


/*
知识点补充
'r' 开文件方式为只读，文件指’指到开始处 
'r+' 开文件方式为可读写，文件指’指到开始处 
'w' 开文件方式为写入，文件指’指到开始处 并将原文‘的长度设为 0。若文件不存在‘‘建立新文件– 
'w+' 开文件方式为可读写，文件指’指到开始处 并将原文‘的长度设为 0。若文件不存在‘‘建立新文件– 
'a' 开文件方式为写入，文件指’指到文件最后。若文件不存在‘‘建立新文件– 
'a+' 开文件方式为可读写，文件指’指到文件最后。若文件不存在‘‘建立新文件– 
'b' 若操作系统的文字及二进位文件不同，‘可以用“‘”，UNIX 系统不–要“用 参”。






*/
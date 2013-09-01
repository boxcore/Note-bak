<?php
/**
 * 复制文件命令
 *
 *
 */
header("content-type:text/html; charset=utf8");
if(!file_exists("test.txt")){
	$handle = fopen("test.txt",'a+');
	fclose($handle);
}
if (copy('test.txt', 'test.txt.bak')) {
    echo "文件拷贝成功";
} else {
    echo "文件拷贝失败";
}
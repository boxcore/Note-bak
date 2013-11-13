<?php
	
	header("Content-type:text/html;charset=gb2312");
	//require_once "../data/common.inc.php";//引入数据库配置文件(用户名,密码，数据库名，表前缀等)
	$cfg_dbhost = 'localhost';
	$cfg_dbuser = 'root';
	$cfg_dbpwd = 'abc654321';
	$cfg_dbname = 'boxcore_boxcore';

	$link = mysql_connect($cfg_dbhost,$cfg_dbuser,$cfg_dbpwd);
	mysql_select_db($cfg_dbname);
	mysql_query("set names utf8");
	$keywords = iconv("gb2312//IGNORE","utf-8",$_POST['keywords']); 
	$sql = "select title from search_keywords where title like '%".$keywords."%' order by click desc limit 0,9;";
	//echo $sql;
	$res = mysql_query($sql,$link);
	
	$mNums = mysql_num_rows($res);
	//echo $mNums;
	$row=mysql_fetch_array($res);
	if($mNums<1){
		echo "no";
		exit();
	}else if($mNums==1){
		echo "[{'keywords':'".iconv_substr($row['title'],0,14,"gbk")."'}]";
	}else{
		$result="[{'keywords':'".iconv_substr($row['title'],0,14,"gbk")."'}";
		while($row=mysql_fetch_array($res)){
			$result.=",{'keywords':'".iconv_substr($row['title'],0,14,"gbk")."'}";
		}
		$result.=']';
		echo $result;
	}
	mysql_free_result($res);

?>
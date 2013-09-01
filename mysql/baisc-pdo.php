<?php
/**
 * PDO 链接数据库
 *
 *
 */

$pdo = new PDO('mysql:host=localhost;dbname=boxcore', 'root', 'abc654321');	//连接PDO数据库

$st = $pdo->prepare("insert into pdo_user(username, password, sex) value(?, ?, ?)");

$st->execute(array('user'.time(), time(), 1));

// $i=1000;
// while($i>1){
// 	$st->execute(array('user1'.$i, $i.'-'.$i, 1));
// 	--$i;
// }


$pdo = null;	//关闭PDO连接



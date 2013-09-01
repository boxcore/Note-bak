--Mysql 基础

--1.创建表：

CREATE TABLE  `user` (
 `id` INT( 11 ) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT  '用户ID',
 `username` VARCHAR( 60 ) CHARACTER SET utf8 COLLATE utf8_estonian_ci NOT NULL COMMENT  '用户名',
 `password` VARCHAR( 32 ) NOT NULL COMMENT  '密码',
 `sex` TINYINT( 1 ) UNSIGNED NOT NULL DEFAULT  '0' COMMENT  '性别',
 `birth` DATE NOT NULL COMMENT  '生日',
INDEX (  `birth` ) ,
UNIQUE ( `username` )
) ENGINE = MYISAM CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT =  '用户表';
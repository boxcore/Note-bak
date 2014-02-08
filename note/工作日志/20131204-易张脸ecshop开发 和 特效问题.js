## Ecshop用户管理系统 ##
    用户系统涉及到的文件：
	1. 

1. member_info.lbi 调用用户信息和登陆后的处理(lib_main.php)
	使用 {$user_info}判断用户登陆, 	get_user_info($id=0) 函数取, 是通过$_SESSION['user_id'] 来赋值的.
	返回: 
		$user['username']
		$user['user_points']
		$user['user_money']
		$user['user_bonus']
	如果登陆成功,就会调用update_user_info()函数存用户数据到session中.
	
2. 登陆操作处理


3. 地图调用
	1） 表设计 yzl_maps
		map_id map_name map_point map_info country  province city district address zipcode tel created_time 
		
CREATE TABLE `yzl_maps` (
  `map_id` int(8) unsigned NOT NULL auto_increment,
  `map_name` varchar(255) NOT NULL,
  `map_desc` text NOT NULL,
  `map_point` varchar(50) NOT NULL default '116.4,39.9',
  `map_info` varchar(255) NOT NULL default '',
  `country` smallint(5) NOT NULL default '0',
  `province` smallint(5) NOT NULL default '0',
  `city` smallint(5) NOT NULL default '0',
  `district` smallint(5) NOT NULL default '0',
  `address` varchar(120) NOT NULL default '',
  `zipcode` varchar(60) NOT NULL default '',
  `tel` varchar(60) NOT NULL default '',
  `created_time` timestamp NOT NULL default CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY  (`map_id`),
  KEY `map_point` (`map_point`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

与之相似的功能： 1. ecshop后台的办事处管理。
	
	2） 后台 地图管理
	

4.

5.

6.

7.

8.

9.


